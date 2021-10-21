<script>
  export let preferences;
  export let parentSelector;
  import { get } from "svelte/store";
  import getStyle from "./getStyle.js";
</script>

{#if getStyle($preferences)}
  <pre>
  {parentSelector} {"{"} {getStyle($preferences)}
  {"}"}
</pre>
{/if}
{#if $preferences._children}
  {#each $preferences._children as child, n}
    <svelte:self
      parentSelector={`${parentSelector} > *:nth-child(${n + 1})`}
      preferences={$preferences._children[n]}
    />
  {/each}
{/if}
