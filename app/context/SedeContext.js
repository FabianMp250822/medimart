'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SedeContext = createContext();

export const useSede = () => useContext(SedeContext);

export const SedeProvider = ({ children }) => {
  const [selectedSede, setSelectedSede] = useState(null);
  const [sedesData, setSedesData] = useState({});
  const [sedeData, setSedeData] = useState(null);
  const [contactos, setContactos] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialSedeLoaded, setInitialSedeLoaded] = useState(false);

  const fetchSedes = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "sedes"));
      const data = {};
      querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data();
      });
      setSedesData(data);
      console.log("Datos de sedes obtenidos:", data);
    } catch (error) {
      console.error("Error al obtener las sedes:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchContactos = async (sedeKey) => {
    try {
      setLoading(true);
      const contactosSnapshot = await getDocs(collection(db, "sedes", sedeKey, "contactos"));
      const contactosData = {};
      contactosSnapshot.forEach((doc) => {
        contactosData[doc.id] = doc.data();
      });
      console.log("Contactos obtenidos:", contactosData);
      setContactos(contactosData);
    } catch (err) {
      console.error("Error al obtener los contactos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSedes();
  }, []);

  const selectSede = (sedeKey) => {
    if (sedeKey !== selectedSede) {
      setSelectedSede(sedeKey);
      localStorage.setItem("selectedSede", sedeKey);

      if (sedesData[sedeKey]) {
        console.log("Sede seleccionada:", sedeKey);
        setSedeData(sedesData[sedeKey]);

        if (!contactos || selectedSede !== sedeKey) {
          fetchContactos(sedeKey);
        }
      }
    }
  };

  useEffect(() => {
    if (!initialSedeLoaded && Object.keys(sedesData).length > 0) {
      const storedSede = localStorage.getItem("selectedSede");
      if (storedSede && sedesData[storedSede]) {
        console.log("Sede previamente seleccionada:", storedSede);
        selectSede(storedSede);
      }
      setInitialSedeLoaded(true);
    }
  }, [sedesData, initialSedeLoaded]);

  return (
    <SedeContext.Provider value={{ selectedSede, sedeData, sedesData, contactos, selectSede, loading }}>
      {children}
    </SedeContext.Provider>
  );
};