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

export default function ChatSupport({ appointmentInfo, onNavigateToAppointments }) { // Añadir onNavigateToAppointments a las props
  const [statusMessage, setStatusMessage] = useState("Cargando información...");
  const [chatId, setChatId] = useState(null);
  const [agentName, setAgentName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [file, setFile] = useState(null);

  const currentUser = imedicAuth.currentUser;
  const [patientAgentUid, setPatientAgentUid] = useState("");

  // 1) Escucha cambios en la relación paciente–agente
  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const relQ = query(
      collection(imedicDb, "agentPatientRelations"),
      where("patientId", "==", currentUser.uid)
    );
    const unsubscribeRel = onSnapshot(relQ, (snap) => {
      if (!snap.empty) {
        const relationData = snap.docs[0].data();
        const newAgentUidFromSnap = relationData.agentUid;
        if (newAgentUidFromSnap && newAgentUidFromSnap !== patientAgentUid) {
          setPatientAgentUid(newAgentUidFromSnap);
        } else if (!newAgentUidFromSnap) {
          // Considera manejar este caso, quizás limpiando el agente o mostrando un error.
        }
      } else {
        setPatientAgentUid(""); 
        setChatId(null);      
        setAgentName("");
        setStatusMessage("No hay agente asignado.");
      }
    }, (error) => {
      console.error("ChatSupport: Error en onSnapshot de agentPatientRelations:", error);
      setStatusMessage("Error al obtener relación con agente.");
    });
    return () => {
      unsubscribeRel();
    };
  }, [currentUser, patientAgentUid]);

  // 2) Cuando cambie el agentUid o currentUser, inicializa o recupera el chat
  useEffect(() => {
    if (currentUser && patientAgentUid) {
      initChat(currentUser.uid, patientAgentUid);
    } else if (!patientAgentUid) {
        setChatId(null);
        setMessages([]);
        setAgentName("");
        if (currentUser) setStatusMessage("No hay agente asignado.");
        else setStatusMessage("Usuario no autenticado.");
    }
  }, [currentUser, patientAgentUid]);

  // Función reutilizable para buscar/crear chat y nombre de agente
  async function initChat(patientId, agentUid) {
    if (!patientId || !agentUid) {
      setStatusMessage("Error: Información de usuario o agente incompleta.");
      setChatId(null); 
      setMessages([]);
      setAgentName("");
      return;
    }
    try {
      setStatusMessage("Buscando chat...");
      const chatQ = query(
        collection(imedicDb, "chats"),
        where("patientUid", "==", patientId),
        where("agentUid", "==", agentUid)
      );
      const chatSnap = await getDocs(chatQ);
      let chatRef;

      if (chatSnap.empty) {
        // El chat no existe, lo creamos
        chatRef = await addDoc(collection(imedicDb, "chats"), {
          patientUid: patientId,
          agentUid,
          createdAt: Timestamp.now(),
          appointmentInfo: appointmentInfo || {}, // Guarda la prop appointmentInfo si se pasó
          participants: [patientId, agentUid] 
        });
        setChatId(chatRef.id);

        // Verificar si se pasó información de cita a través de las props
        if (appointmentInfo && appointmentInfo.specialty) {
          // Si se pasó appointmentInfo, se asume que es una solicitud específica
          const initialMessageFromProp =
            `Información de la solicitud que deseo gestionar:\n` +
            `Especialidad: ${appointmentInfo.specialty}\n` +
            (appointmentInfo.doctorName ? `Doctor: ${appointmentInfo.doctorName}\n` : '') +
            (appointmentInfo.date ? `Fecha: ${appointmentInfo.date}\n` : '') +
            (appointmentInfo.reason ? `Motivo: ${appointmentInfo.reason}` : '');
          
          // Mensaje del paciente con la información
          await addDoc(
            collection(imedicDb, "chats", chatRef.id, "messages"),
            {
              message: initialMessageFromProp,
              sender: patientId, 
              status: "emitido",
              timestamp: Timestamp.now(),
            }
          );
          // Mensaje de acuse de recibo del agente
           await addDoc(
            collection(imedicDb, "chats", chatRef.id, "messages"),
            {
              message: "Hemos recibido su información. Un agente la revisará y le responderá en breve.",
              sender: agentUid, 
              status: "recibido",
              timestamp: Timestamp.now(),
            }
          );

        } else {
          // El mensaje que se guarda en Firestore puede ser más genérico si la acción es de UI
          const welcomeMessage = 
`Bienvenido(a) al chat de soporte de Clínica de la Costa.
Este canal está disponible para el agendamiento y seguimiento de sus citas médicas.
- Si desea **solicitar una nueva cita**, por favor diríjase a nuestra sección de "Agendar Citas".
- Si ya ha realizado una solicitud o tiene una cita programada, un agente se comunicará con usted en breve por este medio para asistirlo.`;

          await addDoc(
            collection(imedicDb, "chats", chatRef.id, "messages"),
            {
              message: welcomeMessage,
              sender: agentUid, // Mensaje enviado por el agente/sistema
              status: "recibido", 
              timestamp: Timestamp.now(),
            }
          );
        }
      } else {
        // El chat ya existe
        chatRef = chatSnap.docs[0].ref;
        setChatId(chatRef.id);
        // No se envían mensajes automáticos si el chat ya existe, para no duplicar.
      }

      const agentDoc = await getDoc(doc(imedicDb, "agentes", agentUid));
      if (agentDoc.exists()) {
        const agentData = agentDoc.data();
        setAgentName(agentData.agentName);
        setStatusMessage(""); 
      } else {
        setAgentName(""); 
        setStatusMessage("No se encontró información del agente.");
      }
    } catch (err) {
      console.error("ChatSupport: initChat - Error inicializando chat:", err);
      setStatusMessage("Error inicializando chat: " + err.message);
      setChatId(null); 
      setMessages([]);
      setAgentName("");
    }
  }

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
    if (!chatId) {
      setMessages([]); 
      return;
    }

    const messagesRef = collection(imedicDb, "chats", chatId, "messages");
    const messagesQuery = query(messagesRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    }, (error) => {
      console.error("ChatSupport: Error en onSnapshot de mensajes:", error);
      setStatusMessage("Error al cargar mensajes.");
    });

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f && (f.type.startsWith("image/") || f.type === "application/pdf")) {
      setFile(f);
    } else {
      alert("Solo se permiten imágenes y PDF");
      setFile(null);
    }
  };

  const sendMessage = async () => {
    if (!newMsg.trim() && !file) {
      return;
    }
    if (!chatId) {
      setStatusMessage("Error: No se puede enviar mensaje, chat no disponible.");
      return;
    }
    if (!currentUser) {
      setStatusMessage("Error: Usuario no autenticado.");
      return;
    }

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
      console.error("ChatSupport: sendMessage - Error al enviar el mensaje:", error);
      setStatusMessage("Error al enviar mensaje: " + error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { // Evitar envío con Shift+Enter
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
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: 'center' }}>
            {statusMessage}
          </Typography>
        )}

        <Box
          ref={chatContainerRef}
          sx={{
            p: 2,
            borderRadius: 2,
            overflowY: "auto",
            bgcolor: "#FAFAFA", // Un color de fondo más suave para el área de mensajes
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)", // Sombra interior sutil
            maxHeight: 500, // Ajusta según necesidad
            minHeight: 300, // Para que no colapse si no hay mensajes
          }}
        >
          {messages.length === 0 && !statusMessage.startsWith("Error") && chatId && (
            // Si no hay mensajes, el chat está listo y no hay errores:
            (!appointmentInfo || !appointmentInfo.specialty) ? (
              // Caso 1: No se pasó appointmentInfo (o está incompleta)
              // Mostramos el mensaje de bienvenida con instrucciones y enlace.
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', p: 2, whiteSpace: 'pre-line' }}>
                {`Bienvenido(a) al chat de soporte de Clínica de la Costa.
Este canal está disponible para el agendamiento y seguimiento de sus citas médicas.
- Si desea solicitar una nueva cita, por favor diríjase a nuestra sección de `}
                <Button 
                  variant="text" 
                  onClick={onNavigateToAppointments} 
                  sx={{ 
                    p:0, 
                    minWidth: 'auto', 
                    textTransform: 'none', 
                    color: '#1976d2', 
                    fontWeight: 'bold', 
                    textDecoration: 'underline',
                    display: 'inline', // Para que se comporte como un enlace en línea
                    verticalAlign: 'baseline' // Alineación con el texto circundante
                  }}
                >
                  Agendar Citas aquí
                </Button>.
                {`
- Si ya ha realizado una solicitud o tiene una cita programada, un agente se comunicará con usted en breve por este medio para asistirlo.`}
              </Typography>
            ) : (
              // Caso 2: Sí se pasó appointmentInfo.
              // Los mensajes iniciales (info de la cita y acuse de recibo) deberían estar cargándose.
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                Cargando mensajes iniciales de su solicitud...
              </Typography>
            )
           )}
          {messages.map((msg) => {
            // Asumimos que los mensajes del agente no tienen 'status', o tienen un 'status' diferente
            // Ajusta esta lógica si es necesario para identificar correctamente los mensajes del agente.
            const isAgentMessage = msg.sender !== currentUser?.uid; 
            return (
              <ChatMessage key={msg.id} msg={msg} isAgent={isAgentMessage} />
            );
          })}
        </Box>

        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            multiline // Permitir múltiples líneas
            rows={2}    // Comenzar con 2 líneas, se expandirá si es necesario
            placeholder="Escribe tu mensaje..."
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!chatId || !currentUser} // Deshabilitar si no hay chat o usuario
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={sendMessage} color="primary" disabled={!chatId || !currentUser || (!newMsg.trim() && !file)}>
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
              disabled={!chatId || !currentUser}
            />
            <label htmlFor="file-upload">
              <Button
                variant="outlined"
                color="primary"
                component="span"
                startIcon={<AttachFileIcon />}
                sx={{ textTransform: "none" }}
                disabled={!chatId || !currentUser}
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
