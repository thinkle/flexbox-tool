<script>
	import { childPreferences, activeChild } from './store';
	import {alignVals, justVals, marginVals} from './flexprops.js'
	import PropButton from './PropButton.svelte'
	import getStyle from './getStyle.js'
	export let preferences
	export let n
	let length = 1;
	let width=60;
	let height=100;
	
	function getInnerStyle (prefs) {
		return ` 
			min-width:${width}px;
			min-height:${height}px;
			${getStyle(prefs)}			
		`
	}
	let hide = true
	$: hide = $activeChild != n
	
	function toggleActive () {
		console.log('TOGGLE',n)
		if ($activeChild==n) {
			$activeChild = -1;
		} else {
			$activeChild = n;
		}
	}
	
</script>


<div style={getInnerStyle($preferences,width,height)} class:active={!hide}>
	<button class:active={!hide} on:click={toggleActive}>
		
	</button>
	<slot/>
	<nav class="controls" class:hidden={hide}>
		<input width="3" bind:value={width} type="number" min={0}>x<input width="3"bind:value={height} type="number" min={0}>
		
	<br>Align:
	{#each alignVals as a}
		<PropButton prop="align-self" val={a.val} store={preferences} extraStore={childPreferences}>
			{a.name}
		</PropButton>
	{/each}
		<br>Margins:
	{#each marginVals as m}
		<PropButton prop={m.prop} val={m.val} store={preferences} extraStore=	{childPreferences}>
			{m.name}
		</PropButton>
	{/each}
			<button on:click={toggleActive}>
				&times;	
			</button>
		</nav>
</div>

<style>
	button {
		position: absolute;
		top: 2px;
		right: 2px;
		border-radius: 50%;
		background-color: var(--bg);
		color: var(--fg);
		border: 1px solid var(--fg);
		width: 10px; height: 10px;
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
		top: calc(50vh - 100px);
		left: calc(50vw - 150px);
		background-color: #1117;
		width: 300px;
		height: 200px;
		z-index: 2;
		border: 2px solid var(--innerBorder);
	}
	input {
		width: 4em;
	}
	div {
		border : 1px solid var(--innerBorder);
		padding : 2px;
		margin: 2px;
		border-radius: 5px;
		position: relative;
		display: flex;
		text-align: center;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	div.active {
		background-color: var(--innerBorder);
	}
	
</style>