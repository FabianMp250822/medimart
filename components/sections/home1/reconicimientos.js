"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Recognitions() {
  const { t } = useTranslation();

  // Se extraen los arrays definidos en la traducción
  const textContent = t('recognitions.textContent', { returnObjects: true });
  const textContentRight = t('recognitions.textContentRight', { returnObjects: true });
  const bottomRecognitions = t('recognitions.bottomRecognitions', { returnObjects: true });

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
      <h2 style={titleStyle}>{t("reconocimientosTitle")}</h2>
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
