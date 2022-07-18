<script lang="ts">
  import type {MotionProject, StatusBulb} from "../../motion-project/motionProject"

  export let project: MotionProject
  export let bulbs: StatusBulb[]
</script>

<div class="textContainer">
  <h2 class="title">{project.title}</h2>
  <div class="row">
    <time class="subtitle creationDate" dateTime={project.created}>
      {new Date(project.created).toLocaleDateString()}
    </time>
    <ul class="bulbList">
      {#each bulbs as bulb (bulb.label)}
        <li
          title={bulb.label}
          style="backgroundColor: {bulb.color}77"
          class="subtitle bulb"
        >
          <abbr style="text-decoration: none">{bulb.abbr.toUpperCase()}</abbr>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style lang="scss">
  .textContainer {
    width: 100%;
    height: 100%;
    padding: 8px 20px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 1);
  }

  .title {
    font-size: 40px;
    font-variation-settings: var(--motionProjectTitleFontVariation);
    margin: 0;
    padding-bottom: 0;

    @media (min-width: 768px) {
      font-size: 60px;
    }
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2px;
  }

  .bulbList {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2px;

    .bulb:first-child {
      border-radius: 12.5px 0 0 12.5px;
      padding-left: 6px;
    }

    .bulb:last-child {
      border-radius: 0 12.5px 12.5px 0;
      padding-right: 6px;
    }
  }

  .bulb {
    font-variation-settings: var(--motionProjectBulbFontVariation);
    padding: 0 3px 2px;
    color: #171c14;
  }

  .subtitle {
    display: flex;
    text-shadow: none;
    height: 20px;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
  }

  .creationDate {
    font-variation-settings: var(--motionProjectSubtitleFontVariation);
    padding: 0 8px 2px;
    margin: 0;
    border-radius: 12.5px;
    background-color: rgba(black, 0.5);
  }

</style>
