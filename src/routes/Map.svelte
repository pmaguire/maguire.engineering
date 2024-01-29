<script>
	import { onMount, onDestroy } from 'svelte'
	import { fade } from 'svelte/transition'
	import { Map, Popup } from 'mapbox-gl'
	import 'mapbox-gl/dist/mapbox-gl.css'
	import { theme } from '$lib/stores/theme'
	import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public'

	let map
	let mapContainer,
		topBanner = '',
		bottomBanner = ''

	const defaultLoc = 'hero'

	const locations = {
		hero: {
			center: [-118.285272, 34.020508],
			zoom: 2,
			speed: 2,
		},
		'los-angeles': {
			center: [-118.285272, 34.020508],
			zoom: 11,
			topBanner: 'Los Angeles',
			bottomBanner: '2001 - 2005',
			speed: 2,
		},
		tanzania: {
			center: [33.565264, -1.792723],
			zoom: 10,
			topBanner: 'Tanzania',
			bottomBanner: '2005 - 2007',
			speed: 2,
		},
		'south-sudan': {
			center: [32.540282, 9.191535],
			zoom: 6,
			topBanner: 'South Sudan',
			bottomBanner: '2009',
		},
		haiti: {
			center: [-72.352469, 18.534794],
			zoom: 10,
			topBanner: 'Haiti',
			bottomBanner: '2010 - 2011',
			speed: 1.5,
		},
		oakland: {
			center: [-122.274398, 37.793933],
			zoom: 10,
			topBanner: 'Oakland, California',
			bottomBanner: '2011 - 2017',
		},
		colorado: {
			center: [-105.204706, 40.071132],
			zoom: 9,
			topBanner: 'Boulder, Colorado',
			bottomBanner: '2018 - 2023',
		},
		summary: {
			center: [-72.299317, 18.554858],
			zoom: 2,
			bottomBanner: '2024 - ?',
			speed: 2,
		},
	}

	const POIs = {
		type: 'geojson',
		data: {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					properties: {
						description: '<strong>USC Main Campus</strong>',
					},
					geometry: {
						type: 'Point',
						coordinates: [-118.28532, 34.0211425],
					},
				},
				{
					type: 'Feature',
					properties: {
						description: '<strong>Kasoma Secondary School</strong>',
					},
					geometry: {
						type: 'Point',
						coordinates: [33.565264, -1.792723],
					},
				},
				{
					type: 'Feature',
					properties: {
						description:
							'<strong>Nasir</strong><p>MSF Field Hospital, 60 beds and Operating Theater</p>',
					},
					geometry: {
						type: 'Point',
						coordinates: [33.057843, 8.610288],
					},
				},
				{
					type: 'Feature',
					properties: {
						description:
							'<strong>Rom</strong><p>Kala Azar outbreak emergency assessment and response.</p>',
					},
					geometry: {
						type: 'Point',
						coordinates: [32.148918, 9.882728],
					},
				},
				{
					type: 'Feature',
					properties: {
						description:
							'<strong>Petionville Tent Encampment</strong><p>Health clinic for Haitians displaced by the earthquake</p>',
					},
					geometry: {
						type: 'Point',
						coordinates: [-72.302715, 18.537593],
					},
				},
				{
					type: 'Feature',
					properties: {
						description:
							'<strong>Delmas 33 Emergency Obstetrics</strong><p>120 bed pre-fabricated hospital</p>',
					},
					geometry: {
						type: 'Point',
						coordinates: [-72.299317, 18.554858],
					},
				},
				{
					type: 'Feature',
					properties: {
						description: '<strong>Carrefour Cholera Response</strong>',
					},
					geometry: {
						type: 'Point',
						coordinates: [-72.403943, 18.53765],
					},
				},
				{
					type: 'Feature',
					properties: {
						description:
							'<strong>Sungevity Headquarters</strong><p>Residential Solar financing and installation</p>',
					},
					geometry: {
						type: 'Point',
						coordinates: [-122.274398, 37.793933],
					},
				},
				{
					type: 'Feature',
					properties: {
						description:
							'<strong>Catalyze Headquarters</strong><p>Commercial and Industrial renewable energy financing and construction</p>',
					},
					geometry: {
						type: 'Point',
						coordinates: [-105.204706, 40.071132],
					},
				},
			],
		},
	}

	function addPoisLayer() {
		map.addSource('POIs', POIs)

		map.addLayer({
			id: 'POIs',
			type: 'circle',
			source: 'POIs',
			paint: {
				'circle-color': '#b90000',
				'circle-radius': 6,
				'circle-stroke-width': 2,
				'circle-stroke-color': '#ffffff',
			},
		})
	}

	onMount(async () => {
		map = new Map({
			container: mapContainer,
			accessToken: PUBLIC_MAPBOX_ACCESS_TOKEN,
			style: `mapbox://styles/mapbox/${$theme}-v11`,
			center: locations[defaultLoc].center,
			zoom: locations[defaultLoc].zoom,
			interactive: false,
		})

		topBanner = locations[defaultLoc].topBanner || ''
		bottomBanner = locations[defaultLoc].bottomBanner || ''

		map.on(['style.load'], function () {
			addPoisLayer()
		})

		theme.subscribe(mode => {
			map.setStyle(`mapbox://styles/mapbox/${mode}-v11`)
		})

		await map.once('load')
		addPoisLayer()
		spinGlobe()

		const popup = new Popup({
			closeButton: false,
			closeOnClick: false,
		})

		map.on('mouseenter', 'POIs', e => {
			map.getCanvas().style.cursor = 'pointer'

			const coordinates = e.features[0].geometry.coordinates.slice()
			const description = e.features[0].properties.description

			// Ensure that if the map is zoomed out such that multiple
			// copies of the feature are visible, the popup appears
			// over the copy being pointed to.
			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
			}

			popup.setLngLat(coordinates).setHTML(description).addTo(map)
		})

		map.on('mouseleave', 'POIs', () => {
			map.getCanvas().style.cursor = ''
			popup.remove()
		})

		let activeLocation = ''
		function setActiveLocation(location) {
			if (location === activeLocation) return

			map.flyTo(locations[location])

			document.getElementById(location).classList.add('active')
			document.getElementById(activeLocation)?.classList.remove('active')
			topBanner = locations[location].topBanner || ''
			bottomBanner = locations[location].bottomBanner || ''

			activeLocation = location
		}

		function isElementOnScreen(id) {
			const element = document.getElementById(id)
			if (element) {
				const bounds = element.getBoundingClientRect()
				return bounds.top < window.innerHeight && bounds.bottom > 0
			}
		}

		// On every scroll event, check which element is on screen
		window.onscroll = () => {
			for (const location in locations) {
				if (isElementOnScreen(location)) {
					setActiveLocation(location)
					break
				}
			}
		}

		function spinGlobe() {
			const zoom = map.getZoom()
			if (zoom <= 3) {
				const center = map.getCenter()
				center.lng += 5
				map.easeTo({ center, duration: 1000, easing: n => n })
			}
		}

		map.on('moveend', () => {
			spinGlobe()
		})
	})

	onDestroy(() => {
		map?.remove()
	})
</script>

<div class="scroller">
	<div class="map-wrap">
		<div class="banners">
			{#key topBanner}
				<span
					in:fade={{ duration: 200, delay: 200 }}
					out:fade={{ duration: 200 }}
					class="banner top">{topBanner}</span
				>
			{/key}
			{#key bottomBanner}
				<span
					in:fade={{ duration: 200, delay: 200 }}
					out:fade={{ duration: 200 }}
					class="banner bottom">{bottomBanner}</span
				>
			{/key}
		</div>
		<div class="map" bind:this={mapContainer} />
	</div>
	<section id="los-angeles" class="active">
		<span class="title-block">
			<img class="icon" src="/usc-logo.svg" alt="Seal for the University of Southern California" />
			<h3>University of Southern California</h3>
		</span>
		<p>
			I studied Civil Engineering, with an emphasis in Building Science & Architecture. I took a few
			programming courses on the side, and mildly regretted not choosing Computer Science as my
			major. I found I deeply enjoyed any extracurriculars involving building things with my hands,
			and got pretty good at metalworking and welding as a result. After a few summer internships I
			found I didn't love the options Civil Engineering was giving me, so after graduation I headed
			to Tanzania as a Peace Corps volunteer.
		</p>
		<img
			class="picture"
			src="/usc-welding.jpg"
			alt="Patrick Maguire welding some metal together at USC"
		/>
	</section>
	<section id="tanzania">
		<span class="title-block">
			<img class="icon" src="/peace-corps-logo.svg" alt="Peace Corps circular logo" />
			<h3>Peace Corps</h3>
		</span>
		<p>
			I lived in Tanzania for two years and three months, teaching physics and mathematics to high
			schoolers at a remote campus on the shores of Lake Victoria. I didn't fully escape my
			engineering education however, and coordinated a few construction projects including water
			supply for the dormitories and rehabilitation of some teacher housing.
		</p>
		<img class="picture" src="/peace-corps-windpump.jpg" alt="Repairing a windpump in Tanzania" />
	</section>
	<section id="south-sudan">
		<span class="title-block">
			<img class="icon" src="/msf-logo.png" alt="Doctors Without Borders running person logo" />
			<h3>Doctors Without Borders - South Sudan</h3>
		</span>
		<p>
			Between my Peace Corps experience and engineering background, I just managed to qualify for
			Doctors Without Borders (aka Médecins Sans Frontières), and spent 10 months in South Sudan as
			a Technical Logistician at a remote hospital. I've never had as challenging or rewarding of a
			job in my life, and I learned an incredible amount while being responsible for a huge range of
			both technical and managerial roles. I spent the last month as part of an outbreak response
			team, investigating and treating victims of a visceral leishmaniasis (Kala Azar) outbreak.
		</p>
		<img class="picture" src="/msf-rom-leaving.jpg" alt="Walking to the airstrip in Rom" />
	</section>
	<section id="haiti">
		<span class="title-block">
			<img class="icon" src="/msf-logo.png" alt="Doctors Without Borders running person logo" />
			<h3>Doctors Without Borders - Haiti</h3>
		</span>
		<p>
			After a devastating earthquake hit Haiti in early 2010, I joined MSF's emergency response,
			this time focusing on the construction and management side of things. For the first month, I
			helped build and run a medical clinic in one of the largest tent encampments in
			Port-au-Prince. I then transitioned to coordinating the construction of a replacement 120 bed
			emergency obstetrics hospital. I spent the last 6 months of my 13 month stay building and
			operating cholera treatment centers, as we transitioned to fighting the outbreak.
		</p>
		<img
			class="picture"
			src="/msf-haiti-construction.jpg"
			alt="A hospital under construction in Haiti"
		/>
	</section>
	<section id="oakland">
		<span class="title-block">
			<img class="icon" src="/sungevity-logo.png" alt="Sungevity Sfunstar logo" />
			<h3>Sungevity</h3>
		</span>
		<p>
			After spending most of my 20s out of the country, I was ready to stay in one place and find a
			more traditional line of work. My experiences in MSF had introduced me to various forms of
			renewable energy, and I decided to join the booming residential solar industry. I joined
			Sungevity as an entry level solar designer, but quickly transferred to the software team,
			utilizing my management, organization, and learn as I go skills to climb to the position of
			Director of Quality Assurance within 4 years. After trying out management for a year, I
			decided I like writing code too much to stop being an individual contributor, and moved to the
			DevOps team, where I remained until Sungevity unfortunately went bankrupt.
		</p>
		<img
			class="picture"
			src="/sungevity-solar-install.jpg"
			alt="Patrick doing a volunteer solar install with Sungevity"
		/>
	</section>
	<section id="colorado">
		<span class="title-block">
			<img class="icon" src="/catalyze-logo.png" alt="Catalyze basic logo" />
			<h3>Catalyze</h3>
		</span>
		<p>
			I joined Catalyze as the second employee, brought on to build out the software platform from
			scratch. Leveraging what I learned at Sungevity and my knack for figuring things out on the
			fly, I stood up our AWS infrastructure, databases, and Python APIs. I then dove into
			Javascript and built a front end GIS application for displaying crucial prospecting and site
			data for our sales and design teams. I also took the lead in designing our scrum and release
			processes, and helped hire and build out the highest functioning software team I've ever had
			the joy of working with.
		</p>
		<img class="picture" src="/catalyze-team-hike.jpg" alt="The Catalyze software team on a hike" />
	</section>
	<section id="summary">
		<span class="title-block">
			<span class="icon" style="padding-bottom: 0.35rem;">⛰️</span>
			<h3>What's next?</h3>
		</span>
		<p>
			After deciding to move on from Catalyze, I've taken a few months off to do some much needed
			house projects and explore a little more of Colorado. Now I'm looking for the next team to
			call home. I'm especially interested in climate tech and renewable energy, but I'd consider
			any organization working to make the world a better place.
		</p>
		<div class="columns">
			<div>
				<strong>Get in touch</strong>
				<p>
					<a target="_blank" rel="noopener" href="mailto:contact@maguire.engineering"
						>contact@maguire.engineering</a
					>
				</p>
			</div>
			<div>
				<strong>Learn more</strong>
				<ul>
					<li>
						<a target="_blank" rel="noopener" href="https://www.linkedin.com/in/patrick-maguire/"
							>LinkedIn</a
						>
					</li>
					<li>
						<a target="_blank" rel="noopener" href="https://github.com/pmaguire">Github</a>
					</li>
					<li>
						<a href="/blog">Blog</a>
					</li>
				</ul>
			</div>
		</div>
	</section>
</div>

<style>
	.columns {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		grid-gap: 1rem;
	}
	.scroller {
		position: relative;
		--scroller-base-height: 700px;
		--scroller-section-height: 1800px;
		--scroller-height: calc(var(--scroller-base-height) * 2 + var(--scroller-section-height) * 6);
		height: var(--scroller-height);
	}
	.map-wrap {
		top: var(--nav-height);
		left: 0;
		width: 100%;
		position: sticky;
		overflow: hidden;
	}
	.banner {
		position: absolute;
		margin-left: auto;
		margin-right: auto;
		left: 0;
		right: 0;
		text-align: center;
		z-index: 1;
		font-size: 2rem;
		letter-spacing: 0.7rem;
		font-weight: 600;
		opacity: 0.5;
		&.top {
			top: 1rem;
		}
		&.bottom {
			bottom: 2rem;
		}
	}
	.map {
		height: calc(100vh - var(--nav-height));
	}
	.title-block {
		display: flex;
		align-items: center;
		vertical-align: middle;
		& h3 {
			margin: 0 0.75rem;
		}
	}
	.icon {
		display: flex;
		align-items: center;
		vertical-align: middle;
		font-size: 2rem;
		height: 2rem;
		width: 2rem;
	}
	.picture {
		width: 100%;
		opacity: 0.8;
	}
	section {
		position: absolute;
		min-width: 280px;
		max-width: 50%;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		padding: 1rem;
		background: rgb(var(--background-3-rgb), 0.75);
		z-index: 2; /* Required to fix Safari issue */
	}
	@media (max-width: 800px) {
		section {
			max-width: 70%;
		}
	}
	@media (max-width: 550px) {
		section {
			max-width: 85%;
		}
	}
	@media (min-width: 1200px) {
		section {
			max-width: 600px;
		}
	}
	section:nth-of-type(1) {
		top: var(--scroller-base-height);
	}
	section:nth-of-type(2) {
		top: calc(var(--scroller-base-height) + var(--scroller-section-height));
	}
	section:nth-of-type(3) {
		top: calc(var(--scroller-base-height) + var(--scroller-section-height) * 2);
	}
	section:nth-of-type(4) {
		top: calc(var(--scroller-base-height) + var(--scroller-section-height) * 3);
	}
	section:nth-of-type(5) {
		top: calc(var(--scroller-base-height) + var(--scroller-section-height) * 4);
	}
	section:nth-of-type(6) {
		top: calc(var(--scroller-base-height) + var(--scroller-section-height) * 5);
	}
	section:nth-of-type(7) {
		top: calc(var(--scroller-height) - 100vh * 0.75);
	}
</style>
