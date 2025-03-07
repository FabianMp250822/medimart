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
  runTransaction,
} from "firebase/firestore";
import { imedicDb, imedicAuth } from "@/lib/firebase";
import StepIndicator from "./StepIndicator";

import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import Swal from "sweetalert2";
import "./MedicalAppointments.css";

/* ===============================
   FUNCIONES AUXILIARES PARA HORARIOS
   =============================== */

// Genera intervalos (slots) de 20 minutos a partir de un intervalo dado.
function generateSlotsForInterval(candidateDate, interval) {
  const slots = [];
  const startTime = dayjs(candidateDate)
    .hour(parseInt(interval.start.split(":")[0], 10))
    .minute(parseInt(interval.start.split(":")[1], 10));
  const endTime = dayjs(candidateDate)
    .hour(parseInt(interval.end.split(":")[0], 10))
    .minute(parseInt(interval.end.split(":")[1], 10));

  const slotDuration = 20;
  let current = startTime;

  while (current.add(slotDuration, "minute").isSameOrBefore(endTime)) {
    const slotStart = current.format("HH:mm");
    const slotEnd = current.add(slotDuration, "minute").format("HH:mm");
    slots.push(`${slotStart} - ${slotEnd}`);
    current = current.add(slotDuration, "minute");
  }
  return slots;
}

// Obtiene los intervalos reservados consultando la subcolección "schedules"
// del doctor (identificado por doctorId) para la fecha (candidateDate) dada.
async function getBookedSlots(doctorId, candidateDate) {
  const scheduleDocId = dayjs(candidateDate).format("YYYY-MM-DD");
  const scheduleRef = doc(
    imedicDb,
    "doctores",
    doctorId,
    "schedules",
    scheduleDocId
  );
  const scheduleDoc = await getDoc(scheduleRef);
  if (scheduleDoc.exists()) {
    return scheduleDoc.data().bookedSlots || [];
  }
  return [];
}

// Calcula las fechas e intervalos disponibles para un doctor,
// descartando aquellos intervalos que ya están reservados (según el documento
// en la subcolección "schedules") y bloqueando el día completo si se
// alcanza el límite de pacientes.
async function computeAvailableDatesForDoctor(doctor) {
  const availableDates = [];
  const today = dayjs();
  const endOfYear = dayjs().endOf("year");

  async function processSchedule(scheduleArray, isCyclic = false) {
    for (const entry of scheduleArray) {
      if (isCyclic) {
        const dayOfWeek = dayjs(
          entry.date.toDate ? entry.date.toDate() : entry.date
        ).day();

        let dateCandidate = today;
        while (
          dateCandidate.isBefore(endOfYear) ||
          dateCandidate.isSame(endOfYear)
        ) {
          if (dateCandidate.day() === dayOfWeek) {
            let slotsForDate = [];
            for (const interval of entry.intervals) {
              const slots = generateSlotsForInterval(
                dateCandidate.toDate(),
                interval
              );
              slotsForDate = slotsForDate.concat(slots);
            }
            const bookedSlots = await getBookedSlots(
              doctor.id,
              dateCandidate.toDate()
            );
            if (bookedSlots.length < doctor.maxPatients) {
              const availableSlots = slotsForDate.filter(
                (slot) => !bookedSlots.includes(slot)
              );
              if (availableSlots.length > 0) {
                availableDates.push({
                  date: dateCandidate.toDate(),
                  availableSlots,
                });
              }
            }
          }
          dateCandidate = dateCandidate.add(1, "day");
        }
      } else {
        const candidate = dayjs(
          entry.date.toDate ? entry.date.toDate() : entry.date
        );
        if (candidate.isBefore(today, "day")) continue;

        let slotsForDate = [];
        for (const interval of entry.intervals) {
          const slots = generateSlotsForInterval(candidate.toDate(), interval);
          slotsForDate = slotsForDate.concat(slots);
        }
        const bookedSlots = await getBookedSlots(doctor.id, candidate.toDate());
        if (bookedSlots.length < doctor.maxPatients) {
          const availableSlots = slotsForDate.filter(
            (slot) => !bookedSlots.includes(slot)
          );
          if (availableSlots.length > 0) {
            availableDates.push({
              date: candidate.toDate(),
              availableSlots,
            });
          }
        }
      }
    }
  }

  if (doctor.cyclicSchedule && doctor.cyclicSchedule.length > 0) {
    await processSchedule(doctor.cyclicSchedule, true);
  }
  if (doctor.variableSchedule && doctor.variableSchedule.length > 0) {
    await processSchedule(doctor.variableSchedule, false);
  }
  availableDates.sort((a, b) => a.date - b.date);
  return availableDates;
}

/* ========================================
   FUNCION: bookAppointment (transacción)
   ======================================== */
// Se utiliza una transacción para actualizar de forma atómica el documento
// de agenda en la subcolección "schedules" (dentro del documento del doctor)
// y para crear la cita en la colección "citas".
async function bookAppointment(doctorId, appointmentDate, interval, appointmentData) {
  const scheduleDocId = dayjs(appointmentDate).format("YYYY-MM-DD");
  const scheduleRef = doc(
    imedicDb,
    "doctores",
    doctorId,
    "schedules",
    scheduleDocId
  );
  const citasCollectionRef = collection(imedicDb, "citas");

  try {
    await runTransaction(imedicDb, async (transaction) => {
      // Lee o inicializa el documento de agenda para ese día del doctor.
      const scheduleDoc = await transaction.get(scheduleRef);
      let bookedSlots = [];
      let appointmentsCount = 0;
      if (scheduleDoc.exists()) {
        bookedSlots = scheduleDoc.data().bookedSlots || [];
        appointmentsCount = scheduleDoc.data().appointmentsCount || 0;
      }

      // Lee el documento del doctor para obtener el límite de pacientes del día.
      const doctorRef = doc(imedicDb, "doctores", doctorId);
      const doctorDoc = await transaction.get(doctorRef);
      const maxPatients = doctorDoc.data().maxPatients;

      // Verifica que el intervalo no esté ya reservado y que no se exceda el límite.
      if (bookedSlots.includes(interval)) {
        throw new Error("El intervalo ya está reservado.");
      }
      if (appointmentsCount >= maxPatients) {
        throw new Error("Se ha alcanzado el límite de pacientes para este día.");
      }

      // Actualiza la agenda: agrega el intervalo reservado y aumenta el contador.
      const updatedBookedSlots = [...bookedSlots, interval];
      transaction.set(
        scheduleRef,
        {
          doctorId, // Se almacena el ID del doctor para mayor claridad.
          date: scheduleDocId,
          bookedSlots: updatedBookedSlots,
          appointmentsCount: appointmentsCount + 1,
        },
        { merge: true }
      );

      // Crea la cita en la colección "citas".
      const newAppointmentRef = doc(collection(imedicDb, "citas"));
      transaction.set(newAppointmentRef, {
        ...appointmentData,
        doctorId,
        date: Timestamp.fromDate(new Date(appointmentDate)),
        interval,
        createdAt: Timestamp.now(),
      });
    });
    return true;
  } catch (error) {
    throw error;
  }
}

/* ========================================
   FUNCION: sendAppointmentSupportMessage
   ======================================== */
// Esta función se encarga de enviar un mensaje al chat de soporte con los detalles
// de la cita confirmada.
async function sendAppointmentSupportMessage({ doctorName, specialty, date, interval }) {
  try {
    const user = imedicAuth.currentUser;
    if (!user) throw new Error("Usuario no autenticado");

    // Buscar la relación agente–paciente para obtener el agente asignado.
    const relationRef = collection(imedicDb, "agentPatientRelations");
    const relationQuery = query(relationRef, where("patientId", "==", user.uid));
    const relationSnapshot = await getDocs(relationQuery);
    if (relationSnapshot.empty) {
      console.warn("No se encontró relación para el paciente");
      return;
    }
    const relationData = relationSnapshot.docs[0].data();
    const agentUid = relationData.agentUid;

    // Buscar el chat correspondiente usando patientUid y agentUid.
    const chatsRef = collection(imedicDb, "chats");
    const chatQuery = query(
      chatsRef,
      where("patientUid", "==", user.uid),
      where("agentUid", "==", agentUid)
    );
    const chatSnapshot = await getDocs(chatQuery);
    if (chatSnapshot.empty) {
      console.warn("No se encontró chat para la relación");
      return;
    }
    const chatId = chatSnapshot.docs[0].id;

    // Función auxiliar para determinar el turno (día, tarde, noche) a partir del intervalo.
    const getShiftFromTime = (interval) => {
      const start = interval.split(" - ")[0];
      const hour = parseInt(start.split(":")[0]);
      if (hour < 12) return "día";
      if (hour < 18) return "tarde";
      return "noche";
    };

    const shift = getShiftFromTime(interval);

    // Construir el mensaje de solicitud de confirmación.
    const messageText = `Buenas, he apartado una cita para el turno de ${shift} con el Dr. ${doctorName} el ${date} a las ${interval.split(" - ")[0]}. ¿Me regala una confirmación y los detalles de la cita?`;

    // Enviar el mensaje al chat (a la subcolección "messages").
    const messagesRef = collection(imedicDb, "chats", chatId, "messages");
    await addDoc(messagesRef, {
      message: messageText,
      sender: user.uid,
      status: "emitido", // Mensaje del paciente
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error enviando mensaje al chat de soporte:", error);
  }
}

/* ===============================
   COMPONENTE: MedicalAppointments
   =============================== */
   export default function MedicalAppointments({ onAppointmentConfirmed }) {
  const [appointments, setAppointments] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  const [specialtySearch, setSpecialtySearch] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [filteredSpecialties, setFilteredSpecialties] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableIntervals, setAvailableIntervals] = useState([]);
  const [selectedInterval, setSelectedInterval] = useState(null);

  const currentUser = imedicAuth.currentUser;

  const fetchAppointments = async () => {
    if (!currentUser) return;
    try {
      const q = query(
        collection(imedicDb, "citas"),
        where("uidPaciente", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const appointmentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Error al obtener citas:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [currentUser]);

  const deleteAppointment = async (appointmentId) => {
    try {
      // Referencia a la cita a eliminar
      const appointmentRef = doc(imedicDb, "citas", appointmentId);
      // Recuperar la información de la cita (fuera de la transacción)
      const appointmentSnap = await getDoc(appointmentRef);
      if (!appointmentSnap.exists()) {
        throw new Error("La cita no existe.");
      }
      const appointmentData = appointmentSnap.data();
      const doctorId = appointmentData.doctorId;
      // Convertir la fecha de Timestamp a Date
      const appointmentDate = appointmentData.date.toDate();
      const interval = appointmentData.interval;
  
      // Construir la referencia del documento de agenda (schedules)
      const scheduleDocId = dayjs(appointmentDate).format("YYYY-MM-DD");
      const scheduleRef = doc(imedicDb, "doctores", doctorId, "schedules", scheduleDocId);
  
      // Ejecutar la transacción para eliminar la cita y actualizar la agenda
      await runTransaction(imedicDb, async (transaction) => {
        // Primero, lee el documento de agenda
        const scheduleSnap = await transaction.get(scheduleRef);
  
        // Ahora que todas las lecturas están completas, realiza las operaciones de escritura
  
        // Elimina la cita
        transaction.delete(appointmentRef);
  
        if (scheduleSnap.exists()) {
          const scheduleData = scheduleSnap.data();
          let bookedSlots = scheduleData.bookedSlots || [];
          let appointmentsCount = scheduleData.appointmentsCount || 0;
  
          // Remueve el intervalo de bookedSlots
          bookedSlots = bookedSlots.filter(slot => slot !== interval);
          // Disminuye el contador de citas
          appointmentsCount = Math.max(appointmentsCount - 1, 0);
  
          // Actualiza el documento de agenda
          transaction.set(scheduleRef, { bookedSlots, appointmentsCount }, { merge: true });
        }
      });
  
      Swal.fire("Eliminado", "La cita fue eliminada correctamente.", "success");
      fetchAppointments();
    } catch (error) {
      console.error("Error al eliminar cita:", error);
      Swal.fire("Error", error.message, "error");
    }
  };
  

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const docsSnap = await getDocs(collection(imedicDb, "doctores"));
        const docsData = docsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllDoctors(docsData);
      } catch (error) {
        console.error("Error fetching doctores:", error);
      }
    };
    fetchDoctors();
  }, []);

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

  useEffect(() => {
    async function computeDates() {
      if (!selectedDoctor) {
        setAvailableDates([]);
        return;
      }
      const dates = await computeAvailableDatesForDoctor(selectedDoctor);
      setAvailableDates(dates);
    }
    computeDates();
  }, [selectedDoctor]);

  useEffect(() => {
    if (!selectedDate) {
      setAvailableIntervals([]);
      return;
    }
    const candidate = availableDates.find(
      (d) => dayjs(d.date).format("YYYY-MM-DD") === selectedDate
    );
    if (candidate) {
      setAvailableIntervals(candidate.availableSlots);
    } else {
      setAvailableIntervals([]);
    }
  }, [selectedDate, availableDates]);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : 1));

  // Se utiliza la función bookAppointment (con transacción) para crear la cita.
  const confirmAppointment = async () => {
    try {
      if (!currentUser) {
        Swal.fire("Error", "El usuario no está autenticado", "error");
        return;
      }
  
      // Verificar si ya existe una cita con el mismo doctor
      const existsSameDoctor = appointments.some(
        (appt) => appt.doctorId === selectedDoctor.id
      );
      if (existsSameDoctor) {
        Swal.fire("Atención", "Ya tienes una cita con este doctor.", "info");
        return;
      }
  
      // Verificar si ya existe una cita en la misma especialidad
      const existsSameSpecialty = appointments.some(
        (appt) => appt.specialty.toLowerCase() === selectedSpecialty.toLowerCase()
      );
      if (existsSameSpecialty) {
        Swal.fire("Atención", "Ya tienes una cita en esta especialidad.", "info");
        return;
      }
  
      // Si pasa las validaciones, se crea la cita y se envía el mensaje al chat de soporte.
      await bookAppointment(
        selectedDoctor.id,
        selectedDate,
        selectedInterval,
        {
          doctorName: selectedDoctor.doctorName,
          specialty: selectedDoctor.specialty,
          uidPaciente: currentUser.uid,
        }
      );
      await sendAppointmentSupportMessage({
        doctorName: selectedDoctor.doctorName,
        specialty: selectedDoctor.specialty,
        date: selectedDate,
        interval: selectedInterval,
      });
      Swal.fire("Cita Creada", "Su cita ha sido registrada con éxito", "success");
  
      // Restablecer estados
      setCurrentStep(1);
      setSpecialtySearch("");
      setSelectedSpecialty("");
      setSelectedDoctor(null);
      setAvailableDates([]);
      setSelectedDate(null);
      setAvailableIntervals([]);
      setSelectedInterval(null);
      fetchAppointments();
  
      // Redirigir al chat de soporte si se proporcionó el callback
      if (onAppointmentConfirmed) {
        onAppointmentConfirmed();
      }
    } catch (error) {
      console.error("Error al crear cita:", error);
      Swal.fire("Error", error.message, "error");
    }
  };
  

  return (
    <div id="medical-appointments">
      <div className="appointments-table">
        <h2>Mis Citas</h2>
        {appointments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Especialidad</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.doctorName}</td>
                  <td>{appt.specialty}</td>
                  <td>{dayjs(appt.date.toDate()).format("YYYY-MM-DD")}</td>
                  <td>{appt.interval}</td>
                  <td>
                    <button onClick={() => deleteAppointment(appt.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No tienes citas asignadas</p>
        )}
      </div>

      <StepIndicator currentStep={currentStep} />

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

          <button disabled={!selectedSpecialty} onClick={nextStep} style={{ marginLeft: "20px" }}>
            Siguiente
          </button>
        </div>
      )}

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
                    <td>{doc.consultingRoom}</td>
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
                Doctor seleccionado:{" "}
                <strong>{selectedDoctor.doctorName}</strong>
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

      {currentStep === 3 && (
        <div className="step3">
          <h3>Paso 3: Seleccionar Fecha y Hora</h3>
          <div style={{ marginBottom: "1rem" }}>
            <Calendar
              onClickDay={(value) => {
                setSelectedDate(dayjs(value).format("YYYY-MM-DD"));
              }}
              tileDisabled={({ date, view }) => {
                if (view === "month") {
                  const found = availableDates.some((item) =>
                    dayjs(item.date).isSame(dayjs(date), "day")
                  );
                  return !found;
                }
                return false;
              }}
              tileClassName={({ date, view }) => {
                if (view === "month") {
                  const found = availableDates.some((item) =>
                    dayjs(item.date).isSame(dayjs(date), "day")
                  );
                  return found ? "" : "unavailable-date";
                }
              }}
              minDate={new Date()}
            />
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <div>
              <p>Intervalos Disponibles:</p>
              {selectedDate ? (
                availableIntervals.length > 0 ? (
                  <ul className="slots-grid">
                    {availableIntervals.map((slot, idx) => (
                      <li key={idx}>
                        <button onClick={() => setSelectedInterval(slot)}>
                          {slot}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay intervalos disponibles para esta fecha</p>
                )
              ) : (
                <p>Seleccione una fecha en el calendario</p>
              )}
            </div>
          </div>

          <div style={{ marginTop: "10px" }}>
            <p>
              Fecha seleccionada:{" "}
              <strong>{selectedDate || "Ninguna"}</strong>
            </p>
            <p>
              Intervalo seleccionado:{" "}
              <strong>{selectedInterval || "Ninguno"}</strong>
            </p>
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <button onClick={prevStep} style={{ marginRight: "20px" }}>
              Atrás
            </button>
            <button
              disabled={!selectedDate || !selectedInterval}
              onClick={nextStep}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="step4">
          <h3>Paso 4: Confirmar Cita</h3>
          <p>
            <strong>Especialidad:</strong> {selectedSpecialty}
          </p>
          <p>
            <strong>Doctor:</strong> {selectedDoctor?.doctorName || ""}
          </p>
          <p>
            <strong>Fecha:</strong> {selectedDate}
          </p>
          <p>
            <strong>Hora:</strong> {selectedInterval}
          </p>

          <button onClick={prevStep} style={{ marginRight: "20px" }}>
            Atrás
          </button>
          <button onClick={confirmAppointment}>Confirmar</button>
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
        .appointments-table {
          margin-bottom: 20px;
        }
        .appointments-table table {
          width: 100%;
          border-collapse: collapse;
        }
        .appointments-table th,
        .appointments-table td {
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
        button {
          margin-top: 5px;
          margin-bottom: 10px;
          padding: 8px;
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
        /* Estilos para el calendario */
        .react-calendar {
          width: 100%;
          max-width: 800px;
          background: #f8f8f8;
          border: none;
          font-family: Arial, Helvetica, sans-serif;
          line-height: 1.125em;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          margin: 0 auto;
        }
        .react-calendar__tile {
          padding: 10px;
        }
        .unavailable-date {
          background-color: #fff !important;
          color: #000 !important;
        }
        /* Grid de intervalos en 5 columnas */
        .slots-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .slots-grid li {
          margin: 0;
        }
        .slots-grid li button {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #fff;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.3s;
        }
        .slots-grid li button:hover {
          background-color: #f0f0f0;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
