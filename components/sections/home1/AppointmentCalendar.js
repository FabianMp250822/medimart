'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { registerLocale } from 'react-datepicker';
registerLocale('es', es);

export default function AppointmentCalendar() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [specialty, setSpecialty] = useState('');
    const whatsappNumber = '+573003456789';

    const specialties = [
        'Medicina General',
        'Pediatría',
        'Cardiología',
        'Nefrología',
        'Investigación'
    ];

    useEffect(() => {
        // Aquí podrías cargar citas existentes desde un servidor o base de datos
        // setAppointments(citasExistentes);
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleSpecialtyChange = (event) => {
        setSpecialty(event.target.value);
    };

    const isTimeSlotAvailable = (date, time, specialty) => {
        return !appointments.some(
            (appointment) =>
                appointment.date === date.toDateString() &&
                appointment.time === time &&
                appointment.specialty === specialty
        );
    };

    const handleAppointment = () => {
        if (selectedDate && selectedTime && specialty) {
            const formattedDate = selectedDate.toDateString();
            if (isTimeSlotAvailable(selectedDate, selectedTime, specialty)) {
                const whatsappMessage = `Hola, me gustaría agendar una cita de ${specialty} para el día ${formattedDate} a las ${selectedTime} en la Clínica de la Costa.`;
                const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
                window.open(whatsappLink, '_blank');

                // Agregar la nueva cita a la lista para evitar duplicados
                setAppointments([...appointments, { date: formattedDate, time: selectedTime, specialty }]);
            } else {
                alert('La fecha y hora seleccionadas no están disponibles. Por favor, elige otro horario.');
            }
        } else {
            alert('Por favor, selecciona una especialidad, fecha y hora antes de agendar la cita.');
        }
    };

    return (
        <section className="appointment-section" style={{ padding: '50px 0', textAlign: 'center' }}>
            <div className="auto-container">
                <div className="inner-box">
                    <h2 style={{ color: '#333', fontSize: '30px', marginBottom: '20px' }}>Agendar una Cita</h2>
                    <p style={{ color: '#666', fontSize: '18px', marginBottom: '30px' }}>
                        Selecciona una especialidad, fecha y hora para agendar tu cita con nuestros especialistas.
                    </p>
                    <div className="specialty-container" style={{ marginBottom: '20px' }}>
                        <select value={specialty} onChange={handleSpecialtyChange} className="specialty-input" style={{ padding: '10px', fontSize: '16px' }}>
                            <option value="">Selecciona una especialidad</option>
                            {specialties.map((spec, index) => (
                                <option key={index} value={spec}>{spec}</option>
                            ))}
                        </select>
                    </div>
                    <div className="calendar-container" style={{ marginBottom: '20px' }}>
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            locale="es"
                            minDate={new Date()}
                            placeholderText="Selecciona una fecha"
                            dateFormat="dd/MM/yyyy"
                            className="calendar-input"
                        />
                    </div>
                    <div className="time-container" style={{ marginBottom: '20px' }}>
                        <input
                            type="time"
                            value={selectedTime}
                            onChange={handleTimeChange}
                            className="time-input"
                            style={{ padding: '10px', fontSize: '16px' }}
                            step="1800" // Intervalos de 30 minutos
                        />
                    </div>
                    <div className="btn-box">
                        <button onClick={handleAppointment} className="theme-btn btn-one" style={{ padding: '15px 30px', fontSize: '18px' }}>
                            <span>Agendar Cita por WhatsApp</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}