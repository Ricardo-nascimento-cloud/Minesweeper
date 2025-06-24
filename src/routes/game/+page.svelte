<script lang="ts">
  import { criarTabuleiro } from '$lib/index';
  let grid = criarTabuleiro(20, 20);
</script>

<div class="game">
    {#each grid as row, i}
       {#each row as box, j}
       <div class:bomb={box.isBomb} >
        {i} {j}
       </div>
        {/each}
    {/each}
</div>