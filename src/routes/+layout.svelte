<script>
	import Menu from '$lib/components/menu.svelte';
	import '../app.css';
</script>

<div class="h-full px-4 py-4">
	<Menu />
	<slot />
</div>
