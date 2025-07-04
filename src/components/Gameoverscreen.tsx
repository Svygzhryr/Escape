import type { FC } from "react";
import type { GameoverscreenProps } from "../types";
import { gameOverStrings } from "../utils/constants";
import styles from "../styles/Gameoverscreen.module.css";

export const Gameoverscreen: FC<GameoverscreenProps> = ({ gamestate }) => {
  const { over: isActive } = gamestate;
  if (!gamestate.state) return <h1>Something unexpected happened</h1>;

  return (
    <>
      <div className={styles.mask}></div>
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <h2>{gameOverStrings[gamestate.state]}</h2>
        </div>
      </div>
    </>
  );
};
