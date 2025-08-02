<script lang="ts">
  import '../../index.css';
  import '../../jogo.css';
  import { currentDifficultyLevel, DifficultyLevel } from '$lib/difficultySettings'; // Importa o store e o enum

  let showSettings: boolean = false;
  let selectedDifficulty: DifficultyLevel = $currentDifficultyLevel;
  $: {
    $currentDifficultyLevel = selectedDifficulty;
  }
</script>

<div class="container">
  <div class="menu">
    <img class="logo" src="/logo.png" alt="Minesweeper Logo" />
    <div class="buttons">
      <a href="/game">
        <button class="playButton">Play</button>
      </a>

      <a href="/about">
        <button class="aboutButton">About</button>
      </a>

      <button class="settingsButton" on:click={() => showSettings = true}>Settings</button>
    </div>
  </div>
</div>

{#if showSettings}
  <div class="settings-modal">
    <div class="settings-content">
      <button class="close-btn" on:click={() => showSettings = false}>✖</button>
      <h2>Settings</h2>
      <label>
        Volume:
        <input type="range" min="0" max="100" value="50">
      </label>
      <label>
        Dificuldade:
        <select class="difficulty-select" bind:value={selectedDifficulty}> <option value={DifficultyLevel.EASY}>Fácil</option>
          <option value={DifficultyLevel.NORMAL}>Normal</option>
          <option value={DifficultyLevel.HARD}>Difícil</option>
          </select>
      </label>
    </div>    
  </div>
{/if}