"use client";

import { useEffect, useState } from "react";
import { getToken } from "firebase/app-check";
import { appCheck } from "@/lib/firebase";

const RecaptchaWidget = () => {
  const [recaptchaExecuted, setRecaptchaExecuted] = useState(false);
  const [appCheckToken, setAppCheckToken] = useState(null);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY;

  useEffect(() => {
    console.log("reCAPTCHA siteKey:", siteKey);

    if (!siteKey) {
      console.error(
        "❌ ERROR: Falta la clave de reCAPTCHA. Asegúrate de tener NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY en tu .env"
      );
      return;
    }

    if (typeof window !== "undefined" && !document.getElementById("recaptcha-script")) {
      const script = document.createElement("script");
      script.id = "recaptcha-script";
      script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        console.log("✅ reCAPTCHA script cargado correctamente.");
      };

      script.onerror = (error) => {
        console.error("❌ ERROR al cargar el script de reCAPTCHA:", error);
      };

      document.body.appendChild(script);
    }
  }, [siteKey]);

  useEffect(() => {
    const getAppCheckToken = async () => {
      try {
        const appCheckTokenResponse = await getToken(appCheck);
        setAppCheckToken(appCheckTokenResponse.token);
        console.log("✅ App Check Token obtenido:", appCheckTokenResponse.token);
      } catch (error) {
        console.error("❌ ERROR al obtener el token de App Check:", error);
      }
    };

    getAppCheckToken();
  }, []);

  useEffect(() => {
    const handleRecaptcha = async () => {
      if (!window.grecaptcha || !window.grecaptcha.enterprise) {
        console.error("❌ ERROR: reCAPTCHA no está disponible aún. Reintentando...");
        setTimeout(handleRecaptcha, 500);
        return;
      }

      if (!appCheckToken) {
        console.log("⚠️ Esperando el token de App Check...");
        setTimeout(handleRecaptcha, 500);
        return;
      }

      if (recaptchaExecuted) {
        console.log("⚠️ reCAPTCHA ya ha sido ejecutado previamente.");
        return;
      }

      try {
        window.grecaptcha.enterprise.ready(() => {
          window.grecaptcha.enterprise
            .execute(siteKey, { action: "homepage" })
            .then((token) => {
              console.log("✅ reCAPTCHA token obtenido:", token);
              setRecaptchaExecuted(true);
            })
            .catch((error) => {
              console.error("❌ ERROR en reCAPTCHA execute():", error);
            });
        });
      } catch (error) {
        console.error("❌ ERROR en ejecución de reCAPTCHA:", error);
      }
    };

    if (appCheckToken) {
      handleRecaptcha();
    }
  }, [appCheckToken, recaptchaExecuted, siteKey]);

  return null; // No renderiza nada, solo ejecuta reCAPTCHA en el fondo
};

export default RecaptchaWidget;
