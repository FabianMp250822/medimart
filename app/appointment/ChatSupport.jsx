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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Componente que renderiza el contenido Markdown de un mensaje.
 */
function MarkdownMessage({ text }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>;
}

/**
 * Componente para renderizar un mensaje individual.
 * 
 * - Si es mensaje del agente, se muestra a la izquierda (azul Messenger).
 * - Si es mensaje del paciente, se muestra a la derecha (gris claro).
 */
function ChatMessage({ msg, isAgent }) {
  // Estilos para la burbuja del mensaje
  const bubbleStyle = {
    maxWidth: "70%",
    padding: "10px 15px",
    borderRadius: isAgent ? "18px 18px 18px 0" : "18px 18px 0 18px",
    margin: "5px 0",
    color: isAgent ? "#fff" : "#000",
    backgroundColor: isAgent ? "#0084ff" : "#f1f0f0",
    whiteSpace: "pre-wrap",
  };

  // Estilos para el contenedor (alineación a la izquierda o derecha)
  const containerStyle = {
    display: "flex",
    justifyContent: isAgent ? "flex-start" : "flex-end",
  };

  return (
    <div style={containerStyle}>
      <div style={bubbleStyle}>
        <MarkdownMessage text={msg.message} />
      </div>
    </div>
  );
}

export default function ChatSupport() {
  const [statusMessage, setStatusMessage] = useState("Cargando información...");
  const [chatId, setChatId] = useState(null);
  const [agentName, setAgentName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const currentUser = imedicAuth.currentUser;
  const messagesEndRef = useRef(null);

  // Función para hacer scroll al final del contenedor de mensajes
  const scrollToBottom = () => {
    const container = document.getElementById("chatSupportMessages");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Buscar la relación y el chat correspondiente para el usuario actual
  useEffect(() => {
    if (!currentUser) return;

    async function findRelationAndChat() {
      try {
        console.log("Buscando relación en 'agentPatientRelations' para el paciente UID:", currentUser.uid);

        const agentPatientRef = collection(imedicDb, "agentPatientRelations");
        const relationQuery = query(agentPatientRef, where("patientId", "==", currentUser.uid));
        const relationSnapshot = await getDocs(relationQuery);

        if (relationSnapshot.empty) {
          console.warn("No se encontró ninguna relación para este paciente.");
          setStatusMessage("No hay ninguna relación agente–paciente.");
          return;
        }

        // Tomar la primera relación encontrada
        const firstRelationDoc = relationSnapshot.docs[0];
        const relationData = firstRelationDoc.data();
        console.log("Relación encontrada:", relationData);

        const { patientId, agentUid } = relationData;
        if (!patientId || !agentUid) {
          console.error("Datos de relación incompletos.");
          setStatusMessage("Datos de relación incompletos.");
          return;
        }

        // Buscar el chat en la colección "chats"
        console.log("Buscando chat con patientUid:", patientId, "y agentUid:", agentUid);
        const chatsRef = collection(imedicDb, "chats");
        const chatQuery = query(
          chatsRef,
          where("patientUid", "==", patientId),
          where("agentUid", "==", agentUid)
        );
        const chatSnapshot = await getDocs(chatQuery);

        if (chatSnapshot.empty) {
          console.warn("No se encontró ningún chat para esa relación.");
          setStatusMessage("No hay chat registrado para esa relación.");
          return;
        }

        const chatDoc = chatSnapshot.docs[0];
        setChatId(chatDoc.id);
        console.log("Chat encontrado con ID:", chatDoc.id);

        // Obtener información del agente para mostrar su nombre
        const agentDocRef = doc(imedicDb, "agentes", agentUid);
        const agentSnap = await getDoc(agentDocRef);
        if (!agentSnap.exists()) {
          console.error("No se encontró el documento del agente:", agentUid);
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

  // Suscribirse a la subcolección "messages" del chat en tiempo real
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

  // Función para enviar mensaje al chat
  const sendMessage = async () => {
    if (!newMsg.trim() || !chatId) return;

    try {
      const messagesRef = collection(imedicDb, "chats", chatId, "messages");
      await addDoc(messagesRef, {
        message: newMsg,
        sender: currentUser.uid,
        status: "emitido", // Indica mensaje del paciente
        timestamp: new Date(),
      });
      setNewMsg("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h3>Chat Clínica de la Costa</h3>
      <p>{statusMessage}</p>
      
      {/* Contenedor de mensajes */}
      <div
        id="chatSupportMessages"
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginTop: "1rem",
          maxHeight: "400px",
          overflowY: "auto",
          backgroundColor: "#fafafa",
        }}
      >
        {messages.map((msg) => {
          // Si existe "msg.status", es un mensaje del paciente; de lo contrario, es del agente.
          const isAgentMessage = !msg.status;
          return <ChatMessage key={msg.id} msg={msg} isAgent={isAgentMessage} />;
        })}
      </div>

      {/* Campo de texto y botón para enviar */}
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
