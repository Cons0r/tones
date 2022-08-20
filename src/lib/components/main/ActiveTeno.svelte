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

    div.x,
    div.y,
    textarea.x,
    textarea.y {
        @apply overflow-scroll
    }
</style>

{#if $activeteno?.length || $tenos[$activetenoind]}
    <div class="bg-base-300 max-h-full min-h-full h-full flex" class:flex-row={$dividex}  class:flex-col={!$dividex}>
        <div class="absolute right-0 flex flex-col bg-base-100 rounded-bl-lg p-2 divide-x-2 divide-transparent group min-w-[15rem]">
            <span class="pointer-events-none group-hover:pointer-events-auto opacity-0 text-base-content absolute transition-all -translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 group-hover:relative">Created {new Date($tenos[$activetenoind]?.date)?.toDateString()}</span>
        </div>
        {#if $tenos[$activetenoind]?.body !== undefined}
            <textarea bind:value={$tenos[$activetenoind].body} class="hide-bar flex-grow resize-none bg-base-300 border-base-content" class:x={$dividex} class:y={!$dividex}></textarea>
            <!-- Weird bug where svelte tries to set value when body doesnt exist -->
        {/if}
        <div class="prose break-words flex-grow resize-none border-base-content" class:x={$dividex} class:y={!$dividex}>
            <SvelteMarkdown source={$tenos[$activetenoind]?.body} />
        </div>
    </div>
{:else}
<div class="flex bg-base-300 items-center h-full justify-center">
    No teno selected
</div>
{/if}