import { writable } from 'svelte/store'

export let preferences = writable({})
export let childPreferences = writable([])
export let activeChild = writable(-1)

childPreferences.addChildren = function (n) {
	childPreferences.update(
		($childPreferences)=>{
			while ($childPreferences.length < n) {
				$childPreferences.push(writable({}))
			}
			return $childPreferences
		}
	)
}