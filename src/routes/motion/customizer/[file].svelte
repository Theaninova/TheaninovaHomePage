<script context="module" lang="ts">
  export const load = async ({params}) => {
    const project = (await import(`./projects/${params.file}.motion.ts`)).default
    return {
      props: {
        project,
        file: params.file,
      },
    }
  }
</script>

<script lang="ts">
  import {ShaderCanvas, toStrictUniforms} from "../../../lib/shaders/shaderCanvas"
  import {onMount} from "svelte"
  import {loadCompileShaders} from "../../../lib/shaders/compileShader"
  import type {CustomizableMotionProject} from "../../../lib/motion-project/customizable-motion-project"

  export let project: CustomizableMotionProject

  let shaderCanvas: ShaderCanvas
  let canvasRef: HTMLCanvasElement

  onMount(async () => {
    shaderCanvas = new ShaderCanvas(canvasRef, {
      uniforms: toStrictUniforms(project.uniforms),
      frag: await loadCompileShaders(project.fragmentShader, project.dependencies, project.variations),
    })

    const begin = performance.now()
    const animate = () => {
      requestAnimationFrame(animate)

      if (!shaderCanvas.uniforms) return
      if (project.render) {
        project.render(shaderCanvas, performance.now() - begin)
      }

      shaderCanvas.updateUniforms()
      shaderCanvas.render()
    }
    animate()
  })
</script>

<svelte:window on:resize={() => shaderCanvas?.resize()} />

<svelte:head>
  <title>{project.name}</title>
  <meta name="description" content={project.description} />
</svelte:head>

{#if project}
  <h1>{project.name}</h1>
{/if}

<div class="container">
  <canvas class="background" bind:this={canvasRef} />
</div>

<style lang="scss">
  .container {
    display: grid;
    height: 100%;
    width: 100%;
  }

  .background {
    grid-column: 1;
    grid-row: 1;
    width: 100%;
    height: 100%;
  }
</style>
