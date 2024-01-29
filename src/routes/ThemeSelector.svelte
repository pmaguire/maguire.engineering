<script>
	import { theme } from '$lib/stores/theme'
	import tooltip from '$lib/tooltip'

	let moonRotation = $theme === 'light' ? 0 : 180
	let sunRotation = $theme === 'light' ? 180 : 0

	function click() {
		$theme = $theme === 'light' ? 'dark' : 'light'
		moonRotation += 180
		sunRotation += 180
	}
</script>

<button on:click={click} title="Enable {$theme === 'light' ? 'dark' : 'light'} mode" use:tooltip>
	<span class="sun {$theme}" style="transform: rotate({sunRotation}deg)">🌞</span>
	<span class="moon {$theme}" style="transform: rotate({moonRotation}deg)">🌒</span>
	<div class="horizon" />
</button>

<style>
	button {
		vertical-align: middle;
		width: 2rem;
		height: 2rem;
		display: inline-grid;
		place-items: center;
		grid-template-areas: 'inner-span';
	}

	span {
		grid-area: inner-span;
		width: 1rem;
		transition:
			transform var(--transition-time),
			opacity var(--transition-time),
			filter var(--hover-transition-time);
		transform-origin: center bottom;
	}

	span:hover {
		filter: invert(25%);
	}

	.horizon {
		width: 2.5rem;
		height: 1rem;
		background-color: var(--background-1);
		z-index: 4;
		position: absolute;
		bottom: 0.25rem;
		transition: var(--transition-std);
	}

	.sun.light,
	.moon.dark {
		opacity: 0;
	}
</style>
