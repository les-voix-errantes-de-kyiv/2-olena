<script lang="ts">
	export let url: string;
</script>

<a
	href={url}
	class="flex items-center justify-center w-full gap-4 py-4 font-bold text-center text-white font-title bg-purple md:w-fit md:px-12"
	><slot /></a
>
