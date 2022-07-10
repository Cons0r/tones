<script>
    import { opentenos } from "$lib/store";
    import Tab from "./Tab.svelte";
</script>

{#each $opentenos as teno (teno)}
<Tab {teno} />
{/each}