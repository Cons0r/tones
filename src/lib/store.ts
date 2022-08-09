import { persist, localStorage } from "@macfja/svelte-persistent-store"
import { get, writable } from "svelte/store"
import encryptedLocalStorage from "$lib/security"

function rand() {
    return Math.round(Math.random() * 10000)
}

const key = persist<number>(writable(rand()), localStorage(), 'TENO>KEY')
const tenos = persist<Teno[]>(writable([]), encryptedLocalStorage(get(key)), 'TENO>ENCRYPTED')
const theme = persist<boolean>(writable(false), localStorage(), 'TENO>UI>THEME')
const opentenos = writable<string[]>([])
const activeteno = writable<string>()
const renamingteno = writable<string | boolean>(false)
const dividex = writable(true)
const activetenoind = writable(0)

export default tenos;

export {
    tenos,
    theme,
    opentenos,
    activeteno,
    renamingteno,
    dividex,
    activetenoind,
    key,
};