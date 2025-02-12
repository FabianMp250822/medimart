'use client'

import Layout from "@/components/layout/Layout";
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2';
import servicesData from "../service-details-6/servicesData";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  query,
  where,
  updateDoc,
  addDoc
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// Helper para formatear minutos totales a formato de 12 horas (ej. "8:00 AM")
const formatTime = (totalMinutes) => {
  const hours24 = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours24 < 12 ? 'AM' : 'PM';
  const hours12 = hours24 % 12 || 12;
  return `${hours12}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
};

// Helper para formatear una fecha a "YYYY-MM-DD"
const formatDate = (d) => {
  const year = d.getFullYear();
  const month = ('0' + (d.getMonth() + 1)).slice(-2);
  const day = ('0' + d.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
};

// Genera los slots predeterminados (20 intervalos de 20 minutos a partir de las 8:00 AM)
const generateDefaultSlots = () => {
  const slots = [];
  for (let i = 0; i < 20; i++) {
    const startMinutes = 8 * 60 + 20 * i;
    const endMinutes = startMinutes + 20;
    slots.push({
      time: `${formatTime(startMinutes)} - ${formatTime(endMinutes)}`,
      capacity: 3,  // Capacidad predeterminada (puedes ajustar)
      booked: 0
    });
  }
  return slots;
};

export default function Home() {
  // Estados para la fecha y la hora
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');

  // Estados para servicio y subservicio
  const [selectedService, setSelectedService] = useState(servicesData[0].title);
  const [selectedSubservice, setSelectedSubservice] = useState(servicesData[0].subservices[0].name);

  // Estados para datos del paciente y EPS
  const [comesByEPS, setComesByEPS] = useState(false);
  const [selectedEPS, setSelectedEPS] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  // Estado para la disponibilidad del día seleccionado (documento en "citasMedicas")
  const [selectedAvailability, setSelectedAvailability] = useState(null);
  // Estado para la disponibilidad del mes (para colorear el calendario)
  const [monthAvailability, setMonthAvailability] = useState({});

  // Cada vez que se cambie la fecha, el servicio o el subservicio se consulta (o crea) la disponibilidad
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const dateStr = formatDate(date);
        const docId = `${dateStr}_${selectedService}_${selectedSubservice}`;
        const availabilityRef = doc(db, "citasMedicas", docId);
        const docSnap = await getDoc(availabilityRef);
        if (!docSnap.exists()) {
          const defaultData = {
            date: dateStr,
            service: selectedService,
            subservice: selectedSubservice,
            slots: generateDefaultSlots()
          };
          await setDoc(availabilityRef, defaultData);
          setSelectedAvailability(defaultData);
        } else {
          setSelectedAvailability(docSnap.data());
        }
      } catch (error) {
        console.error("Error al obtener o crear la disponibilidad:", error);
        Swal.fire("Error", "No se pudo verificar la disponibilidad.", "error");
      }
    };
    fetchAvailability();
  }, [date, selectedService, selectedSubservice]);

  // Consulta la disponibilidad para el mes (para colorear el calendario)
  useEffect(() => {
    const fetchMonthAvailability = async () => {
      try {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startStr = formatDate(firstDay);
        const endStr = formatDate(lastDay);
        const q = query(
          collection(db, "citasMedicas"),
          where("date", ">=", startStr),
          where("date", "<=", endStr),
          where("service", "==", selectedService),
          where("subservice", "==", selectedSubservice)
        );
        const querySnapshot = await getDocs(q);
        const availData = {};
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          availData[data.date] = data;
        });
        setMonthAvailability(availData);
      } catch (error) {
        console.error("Error al obtener la disponibilidad del mes:", error);
      }
    };
    fetchMonthAvailability();
  }, [date, selectedService, selectedSubservice]);

  // Manejadores del formulario y selectores
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleServiceChange = (event) => {
    const value = event.target.value;
    setSelectedService(value);
    const service = servicesData.find((s) => s.title === value);
    if (service && service.subservices.length > 0) {
      setSelectedSubservice(service.subservices[0].name);
    } else {
      setSelectedSubservice('');
    }
  };

  const handleSubserviceChange = (event) => {
    setSelectedSubservice(event.target.value);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleComesByEPSChange = (event) => {
    setComesByEPS(event.target.value === 'yes');
  };

  const handleEPSChange = (event) => {
    setSelectedEPS(event.target.value);
  };

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para confirmar la cita:
  const handleScheduleAppointment = async () => {
    if (!selectedAvailability) {
      Swal.fire("Error", "No se pudo verificar la disponibilidad.", "error");
      return;
    }
    // Encuentra el slot seleccionado en el documento de disponibilidad
    const slotIndex = selectedAvailability.slots.findIndex(slot => slot.time === selectedTime);
    if (slotIndex === -1) {
      Swal.fire("Error", "El horario seleccionado no es válido.", "error");
      return;
    }
    const slot = selectedAvailability.slots[slotIndex];
    if (slot.booked >= slot.capacity) {
      Swal.fire("No Disponible", "El horario seleccionado ya está lleno.", "error");
      return;
    }
    try {
      // Actualiza la disponibilidad: incrementa el contador booked en ese slot
      const dateStr = formatDate(date);
      const docId = `${dateStr}_${selectedService}_${selectedSubservice}`;
      const availabilityRef = doc(db, "citasMedicas", docId);
      const newBooked = slot.booked + 1;
      const updatedSlots = [...selectedAvailability.slots];
      updatedSlots[slotIndex] = { ...slot, booked: newBooked };
      setSelectedAvailability({ ...selectedAvailability, slots: updatedSlots });
      await updateDoc(availabilityRef, { slots: updatedSlots });

      // Crea el registro de la cita en la colección "appointments"
      const appointmentData = {
        date: dateStr,
        service: selectedService,
        subservice: selectedSubservice,
        time: selectedTime,
        patient: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          comesByEPS,
          EPS: selectedEPS
        },
        createdAt: new Date()
      };

      await addDoc(collection(db, "appointments"), appointmentData);

      Swal.fire({
        title: 'Cita Agendada',
        text: 'Su cita ha sido agendada con éxito. Por favor, consulte su correo para más detalles.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#007bff',
      });
    } catch (error) {
      console.error("Error al confirmar la cita:", error);
      Swal.fire("Error", "No se pudo agendar la cita. Inténtelo nuevamente.", "error");
    }
  };

  // Función para agendar vía WhatsApp (mensaje informativo)
  const handleWhatsAppSchedule = () => {
    const { name, phone, email } = formData;
    const epsMessage = comesByEPS ? `EPS: ${selectedEPS}` : 'No aplica EPS';
    const message = `Hola, mi nombre es ${name}. He agendado mi cita para el día ${date.toDateString()} a las ${selectedTime} con el servicio "${selectedService}" y subservicio "${selectedSubservice}". ${epsMessage}. Teléfono: ${phone}. Correo: ${email}. Deseo confirmación.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // Para el select de horas: se muestran solo los slots disponibles (donde booked < capacity)
  const availableTimeSlots = selectedAvailability 
    ? selectedAvailability.slots.filter(slot => slot.booked < slot.capacity)
    : [];

  // Función para asignar una clase CSS a cada día en el calendario
  // Se marca en rojo ("fully-booked") si todos los slots están llenos o en verde ("available") si hay al menos un slot disponible.
  const tileClassName = ({ date: tileDate }) => {
    const dateStr = formatDate(tileDate);
    const avail = monthAvailability[dateStr];
    if (avail) {
      const allFull = avail.slots.every(slot => slot.booked >= slot.capacity);
      return allFull ? "fully-booked" : "available";
    }
    return "";
  };

  return (
    <>
      <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Agendamiento de Citas Médicas Especializadas">
        {/* Sección de fondo */}
        <section className="appointment-section sec-pad-2" style={{ paddingBottom: '0' }}>
          <div className="outer-container p_relative">
            <div className="bg-layer" style={{ backgroundImage: "url(assets/images/background/appointment-bg.jpg)" }}></div>
          </div>
        </section>

        {/* Calendario y selectores */}
        <section className="calendar-section sec-pad centred" style={{ padding: '20px 0' }}>
          <div className="auto-container wider-container">
            <h2 className="title">Seleccione una fecha para su cita</h2>
            <div className="calendar-and-selectors">
              <div className="selectors-container">
                {/* Selección de servicio */}
                <div className="selector">
                  <label htmlFor="service">Seleccione un servicio:</label>
                  <select
                    id="service"
                    value={selectedService}
                    onChange={handleServiceChange}
                    className="custom-select"
                  >
                    {servicesData.map((service) => (
                      <option key={service.title} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Selección de subservicio */}
                <div className="selector">
                  <label htmlFor="subservice">Seleccione un subservicio:</label>
                  <select
                    id="subservice"
                    value={selectedSubservice}
                    onChange={handleSubserviceChange}
                    className="custom-select"
                  >
                    {servicesData
                      .find((s) => s.title === selectedService)
                      ?.subservices.map((sub) => (
                        <option key={sub.name} value={sub.name}>
                          {sub.name}
                        </option>
                      ))}
                  </select>
                </div>
                {/* Selección de horario (sólo los slots disponibles) */}
                <div className="selector">
                  <label htmlFor="time">Seleccione un horario:</label>
                  <select
                    id="time"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    className="custom-select"
                  >
                    <option value="">Seleccione un horario</option>
                    {availableTimeSlots.map((slot, i) => (
                      <option key={i} value={slot.time}>
                        {slot.time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="calendar-container">
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  locale="en-US"
                  tileClassName={tileClassName}
                  className="big-calendar"
                />
              </div>
            </div>

            {/* Información de la cita */}
            <div className="selected-info">
              <h3>Información de la cita:</h3>
              <p><strong>Fecha:</strong> {date.toDateString()}</p>
              <p><strong>Servicio:</strong> {selectedService}</p>
              <p><strong>Subservicio:</strong> {selectedSubservice}</p>
              <p><strong>Horario:</strong> {selectedTime || 'No seleccionado'}</p>
            </div>

            {/* Formulario del paciente */}
            <div className="form-container">
              <h3>Información del paciente:</h3>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Nombre:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormDataChange}
                    className="custom-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Teléfono:</label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormDataChange}
                    className="custom-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Correo:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormDataChange}
                    className="custom-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>¿Viene por EPS?</label>
                  <div className="radio-group">
                    <label>
                      <input
                        type="radio"
                        value="yes"
                        checked={comesByEPS}
                        onChange={handleComesByEPSChange}
                      />
                      Sí
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="no"
                        checked={!comesByEPS}
                        onChange={handleComesByEPSChange}
                      />
                      No
                    </label>
                  </div>
                </div>
                {comesByEPS && (
                  <div className="form-group">
                    <label htmlFor="eps">Seleccione su EPS:</label>
                    <select
                      id="eps"
                      value={selectedEPS}
                      onChange={handleEPSChange}
                      className="custom-select"
                      required
                    >
                      <option value="">Seleccione una EPS</option>
                      <option value="Sura">Sura</option>
                      <option value="Sanitas">Sanitas</option>
                      <option value="Compensar">Compensar</option>
                      <option value="Nueva EPS">Nueva EPS</option>
                      <option value="Coomeva">Coomeva</option>
                    </select>
                  </div>
                )}
                <div className="buttons-container">
                  <button type="button" className="whatsapp-button" onClick={handleWhatsAppSchedule}>
                    Agendar vía WhatsApp
                  </button>
                  <button type="button" className="schedule-button" onClick={handleScheduleAppointment}>
                    Confirmar Cita
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <style jsx>{`
          .calendar-section {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f9f9f9;
          }
          .auto-container.wider-container {
            max-width: 1400px;
            padding: 20px;
          }
          .calendar-and-selectors {
            display: flex;
            gap: 60px;
            align-items: flex-start;
            margin-bottom: 30px;
          }
          .selectors-container {
            flex: 1;
            padding: 20px;
            background: #ffffff;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 15px;
          }
          .calendar-container {
            flex: 2;
            padding: 30px;
            background: #ffffff;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
            border-radius: 20px;
            width: 100%;
          }
          .big-calendar {
            width: 100%;
            font-size: 1.8rem;
          }
          .custom-tile {
            border-radius: 15px;
          }
          .fully-booked {
            background-color: #ffcccc !important;
          }
          .available {
            background-color: #ccffcc !important;
          }
          .selected-info,
          .form-container {
            margin-top: 30px;
            padding: 20px;
            background: #ffffff;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 15px;
            max-width: 1200px;
            margin: auto;
          }
          .form-group {
            margin-bottom: 15px;
          }
          label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
          }
          .custom-input,
          .custom-select {
            width: 100%;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 1rem;
          }
          .radio-group {
            display: flex;
            gap: 10px;
          }
          .buttons-container {
            display: flex;
            gap: 15px;
            margin-top: 20px;
          }
          .schedule-button,
          .whatsapp-button {
            display: block;
            padding: 15px;
            font-weight: bold;
            text-transform: uppercase;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }
          .schedule-button {
            width: 100%;
            background-color: #007bff;
            color: white;
          }
          .whatsapp-button {
            width: 100%;
            background-color: #25D366;
            color: white;
          }
          .schedule-button:hover {
            background-color: #0056b3;
          }
          .whatsapp-button:hover {
            background-color: #1ebe57;
          }
        `}</style>
      </Layout>
    </>
  );
}
