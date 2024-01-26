<script lang="ts">
	export let isLoading: boolean = false;
	export let progress: number | null;
</script>

{#if isLoading === true}
	<div class="absolute inset-0 z-40 flex items-center justify-center w-full h-full bg-white">
		<div class="flex flex-col items-center justify-center text-xl font-text text-blue">
			<h2 class="">Chargement ...</h2>
			{#if progress}
				<p>{Math.round(progress)}%</p>
			{/if}
			<div class="relative w-8 h-8 mt-1 border-4 rounded-full animate-spin border-purple">
				<div
					class="absolute left-[50%] top-[50%] z-50 h-1 w-5 rounded-full border-4 border-white"
				></div>
			</div>
		</div>
	</div>
{/if}
