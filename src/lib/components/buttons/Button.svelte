<script lang="ts">
	export let url: string;
</script>

<a
	href={url}
	class="w-full py-4 font-bold text-center text-white font-title bg-purple md:w-fit md:px-12"
	><slot /></a
>
