import { createContext, useState, useEffect } from 'react';

export const SedeContext = createContext();

export const SedeProvider = ({ children }) => {
  const [sede, setSede] = useState(null);

  useEffect(() => {
    const sedeGuardada = localStorage.getItem('sede');
    if (sedeGuardada) {
      setSede(sedeGuardada);
    }
  }, []);

  useEffect(() => {
    if (sede) {
      localStorage.setItem('sede', sede);
    }
  }, [sede]);

  return (
    <SedeContext.Provider value={{ sede, setSede }}>
      {children}
    </SedeContext.Provider>
  );
};
