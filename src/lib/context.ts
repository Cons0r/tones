import { getContext } from "svelte"

const contextkey = {
    createteno: null,
    openteno: null,
    renameteno: null,
    asktoremove: null,
    closeteno: null,
    keydown: null,
    findteno: null,
    lockmodal: null,
    type: null,
    appVersion: null
}

export const getAppContext = () => getContext<Context>(contextkey)
export default getAppContext;
export {
    contextkey
}