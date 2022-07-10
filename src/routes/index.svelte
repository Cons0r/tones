<script lang=ts>
    import { tenos, opentenos, activeteno, renamingteno, editoroptions, activetenoind, type Teno } from "$lib/store";
    activeteno.subscribe((a) => {
        activetenoind.set($tenos.findIndex((v) => v?.id === a))
    })

    import { writable } from "svelte/store"
    const dividex = writable(true)
    import SvelteMarkdown from 'svelte-markdown'
    import { getModalContext } from "@mavthedev/svodals";
    const { addModal } = getModalContext()

    // const tenoinputelem = writable({

    // })

    function createteno() {
        return () => {
            tenos.update(t => {
                const teno = {
                    title: "",
                    body: "",
                    date: Date.now(),
                    id: crypto.randomUUID()
                }
                t.push(teno)
                activeteno.set(teno.id)
                renamingteno.set(teno.id)
                return t
            })
        }
    }


    function openteno(teno: Teno | undefined) {
        return (e: MouseEvent) => {
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
            renamingteno.set(teno.id)
        }
    }

    function closeteno(id: string) {
        return () => {
            opentenos.update((o) => {
                if(!findteno(id)) return o
                const teno = o.findIndex((t) => t === id)
                if(teno === -1) return o
                delete o[teno]
                // this works better than i thought it would
                activeteno.set(o[teno-1])
                return o.filter((v) => !!v)
            })
        }
    }


    function removeteno(id: string) {
        return () => {
            tenos.update((t) => {
                closeteno(id)()
                const teno = t.findIndex((te) => te.id === id)
                delete t[teno]
                return t.filter((v) => !!v)
            })
        }
    }

    function asktoremove(id) {
        return () => {
            addModal('delete', d => {
                if(!d) return
                removeteno(id)()
            }, {
                teno: findteno(id)
            })
        }
    } 

    function keydown(e: KeyboardEvent) {
        if($renamingteno !== false && typeof $renamingteno !== 'boolean' && e.key === "Enter") {
            if(findteno($renamingteno)?.title.length === 0) removeteno($renamingteno)()
            renamingteno.set(false)
        }
    }

    function findteno(id: string, arr = $tenos) {
        return arr.find((t) => {
            return t.id === id
        })
    }

    function swapdivide() {
        const divide = !$dividex?'x':'y'
        dividex.set(!$dividex)
        editoroptions.update(e => {
            e.divide = divide
            return e
        })
    }
</script>

<div class="flex flex-row w-full h-full">
    <div class="w-40 flex flex-col divide-y-2 pt-8">
        {#each $tenos as teno}
            <div class="flex flex-row" on:click|preventDefault={openteno(teno)} on:contextmenu|preventDefault={asktoremove(teno.id)} on:dblclick={renameteno(teno)}>
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
    <div class="flex-grow flex flex-col max-w-[90%]">
        <div class="flex-shrink flex flex-row min-h-8 max-h-8 overflow-x-scroll overflow-y-clip hide-bar">
            {#each $opentenos as teno }
                {@const tenoobj = $tenos.find((t) => {
                    return t.id === teno
                })}
                <div class="min-h-8 max-h-8 group overflow-x-visible rounded-t-md transition-colors inline whitespace-nowrap select-none" class:bg-base-300={teno === $activeteno} on:click={openteno(tenoobj)} on:contextmenu|preventDefault={closeteno(teno)}>
                    <span class="text-sm inline">{tenoobj?.title}</span>
                    <button class="min-h-8 max-h-8 w-4 h-4 h mr-1 inline" on:click={closeteno(teno)}>
                        <span class="block opacity-0 group-hover:opacity-100 transition-all hover:bg-base-100 rounded-md">
                            &#x2715;
                        </span>
                    </button>
                </div>
            {/each}
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
        {#if $activeteno?.length}
            <div class="bg-base-300 h-full flex" class:flex-row={$editoroptions.divide === 'x'}  class:flex-col={$editoroptions.divide === 'y'}>
                <div class="absolute right-0 flex flex-row bg-base-100 rounded-bl-lg p-2 divide-x-2 divide-transparent">
                    <span class="text-base-content">Created {new Date($tenos[$activetenoind].date).toDateString()}</span>
                </div>
                <textarea bind:value={$tenos[$activetenoind].body} class="flex-grow resize-none w-[50%] bg-base-300 border-base-content" class:w-[50%]={$editoroptions.divide === 'x'} class:h-[50%]={$editoroptions.divide === 'y'} class:border-r={$editoroptions.divide === 'x'} class:border-b={$editoroptions.divide === 'y'}></textarea>
                <div class="prose flex-grow resize-none border-base-content" class:w-[50%]={$editoroptions.divide === 'x'} class:h-[50%]={$editoroptions.divide === 'y'} class:min-w-full={$editoroptions.divide === 'y'} class:border-l={$editoroptions.divide === 'x'} class:border-t={$editoroptions.divide === 'y'}>
                    <SvelteMarkdown source={$tenos[$activetenoind].body} />
                </div>
            </div>
        {:else}
            <div class="flex bg-base-300 items-center h-full justify-center">
                No teno selected
            </div>
        {/if}
    </div>
</div>

<svelte:window on:keydown={keydown}></svelte:window>