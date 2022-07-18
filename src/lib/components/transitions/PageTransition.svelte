<script lang="ts">
  import {fade} from "svelte/transition";

  export let activeRoute: string
</script>

{#key activeRoute}
  <main in:fade={{duration: 250, delay: 250}} out:fade={{duration: 250}}>
    <slot/>
  </main>
{/key}

<style>
  main {
    grid-row: 2;
    grid-column: 1;
    will-change: transform, opacity;
  }
</style>
