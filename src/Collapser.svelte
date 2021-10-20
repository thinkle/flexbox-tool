<script>
  import { fade, fly } from "svelte/transition";

  export let name;
  let vis = true;
  function toggle() {
    vis = !vis;
  }
</script>

<section>
  <label on:click={toggle}>
    {name}
    {#if vis}
      ▾
    {:else}
      ▸
    {/if}
  </label>
  {#if vis}
    <div class="flex" in:fly={{ y: -30 }} out:fly={{ y: -30 }}>
      <slot />
    </div>
  {/if}
</section>

<style>
  label {
    transition: color 300ms;
  }
  label:hover {
    color: var(--link);
  }
  section {
    margin-right: 10px;
    border: 1px solid #777;
    padding: 4px;
  }
  .flex {
    display: flex;
    align-items: center;
  }
</style>
