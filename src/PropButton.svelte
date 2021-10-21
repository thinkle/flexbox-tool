<script>
  import FlexIcon from "./FlexIcon.svelte";
  export let store;
  export let prop;
  export let val;
  export let isChild = false;

  function update() {
    console.log("Update", $store);
    $store[prop] = val;
    store.forceUpdate();
  }

  function remove() {
    console.log("Remove", prop);
    delete $store[prop];
    store.forceUpdate();
  }
</script>

{#if $store[prop] != val}
  <button on:click={update}>
    <FlexIcon {prop} {val} {isChild} {store} />
    <span style="display:none">
      <slot />
    </span>
  </button>
{:else}
  <button class="on" on:click={remove}>
    <FlexIcon {prop} {val} {isChild} {store} />
  </button>
{/if}

<style>
  .on :global(span) {
    background-color: var(--active) !important;
  }
  button > :global(*) > :global(*) {
    border: 2px solid transparent;
  }
  button {
    background-color: transparent;
    border-color: transparent;
  }
</style>
