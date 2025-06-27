import { useState } from "react";

import type { Coordinates } from "../types";

import { setupInitialGrid, setupEnemyStartingPosition } from "./index ";

export const useSetupGrid = (gridSize: Coordinates) => {
  const [grid, setGrid] = useState<number[][]>(setupInitialGrid(gridSize));
  const [enemyPosition, setEnemyPosition] = useState<Coordinates>(
    setupEnemyStartingPosition(gridSize)
  );

  return { grid, setGrid, enemyPosition, setEnemyPosition };
};
