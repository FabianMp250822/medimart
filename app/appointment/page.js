"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { imedicAuth } from "@/lib/firebase";
import Layout from "@/components/layout/Layout";
import "react-calendar/dist/Calendar.css";
import AuthOptions from "./citaIndex";

// Importamos los componentes separados
import MedicalAppointments from "./MedicalAppointments"; // Ajusta la ruta
import ChatSupport from "./ChatSupport";
import MedicalResults from "./MedicalResults"; // Nuevo componente separado

export default function Home() {
  const [user, setUser] = useState(null);

  // Verificar autenticación en imedicAuth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(imedicAuth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Layout
      headerStyle={2}
      footerStyle={1}
      breadcrumbTitle="Agendamiento de Citas Médicas Especializadas"
    >
      <section
        className="appointment-section sec-pad-2"
        style={{ paddingBottom: "0" }}
      >
        <div className="outer-container p_relative">
          <div
            className="bg-layer"
            style={{
              backgroundImage:
                "url(assets/images/background/appointment-bg.jpg)",
            }}
          ></div>
        </div>
      </section>

      {/* Si el usuario no está autenticado, se muestra AuthOptions; de lo contrario, el dashboard */}
      {user ? <ImedicDashboard user={user} /> : <AuthOptions />}
    </Layout>
  );
}

function ImedicDashboard({ user }) {
  const [selectedMenu, setSelectedMenu] = useState("profile");

  // Función de logout
  const handleLogout = async () => {
    try {
      await signOut(imedicAuth);
      setSelectedMenu("profile");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <button onClick={() => setSelectedMenu("profile")}>Perfil</button>
        <button onClick={() => setSelectedMenu("results")}>
          Resultados Médicos
        </button>
        <button onClick={() => setSelectedMenu("appointments")}>
          Agendar citas 
        </button>
        <button onClick={() => setSelectedMenu("schedule")}>
          Chat de soporte
        </button>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>

      <div className="content">
        {selectedMenu === "profile" && <Profile user={user} />}
        {selectedMenu === "results" && <MedicalResults />}
        {selectedMenu === "appointments" && (
          <MedicalAppointments onAppointmentConfirmed={() => setSelectedMenu("schedule")} />
        )}
        {selectedMenu === "schedule" && <ChatSupport />}
      </div>

      <style jsx>{`
        .dashboard-container {
          display: flex;
          gap: 20px;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .sidebar {
          flex: 0 0 30%;
          background: #f8f8f8;
          border-radius: 8px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sidebar button {
          padding: 12px;
          border: none;
          border-radius: 5px;
          background-color: #007bff;
          color: #fff;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
        .sidebar button:hover {
          background-color: #0056b3;
        }
        .logout-button {
          background-color: #dc3545 !important;
        }
        .logout-button:hover {
          background-color: #c82333 !important;
        }
        .content {
          flex: 1;
          background: #ffffff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        @media (max-width: 768px) {
          .dashboard-container {
            flex-direction: column;
          }
          .sidebar {
            flex: 0 0 auto;
            width: 100%;
          }
          .content {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

function Profile({ user }) {
  return (
    <div>
      <h3>Perfil del usuario</h3>
      <p>Bienvenido, {user.email}</p>
      <p>UID: {user.uid}</p>
    </div>
  );
}
