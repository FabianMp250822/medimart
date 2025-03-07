"use client";

import React, { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { imedicDb, imedicAuth } from "@/lib/firebase";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default function MedicalResults() {
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
      Swal.fire("Información", "No tienes resultados médicos en este momento.", "info");
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
      Swal.fire("Información", "No hay URL para descargar este resultado.", "info");
    }
  };

  return (
    <div className="medical-results-container">
      <h3>Resultados Médicos</h3>

      <div className="search-container">
        <select
          value={filterField}
          onChange={(e) => {
            setFilterField(e.target.value);
            setSearch("");
          }}
        >
          <option value="name">Nombre del resultado</option>
          <option value="specialty">Especialidad</option>
          <option value="date">Fecha</option>
        </select>
        <input
          type="text"
          placeholder={`Buscar por ${filterField}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="results-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Especialidad</th>
            <th>Fecha de subida</th>
            <th>Descargas</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {paginatedResults.length > 0 ? (
            paginatedResults.map((result) => (
              <tr key={result.id}>
                <td>{result.name}</td>
                <td>{result.specialty}</td>
                <td>
                  {dayjs(
                    result.createdAt.toDate
                      ? result.createdAt.toDate()
                      : result.createdAt
                  ).format("YYYY-MM-DD")}
                </td>
                <td>{result.downloadCount || 0}</td>
                <td>
                  <button onClick={() => handleDownload(result)}>
                    Descargar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No se encontraron resultados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages || totalPages === 0}
        >
          Siguiente
        </button>
      </div>

      <style jsx>{`
        .medical-results-container {
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          max-width: 900px;
          margin: 20px auto;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        h3 {
          text-align: center;
          margin-bottom: 20px;
        }
        .search-container {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .search-container select,
        .search-container input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .results-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .results-table th,
        .results-table td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
        }
        .results-table th {
          background-color: #f8f8f8;
        }
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
        }
        .pagination button {
          padding: 8px 12px;
          border: none;
          background-color: #007bff;
          color: #fff;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .pagination button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
