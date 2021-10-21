<script>
  export let preferencesStore;
  export let children;
  import Collapser from "./Collapser.svelte";
  import { alignVals, justVals, wrapVals } from "./flexprops.js";
  import PropButton from "./PropButton.svelte";
</script>

<Collapser name="Children">
  <input bind:value={children} type="number" style="width:3em;" />
</Collapser>
<Collapser name="Dir">
  <PropButton prop="flex-direction" val="row" store={preferencesStore}>
    R
  </PropButton>
  <PropButton prop="flex-direction" val="column" store={preferencesStore}>
    C
  </PropButton>
</Collapser>
<Collapser name="Align">
  {#each alignVals as a}
    <PropButton prop="align-items" val={a.val} store={preferencesStore}>
      {a.name}
    </PropButton>
  {/each}
</Collapser>
<Collapser name="Justify">
  {#each justVals as a}
    <PropButton prop="justify-content" val={a.val} store={preferencesStore}>
      {a.name}
    </PropButton>
  {/each}
</Collapser>
<Collapser name="Wrap">
  {#each wrapVals as a}
    <PropButton prop="flex-wrap" val={a.val} store={preferencesStore}>
      {a.name}
    </PropButton>
  {/each}
</Collapser>

<style>
</style>
