import type { Coordinates, Gamestate } from "../types";

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

// enemy ai implementation
const checkNeighborCells = (x: number, y: number, grid: number[][]) => {
  const result: Gamestate = { over: false, chosenDirection: [0, 0] };

  const directions = [
    [0, -1],
    [-1, 0],
    [1, 0],
    [0, 1],
  ];

  const availableDirections = [];

  for (const [xi, yi] of directions) {
    const nx = x + xi;
    const ny = y + yi;

    // any exit cell nearby
    if (grid[ny][nx] === 3) {
      result["over"] = true;
      result["state"] = "lose";
      result.chosenDirection = [nx, ny];
      return result;
    }
    if (grid[ny][nx] === 0) availableDirections.push([nx, ny]);
  }

  // nowhere to go
  if (!availableDirections.length) {
    result["over"] = true;
    result["state"] = "win";
    result.chosenDirection = [x, y];
    return result;
  }

  const randomDirectionIndex = Math.floor(
    Math.random() * availableDirections.length
  );

  const chosenDirection = availableDirections[randomDirectionIndex];

  result.chosenDirection = chosenDirection;

  return result;
};

export const processEnemyTurn = (
  grid: number[][],
  position: Coordinates,
  setEnemyPosition: React.Dispatch<React.SetStateAction<Coordinates>>
) => {
  const { x, y } = position;

  // return info about game over here
  const neighborCheckOutcome = checkNeighborCells(x, y, grid);

  const { over, state, chosenDirection } = neighborCheckOutcome;
  const [new_x, new_y] = chosenDirection;

  setEnemyPosition({ x: new_x, y: new_y });

  const gridAfterEnemyTurn = structuredClone(grid);

  gridAfterEnemyTurn[y][x] = 0;
  gridAfterEnemyTurn[new_y][new_x] = 1;

  return { over, state, gridAfterEnemyTurn };
};
