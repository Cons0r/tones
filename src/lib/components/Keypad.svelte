
<script lang=ts>
    import { createEventDispatcher } from "svelte";
    import { writable } from "svelte/store";
    const input = writable("")

    const dispatch = createEventDispatcher()
    function ok() {
        dispatch('ok', {
            $input
        })
        clear()
    }

    function addnum(num: string) {
        return () => {
            input.update(i => {
                return i.concat(num.toString())
            })
        }
    }
    
    function removenum() {
        input.update(i => {
            return i.slice(0, i.length - 1)
        })
    }

    function clear() {
        $input = ""
    }
</script>

<div class="flex flex-col select-none justify-center">
    <input type="text" class="input w-full max-w-xs" disabled bind:value={$input}>
    <div class="py-1 flex justify-center">
        <button class="kbd mx-1" on:click={addnum("1")}>
            1
        </button>
        <button class="kbd mx-1" on:click={addnum("2")}>
            2
        </button>
        <button class="kbd mx-1" on:click={addnum("3")}>
            3
        </button>
    </div>
    <div class="py-1 flex justify-center">
        <button class="kbd mx-1" on:click={addnum("4")}>
            4
        </button>
        <button class="kbd mx-1" on:click={addnum("5")}>
            5
        </button>
        <button class="kbd mx-1" on:click={addnum("6")}>
            6
        </button>
    </div>
    <div class="py-1 flex justify-center">
        <button class="kbd max-w-[1rem] mx-1" on:click={removenum}>
            DEL
        </button>
        <button class="kbd mx-1" on:click={addnum("0")}>
            0
        </button>
        <button class="kbd max-w-[1rem] mx-1" on:click={ok}>
            OK
        </button>
    </div>
</div>