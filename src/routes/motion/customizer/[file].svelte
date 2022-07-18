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
  import {looseToStrict, ShaderCanvas, toStrictUniforms} from "../../../lib/shaders/shaderCanvas"
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

  const updateVariation = async (name: string, value: number) => {
    project.variations[name] = value
    shaderCanvas = new ShaderCanvas(canvasRef, {
      uniforms: toStrictUniforms(project.uniforms),
      frag: await loadCompileShaders(project.fragmentShader, project.dependencies, project.variations),
    })
  }

  const updateUniform = (name: string, value: number) => {
    shaderCanvas.uniforms[name].value = looseToStrict(value).value
  }

  let element: HTMLInputElement | undefined

  const onMouseDown = (event: Event) => {
    element = event.target as HTMLInputElement
  }
  const onMouseUp = () => {
    element = undefined
  }
  const onMouseMove = (event: MouseEvent) => {
    if (!element) return
    const value = element.valueAsNumber + event.movementX / 100
    element.value = value.toFixed(4)
    updateUniform(element.name, value)
  }
</script>

<svelte:window on:resize={() => shaderCanvas?.resize()} />

<svelte:head>
  <title>{project.name}</title>
  <meta name="description" content={project.description} />
</svelte:head>

{#if project}
  <h1>{project.name}</h1>
{/if}

<div class="container" on:mousemove={onMouseMove} on:mouseup={onMouseUp}>
  <canvas class="background" bind:this={canvasRef} />
  <div class="inputs">
    {#each Object.entries(project.variations) as [name, value] (name)}
      <pre>{name}</pre>
      <input
        type="number"
        {name}
        {value}
        on:input={event => updateVariation(name, event.target.valueAsNumber)}
      />
    {/each}
    <hr />
    {#each Object.entries(project.uniforms) as [name, value] (name)}
      <pre>{name}</pre>
      <input
        type="number"
        on:mousedown={onMouseDown}
        {name}
        {value}
        on:input={event => updateUniform(name, event.target.valueAsNumber)}
      />
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    display: grid;
    height: 100%;
    width: 100%;

    grid-template-columns: 1fr auto;
  }

  hr {
    width: 100%;
  }

  .inputs {
    display: flex;
    flex-direction: column;
  }

  input {
    cursor: e-resize;
  }

  .background {
    grid-column: 1;
    grid-row: 1;
    width: 100%;
    height: 100%;
  }
</style>
