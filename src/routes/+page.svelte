<script>
	import Map from './Map.svelte'
</script>

<svelte:head>
	<title>maguire.engineering</title>
	<meta name="Description" content="Maguire Engineering" />
</svelte:head>

<section class="hero">
	<p>Hey, I'm Patrick. I'm a deeply experienced full stack developer and expert problem solver.</p>
	<p>
		I love building complex things from start to finish. I'm the teammate who on any given day might
		figure out the tricky bug, manage an ad-hoc project, onboard and mentor a new hire, build out
		some cloud infrastructure, all while writing first class code. I'm the general all-rounder that
		glues teams together and keeps the big picture in mind, no matter the size of the team.
	</p>
	<p>A few things I'm great at:</p>
	<p>Possible columns: Tech, Soft Skills, ?</p>
	<p>My Story: (add downward arrow?) - prompt by showing map with full paths from start to end?</p>
	<p>
		Older paths are more subtle then current ones. Same with points. Something to clearly indicate
		where I live now.
	</p>
</section>

<section>
	<Map />
</section>

<style>
	.hero {
		padding: var(--outside-padding);
	}
</style>
