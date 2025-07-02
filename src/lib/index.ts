export const bombs: number = 40;

export type cell = {
  isBomb: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  distance: number;
};

export function createBoard(row: number, col: number): cell[][] {
  const grid: cell[][] = [];

  for (let i = 0; i < row; i++) {
    grid[i] = [];
    for (let j = 0; j < col; j++) {
      grid[i][j] = {
        isBomb: false,
        isRevealed: false,
        isFlagged: false,
        distance: 0,
      };
    }
  }

  // Posiciona bombas
  let placed : number = 0;
  while (placed <= bombs) {
    const i = Math.floor(Math.random() * row);
    const j = Math.floor(Math.random() * col);
    if (!grid[i][j].isBomb) {
      grid[i][j].isBomb = true;
      placed++;
    }
  }

  // Calcula distâncias
  for (let i : number = 0; i < row; i++) {
    for (let j : number = 0; j < col; j++) {
      if (grid[i][j].isBomb) continue;

      let total : number = 0;
      for (let x : number = -1; x <= 1; x++) {
        for (let y : number = -1; y <= 1; y++) {
          const ni = i + x;
          const nj = j + y;
          if (ni >= 0 && ni < row && nj >= 0 && nj < col) {
            if (grid[ni][nj].isBomb) total++;
          }
        }
      }

      grid[i][j].distance = total;
    }
  }

  return grid;
}
