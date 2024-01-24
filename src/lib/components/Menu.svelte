<script>
	import IconBar3 from '$lib/components/icons/mini/bar-3.svelte';
	import IconX from '$lib/components/icons/mini/x.svelte';
	import { steps } from '$lib/map';

	let isMenuOpen = false;
</script>

{#if isMenuOpen}
	<button
		on:click={() => (isMenuOpen = false)}
		class="fixed z-20 p-2 text-white border border-white rounded-full top-4 right-2 padding-4 hover:bg-white hover:text-purple"
	>
		<IconX />
	</button>
	<div class="fixed top-0 left-0 z-10 w-full h-screen bg-purple">
		<nav class="container flex flex-col items-center justify-center h-full gap-4 text-white">
			<a href="/" on:click={() => (isMenuOpen = false)} class="text-4xl font-title hover:underline">
				Accueil
			</a>

			<a
				href="/rooms"
				on:click={() => (isMenuOpen = false)}
				class="text-4xl font-title hover:underline"
			>
				Chez Olena
			</a>

			<div class="flex flex-col gap-2 justify-center items-center">
				<a
					href="/map"
					on:click={() => (isMenuOpen = false)}
					class="text-4xl font-title hover:underline"
				>
					Le périple
				</a>

				{#each steps as step, index}
					<a
						href="#"
						on:click={() => {
							isMenuOpen = false;
							window.location.href = `/map?step=${index}`;
						}}
						class="mt-2 -mb-2 text-2xl font-text hover:underline"

					>
						{step.menuName}
					</a>
				{/each}
			</div>

			<a
				href="/credits"
				on:click={() => (isMenuOpen = false)}
				class="text-4xl font-title hover:underline"
			>
				Crédits
			</a>
		</nav>
	</div>
{:else}
	<button
		on:click={() => (isMenuOpen = true)}
		class="fixed z-20 p-2 bg-white border rounded-full top-4 right-2 padding-4 border-purple text-purple hover:bg-purple hover:text-white"
	>
		<IconBar3 />
	</button>
{/if}
