<script lang="ts">
	export let isLoading: boolean = false;
	export let progress: number | null;
</script>

{#if isLoading === true}
	<div class="absolute inset-0 z-50 flex items-center justify-center w-full h-full bg-white">
		<div class="flex flex-col items-center justify-center text-xl font-text text-blue">
			<h2 class="">Chargement ...</h2>
			<p>{progress}%</p>
			<div class="relative w-8 h-8 mt-1 border-4 rounded-full animate-spin border-purple">
				<div
					class="absolute top-[50%] left-[50%] z-50 w-5 h-1 border-4 border-white rounded-full"
				></div>
			</div>
		</div>
	</div>
{/if}
