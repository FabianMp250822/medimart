// StepIndicator.jsx
"use client";

import React from "react";

export default function StepIndicator({ currentStep }) {
  const steps = [
    { label: "Especialidad", number: 1 },
    { label: "Doctor", number: 2 },
    { label: "Fecha/Hora", number: 3 },
    { label: "Confirmar", number: 4 },
  ];

  return (
    <div className="steps-container">
      {steps.map((s, idx) => {
        const isActive = s.number === currentStep;
        const isCompleted = s.number < currentStep;
        return (
          <div key={s.number} className={`step ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}>
            <div className="step-number">{s.number}</div>
            <div className="step-label">{s.label}</div>
          </div>
        );
      })}

      <style jsx>{`
        .steps-container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .step {
          flex: 1;
          text-align: center;
          position: relative;
        }
        .step-number {
          width: 40px;
          height: 40px;
          margin: 0 auto;
          border-radius: 50%;
          background-color: #ddd;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .step-label {
          font-size: 0.9rem;
          color: #333;
        }
        .active .step-number {
          background-color: #007bff;
        }
        .completed .step-number {
          background-color: #28a745;
        }
        .completed .step-label {
          color: #28a745;
        }
      `}</style>
    </div>
  );
}
