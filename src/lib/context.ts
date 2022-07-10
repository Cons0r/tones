import { getContext } from "svelte"
import type { Teno } from '$lib/store'

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

export const getAppContext = () => getContext(contextkey)
export default getAppContext;
export {
    contextkey
}