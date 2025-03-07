"use client";

import React, { useState } from "react";
import ImedicRegisterForm from "./ImedicRegisterForm";
import ImedicLoginForm from "./ImedicLoginForm";

export default function AuthOptions() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth-container">
      <div className="tabs">
        <button
          className={activeTab === "login" ? "active" : ""}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={activeTab === "register" ? "active" : ""}
          onClick={() => setActiveTab("register")}
        >
          No está registrado
        </button>
      </div>
      <div className="forms-container">
        {activeTab === "login" && <ImedicLoginForm />}
        {activeTab === "register" && <ImedicRegisterForm />}
      </div>

      <style jsx>{`
        .auth-container {
          max-width: 1000px;
          margin: 40px auto;
          padding: 20px;
          background: #ffffff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border-radius: 15px;
        }
        .tabs {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 20px;
        }
        .tabs button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background-color: #f0f0f0;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
        .tabs button.active {
          background-color: #007bff;
          color: #fff;
        }
        .forms-container {
          display: flex;
          gap: 40px;
          justify-content: center;
          align-items: flex-start;
        }
        @media (max-width: 768px) {
          .forms-container {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}
