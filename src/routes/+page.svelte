<script>
	import Map from './Map.svelte'
</script>

<svelte:head>
	<title>maguire.engineering</title>
	<meta name="Description" content="Maguire Engineering" />
</svelte:head>

<section class="hero" id="hero">
	<h3>Hey, I'm Patrick.</h3>
	<h2>I solve problems and build things.</h2>
	<p>I'm a full stack Javascript and Python dev with expertise in AWS and GIS.</p>
	<p>
		I've built hospitals, battled disease outbreaks, taught physics, and designed and installed
		solar PV systems.
	</p>
	<p>
		Since moving into tech in 2011, I've architected, written, tested, released, debugged, and
		project managed software, and I've directed the quality assurance and release team for a 100+
		member software organization.
	</p>
	<p>
		Most recently, I was a lead software developer at a renewable energy startup, where I
		architected and built our APIs, AWS infrastructure, and a front end GIS application, among many
		other things.
	</p>

	<h4>Here's my story ↓</h4>
</section>

<section>
	<Map />
</section>

<style>
	.hero {
		font-size: 1.25rem;
		max-width: 700px;
		margin: 0 auto;
		padding: var(--outside-margin);
	}
</style>
