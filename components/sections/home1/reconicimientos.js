import React from 'react';

export default function Recognitions() {
  const textContent = [
    {
      title: "MSD",
      description:
        "Reconocimiento al CIC por excelente desempeño y gestión de calidad en la ejecución de estudios clínicos. Abril 2017.",
    },
    {
      title: "MSD",
      description:
        "Reconocimiento al CIC por contribución al desarrollo de la investigación clínica, durante la conmemoración de los 75 años.",
    },
    {
      title: "Noviembre 2022",
      description:
        "MSD - Inventing for Life - Otorga el presente reconocimiento a Clínica de La Costa por su contribución a la ciencia e innovación en la investigación clínica en Colombia.",
    },
  ];

  const textContentRight = [
    {
      title: "Mayo 2021",
      description:
        "MSD - Otorga el presente reconocimiento a Clínica de la Costa por su adaptabilidad y eficiencia en los procesos administrativos y regulatorios llevados a cabo durante la pandemia. Bogotá, Colombia.",
    },
    {
      title: "9 de Mayo de 2024",
      description:
        "MSD - Excelentes métricas de calidad durante el año 2023 y el primer trimestre del año 2024. Orgullosamente presentado a Clínica de la Costa. Este certificado se presenta por logro honorable.",
    },
    {
      title: "Mayo 2021",
      description:
        "MSD - Otorga el presente reconocimiento a Clínica de la Costa por los esfuerzos extraordinarios realizados para garantizar la seguridad y continuidad en el estudio de todos los pacientes durante la pandemia. Bogotá, Colombia.",
    },
  ];

  const bottomRecognitions = [
    { 
      title: "Excelente desempeño y gestión de calidad en la ejecución de estudios clínicos", 
      image: "https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-12-04%20at%2010.48.16%20AM(1).jpeg?alt=media&token=dca190ac-8059-43e6-b6e3-2b6497ce85c7" 
    },
    { 
      title: "Contribución al desarrollo de la investigación clínica", 
      image: "https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-12-04%20at%2010.48.16%20AM(1).jpeg?alt=media&token=dca190ac-8059-43e6-b6e3-2b6497ce85c7" 
    },
    { 
      title: "Excelentes métricas de calidad durante el año 2023 y el primer trimestre del año 2024", 
      image: "https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-12-04%20at%2010.48.16%20AM(1).jpeg?alt=media&token=dca190ac-8059-43e6-b6e3-2b6497ce85c7" 
    },
    { 
      title: "Contribución a la ciencia e innovación en la investigación clínica en Colombia", 
      image: "https://firebasestorage.googleapis.com/v0/b/clinica-de-la-costa.appspot.com/o/web%20imagen%2FWhatsApp%20Image%202024-12-04%20at%2010.48.16%20AM(1).jpeg?alt=media&token=dca190ac-8059-43e6-b6e3-2b6497ce85c7" 
    },
  ];

  const sectionStyle = {
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  };

  const titleStyle = {
    textAlign: "center",
    color: "#007bff",
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const rowStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: "30px",
  };

  const columnStyle = {
    flex: "0 0 48%",
    textAlign: "left",
    lineHeight: "1.6",
    marginBottom: "20px",
  };

  const listItemStyle = {
    marginBottom: "10px",
  };

  const listTitleStyle = {
    fontWeight: "bold",
    color: "#333",
  };

  const bottomRowStyle = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "20px",
    width: "100%",
  };

  const recognitionItemStyle = {
    textAlign: "center",
    width: "calc(25% - 20px)", // Ajusta el ancho para que ocupen todo el espacio disponible
    boxSizing: "border-box",
  };

  const recognitionImageStyle = {
    width: "100%", // Ajustar al ancho del contenedor
    height: "auto", // Mantener la proporción
    objectFit: "cover",
    borderRadius: "0",
    marginBottom: "10px",
  };

  const recognitionTitleStyle = {
    fontSize: "14px",
    color: "#333",
    fontWeight: "bold",
  };

  return (
    <div style={sectionStyle}>
      <h2 style={titleStyle}>Reconocimientos</h2>
      <div style={rowStyle}>
        <div style={columnStyle}>
          {textContent.map((item, index) => (
            <div key={index} style={listItemStyle}>
              <span style={listTitleStyle}>{item.title} – </span>
              {item.description}
            </div>
          ))}
        </div>
        <div style={columnStyle}>
          {textContentRight.map((item, index) => (
            <div key={index} style={listItemStyle}>
              <span style={listTitleStyle}>{item.title} – </span>
              {item.description}
            </div>
          ))}
        </div>
      </div>
      <div style={bottomRowStyle}>
        {bottomRecognitions.map((item, index) => (
          <div key={index} style={recognitionItemStyle}>
            <img
              src={item.image}
              alt={item.title}
              style={recognitionImageStyle}
            />
            <div style={recognitionTitleStyle}>{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
