import type { FC } from "react";
import type { GameoverscreenProps } from "../types";
import { gameOverStrings } from "../utils/constants";
import styles from "../styles/Gameoverscreen.module.css";

export const Gameoverscreen: FC<GameoverscreenProps> = ({ gamestate }) => {
  if (!gamestate) return <h1>Something unexpected happened</h1>;

  const handleGameRestart = () => {
    window.location.reload();
  };

  return (
    <>
      <div className={styles.mask}></div>
      <div className={styles.wrapper}>
        <div className={styles.modal}>
          <h2>{gameOverStrings[gamestate]}</h2>
          <button onClick={handleGameRestart} className={styles.button}>
            Restart
          </button>
        </div>
      </div>
    </>
  );
};
