import { StrictMode } from "react";
import { Gamegrid } from "./components/Gamegrid";
import "./styles/App.css";

function App() {
  return (
    <>
      <StrictMode>
        <Gamegrid />
      </StrictMode>
    </>
  );
}

export default App;
