"use client";

import React, { useState } from "react";
import { imedicAuth, imedicDb, imedicStorage } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, collection, getDocs, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  FormControlLabel, 
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormHelperText
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function ImedicRegisterForm() {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [lugarSolicitud, setLugarSolicitud] = useState("");
  const estado = "activo";
  const [fotoFile, setFotoFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consentimiento, setConsentimiento] = useState(false);
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [submitAttempt, setSubmitAttempt] = useState(false);
  
  // Estados para los errores de validación
  const [errors, setErrors] = useState({
    nombres: false,
    apellidos: false,
    identificacion: false,
    telefono: false,
    direccion: false,
    lugarSolicitud: false,
    email: false,
    password: false,
    fechaNacimiento: false
  });

  const handleFotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFotoFile(e.target.files[0]);
    }
  };

  const validateForm = () => {
    const newErrors = {
      nombres: nombres.trim() === "",
      apellidos: apellidos.trim() === "",
      identificacion: identificacion.trim() === "",
      telefono: telefono.trim() === "",
      direccion: direccion.trim() === "",
      lugarSolicitud: lugarSolicitud.trim() === "",
      email: email.trim() === "",
      password: password.trim() === "",
      fechaNacimiento: fechaNacimiento === ""
    };
    
    setErrors(newErrors);
    
    // Verificar si hay algún error
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempt(true);
    
    // Validar formulario
    const isValid = validateForm();
    
    // Verificar consentimiento
    if (!consentimiento) {
      Swal.fire(
        "Error",
        "Debe aceptar el consentimiento informado para continuar",
        "error"
      );
      return;
    }
    
    // Si no es válido, detener el envío
    if (!isValid) {
      Swal.fire(
        "Error",
        "Por favor complete todos los campos obligatorios",
        "error"
      );
      return;
    }
    
    try {
      let fotoUrl = "";
      if (fotoFile) {
        const storageRef = ref(
          imedicStorage,
          `fotos/${Date.now()}_${fotoFile.name}`
        );
        const snapshot = await uploadBytes(storageRef, fotoFile);
        fotoUrl = await getDownloadURL(snapshot.ref);
      }

      const userCredential = await createUserWithEmailAndPassword(
        imedicAuth,
        email,
        password
      );
      const user = userCredential.user;

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
        fechaNacimiento,
        photo: fotoUrl,
        createdAt: new Date(),
        consentimientoAceptado: true,
        fechaConsentimiento: new Date()
      });

      await setDoc(doc(imedicDb, "roles", user.uid), {
        uid: user.uid,
        email: user.email,
        nivel: "paciente",
      });

      // Crear relación automática agente–paciente
      const agentesSnapshot = await getDocs(collection(imedicDb, "agentes"));
      if (!agentesSnapshot.empty) {
        const firstAgentDoc = agentesSnapshot.docs[0];
        await addDoc(collection(imedicDb, "agentPatientRelations"), {
          patientId: user.uid,
          agentUid: firstAgentDoc.id,
        });
      }

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
      setFechaNacimiento("");
      setConsentimiento(false);
      setSubmitAttempt(false);
    } catch (error) {
      console.error("Error al registrar paciente en imedic:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        maxWidth: 700,
        mx: "auto",
        p: 2,
      }}
    >
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Registro de Paciente
      </Typography>
      <Grid container spacing={2}>
        {/* Columna 1 */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombres"
            variant="outlined"
            fullWidth
            required
            value={nombres}
            onChange={(e) => {
              setNombres(e.target.value);
              if (submitAttempt) {
                setErrors({...errors, nombres: e.target.value.trim() === ""});
              }
            }}
            placeholder="Complete este campo"
            error={submitAttempt && errors.nombres}
            helperText={submitAttempt && errors.nombres ? "Este campo es obligatorio" : ""}
          />
          <Box mt={2}>
            <TextField
              label="Apellidos"
              variant="outlined"
              fullWidth
              required
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Identificación"
              variant="outlined"
              fullWidth
              required
              value={identificacion}
              onChange={(e) => setIdentificacion(e.target.value)}
              placeholder="Complete este campo"
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Fecha de Nacimiento"
              variant="outlined"
              fullWidth
              required
              type="date"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              required
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Dirección"
              variant="outlined"
              fullWidth
              required
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </Box>
        </Grid>
        {/* Columna 2 */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Lugar de Solicitud"
            variant="outlined"
            fullWidth
            value={lugarSolicitud}
            onChange={(e) => setLugarSolicitud(e.target.value)}
          />
          <Box mt={2}>
            <Button variant="outlined" component="label" fullWidth>
              {fotoFile ? "Foto seleccionada" : "Subir Foto"}
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFotoChange}
              />
            </Button>
          </Box>
          <Box mt={2}>
            <TextField
              label="Correo (Auth)"
              variant="outlined"
              fullWidth
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box mt={2}>
            <TextField
              label="Contraseña (Auth)"
              variant="outlined"
              fullWidth
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Consentimiento informado */}
      <Box mt={3}>
        <Accordion sx={{ backgroundColor: '#f5f5f5' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="consentimiento-content"
            id="consentimiento-header"
          >
            <Typography fontWeight="medium">Información sobre el tratamiento de datos personales</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" paragraph>
              <strong>CONSENTIMIENTO INFORMADO - TRATAMIENTO DE DATOS PERSONALES EN SALUD</strong>
            </Typography>
            <Typography variant="body2" paragraph>
              De conformidad con la Ley 1581 de 2012, el Decreto 1377 de 2013, la Resolución 1995 de 1999 y la Ley 2015 de 2020, 
              autorizo a la Clínica de la costa para la recolección, almacenamiento y tratamiento de mis datos personales y sensibles con las siguientes finalidades:
            </Typography>
            <Typography variant="body2" component="ul" sx={{ pl: 2 }}>
              <li>Prestación de servicios de salud, incluyendo agendamiento de citas, diagnóstico, tratamiento y seguimiento médico.</li>
              <li>Conformación y gestión de mi Historia Clínica Electrónica.</li>
              <li>Facturación y cobro de servicios prestados.</li>
              <li>Comunicación sobre información relacionada con mi salud y tratamientos.</li>
              <li>Gestión administrativa y cumplimiento de obligaciones legales.</li>
              <li>Estudios de calidad, estadísticos e investigación en salud (datos anonimizados).</li>
            </Typography>
            <Typography variant="body2" paragraph mt={1}>
              Entiendo que tengo derecho a conocer, actualizar, rectificar y suprimir mis datos personales, 
              a solicitar prueba de esta autorización, a presentar quejas ante la Superintendencia de Industria y Comercio, 
              a revocar esta autorización y a consultar gratuitamente mis datos.
            </Typography>
            <Typography variant="body2">
              Los datos de carácter sensible relacionados con mi salud serán tratados con máxima confidencialidad 
              conforme a lo establecido en la Resolución 1995 de 1999 y la Ley 2015 de 2020 sobre Historia Clínica Electrónica.
            </Typography>
          </AccordionDetails>
        </Accordion>
        
        <FormControlLabel
          control={
            <Checkbox 
              checked={consentimiento}
              onChange={(e) => setConsentimiento(e.target.checked)}
              color="primary"
            />
          }
          label="He leído y acepto el consentimiento informado para el tratamiento de mis datos personales"
        />
        {submitAttempt && !consentimiento && (
          <FormHelperText error>
            Debe aceptar el consentimiento informado para continuar con el registro
          </FormHelperText>
        )}
      </Box>

      <Box mt={3}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={
            !nombres || !apellidos || !identificacion || !telefono || 
            !direccion || !lugarSolicitud || !email || !password || 
            !fechaNacimiento || !consentimiento
          }
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            py: 1.5,
          }}
        >
          Registrar Paciente
        </Button>
      </Box>
    </Box>
  );
}
