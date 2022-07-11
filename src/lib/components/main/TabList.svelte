<script>
    import { opentenos } from "$lib/store";
    import Tab from "./Tab.svelte";
</script>

<div class="w-[90%] min-h-full flex flex-row">
    {#each $opentenos as teno (teno)}
        <Tab {teno} />
    {/each}
</div>