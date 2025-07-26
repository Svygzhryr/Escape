import { useState } from "react";

import { createPortal } from "react-dom";

import type { Gamestate } from "../types";
import styles from "../styles/Gamegrid.module.css";
import { gridSize } from "../utils/constants";
import { useSetupGrid } from "../utils/hooks";
import { processEnemyTurn } from "../utils/index ";

import { Gameoverscreen } from "./Gameoverscreen";
import { Mouse } from "./Mouse";

export const Gamegrid = () => {
  const { grid, setGrid, enemyPosition, setEnemyPosition } =
    useSetupGrid(gridSize);

  const [gamestate, setGamestate] = useState<
    Omit<Gamestate, "chosenDirection">
  >({
    over: false,
  });

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
      const { over, state, gridAfterEnemyTurn } = processEnemyTurn(
        currentGrid,
        enemyPosition,
        setEnemyPosition
      );

      // if game is over handle this
      if (over) {
        setGamestate({ over, state });
      }

      console.log(gridAfterEnemyTurn);

      return gridAfterEnemyTurn;
    });
  };

  const defineCellState = (x: number, y: number) => {
    const cellMapper = [
      "",
      <Mouse gamestate={gamestate.state} />,
      <div className={styles.block}></div>,
      "",
    ];

    const cellValue = grid[y][x];

    return cellMapper[cellValue];
  };

  return (
    <>
      {isGameOver &&
        createPortal(<Gameoverscreen gamestate={overState} />, document.body)}

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
