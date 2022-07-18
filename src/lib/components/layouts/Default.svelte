<script context="module">
  export const hydrate = false
</script>

<script>
  export let title
  export let description
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
</svelte:head>

<article>
  <slot />
</article>

<style lang="scss">
  @import "../../styles/theme";

  article {
    max-width: 16.5cm; /* $content-width; */
  }

  article :global(img) {
    max-width: 100%;
  }
</style>
