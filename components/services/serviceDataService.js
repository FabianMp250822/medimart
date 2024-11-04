// src/services/serviceDataService.js

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

// Función para obtener todos los servicios y subservicios de Firebase
export async function getServicesData() {
  const services = {};

  try {
    // Referencia a la colección `serviciosclinica`
    const querySnapshot = await getDocs(collection(db, "serviciosclinica"));

    // Recorremos los documentos y organizamos los datos
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const title = doc.id.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()); // Formato de título
      services[title] = data.subservices || [];
    });

    // Convertimos el objeto en un arreglo estructurado como `servicesData`
    const servicesArray = Object.keys(services).map((title) => ({
      title,
      subservices: services[title],
    }));

    return servicesArray;
  } catch (error) {
    console.error("Error al obtener los servicios de Firebase:", error);
    throw new Error("No se pudieron obtener los datos de servicios.");
  }
}
