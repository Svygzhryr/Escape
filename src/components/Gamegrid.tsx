import type { FC } from "react";

import type { GamegridProps } from "../types";
import mouse from "../assets/rat.svg";
import styles from "../styles/Gamegrid.module.css";
import { gridSize } from "../utils/constants";
import { useSetupGrid } from "../utils/hooks";
import { processEnemyTurn } from "../utils/index ";

import { Gameoverscreen } from "./Gameoverscreen";

// think about how to handle gamestate
export const Gamegrid: FC<GamegridProps> = ({ gamestate, setGamestate }) => {
  const { grid, setGrid, enemyPosition, setEnemyPosition } =
    useSetupGrid(gridSize);
  const { over: isGameOver, state: overState } = gamestate;

  const handlePlayerTurn = (x: number, y: number): number[][] => {
    // Create the first update with the player's move
    const gridAfterPlayerMove = structuredClone(grid);
    gridAfterPlayerMove[y][x] = 2;

    return gridAfterPlayerMove;
  };

  const handleCellClick = (x: number, y: number): void => {
    if (grid[y][x] === 1 || grid[y][x] === 2) return;

    const gridAfterPlayerTurn = handlePlayerTurn(x, y);
    setGrid(gridAfterPlayerTurn);

    // Use the most recent state to calculate enemy move
    setGrid((currentGrid) => {
      const enemyTurnOutcome = processEnemyTurn(
        currentGrid,
        enemyPosition,
        setEnemyPosition
      );

      // if game is over handle this
      if ("over" in enemyTurnOutcome) {
        setGamestate(enemyTurnOutcome);
        return currentGrid;
      } else {
        return enemyTurnOutcome;
      }
    });
  };

  const defineCellState = (x: number, y: number) => {
    const cellMapper = [
      "",
      <img
        className={`${styles.mouse} ${
          overState === "lose" && styles.mouse_escaping
        }`}
        src={mouse}
      ></img>,
      <div className={styles.block}></div>,
      "",
    ];

    const cellValue = grid[y][x];

    return cellMapper[cellValue];
  };

  return (
    <>
      {isGameOver && <Gameoverscreen gamestate={gamestate} />}
      <div className={styles.grid}>
        {grid.map((row, y) => (
          <div className={styles.row} key={y}>
            {row.map((_, x) => (
              <div
                onClick={() => handleCellClick(x, y)}
                className={styles.cell}
                key={`${x}-${y}`}
              >
                {defineCellState(x, y)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
