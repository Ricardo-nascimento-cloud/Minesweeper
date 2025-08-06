export type Cell = {
  isBomb: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  distance: number;
};

// Cria um tabuleiro vazio
export function createEmptyBoard(row: number, col: number): Cell[][] {
  const grid: Cell[][] = [];

  for (let i: number = 0; i < row; i++) {
    const rowCells: Cell[] = [];

    for (let j: number = 0; j < col; j++) {
      const newCell: Cell = {
        isBomb: false,
        isRevealed: false,
        isFlagged: false,
        distance: 0,
      };
      rowCells.push(newCell);
    }

    grid.push(rowCells);
  }

  return grid;
}

// Adiciona as bombas no tabuleiro, apos clicar na primeira célula
export function placeBombsAndCalculateDistances(
  grid: Cell[][],
  row: number,
  col: number,
  bombsCount: number,
  initialClickRow: number,
  initialClickCol: number
): void {
  const safePositions: Set<string> = new Set<string>();

  for (let i: number = -1; i <= 1; i++) {
    for (let j: number = -1; j <= 1; j++) {
      const safeRow: number = initialClickRow + i;
      const safeCol: number = initialClickCol + j;

      if (safeRow >= 0 && safeRow < row && safeCol >= 0 && safeCol < col) {
        safePositions.add(`${safeRow},${safeCol}`);
      }
    }
  }

  let placed: number = 0;
  let attempts: number = 0;
  const maxAttempts: number = row * col * 10;

  while (placed < bombsCount && attempts < maxAttempts) {
    const i: number = Math.floor(Math.random() * row);
    const j: number = Math.floor(Math.random() * col);
    const position: string = `${i},${j}`;
    attempts++;

    if (!grid[i][j].isBomb && !safePositions.has(position)) {
      grid[i][j].isBomb = true;
      placed++;
    }
  }

  // Se não conseguir colocar todas as bombas, emite um aviso
  if (placed < bombsCount) {
    console.warn(`Apenas ${placed} de ${bombsCount} bombas foram colocadas.`);
  }

  // Calcula a quantidade de bombas para cada célula
  for (let i: number = 0; i < row; i++) {
    for (let j: number = 0; j < col; j++) {
      if (grid[i][j].isBomb) continue;

      let total: number = 0;

      for (let x: number = -1; x <= 1; x++) {
        for (let y: number = -1; y <= 1; y++) {
          const ni: number = i + x;
          const nj: number = j + y;

          if (
            ni >= 0 &&
            ni < row &&
            nj >= 0 &&
            nj < col &&
            grid[ni][nj].isBomb
          ) {
            total++;
          }
        }
      }

      grid[i][j].distance = total;
    }
  }
}
