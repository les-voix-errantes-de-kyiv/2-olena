<script>
	import IconBar3 from '$lib/components/icons/mini/bar-3.svelte';
	import IconX from '$lib/components/icons/mini/x.svelte';
	import { steps } from '$lib/map';

	let isMenuOpen = false;
</script>

{#if isMenuOpen}
	<button
		on:click={() => (isMenuOpen = false)}
		class="padding-4 fixed right-2 top-4 z-20 rounded-full border border-white p-2 text-white hover:bg-white hover:text-purple"
	>
		<IconX />
	</button>
	<div class="fixed left-0 top-0 z-10 h-screen w-full bg-purple">
		<nav class="container flex h-full flex-col items-center justify-center gap-4 text-white">
			<a href="/" on:click={() => (isMenuOpen = false)} class="font-title text-4xl hover:underline">
				Accueil
			</a>

			<a
				href="/rooms"
				on:click={() => (isMenuOpen = false)}
				class="font-title text-4xl hover:underline"
			>
				Chez Olena
			</a>

			<div class="flex flex-col items-center justify-center gap-2">
				<a
					href="/map"
					on:click={() => (isMenuOpen = false)}
					class="font-title text-4xl hover:underline"
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
						class="-mb-2 mt-2 font-text text-2xl hover:underline"
					>
						{step.city}
					</a>
				{/each}
			</div>

			<a
				href="/credits"
				on:click={() => (isMenuOpen = false)}
				class="font-title text-4xl hover:underline"
			>
				Crédits
			</a>
		</nav>
	</div>
{:else}
	<button
		on:click={() => (isMenuOpen = true)}
		class="padding-4 fixed right-2 top-4 z-20 rounded-full border border-purple bg-white p-2 text-purple hover:bg-purple hover:text-white"
	>
		<IconBar3 />
	</button>
{/if}
