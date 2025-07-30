<script lang="ts">
    let showSettings : boolean = false;
</script>

<div class="container">
    <div class="menu">
       <img class="logo" src="/logo.png" alt="Minesweeper Logo" >
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
    <!-- Coloque aqui o conteúdo do seu menu de configurações -->
    <label>
        Volume:
        <input type="range" min="0" max="100" value="50">
    </label>
    <label>
        Dificuldade:
        <select>
            <option value="easy">Fácil</option>
            <option value="medium">Médio</option>
            <option value="hard">Difícil</option>
        </select>
    </label>
     </div>
  </div>
{/if}