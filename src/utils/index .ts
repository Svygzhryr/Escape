import type { Coordinates } from "../types";

export const setupEnemyStartingPosition = (gridSize: Coordinates) => {
  const { x, y } = gridSize;

  const startingX = Math.floor(x / 2);
  const startingY = Math.floor(y / 2);

  return { x: startingX, y: startingY };
};

// strictly type grid
export const setupInitialGrid = (gridSize: Coordinates): number[][] => {
  const { x, y } = gridSize;
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

const checkNeighborCells = (x: number, y: number, grid: number[][]) => {
  const directions = [
    [0, -1],
    [-1, 0],
    [1, 0],
    [0, 1],
  ];

  const availableDirections = [];

  for (const [xi, yi] of directions) {
    // any exit cell nearby
    const nx = x + xi;
    const ny = y + yi;

    if (grid[ny][nx] === 3) {
      alert("you lose!");
      return [nx, ny];
    }
    if (grid[ny][nx] === 0) availableDirections.push([nx, ny]);
  }

  console.log(availableDirections);

  // nowhere to go
  if (!availableDirections.length) {
    alert("you won!");
    return [x, y];
  }

  const randomDirectionIndex = Math.floor(
    Math.random() * availableDirections.length - 1
  );

  const chosenDirection = availableDirections[randomDirectionIndex];

  const [xi, yi] = chosenDirection;

  return [xi, yi];
};

// enemy ai implementation
export const processEnemyTurn = (
  grid: number[][],
  position: Coordinates,
  setEnemyPosition: React.Dispatch<React.SetStateAction<Coordinates>>
) => {
  const { x, y } = position;

  const [new_x, new_y] = checkNeighborCells(x, y, grid);

  setEnemyPosition({ x: new_x, y: new_y });

  return { new_x, new_y };
};
