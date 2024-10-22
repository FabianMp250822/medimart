"use client"; // Asegúrate de que el contexto se ejecute en el cliente

import { createContext, useContext, useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";


// Crear el contexto
const SedeContext = createContext();

// Hook para usar el contexto de sede
export const useSede = () => {
  return useContext(SedeContext);
};

// Proveedor de contexto para envolver la app
export const SedeProvider = ({ children }) => {
  const [selectedSede, setSelectedSede] = useState(null);
  const [sedesData, setSedesData] = useState({}); // Almacena todas las sedes
  const [sedeData, setSedeData] = useState(null); // Almacena la sede seleccionada

  // Función para obtener los datos de las sedes desde Firebase
  const fetchSedes = async () => {
    const querySnapshot = await getDocs(collection(db, "sedes"));
    const data = {};
    querySnapshot.forEach((doc) => {
      data[doc.id] = doc.data(); // Almacena cada documento por su ID
    });
    setSedesData(data); // Actualiza el estado con los datos de las sedes
  };

  useEffect(() => {
    fetchSedes(); // Cargar los datos de Firebase cuando el componente se monta
  }, []);

  // Función para seleccionar una sede
  const selectSede = (sedeKey) => {
    setSelectedSede(sedeKey);
    localStorage.setItem("selectedSede", sedeKey); // Guardar la sede seleccionada en localStorage

    // Cargar los datos de la sede seleccionada desde el estado
    if (sedesData[sedeKey]) {
      setSedeData(sedesData[sedeKey]);
    }
  };

  useEffect(() => {
    // Verificar si hay una sede seleccionada previamente en localStorage
    const storedSede = localStorage.getItem("selectedSede");
    if (storedSede && sedesData[storedSede]) {
      selectSede(storedSede);
    }
  }, [sedesData]); // Ejecutar cuando se carguen los datos de Firebase

  return (
    <SedeContext.Provider value={{ selectedSede, sedeData, sedesData, selectSede }}>
      {children}
    </SedeContext.Provider>
  );
};
