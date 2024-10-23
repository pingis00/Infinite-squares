import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState({ message: null, type: null });

  const memoizedSetError = useCallback((message, type = "generic") => {
    setError({ message, type });
  }, []);

  const clearError = useCallback(() => {
    setError({ message: null, type: null });
  }, []);

  useEffect(() => {
    if (error.message) {
      console.error(
        `[${error.type.toUpperCase()}] Error captured:`,
        error.message,
      );

      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClose: clearError,
      });
    }
  }, [error, clearError]);

  const contextValue = useMemo(
    () => ({
      setError: memoizedSetError,
      clearError,
    }),
    [memoizedSetError, clearError],
  );

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};

ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
