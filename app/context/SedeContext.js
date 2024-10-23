'use client'; // Asegúrate de que este componente se ejecute en el cliente

import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Asegúrate de que la configuración de Firebase esté correcta

// Crear el contexto
const SedeContext = createContext();

// Hook para usar el contexto de sede
export const useSede = () => useContext(SedeContext);

// Proveedor de contexto para envolver la app
export const SedeProvider = ({ children }) => {
  const [selectedSede, setSelectedSede] = useState(null);
  const [sedesData, setSedesData] = useState({}); // Almacena todas las sedes
  const [sedeData, setSedeData] = useState(null); // Almacena la sede seleccionada
  const [contactos, setContactos] = useState(null); // Almacena los contactos de la sede seleccionada
  const [loading, setLoading] = useState(false); // Estado de carga para los contactos

  // Función para obtener los datos de las sedes desde Firebase
  const fetchSedes = async () => {
    try {
      setLoading(true); // Iniciar estado de carga
      const querySnapshot = await getDocs(collection(db, "sedes"));
      const data = {};
      querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data(); // Almacena cada documento por su ID
      });
      setSedesData(data); // Actualiza el estado con los datos de las sedes
      console.log("Datos de sedes obtenidos:", data); // Muestra los datos de las sedes obtenidos
    } catch (error) {
      console.error("Error al obtener las sedes:", error);
    } finally {
      setLoading(false); // Terminar estado de carga
    }
  };

  // Función para obtener los contactos de la sede seleccionada
  const fetchContactos = async (sedeKey) => {
    try {
      setLoading(true); // Iniciar carga para contactos
      const contactosSnapshot = await getDocs(collection(db, "sedes", sedeKey, "contactos"));
      const contactosData = {};
      contactosSnapshot.forEach((doc) => {
        contactosData[doc.id] = doc.data();
      });
      console.log("Contactos obtenidos:", contactosData); // Verifica si los datos se están obteniendo correctamente
      setContactos(contactosData); // Actualiza el estado con los datos de los contactos
    } catch (err) {
      console.error("Error al obtener los contactos:", err);
    } finally {
      setLoading(false); // Terminar la carga
    }
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
      console.log("Sede seleccionada:", sedeKey); // Muestra la sede seleccionada
      setSedeData(sedesData[sedeKey]);
      fetchContactos(sedeKey); // Cargar los contactos de la sede seleccionada
    }
  };

  useEffect(() => {
    // Verificar si hay una sede seleccionada previamente en localStorage
    const storedSede = localStorage.getItem("selectedSede");
    if (storedSede && sedesData[storedSede]) {
      console.log("Sede previamente seleccionada:", storedSede); // Muestra la sede almacenada en localStorage
      selectSede(storedSede);
    }
  }, [sedesData]); // Ejecutar cuando se carguen los datos de Firebase

  useEffect(() => {
    // Muestra en consola cada vez que se actualiza el contexto
    console.log("Contexto actualizado:", {
      selectedSede,
      sedeData,
      sedesData,
      contactos,
      loading,
    });
  }, [selectedSede, sedeData, sedesData, contactos, loading]);

  // Devolver el estado de carga junto con los datos
  return (
    <SedeContext.Provider value={{ selectedSede, sedeData, sedesData, contactos, selectSede, loading }}>
      {children}
    </SedeContext.Provider>
  );
};
