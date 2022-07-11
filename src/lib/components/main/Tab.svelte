<script lang=ts>
    import tenos, { activeteno } from "$lib/store";
    import getContext from '$lib/context'
    const { closeteno, openteno } = getContext()
    import { fly } from "svelte/transition";
    import { derived } from "svelte/store";
    export let teno: string;
    const tenoobj = derived(tenos, (t) => {
        const newteno = t.find((t) => {
            return t.id === teno
        })
        return newteno
    })
    const prev = derived(tenoobj, (t) => t)
</script>

<div transition:fly={{ y: 20, duration: 200 }} class="z-6 min-h-8 max-h-8 px-2 group overflow-x-visible rounded-t-md transition-colors inline whitespace-nowrap select-none" data-tip="Right Click to close" class:bg-base-300={teno === $activeteno} on:click={openteno($tenoobj)} on:contextmenu|preventDefault={closeteno(teno)}>
    <span class="text-sm inline peer">{$tenoobj?.title}</span>
</div>
