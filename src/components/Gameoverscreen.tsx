import type { FC } from "react";
import type { GameoverscreenProps } from "../types";

export const Gameoverscreen: FC<GameoverscreenProps> = ({ gamestate }) => {
  return (
    <div>
      Game over! You <h1>{gamestate.state}</h1>
    </div>
  );
};
