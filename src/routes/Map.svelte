<script>
	import { onMount, onDestroy } from 'svelte'
	import { Map, Popup } from 'mapbox-gl'
	import 'mapbox-gl/dist/mapbox-gl.css'
	import { theme } from '$lib/stores/theme'
	import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public'

	let map
	let mapContainer, topBanner, bottomBanner

	const locId1 = 'los-angeles'

	const locations = {
		'los-angeles': {
			center: [-118.285272, 34.020508],
			zoom: 13,
			topBanner: 'Los Angeles',
			bottomBanner: '2001 - 2005',
			// duration: 6000,
			// speed: 0.6,
		},
		tanzania: {
			center: [33.565264, -1.792723],
			zoom: 10,
			topBanner: 'Tanzania',
			bottomBanner: '2005 - 2007',
		},
		'south-sudan': {
			center: [33.057843, 8.610288],
			zoom: 7,
			topBanner: 'South Sudan',
			bottomBanner: '2009',
		},
		haiti: {
			center: [-72.299317, 18.554858],
			zoom: 11,
			topBanner: 'Haiti',
			bottomBanner: '2010 - 2011',
		},
		oakland: {
			center: [-122.274398, 37.793933],
			zoom: 13,
			topBanner: 'Oakland',
			bottomBanner: '2011 - 2017',
		},
		colorado: {
			center: [-105.204706, 40.071132],
			zoom: 13,
			topBanner: 'Colorado',
			bottomBanner: '2018 - Present',
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
						description:
							'<strong>USC</strong><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
					},
					geometry: {
						type: 'Point',
						coordinates: [-118.28532, 34.0211425],
					},
				},
				{
					type: 'Feature',
					properties: {
						description:
							'<strong>Kasoma Secondary School</strong><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
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
							'<strong>Nasir</strong><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
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
							'<strong>Rom</strong><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
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
							'<strong>Delmas 33 Emergency Obstetrics Hospital</strong><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
					},
					geometry: {
						type: 'Point',
						coordinates: [-72.299317, 18.554858],
					},
				},
				{
					type: 'Feature',
					properties: {
						description:
							'<strong>Carrefour Cholera Response</strong><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
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
							'<strong>Sungevity</strong><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
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
							'<strong>Catalyze</strong><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
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
				'circle-color': '#4264fb',
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
			center: locations[locId1].center,
			zoom: locations[locId1].zoom,
			interactive: false,
		})

		topBanner.innerHTML = locations[locId1].topBanner
		bottomBanner.innerHTML = locations[locId1].bottomBanner

		map.on(['style.load'], function () {
			addPoisLayer()
		})

		theme.subscribe(mode => {
			map.setStyle(`mapbox://styles/mapbox/${mode}-v11`)
		})

		await map.once('load')
		addPoisLayer()

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
			topBanner.innerHTML = locations[location].topBanner
			bottomBanner.innerHTML = locations[location].bottomBanner

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
	})

	onDestroy(() => {
		map.remove()
	})
</script>

<head> </head>

<div class="scroller">
	<div class="map-wrap">
		<div class="banners">
			<span class="banner top" bind:this={topBanner} />
			<span class="banner bottom" bind:this={bottomBanner} />
		</div>
		<div class="map" bind:this={mapContainer} />
	</div>
	<section id="los-angeles" class="active">
		<h3>Los Angeles</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Neque viverra justo nec ultrices dui sapien eget. Arcu dictum
			varius duis at. Aliquet nibh praesent tristique magna. Ipsum faucibus vitae aliquet nec
			ullamcorper sit amet risus. Felis bibendum ut tristique et egestas quis ipsum suspendisse
			ultrices. Enim ut sem viverra aliquet. Libero justo laoreet sit amet. Vitae semper quis lectus
			nulla at. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Vestibulum lorem sed risus
			ultricies tristique nulla aliquet enim tortor. Consequat mauris nunc congue nisi vitae
			suscipit. Pulvinar mattis nunc sed blandit libero volutpat. Ut venenatis tellus in metus
			vulputate eu scelerisque felis. Id leo in vitae turpis massa sed elementum. Nullam ac tortor
			vitae purus faucibus. Nulla facilisi etiam dignissim diam quis enim. Dapibus ultrices in
			iaculis nunc sed augue lacus viverra. Facilisi nullam vehicula ipsum a arcu cursus vitae
			congue mauris.
		</p>
	</section>
	<section id="tanzania">
		<h3>Tanzania</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Neque viverra justo nec ultrices dui sapien eget. Arcu dictum
			varius duis at. Aliquet nibh praesent tristique magna. Ipsum faucibus vitae aliquet nec
			ullamcorper sit amet risus. Felis bibendum ut tristique et egestas quis ipsum suspendisse
			ultrices. Enim ut sem viverra aliquet. Libero justo laoreet sit amet. Vitae semper quis lectus
			nulla at. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Vestibulum lorem sed risus
			ultricies tristique nulla aliquet enim tortor. Consequat mauris nunc congue nisi vitae
			suscipit. Pulvinar mattis nunc sed blandit libero volutpat. Ut venenatis tellus in metus
			vulputate eu scelerisque felis. Id leo in vitae turpis massa sed elementum. Nullam ac tortor
			vitae purus faucibus. Nulla facilisi etiam dignissim diam quis enim. Dapibus ultrices in
			iaculis nunc sed augue lacus viverra. Facilisi nullam vehicula ipsum a arcu cursus vitae
			congue mauris.
		</p>
	</section>
	<section id="south-sudan">
		<h3>South Sudan</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Neque viverra justo nec ultrices dui sapien eget. Arcu dictum
			varius duis at. Aliquet nibh praesent tristique magna. Ipsum faucibus vitae aliquet nec
			ullamcorper sit amet risus. Felis bibendum ut tristique et egestas quis ipsum suspendisse
			ultrices. Enim ut sem viverra aliquet. Libero justo laoreet sit amet. Vitae semper quis lectus
			nulla at. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Vestibulum lorem sed risus
			ultricies tristique nulla aliquet enim tortor. Consequat mauris nunc congue nisi vitae
			suscipit. Pulvinar mattis nunc sed blandit libero volutpat. Ut venenatis tellus in metus
			vulputate eu scelerisque felis. Id leo in vitae turpis massa sed elementum. Nullam ac tortor
			vitae purus faucibus. Nulla facilisi etiam dignissim diam quis enim. Dapibus ultrices in
			iaculis nunc sed augue lacus viverra. Facilisi nullam vehicula ipsum a arcu cursus vitae
			congue mauris.
		</p>
	</section>
	<section id="haiti">
		<h3>Haiti</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Neque viverra justo nec ultrices dui sapien eget. Arcu dictum
			varius duis at. Aliquet nibh praesent tristique magna. Ipsum faucibus vitae aliquet nec
			ullamcorper sit amet risus. Felis bibendum ut tristique et egestas quis ipsum suspendisse
			ultrices. Enim ut sem viverra aliquet. Libero justo laoreet sit amet. Vitae semper quis lectus
			nulla at. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Vestibulum lorem sed risus
			ultricies tristique nulla aliquet enim tortor. Consequat mauris nunc congue nisi vitae
			suscipit. Pulvinar mattis nunc sed blandit libero volutpat. Ut venenatis tellus in metus
			vulputate eu scelerisque felis. Id leo in vitae turpis massa sed elementum. Nullam ac tortor
			vitae purus faucibus. Nulla facilisi etiam dignissim diam quis enim. Dapibus ultrices in
			iaculis nunc sed augue lacus viverra. Facilisi nullam vehicula ipsum a arcu cursus vitae
			congue mauris.
		</p>
	</section>
	<section id="oakland">
		<h3>Oakland</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Neque viverra justo nec ultrices dui sapien eget. Arcu dictum
			varius duis at. Aliquet nibh praesent tristique magna. Ipsum faucibus vitae aliquet nec
			ullamcorper sit amet risus. Felis bibendum ut tristique et egestas quis ipsum suspendisse
			ultrices. Enim ut sem viverra aliquet. Libero justo laoreet sit amet. Vitae semper quis lectus
			nulla at. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Vestibulum lorem sed risus
			ultricies tristique nulla aliquet enim tortor. Consequat mauris nunc congue nisi vitae
			suscipit. Pulvinar mattis nunc sed blandit libero volutpat. Ut venenatis tellus in metus
			vulputate eu scelerisque felis. Id leo in vitae turpis massa sed elementum. Nullam ac tortor
			vitae purus faucibus. Nulla facilisi etiam dignissim diam quis enim. Dapibus ultrices in
			iaculis nunc sed augue lacus viverra. Facilisi nullam vehicula ipsum a arcu cursus vitae
			congue mauris.
		</p>
	</section>
	<section id="colorado">
		<h3>Colorado</h3>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Neque viverra justo nec ultrices dui sapien eget. Arcu dictum
			varius duis at. Aliquet nibh praesent tristique magna. Ipsum faucibus vitae aliquet nec
			ullamcorper sit amet risus. Felis bibendum ut tristique et egestas quis ipsum suspendisse
			ultrices. Enim ut sem viverra aliquet. Libero justo laoreet sit amet. Vitae semper quis lectus
			nulla at. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Vestibulum lorem sed risus
			ultricies tristique nulla aliquet enim tortor. Consequat mauris nunc congue nisi vitae
			suscipit. Pulvinar mattis nunc sed blandit libero volutpat. Ut venenatis tellus in metus
			vulputate eu scelerisque felis. Id leo in vitae turpis massa sed elementum. Nullam ac tortor
			vitae purus faucibus. Nulla facilisi etiam dignissim diam quis enim. Dapibus ultrices in
			iaculis nunc sed augue lacus viverra. Facilisi nullam vehicula ipsum a arcu cursus vitae
			congue mauris.
		</p>
	</section>
</div>

<style>
	.scroller {
		position: relative;
		height: 10000px;
	}
	.map-wrap {
		top: var(--nav-height);
		left: 0;
		width: 100vw;
		position: sticky;
		overflow: hidden;
		margin-left: calc(-1 * var(--outside-margin));
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
		opacity: 0.4;
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
	section {
		position: absolute;
		min-width: 280px;
		max-width: 50%;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		padding: 1rem;
		background: rgb(var(--background-3-rgb), 0.5);
	}
	section:nth-of-type(1) {
		top: 1000px;
	}
	section:nth-of-type(2) {
		top: 2500px;
	}
	section:nth-of-type(3) {
		top: 4000px;
	}
	section:nth-of-type(4) {
		top: 5500px;
	}
	section:nth-of-type(5) {
		top: 7000px;
	}
	section:nth-of-type(6) {
		top: 8500px;
	}
</style>
