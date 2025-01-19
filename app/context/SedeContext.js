'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; 

const SedeContext = createContext();

export const useSede = () => useContext(SedeContext);

export const SedeProvider = ({ children }) => {
  const [selectedSede, setSelectedSede] = useState(null);
  const [sedeData, setSedeData] = useState(null); 
  const [contactos, setContactos] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [fetchingContactosSede, setFetchingContactosSede] = useState(null);

  const [sedesData, setSedesData] = useState({});  
  const storedSede = localStorage.getItem("selectedSede"); // Declarar storedSede aquí


  const fetchSedes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "sedes"));
      const data = {};
      querySnapshot.forEach((doc) => {
        data[doc.id] = doc.data(); 
      });
      setSedesData(data); 
    } catch (error) {
      console.error("Error al obtener las sedes:", error);
    }
  };

  const fetchContactos = async (sedeKey) => {
    if (sedeKey === fetchingContactosSede) return; 

    try {
      setLoading(true); 
      setFetchingContactosSede(sedeKey);
      const contactosSnapshot = await getDocs(collection(db, "sedes", sedeKey, "contactos"));
      const contactosData = {};
      contactosSnapshot.forEach((doc) => {
        contactosData[doc.id] = doc.data();
      });
      setContactos(contactosData); 
    } catch (err) {
      console.error("Error al obtener los contactos:", err);
    } finally {
      setLoading(false); 
      setFetchingContactosSede(null);
    }
  };

  useEffect(() => {
    fetchSedes(); 
  }, []);

  const selectSede = (sedeKey) => {
    setSelectedSede(sedeKey);
    localStorage.setItem("selectedSede", sedeKey); 

    if (sedesData[sedeKey]) {  
      setSedeData(sedesData[sedeKey]);
      fetchContactos(sedeKey); 
    }
  };

  useEffect(() => {
    if (storedSede && sedesData[storedSede]) {
      selectSede(storedSede);
    }
  }, [sedesData, storedSede]); 

  return (
    <SedeContext.Provider value={{ selectedSede, sedeData, contactos, selectSede, loading }}> 
      {children}
    </SedeContext.Provider>
  );
};