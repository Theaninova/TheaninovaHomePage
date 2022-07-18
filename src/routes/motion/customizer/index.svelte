<script lang="ts">
  import type {CustomizableMotionProject} from "../../../lib/motion-project/customizable-motion-project"

  export let projects: CustomizableMotionProject[]
</script>

<h1>Customizable Motion</h1>

<ul>
  {#each projects as project}
    <li>
      <h2><a href={project.path}>{project.name}</a></h2>
    </li>
  {/each}
</ul>
