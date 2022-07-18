<script context="module">
  export const load = ({url}) => ({
    props: {
      activeRoute: url.pathname,
    },
  })
</script>

<script>
  import PageTransition from "../lib/components/transitions/PageTransition.svelte"
  import Header from "../lib/components/Header.svelte"

  export let activeRoute
</script>

<Header />

<PageTransition {activeRoute}>
  <slot />
</PageTransition>

<style global lang="scss">
  @import "../lib/styles/theme.scss";

  //noinspection CssInvalidAtRule
  @layer base {
    html {
      -webkit-tap-highlight-color: transparent;
    }
  }

  main {
    overflow-y: auto;
    overflow-x: hidden;

    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
  }

  main > * {
    margin-inline: 8px;
  }

  html,
  body {
    overflow: hidden;
    height: 100%;
  }

  body {
    display: grid;
    grid-template-rows: 68px auto;

    font-family: 'Roboto Flex', Roboto, sans-serif;

    color: $on-background;
    background-color: $background;
  }
</style>
