"use client";

import { useEffect, useState } from "react";
import { getToken } from "firebase/app-check";
import { appCheck } from "@/lib/firebase";

const RecaptchaWidget = () => {
  const [recaptchaExecuted, setRecaptchaExecuted] = useState(false);
  const [appCheckToken, setAppCheckToken] = useState(null);

  useEffect(() => {
    const loadRecaptchaScript = () => {
      if (
        typeof window !== "undefined" &&
        !document.getElementById("recaptcha-script")
      ) {
        const script = document.createElement("script");
        script.id = "recaptcha-script";
        script.src = `https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY}`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    };

    loadRecaptchaScript();

    // Obtener el token de App Check una vez que el script esté cargado
    const getAppCheckToken = async () => {
        try {
          const appCheckTokenResponse = await getToken(appCheck);
          setAppCheckToken(appCheckTokenResponse.token);
          console.log("App Check Token:", appCheckTokenResponse.token);
        } catch (error) {
          console.error("Error al obtener el token de App Check:", error);
        }
      };
    
      getAppCheckToken();
    }, []);

  useEffect(() => {
    const handleRecaptcha = async () => {
      if (
        typeof window !== "undefined" &&
        window.grecaptcha &&
        appCheckToken &&
        !recaptchaExecuted
      ) {
        try {
          window.grecaptcha.enterprise.ready(async () => {
            const token = await window.grecaptcha.enterprise.execute(
              process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY,
              { action: "homepage" }
            );
            console.log("reCAPTCHA token:", token);
            setRecaptchaExecuted(true);
          });
        } catch (error) {
          console.error("Error en reCAPTCHA:", error);
        }
      } else if (recaptchaExecuted) {
        console.log("reCAPTCHA ya se ha ejecutado.");
      }
    };

    if (appCheckToken) {
      handleRecaptcha();
    }
  }, [appCheckToken, recaptchaExecuted]);

  return null; // No renderizar nada, reCAPTCHA maneja el badge
};

export default RecaptchaWidget;