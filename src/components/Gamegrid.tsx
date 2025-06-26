import { useState } from "react";
import styles from "../styles/Gamegrid.module.css";
import { cellMapper, setupInitialGrid } from "../utils/constants";
import type { EnemyCoordinates } from "../types";

export const Gamegrid = () => {
  const [grid, setGrid] = useState<number[][]>(setupInitialGrid(gridSize));
  const [enemyPosition, setEnemyPosition] = useState<EnemyCoordinates>(
    setupEnemyStartingPosition(gridSize)
  );

  const handleCellClick = (x: number, y: number): void => {
    if (grid[y][x] === 1) return;

    const newGrid = structuredClone(grid);

    newGrid[y][x] = 2;

    setGrid(newGrid);
  };

  const defineCellState = (x: number, y: number): string => {
    const cellValue = grid[y][x];
    return cellMapper[cellValue];
  };

  return (
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
  );
};
