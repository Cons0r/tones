import { persist, localStorage } from "@macfja/svelte-persistent-store"
import { writable } from "svelte/store"
import encryptedLocalStorage from "./security"

export type Teno = {
    title: string,
    pin?: number,
    body: string,
    date: number,
    id: string
}

type EditorOptions = {
    divide: 'x' | 'y'
}

const tenos = persist<Teno[]>(writable([]), encryptedLocalStorage(), 'tenoS.ENCRYPTED')
const theme = persist<boolean>(writable(false), localStorage(), 'SVELTE.THEME')
const opentenos = writable<string[]>([])
const activeteno = writable<string>()
const renamingteno = writable<string | boolean>(false)
const editoroptions = writable<EditorOptions>({
    divide: 'x'
})
const activetenoind = writable(0)

export default tenos;

export {
    tenos,
    theme,
    opentenos,
    activeteno,
    renamingteno,
    editoroptions,
    activetenoind
};