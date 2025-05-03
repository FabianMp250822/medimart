import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Asegúrate de que la ruta sea correcta

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const querySnapshot = await getDocs(collection(db, "medicos"));
      const membersData = querySnapshot.docs
        .map((doc) => ({
          id: doc.id,
          name: doc.data().nombreCompleto,
          role: doc.data().especialidad,
          image: doc.data().profileImage,
        }))
        .filter((member) =>
          ["Jose David Villanueva Martínez", "Franco Javier Vallejo García", "Omar De Jesús Cabarcas Barbosa", "Lina María Acosta Eusse"].includes(
            member.name
          )
        );
      setTeamMembers(membersData);
    };

    fetchTeamMembers();
  }, []);

  return (
    <section className="team-section sec-pad centred bg-color-1">
      <div className="shape">
        <div className="shape-1 float-bob-y" style={{ backgroundImage: "url(assets/images/shape/shape-15.png)" }}></div>
        <div className="shape-2"></div>
        <div className="shape-3 float-bob-x" style={{ backgroundImage: "url(assets/images/shape/shape-16.png)" }}></div>
      </div>
      <div className="auto-container">
        <div className="sec-title mb_50">
          <span className="sub-title">Nuestro Equipo</span>
          <h2>Conoce a nuestros especialistas para el mejor tratamiento</h2>
        </div>
        <div className="row clearfix">
          {teamMembers.map((member) => (
            <div key={member.id} className="col-lg-3 col-md-6 col-sm-12 team-block">
              <div className="team-block-one wow fadeInUp animated" data-wow-delay="200ms" data-wow-duration="1500ms">
                <div className="inner-box">
                  <div className="image-box">
                    <figure className="image">
                      <img
                        src={member.image}
                        alt={`Foto de ${member.name}`}
                        style={{
                          width: "100%",
                          height: "300px",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </figure>
                  </div>
                  <div className="lower-content">
                    <h3>
                      <Link href="/team-details">{member.name}</Link>
                    </h3>
                    <span className="designation">{member.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="view-more-btn" style={{ textAlign: "center", marginTop: "20px" }}>
          <Link href="/team" legacyBehavior>
            <button className="btn" style={{ padding: "10px 20px", backgroundColor: "#0c1841", color: "#FFFFFF", borderRadius: "5px" }}>
              Ver más
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
