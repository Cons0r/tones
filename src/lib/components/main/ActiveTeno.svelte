<script>
    import tenos, { activeteno, activetenoind, dividex } from "$lib/store";
    import SvelteMarkdown from "svelte-markdown";
</script>


<style lang=postcss>
    textarea.x {
        @apply w-[50%] min-w-[50%] border-r min-h-full max-h-full h-full
    }

    textarea.y {
        @apply h-[50%] min-h-[50%] border-b min-w-full max-w-full w-full
    }

    div.x {
        @apply w-[50%] min-w-[50%] border-l min-h-full max-h-full h-full
    }

    div.y {
        @apply h-[50%] min-h-[50%] border-t min-w-full max-w-full w-full
    }
</style>

{#if $activeteno?.length || $tenos[$activetenoind]}
    <div class="bg-base-300 max-h-[85%] min-h-[85%] h-full flex" class:flex-row={$dividex}  class:flex-col={!$dividex}>
        <div class="absolute right-0 flex flex-col bg-base-100 rounded-bl-lg p-2 divide-x-2 divide-transparent group min-w-[15rem]">
            <span class="opacity-0 text-base-content absolute transition-all -translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 group-hover:relative">Created {new Date($tenos[$activetenoind]?.date)?.toDateString()}</span>
        </div>
        {#if $tenos[$activetenoind]?.body}
            <textarea bind:value={$tenos[$activetenoind].body} class="hide-bar h-full min-h-max max-h-max flex-grow resize-none bg-base-300 border-base-content" class:x={$dividex} class:y={!$dividex}></textarea>
            <!-- Weird bug where svelte tries to set the non existent body -->
        {/if}
        <div class="hide-bar prose break-words flex-grow resize-none border-base-content overflow-y-scroll overflow-x-visible" class:x={$dividex} class:y={!$dividex}>
            <SvelteMarkdown source={$tenos[$activetenoind]?.body} />
        </div>
    </div>
{:else}
<div class="flex bg-base-300 items-center h-full justify-center">
    No teno selected
</div>
{/if}