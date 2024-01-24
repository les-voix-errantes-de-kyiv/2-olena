<script>
	import IconBar3 from '$lib/components/icons/mini/bar-3.svelte';
	import IconX from '$lib/components/icons/mini/x.svelte';

	let isMenuOpen = false;
</script>

{#if isMenuOpen}
	<button
		on:click={() => (isMenuOpen = false)}
		class="fixed top-4 right-2 z-20 padding-4 border border-white rounded-full p-2 text-white"
	>
		<IconX />
	</button>
	<div class="fixed top-0 left-0 z-10 h-screen w-full bg-purple">
		<nav class="container h-full flex flex-col gap-4 justify-center items-center text-white">
			<a href="/" class="text-4xl font-title">Accueil</a>
			<a href="/map" class="text-4xl font-title">Le périple</a>
			<a href="/credits" class="text-4xl font-title">Crédits</a>
		</nav>
	</div>
{:else}
	<button
		on:click={() => (isMenuOpen = true)}
		class="fixed top-4 right-2 z-20 padding-4 border border-purple rounded-full p-2 text-purple"
	>
		<IconBar3 />
	</button>
{/if}
