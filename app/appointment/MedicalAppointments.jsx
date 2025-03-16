"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import { imedicDb, imedicAuth } from "@/lib/firebase";
import StepIndicator from "./StepIndicator";

import Swal from "sweetalert2";
import "./MedicalAppointments.css";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import doctorsData from "./doctors.json";

export default function MedicalAppointments({ onAppointmentConfirmed }) {
  // 1. Estados para solicitudes y pasos
  const [requests, setRequests] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  // Paso 1
  const [specialtySearch, setSpecialtySearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [filteredSpecialties, setFilteredSpecialties] = useState([]);

  // Paso 2
  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Paso 3 - Detalles de la Cita (nuevos campos incluidos)
  const [epsList, setEpsList] = useState([]);
  const [selectedEps, setSelectedEps] = useState("");
  const [residence, setResidence] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [appointmentReason, setAppointmentReason] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [examFiles, setExamFiles] = useState([]);

  // Datos paciente
  const [patientData, setPatientData] = useState(null);

  const currentUser = imedicAuth.currentUser;

  // ================================
  // 2. useEffects para cargar datos
  // ================================
  // 2.1. Doctores desde JSON
  useEffect(() => {
    setAllDoctors(doctorsData);
  }, []);

  // 2.2. Filtrar especialidades
  useEffect(() => {
    if (!specialtySearch) {
      setFilteredSpecialties([]);
      return;
    }
    const uniqueSpecs = new Set(allDoctors.map((d) => d.specialty));
    const filtered = Array.from(uniqueSpecs).filter((spec) =>
      spec.toLowerCase().includes(specialtySearch.toLowerCase())
    );
    setFilteredSpecialties(filtered);
  }, [specialtySearch, allDoctors]);

  // 2.3. Filtrar doctores
  useEffect(() => {
    if (!selectedSpecialty) {
      setFilteredDoctors([]);
      return;
    }
    const filtered = allDoctors.filter(
      (d) =>
        d.specialty &&
        d.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
    );
    setFilteredDoctors(filtered);
  }, [selectedSpecialty, allDoctors]);

  // 2.4. Cargar EPS
  useEffect(() => {
    const fetchEps = async () => {
      try {
        const epsSnapshot = await getDocs(collection(imedicDb, "eps"));
        let epsArray = [];
        epsSnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.listEps && Array.isArray(data.listEps)) {
            epsArray = data.listEps;
          }
        });
        setEpsList(epsArray);
      } catch (error) {
        console.error("Error fetching EPS:", error);
      }
    };
    fetchEps();
  }, []);

  // 2.5. Cargar paciente
  useEffect(() => {
    if (!currentUser) return;
    const fetchPatientData = async () => {
      try {
        const patientDoc = await getDoc(doc(imedicDb, "pacientes", currentUser.uid));
        if (patientDoc.exists()) {
          setPatientData(patientDoc.data());
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatientData();
  }, [currentUser]);

  // 2.6. Cargar solicitudes
  useEffect(() => {
    if (!currentUser) return;
    const fetchRequests = async () => {
      try {
        const q = query(
          collection(imedicDb, "solicitudesCitas"),
          where("uidPaciente", "==", currentUser.uid)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, [currentUser]);

  // ================================
  // 3. Función para recargar
  // ================================
  const reloadRequests = async () => {
    if (!currentUser) return;
    try {
      const q = query(
        collection(imedicDb, "solicitudesCitas"),
        where("uidPaciente", "==", currentUser.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests (reload):", error);
    }
  };

  // ================================
  // 4. Manejo de steps
  // ================================
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : 1));

  // ================================
  // 5. Subida de archivos
  // ================================
  const uploadExamFiles = async (files) => {
    if (!files || files.length === 0) return [];
    const storage = getStorage();
    const urls = [];
    for (let file of files) {
      const storageRef = ref(storage, `examenes/${currentUser.uid}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      urls.push(downloadURL);
    }
    return urls;
  };

  const handleExamFilesChange = (e) => {
    setExamFiles(e.target.files);
  };

  // ================================
  // 6. Guardar archivos en subcolección
  // ================================
  const saveExamDocuments = async (urls) => {
    for (let url of urls) {
      await addDoc(
        collection(imedicDb, "pacientes", currentUser.uid, "documentos de soporte"),
        {
          fileURL: url,
          uploadedAt: Timestamp.now(),
        }
      );
    }
  };

  // ================================
  // 7. sendAppointmentSupportMessage
  // ================================
  async function sendAppointmentSupportMessage(appointmentInfo) {
    try {
      if (!currentUser) throw new Error("Usuario no autenticado");
      if (!patientData) {
        console.warn("No se encontró data del paciente, no se enviará mensaje con datos.");
      }

      // Buscar la relación agente–paciente
      const relationRef = collection(imedicDb, "agentPatientRelations");
      const relationQuery = query(relationRef, where("patientId", "==", currentUser.uid));
      const relationSnapshot = await getDocs(relationQuery);
      if (relationSnapshot.empty) {
        console.warn("No se encontró relación para el paciente");
        return;
      }
      const relationData = relationSnapshot.docs[0].data();
      const agentUid = relationData.agentUid;

      // Buscar el chat correspondiente
      const chatsRef = collection(imedicDb, "chats");
      const chatQuery = query(
        chatsRef,
        where("patientUid", "==", currentUser.uid),
        where("agentUid", "==", agentUid)
      );
      const chatSnapshot = await getDocs(chatQuery);
      if (chatSnapshot.empty) {
        console.warn("No se encontró chat para la relación");
        return;
      }
      const chatId = chatSnapshot.docs[0].id;

      // Procesar URL de archivos
      let examFilesText = "N/A";
      if (appointmentInfo.examDocuments && appointmentInfo.examDocuments.length > 0) {
        examFilesText = appointmentInfo.examDocuments
          .map((url) => `[Ver archivo](${url})`)
          .join(" | ");
      }

      const patientInfo = patientData
        ? `
| Campo              | Valor                                |
|--------------------|--------------------------------------|
| Nombres            | ${patientData.nombres}               |
| Apellidos          | ${patientData.apellidos}             |
| Identificación     | ${patientData.identificacion}        |
| Email              | ${patientData.email}                 |
| Teléfono           | ${patientData.telefono}              |
| Dirección          | ${patientData.direccion}             |
| Estado             | ${patientData.estado}                |
| Lugar de Solicitud | ${patientData.lugarSolicitud}        |
| Creado             | ${patientData.createdAt ? patientData.createdAt.toDate().toLocaleString() : ""} |
`
        : "No disponible.";

      // Construir mensaje en Markdown con los nuevos campos
      const messageText = `
### Datos del Paciente
${patientInfo}

### Datos de la Solicitud de Cita
| Campo                  | Valor                                   |
|------------------------|-----------------------------------------|
| Doctor                 | ${appointmentInfo.doctorName}           |
| Especialidad           | ${appointmentInfo.specialty}            |
| Sede                   | ${appointmentInfo.sede}                 |
| Tipo de Cita           | ${appointmentInfo.appointmentType}      |
| Motivo de la Cita      | ${appointmentInfo.appointmentReason}    |
| Teléfono de contacto   | ${appointmentInfo.contactPhone}         |
| Correo electrónico     | ${appointmentInfo.confirmEmail}         |
| EPS                    | ${appointmentInfo.selectedEps}          |
| Lugar de residencia    | ${appointmentInfo.residence}            |
| Observaciones          | ${appointmentInfo.additionalInfo}       |
| Archivos de exámenes   | ${examFilesText}                        |
`;

      await addDoc(collection(imedicDb, "chats", chatId, "messages"), {
        message: messageText,
        sender: currentUser.uid,
        status: "emitido",
        timestamp: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error enviando mensaje al chat de soporte:", error);
    }
  }

  // ================================
  // 8. Crear la solicitud en "solicitudesCitas"
  // ================================
  const createRequest = async (data) => {
    const docRef = await addDoc(collection(imedicDb, "solicitudesCitas"), {
      ...data,
      createdAt: Timestamp.now(),
      status: "solicitando",
    });
    return docRef.id;
  };

  // ================================
  // 9. Funciones de validación
  // ================================
  /**
   * Determina si dos fechas están en el mismo día (compara año-mes-día).
   */
  const isSameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  /**
   * Determina si d1 y d2 están dentro de la misma semana.
   */
  const isWithin7Days = (d1, d2) => {
    const diff = Math.abs(d1 - d2);
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    return diff < sevenDaysMs;
  };

  // ================================
  // 10. Confirmar (flujo final)
  // ================================
  const confirmAppointment = async () => {
    try {
      if (!currentUser) {
        Swal.fire("Error", "El usuario no está autenticado", "error");
        return;
      }
      if (!selectedEps) {
        Swal.fire("Error", "Debe seleccionar una EPS", "error");
        return;
      }
      if (!residence) {
        Swal.fire("Error", "Debe ingresar su lugar de residencia", "error");
        return;
      }
      if (!appointmentType) {
        Swal.fire("Error", "Debe seleccionar el tipo de cita", "error");
        return;
      }
      if (!appointmentReason) {
        Swal.fire("Error", "Debe ingresar el motivo de la cita", "error");
        return;
      }
      if (!contactPhone) {
        Swal.fire("Error", "Debe ingresar su número de teléfono de contacto", "error");
        return;
      }
      if (!confirmEmail) {
        Swal.fire("Error", "Debe ingresar su correo electrónico para verificación", "error");
        return;
      }
      if (patientData && confirmEmail !== patientData.email) {
        Swal.fire("Error", "El correo electrónico ingresado no coincide con el registrado", "error");
        return;
      }
      if (!additionalInfo) {
        Swal.fire("Error", "Debe ingresar observaciones adicionales", "error");
        return;
      }

      // Validaciones:
      // 1. El mismo día con la misma especialidad
      // 2. La misma semana con el mismo médico
      const now = new Date();
      for (let req of requests) {
        const createdAt = req.createdAt?.toDate?.() || null;
        if (!createdAt) continue;

        // Misma especialidad el mismo día
        if (req.specialty === selectedSpecialty && isSameDay(createdAt, now)) {
          Swal.fire(
            "Atención",
            `Ya tienes una solicitud de esta especialidad hoy (${selectedSpecialty}).`,
            "info"
          );
          return;
        }

        // Mismo doctor en la misma semana
        if (req.doctorId === selectedDoctor.id && isWithin7Days(createdAt, now)) {
          Swal.fire(
            "Atención",
            `Ya tienes una solicitud con este doctor esta misma semana (${selectedDoctor.doctorName}).`,
            "info"
          );
          return;
        }
      }

      // Subir archivos
      let examDocuments = [];
      if (examFiles && examFiles.length > 0) {
        examDocuments = await uploadExamFiles(examFiles);
        await saveExamDocuments(examDocuments);
      }

      // Construir objeto con todos los datos
      const appointmentObj = {
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.doctorName,
        specialty: selectedDoctor.specialty,
        sede: selectedDoctor.sede,
        selectedEps,
        residence,
        appointmentType,
        appointmentReason,
        contactPhone,
        confirmEmail,
        additionalInfo,
        examDocuments,
        uidPaciente: currentUser.uid,
      };

      // Crear solicitud y enviar información al chat
      await createRequest(appointmentObj);
      await sendAppointmentSupportMessage(appointmentObj);

      Swal.fire("Solicitud Enviada", "Su solicitud ha sido enviada al soporte", "success");

      // Resetear campos
      setCurrentStep(1);
      setSpecialtySearch("");
      setSelectedSpecialty("");
      setFilteredSpecialties([]);
      setFilteredDoctors([]);
      setSelectedDoctor(null);
      setSelectedEps("");
      setResidence("");
      setAppointmentType("");
      setAppointmentReason("");
      setContactPhone("");
      setConfirmEmail("");
      setAdditionalInfo("");
      setExamFiles([]);

      await reloadRequests();

      if (onAppointmentConfirmed) {
        onAppointmentConfirmed();
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  // ================================
  // 11. Render tabla (y steps)
  // ================================
  const renderStatusCell = (status) => {
    let color = "grey";
    if (status === "solicitando") color = "red";
    else if (status === "en proceso") color = "blue";
    else if (status === "asignada") color = "green";

    return <span style={{ color }}>{status}</span>;
  };

  return (
    <div id="medical-appointments">
      {/* Tabla de solicitudes */}
      <div className="requests-table">
        <h2>Mis Solicitudes de Cita</h2>
        {requests.length === 0 ? (
          <p>No tiene solicitudes</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Especialidad</th>
                <th>Doctor</th>
                <th>Estado</th>
                <th>Fecha Creación</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id}>
                  <td>{req.specialty}</td>
                  <td>{req.doctorName}</td>
                  <td>{renderStatusCell(req.status)}</td>
                  <td>
                    {req.createdAt
                      ? req.createdAt.toDate().toLocaleString()
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <StepIndicator currentStep={currentStep} />

      {/* Paso 1: Seleccionar Especialidad */}
      {currentStep === 1 && (
        <div className="step1 form-card">
          <h3>Paso 1: Seleccionar Especialidad</h3>
          <input
            type="text"
            value={specialtySearch}
            onChange={(e) => setSpecialtySearch(e.target.value)}
            placeholder="Escriba la especialidad..."
          />
          {filteredSpecialties.length > 0 && (
            <ul className="autocomplete-list">
              {filteredSpecialties.map((spec) => (
                <li
                  key={spec}
                  onClick={() => {
                    setSelectedSpecialty(spec);
                    setSpecialtySearch(spec);
                  }}
                >
                  {spec}
                </li>
              ))}
            </ul>
          )}
          {selectedSpecialty && (
            <div className="info-selected">
              <p>
                Especialidad elegida: <strong>{selectedSpecialty}</strong>
              </p>
            </div>
          )}
          <button disabled={!selectedSpecialty} onClick={nextStep}>
            Siguiente
          </button>
        </div>
      )}

      {/* Paso 2: Seleccionar Doctor */}
      {currentStep === 2 && (
        <div className="step2 form-card">
          <h3>Paso 2: Seleccionar Doctor</h3>
          {filteredDoctors.length === 0 ? (
            <p>No hay doctores con la especialidad "{selectedSpecialty}"</p>
          ) : (
            <table className="doctors-table">
              <thead>
                <tr>
                  <th>Doctor</th>
                  <th>Sede</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doc) => (
                  <tr key={doc.id}>
                    <td>{doc.doctorName}</td>
                    <td>{doc.sede || "N/D"}</td>
                    <td>
                      <button onClick={() => setSelectedDoctor(doc)}>
                        Seleccionar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {selectedDoctor && (
            <div className="info-selected">
              <p>
                Doctor seleccionado: <strong>{selectedDoctor.doctorName}</strong>
              </p>
              <p>
                Sede: <strong>{selectedDoctor.sede || "N/D"}</strong>
              </p>
            </div>
          )}
          <div className="button-group">
            <button onClick={prevStep}>Atrás</button>
            <button disabled={!selectedDoctor} onClick={nextStep}>
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Paso 3: Detalles de la Cita */}
      {currentStep === 3 && (
        <div className="step3 form-card">
          <h3>Paso 3: Detalles de la Cita</h3>
          <div className="form-group">
            <label>Seleccione EPS:</label>
            <select
              value={selectedEps}
              onChange={(e) => setSelectedEps(e.target.value)}
            >
              <option value="">-- Seleccione EPS --</option>
              {epsList.map((eps, idx) => (
                <option key={idx} value={eps}>
                  {eps}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Lugar de residencia:</label>
            <input
              type="text"
              value={residence}
              onChange={(e) => setResidence(e.target.value)}
              placeholder="Ingrese su lugar de residencia"
            />
          </div>
          <div className="form-group">
            <label>Tipo de cita:</label>
            <select
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
            >
              <option value="">-- Seleccione Tipo de Cita --</option>
              <option value="Primera vez">Primera vez</option>
              <option value="Control">Control</option>
            </select>
          </div>
          <div className="form-group">
            <label>Motivo de la cita:</label>
            <textarea
              value={appointmentReason}
              onChange={(e) => setAppointmentReason(e.target.value)}
              placeholder="Ingrese el motivo de la cita"
            />
          </div>
          <div className="form-group">
            <label>Teléfono de contacto:</label>
            <input
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Ingrese su número de teléfono"
            />
          </div>
          <div className="form-group">
            <label>Verificar correo electrónico:</label>
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              placeholder={patientData ? patientData.email : "Ingrese su correo electrónico"}
            />
          </div>
          <div className="form-group">
            <label>Subir archivos de exámenes / órdenes:</label>
            <input type="file" multiple onChange={handleExamFilesChange} />
          </div>
          <div className="form-group">
            <label>Observaciones adicionales:</label>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Ingrese observaciones adicionales"
            />
          </div>
          <div className="button-group">
            <button onClick={prevStep}>Atrás</button>
            <button
              disabled={
                !selectedEps ||
                !residence ||
                !appointmentType ||
                !appointmentReason ||
                !contactPhone ||
                !confirmEmail ||
                !additionalInfo
              }
              onClick={nextStep}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Paso 4: Confirmar Solicitud de Cita */}
      {currentStep === 4 && (
        <div className="step4 form-card">
          <h3>Paso 4: Confirmar Solicitud de Cita</h3>
          <p>
            <strong>Especialidad:</strong> {selectedSpecialty}
          </p>
          <p>
            <strong>Doctor:</strong> {selectedDoctor?.doctorName || ""}
          </p>
          <p>
            <strong>Sede:</strong> {selectedDoctor?.sede || "N/D"}
          </p>
          <p>
            <strong>Tipo de Cita:</strong> {appointmentType}
          </p>
          <p>
            <strong>Motivo de la Cita:</strong> {appointmentReason}
          </p>
          <p>
            <strong>Teléfono de contacto:</strong> {contactPhone}
          </p>
          <p>
            <strong>Correo electrónico:</strong> {confirmEmail}
          </p>
          <p>
            <strong>EPS:</strong> {selectedEps}
          </p>
          <p>
            <strong>Lugar de residencia:</strong> {residence}
          </p>
          <p>
            <strong>Observaciones adicionales:</strong> {additionalInfo}
          </p>
          {examFiles && examFiles.length > 0 && (
            <p>
              <strong>Archivos seleccionados:</strong>{" "}
              {Array.from(examFiles)
                .map((file) => file.name)
                .join(", ")}
            </p>
          )}
          <div className="button-group">
            <button onClick={prevStep}>Atrás</button>
            <button onClick={confirmAppointment}>Confirmar</button>
          </div>
        </div>
      )}

      <style jsx>{`
        #medical-appointments {
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          max-width: 900px;
          margin: 20px auto;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        h2 {
          text-align: center;
          margin-bottom: 20px;
        }
        .requests-table {
          margin-bottom: 30px;
          overflow-x: auto;
        }
        .requests-table table {
          width: 100%;
          border-collapse: collapse;
        }
        .requests-table th,
        .requests-table td {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: left;
        }
        .requests-table th {
          background-color: #f7f7f7;
        }
        .form-card {
          background-color: #fafafa;
          padding: 20px;
          margin: 20px 0;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
        }
        .form-group {
          margin-bottom: 15px;
          display: flex;
          flex-direction: column;
        }
        label {
          margin-bottom: 5px;
          font-weight: 500;
        }
        input[type="text"],
        input[type="email"],
        select,
        textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }
        input[type="file"] {
          margin-top: 5px;
        }
        textarea {
          resize: vertical;
          min-height: 80px;
        }
        .autocomplete-list {
          border: 1px solid #ccc;
          border-radius: 5px;
          max-width: 300px;
          background: #fff;
          list-style: none;
          padding: 0;
          margin: 5px 0;
        }
        .autocomplete-list li {
          padding: 8px;
          cursor: pointer;
        }
        .autocomplete-list li:hover {
          background: #f0f0f0;
        }
        .doctors-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        .doctors-table th,
        .doctors-table td {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: left;
        }
        .info-selected {
          margin-top: 10px;
          padding: 10px;
          background-color: #e7f3ff;
          border-left: 4px solid #2196f3;
        }
        .button-group {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
        }
        button {
          padding: 10px 20px;
          font-size: 1rem;
          border: none;
          border-radius: 4px;
          background-color: #2196f3;
          color: #fff;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button[disabled] {
          background-color: #ccc;
          cursor: not-allowed;
        }
        button:hover:not([disabled]) {
          background-color: #1976d2;
        }
      `}</style>
    </div>
  );
}
