<script lang="ts">
  let cursor: HTMLDivElement

  export let from = 0
  export let to = 100
  export let time = 0
  export let tracks = {
    test: {0: {value: 0, interpolation: "linear"}, 100: {value: 40, interpolation: "linear"}},
    spiral_iteration_count: {
      0: {value: 0, interpolation: "expoOut"},
      50: {value: 40, interpolation: "expoIn"},
      100: {value: 60},
    },
    test4: {0: {value: 10, interpolation: "expoInOut"}, 100: {value: 50}},
  }

  $: duration = to - from

  const widthLeft = 200
  const padding = 16
</script>

<section class="timeline" {...$$restProps}>
  <fieldset class="timeline-controls">
    <input type="number" bind:value={from} />
    <input type="number" bind:value={to} />
    <input type="number" bind:value={time} />
    <button>⏸</button>
    <button>▶</button>
  </fieldset>
  <div class="keyframes">
    <input type="range" bind:this={cursor} min={from} max={to} bind:value={time} step="0.01" class="cursor" />
    {#each Object.entries(tracks) as [trackName, track]}
      <div class="track">
        <pre class="track-name" style="width: {widthLeft}px">{trackName}</pre>
        {#each Object.entries(track) as [time, value]}
          <div
            class="keyframe {value.interpolation}"
            style="left: calc({widthLeft + padding}px + ({(time - from) / duration} * (100% - {widthLeft +
              2 * padding}px)));"
          />
        {/each}
      </div>
    {/each}
  </div>
</section>

<style lang="scss">
  .timeline {
    display: grid;
    grid-template-rows: 1fr auto;
  }

  .keyframes {
    display: grid;
    margin-bottom: 16px;
  }

  .track {
    position: relative;
    width: 100%;
    display: flex;
    height: 32px;
  }

  .track:nth-child(odd) {
    background-color: grey;
  }
  .track:nth-child(even) {
    background-color: darkgray;
  }

  .track-name {
    display: flex;
    margin: 0;
    height: 100%;
    align-items: center;
    justify-content: center;

    background-color: black;
  }

  .keyframe {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 12px;
    height: 12px;
    border: 2px black solid;

    border-radius: 50%;
    background-color: #ff4141;

    cursor: pointer;
    transition: all 0.2s ease-out;

    &:hover {
      transform: translate(-50%, -50%) scale(1.2);
    }

    &:global(.linear) {
      border-radius: 0;
      transform: translate(-50%, -50%) rotate(-45deg) scale(0.85);

      &:hover {
        transform: translate(-50%, -50%) rotate(-45deg) scale(1);
      }
    }
    &:global(.expoInOut) {
      border-radius: 40%;
    }
    &:global(.expoIn) {
      border-radius: 40% 0 0 40%;
    }
    &:global(.expoOut) {
      border-radius: 0 40% 40% 0;
    }
  }

  .timeline-controls {
    display: grid;
    grid-template-columns: repeat(5, auto);
  }

  fieldset {
    border: none;
  }
</style>
