export interface Coordinates {
  x: number;
  y: number;
}

export interface Gamestate {
  over: boolean;
}

export interface GamegridProps {
  gamestate: Gamestate;
  setGamestate: React.Dispatch<React.SetStateAction<Gamestate>>;
}
