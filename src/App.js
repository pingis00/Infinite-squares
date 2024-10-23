import Home from "./views/Home";
import { ErrorProvider } from "./context/ErrorContext";

function App() {
  return (
    <ErrorProvider>
      <div className="App">
        <Home />
      </div>
    </ErrorProvider>
  );
}

export default App;
