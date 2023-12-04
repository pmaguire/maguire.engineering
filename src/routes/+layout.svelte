<script>
	import Header from './Header.svelte'
	import { theme } from '$lib/stores/theme'
	import './styles.css'
</script>

<div class="primary {$theme + '-mode'}">
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
			• © {new Date().getFullYear()}
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
		padding: 0 2rem;
	}

	.primary {
		padding-top: var(--nav-height);
	}

	main {
		background-color: var(--background-2);
		padding: 2rem;
	}
</style>
