<script>
  export let preferences;
  export let level = 1;
  export let count = 1;
  let spaces = "";
  $: for (let i = 0; i < level; i++) {
    spaces += "  ";
  }
  let childname = "child";
  if (level == 2) {
    childname = "grandchild";
  } else if (level > 2) {
    let greats = level - 2;
    childname = "grandchild";
    while (greats) {
      childname = "great-" + childname;
      greats -= 1;
    }
  }
</script>

<pre>{spaces}{"<div> <!-- could be any element -->"}</pre>
<pre>{spaces}{spaces}{`<!-- ${childname} ${count} content here -->`}</pre>
{#each $preferences._children as child, n}
  <svelte:self
    count={n + 1}
    preferences={$preferences._children[n]}
    level={level + 1}
  />{/each}
<pre>{spaces}{"</div>"}</pre>
