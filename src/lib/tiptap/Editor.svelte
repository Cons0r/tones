<script lang=ts>
    import { onMount, onDestroy, createEventDispatcher } from 'svelte'
    import { Editor } from '@tiptap/core'
    import { Writable, writable } from 'svelte/store'
    import allExtensions from './all';
    const event = createEventDispatcher()

    export let className: string = "";
    let editorElement: HTMLElement;
    export const editor: Writable<Editor> = writable();
    onMount(async () => {
        editor.set(new Editor({
            element: editorElement,
            extensions: [
                ...allExtensions(editor)
            ]
        }))
        event("mount", editor)
    })

    onDestroy(() => {
        if ($editor) {
            $editor.destroy()
        }
    })
</script>

<div class="prose prose-slate Editor {className}" bind:this={editorElement} />

<style lang="postcss">
    .Editor {
        @apply form-textarea;
        @apply bg-base-300 max-h-full overflow-scroll !important;
    }
</style>