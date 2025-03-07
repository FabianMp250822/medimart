"use client";

import React, { useState } from "react";
import { imedicAuth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";

export default function ImedicLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        imedicAuth,
        email,
        password
      );
      Swal.fire(
        "Bienvenido",
        `Usuario ${userCredential.user.email} autenticado`,
        "success"
      );
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Error al iniciar sesión en imedic:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div id="imedic-login" className="form-box">
      <h2>Login en imedic</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Correo:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="custom-input"
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="custom-input"
          />
        </div>
        <button type="submit" className="schedule-button">
          Iniciar Sesión
        </button>
      </form>

      <style jsx>{`
        #imedic-login.form-box {
          width: 100%;
          max-width: 400px;
          margin: 0 auto !important;
          padding: 20px;
          background: #ffffff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) !important;
          border-radius: 15px;
        }
        #imedic-login h2 {
          text-align: center;
          margin-bottom: 20px;
          font-weight: bold;
          font-size: 1.4rem;
        }
        #imedic-login .form-group {
          margin-bottom: 15px !important;
        }
        #imedic-login label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #333 !important;
        }
        #imedic-login .custom-input {
          width: 100% !important;
          padding: 10px !important;
          border-radius: 5px !important;
          border: 1px solid #ccc !important;
          font-size: 1rem !important;
          transition: border-color 0.3s ease !important;
        }
        #imedic-login .custom-input:focus {
          border-color: #007bff !important;
          outline: none !important;
        }
        #imedic-login .schedule-button {
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
        #imedic-login .schedule-button:hover {
          background-color: #0056b3 !important;
        }
      `}</style>
    </div>
  );
}
