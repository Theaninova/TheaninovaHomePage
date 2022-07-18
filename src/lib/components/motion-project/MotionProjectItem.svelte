<script lang="ts">
  import type {MotionProject} from "../../motion-project/motionProject"
  import {officialBulbs, sourceFileStatusBulbs, toolBulbs} from "../../motion-project/motionProject"
  import TextComponent from "./MotionProjectText.svelte"
  import VideoComponent from "./MotionProjectVideo.svelte"

  export let project: MotionProject
  export let mode: "center" | "left"
  export let allowVideo = true

  export let isActive: boolean
  export let isNext: boolean
  export let isPrevious: boolean

  $: staticImage = `/assets/motion/thumbs/thumbs/${project.image}.jpg`
  $: fullVideoSource = `/assets/motion/thumbs/${project.image}`

  $: bulbs = [
    ...(project.sourceFileStatus ? [sourceFileStatusBulbs[project.sourceFileStatus]] : []),
    ...(project.official ? [officialBulbs[project.official]] : []),
    ...(project.tool ? project.tool.map(it => toolBulbs[it]) : []),
  ]

  $: playVideo = isActive || (mode === "center" && (isNext || isPrevious))
</script>

<section class:containerLeft={mode === 'left'} class:containerCenter={mode === 'center'}>
  <TextComponent {project} {bulbs} />

  <VideoComponent
    {allowVideo}
    {playVideo}
    {fullVideoSource}
    {staticImage}
  />
</section>

<style lang="scss">
  .textContainer {
    grid-column: 1;
    grid-row: 1;
    z-index: 4;
  }

  .containerLeft {
    width: 100%;
    height: 256px;

    // overlap
    display: grid;
    align-items: center;
    align-content: start;
    justify-items: start;
  }

  .containerCenter {
    width: 500px;
    height: 256px;
    display: grid;
    align-items: center;
    align-content: center;
    justify-items: center;
    justify-content: center;
  }
</style>
