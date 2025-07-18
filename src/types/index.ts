export interface Coordinates {
  x: number;
  y: number;
}

export interface Gamestate {
  over: boolean;
  state?: "win" | "lose";
}

export interface GameoverscreenProps {
  gamestate?: "win" | "lose";
}

export interface MouseProps {
  gamestate?: "win" | "lose";
}

export interface GamegridProps {
  gamestate: Gamestate;
  setGamestate: React.Dispatch<React.SetStateAction<Gamestate>>;
}
