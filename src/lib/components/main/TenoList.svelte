<script>
    import { tenos } from "$lib/store";
    import Teno from "./Teno.svelte";
</script>

{#each $tenos as teno}
    <Teno {teno} />
{/each}