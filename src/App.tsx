import { useState } from "react";
import { Gamegrid } from "./components/Gamegrid";
import "./styles/App.css";
import type { Gamestate } from "./types";

function App() {
  const [gamestate, setGamestate] = useState<Gamestate>({
    over: false,
  });

  return (
    <>
      <Gamegrid gamestate={gamestate} setGamestate={setGamestate} />
    </>
  );
}

export default App;
