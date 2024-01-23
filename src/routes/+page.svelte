<script>
	import Map from './Map.svelte'
</script>

<svelte:head>
	<title>maguire.engineering</title>
	<meta name="Description" content="Maguire Engineering" />
</svelte:head>

<section class="hero">
	<p>Hey, I'm Patrick.</p>
	<p>I build full stack apps and solve problems.</p>
	<p>
		I love building complex things from start to finish. I'm that teammate who on any given day
		might figure out the tricky bug, manage an ad-hoc project, onboard and mentor a new hire, build
		out some cloud infrastructure, all while writing first class code. I'm the general all-rounder
		that glues teams together and keeps the big picture in mind.
	</p>
	<p>A few of the things I excel at and enjoy:</p>
	<div class="columns">
		<div class="column">
			<h3>Tech</h3>
			<p>
				Python
				<li>Flask</li>
			</p>
			<p>
				Javascript
				<li>Svelte & SvelteKit</li>
			</p>
			<p>AWS</p>
			<p>PostgreSQL</p>
		</div>
		<div class="column">
			<h3>Process</h3>
			<p>Scrum-mastering & Custom Tailoring of Agile Processes</p>
			<p>Building & Mappping Software & Business Architecture</p>
			<p>Creating Onboarding Flows for New Hires</p>
		</div>
		<div class="column">
			<h3>Magic Powers</h3>
			<p>Figuring out that extremely persistent bug that can't be reproduced</p>
			<p>Building strong, collaborative relationships with people throughout the company</p>
			<p>Creating that ever elusive collaborative team environment</p>
		</div>
	</div>

	<p>My Story:</p>
	<p>
		Older paths are more subtle then current ones. Same with points. Something to clearly indicate
		where I live now.
	</p>
	<p>
		Scroll down for a guided tour of my career (add downward arrow?) - prompt by showing map with
		full paths from start to end?
	</p>
</section>

<section>
	<Map />
</section>

<style>
	.hero {
		padding: var(--outside-padding);
	}
	.columns {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		grid-gap: 1rem;
	}
	.column {
		background-color: var(--background-2);
		padding: 0 1rem;
		& li {
			margin-top: 0.25rem;
			margin-left: 1rem;
		}
		& p {
			margin: 0.8rem 0;
		}
	}
</style>
