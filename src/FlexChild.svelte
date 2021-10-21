<script>
  import { get } from "svelte/store";
  import Collapser from "./Collapser.svelte";
  import FlexParentSettings from "./FlexParentSettings.svelte";
  import { activeChild } from "./store";
  import { alignVals, justVals, marginVals } from "./flexprops.js";
  import PropButton from "./PropButton.svelte";
  import getStyle from "./getStyle.js";
  export let preferences;
  export let n;
  let length = 1;
  let width = null;
  let height = null;

  function getInnerStyle(prefs) {
    let style = getStyle(prefs);
    if (width) {
      style = `--childWidth:${width}px;${style}`;
    }
    if (height) {
      style = `--childHeight:${height}px;${style}`;
    }
    return style;
  }

  let hide = true;
  $: hide = $activeChild != n;

  function toggleActive() {
    console.log("TOGGLE", n);
    if ($activeChild == n) {
      $activeChild = -1;
    } else {
      $activeChild = n;
    }
  }
  let nestedFlexMode = false;
  let children = 2;

  $: if (nestedFlexMode) {
    console.log("add grandchildren!");
    preferences.addChildren(children);
  }

  function updateForFlex(nestedFlexMode) {
    if (preferences && $preferences) {
      console.log("Update...", $preferences);
      if (nestedFlexMode) {
        $preferences["display"] = "flex";
        preferences.forceUpdate();
      } else {
        delete $preferences["display"];
        $preferences = $preferences;
        preferences.forceUpdate();
      }
    }
  }
  $: updateForFlex(nestedFlexMode);
  let controlHeight;
  let childNums = [];
  function updateChildren(children) {
    childNums = [];
    for (let i = 0; i < children; i++) {
      childNums.push(i);
    }
  }
  $: updateChildren(children);
  let innerWidth, innerHeight;
</script>

{#if $preferences}
  <div
    style={getInnerStyle($preferences, width, height)}
    class:active={!hide}
    bind:clientWidth={innerWidth}
    bind:clientHeight={innerHeight}
  >
    <button class:active={!hide} on:click={toggleActive} />
    {#if nestedFlexMode}
      <section
        style={`
				display: contents;
				font-size: 50%;
				--defaultChildWidth: ${innerWidth / (children + 2)}px;
				--defaultChildHeight: ${innerHeight / (children + 2)}px;
			`}
      >
        {#each childNums as i}
          <svelte:self preferences={$preferences._children[i]} n={`${n}-${i}`}
            ><slot />-{i + 1}</svelte:self
          >
        {/each}
      </section>
    {:else}
      <slot />
    {/if}
  </div>
  <nav
    class="controls"
    class:hidden={hide}
    bind:clientHeight={controlHeight}
    style={`--controlHeight:${controlHeight}px`}
  >
    <Collapser name="Align">
      {#each alignVals as a}
        <PropButton
          prop="align-self"
          val={a.val}
          store={preferences}
          isChild={true}
        >
          {a.name}
        </PropButton>
      {/each}
    </Collapser>
    <Collapser name="Margins">
      {#each marginVals as m}
        <PropButton
          prop={m.prop}
          val={m.val}
          store={preferences}
          isChild={true}
        >
          {m.name}
        </PropButton>
      {/each}
    </Collapser>
    <Collapser name="Size">
      <input width="3" bind:value={width} type="number" min={0} />x<input
        width="3"
        bind:value={height}
        type="number"
        min={0}
      />
    </Collapser>
    <input type="checkbox" bind:checked={nestedFlexMode} /> Nested Flex
    {#if nestedFlexMode}
      <FlexParentSettings bind:children preferencesStore={preferences} />
    {/if}

    <button on:click={toggleActive}> &times; </button>
  </nav>
{:else}
  <span>Why no prefs???</span>
{/if}

<style>
  button {
    position: absolute;
    top: 2px;
    right: 2px;
    border-radius: 50%;
    background-color: var(--bg);
    color: var(--fg);
    border: 1px solid var(--fg);
    width: 10px;
    height: 10px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
  }
  button.active {
    background-color: #222;
    color: #eee;
  }
  .controls.hidden {
    opacity: 0;
    pointer-events: none;
  }
  .controls {
    opacity: 1;
    pointer-events: all;
    position: fixed;
    top: calc(max(0vh, 50vh - var(--controlHeight) / 2));
    left: calc(50vw - 225px);
    background-color: #111a;
    width: 450px;
    max-height: 100vh;
    overflow-y: auto;
    z-index: 2;
    border: 2px solid var(--active);
  }
  input {
    width: 4em;
  }
  div {
    border: 1px solid var(--innerBorder);
    padding: 2px;
    padding-top: 12px;
    margin: 2px;
    border-radius: 5px;
    position: relative;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    position: relative;
    min-width: var(--childWidth, var(--defaultChildWidth));
    min-height: var(--childHeight, var(--defaultChildHeight));
  }
  div.active {
    background-color: var(--active);
    color: var(--activeFG);
  }
</style>
