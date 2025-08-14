<script lang="ts">
  import { currentDifficultyLevel, DifficultyLevel } from '$lib/difficultySettings';
  import { audioPlayer, playMedia, setVolume, initMedia, pauseMedia } from '$lib/audio';
  import { onMount } from 'svelte';
  import '../styles/index.css';
  import "../styles/jogo.css";

  let showSettings: boolean = false;
  let selectedDifficulty: DifficultyLevel = $currentDifficultyLevel;
  let volume: number;

  $: volume = $audioPlayer.volume * 100;
  $: setVolume(volume / 100);
  
  $: {
    $currentDifficultyLevel = selectedDifficulty;
  }

  onMount(() => {
    initMedia('/background.mp3');
  });

  function toggleMusic() {
    if ($audioPlayer.isPlaying) {
      pauseMedia();
    } else {
      playMedia();
    }
  }
</script>

<div class="container" role="button" on:click={playMedia} on:keypress={playMedia} tabindex="0">
  <div class="menu">
    <img class="logo" src="/logo.png" alt="Minesweeper Logo" />
  <div class="buttons">
    <a href="/game" class="playButton">Play</a>
    <a href="/about" class="aboutButton">About</a>
    <button class="settingsButton" on:click|stopPropagation={() => showSettings = true}>Settings</button>
</div>
  </div>
</div>

{#if showSettings}
  <div class="settings-modal">
    <div class="settings-content">
      <button class="close-btn" on:click={() => showSettings = false}>✖</button>
      <h2>Settings</h2>
      <div class="setting-item">
        <label for="volume-range">Volume:</label>
        <input id="volume-range" type="range" min="0" max="100" bind:value={volume}>
      </div>
      <div class="setting-item">
        <label for="difficulty-select">Dificuldade:</label>
        <select id="difficulty-select" class="difficulty-select" bind:value={selectedDifficulty}>
          <option value={DifficultyLevel.EASY}>EASY</option>
          <option value={DifficultyLevel.NORMAL}>NORMAL</option>
          <option value={DifficultyLevel.HARD}>HARD</option>
        </select>
      </div>
    </div>    
  </div>
{/if}