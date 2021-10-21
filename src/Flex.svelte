<script>
  import FlexParentSettings from "./FlexParentSettings.svelte";
  import Collapser from "./Collapser.svelte";
  import { preferences } from "./store";
  import { alignVals, justVals, wrapVals } from "./flexprops.js";
  import PropButton from "./PropButton.svelte";
  import { get } from "svelte/store";
  import getStyle from "./getStyle.js";
  export let children = 3;
  export let containerEl = "div";
  export let containerClass = "flex-container";
  import ChildCSSBlock from "./ChildCSSBlock.svelte";
  import ChildHTMLBlock from "./ChildHTMLBlock.svelte";
  let childnums = [];
  $: {
    childnums = [];
    for (let i = 0; i < children; i++) {
      childnums.push(i);
    }
  }
  import FlexChild from "./FlexChild.svelte";

  $: preferences.addChildren(children);

  let containerName;
  $: containerName =
    (containerClass && `${containerEl}.${containerClass}`) || containerEl;

  let childWidth, childHeight;

  $: {
    if (
      $preferences["flex-wrap"] == "wrap" ||
      $preferences["flex-wrap"] == "wrap-reverse"
    ) {
      childWidth = `${100 / children}%`;
      childHeight = `${60 / children}vh`;
    } else {
      childWidth = `${100 / (children + 2)}%`;
      childHeight = `${60 / (children + 2)}vh`;
    }
  }
</script>

<div class="wrap">
  <header>
    <FlexParentSettings bind:children preferencesStore={preferences} />
    <!-- <section><a href="#code">Jump to Code</a></section> -->
  </header>
  <main
    style={`--defaultChildHeight:${childHeight};--defaultChildWidth:${childWidth}`}
  >
    <div class="flex" style={getStyle($preferences)}>
      {#each childnums as child}
        <FlexChild preferences={$preferences._children[child]} n={child}>
          Child {child + 1}
        </FlexChild>
      {/each}
    </div>
  </main>
  <footer>
    <h2 id="code">Code</h2>
    <b>Outer Tag</b>:
    <pre>&lt;<span class="editable" contenteditable bind:textContent={containerEl}>
</span> class="<span class="editable" contenteditable bind:textContent={containerClass}></span>"&gt;</pre>
    <h3>CSS</h3>
    <code>
      <pre>
/* CSS Code generated with Hinkle's flexbox code generator */
{containerName} {"{"}		 
  display: flex;{getStyle($preferences)} 
{"}"}
	</pre>
      {#each childnums as n}
        <ChildCSSBlock
          preferences={$preferences._children[n]}
          parentSelector="{containerName} > *:nth-child({n + 1})"
        />
      {/each}
      /* end generated code */
    </code>
    <h3>HTML</h3>
    <code>
      <pre>
	&lt;!-- HTML generated with Hinkle's flexbox code generator --&gt;
{`<${containerEl} class="${containerClass}">`}</pre>
      {#each childnums as child, n}<ChildHTMLBlock
          count={n + 1}
          preferences={$preferences._children[n]}
          level={1}
        />{/each}
      <pre>{`</${containerEl}>`}
&lt;!-- end generated code --&gt;
</pre>
    </code>
  </footer>
</div>

<style>
  .wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: space-between;
  }

  header {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 3px;
    width: 100%;
  }
  a {
    color: var(--link);
  }
  header,
  header > section {
    align-items: stretch;
  }
  header section > :global(*) {
    margin-left: 3px;
    margin-right: 3px;
  }
  .editable {
    border-bottom: 1px solid white;
    font-weight: bold;
    min-width: 3em;
    display: inline-flex;
    justify-content: center;
    background-color: #333;
    padding: 3px;
  }

  div.flex {
    display: flex;
    border: 2px solid var(--outerBorder);
    padding: 5px;
    height: 60vh;
    min-width: 300px;
    max-width: 70vw;
    margin: auto;
  }
  header {
    z-index: 2;
  }
  code :global(pre) {
    margin-top: 0;
    margin-bottom: 0;
  }

  main {
    flex-grow: 1;
  }
</style>
