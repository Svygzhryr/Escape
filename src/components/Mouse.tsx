import type { FC } from "react";
import mouse from "../assets/rat.svg";
import styles from "../styles/Mouse.module.css";
import type { MouseProps } from "../types";

export const Mouse: FC<MouseProps> = ({ gamestate }) => {
  return (
    <img
      className={`${styles.mouse} ${
        gamestate === "lose" && styles.mouse_escaping
      }`}
      src={mouse}
    ></img>
  );
};
