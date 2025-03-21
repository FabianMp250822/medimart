"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaStar,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaSpinner,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Ícono de Google
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Swal from "sweetalert2";

export default function Page() {
  // Estados
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [selectedClinic, setSelectedClinic] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRating, setSubmittedRating] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const clinics = ["Riohacha", "Cartagena", "Barranquilla", "Santa Marta"];

  // SweetAlert2 configuration (para reusabilidad)
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  // Función para validar el formato del correo electrónico
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!name) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, introduce tu nombre.",
      });
      return;
    }
    if (!contactNumber) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, introduce tu número de contacto.",
      });
      return;
    }
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, introduce tu correo electrónico.",
      });
      return;
    }
    if (!isValidEmail(email)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, introduce un correo electrónico válido.",
      });
      return;
    }
    if (!selectedClinic) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, selecciona una sede de la clínica.",
      });
      return;
    }

    setIsLoading(true);
    setSubmitError(null);

    // Confirmación con SweetAlert2
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Vas a enviar tu opinión a la Clínica de la Costa.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, enviar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const docRef = await addDoc(collection(db, "pqyr"), {
          rating,
          comment,
          name,
          contactNumber,
          email,
          selectedClinic,
          createdAt: serverTimestamp(),
        });

        console.log("Documento escrito con ID: ", docRef.id);
        setSubmittedRating(rating);
        setIsSubmitted(true);

        // Limpiar el formulario
        setRating(0);
        setHover(0);
        setComment("");
        setName("");
        setContactNumber("");
        setEmail("");
        setSelectedClinic("");

        // Si la calificación es de 3 o más estrellas se muestra un SweetAlert con el botón de reseña en Google,
        // de lo contrario se muestra un Toast de éxito
        if (rating >= 3) {
          Swal.fire({
            icon: "success",
            title: rating === 5 ? "Muchas gracias por tus 5 estrellas" : "Gracias por tu comentario",
            html: `
              <p>Si lo deseas, deja tu reseña en Google:</p><br>
              <a 
                href="https://g.page/r/CR85TS3Ji47WEAE/review" 
                target="_blank" 
                rel="noopener noreferrer"
                style="
                  display: inline-flex;
                  align-items: center;
                  gap: 0.5rem;
                  background-color: #3b82f6;
                  border: none;
                  border-radius: 4px;
                  padding: 0.5rem 1rem;
                  text-decoration: none;
                  color: #fff;
                  font-weight: bold;
                "
              >
                <span style="display: inline-flex; align-items: center;">
                  <svg width="24" height="24" viewBox="0 0 24 24"><!-- Aquí puedes insertar el SVG o mantener el componente React si lo prefieres --></svg>
                  Dejar reseña
                </span>
              </a>
            `,
            showConfirmButton: false
          });
        
        
        } else {
          Toast.fire({
            icon: "success",
            title: "Comentario enviado exitosamente",
          });
        }
      } catch (error) {
        console.error("Error al agregar el documento: ", error);
        setSubmitError(
          "Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde."
        );
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Hubo un error al enviar tu comentario. Por favor, inténtalo de nuevo más tarde.",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Resetear el estado isSubmitted a false después de 3 segundos
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        setSubmittedRating(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        minHeight: "100vh",
        backgroundColor: "#f7fafc",
        padding: "2rem",
      }}
    >
      {/* ========= BANNER ========= */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "400px",
          marginBottom: "2rem",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('https://picsum.photos/1920/600?random=10')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 10,
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
            width: "100%",
            height: "100%",
            zIndex: 20,
          }}
        >
          {/* Logo */}
          <div style={{ marginBottom: "2rem" }}>
            <Image
              src="https://www.clinicadelacosta.com/assets/images/logo.png"
              alt="Clínica de la Costa Logo"
              width={150}
              height={150}
              style={{
             
                objectFit: "cover",
              }}
              priority
            />
          </div>
          {/* Texto del banner */}
          <div>
            <h1
              style={{
                fontSize: "2.25rem",
                marginBottom: "1rem",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              ¡Cuidamos de tu salud con dedicación y profesionalismo!
            </h1>
            <p style={{ fontSize: "1.25rem", color: "#fff" }}>
              En la Clínica de la Costa SAS, estamos comprometidos con ofrecerte
              atención médica de calidad, con tecnología avanzada y un equipo
              humano especializado.
            </p>
          </div>
          {/* Botón */}
          <div style={{ marginTop: "2rem" }}>
            <a
              href="https://www.clinicadelacosta.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "0.75rem 1.5rem",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "9999px",
                backgroundColor: "#3b82f6",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                fontSize: "1rem",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Ir a la Clínica de la Costa
            </a>
          </div>
        </div>
      </div>

      {/* ========= FORMULARIO DE CALIFICACIÓN ========= */}
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "2rem",
        }}
      >
        {/* Mensaje de éxito */}
        {isSubmitted && (
          <div
            style={{
              backgroundColor: "#f0fff4",
              border: "1px solid #c6f6d5",
              color: "#22c55e",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
            role="alert"
          >
            <strong style={{ fontWeight: "bold" }}>
              Gracias por tu comentario
            </strong>
            <p>Tu opinión es muy valiosa para nosotros.</p>
            {submittedRating >= 3 && (
              <div style={{ marginTop: "1rem" }}>
                <a
                  href="https://g.page/r/CR85TS3Ji47WEAE/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    backgroundColor: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    padding: "0.5rem 1rem",
                    textDecoration: "none",
                    color: "#555",
                    fontWeight: "bold",
                  }}
                >
                  <FcGoogle size={24} /> Dejar reseña
                </a>
              </div>
            )}
          </div>
        )}

        {submitError && (
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#dc2626",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
            role="alert"
          >
            <strong style={{ fontWeight: "bold" }}>
              ¡Ups! Ocurrió un error.
            </strong>
            <p>{submitError}</p>
          </div>
        )}

        {/* Título del formulario */}
        <h2
          style={{
            fontSize: "1.875rem",
            fontWeight: "600",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          ¡Danos tu opinión!
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Calificación de estrellas */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "1.5rem",
            }}
          >
            <p
              style={{
                marginBottom: "0.5rem",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              ¿Cómo calificarías tu experiencia?
            </p>
            <div style={{ display: "flex" }}>
              {[1, 2, 3, 4, 5].map((star) => {
                const fillColor =
                  star <= (hover || rating) ? "#ffc107" : "#e4e5e9";
                return (
                  <FaStar
                    key={star}
                    size={32}
                    color={fillColor}
                    style={{
                      marginRight: "0.5rem",
                      cursor: "pointer",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(rating)}
                    onClick={() => setRating(star)}
                  />
                );
              })}
            </div>
          </div>

          {/* Nombre */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <FaUser style={{ color: "#9ca3af", marginRight: "0.5rem" }} size={20} />
            <input
              type="text"
              id="name"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                outline: "none",
              }}
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Número de contacto */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <FaPhone style={{ color: "#9ca3af", marginRight: "0.5rem" }} size={20} />
            <input
              type="tel"
              id="contactNumber"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                outline: "none",
              }}
              placeholder="Número de contacto"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>

          {/* Selección de Clínica */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <FaBuilding style={{ color: "#9ca3af", marginRight: "0.5rem" }} size={20} />
            <div style={{ flex: 1, position: "relative" }}>
              <label htmlFor="clinicSelect" style={{ display: "none" }}>
                Sede Clínica:
              </label>
              <select
                id="clinicSelect"
                value={selectedClinic}
                onChange={(e) => setSelectedClinic(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  outline: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  paddingRight: "2.5rem",
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' width=\'24\' height=\'24\' fill=\'%239ca3af\'%3E%3Cpath d=\'M7 10l5 5 5-5z\'/%3E%3C/svg%3E")',
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.5em 1.5em",
                }}
                required
              >
                <option value="">Seleccionar Clínica</option>
                {clinics.map((clinic) => (
                  <option key={clinic} value={clinic}>
                    {clinic}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Correo electrónico */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <FaEnvelope style={{ color: "#9ca3af", marginRight: "0.5rem" }} size={20} />
            <input
              type="email"
              id="email"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                outline: "none",
              }}
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Textarea para comentarios */}
          <div>
            <label
              htmlFor="comment"
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              Escribe tu comentario
            </label>
            <textarea
              id="comment"
              rows={5}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                marginBottom: "1rem",
                outline: "none",
                resize: "vertical",
              }}
              placeholder="Cuéntanos más sobre tu experiencia..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Botón de enviar */}
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: isLoading ? "#9ca3af" : "#3b82f6",
                color: "#fff",
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                fontWeight: "600",
                transition: "background-color 0.2s",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? (
                <span>
                  <FaSpinner className="animate-spin mr-2" /> Enviando...
                </span>
              ) : (
                "Enviar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
