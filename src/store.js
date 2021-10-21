import { writable, get } from "svelte/store";

export let preferences = makePreferences();

function makePreferences(parent = null) {
  let p = writable({
    _children: [],
    parent,
  });
  p.addChildren = function (n) {
    console.log("Add ", n, " children to ", p);
    let childPreferences = get(p)._children;
    while (childPreferences.length < n) {
      childPreferences.push(makePreferences((parent = p)));
    }
    p.update(($p) => $p);
  };

  p.forceUpdate = function () {
    p.update(($p) => $p);
    if (parent) {
      parent.update(($par) => $par);
    }
  };
  return p;
}

/* export let childPreferences = writable([]) */
export let activeChild = writable(-1);
