<script>
	export let data
</script>

<article>
	<h1>{data.title}</h1>
	<h4>Order: {data.order}</h4>
	<svelte:component this={data.content} />
</article>
