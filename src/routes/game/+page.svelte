<script lang="ts">
  import { createBoard, type cell } from '$lib/index';

  let grid: cell[][] = createBoard(20, 20);
  let gameOver: boolean = false;
  let youWon: boolean = false;

  function reveal(i: number, j: number): void {
    if (gameOver || grid[i][j].isRevealed || grid[i][j].isFlagged) return;

    grid[i][j].isRevealed = true;

    if (grid[i][j].isBomb) {
      gameOver = true;
      alert("💥 you lose!");
      revealAll();
      return;
    }

    if (grid[i][j].distance === 0) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const ni = i + x;
          const nj = j + y;
          if (ni >= 0 && ni < 20 && nj >= 0 && nj < 20) {
            reveal(ni, nj);
          }
        }
      }
    }

    checkVictory();
  }

  function toggleFlag(i: number, j: number, event: MouseEvent): void {
    event.preventDefault();
    if (gameOver || grid[i][j].isRevealed) return;
    grid[i][j].isFlagged = !grid[i][j].isFlagged;
  }

  function checkVictory(): void {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (!grid[i][j].isRevealed && !grid[i][j].isBomb) {
          return;
        }
      }
    }
    youWon = true;
    alert("🎉 win!");
  }

  function revealAll(): void {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        grid[i][j].isRevealed = true;
      }
    }
  }

  function reset(): void {
    grid = createBoard(20, 20);
    gameOver = false;
    youWon = false;
  }
</script>

<div class="nav">
  <a href="/">
  <button class="btnhome1">Home</button>
  </a>
  <img class="logoGame1" src="/logo.png" alt="Logo do jogo" />
</div>
<h1>{gameOver ? "💥 Game Over" : youWon ? "🎉 win!" : "Minesweeper"}</h1>
<button class="reiniciar" on:click={reset}> Reset</button>

<div class="game">
  {#each grid as row, i}
    {#each row as box, j}
      <button
        class="cell"
        class:revealed={box.isRevealed}
        class:bomb={box.isBomb && box.isRevealed}
        class:flag={box.isFlagged && !box.isRevealed}
        disabled={box.isRevealed}
        class:chess={(i + j) % 2 === 0}
        on:click={() => reveal(i, j)}
        on:contextmenu={(e) => toggleFlag(i, j, e)} 
      >
        {#if box.isRevealed}
          {#if box.isBomb}
            💣
          {:else if box.distance > 0}
            {box.distance}
          {/if}
        {/if}
      </button>
    {/each}
  {/each}
</div>
