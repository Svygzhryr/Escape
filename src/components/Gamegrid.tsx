import styles from "../styles/Gamegrid.module.css";
import { cellMapper, gridSize } from "../utils/constants";
import { useSetupGrid } from "../utils/hooks";
import { processEnemyTurn } from "../utils/index ";

export const Gamegrid = () => {
  const { grid, setGrid, enemyPosition, setEnemyPosition } =
    useSetupGrid(gridSize);

  const handleCellClick = (x: number, y: number): void => {
    if (grid[y][x] === 1 || grid[y][x] === 2) return;

    // Create the first update with the player's move
    const gridAfterPlayerMove = structuredClone(grid);
    gridAfterPlayerMove[y][x] = 2;

    setGrid(gridAfterPlayerMove);

    // Use the most recent state to calculate enemy move
    setGrid((currentGrid) => {
      const { x: old_x, y: old_y } = enemyPosition;
      const { new_x, new_y } = processEnemyTurn(
        currentGrid,
        enemyPosition,
        setEnemyPosition
      );

      const gridAfterEnemyMove = structuredClone(currentGrid);
      gridAfterEnemyMove[old_y][old_x] = 0;
      gridAfterEnemyMove[new_y][new_x] = 1;

      return gridAfterEnemyMove;
    });
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
