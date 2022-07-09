<script lang=ts>
    import { tenos, opentenos, activeteno, renamingteno, type Teno } from "$lib/store";
    import { writable } from "svelte/store";

    const tenoinputelem = writable({

    })

    function createteno() {
        return () => {
            tenos.update(t => {
                t.push({
                    title: "",
                    body: "",
                    date: new Date().getDate(),
                    id: crypto.randomUUID()
                })
                return t
            })
        }
    }

    opentenos.subscribe(console.log)

    function openteno(teno: Teno | undefined) {
        return () => {
            if(!teno) throw new Error('Teno was undefined')
            activeteno.set(teno.id)
            opentenos.update((o) => {
                if(o.find((t) => t === teno.id)) return o
                o.push(teno.id)
                return o
            })
        }
    }

    function renameteno(teno: Teno | undefined) {
        return () => {
            if(!teno) throw new Error('Teno was undefined')
            console.log('breakfast')
            renamingteno.set(teno.id)
        }
    }

    function closeteno(id: string) {
        return (e: MouseEvent) => {
            opentenos.update((o) => {
                if(!findteno(id)) return o
                const teno = o.findIndex((t) => t === id)
                if(teno === -1) return o
                delete o[teno]
                return o.filter((v) => !!v)
            })
            e.target?.focus()
        }
    }

    function keydown(e: KeyboardEvent) {
        if($renamingteno && e.key === "Enter") {
            renamingteno.set(false)
        }
    }

    function findteno(id: string, arr = $tenos) {
        return arr.find((t) => {
            return t.id === id
        })
    }
</script>

<div class="flex flex-row w-full h-full">
    <div class="w-40 flex flex-col divide-y-2">
        {#each $tenos as teno}
            <div class="flex flex-row" on:click={openteno(teno)} on:dblclick={renameteno(teno)}>
                <input type="text" bind:value={teno.title} disabled={$renamingteno !== teno.id} placeholder="(no title)" class="input bg-trasparent rounded-none input-sm w-full max-w-xs placeholder:text-error" />
                {#if teno?.pin}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                {:else}
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                {/if}
            </div>
        {/each}
        <button class="flex flex-col items-center text-base opacity-25 hover:opacity-50 transition-opacity" on:click={createteno()}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Create teno</span>
        </button>
    </div>
    <div class="flex-grow flex flex-col">
        <div class="flex-shrink flex flex-row min-h-8">
            {#each $opentenos as teno }
                {@const tenoobj = $tenos.find((t) => {
                    return t.id === teno
                })}
                <div class="min-h-8 group rounded-t-md transition-colors" class:bg-base-300={teno === $activeteno} on:click={openteno(tenoobj)}>
                    <span class="text-sm">{tenoobj?.title}</span>
                    <button class="w-4 h-4 mr-1" on:click={closeteno(teno)}>
                        <span class="hidden group-hover:inline">
                            &#x2715;
                        </span>
                    </button>
                </div>
            {/each}
        </div>
        {#if $activeteno?.length}
            <div class="bg-base-300 h-full">
                E
            </div>
        {:else}
            <div class="flex bg-base-300 items-center h-full justify-center">
                No teno selected
            </div>
        {/if}
    </div>
</div>

<svelte:window on:keydown={keydown}></svelte:window>