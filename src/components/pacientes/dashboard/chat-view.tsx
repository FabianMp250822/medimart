
'use client';

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
import { imedicDb, imedicAuth, imedicStorage } from "@/lib/firebase";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, FileText, X, Loader2 } from "lucide-react";
import Image from "next/image";

interface ChatViewProps {
    setActiveView: (view: string) => void;
}

function MarkdownMessage({ text, onNavigateToAppointments }: { text: string; onNavigateToAppointments: () => void }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose prose-sm text-foreground"
      components={{
        a: ({ node, ...props }) => {
          if (props.href === "#ACTION_NAVIGATE_TO_APPOINTMENTS") {
            return (
              <button
                onClick={onNavigateToAppointments}
                className="text-accent font-bold underline p-0 bg-transparent h-auto inline hover:text-accent/80"
              >
                {props.children}
              </button>
            );
          }
          return (
            <a {...props} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              {props.children}
            </a>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

function ChatMessage({ msg, isAgent, onNavigateToAppointments }: { msg: any; isAgent: boolean; onNavigateToAppointments: () => void }) {
  return (
    <div className={`flex mb-2 ${isAgent ? "justify-start" : "justify-end"}`}>
      <div className={`rounded-lg p-3 max-w-[70%] shadow-sm ${isAgent ? "bg-card border" : "bg-primary text-primary-foreground"}`}>
        {msg.message && <MarkdownMessage text={msg.message} onNavigateToAppointments={onNavigateToAppointments} />}
        {msg.fileUrl && (
          <div className="mt-2">
            {msg.fileType.startsWith("image/") ? (
              <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer">
                <Image src={msg.fileUrl} alt="Adjunto" width={200} height={200} className="rounded-md max-w-full h-auto" />
              </a>
            ) : (
              <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm underline">
                <FileText className="h-4 w-4" />
                <span>Ver archivo adjunto</span>
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function ChatView({ setActiveView }: ChatViewProps) {
  const [user, userLoading] = useAuthState(imedicAuth);
  const [statusMessage, setStatusMessage] = useState("Cargando información...");
  const [chatId, setChatId] = useState<string | null>(null);
  const [agentName, setAgentName] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [hasAppointmentRequest, setHasAppointmentRequest] = useState(false);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [patientAgentUid, setPatientAgentUid] = useState("");
  const [isAssigningAgent, setIsAssigningAgent] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const onNavigateToAppointments = () => setActiveView('appointments');

  useEffect(() => {
    if (userLoading || !user) {
      if (!userLoading) {
        setLoadingRequests(false);
        setStatusMessage("Debe iniciar sesión para usar el chat.");
      }
      return;
    }

    const checkForAppointmentRequests = async () => {
      if (!imedicDb) return;
      try {
        setLoadingRequests(true);
        const solQuery = query(collection(imedicDb, "solicitudesCitas"), where("uidPaciente", "==", user.uid));
        const solSnapshot = await getDocs(solQuery);
        const citasQuery = query(collection(imedicDb, "citas"), where("uidPaciente", "==", user.uid));
        const citasSnapshot = await getDocs(citasQuery);
        setHasAppointmentRequest(!solSnapshot.empty || !citasSnapshot.empty);
      } catch (error) {
        console.error("Error al verificar solicitudes de cita:", error);
      } finally {
        setLoadingRequests(false);
      }
    };
    checkForAppointmentRequests();
  }, [user, userLoading]);

  useEffect(() => {
    if (!user || !imedicDb) return;

    const relQ = query(collection(imedicDb, "agentPatientRelations"), where("patientId", "==", user.uid));
    const unsubscribeRel = onSnapshot(relQ, (snap) => {
      if (!snap.empty) {
        const relationData = snap.docs[0].data();
        setPatientAgentUid(relationData.agentUid || "");
      } else {
        setPatientAgentUid("");
      }
    }, (error) => {
      console.error("Chat: Error en listener de agentPatientRelations:", error);
      setStatusMessage("Error al obtener relación con agente.");
    });
    return () => unsubscribeRel();
  }, [user]);

  useEffect(() => {
      const assignAgentIfNeeded = async () => {
          if (user && hasAppointmentRequest && !patientAgentUid && !isAssigningAgent && !loadingRequests) {
              setIsAssigningAgent(true);
              setStatusMessage("Asignando un agente de soporte...");
              if (!imedicDb) return;
              try {
                  const agentQuery = query(collection(imedicDb, "agentes"));
                  const agentSnapshot = await getDocs(agentQuery);
                  if (!agentSnapshot.empty) {
                      const agentDoc = agentSnapshot.docs[0]; // Simple assignment logic
                      await addDoc(collection(imedicDb, "agentPatientRelations"), {
                          agentUid: agentDoc.id,
                          patientId: user.uid,
                          assignedAt: Timestamp.now()
                      });
                      // The onSnapshot for relations will pick up this change and set patientAgentUid
                  } else {
                      setStatusMessage("No hay agentes de soporte disponibles en este momento.");
                  }
              } catch (error) {
                  console.error("Error asignando agente:", error);
                  setStatusMessage("Error al asignar un agente de soporte.");
              } finally {
                  setIsAssigningAgent(false);
              }
          }
      };
      assignAgentIfNeeded();
  }, [user, hasAppointmentRequest, patientAgentUid, isAssigningAgent, loadingRequests]);
  
  const initChat = useCallback(async (patientId: string, agentUid: string) => {
    if (!imedicDb) return;
    try {
      setStatusMessage("Buscando chat...");
      const chatQ = query(
        collection(imedicDb, "chats"),
        where("patientUid", "==", patientId),
        where("agentUid", "==", agentUid)
      );
      const chatSnap = await getDocs(chatQ);
      let newChatId: string;

      if (chatSnap.empty) {
        const chatRef = await addDoc(collection(imedicDb, "chats"), {
          patientUid: patientId,
          agentUid,
          createdAt: Timestamp.now(),
          participants: [patientId, agentUid]
        });
        newChatId = chatRef.id;

        const welcomeMessage = `Bienvenido(a) al chat de soporte de Clínica de la Costa. Este canal está disponible para el agendamiento y seguimiento de sus citas médicas. Si ya ha realizado una solicitud, un agente se comunicará con usted en breve por este medio para asistirlo.`;
        await addDoc(collection(imedicDb, "chats", newChatId, "messages"), {
          message: welcomeMessage,
          sender: agentUid,
          status: "recibido",
          timestamp: Timestamp.now(),
        });
      } else {
        newChatId = chatSnap.docs[0].id;
      }
      setChatId(newChatId);

      const agentDoc = await getDoc(doc(imedicDb, "agentes", agentUid));
      if (agentDoc.exists()) {
        setAgentName(agentDoc.data().agentName);
        setStatusMessage("");
      } else {
        setAgentName("Agente");
        setStatusMessage("");
      }
    } catch (err) {
      console.error("Chat: Error inicializando chat:", err);
      setStatusMessage("Error al inicializar el chat.");
    }
  }, []);

  useEffect(() => {
    if (user && patientAgentUid) {
      initChat(user.uid, patientAgentUid);
    } else if (user && !patientAgentUid && !isAssigningAgent) {
      setChatId(null);
      setMessages([]);
      setAgentName("");
      if (hasAppointmentRequest) {
        setStatusMessage("Esperando asignación de un agente...");
      }
    }
  }, [user, patientAgentUid, initChat, isAssigningAgent, hasAppointmentRequest]);


  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!chatId || !imedicDb) {
      setMessages([]);
      return;
    }
    const messagesRef = collection(imedicDb, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error("Chat: Error en listener de mensajes:", error);
      setStatusMessage("Error al cargar mensajes.");
    });
    return () => unsubscribe();
  }, [chatId]);

  const sendMessage = async () => {
    if ((!newMsg.trim() && !file) || !chatId || !user || !imedicDb || !imedicStorage) return;

    try {
      let fileUrl = null;
      let fileType = null;
      if (file) {
        const storagePath = `chats/${chatId}/${Date.now()}_${file.name}`;
        const fileRef = storageRef(imedicStorage, storagePath);
        const snapshot = await uploadBytes(fileRef, file);
        fileUrl = await getDownloadURL(snapshot.ref);
        fileType = file.type;
      }
      await addDoc(collection(imedicDb, "chats", chatId, "messages"), {
        message: newMsg.trim(),
        sender: user.uid,
        status: "emitido",
        timestamp: Timestamp.now(),
        fileUrl,
        fileType,
      });
      setNewMsg("");
      setFile(null);
    } catch (error) {
      console.error("Chat: Error al enviar mensaje:", error);
      setStatusMessage("Error al enviar el mensaje.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
        if (selectedFile.size > 5 * 1024 * 1024) {
            alert("El archivo no puede exceder los 5MB.");
            return;
        }
        if (!["image/jpeg", "image/png", "application/pdf"].includes(selectedFile.type)) {
            alert("Solo se permiten archivos de tipo imagen (JPG, PNG) o PDF.");
            return;
        }
        setFile(selectedFile);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (userLoading || loadingRequests) {
    return (
      <Card>
        <CardHeader><CardTitle>Chat de Soporte</CardTitle></CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }
  
  if (!user) {
     return (
      <Card>
        <CardHeader><CardTitle>Chat de Soporte</CardTitle></CardHeader>
        <CardContent>
           <Alert variant="destructive">
                <AlertTitle>Acceso denegado</AlertTitle>
                <AlertDescription>Debe iniciar sesión para usar el chat de soporte.</AlertDescription>
            </Alert>
        </CardContent>
      </Card>
     );
  }

  if (!hasAppointmentRequest) {
    return (
       <Card>
        <CardHeader><CardTitle>Chat de Soporte</CardTitle></CardHeader>
        <CardContent>
             <Alert>
                <AlertTitle>Chat no disponible</AlertTitle>
                <AlertDescription>
                    El chat de soporte solo está disponible para pacientes con solicitudes de cita. Por favor, agende una cita primero.
                </AlertDescription>
                <Button onClick={onNavigateToAppointments} className="mt-4">Agendar Cita</Button>
            </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full max-h-[80vh]">
        <CardHeader className="border-b">
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Chat de Soporte</CardTitle>
                    <CardDescription>Clínica de la Costa</CardDescription>
                </div>
                {agentName && <div className="text-sm font-semibold text-primary">Agente: {agentName}</div>}
            </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 flex flex-col">
             <ScrollArea className="flex-1 p-4" ref={chatContainerRef}>
                {statusMessage && <p className="text-center text-sm text-muted-foreground my-4">{statusMessage}</p>}
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} msg={msg} isAgent={msg.sender !== user?.uid} onNavigateToAppointments={onNavigateToAppointments} />
                ))}
            </ScrollArea>
            <div className="p-4 border-t bg-background">
                {file && (
                    <div className="mb-2 flex items-center justify-between p-2 rounded-md border bg-muted/50 text-sm">
                        <div className="flex items-center gap-2 truncate">
                           <Paperclip className="h-4 w-4 flex-shrink-0" />
                           <span className="truncate">{file.name}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setFile(null)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}
                <div className="relative">
                    <Textarea
                        placeholder="Escribe tu mensaje..."
                        value={newMsg}
                        onChange={(e) => setNewMsg(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={!chatId}
                        className="pr-24"
                        rows={1}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <Button asChild variant="ghost" size="icon" disabled={!chatId}>
                            <label htmlFor="file-upload" className="cursor-pointer">
                                <Paperclip className="h-5 w-5" />
                                <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                            </label>
                        </Button>
                        <Button size="icon" onClick={sendMessage} disabled={!chatId || (!newMsg.trim() && !file)}>
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
