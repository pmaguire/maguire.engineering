<script>
	import Header from './Header.svelte'
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
</script>

<div class="primary">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>
			Designed & Built by Patrick Maguire with ♥️ and <a
				target="_blank"
				rel="noopener"
				href="https://kit.svelte.dev/">SvelteKit</a
			>
			• © 2023 - {new Date().getFullYear()}
		</p>
	</footer>
</div>

<style>
	footer {
		height: var(--footer-height);
		display: flex;
		justify-content: space-between;
		background: var(--background-1);
		align-items: center;
		padding: 0 var(--outside-padding);
	}

	.primary {
		padding-top: var(--nav-height);
	}

	main {
		background-color: var(--background-2);
	}
</style>
