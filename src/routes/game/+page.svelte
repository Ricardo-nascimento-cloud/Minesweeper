<script lang="ts">
  import { criarTabuleiro, type Celula } from '$lib/index';

  let grid: Celula[][] = criarTabuleiro(20, 20);
  let gameOver: boolean = false;
  let vitoria: boolean = false;

  function revelar(i: number, j: number): void {
    if (gameOver || grid[i][j].isRevealed || grid[i][j].isFlagged) return;

    grid[i][j].isRevealed = true;

    if (grid[i][j].isBomb) {
      gameOver = true;
      alert("💥 Você perdeu!");
      revelarTodas();
      return;
    }

    if (grid[i][j].distance === 0) {
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const ni = i + x;
          const nj = j + y;
          if (ni >= 0 && ni < 20 && nj >= 0 && nj < 20) {
            revelar(ni, nj);
          }
        }
      }
    }

    checarVitoria();
  }

  function toggleFlag(i: number, j: number, event: MouseEvent): void {
    event.preventDefault();
    if (gameOver || grid[i][j].isRevealed) return;
    grid[i][j].isFlagged = !grid[i][j].isFlagged;
  }

  function checarVitoria(): void {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (!grid[i][j].isRevealed && !grid[i][j].isBomb) {
          return;
        }
      }
    }
    vitoria = true;
    alert("🎉 Você venceu!");
  }

  function revelarTodas(): void {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        grid[i][j].isRevealed = true;
      }
    }
  }

  function resetar(): void {
    grid = criarTabuleiro(20, 20);
    gameOver = false;
    vitoria = false;
  }
</script>
<div class="nav">
  <a href="/">
  <button class="btnhome1">Home</button>
  </a>
  <img class="logoGame1" src="/logo.png" alt="Logo do jogo" />
</div>
<h1>{gameOver ? "💥 Game Over" : vitoria ? "🎉 Vitória!" : "Campo Minado"}</h1>
<button class="reiniciar" on:click={resetar}>🔄 Reiniciar</button>

<div class="game">
  {#each grid as row, i}
    {#each row as box, j}
      <button
        class="cell"
        class:revelado={box.isRevealed}
        class:bomb={box.isBomb && box.isRevealed}
        class:flag={box.isFlagged && !box.isRevealed}
        disabled={box.isRevealed}
        on:click={() => revelar(i, j)}
        on:contextmenu={(e) => toggleFlag(i, j, e)}
        aria-label="Célula do jogo"
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
