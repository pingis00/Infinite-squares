import React from "react";
import Home from "./views/Home";
import { ErrorProvider } from "./context/ErrorContext";

function App() {
  return (
    <React.StrictMode>
      <ErrorProvider>
        <div className="App">
          <Home />
        </div>
      </ErrorProvider>
    </React.StrictMode>
  );
}

export default App;
