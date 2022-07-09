import { persist, localStorage } from "@macfja/svelte-persistent-store"
import { writable } from "svelte/store"
import encryptedLocalStorage from "./security"

export type Tone = {
    title: string,
    pin?: number,
    body: string,
    date: number,
    id: string
}

const tones = persist<Tone[]>(writable([]), encryptedLocalStorage(), 'TONES.ENCRYPTED')
const theme = persist<boolean>(writable(false), localStorage(), 'SVELTE.THEME')
const opentones = writable<string[]>([])
const activetone = writable<string>()
const renamingtone = writable<string | boolean>(false)

export default tones;

export {
    tones,
    theme,
    opentones,
    activetone,
    renamingtone
};