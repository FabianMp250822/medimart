"use client";

import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { imedicDb, imedicAuth } from "@/lib/firebase";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Button,
  Pagination,
  Stack,
} from "@mui/material";

export default function MedicalResults() {
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);
  const [patient, setPatient] = useState(null);
  const [search, setSearch] = useState("");
  const [filterField, setFilterField] = useState("name"); // "name", "specialty" o "date"
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [notified, setNotified] = useState(false);

  // Estado para controlar el modo de mantenimiento
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(true); // Cambiar a false para desactivar

  // Obtener el usuario actual
  useEffect(() => {
    if (isMaintenanceMode) return; // No hacer nada si está en mantenimiento
    const unsubscribe = imedicAuth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [isMaintenanceMode]);

  // Obtener datos del paciente a partir del uid del usuario
  useEffect(() => {
    if (isMaintenanceMode || !user) return; // No hacer nada si está en mantenimiento o no hay usuario
    async function fetchPatient() {
      try {
        const pacientesRef = collection(imedicDb, "pacientes");
        const q = query(pacientesRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setPatient(data);
        } else {
          setPatient(null);
          Swal.fire("Información", "Paciente no registrado.", "info");
        }
      } catch (error) {
        console.error("Error al obtener datos del paciente:", error);
        Swal.fire("Error", "Error al obtener datos del paciente.", "error");
      }
    }
    fetchPatient();
  }, [user, isMaintenanceMode]);

  // Obtener resultados médicos del paciente (filtrando por identificación)
  useEffect(() => {
    if (isMaintenanceMode || !patient) return; // No hacer nada si está en mantenimiento o no hay paciente
    async function fetchResults() {
      try {
        const resultadosRef = collection(imedicDb, "resultados");
        const q = query(
          resultadosRef,
          where("email", "==", patient.identificacion),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResults(data);
      } catch (error) {
        console.error("Error al obtener resultados:", error);
        Swal.fire("Error", "Error al obtener resultados médicos.", "error");
      }
    }
    fetchResults();
  }, [patient, isMaintenanceMode]);

  // Notificar al usuario si no hay resultados (se muestra solo una vez)
  useEffect(() => {
    if (isMaintenanceMode || !patient || results.length > 0 || notified) return;
    Swal.fire(
      "Información",
      "No tienes resultados médicos en este momento.",
      "info"
    );
    setNotified(true);
  }, [patient, results, notified, isMaintenanceMode]);

  // Filtrar los resultados según la búsqueda
  const filteredResults = results.filter((item) => {
    if (!search) return true;
    if (filterField === "date") {
      const dateStr = dayjs(
        item.createdAt.toDate ? item.createdAt.toDate() : item.createdAt
      ).format("YYYY-MM-DD");
      return dateStr.includes(search);
    } else if (filterField === "specialty") {
      return (
        item.specialty &&
        item.specialty.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      return (
        item.name &&
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
  });

  // Paginación
  const totalPages = Math.ceil(filteredResults.length / pageSize);
  const paginatedResults = filteredResults.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Manejar descarga del resultado
  const handleDownload = (result) => {
    if (result.downloadUrl) {
      window.open(result.downloadUrl, "_blank");
    } else {
      Swal.fire(
        "Información",
        "No hay URL para descargar este resultado.",
        "info"
      );
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: "#1976d2", fontWeight: 'bold' }}>
          Resultados Médicos
        </Typography>

        {isMaintenanceMode ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              ¡Estamos realizando mejoras!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Actualmente, estamos trabajando para optimizar la entrega de sus resultados médicos
              y ofrecerle una mejor experiencia.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              Agradecemos su comprensión y paciencia. Estaremos de vuelta en línea lo antes posible.
            </Typography>
            <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 3 }}>
              Disculpe las molestias ocasionadas.
            </Typography>
          </Box>
        ) : (
          <>
            {/* Controles de búsqueda y filtro */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              alignItems="center"
              justifyContent="center"
              sx={{ my: 2 }}
            >
              <FormControl sx={{ minWidth: 180 }}>
                <InputLabel id="filter-field-label">Filtrar por</InputLabel>
                <Select
                  labelId="filter-field-label"
                  id="filter-field"
                  value={filterField}
                  label="Filtrar por"
                  onChange={(e) => {
                    setFilterField(e.target.value);
                    setSearch("");
                  }}
                >
                  <MenuItem value="name">Nombre del resultado</MenuItem>
                  <MenuItem value="specialty">Especialidad</MenuItem>
                  <MenuItem value="date">Fecha</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label={`Buscar por ${filterField === "name" ? "nombre" : filterField}`}
                variant="outlined"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ flex: 1 }}
              />
            </Stack>

            {/* Tabla de resultados */}
            <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 1 }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Nombre</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Especialidad</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Fecha de subida</TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Descargas</TableCell>
                    <TableCell align="center" sx={{ fontWeight: "bold" }}>Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedResults.length > 0 ? (
                    paginatedResults.map((result) => (
                      <TableRow key={result.id} hover>
                        <TableCell>{result.name}</TableCell>
                        <TableCell>{result.specialty}</TableCell>
                        <TableCell>
                          {dayjs(
                            result.createdAt.toDate
                              ? result.createdAt.toDate()
                              : result.createdAt
                          ).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell align="center">
                          {result.downloadCount || 0}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            size="small"
                            onClick={() => handleDownload(result)}
                            disabled={!result.downloadUrl}
                          >
                            Descargar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          {patient ? "No se encontraron resultados que coincidan con su búsqueda." : "Cargando información del paciente..."}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Paginación */}
            {totalPages > 1 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 3,
                }}
              >
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
}
