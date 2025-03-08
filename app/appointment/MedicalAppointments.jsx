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

  // Paso 3
  const [epsList, setEpsList] = useState([]);
  const [selectedEps, setSelectedEps] = useState("");
  const [residence, setResidence] = useState("");
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

      // Procesar URL
      let examFilesText = "N/A";
      if (appointmentInfo.examDocuments && appointmentInfo.examDocuments.length > 0) {
        examFilesText = appointmentInfo.examDocuments
          .map(url => `[Ver archivo](${url})`)
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

      // Construir mensaje en Markdown
      const messageText = `
### Datos del Paciente
${patientInfo}

### Datos de la Solicitud de Cita
| Campo                  | Valor                                |
|------------------------|--------------------------------------|
| Doctor                 | ${appointmentInfo.doctorName}        |
| Especialidad           | ${appointmentInfo.specialty}         |
| Sede                   | ${appointmentInfo.sede}              |
| EPS                    | ${appointmentInfo.selectedEps}       |
| Lugar de residencia    | ${appointmentInfo.residence}         |
| Observaciones          | ${appointmentInfo.additionalInfo}    |
| Archivos de exámenes   | ${examFilesText}                     |
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
   * Aquí se asume "misma semana" como "los últimos 7 días".
   * Podrías personalizarlo si quieres la semana calendario Lunes-Domingo.
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
        if (!createdAt) continue; // si no tiene createdAt, ignoramos

        // 1. Misma especialidad el mismo día
        if (req.specialty === selectedSpecialty && isSameDay(createdAt, now)) {
          Swal.fire(
            "Atención",
            `Ya tienes una solicitud de esta especialidad hoy (${selectedSpecialty}).`,
            "info"
          );
          return;
        }

        // 2. Mismo doctor en la misma semana
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

      // Construir objeto
      const appointmentObj = {
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.doctorName,
        specialty: selectedDoctor.specialty,
        sede: selectedDoctor.sede,
        selectedEps,
        residence,
        additionalInfo,
        examDocuments,
        uidPaciente: currentUser.uid,
      };

      // 1. Crear solicitud
      await createRequest(appointmentObj);

      // 2. Enviar la información al chat
      await sendAppointmentSupportMessage(appointmentObj);

      // 3. Avisar y recargar
      Swal.fire("Solicitud Enviada", "Su solicitud ha sido enviada al soporte", "success");

      // 4. Resetear
      setCurrentStep(1);
      setSpecialtySearch("");
      setSelectedSpecialty("");
      setFilteredSpecialties([]);
      setFilteredDoctors([]);
      setSelectedDoctor(null);
      setSelectedEps("");
      setResidence("");
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

      {/* Paso 1 */}
      {currentStep === 1 && (
        <div className="step1">
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
            <div style={{ marginTop: "10px" }}>
              <p>
                Especialidad elegida: <strong>{selectedSpecialty}</strong>
              </p>
            </div>
          )}
          <button
            disabled={!selectedSpecialty}
            onClick={nextStep}
            style={{ marginLeft: "20px" }}
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Paso 2 */}
      {currentStep === 2 && (
        <div className="step2">
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
            <div style={{ marginTop: "10px" }}>
              <p>
                Doctor seleccionado: <strong>{selectedDoctor.doctorName}</strong>
              </p>
              <p>
                Sede: <strong>{selectedDoctor.sede || "N/D"}</strong>
              </p>
            </div>
          )}
          <button onClick={prevStep} style={{ marginRight: "20px" }}>
            Atrás
          </button>
          <button disabled={!selectedDoctor} onClick={nextStep}>
            Siguiente
          </button>
        </div>
      )}

      {/* Paso 3 */}
      {currentStep === 3 && (
        <div className="step3">
          <h3>Paso 3: Detalles de la Cita</h3>
          <div>
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
          <div>
            <label>Lugar de residencia:</label>
            <input
              type="text"
              value={residence}
              onChange={(e) => setResidence(e.target.value)}
              placeholder="Ingrese su lugar de residencia"
            />
          </div>
          <div>
            <label>Subir archivos de exámenes / órdenes:</label>
            <input type="file" multiple onChange={handleExamFilesChange} />
          </div>
          <div>
            <label>Observaciones adicionales:</label>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Ingrese observaciones adicionales"
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <button onClick={prevStep} style={{ marginRight: "20px" }}>
              Atrás
            </button>
            <button
              disabled={!selectedEps || !residence || !additionalInfo}
              onClick={nextStep}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {/* Paso 4 */}
      {currentStep === 4 && (
        <div className="step4">
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
          <div style={{ marginTop: "20px" }}>
            <button onClick={prevStep} style={{ marginRight: "20px" }}>
              Atrás
            </button>
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
          margin: 0 auto;
        }
        .requests-table {
          margin-bottom: 30px;
        }
        .requests-table table {
          width: 100%;
          border-collapse: collapse;
        }
        .requests-table th,
        .requests-table td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
        }
        .step1,
        .step2,
        .step3,
        .step4 {
          margin-top: 20px;
        }
        input,
        select,
        button,
        textarea {
          margin-top: 5px;
          margin-bottom: 10px;
          padding: 8px;
          width: 100%;
          box-sizing: border-box;
        }
        .autocomplete-list {
          border: 1px solid #ccc;
          border-radius: 5px;
          max-width: 300px;
          background: #fff;
          list-style: none;
          padding: 0;
          margin: 0;
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
        }
        .doctors-table th,
        .doctors-table td {
          border: 1px solid #ccc;
          padding: 8px;
        }
      `}</style>
    </div>
  );
}
