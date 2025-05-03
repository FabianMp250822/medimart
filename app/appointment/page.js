"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { imedicAuth } from "@/lib/firebase";
import Layout from "@/components/layout/Layout";
import AuthOptions from "./citaIndex";

// Componentes separados
import MedicalAppointments from "./MedicalAppointments";
import ChatSupport from "./ChatSupport";
import MedicalResults from "./MedicalResults";

import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  Stack,
  useTheme,
} from "@mui/material";

// Iconos de Material UI
import PersonIcon from "@mui/icons-material/Person";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";

// 1. Define la función de estilos aquí
function getButtonStyles(menuKey, selectedMenu, theme) {
  const isSelected = selectedMenu === menuKey;
  return {
    textTransform: "none",
    border: "1px solid",
    borderColor: isSelected ? "#fff" : theme.palette.primary.main,
    color: isSelected ? "#fff" : theme.palette.primary.main,
    backgroundColor: isSelected ? theme.palette.primary.main : "#fff",
    boxShadow: isSelected ? 3 : 1,
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: isSelected
        ? theme.palette.primary.dark
        : theme.palette.action.hover,
      boxShadow: 4,
    },
  };
}

export default function Home() {
  const [user, setUser] = useState(null);

  // Verificar autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(imedicAuth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Layout
      headerStyle={2}
      footerStyle={1}
      breadcrumbTitle="Agendamiento de Citas Médicas Especializadas"
    >
      {user ? <ImedicDashboard user={user} /> : <AuthOptions />}
    </Layout>
  );
}

function ImedicDashboard({ user }) {
  const [selectedMenu, setSelectedMenu] = useState("profile");
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const theme = useTheme();

  const handleLogout = async () => {
    try {
      await signOut(imedicAuth);
      setSelectedMenu("profile");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // 2. Aplica la función a cada botón
  const getButtonStylesLocal = (menuKey) =>
    getButtonStyles(menuKey, selectedMenu, theme);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 2,
        maxWidth: 1200,
        mx: "auto",
        p: 2,
      }}
    >
      {/* Sidebar de navegación */}
      <Box
        sx={{
          flex: "0 0 30%",
          backgroundColor: "#fff",
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          alignItems: "stretch",
        }}
      >
        <Stack spacing={1}>
          <Button
            fullWidth
            startIcon={<PersonIcon />}
            onClick={() => setSelectedMenu("profile")}
            sx={getButtonStylesLocal("profile")}
          >
            Perfil
          </Button>
          <Button
            fullWidth
            startIcon={<MedicalServicesIcon />}
            onClick={() => setSelectedMenu("results")}
            sx={getButtonStylesLocal("results")}
          >
            Resultados Médicos
          </Button>
          <Button
            fullWidth
            startIcon={<CalendarTodayIcon />}
            onClick={() => setSelectedMenu("appointments")}
            sx={getButtonStylesLocal("appointments")}
          >
            Agendar citas
          </Button>
          <Button
            fullWidth
            startIcon={<ChatIcon />}
            onClick={() => setSelectedMenu("schedule")}
            sx={getButtonStylesLocal("schedule")}
          >
            Chat de soporte
          </Button>
          <Button
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={getButtonStylesLocal("logout")}
          >
            Logout
          </Button>
        </Stack>
      </Box>

      {/* Contenido del dashboard */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: 2,
          p: 3,
          boxShadow: 1,
          textAlign: "left",
        }}
      >
        {selectedMenu === "profile" && <Profile user={user} />}
        {selectedMenu === "results" && <MedicalResults />}
        {selectedMenu === "appointments" && (
          <MedicalAppointments
            onAppointmentConfirmed={() => setSelectedMenu("schedule")}
          />
        )}
        {selectedMenu === "schedule" && <ChatSupport />}
      </Box>
    </Box>
  );
}

function Profile({ user }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom align="left">
        Perfil del usuario
      </Typography>
      <Typography variant="body1" align="left">
        Bienvenido, {user.email}
      </Typography>
      <Typography variant="body2" align="left">
        UID: {user.uid}
      </Typography>
    </Box>
  );
}
