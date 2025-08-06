<script lang="ts">
  import { createEmptyBoard, placeBombsAndCalculateDistances, type Cell } from '$lib/index';
  import { currentDifficultySettings } from '$lib/difficultySettings';
  import { onMount, onDestroy } from 'svelte';

  $: ({ rows, cols, bombs } = $currentDifficultySettings);

  let grid: Cell[][] = []; 
  let gameOver: boolean = false;
  let youWon: boolean = false;
  let bombsPlaced: boolean = false;

  let time: number = 0;
  let timerInterval: number | null = null;

  onMount(() => {
    reset();
  });

  //timer
  function startTimer(): void {
    if (timerInterval === null) {
      timerInterval = window.setInterval(() => {
        time++;
      }, 1000);
    }
  }

  function stopTimer(): void {
    if (timerInterval !== null) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  // Encerra o timer
  onDestroy(() => {
    stopTimer();
  });

  function reveal(i: number, j: number): void {
    if (gameOver || grid[i][j].isRevealed || grid[i][j].isFlagged) return;

    if (!bombsPlaced) {
      placeBombsAndCalculateDistances(grid, rows, cols, bombs, i, j);
      bombsPlaced = true;
      startTimer();
    }

    grid[i][j].isRevealed = true;
    grid = grid;

    if (grid[i][j].isBomb) {
      gameOver = true;
      alert('💥 você perdeu!');
      revealAll();
      stopTimer();
      return;
    }

    if (grid[i][j].distance === 0) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const ni: number = i + x;
          const nj: number = j + y;
          if (ni >= 0 && ni < rows && nj >= 0 && nj < cols) {
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
    grid = grid; 
  }

  function checkVictory(): void {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!grid[i][j].isRevealed && !grid[i][j].isBomb) {
          return;
        }
      }
    }
    youWon = true;
    alert('🎉 você venceu!');
    stopTimer();
  }

  function revealAll(): void {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].isRevealed = true;
      }
    }
  }

  function reset(): void {
    stopTimer();
    time = 0;
    grid = createEmptyBoard(rows, cols);
    gameOver = false;
    youWon = false;
    bombsPlaced = false;
  }
</script>

<div class="nav">
  <a href="/">
    <button class="btnhome1">Home</button>
  </a>
  <img class="logoGame1" src="/logo.png" alt="Logo do jogo" />
</div>

<h1>{gameOver ? "💥 Game Over" : youWon ? "🎉 youWon!" : "Minesweeper"}</h1>
<button class="reiniciar" on:click={reset}>Reset</button>
<div class="timer">⏱️ Tempo: {time}</div>

<div class="game" style="--grid-rows: {rows}; --grid-cols: {cols};">
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
