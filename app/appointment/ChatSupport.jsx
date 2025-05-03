"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
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
  Timestamp,
} from "firebase/firestore";
import { imedicDb, imedicAuth } from "@/lib/firebase";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";

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
        {/* Texto */}
        {msg.message && <MarkdownMessage text={msg.message} />}

        {/* Archivo adjunto */}
        {msg.fileUrl && (
          <>
            {msg.fileType.startsWith("image/") ? (
              // imagen
              <Box
                component="img"
                src={msg.fileUrl}
                alt="Adjunto"
                sx={{ mt: 1, maxWidth: "100%", borderRadius: 1 }}
              />
            ) : (
              // enlace a PDF u otro
              <Typography variant="body2" sx={{ mt: 1 }}>
                <a
                  href={msg.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver archivo adjunto
                </a>
              </Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default function ChatSupport({ appointmentInfo }) {
  const [statusMessage, setStatusMessage] = useState("Cargando información...");
  const [chatId, setChatId] = useState(null);
  const [agentName, setAgentName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [file, setFile] = useState(null);
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

  const findRelationAndChat = useCallback(async () => {
    try {
      const patientId = imedicAuth.currentUser.uid;
      let agentUid;

      // 1) Verificar o crear relación agente–paciente
      const relSnap = await getDocs(
        query(
          collection(imedicDb, "agentPatientRelations"),
          where("patientId", "==", patientId)
        )
      );
      if (relSnap.empty) {
        const agentesSnap = await getDocs(collection(imedicDb, "agentes"));
        if (agentesSnap.empty) {
          setStatusMessage("No hay agentes disponibles.");
          return;
        }
        agentUid = agentesSnap.docs[0].id;
        await addDoc(collection(imedicDb, "agentPatientRelations"), {
          patientId,
          agentUid,
        });
      } else {
        agentUid = relSnap.docs[0].data().agentUid;
      }

      // 2) Buscar o crear chat
      const chatQ = query(
        collection(imedicDb, "chats"),
        where("patientUid", "==", patientId),
        where("agentUid", "==", agentUid)
      );
      const chatSnap = await getDocs(chatQ);

      let chatRef;
      if (chatSnap.empty) {
        chatRef = await addDoc(collection(imedicDb, "chats"), {
          patientUid: patientId,
          agentUid,
          createdAt: Timestamp.now(),
          appointmentInfo: appointmentInfo || {},
        });
        setChatId(chatRef.id);

        // Enviar mensaje inicial con los datos de la cita
        if (appointmentInfo) {
          const text = 
            `Solicitud de Cita:\n` +
            `Especialidad: ${appointmentInfo.specialty}\n` +
            `Doctor: ${appointmentInfo.doctorName}\n` +
            `Fecha: ${appointmentInfo.date}\n` +
            `Motivo: ${appointmentInfo.reason}`;
          await addDoc(
            collection(imedicDb, "chats", chatRef.id, "messages"),
            {
              message: text,
              sender: patientId,
              status: "emitido",
              timestamp: Timestamp.now(),
            }
          );
        }
      } else {
        chatRef = chatSnap.docs[0].ref;
        setChatId(chatRef.id);
      }

      // 3) Cargar nombre de agente
      const agentDoc = await getDoc(doc(imedicDb, "agentes", agentUid));
      if (agentDoc.exists()) {
        setAgentName(agentDoc.data().agentName);
        setStatusMessage("");
      } else {
        setStatusMessage("No se encontró información del agente.");
      }
    } catch (err) {
      setStatusMessage("Error inicializando chat: " + err.message);
    }
  }, [appointmentInfo]);

  useEffect(() => {
    if (imedicAuth.currentUser) findRelationAndChat();
  }, [findRelationAndChat]);

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

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f && (f.type.startsWith("image/") || f.type === "application/pdf")) {
      setFile(f);
    } else {
      alert("Solo se permiten imágenes y PDF");
    }
  };

  const sendMessage = async () => {
    if (!newMsg.trim() && !file) return;

    try {
      const messagesRef = collection(imedicDb, "chats", chatId, "messages");
      let fileUrl = null;
      let fileType = null;
      
      if (file) {
        const storagePath = `chats/${chatId}/${Date.now()}_${file.name}`;
        const snapshot = await uploadBytes(storageRef(storage, storagePath), file);
        fileUrl = await getDownloadURL(snapshot.ref);
        fileType = file.type;
      }

      await addDoc(messagesRef, {
        message: newMsg.trim(),
        sender: currentUser.uid,
        status: "emitido",
        timestamp: Timestamp.now(),
        fileUrl,
        fileType,
      });

      setNewMsg("");
      setFile(null);
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
            alignItems: "center",
            mb: 2,
            gap: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#1976d2",
              letterSpacing: 1,
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
           
            Chat Clínica de la Costa
          </Typography>
          {agentName && (
            <Box
              sx={{
                bgcolor: "#e3f2fd",
                px: 2,
                py: 0.5,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: 16,
                color: "#1976d2",
                boxShadow: 1,
              }}
            >
              <span style={{ marginRight: 6 }}>Agente:</span> {agentName}
            </Box>
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
          <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
            <input
              accept="image/*,.pdf"
              style={{ display: "none" }}
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                variant="outlined"
                color="primary"
                component="span"
                startIcon={<AttachFileIcon />}
                sx={{ textTransform: "none" }}
              >
                Adjuntar archivo
              </Button>
            </label>
            {file && (
              <Typography variant="body2" sx={{ ml: 1 }}>
                {file.name}
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
