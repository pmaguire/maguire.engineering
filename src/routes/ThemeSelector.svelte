<script>
	import { onMount } from 'svelte'
	import { theme } from '$lib/stores/theme'
	import tooltip from '$lib/tooltip'

	let loaded = false

	let moonRotation = $theme === 'light' ? 0 : 180
	let sunRotation = $theme === 'light' ? 180 : 0

	function click() {
		$theme = $theme === 'light' ? 'dark' : 'light'
		moonRotation += 180
		sunRotation += 180
	}

	onMount(() => {
		loaded = true
	})
</script>

<button on:click={click} title="Enable {$theme === 'light' ? 'dark' : 'light'} mode" use:tooltip>
	{#if loaded}
		<span class="sun {$theme}" style="transform: rotate({sunRotation}deg)">🌞</span>
		<span class="moon {$theme}" style="transform: rotate({moonRotation}deg)">🌒</span>
	{/if}
	<div class="horizon" />
</button>

<style>
	button {
		width: 1.75rem;
		display: inline-grid;
		margin-left: 0.5rem;
	}

	span {
		grid-area: inner-span;

		transform-origin: center bottom;
		font-size: 1.75rem;
	}

	span:hover {
		filter: invert(25%);
	}

	.horizon {
		width: 6rem;
		height: 0.75rem;
		background-color: var(--background-1);
		z-index: 4;
		position: absolute;
		bottom: 0;
		right: 0;
		transition: var(--transition-std);
	}

	.sun.light,
	.moon.dark {
		opacity: 0;
		transition:
			transform var(--transition-time),
			opacity var(--transition-time) cubic-bezier(0.12, 0.95, 0, 1),
			filter var(--hover-transition-time);
	}

	.sun.dark,
	.moon.light {
		opacity: 1;
		transition:
			transform var(--transition-time),
			opacity var(--transition-time) cubic-bezier(0.76, 0.02, 0.48, 0.01),
			filter var(--hover-transition-time);
	}
</style>
