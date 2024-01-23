<script>
	import { page } from '$app/stores'
</script>

<div class="error">
	<h1>{$page.status}</h1>
	<p>
		{$page.error.message}
	</p>
</div>

<style>
	.error {
		padding: var(--outside-padding);
	}
</style>
