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

<style>
	footer {
		transition: var(--transtion-std);
		border-top: var(--header-footer-border);
		height: var(--footer-height);
		display: flex;
		justify-content: space-between;
		background: var(--background-1);
		align-items: center;
		padding: 0 var(--outside-padding);
	}
</style>
