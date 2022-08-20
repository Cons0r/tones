import type { Editor } from "@tiptap/core";
import type { Writable } from "svelte/store";
import store from "./store";
import StarterKit from "@tiptap/starter-kit";
function setup(s: Writable<Editor>) {
    return [
        store(s),
        StarterKit
    ]
}
export default setup