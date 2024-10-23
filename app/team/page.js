'use client';
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Asegúrate de que la configuración de Firebase esté correcta
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useSede } from "../context/SedeContext"; // Importa el contexto de sede

export default function Home() {
  const [researchers, setResearchers] = useState([]);
  const { sedeData } = useSede(); // Obtén los datos de la sede seleccionada desde el contexto

  // Obtener datos de Firebase según la sede seleccionada
  const fetchResearchers = async () => {
    try {
      if (!sedeData?.nombre) return; // Asegúrate de que la sede esté seleccionada

      // Consultar investigadores que pertenecen a la sede seleccionada
      const q = query(collection(db, "researchers"), where("sede", "==", sedeData.nombre));
      const querySnapshot = await getDocs(q);
      
      const researchersData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data().informacion_personal;
        if (data && data.nombre_completo !== "Luis Aurelio Castillo Parodi") {
          researchersData.push(data); // Filtrar a Luis Aurelio
        }
      });

      // Filtrar y ordenar los investigadores prioritarios
      const prioritizedResearchers = [
        "Gustavo Aroca Martínez",
        "Alberto Jose Cadena Bonfanti",
        "Andres Angelo Cadena Bonfanti",
        "Carmen Marcela Alcalá Castro",
      ];

      const prioritized = researchersData.filter((researcher) =>
        prioritizedResearchers.includes(researcher.nombre_completo)
      );

      prioritized.sort(
        (a, b) =>
          prioritizedResearchers.indexOf(a.nombre_completo) -
          prioritizedResearchers.indexOf(b.nombre_completo)
      );

      const others = researchersData.filter(
        (researcher) => !prioritizedResearchers.includes(researcher.nombre_completo)
      );

      setResearchers([...prioritized, ...others]);
    } catch (error) {
      console.error("Error al obtener investigadores:", error);
    }
  };

  // Ejecutar al montar el componente o cuando cambie la sede
  useEffect(() => {
    fetchResearchers();
  }, [sedeData]);

  return (
    <>
      <Layout 
        headerStyle={2} 
        footerStyle={1} 
        breadcrumbTitle={`Equipo Médico - ${sedeData?.nombre || "Sede"}`}> {/* Mostrar "Equipo Médico - Nombre de la Sede" */}
        <div>
          {/* Sección de equipo */}
          <section className="team-section sec-pad-2 centred">
            <div className="auto-container">
              <div className="row clearfix">
                {researchers.length > 0 ? (
                  researchers.map((researcher, index) => (
                    <div className="col-lg-3 col-md-6 col-sm-12 team-block" key={index}>
                      <div className="team-block-one wow fadeInUp animated" data-wow-delay={`${index * 200}ms`} data-wow-duration="1500ms" style={{ height: '400px', marginBottom: '20px' }}>
                        <div className="inner-box" style={{ height: '100%' }}>
                          <div className="image-box" style={{ height: '60%', overflow: 'hidden' }}>
                            <figure className="image" style={{ height: '100%', objectFit: 'cover' }}>
                              <img src={researcher.foto} alt={researcher.nombre_completo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </figure>
                            <ul className="social-links clearfix">
                              <li><Link href="/"><i className="icon-4"></i></Link></li>
                              <li><Link href="/"><i className="icon-5"></i></Link></li>
                              <li><Link href="/"><i className="icon-6"></i></Link></li>
                              <li><Link href="/"><i className="icon-7"></i></Link></li>
                            </ul>
                          </div>
                          <div className="lower-content" style={{ height: '40%' }}>
                            <h3><Link href="team-details">{researcher.nombre_completo}</Link></h3>
                            <span className="designation">{researcher.nacionalidad}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No se encontraron Colaboradores para la sede seleccionada.</p>
                )}
              </div>
            </div>
          </section>

          {/* Sección de suscripción */}
          <section className="subscribe-section">
            <div className="auto-container">
              <div className="inner-container">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-12 col-sm-12 text-column">
                    <div className="text-box">
                      <h2><span>Subscribe</span> for the exclusive updates!</h2>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 form-column">
                    <div className="form-inner">
                      <form method="post" action="contact">
                        <div className="form-group">
                          <input type="email" name="email" placeholder="Enter Your Email Address" required />
                          <button type="submit" className="theme-btn btn-one"><span>Subscribe Now</span></button>
                        </div>
                        <div className="form-group">
                          <div className="check-box">
                            <input className="check" type="checkbox" id="checkbox1" />
                            <label htmlFor="checkbox1">
                              I agree to the <Link href="/">Privacy Policy.</Link>
                            </label>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
