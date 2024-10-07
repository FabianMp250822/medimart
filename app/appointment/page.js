'use client'

import Layout from "@/components/layout/Layout";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Swal from 'sweetalert2';

export default function Home() {
    const [date, setDate] = useState(new Date());
    const [selectedSpecialty, setSelectedSpecialty] = useState('Neurología');
    const [selectedTime, setSelectedTime] = useState('');
    const [comesByEPS, setComesByEPS] = useState(false);
    const [selectedEPS, setSelectedEPS] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const handleSpecialtyChange = (event) => {
        setSelectedSpecialty(event.target.value);
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

    const handleScheduleAppointment = () => {
        Swal.fire({
            title: 'Cita Agendada',
            text: 'Su cita ha sido agendada con éxito. Por favor, consulte su correo para más detalles.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#007bff',
        });
    };

    const handleWhatsAppSchedule = () => {
        const { name, phone, email } = formData;
        const epsMessage = comesByEPS ? `EPS: ${selectedEPS}` : 'No aplica EPS';
        const message = `Hola, mi nombre es ${name}. He agendado mi cita para el día ${date.toDateString()} a las ${selectedTime} con la especialidad ${selectedSpecialty}. ${epsMessage}. Teléfono: ${phone}. Correo: ${email}. Deseo confirmación.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            <Layout headerStyle={2} footerStyle={1} breadcrumbTitle="Agendamiento de Citas Médicas Especializadas">

                {/* Appointments-section */}
                <section className="appointment-section sec-pad-2" style={{ paddingBottom: '0' }}>
                    <div className="outer-container p_relative">
                        <div className="bg-layer" style={{ backgroundImage: "url(assets/images/background/appointment-bg.jpg)" }}></div>
                    </div>
                </section>
                {/* Appointments-section end */}

                {/* Calendario grande con selectores */}
                <section className="calendar-section sec-pad centred" style={{ padding: '20px 0' }}>
                    <div className="auto-container wider-container">
                        <h2 className="title">Seleccione una fecha para su cita</h2>
                        <div className="calendar-and-selectors">
                            <div className="selectors-container">
                                <div className="selector">
                                    <label htmlFor="specialty">Seleccione una especialidad:</label>
                                    <select
                                        id="specialty"
                                        value={selectedSpecialty}
                                        onChange={handleSpecialtyChange}
                                        className="custom-select"
                                    >
                                        <option value="Neurología">Neurología</option>
                                        <option value="Oncología">Oncología</option>
                                        <option value="Medicina General">Medicina General</option>
                                        <option value="Investigación">Investigación</option>
                                        <option value="Cardiología">Cardiología</option>
                                        <option value="Pediatría">Pediatría</option>
                                        <option value="Dermatología">Dermatología</option>
                                    </select>
                                </div>
                                <div className="selector">
                                    <label htmlFor="time">Seleccione una hora:</label>
                                    <select
                                        id="time"
                                        value={selectedTime}
                                        onChange={handleTimeChange}
                                        className="custom-select"
                                    >
                                        <option value="">Seleccione una hora</option>
                                        {Array.from({ length: 20 }, (_, i) => {
                                            const hours = Math.floor((8 * 60 + 25 * i) / 60);
                                            const minutes = (8 * 60 + 25 * i) % 60;
                                            const period = hours < 12 ? 'AM' : 'PM';
                                            const formattedHours = hours > 12 ? hours - 12 : hours;
                                            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
                                            return (
                                                <option key={i} value={`${formattedHours}:${formattedMinutes} ${period}`}>
                                                    {`${formattedHours}:${formattedMinutes} ${period}`}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>

                            <div className="calendar-container">
                                <Calendar
                                    onChange={handleDateChange}
                                    value={date}
                                    locale="en-US"
                                    tileClassName="custom-tile"
                                    className="big-calendar"
                                />
                            </div>
                        </div>

                        {/* Información seleccionada */}
                        <div className="selected-info">
                            <h3>Información de la cita:</h3>
                            <p><strong>Fecha:</strong> {date.toDateString()}</p>
                            <p><strong>Especialidad:</strong> {selectedSpecialty}</p>
                            <p><strong>Hora:</strong> {selectedTime || 'No seleccionada'}</p>
                        </div>

                        {/* Formulario para el paciente */}
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
                                    <button type="button" className="schedule-button" onClick={handleScheduleAppointment}>Agendar Cita</button>
                                    <button type="button" className="whatsapp-button" onClick={handleWhatsAppSchedule}>Agendar vía WhatsApp</button>
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
                        max-width: 1400px; /* Aumentar el ancho máximo del contenedor */
                        padding: 20px;
                    }

                    .calendar-and-selectors {
                        display: flex;
                        gap: 60px; /* Aumentar el espacio entre los selectores y el calendario */
                        align-items: flex-start;
                        margin-bottom: 30px;
                    }

                    .selectors-container {
                        flex: 1; /* Permitir que el contenedor de selectores ocupe más espacio */
                        padding: 20px;
                        background: #ffffff;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        border-radius: 15px;
                    }

                    .calendar-container {
                        flex: 2; /* Permitir que el calendario ocupe más espacio */
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

                    .selected-info, .form-container {
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

                    .custom-input, .custom-select {
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

                    .schedule-button, .whatsapp-button {
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
    )
}
