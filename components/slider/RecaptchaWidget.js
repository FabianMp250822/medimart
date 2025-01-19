"use client";
import { useEffect } from 'react';
import { getAppCheck, getToken } from 'firebase/app-check';
import { appCheck } from '@/lib/firebase'; // Ajusta la ruta según sea necesario

const RecaptchaWidget = () => {
  useEffect(() => {
    const renderRecaptcha = async () => {
      if (typeof window !== 'undefined' && window.grecaptcha) {
        try {
          const appCheckTokenResponse = await getToken(appCheck);
          const token = appCheckTokenResponse.token;

          window.grecaptcha.enterprise.execute(process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY, { action: 'homepage' })
            .then((token) => {
              console.log("reCAPTCHA token:", token);
              // Aquí puedes enviar el token a tu backend si es necesario
            });

        } catch (error) {
          console.error("Error al obtener el token de App Check:", error);
        }
      }
    };

    if (!document.getElementById('recaptcha-script')) {
      const script = document.createElement('script');
      script.id = 'recaptcha-script';
      script.src = `https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    // Ejecuta la función cuando el script se haya cargado
    if (typeof window !== 'undefined' && window.grecaptcha) {
        renderRecaptcha();
    } else {
        window.onRecaptchaLoad = renderRecaptcha;
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete window.onRecaptchaLoad;
      }
      const script = document.getElementById('recaptcha-script');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div style={{
        position: 'fixed', // Posiciona el badge de forma fija
        bottom: '14px', // 14px desde la parte inferior
        right: '14px', // 14px desde la derecha
        boxShadow: '0px 0px 5px #888888', // Sombra para que se destaque
        zIndex: 1000 // Asegura que esté por encima de otros elementos
    }}>
    </div>
  );
};

export default RecaptchaWidget;