<script lang=ts>
    import getContext from "$lib/context";
    const { createteno } = getContext()
    import TenoList from "./TenoList.svelte";
</script>

<div class="max-w-[15%] min-w-[15%] w-[15%] flex flex-col divide-y-2 pt-8">
    <TenoList />
    <button class="flex flex-col items-center text-base opacity-25 hover:opacity-50 transition-opacity" on:click={createteno()}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        <span>Create teno</span>
    </button>
</div>