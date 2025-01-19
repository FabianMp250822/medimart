// app/context/RecaptchaContext.js
import React, { createContext, useContext, useState } from 'react';

const RecaptchaContext = createContext();

export const useRecaptcha = () => useContext(RecaptchaContext);

export const RecaptchaProvider = ({ children }) => {
  const [recaptchaValue, setRecaptchaValue] = useState(null);

  const resetRecaptcha = () => {
    if (window.grecaptcha) {
      window.grecaptcha.reset();
    }
    setRecaptchaValue(null);
  };

  const updateRecaptchaValue = (token) => {
    setRecaptchaValue(token);
  };

  return (
    <RecaptchaContext.Provider value={{ recaptchaValue, resetRecaptcha, updateRecaptchaValue }}>
      {children}
    </RecaptchaContext.Provider>
  );
};