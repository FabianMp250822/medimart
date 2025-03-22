"use client";

import React, { useState } from "react";
import { imedicAuth, imedicDb, imedicStorage } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";
import { Box, TextField, Button, Typography, Grid } from "@mui/material";

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

  const handleFotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        photo: fotoUrl,
        createdAt: new Date(),
      });

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
            onChange={(e) => setNombres(e.target.value)}
            placeholder="Complete este campo"
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
      <Box mt={3}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
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
