"use client";

import React, { useState } from "react";
import { imedicAuth, imedicDb, imedicStorage } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";

export default function ImedicRegisterForm() {
  // Campos del formulario
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [lugarSolicitud, setLugarSolicitud] = useState("");
  // Estado ya no se pide al usuario, se fija en "activo"
  const estado = "activo";

  // Para la foto, usamos un file en vez de una URL
  const [fotoFile, setFotoFile] = useState(null);

  // Campos para crear usuario en Auth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Función para manejar el cambio del input file
  const handleFotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFotoFile(e.target.files[0]);
    }
  };

  // Manejo de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Primero, si se seleccionó foto, se sube a Storage
      let fotoUrl = "";
      if (fotoFile) {
        const storageRef = ref(imedicStorage, `fotos/${Date.now()}_${fotoFile.name}`);
        const snapshot = await uploadBytes(storageRef, fotoFile);
        fotoUrl = await getDownloadURL(snapshot.ref);
      }

      // Crear el usuario en Auth
      const userCredential = await createUserWithEmailAndPassword(
        imedicAuth,
        email,
        password
      );
      const user = userCredential.user;

      // Guardar datos en la colección "pacientes"
      await setDoc(doc(imedicDb, "pacientes", user.uid), {
        uid: user.uid,
        email: user.email,
        nombres,
        apellidos,
        telefono,
        direccion,
        lugarSolicitud,
        estado,
        identificacion,
        photo: fotoUrl,
        createdAt: new Date(),
      });

      // Agregar rol en la colección "roles" con el campo "nivel" = "paciente"
      await setDoc(doc(imedicDb, "roles", user.uid), {
        uid: user.uid,
        email: user.email,
        nivel: "paciente",
      });

      Swal.fire(
        "Registro Exitoso",
        `Paciente ${nombres} ${apellidos} registrado en imedic.`,
        "success"
      );

      // Limpiar formulario
      setNombres("");
      setApellidos("");
      setIdentificacion("");
      setTelefono("");
      setDireccion("");
      setLugarSolicitud("");
      setFotoFile(null);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error al registrar paciente en imedic:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div id="imedic-form" className="form-box">
      <h2>Registro de Paciente</h2>
      <form onSubmit={handleSubmit}>
        <div className="two-columns">
          {/* Columna 1 */}
          <div className="form-group">
            <label>Nombres:</label>
            <input
              type="text"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              required
              className="custom-input"
              placeholder="Complete este campo"
            />
          </div>
          <div className="form-group">
            <label>Apellidos:</label>
            <input
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <label>Identificación:</label>
            <input
              type="text"
              value={identificacion}
              onChange={(e) => setIdentificacion(e.target.value)}
              required
              className="custom-input"
              placeholder="Complete este campo"
            />
          </div>
          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <label>Dirección:</label>
            <input
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
              className="custom-input"
            />
          </div>

          {/* Columna 2 */}
          <div className="form-group">
            <label>Lugar de Solicitud:</label>
            <input
              type="text"
              value={lugarSolicitud}
              onChange={(e) => setLugarSolicitud(e.target.value)}
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <label>Foto:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <label>Correo (Auth):</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="custom-input"
            />
          </div>
          <div className="form-group">
            <label>Contraseña (Auth):</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="custom-input"
            />
          </div>
        </div>

        <button type="submit" className="schedule-button">
          Registrar Paciente
        </button>
      </form>

      <style jsx>{`
        #imedic-form.form-box {
          width: 100% !important;
          max-width: 700px !important; 
          margin: 0 auto !important;
          padding: 20px !important;
          background: #ffffff !important;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) !important;
          border-radius: 15px !important;
        }
        #imedic-form h2 {
          text-align: center !important;
          margin-bottom: 20px !important;
          font-weight: bold !important;
          font-size: 1.4rem !important;
        }
        #imedic-form .two-columns {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 20px !important;
          margin-bottom: 20px !important; 
        }
        #imedic-form .form-group {
          display: flex !important;
          flex-direction: column !important;
        }
        #imedic-form label {
          margin-bottom: 5px !important;
          font-weight: bold !important;
          color: #333 !important;
        }
        #imedic-form .custom-input {
          width: 100% !important;
          padding: 10px !important;
          border-radius: 5px !important;
          border: 1px solid #ccc !important;
          font-size: 1rem !important;
          transition: border-color 0.3s ease !important;
        }
        #imedic-form .custom-input:hover {
          border-color: #999 !important;
        }
        #imedic-form .custom-input:focus {
          border-color: #007bff !important;
          outline: none !important;
        }
        #imedic-form .schedule-button {
          width: 100% !important;
          padding: 12px !important;
          background-color: #007bff !important;
          color: #fff !important;
          text-transform: uppercase !important;
          font-weight: bold !important;
          border: none !important;
          border-radius: 5px !important;
          cursor: pointer !important;
          transition: background-color 0.3s ease !important;
        }
        #imedic-form .schedule-button:hover {
          background-color: #0056b3 !important;
        }
        @media (max-width: 768px) {
          #imedic-form .two-columns {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
