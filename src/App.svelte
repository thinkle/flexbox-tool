<script>
	let name = 'world';
	import Flex from './Flex.svelte'
</script>
<div>
	<h1>
		Flexbox Code Generator
	</h1>
<Flex>
</Flex>
	
</div>

<style>
	h1 {
		text-align: center;
	}
	div {
		max-width: 1280px;
		margin: auto;
		padding: 10px;
		--bg : #0033a0;
		--fg : #def;
		--bg2 : #c6093b;
		--fg2 : #fff;
		--outerBorder : #ef88ff;
		--innerBorder : #88ff88;
		background-color: #121212;
		--link : #ddddff;
		color: white;
		font-family: Verdana;
	}	
	:global(input) {
		background-color: #333;
		color: white;
	}

</style>