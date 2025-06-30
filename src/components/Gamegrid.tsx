import styles from "../styles/Gamegrid.module.css";
import { gridSize } from "../utils/constants";
import { useSetupGrid } from "../utils/hooks";
import { processEnemyTurn } from "../utils/index ";
import rat from "../assets/rat.svg";
import type { FC } from "react";
import type { GamegridProps } from "../types";
import { Gameroverscreen } from "./Gameroverscreen";

// think about how to handle gamestate
export const Gamegrid: FC<GamegridProps> = ({ gamestate, setGamestate }) => {
  const { grid, setGrid, enemyPosition, setEnemyPosition } =
    useSetupGrid(gridSize);
  const { over: isGameOver } = gamestate;

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
      const gridAfterEnemyTurn = processEnemyTurn(
        currentGrid,
        enemyPosition,
        setEnemyPosition
      );
      return gridAfterEnemyTurn ?? currentGrid;
    });
  };

  const defineCellState = (x: number, y: number) => {
    const cellMapper = [
      "",
      <img className={styles.rat} src={rat}></img>,
      <div className={styles.block}></div>,
      "",
    ];

    const cellValue = grid[y][x];

    return cellMapper[cellValue];
  };

  return (
    <>
      {isGameOver ? (
        <Gameroverscreen />
      ) : (
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
      )}
    </>
  );
};
