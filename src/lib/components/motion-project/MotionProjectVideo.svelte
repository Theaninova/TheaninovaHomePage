<script lang="ts">
  export let allowVideo: boolean
  export let playVideo: boolean
  export let fullVideoSource: string
  export let staticImage: string

  $: shouldPlay = allowVideo && playVideo
  $: () => {
    if (shouldPlay) {
      video?.play()
    } else {
      video?.pause()
    }
  }

  export let video: HTMLVideoElement
</script>

<video
  bind:this={video}
  src={fullVideoSource}
  poster={staticImage}
  loop
  playsInline
  muted
  preload="none"
  style="filter: {shouldPlay ? 'blur(0px)' : 'blur(10px)'}"
/>

<style lang="scss">
  video {
    transition: filter 0.5s;

    border-radius: 100%;
    width: 256px;
    height: 256px;
    overflow: hidden;
    object-fit: cover;

    grid-column: 1;
    grid-row: 1;
  }
</style>
