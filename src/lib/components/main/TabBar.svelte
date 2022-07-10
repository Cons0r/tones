<script lang=ts>
    import getContext from "$lib/context";
    const { swapdivide } = getContext()
    import { dividex } from "$lib/store";
    import TabList from "./TabList.svelte";
</script>

<div class="flex-shrink flex flex-row min-h-8 max-h-8 overflow-x-scroll overflow-y-clip hide-bar z-5">
    <TabList />
    <div class="w-20 h-8 absolute right-0 flex items-center justify-center bg-base-300" on:click={swapdivide}>
        <div class="swap cursor-pointer">
            <input type="checkbox" bind:checked={$dividex}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 swap-off" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 rotate-90 swap-on" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
            </svg>
        </div>
    </div>
</div>