import type { Coordinates } from "../types";

// empty, moving entity, blocked cell, exit cell
export const cellMapper = ["", "@", "X", ""];

export const gridSize = {
  x: 9,
  y: 9,
};

export const setupEnemyStartingPosition = (gridSize: Coordinates) => {
  const { x, y } = gridSize;

  const startingX = Math.floor(x / 2);
  const startingY = Math.floor(y / 2);
};

// strictly type grid
export const setupInitialGrid = (x: number, y: number): number[][] => {
  const initialGrid: number[][] = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0));

  // enemy starts at the middle of grid
  const startingX = Math.floor(x / 2);
  const startingY = Math.floor(y / 2);

  initialGrid[startingY][startingX] = 1;

  // marking edge cells as 'exit' cells
  initialGrid[0].fill(3);
  initialGrid[initialGrid.length - 1].fill(3);

  for (let i = 1; i < initialGrid.length - 1; i++) {
    initialGrid[i][0] = 3;
    initialGrid[i][initialGrid[i].length - 1] = 3;
  }

  return initialGrid;
};
