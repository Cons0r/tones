<script lang=ts>
    import tenos, { activeteno } from "$lib/store";
    import getContext from '$lib/context'
    const { closeteno, openteno } = getContext()
    import { fly } from "svelte/transition";
    import { derived } from "svelte/store";
    export let teno: string;
    const tenoobj = derived(tenos, (t) => {
        return t.find((t) => {
            return t.id === teno
            })
    })
</script>

<div transition:fly={{ y: 20, duration: 200 }} class="min-h-8 max-h-8 group overflow-x-visible rounded-t-md transition-colors inline whitespace-nowrap select-none" class:bg-base-300={teno === $activeteno} on:click={openteno($tenoobj)} on:contextmenu|preventDefault={closeteno(teno)}>
    <span class="text-sm inline">{$tenoobj?.title}</span>
    <button class="min-h-8 max-h-8 w-4 h-4 h mr-1 inline" on:click={closeteno(teno)}>
        <span class="block opacity-0 group-hover:opacity-100 transition-all hover:bg-base-100 rounded-md">
            &#x2715;
        </span>
    </button>
</div>