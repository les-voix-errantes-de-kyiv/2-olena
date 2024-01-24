<script>
	import IconBar3 from '$lib/components/icons/mini/bar-3.svelte';
	import IconX from '$lib/components/icons/mini/x.svelte';
	import { steps } from '$lib/map';

	let isMenuOpen = false;
</script>

{#if isMenuOpen}
	<button
		on:click={() => (isMenuOpen = false)}
		class="fixed top-4 right-2 z-20 padding-4 border border-white rounded-full p-2 text-white hover:bg-white hover:text-purple"
	>
		<IconX />
	</button>
	<div class="fixed top-0 left-0 z-10 h-screen w-full bg-purple">
		<nav class="container h-full flex flex-col gap-4 justify-center items-center text-white">
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
						href={`/map?step=${index}`}
						on:click={() => (isMenuOpen = false)}
						class="text-2xl font-text mt-2 -mb-2 hover:underline"
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
		class="fixed top-4 right-2 z-20 padding-4 border border-purple rounded-full p-2 text-purple hover:bg-purple hover:text-white"
	>
		<IconBar3 />
	</button>
{/if}
