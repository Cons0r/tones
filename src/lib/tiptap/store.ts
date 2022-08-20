import { Editor, Extension } from '@tiptap/core'
import type { Writable } from 'svelte/store'
function store(s: Writable<Editor>) {
    return Extension.create({
        name: "svelteXtiptap.store",
        onTransaction(transaction) {
            s.set(this.editor)
        }
    })
}
export default store;