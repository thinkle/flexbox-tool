<script>
	import FlexIcon from './FlexIcon.svelte'
	export let store
	export let prop
	export let val
	export let extraStore = null;
	let isChild = !!extraStore
	function update () {
		console.log('Update',$store)
		$store[prop] = val;
		if (extraStore) {
			$extraStore = $extraStore;
		}
		console.log('Now we have',$store)
		console.log('And we have',$extraStore)
	}
	
	function remove () {
		console.log('Remove',prop)
		delete $store[prop]
		$store = $store;
		if (extraStore) {
			$extraStore = $extraStore
		}
		console.log($store);
	}
	
</script>

{#if $store[prop] != val}
<button on:click={update}>
		<FlexIcon {prop} {val} {isChild}/>
		<span style="display:none">
			<slot/>
		</span>
</button>
{:else}
<button class="on" on:click={remove}>
		<FlexIcon {prop} {val} {isChild}/>
</button>
{/if}

<style>
	.on > :global(*) > :global(*) {
		border: 2px solid var(--bg2);		
	}
	button > :global(*) > :global(*) {
		border: 2px solid transparent;
	}
	button {
		background-color: transparent;
		border-color: transparent;
	}
	
</style>