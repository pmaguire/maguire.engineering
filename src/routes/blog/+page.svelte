<script>
	export let data
</script>

<svelte:head>
	<title>Blog • Maguire Engineering</title>
	<meta
		name="Description"
		content="Thoughts and rants about software development, among other things"
	/>
</svelte:head>

<h1>Blog</h1>
<p>A mix of spicy and extremely mundane takes on building software, among other things.</p>
<ul>
	{#each data.posts as post}
		<li>
			<h2>
				<a href={post.path}>
					{post.meta.title}
				</a>
			</h2>
		</li>
	{/each}
</ul>

<style>
	h1 {
		font-size: 1.5rem;
	}
</style>
