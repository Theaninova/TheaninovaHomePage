<script lang="ts">
  import {ShaderCanvas} from "../lib/shaders/shaderCanvas"
  import {onMount} from "svelte"
  import {theaninovaColors, theaninovaInterpolateState, theaninovaStateOut} from "../lib/shaders/theaninovaShaderStates"
  import {loadCompileShaders} from "../lib/shaders/compileShader"
  import {expoOut} from "../lib/shaders/timeline"

  let textHovering = false
  let hoverTimestamp = 0
  let displayWebGL = false

  // TODO
  let isMobile = false

  let shaderCanvas: ShaderCanvas
  let canvasRef: HTMLCanvasElement

  function hover(isHovering: boolean) {
    textHovering = isHovering
    hoverTimestamp = performance.now()
  }

  onMount(async () => {
    if (isMobile) return

    shaderCanvas = new ShaderCanvas(canvasRef, {
      uniforms: {
        ...theaninovaStateOut,
        ...theaninovaColors,
      },
      frag: await loadCompileShaders("logos/theaninova_simple", ["sdf"]),
    })

    const begin = performance.now()
    const animate = () => {
      requestAnimationFrame(animate)
      theaninovaInterpolateState(performance.now(), begin, shaderCanvas)

      const stamp = expoOut(
        performance.now() - hoverTimestamp,
        500,
        textHovering ? 1 : 0.5,
        textHovering ? -0.5 : 0.5,
      )
      const uniforms = shaderCanvas.uniforms
      if (!uniforms) return
      uniforms["margin"].value = new Float32Array([stamp * uniforms["margin"].value[0]])

      shaderCanvas.updateUniforms()
      shaderCanvas.render()
    }
    animate()
  })
</script>

<svelte:window on:resize={() => shaderCanvas?.resize()} />

<svelte:head>
  <title>Theaninova</title>
  <meta name="description" content="Thea Schöbl's Home Page" />
</svelte:head>

<div class="container">
  <div
    class="titleContainer"
    on:mouseover={() => hover(true)}
    on:mouseout={() => hover(false)}
  >
    <h1>Theaninova</h1>
  </div>
  {#if isMobile}
    <video
      class="background mobileVideo"
      autoPlay
      loop
      muted
      playsInline
      src={'assets/background-fallback.webm'}
    />
  {:else}
    <canvas class="background" bind:this={canvasRef} />
  {/if}
</div>

<style lang="scss">
  .container {
    display: grid;
    height: 100%;
    width: 100%;
  }

  .titleContainer {
    grid-column: 1;
    grid-row: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @keyframes titleAnimation {
    0% {
      font-variation-settings: var(--homePageTitleFadeInFontVariation);
    }
    100% {
      font-variation-settings: var(--homePageTitleFontVariation);
    }
  }

  h1 {
    padding: 16px;
    z-index: 1;
    margin: 0;
    font-size: min(14vw, 200px);
    text-align: center;
    font-variation-settings: var(--homePageTitleFontVariation);
    transition: font-variation-settings 0.25s ease;

    user-select: none;

    animation: titleAnimation 1.5s ease;
    text-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  }

  @media (hover: hover) {
    h1:hover {
      font-variation-settings: var(--homePageTitleHoverFontVariation);
    }
  }

  @media (hover: none) {
    h1:active {
      font-variation-settings: var(--homePageTitleHoverFontVariation);
    }
    h1 {
      transition: font-variation-settings 0.1s ease;
    }
  }

  .background {
    grid-column: 1;
    grid-row: 1;
    width: 100%;
    height: 100%;
  }

  .mobileVideo {
    overflow: hidden;
    object-fit: contain;
    background-color: var(--dark-green);
  }
</style>
