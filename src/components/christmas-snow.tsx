'use client';

import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  x: number;
  size: number;
  opacity: number;
  animationDuration: number;
  delay: number;
}

export function ChristmasSnow() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Verificar si estamos en temporada navideña (1 dic - 6 enero)
    const today = new Date();
    const month = today.getMonth();
    const day = today.getDate();
    
    const isChristmasSeason = 
      (month === 11) || // Diciembre
      (month === 0 && day <= 6); // Enero 1-6 (Reyes)
    
    if (!isChristmasSeason) {
      setIsVisible(false);
      return;
    }

    // Generar copos de nieve
    const flakes: Snowflake[] = [];
    const numberOfFlakes = 50;

    for (let i = 0; i < numberOfFlakes; i++) {
      flakes.push({
        id: i,
        x: Math.random() * 100, // posición horizontal en %
        size: Math.random() * 4 + 2, // tamaño entre 2-6px
        opacity: Math.random() * 0.6 + 0.4, // opacidad entre 0.4-1
        animationDuration: Math.random() * 10 + 10, // duración entre 10-20s
        delay: Math.random() * 10, // delay entre 0-10s
      });
    }

    setSnowflakes(flakes);
  }, []);

  if (!isVisible || snowflakes.length === 0) return null;

  return (
    <>
      {/* Contenedor de nieve */}
      <div 
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
        aria-hidden="true"
      >
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute animate-snowfall"
            style={{
              left: `${flake.x}%`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              opacity: flake.opacity,
              animationDuration: `${flake.animationDuration}s`,
              animationDelay: `${flake.delay}s`,
              background: 'radial-gradient(circle, white 0%, rgba(255,255,255,0.8) 50%, transparent 100%)',
              borderRadius: '50%',
              boxShadow: '0 0 4px rgba(255,255,255,0.8)',
              filter: 'blur(0.5px)',
            }}
          />
        ))}
      </div>

      {/* Decoración navideña sutil en la esquina */}
      <div className="fixed top-20 right-4 z-40 pointer-events-none opacity-80">
        <span className="text-4xl drop-shadow-lg">❄️</span>
      </div>

      {/* Estilos CSS para la animación */}
      <style jsx global>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10px) rotate(0deg) translateX(0px);
          }
          25% {
            transform: translateY(25vh) rotate(90deg) translateX(10px);
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(-10px);
          }
          75% {
            transform: translateY(75vh) rotate(270deg) translateX(10px);
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(0px);
          }
        }

        .animate-snowfall {
          animation-name: snowfall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        /* Banner navideño sutil */
        .christmas-banner {
          background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 50%, #1a472a 100%);
          border-bottom: 3px solid #c41e3a;
        }
      `}</style>
    </>
  );
}

// Componente opcional: Banner navideño
export function ChristmasBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth();
    const day = today.getDate();
    
    const isChristmasSeason = 
      (month === 11) || 
      (month === 0 && day <= 6);
    
    setShow(isChristmasSeason);
  }, []);

  if (!show || !isVisible) return null;

  return (
    <div className="christmas-banner text-white py-2 px-4 text-center relative">
      <div className="container mx-auto flex items-center justify-center gap-2">
        <span className="text-xl">🎄</span>
        <p className="text-sm font-medium">
          ¡La Clínica de la Costa les desea una Feliz Navidad y un Próspero Año Nuevo! 
        </p>
        <span className="text-xl">🎅</span>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white pointer-events-auto"
        aria-label="Cerrar banner"
      >
        ✕
      </button>
    </div>
  );
}
