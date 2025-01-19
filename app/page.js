"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
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
import News from "@/components/sections/home1/News";
import Recognitions from "@/components/sections/home1/reconicimientos";
import InvestigationGroup from "@/components/sections/home1/InvestigationGroup";

// Importa SedeModal dinámicamente
const SedeModal = dynamic(() => import("@/components/modal/SedeModal"), {
  ssr: false,
});

// Carga dinámica de RecaptchaWidget (sin cambios)
const RecaptchaWidget = dynamic(
  () => import("@/components/slider/RecaptchaWidget"),
  {
    ssr: false,
  }
);

export default function Home() {
  const { selectedSede, selectSede, sedesData } = useSede();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedSede = localStorage.getItem("selectedSede");

    if (!storedSede || !sedesData[storedSede]) {
      setShowModal(true);
    } else {
      selectSede(storedSede);
    }
  }, [sedesData, selectSede]);

  const handleSedeSelect = (sede) => {
    if (sedesData[sede]) {
      selectSede(sede);
      localStorage.setItem("selectedSede", sede);
      setShowModal(false); // Cierra el modal después de la selección
    } else {
      console.error("Sede seleccionada no válida");
    }
  };

  return (
    <>
      <Layout headerStyle={1} footerStyle={1}>
        {/* Renderiza SedeModal condicionalmente */}
        {showModal && (
          <SedeModal sedesData={sedesData} handleSedeSelect={handleSedeSelect} />
        )}
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
            <Recognitions />
            <Team />
            <News />
            <RecaptchaWidget />
          </>
        )}
      </Layout>
    </>
  );
}