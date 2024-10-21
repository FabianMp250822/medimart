"use client"; // Asegúrate de que el contexto se ejecute en el cliente

import { createContext, useContext, useState } from "react";
import { sedesData } from "../data/sedesData";


// Crear el contexto
const SedeContext = createContext();

// Hook para usar el contexto de sede
export const useSede = () => {
  return useContext(SedeContext);
};

// Proveedor de contexto para envolver la app
export const SedeProvider = ({ children }) => {
  const [selectedSede, setSelectedSede] = useState(null);
  const [sedeData, setSedeData] = useState(null);

  const selectSede = (sede) => {
    setSelectedSede(sede);
    localStorage.setItem("selectedSede", sede); // Guardar la sede seleccionada en localStorage

    // Cargar los datos de la sede seleccionada
    if (sedesData[sede]) {
      setSedeData(sedesData[sede]);
    }
  };

  return (
    <SedeContext.Provider value={{ selectedSede, sedeData, selectSede }}>
      {children}
    </SedeContext.Provider>
  );
};
