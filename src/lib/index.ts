export function criarTabuleiro(row: number, col: number) {
    let grid = [];
    for (let i = 0; i < row; i++) {
        grid[i] = new Array(col);
        for (let j = 0; j < col; j++) {
            grid[i][j] = {
                isBomb: false,
                isRevealed: false,
                distance: 0,
            };
        }
    }
    return grid;
}

export const bombs: number = 20;

