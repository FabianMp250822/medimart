"use client";

import React, { useState } from "react";
import { Paper, Box, Tabs, Tab, Typography } from "@mui/material";
import ImedicRegisterForm from "./ImedicRegisterForm";
import ImedicLoginForm from "./ImedicLoginForm";

export default function AuthOptions() {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 900,
        margin: "auto",
        mt: 8,
        p: 4,
        borderRadius: 3,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Mi Clicosta
        </Typography>
      </Box>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab label="Login" />
        <Tab label="No está registrado" />
      </Tabs>
      <Box>
        {activeTab === 0 && <ImedicLoginForm />}
        {activeTab === 1 && <ImedicRegisterForm />}
      </Box>
    </Paper>
  );
}
