<script>
  export let projects
</script>

<ul>
  {#each projects as project}
    <li><a href={project.path}>{project.title}</a></li>
  {/each}
</ul>
