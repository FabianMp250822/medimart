// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   collection,
//   query,
//   where,
//   orderBy,
//   getDocs,
// } from "firebase/firestore";
// import { imedicDb, imedicAuth } from "@/lib/firebase";
// import dayjs from "dayjs";
// import Swal from "sweetalert2";
// import {
//   Box,
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableContainer,
//   Button,
//   Pagination,
//   Stack,
// } from "@mui/material";

// export default function MedicalResults() {
//   const [results, setResults] = useState([]);
//   const [user, setUser] = useState(null);
//   const [patient, setPatient] = useState(null);
//   const [search, setSearch] = useState("");
//   const [filterField, setFilterField] = useState("name"); // "name", "specialty" o "date"
//   const [page, setPage] = useState(1);
//   const pageSize = 5;
//   const [notified, setNotified] = useState(false);

//   // Obtener el usuario actual
//   useEffect(() => {
//     const unsubscribe = imedicAuth.onAuthStateChanged((currentUser) => {
//       setUser(currentUser);
//     });
//     return () => unsubscribe();
//   }, []);

//   // Obtener datos del paciente a partir del uid del usuario
//   useEffect(() => {
//     if (!user) return;
//     async function fetchPatient() {
//       try {
//         const pacientesRef = collection(imedicDb, "pacientes");
//         const q = query(pacientesRef, where("uid", "==", user.uid));
//         const querySnapshot = await getDocs(q);
//         if (!querySnapshot.empty) {
//           const data = querySnapshot.docs[0].data();
//           setPatient(data);
//         } else {
//           setPatient(null);
//           Swal.fire("Información", "Paciente no registrado.", "info");
//         }
//       } catch (error) {
//         console.error("Error al obtener datos del paciente:", error);
//         Swal.fire("Error", "Error al obtener datos del paciente.", "error");
//       }
//     }
//     fetchPatient();
//   }, [user]);

//   // Obtener resultados médicos del paciente (filtrando por identificación)
//   useEffect(() => {
//     if (!patient) return;
//     async function fetchResults() {
//       try {
//         const resultadosRef = collection(imedicDb, "resultados");
//         // Se compara el campo "email" (que almacena la identificación) con patient.identificacion
//         const q = query(
//           resultadosRef,
//           where("email", "==", patient.identificacion),
//           orderBy("createdAt", "desc")
//         );
//         const querySnapshot = await getDocs(q);
//         const data = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setResults(data);
//       } catch (error) {
//         console.error("Error al obtener resultados:", error);
//         Swal.fire("Error", "Error al obtener resultados médicos.", "error");
//       }
//     }
//     fetchResults();
//   }, [patient]);

//   // Notificar al usuario si no hay resultados (se muestra solo una vez)
//   useEffect(() => {
//     if (patient && results.length === 0 && !notified) {
//       Swal.fire(
//         "Información",
//         "No tienes resultados médicos en este momento.",
//         "info"
//       );
//       setNotified(true);
//     }
//   }, [patient, results, notified]);

//   // Filtrar los resultados según la búsqueda
//   const filteredResults = results.filter((item) => {
//     if (!search) return true;
//     if (filterField === "date") {
//       const dateStr = dayjs(
//         item.createdAt.toDate ? item.createdAt.toDate() : item.createdAt
//       ).format("YYYY-MM-DD");
//       return dateStr.includes(search);
//     } else if (filterField === "specialty") {
//       return (
//         item.specialty &&
//         item.specialty.toLowerCase().includes(search.toLowerCase())
//       );
//     } else {
//       return (
//         item.name &&
//         item.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//   });

//   // Paginación
//   const totalPages = Math.ceil(filteredResults.length / pageSize);
//   const paginatedResults = filteredResults.slice(
//     (page - 1) * pageSize,
//     page * pageSize
//   );

//   // Manejar descarga del resultado
//   const handleDownload = (result) => {
//     if (result.downloadUrl) {
//       window.open(result.downloadUrl, "_blank");
//     } else {
//       Swal.fire(
//         "Información",
//         "No hay URL para descargar este resultado.",
//         "info"
//       );
//     }
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
//         <Typography variant="h5" align="center" gutterBottom>
//           Resultados Médicos
//         </Typography>

//         {/* Controles de búsqueda y filtro */}
//         <Stack
//           direction={{ xs: "column", sm: "row" }}
//           spacing={2}
//           alignItems="center"
//           justifyContent="center"
//           sx={{ my: 2 }}
//         >
//           <FormControl sx={{ minWidth: 180 }}>
//             <InputLabel id="filter-field-label">
//               Filtrar por
//             </InputLabel>
//             <Select
//               labelId="filter-field-label"
//               id="filter-field"
//               value={filterField}
//               label="Filtrar por"
//               onChange={(e) => {
//                 setFilterField(e.target.value);
//                 setSearch("");
//               }}
//             >
//               <MenuItem value="name">Nombre del resultado</MenuItem>
//               <MenuItem value="specialty">Especialidad</MenuItem>
//               <MenuItem value="date">Fecha</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             label={`Buscar por ${filterField}`}
//             variant="outlined"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             sx={{ flex: 1 }}
//           />
//         </Stack>

//         {/* Tabla de resultados */}
//         <TableContainer component={Paper} sx={{ mt: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Nombre</TableCell>
//                 <TableCell>Especialidad</TableCell>
//                 <TableCell>Fecha de subida</TableCell>
//                 <TableCell align="center">Descargas</TableCell>
//                 <TableCell align="center">Acción</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedResults.length > 0 ? (
//                 paginatedResults.map((result) => (
//                   <TableRow key={result.id}>
//                     <TableCell>{result.name}</TableCell>
//                     <TableCell>{result.specialty}</TableCell>
//                     <TableCell>
//                       {dayjs(
//                         result.createdAt.toDate
//                           ? result.createdAt.toDate()
//                           : result.createdAt
//                       ).format("YYYY-MM-DD")}
//                     </TableCell>
//                     <TableCell align="center">
//                       {result.downloadCount || 0}
//                     </TableCell>
//                     <TableCell align="center">
//                       <Button
//                         variant="contained"
//                         size="small"
//                         onClick={() => handleDownload(result)}
//                       >
//                         Descargar
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={5}
//                     align="center"
//                     sx={{ py: 3 }}
//                   >
//                     No se encontraron resultados.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Paginación */}
//         {totalPages > 1 && (
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               mt: 3,
//             }}
//           >
//             <Pagination
//               count={totalPages}
//               page={page}
//               onChange={(e, value) => setPage(value)}
//               color="primary"
//             />
//           </Box>
//         )}
//       </Paper>
//     </Container>
//   );
// }
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

// ==================================================================
// NUEVO: Estado para el modo de mantenimiento
// ==================================================================
const MAINTENANCE_MODE = true; // Cambiar a 'false' para desactivar el modo de mantenimiento

export default function MedicalResults() {
  // ==================================================================
  // NUEVO: Si está en modo de mantenimiento, renderizar el mensaje
  // ==================================================================
  if (MAINTENANCE_MODE) {
    return (
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "50vh",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Sitio en Mantenimiento
          </Typography>
          <Typography variant="body1">
            Estamos realizando algunas mejoras. Por favor, inténtelo de nuevo más
            tarde.
          </Typography>
        </Box>
      </Container>
    );
  }

  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);
  const [patient, setPatient] = useState(null);
  const [search, setSearch] = useState("");
  const [filterField, setFilterField] = useState("name"); // "name", "specialty" o "date"
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [notified, setNotified] = useState(false);

  // Obtener el usuario actual
  useEffect(() => {
    const unsubscribe = imedicAuth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Obtener datos del paciente a partir del uid del usuario
  useEffect(() => {
    if (!user) return;
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
  }, [user]);

  // Obtener resultados médicos del paciente (filtrando por identificación)
  useEffect(() => {
    if (!patient) return;
    async function fetchResults() {
      try {
        const resultadosRef = collection(imedicDb, "resultados");
        // Se compara el campo "email" (que almacena la identificación) con patient.identificacion
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
  }, [patient]);

  // Notificar al usuario si no hay resultados (se muestra solo una vez)
  useEffect(() => {
    if (patient && results.length === 0 && !notified) {
      Swal.fire(
        "Información",
        "No tienes resultados médicos en este momento.",
        "info"
      );
      setNotified(true);
    }
  }, [patient, results, notified]);

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
        <Typography variant="h5" align="center" gutterBottom>
          Resultados Médicos
        </Typography>

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
            label={`Buscar por ${filterField}`}
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flex: 1 }}
          />
        </Stack>

        {/* Tabla de resultados */}
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Especialidad</TableCell>
                <TableCell>Fecha de subida</TableCell>
                <TableCell align="center">Descargas</TableCell>
                <TableCell align="center">Acción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedResults.length > 0 ? (
                paginatedResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.name}</TableCell>
                    <TableCell>{result.specialty}</TableCell>
                    <TableCell>
                      {dayjs(
                        result.createdAt.toDate
                          ? result.createdAt.toDate()
                          : result.createdAt
                      ).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell align="center">
                      {result.downloadCount || 0}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleDownload(result)}
                      >
                        Descargar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                    No se encontraron resultados.
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
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
}
