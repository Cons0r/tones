<script lang=ts>
    import type { Teno } from "$lib/store";
    import getContext from '$lib/context'
    const { openteno, lockmodal, asktoremove, renameteno } = getContext()
    import tenos, { renamingteno } from '$lib/store'
    export let teno: Teno
    let input: HTMLInputElement;

    function wrap() {
        return () => {
            input.select()
            renameteno(teno)
        }
    }

    function setval(e) {
        tenos.update((t) => {
            const tempteno = t.findIndex((v) => teno.id === v.id)
            t[tempteno] = teno
            return t
        })
    }
</script>

<div class="flex flex-row select-none" on:click|preventDefault={openteno(teno)} on:contextmenu|preventDefault={asktoremove(teno.id)} on:dblclick={wrap()}>
    <input type="text" bind:this={input} bind:value={teno.title} on:change={setval} disabled={$renamingteno !== teno.id} placeholder="(no title)" class="input bg-trasparent rounded-none input-sm w-full max-w-xs placeholder:text-error" />
    {#if teno?.pin}
        <svg on:click={lockmodal(teno)} xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    {:else}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
    {/if}
</div>