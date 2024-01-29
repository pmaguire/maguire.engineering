<script>
	import { onNavigate } from '$app/navigation'
	import Header from './Header.svelte'
	import Footer from './Footer.svelte'
	import { theme } from '$lib/stores/theme'
	import './styles.css'
	import { browser } from '$app/environment'

	function setMode() {
		if (browser) {
			document.body.classList.remove('light-mode')
			document.body.classList.remove('dark-mode')
			document.body.classList.add(`${$theme}-mode`)
		}
	}

	theme.subscribe(() => setMode())
	setMode()

	// Basic view transition. Should only work in chromium at this point.
	onNavigate(navigation => {
		if (!document.startViewTransition) return
		return new Promise(resolve => {
			document.startViewTransition(async () => {
				resolve()
				await navigation.complete
			})
		})
	})
</script>

<div class="primary">
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
	.primary {
		padding-top: var(--nav-height);
	}
	main {
		background-color: var(--background-2);
		min-height: calc(100vh - var(--nav-height) - var(--footer-height) - var(--outside-padding) * 2);
		transition: var(--transition-std);
	}
	main:not(:has(.map-wrap)) {
		max-width: 800px;
		margin: 0 auto;
		padding: var(--outside-padding);
	}
</style>
