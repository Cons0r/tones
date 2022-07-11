<script lang=ts>
    import { contextkey } from "$lib/context";
    import { getModalContext } from "@mavthedev/svodals";
    import { setContext } from "svelte";
    import tenos, { activeteno, dividex, opentenos, renamingteno, activetenoind, type Teno } from "$lib/store"
    activeteno.subscribe((a) => {
        activetenoind.set($tenos.findIndex((v) => v?.id === a))
    })
    const { addModal } = getModalContext()

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
        if(!teno) throw new Error('Teno was undefined')
        renamingteno.set(teno.id)
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

    function asktoremove(id: string) {
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
        dividex.set(!$dividex)
    }

    function lockmodal(teno: Teno) {
        return () => {
            addModal('lock', (string: string) => {
                const id = $tenos.findIndex((v) => v.id == teno.id)
                tenos.update(t => {
                    t[id].pin = parseInt(string)
                    return t
                })
            }, {
                teno
            })
        }
    }

    setContext(contextkey, {
        createteno,
        openteno,
        renameteno,
        asktoremove,
        closeteno,
        keydown,
        findteno,
        swapdivide,
        lockmodal
    })
</script>

<slot />

<svelte:window on:keydown={keydown}></svelte:window>