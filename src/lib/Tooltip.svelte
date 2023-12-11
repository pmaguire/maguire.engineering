<script lang="ts">
	export let title: string, evt: MouseEvent
</script>

<div
	data-cy="tooltip"
	style="{window.innerHeight - evt.y > 100
		? `top: ${evt.pageY + 20}px;`
		: `bottom: ${window.innerHeight - evt.pageY + 20}px;`}; {window.innerWidth - evt.x > 100
		? `left: ${evt.pageX + 12}px;`
		: `right: ${window.innerWidth - evt.pageX + 12}`}px;"
>
	{title}
</div>

<style>
	div {
		font-size: 0.8em;
		border: 1px solid #ddd;
		box-shadow: 1px 1px 1px #ddd;
		background-color: var(--background-1);
		border-radius: 4px;
		padding: 4px;
		position: absolute;
		z-index: 10;
	}
</style>
