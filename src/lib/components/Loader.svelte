<script lang="ts">
	export let isLoading: boolean = false;
	export let progress: number | null;
</script>

{#if isLoading === true}
	<div class="absolute inset-0 z-50 flex h-full w-full items-center justify-center bg-white">
		<div class="flex flex-col items-center justify-center font-text text-xl text-blue">
			<h2 class="">Chargement ...</h2>
			<p>{progress}%</p>
			<div class="relative mt-1 h-8 w-8 animate-spin rounded-full border-4 border-purple">
				<div
					class="absolute left-[50%] top-[50%] z-50 h-1 w-5 rounded-full border-4 border-white"
				></div>
			</div>
		</div>
	</div>
{/if}
