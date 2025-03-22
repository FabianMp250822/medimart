"use client";

import React, { useState } from "react";
import { imedicAuth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { Box, TextField, Button, Typography } from "@mui/material";

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
      console.error("Error al iniciar sesión:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      noValidate
      sx={{
        maxWidth: 400,
        mx: "auto",
        p: 2,
      }}
    >
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Iniciar Sesión
      </Typography>
      <TextField
        label="Correo"
        variant="outlined"
        fullWidth
        margin="normal"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Contraseña"
        variant="outlined"
        fullWidth
        margin="normal"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2, textTransform: "uppercase", fontWeight: "bold" }}
      >
        Iniciar Sesión
      </Button>
    </Box>
  );
}
