<script lang=ts>
    import tenos, { activeteno, activetenoind } from "$lib/store";
    import SvelteMarkdown from "svelte-markdown";
    import Editor from "$lib/tiptap";
    import type { Editor as TipTapEditor } from '@tiptap/core'
    import type { Writable } from "svelte/store";
    let editor: Writable<TipTapEditor>;

    function mountEditor() {
        editor.subscribe((e) => {
            $tenos[$activetenoind].body = e.getHTML()
            console.log($tenos[$activetenoind].body)
        })
    }
</script>

{#if $activeteno?.length || $tenos[$activetenoind]}
    <div class="bg-base-300 max-h-[85%] min-h-[85%] h-[85%] flex">
        <div class="absolute right-0 flex flex-col bg-base-100 rounded-bl-lg p-2 divide-x-2 divide-transparent group min-w-[15rem]">
            <span class="pointer-events-none group-hover:pointer-events-auto opacity-0 text-base-content absolute transition-all -translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 group-hover:relative">Created {new Date($tenos[$activetenoind]?.date)?.toDateString()}</span>
        </div>
        <Editor className="flex-grow" bind:editor on:mount={mountEditor}></Editor>
    </div>
{:else}
<div class="flex bg-base-300 items-center h-full justify-center">
    No teno selected
</div>
{/if}