<script lang="ts">
  let cursor: HTMLDivElement

  export let from = 0
  export let to = 100
  export let time = 0
  export let tracks = {
    test: {0: {value: 0}, 100: {value: 40}},
    test3: {0: {value: 0}, 50: {value: 40}, 100: {value: 60}},
    test4: {0: {value: 10}, 100: {value: 50}},
  }

  $: duration = to - from
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
        <div class="track-name">{trackName}</div>
        {#each Object.entries(track) as [time, value]}
          <div class="keyframe" style="left: calc(72px + ({(time - from) / duration} * (100% - 88px)));" />
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
    height: 24px;
  }

  .track:nth-child(odd) {
    background-color: grey;
  }

  .track-name {
    display: flex;
    width: 56px;
    height: 100%;
    align-items: center;
    justify-content: center;

    background-color: black;
  }

  .keyframe {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);

    width: 8px;
    height: 8px;
    border: 2px black solid;

    border-radius: 50%;
    background-color: #ff4141;
  }

  .timeline-controls {
    display: grid;
    grid-template-columns: repeat(5, auto);
  }

  fieldset {
    border: none;
  }
</style>
