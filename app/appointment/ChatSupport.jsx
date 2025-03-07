"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  addDoc,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { imedicDb, imedicAuth } from "@/lib/firebase";

export default function ChatSupport() {
  const [statusMessage, setStatusMessage] = useState("Cargando información...");
  const [chatId, setChatId] = useState(null);
  const [agentName, setAgentName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const currentUser = imedicAuth.currentUser;
  const messagesEndRef = useRef(null);

  // Hace scroll al final del contenedor de mensajes (solo dentro del contenedor)
  const scrollToBottom = () => {
    const container = document.getElementById("chatSupportMessages");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Buscar la relación y el chat correspondiente
  useEffect(() => {
    if (!currentUser) return;

    async function findRelationAndChat() {
      try {
        console.log("Buscando en 'agentPatientRelations' para el paciente UID:", currentUser.uid);

        const agentPatientRef = collection(imedicDb, "agentPatientRelations");
        const relationQuery = query(agentPatientRef, where("patientId", "==", currentUser.uid));
        const relationSnapshot = await getDocs(relationQuery);

        if (relationSnapshot.empty) {
          console.warn("No se encontró ninguna relación para este paciente.");
          setStatusMessage("No hay ninguna relación agente–paciente.");
          return;
        }

        // Tomamos la primera relación encontrada
        const firstRelationDoc = relationSnapshot.docs[0];
        const relationData = firstRelationDoc.data();
        console.log("Relación encontrada:", relationData);

        const patientId = relationData.patientId;
        const agentUid = relationData.agentUid;

        if (!patientId || !agentUid) {
          console.error("Los campos 'patientId' o 'agentUid' no están definidos en la relación.");
          setStatusMessage("Datos de relación incompletos.");
          return;
        }

        // Buscar el chat en la colección "chats"
        console.log("Buscando en 'chats' con patientUid == %s y agentUid == %s", patientId, agentUid);
        const chatsRef = collection(imedicDb, "chats");
        const chatQuery = query(
          chatsRef,
          where("patientUid", "==", patientId),
          where("agentUid", "==", agentUid)
        );

        const chatSnapshot = await getDocs(chatQuery);

        if (chatSnapshot.empty) {
          console.warn("No se encontró ningún chat con esos datos (patientUid y agentUid).");
          setStatusMessage("No hay chat registrado para esa relación.");
          return;
        }

        // Tomamos el primer chat encontrado
        const chatDoc = chatSnapshot.docs[0];
        setChatId(chatDoc.id);
        console.log("Chat encontrado con ID:", chatDoc.id);

        // Obtener info del agente para mostrar su nombre
        const agentDocRef = doc(imedicDb, "agentes", agentUid);
        const agentSnap = await getDoc(agentDocRef);
        if (!agentSnap.exists()) {
          console.error("No existe un documento en 'agentes' con el UID:", agentUid);
          setStatusMessage("No se encontró información del agente.");
          return;
        }
        const agentData = agentSnap.data();
        setAgentName(agentData.agentName);
      
        setStatusMessage(`Agente asignado: ${agentData.agentName}.`);
      } catch (error) {
        console.error("Error en findRelationAndChat:", error);
        setStatusMessage("Ocurrió un error al buscar la relación o el chat.");
      }
    }

    findRelationAndChat();
  }, [currentUser]);

  // Suscribirse en tiempo real a la subcolección "messages" del chat encontrado
  useEffect(() => {
    if (!chatId) return;

    const messagesRef = collection(imedicDb, "chats", chatId, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [chatId]);

  // Función para enviar mensaje al chat encontrado
  const sendMessage = async () => {
    if (!newMsg.trim() || !chatId) return;

    try {
      const messagesRef = collection(imedicDb, "chats", chatId, "messages");
      await addDoc(messagesRef, {
        message: newMsg,      // Cambiado de 'text' a 'message'
        sender: currentUser.uid,
        status: "emitido",    // Se utiliza para identificar el mensaje del paciente, pero no se mostrará
        timestamp: new Date(),
      });
      setNewMsg("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <div>
      <h3>Chat clínica de la costa</h3>
      <p>{statusMessage}</p>
     
      
      {/* Área de mensajes */}
      <div
        id="chatSupportMessages"
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginTop: "1rem",
          maxHeight: "300px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg) => {
          // Si "msg.status" existe, es mensaje del paciente (izquierda); de lo contrario, del agente (derecha)
          const isPatientMessage = !!msg.status;

          return (
            <div
              key={msg.id}
              style={{
                display: "flex",
                justifyContent: isPatientMessage ? "flex-start" : "flex-end",
                marginBottom: "0.5rem",
              }}
            >
              <div
                style={{
                  maxWidth: "60%",
                  backgroundColor: isPatientMessage ? "#e5e5e5" : "blue",
                  color: isPatientMessage ? "#000" : "#fff",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "1rem",
                }}
              >
                {/* Si es mensaje del agente se muestra la etiqueta */}
                {!isPatientMessage && <strong>Agente: </strong>}
                {msg.message}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input y botón para enviar mensajes */}
      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={{
            flex: 1,
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
            fontSize: "1rem",
            color: "#333",
          }}
          className="input-placeholder-difuminada"
        />
        <button
          onClick={sendMessage}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            border: "none",
            borderRadius: "0.5rem",
            backgroundColor: "#0070f3",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Enviar
        </button>
      </div>

      {/* Estilos locales para el placeholder */}
      <style jsx>{`
        .input-placeholder-difuminada::placeholder {
          color: #aaa;
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
}
