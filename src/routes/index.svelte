<script lang=ts>
    import { tones, opentones, activetone, renamingtone, type Tone } from "$lib/store";

    function createtone() {
        return () => {
            tones.update(t => {
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

    opentones.subscribe(console.log)

    function opentone(tone: Tone) {
        return () => {
            console.log('din din')
            activetone.set(tone.id)
            opentones.update((o) => {
                if(o.find((t) => t === tone.id)) return o
                o.push(tone.id)
                return o
            })
        }
    }

    function renametone(tone: Tone) {
        return () => {
            console.log('breakfast')
            renamingtone.set(tone.id)
        }
    }

    function closetone(id) {
        return () => {
            opentones.update((o) => {
                if(!findtone(id)) return o
                const tone = o.findIndex((t) => t === id)
                if(tone === -1) return o
                delete o[tone]
                return o.filter((v) => !!v)
            })
        }
    }

    function keydown(e) {
        if($renamingtone && e.key === "Enter") {
            renamingtone.set(false)
        }
    }

    function findtone(id, arr? = $tones) {
        return $tones.find((t) => {
            return t.id === id
        })
    }
</script>

<div class="flex flex-row w-full h-full">
    <div class="w-40 flex flex-col divide-y-2">
        {#each $tones as tone}
            <div class="flex flex-row" on:click={opentone(tone)} on:dblclick={renametone(tone)}>
                <input type="text" bind:value={tone.title} disabled={$renamingtone !== tone.id} placeholder="(no title)" class="input bg-trasparent rounded-none input-sm w-full max-w-xs placeholder:text-error" />
                {#if tone?.pin}
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
        <button class="flex flex-col items-center text-base opacity-25 hover:opacity-50 transition-opacity" on:click={createtone()}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Tone</span>
        </button>
    </div>
    <div class="flex-grow flex flex-col">
        <div class="flex-shrink flex flex-row">
            {#each $opentones as tone }
            {@const toneobj = findtone(tone)}
            <div class="min-h-8 group">
                <span class="text-sm">{toneobj?.title}</span>
                <button class="w-4 h-4 mr-1" on:click={closetone(tone)}>
                    <span class="hidden group-hover:inline">
                        &#x2715;
                    </span>
                </button>
            </div>
            {/each}
        </div>
        {#if $activetone.length}
        <div>E</div>
        {:else}
        <div class="flex items-center justify-center">
            No Tone selected
        </div>
        {/if}
    </div>
</div>

<svelte:window on:keydown={keydown}></svelte:window>