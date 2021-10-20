<script>
	import Collapser from './Collapser.svelte'
	import { childPreferences, preferences } from './store';
	import {alignVals, justVals, wrapVals} from './flexprops.js'
	import PropButton from './PropButton.svelte';
	import {get} from 'svelte/store'
	import getStyle from './getStyle.js'
	export let children=3
	let childnums = []
	$: {
		childnums = [];
		for (let i=0; i<children; i++) {childnums.push(i)}
	}
	import FlexChild from './FlexChild.svelte'
	$: childPreferences.addChildren(children);
	let containerEl = 'div';
	let containerClass = 'flex-container'
	let containerName
	$: containerName= containerClass && `${containerEl}.${containerClass}` || containerEl

</script>
	<header>
		<Collapser name="Children">
		 <input bind:value={children} type="number" style="width:3em;">
		</Collapser>
		<Collapser name="Dir">			
			<PropButton prop="flex-direction" val="row" store={preferences}>
				R
			</PropButton>
			<PropButton prop="flex-direction" val="column" store={preferences}>
				C
			</PropButton>
		</Collapser>
		<Collapser name="Align">		
		{#each alignVals as a}
			<PropButton prop="align-items" val={a.val} store={preferences}>
				{a.name}
			</PropButton>
		{/each}
		</Collapser>
		<Collapser name="Justify">
			
		{#each justVals as a}
			<PropButton prop="justify-content" val={a.val} store={preferences}>
				{a.name}
			</PropButton>
		{/each}
		</Collapser>
		<Collapser name="Wrap">			
			{#each wrapVals as a}
				<PropButton prop="flex-wrap" val={a.val} store={preferences}>
				{a.name}
			</PropButton>
			{/each}
		</Collapser>
		<section><a href="#code">Jump to Code</a></section>
	</header>
	<main>
	<div class="flex" style={getStyle($preferences)}>
		{#each childnums as child}
		<FlexChild preferences={$childPreferences[child]} n={child}>
			Child {child}
		</FlexChild>
		{/each}
	</div>
	</main>
	<footer>
<h2 id="code">
	Code
</h2>
		<b>Outer Tag</b>:
		<pre>&lt;<span class="editable" contenteditable bind:textContent={containerEl}>
</span> class="<span class="editable" contenteditable bind:textContent={containerClass}></span>"&gt;</pre>
<h3>
	CSS
</h3>
<code>

	<pre>
/* CSS Code generated with Hinkle's flexbox code generator */
{containerName} {"{"}		 
  display: flex;{getStyle($preferences)} 
{"}"}
	</pre>
	{#each childnums as n}
	{#if getStyle(get($childPreferences[n]))}
		<pre>
{containerName} *:nth-child({n+1}) {"{"}{getStyle(get($childPreferences[n]))}
{"}"}	
		</pre>
	{/if}
	{/each}
/* end generated code */
</code>
<h3>HTML</h3>
<code>	
	<pre>
	<!-- HTML generated with Hinkle's flexbox code generator -->
	{`<${containerEl} class="${containerClass}">`}{#each childnums as child}{`
  <div> <!-- any element will work - doesn't have to be a div -->
    <!-- child ${child+1} content here -->
  </div>
`}{/each}{`</${containerEl}>`}
<!-- end generated code -->
	</pre>
</code>
</footer>
<style>
	
	main {
		grid-area: flex;
	}
	header {
		grid-area: bar;
	}
	footer {
		grid-area: code;
	}
	header {
		flex-wrap: wrap;
	}
	a {
		color: var(--link);
	}
	header,header > section {
		display: flex;
		justify-content: left;
		align-items: flex-start;
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
		border : 2px solid var(--outerBorder);
		padding: 5px;
		height: 60vh;
		max-width: 70vw;
		margin: auto;
	}
	header {
		z-index:2
	}
</style>