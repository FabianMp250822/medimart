"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  Timestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { imedicDb, imedicAuth } from "@/lib/firebase";
import StepIndicator from "./StepIndicator";
import Swal from "sweetalert2";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import doctorsData from "./doctors.json";
import { getDepartments, getCitiesByDepartment } from "../data/colombiaData";

import {
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Stack,
  CircularProgress,
} from "@mui/material";

export default function MedicalAppointments({ onAppointmentConfirmed }) {
  // ================================
  // 1. Estados para solicitudes y pasos
  // ================================
  const [requests, setRequests] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Paso 1
  const [specialtySearch, setSpecialtySearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [filteredSpecialties, setFilteredSpecialties] = useState([]);

  // Paso 2
  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Paso 3 - Detalles de la Cita
  const [epsList, setEpsList] = useState([]);
  const [selectedEps, setSelectedEps] = useState("");
  const [customEps, setCustomEps] = useState("");
  const [showCustomEpsInput, setShowCustomEpsInput] = useState(false);
  const [residence, setResidence] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [appointmentType, setAppointmentType] = useState("");
  const [appointmentReason, setAppointmentReason] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [examFiles, setExamFiles] = useState([]);
  // Nuevo campo para fecha de nacimiento
  const [birthDate, setBirthDate] = useState("");

  // Datos paciente
  const [patientData, setPatientData] = useState(null);

  // Obtener usuario actual
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

  // 2.3. Filtrar doctores según especialidad seleccionada
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

  // 2.5. Cargar datos del paciente
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

  // 2.6. Actualizar confirmEmail y fecha de nacimiento con datos del paciente si están disponibles
  useEffect(() => {
    if (patientData) {
      if (!confirmEmail) {
        setConfirmEmail(patientData.email);
      }
      if (!birthDate && patientData.fechaNacimiento) {
        setBirthDate(patientData.fechaNacimiento);
      }
    }
  }, [patientData, confirmEmail, birthDate]);

  // 2.7. Cargar solicitudes y, en su lugar, citas si existen
  useEffect(() => {
    if (!currentUser) return;

    // Consultar la colección "citas"
    const citasQuery = query(
      collection(imedicDb, "citas"),
      where("uidPaciente", "==", currentUser.uid)
    );

    const solQuery = query(
      collection(imedicDb, "solicitudesCitas"),
      where("uidPaciente", "==", currentUser.uid)
    );

    let unsubscribeSol = null;

    (async () => {
      const citasSnap = await getDocs(citasQuery);

      if (!citasSnap.empty) {
        // Si hay citas definitivas, usar esos datos y eliminar solicitudes
        const citasData = citasSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Eliminar cualquier solicitud pendiente
        const solSnap = await getDocs(solQuery);
        for (const docSnap of solSnap.docs) {
          await deleteDoc(doc(imedicDb, "solicitudesCitas", docSnap.id));
        }

        setRequests(citasData);
      } else {
        // Si no hay citas, escuchar solicitudes en tiempo real
        unsubscribeSol = onSnapshot(solQuery, (solSnap) => {
          const solData = solSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setRequests(solData);
        });
      }
    })();

    return () => {
      if (unsubscribeSol) unsubscribeSol();
    };
  }, [currentUser]);

  // Cargar departamentos al iniciar
  useEffect(() => {
    const allDepartments = getDepartments();
    setDepartments(allDepartments);
  }, []);

  // Filtrar ciudades según el departamento seleccionado
  useEffect(() => {
    if (selectedDepartment) {
      const citiesOfDepartment = getCitiesByDepartment(selectedDepartment);
      setAvailableCities(citiesOfDepartment);
    } else {
      setAvailableCities([]);
    }
    // Limpiar la selección de ciudad cuando cambia el departamento
    setSelectedCity("");
  }, [selectedDepartment]);

  // ================================
  // 3. Función para recargar solicitudes
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
  // 4. Función para eliminar solicitud
  // ================================
  const deleteRequest = async (id) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "No podrá revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(imedicDb, "solicitudesCitas", id));
          Swal.fire("Eliminada!", "La solicitud ha sido eliminada.", "success");
          await reloadRequests();
        } catch (error) {
          console.error("Error al eliminar la solicitud:", error);
          Swal.fire("Error", "No se pudo eliminar la solicitud", "error");
        }
      }
    });
  };

  // ================================
  // 5. Manejo de pasos
  // ================================
  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : 1));

  // ================================
  // 6. Subida de archivos
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
  // 7. Guardar archivos en subcolección
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
  // 8. Enviar mensaje al chat de soporte (CORRECCIÓN EN LA LISTA DE ARCHIVOS)
  // ================================
  async function ensureAgentPatientRelation() {
    // Comprueba si ya existe relación
    const relQ = query(
      collection(imedicDb, "agentPatientRelations"),
      where("patientId", "==", currentUser.uid)
    );
    const relSnap = await getDocs(relQ);
    if (relSnap.empty) {
      // Si no existe, asigna el primer agente
      const agentesSnap = await getDocs(collection(imedicDb, "agentes"));
      if (!agentesSnap.empty) {
        const firstAgent = agentesSnap.docs[0];
        await addDoc(collection(imedicDb, "agentPatientRelations"), {
          patientId: currentUser.uid,
          agentUid: firstAgent.id,
        });
      }
    }
  }

  async function sendAppointmentSupportMessage(appointmentInfo) {
    try {
      // Asegurarse de la relación agente–paciente
      if (currentUser) {
        await ensureAgentPatientRelation();
      }

      // Buscar relación
      const relationRef = collection(imedicDb, "agentPatientRelations");
      const relationQuery = query(relationRef, where("patientId", "==", currentUser.uid));
      const relationSnapshot = await getDocs(relationQuery);
      if (relationSnapshot.empty) {
        console.warn("No se encontró relación para el paciente");
        return;
      }
      const relationData = relationSnapshot.docs[0].data();
      const agentUid = relationData.agentUid;

      // Buscar chat
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

      // Construir cadena Markdown con varios archivos
      let examFilesText = "N/A";
      if (
        appointmentInfo.examDocuments &&
        appointmentInfo.examDocuments.length > 0
      ) {
        // Se crea una lista en Markdown, con cada archivo en su propia línea
        examFilesText = appointmentInfo.examDocuments
          .map(
            (url, index) =>
              `- Ver archivo ${index + 1}`
          )
          .join("\n");
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
| Creado             | ${
            patientData.createdAt
              ? patientData.createdAt.toDate().toLocaleString()
              : ""
          } |
`
        : "No disponible.";

      const messageText = `
### Datos del Paciente
${patientInfo}

### Datos de la Solicitud de Cita
| Campo                  | Valor                                   |
|------------------------|-----------------------------------------|
| Doctor                 | ${appointmentInfo.doctorName}           |
| Especialidad           | ${appointmentInfo.specialty}            |
| Sede                   | ${appointmentInfo.sede}                 |
| Fecha de Nacimiento    | ${appointmentInfo.birthDate}            |
| Tipo de Cita           | ${appointmentInfo.appointmentType}      |
| Motivo de la Cita      | ${appointmentInfo.appointmentReason}    |
| Teléfono de contacto   | ${appointmentInfo.contactPhone}         |
| Correo electrónico     | ${appointmentInfo.confirmEmail}         |
| EPS                    | ${appointmentInfo.selectedEps}          |
| Departamento           | ${appointmentInfo.department}           |
| Ciudad                 | ${appointmentInfo.city}                 |
| Observaciones          | ${appointmentInfo.additionalInfo}       |
| Archivos de exámenes   | 
${examFilesText}
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
  // 9. Crear solicitud en "solicitudesCitas"
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
  // 10. Funciones de validación de fechas
  // ================================
  const isSameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const isWithin7Days = (d1, d2) => {
    const diff = Math.abs(d1 - d2);
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    return diff < sevenDaysMs;
  };

  // ================================
  // 11. Confirmar Solicitud de Cita (flujo final)
  // ================================
  const confirmAppointment = async () => {
    setLoading(true);
    try {
      if (!currentUser) {
        Swal.fire("Error", "El usuario no está autenticado", "error");
        return;
      }
      if (!selectedEps) {
        Swal.fire("Error", "Debe seleccionar una EPS", "error");
        return;
      }
      if (!selectedDepartment) {
        Swal.fire("Error", "Debe seleccionar un departamento", "error");
        return;
      }
      if (!selectedCity) {
        Swal.fire("Error", "Debe seleccionar una ciudad", "error");
        return;
      }
      // Nueva validación para fecha de nacimiento
      if (!birthDate) {
        Swal.fire("Error", "Debe ingresar su fecha de nacimiento", "error");
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
        Swal.fire(
          "Error",
          "El correo electrónico ingresado no coincide con el registrado",
          "error"
        );
        return;
      }
      if (!additionalInfo) {
        Swal.fire("Error", "Debe ingresar observaciones adicionales", "error");
        return;
      }

      // Validaciones
      const now = new Date();
      for (let req of requests) {
        const createdAt = req.createdAt?.toDate?.() || null;
        if (!createdAt) continue;
        // Mismo doctor en 7 días
        if (req.doctorId === selectedDoctor.id && isWithin7Days(createdAt, now)) {
          Swal.fire(
            "Atención",
            `Ya tienes una solicitud con este doctor esta misma semana (${selectedDoctor.doctorName}).`,
            "info"
          );
          return;
        }
      }

      let examDocuments = [];
      if (examFiles && examFiles.length > 0) {
        examDocuments = await uploadExamFiles(examFiles);
        await saveExamDocuments(examDocuments);
      }

      const finalEps = selectedEps === "OTRA" ? customEps : selectedEps;
      // Crear un string con la información de residencia completa
      const residenceInfo = `${selectedCity}, ${selectedDepartment}`;

      const appointmentObj = {
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.doctorName,
        specialty: selectedDoctor.specialty,
        sede: selectedDoctor.sede,
        selectedEps: finalEps, // Usar la EPS final determinada
        department: selectedDepartment,
        city: selectedCity,
        residence: residenceInfo, // Para mantener retrocompatibilidad
        birthDate, // Añadir fecha de nacimiento
        appointmentType,
        appointmentReason,
        contactPhone,
        confirmEmail,
        additionalInfo,
        examDocuments,
        uidPaciente: currentUser.uid,
      };

      // Crear solicitud y enviar mensaje al chat
      await createRequest(appointmentObj);
      await sendAppointmentSupportMessage(appointmentObj);

      Swal.fire(
        "Solicitud Enviada",
        "Su solicitud ha sido enviada al soporte",
        "success"
      );

      // Resetear campos y pasos
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
      setBirthDate(""); // Resetear fecha de nacimiento
      setSelectedDepartment("");
      setSelectedCity("");
      setAvailableCities([]);

      await reloadRequests();

      if (onAppointmentConfirmed) {
        onAppointmentConfirmed();
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // 12. Renderizado de la interfaz
  // ================================
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      {/* Sección de solicitudes */}
      <Typography variant="h5" align="center" gutterBottom>
        {requests.length > 0 && requests[0].status === undefined
          ? "Mis Citas"
          : "Mis Solicitudes de Cita"}
      </Typography>
      {requests.length === 0 ? (
        <Typography align="center" mb={4}>
          No tiene solicitudes ni citas
        </Typography>
      ) : (
        <TableContainer sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Especialidad</TableCell>
                <TableCell>Doctor</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha Creación</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.specialty}</TableCell>
                  <TableCell>{req.doctorName}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color:
                          req.status === "solicitando"
                            ? "red"
                            : req.status === "en proceso"
                            ? "blue"
                            : ["asignada", "agendada"].includes(req.status)
                            ? "green"
                            : "grey",
                      }}
                    >
                      {req.status || "Cita asignada"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {req.createdAt
                      ? req.createdAt.toDate().toLocaleString()
                      : ""}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteRequest(req.id)}
                    >
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <StepIndicator currentStep={currentStep} />

      {/* Paso 1: Seleccionar Especialidad */}
      {currentStep === 1 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Paso 1: Seleccionar Especialidad
          </Typography>
          <TextField
            fullWidth
            label="Buscar especialidad"
            value={specialtySearch}
            onChange={(e) => setSpecialtySearch(e.target.value)}
            variant="outlined"
            sx={{ mb: 1 }}
          />
          {filteredSpecialties.length > 0 && (
            <Box sx={{ border: "1px solid #ccc", borderRadius: 1, p: 1 }}>
              {filteredSpecialties.map((spec) => (
                <Typography
                  key={spec}
                  onClick={() => {
                    setSelectedSpecialty(spec);
                    setSpecialtySearch(spec);
                  }}
                  sx={{ cursor: "pointer", py: 0.5 }}
                >
                  {spec}
                </Typography>
              ))}
            </Box>
          )}
          {selectedSpecialty && (
            <Box
              sx={{
                mt: 2,
                p: 1,
                bgcolor: "#e7f3ff",
                borderLeft: "4px solid #2196f3",
              }}
            >
              <Typography>
                Especialidad elegida: <strong>{selectedSpecialty}</strong>
              </Typography>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 2,
              gap: 2,
            }}
          >
            <Button variant="contained" disabled={!selectedSpecialty} onClick={nextStep}>
              Siguiente
            </Button>
          </Box>
        </Box>
      )}

      {/* Paso 2: Seleccionar Doctor */}
      {currentStep === 2 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Paso 2: Seleccionar Doctor
          </Typography>
          {filteredDoctors.length === 0 ? (
            <Typography sx={{ mb: 2 }}>
              No hay doctores con la especialidad "{selectedSpecialty}"
            </Typography>
          ) : (
            <TableContainer sx={{ mb: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Doctor</TableCell>
                    <TableCell>Sede</TableCell>
                    <TableCell align="center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDoctors.map((docItem) => (
                    <TableRow key={docItem.id}>
                      <TableCell>{docItem.doctorName}</TableCell>
                      <TableCell>{docItem.sede || "N/D"}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => setSelectedDoctor(docItem)}
                        >
                          Seleccionar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {selectedDoctor && (
            <Box
              sx={{
                p: 1,
                bgcolor: "#e7f3ff",
                borderLeft: "4px solid #2196f3",
                mb: 2,
              }}
            >
              <Typography>
                Doctor seleccionado: <strong>{selectedDoctor.doctorName}</strong>
              </Typography>
              <Typography>
                Sede: <strong>{selectedDoctor.sede || "N/D"}</strong>
              </Typography>
            </Box>
          )}
          <Stack direction="row" justifyContent="space-between">
            <Button variant="outlined" onClick={prevStep}>
              Atrás
            </Button>
            <Button
              variant="contained"
              disabled={!selectedDoctor}
              onClick={nextStep}
            >
              Siguiente
            </Button>
          </Stack>
        </Box>
      )}

      {/* Paso 3: Detalles de la Cita */}
      {currentStep === 3 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Paso 3: Detalles de la Cita
          </Typography>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="eps-label">Seleccione EPS</InputLabel>
                <Select
                  labelId="eps-label"
                  label="Seleccione EPS"
                  value={selectedEps}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedEps(value);
                    
                    // Si selecciona "OTRA", mostrar el campo de entrada personalizada
                    if (value === "OTRA") {
                      setShowCustomEpsInput(true);
                    } else {
                      setShowCustomEpsInput(false);
                      setCustomEps("");
                    }
                  }}
                >
                  <MenuItem value="">
                    <em>-- Seleccione EPS --</em>
                  </MenuItem>
                  {epsList.map((eps, idx) => (
                    <MenuItem key={idx} value={eps}>
                      {eps}
                    </MenuItem>
                  ))}
                  <MenuItem value="OTRA">
                    <em>OTRA</em>
                  </MenuItem>
                </Select>
              </FormControl>
              
              {/* Campo para ingresar EPS personalizada */}
              {showCustomEpsInput && (
                <TextField
                  fullWidth
                  label="Especifique su EPS"
                  variant="outlined"
                  value={customEps}
                  onChange={(e) => {
                    let value = e.target.value;
                    
                    // Convertir a mayúsculas
                    value = value.toUpperCase();
                    
                    // Eliminar números y limitar a 50 caracteres
                    value = value.replace(/[0-9]/g, "").slice(0, 50);
                    
                    setCustomEps(value);
                  }}
                  sx={{ mt: 2 }}
                  placeholder="NOMBRE DE SU EPS"
                  helperText="Solo letras, máximo 50 caracteres"
                  inputProps={{
                    style: { textTransform: 'uppercase' },
                    maxLength: 50
                  }}
                  required
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="department-label">Departamento</InputLabel>
                <Select
                  labelId="department-label"
                  label="Departamento"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <MenuItem value="">
                    <em>-- Seleccione Departamento --</em>
                  </MenuItem>
                  {departments.map((dep) => (
                    <MenuItem key={dep} value={dep}>
                      {dep}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" disabled={!selectedDepartment}>
                <InputLabel id="city-label">Ciudad/Municipio</InputLabel>
                <Select
                  labelId="city-label"
                  label="Ciudad/Municipio"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <MenuItem value="">
                    <em>-- Seleccione Ciudad --</em>
                  </MenuItem>
                  {availableCities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Nuevo campo para fecha de nacimiento */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fecha de nacimiento"
                type="date"
                variant="outlined"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="appointment-type-label">Tipo de Cita</InputLabel>
                <Select
                  labelId="appointment-type-label"
                  label="Tipo de Cita"
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                >
                  <MenuItem value="">
                    <em>-- Seleccione Tipo de Cita --</em>
                  </MenuItem>
                  <MenuItem value="Consulta inicial">Consulta inicial</MenuItem>
                  <MenuItem value="Reunión con especialista">
                    Reunión con especialista
                  </MenuItem>
                  <MenuItem value="Revisión de exámenes">
                    Revisión de exámenes
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Motivo de la cita"
                variant="outlined"
                multiline
                rows={3}
                value={appointmentReason}
                onChange={(e) => setAppointmentReason(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Teléfono de contacto"
                variant="outlined"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Verificar correo electrónico"
                variant="outlined"
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" component="label">
                Subir archivos de exámenes / órdenes
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleExamFilesChange}
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Observaciones adicionales"
                variant="outlined"
                multiline
                rows={3}
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
              />
            </Grid>
          </Grid>
          <Stack direction="row" justifyContent="space-between">
            <Button variant="outlined" onClick={prevStep}>
              Atrás
            </Button>
            <Button
              variant="contained"
              disabled={
                !selectedDepartment ||
                !selectedCity ||
                !birthDate || // Añadir validación de fecha de nacimiento
                !appointmentType ||
                !appointmentReason ||
                !contactPhone ||
                !confirmEmail ||
                !additionalInfo ||
                (selectedEps === "" || (selectedEps === "OTRA" && customEps === ""))
              }
              onClick={nextStep}
            >
              Siguiente
            </Button>
          </Stack>
        </Box>
      )}

      {/* Paso 4: Confirmar Solicitud de Cita */}
      {currentStep === 4 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Paso 4: Confirmar Solicitud de Cita
          </Typography>
          <Box sx={{ mb: 2 }}>
            <Typography>
              <strong>Especialidad:</strong> {selectedSpecialty}
            </Typography>
            <Typography>
              <strong>Doctor:</strong> {selectedDoctor?.doctorName || ""}
            </Typography>
            <Typography>
              <strong>Sede:</strong> {selectedDoctor?.sede || "N/D"}
            </Typography>
            <Typography>
              <strong>Fecha de nacimiento:</strong> {birthDate}
            </Typography>
            <Typography>
              <strong>Tipo de Cita:</strong> {appointmentType}
            </Typography>
            <Typography>
              <strong>Motivo de la Cita:</strong> {appointmentReason}
            </Typography>
            <Typography>
              <strong>Teléfono de contacto:</strong> {contactPhone}
            </Typography>
            <Typography>
              <strong>Correo electrónico:</strong> {confirmEmail}
            </Typography>
            <Typography>
              <strong>EPS:</strong> {selectedEps === "OTRA" ? customEps : selectedEps}
            </Typography>
            <Typography>
              <strong>Departamento:</strong> {selectedDepartment}
            </Typography>
            <Typography>
              <strong>Ciudad:</strong> {selectedCity}
            </Typography>
            <Typography>
              <strong>Observaciones adicionales:</strong> {additionalInfo}
            </Typography>
            {examFiles && examFiles.length > 0 && (
              <Typography>
                <strong>Archivos seleccionados:</strong>{" "}
                {Array.from(examFiles)
                  .map((file) => file.name)
                  .join(", ")}
              </Typography>
            )}
          </Box>
          <Stack direction="row" justifyContent="space-between">
            <Button variant="outlined" onClick={prevStep} disabled={loading}>
              Atrás
            </Button>
            <Button
              variant="contained"
              onClick={confirmAppointment}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                "Confirmar"
              )}
            </Button>
          </Stack>
        </Box>
      )}
    </Container>
  );
}


