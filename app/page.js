"use client";

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

export default function Home() {
  const [selectedSede, setSelectedSede] = useState(null);
  const sedes = [
    { id: 1, name: "Barranquilla", image: "https://picsum.photos/400/400?random=1", alt: "Sede en Barranquilla" },
    { id: 2, name: "Cartagena", image: "https://picsum.photos/400/400?random=2", alt: "Sede en Cartagena" },
    { id: 3, name: "Santa Marta", image: "https://picsum.photos/400/400?random=3", alt: "Sede en Santa Marta" },
    { id: 4, name: "Rioacha", image: "https://picsum.photos/400/400?random=4", alt: "Sede en Rioacha" },
  ];
  
  useEffect(() => {
    const storedSede = localStorage.getItem("selectedSede");
  
    if (!storedSede) {
      openSedeModal(); // Si no hay sede seleccionada, abre el modal
    } else {
      setSelectedSede(storedSede);
    }
  }, []);
  
  const handleSedeSelect = (sede) => {
    setSelectedSede(sede);
    localStorage.setItem("selectedSede", sede);
    Swal.close(); // Cerrar el modal de SweetAlert2
  };
  
  const openSedeModal = () => {
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
            font-size: 2.5rem;
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
            width: 200px;
            background-color: transparent;
          }
          .sede-item:hover {
            transform: scale(1.05);
          }
          .sede-item img {
            width: 150px;
            height: 150px;
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
            margin-top: 15px;
            font-size: 1.5rem;
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
        </style>
        <div class="sede-grid">
          ${sedes
            .map(
              (sede) => `
                <div class="sede-item" id="sede-${sede.id}" aria-label="Seleccionar sede de ${sede.name}">
                  <img src="${sede.image}" alt="${sede.alt}" />
                  <h2>${sede.name}</h2>
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
        sedes.forEach((sede) => {
          document
            .getElementById(`sede-${sede.id}`)
            .addEventListener("click", () => handleSedeSelect(sede.name));
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
