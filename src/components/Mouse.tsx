import { useEffect, useState, type FC } from "react";
import mouse from "../assets/rat.svg";
import styles from "../styles/Mouse.module.css";
import type { MouseProps } from "../types";

export const Mouse: FC<MouseProps> = ({ gamestate }) => {
  const [transparent, setTransparent] = useState(false);

  useEffect(() => {
    if (gamestate === "lose") {
      setTimeout(() => {
        setTransparent(true);
      }, 300);
    }
  }, [gamestate]);

  return (
    <img
      className={`${styles.mouse} ${transparent && styles.mouse_escaping}`}
      src={mouse}
    ></img>
  );
};
