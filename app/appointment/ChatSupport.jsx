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

import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function MarkdownMessage({ text }) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>;
}

function ChatMessage({ msg, isAgent }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isAgent ? "flex-start" : "flex-end",
        mb: 1,
      }}
    >
      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          maxWidth: "70%",
          bgcolor: isAgent ? "#ffffff" : "#dcf8c6",
          color: "#333",
          borderTopLeftRadius: isAgent ? 0 : 2,
          borderTopRightRadius: isAgent ? 2 : 0,
          boxShadow: 1,
        }}
      >
        <MarkdownMessage text={msg.message} />
      </Box>
    </Box>
  );
}

export default function ChatSupport() {
  const [statusMessage, setStatusMessage] = useState("Cargando información...");
  const [chatId, setChatId] = useState(null);
  const [agentName, setAgentName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const currentUser = imedicAuth.currentUser;

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!currentUser) return;

    async function findRelationAndChat() {
      try {
        const agentPatientRef = collection(imedicDb, "agentPatientRelations");
        const relationQuery = query(
          agentPatientRef,
          where("patientId", "==", currentUser.uid)
        );
        const relationSnapshot = await getDocs(relationQuery);

        if (relationSnapshot.empty) {
          setStatusMessage("No hay ninguna relación agente–paciente.");
          return;
        }

        const firstRelationDoc = relationSnapshot.docs[0];
        const relationData = firstRelationDoc.data();
        const { patientId, agentUid } = relationData;

        const chatsRef = collection(imedicDb, "chats");
        const chatQuery = query(
          chatsRef,
          where("patientUid", "==", patientId),
          where("agentUid", "==", agentUid)
        );
        const chatSnapshot = await getDocs(chatQuery);

        if (chatSnapshot.empty) {
          setStatusMessage("No hay chat registrado para esa relación.");
          return;
        }

        const chatDoc = chatSnapshot.docs[0];
        setChatId(chatDoc.id);

        const agentDocRef = doc(imedicDb, "agentes", agentUid);
        const agentSnap = await getDoc(agentDocRef);
        if (agentSnap.exists()) {
          const agentData = agentSnap.data();
          setAgentName(agentData.agentName);
          setStatusMessage("");
        } else {
          setStatusMessage("No se encontró información del agente.");
        }
      } catch (error) {
        setStatusMessage("Ocurrió un error al buscar la relación o el chat.");
      }
    }

    findRelationAndChat();
  }, [currentUser]);

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

  const sendMessage = async () => {
    if (!newMsg.trim() || !chatId) return;

    try {
      const messagesRef = collection(imedicDb, "chats", chatId, "messages");
      await addDoc(messagesRef, {
        message: newMsg,
        sender: currentUser.uid,
        status: "emitido",
        timestamp: new Date(),
      });
      setNewMsg("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2, bgcolor: "#f9f9f9" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography variant="h5">Chat Clínica de la Costa</Typography>
          {agentName && (
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Agente: {agentName}
            </Typography>
          )}
        </Box>

        {statusMessage && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {statusMessage}
          </Typography>
        )}

        <Box
          ref={chatContainerRef}
          sx={{
            p: 2,
            borderRadius: 2,
            overflowY: "auto",
            bgcolor: "#FAFAFA",
            boxShadow: 1,
            maxHeight: 500,
          }}
        >
          {messages.map((msg) => {
            const isAgentMessage = !msg.status;
            return (
              <ChatMessage key={msg.id} msg={msg} isAgent={isAgentMessage} />
            );
          })}
        </Box>

        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            placeholder="Escribe tu mensaje..."
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={handleKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={sendMessage} color="primary">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Paper>
    </Container>
  );
}
