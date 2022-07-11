import { getContext } from "svelte"
import type { Teno } from "./store"

const contextkey = {
    createteno: null,
    openteno: null,
    renameteno: null,
    asktoremove: null,
    closeteno: null,
    keydown: null,
    findteno: null,
    swapdivide: null,
    lockmodal: null
}

type Context = {
    createteno(): () => void,
    openteno(teno: Teno): () => void,
    renameteno(teno: Teno): void,
    asktoremove(id: string): () => void,
    closeteno(id: string): () => void,
    keydown(e: KeyboardEvent): void,
    findteno(id: string, arr: Array<Teno | string>): Teno,
    swapdivide(): void,
    lockmodal(teno: Teno): () => void
}

export const getAppContext = () => getContext<Context>(contextkey)
export default getAppContext;
export {
    contextkey
}