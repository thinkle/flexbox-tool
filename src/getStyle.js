const ignored = ["_children", "parent"];

export default function getStyle(prefs) {
  let styleStrings = [];
  for (let prop in prefs) {
    if (!ignored.find((p) => p == prop)) {
      styleStrings.push(`  ${prop}: ${prefs[prop]};`);
    }
  }
  if (styleStrings.length) {
    return "\n" + styleStrings.join("\n");
  } else {
    return "";
  }
}
