<script>
	import Map from './Map.svelte'
</script>

<section class="hero" id="hero">
	<span class="lead">Hey, I'm Patrick.</span>
	<h1>I solve problems and build things.</h1>
	<p>I'm a full stack Javascript and Python dev with AWS and GIS expertise.</p>
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
		Most recently, I was a lead software developer and team lead at a renewable energy startup,
		where I architected and built out our APIs, AWS infrastructure, and a front end GIS application,
		among many other things.
	</p>

	<h4>Here's the story of my career, starting with college ↓</h4>
</section>

<section>
	<Map />
</section>

<style>
	h1 {
		font-size: 2rem;
		font-weight: 300;
	}
	.lead {
		font-size: 1.75rem;
	}
	.hero {
		font-size: 1.25rem;
		max-width: 700px;
		margin: 0 auto;
		padding: var(--outside-padding);
	}
</style>
