<script>
	export let prop
	export let val
	export let isChild
	import {preferences} from './store';
	const W = 40
	const H = 20
	let width = W;
	let height = H;
	$: {
	if ($preferences['flex-direction'] == 'column') {
		width = H;
		height = W;
	} else {
		width = W;
		height = H;
	}
	if (prop=='flex-direction') {
		if (val=='column') {
			width = H;
			height = W;
		} else {
			width = W;
			height = H;
		}
	}}
	
function	getExtraStyle(prop,val,$preferences) {
	if (val=='stretch') {
		if ($preferences['flex-direction']=='column') {
			return '--innerwidth:auto'
		} else {
			return '--innerheight:auto;'
		}		
	} if (prop=='flex-wrap') {		
		if ($preferences['flex-direction']=='column') {
			return `--innerheight:${W/3}px`
		} else {
			return `--innerwidth:${W/3}px;`
		}		
	}
}
	
</script>

<div style={`--width:${width}px;--height:${height}px;--default-direction:${$preferences['flex-direction']}`}>
{#if isChild}
<span>
	<b><i></i></b>
	<b class="highlight" style={`${prop}:${val};${getExtraStyle(prop,val,$preferences)}`}><i></i></b>
	<b><i></i></b>		
</span>
{:else}
<span style={`${prop}:${val};${getExtraStyle(prop,val,$preferences)}`}>
	<b><i></i></b>
	<b><i></i></b>
	<b><i></i></b>		
	
</span>
{/if}
	<pre>{prop}:{val}</pre>
</div>

<style>
	div {
		display: contents;
	}
	pre {
		display: none;
		position: absolute;
		background-color: #fff;
		color: #333;
	}
	div:hover pre {
		display: block;
	}
	span {
		display: flex;
		flex-direction : var(--default-direction);
		width: var(--width);
		height: var(--height);
		background-color: var(--fg);
		border-radius: 5px;
		align-items: center;
		justify-content: space-around;
	}
	
	b {		
		height: var(--innerheight,calc(var(--height)/5));
		width: var(--innerwidth,calc(var(--height)/5));
		display: inline-block;
		background-color: var(--bg);
		border-radius: 3px;
		margin-left: 1px;
		margin-right: 1px;
	}
	b.highlight {
		background-color: red;
	}
</style>