// components/modals/SedeModal.js
"use client";

import { useEffect } from 'react';
import Swal from 'sweetalert2';

const SedeModal = ({ sedesData, handleSedeSelect }) => {
  useEffect(() => {
    if (!sedesData || Object.keys(sedesData).length === 0) return;

    Swal.fire({
      title: "Selecciona una Sede",
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
            font-size: 2rem;
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
            width: 150px;
            background-color: transparent;
          }
          .sede-item:hover {
            transform: scale(1.05);
          }
          .sede-item img {
            width: 100px;
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
            font-size: 1.2rem;
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
            .join("")}
        </div>
      `,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      backdrop: true,
      didOpen: () => {
        Object.keys(sedesData).forEach((sedeKey) => {
          const sedeElement = document.getElementById(`sede-${sedeKey}`);
          if (sedeElement) {
            sedeElement.addEventListener("click", () => {
              handleSedeSelect(sedeKey);
              // Cierra el modal de SweetAlert2
              Swal.close();
            });
          }
        });
      },
    }).then((result) => {
      // Opcional: puedes agregar lógica aquí si la necesitas,
      // por ejemplo, para manejar el caso en que el modal
      // se cierra de otra forma que no sea haciendo clic
      // en una sede.
    });
  }, [sedesData, handleSedeSelect]);

  return null; // El modal no renderiza nada directamente
};

export default SedeModal;