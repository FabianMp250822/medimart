"use client"; // Asegúrate de que este componente se ejecute en el cliente

import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Layout from "@/components/layout/Layout";
import About from "@/components/sections/home1/About";
import Banner from "@/components/sections/home1/Banner";
import Services from "@/components/sections/home1/Services";
import Features from "@/components/sections/home1/Features";
import Funfacts from "@/components/sections/home1/Funfacts";
import Testimonial from "@/components/sections/home1/Testimonial";
import WhyChooseUs from "@/components/sections/home1/WhyChooseUs";
import Process from "@/components/sections/home1/Process";
import Team from "@/components/sections/home1/Team";
import { useSede } from "@/app/context/SedeContext";

export default function Home() {
  const { selectedSede, selectSede, sedesData } = useSede(); // Obtener las sedes desde el contexto

  useEffect(() => {
    const storedSede = localStorage.getItem("selectedSede");

    if (!storedSede || !sedesData[storedSede]) {
      // Si no hay sede o la sede almacenada no es válida, abre el modal
      openSedeModal();
    } else {
      selectSede(storedSede); // Cargar la sede almacenada en el contexto
    }
  }, [sedesData, selectSede]); // Ejecutar cada vez que las sedes o el selectSede cambien

  const handleSedeSelect = (sede) => {
    if (sedesData[sede]) {
      selectSede(sede); // Actualiza la sede en el contexto global
      localStorage.setItem("selectedSede", sede); // Guardar la sede seleccionada en localStorage
      Swal.close(); // Cerrar el modal de SweetAlert2
    } else {
      console.error("Sede seleccionada no válida");
    }
  };

  const openSedeModal = () => {
    if (!sedesData || Object.keys(sedesData).length === 0) return; // Evitar mostrar el modal si los datos aún no están listos

    Swal.fire({
      title: 'Selecciona una Sede',
      html: `
        <style>
          .swal2-popup {
            width: 90vw !important;
            max-width: 1200px !important;
            height: auto !important;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .swal2-title {
            font-size: 2rem; /* Reduce el tamaño del título para móviles */
            margin-bottom: 20px;
            font-weight: bold;
            color: #333;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          .sede-grid {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 30px;
            width: 100%;
          }
          .sede-item {
            cursor: pointer;
            text-align: center;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            width: 150px; /* Ajusta el ancho para móviles */
            background-color: transparent;
          }
          .sede-item:hover {
            transform: scale(1.05);
          }
          .sede-item img {
            width: 100px; /* Ajusta el tamaño de la imagen para móviles */
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            transition: transform 0.3s ease;
            box-shadow: none;
          }
          .sede-item img:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
          }
          .sede-item h2 {
            margin-top: 10px;
            font-size: 1.2rem; /* Reduce el tamaño del texto */
            font-weight: 700;
            color: #333;
            transition: color 0.3s ease, background-size 0.3s ease;
            background: linear-gradient(to right, #2563eb, #1e3a8a);
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            background-size: 200% 100%;
          }
          .sede-item:hover h2 {
            background-position: right;
          }
  
          /* Media Queries para móviles */
          @media (max-width: 600px) {
            .swal2-title {
              font-size: 1.5rem; /* Título más pequeño en móviles */
            }
            .sede-item {
              width: 120px; /* Ajustar el ancho para móviles más pequeños */
            }
            .sede-item img {
              width: 80px; /* Ajustar tamaño de imagen en móviles más pequeños */
              height: 80px;
            }
            .sede-item h2 {
              font-size: 1rem; /* Reducir el tamaño de fuente en móviles */
            }
          }
        </style>
        <div class="sede-grid">
          ${Object.keys(sedesData)
            .map(
              (sedeKey) => `
                <div class="sede-item" id="sede-${sedeKey}" aria-label="Seleccionar sede de ${sedesData[sedeKey].nombre}">
                  <img src="${sedesData[sedeKey].modalImage}" alt="${sedesData[sedeKey].nombre}" />
                  <h2>${sedesData[sedeKey].nombre}</h2>
                </div>
              `
            )
            .join('')}
        </div>
      `,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      backdrop: true,
      didOpen: () => {
        Object.keys(sedesData).forEach((sedeKey) => {
          document
            .getElementById(`sede-${sedeKey}`)
            .addEventListener("click", () => handleSedeSelect(sedeKey));
        });
      },
    });
  };
  

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        {selectedSede && (
          <>
            <Banner />
            <Features />
            <About />
            <Services />
            <WhyChooseUs />
            <Funfacts />
            <Process />
            <Testimonial />
            <Team />
          </>
        )}
      </Layout>
    </>
  );
}
