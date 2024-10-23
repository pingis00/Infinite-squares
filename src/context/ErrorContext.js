import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const errorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  if (error) {
    toast.error(error, {
      position: toast.POSITION.TOP_Right,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  return (
    <ErrorContext.Provider value={{ setError }}>
      {children}
    </ErrorContext.Provider>
  );
};
