export interface Coordinates {
  x: number;
  y: number;
}

export interface Gamestate {
  over: boolean;
  state?: "win" | "lose";
}

export interface GameoverscreenProps {
  gamestate: Gamestate;
}

export interface GamegridProps {
  gamestate: Gamestate;
  setGamestate: React.Dispatch<React.SetStateAction<Gamestate>>;
}
