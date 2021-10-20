export default function getStyle (prefs) {
	let styleStrings = []
	for (let prop in prefs) {
		styleStrings.push(`  ${prop}: ${prefs[prop]};`)
	}
	if (styleStrings.length) {
		return '\n'+styleStrings.join('\n')	
	} else {
		return ''
	}
}