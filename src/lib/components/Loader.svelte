<script lang="ts">
	export let isLoading: boolean = false;
</script>

{#if isLoading === true}
	<div class="absolute inset-0 flex items-center justify-center w-full h-full bg-white">
		<div class="flex flex-col items-center justify-center">
			<h2 class="text-xl font-text text-blue">Chargement...</h2>
			<div class="relative w-8 h-8 border-4 rounded-full animate-spin border-purple">
				<div
					class="absolute top-[50%] left-[50%] z-50 w-5 h-1 border-4 border-white rounded-full"
				></div>
			</div>
		</div>
	</div>
{/if}
