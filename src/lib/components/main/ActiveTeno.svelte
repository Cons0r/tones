<script>
    import tenos, { activeteno, activetenoind, dividex } from "$lib/store";
    import SvelteMarkdown from "svelte-markdown";
</script>


{#if $activeteno?.length}
<div class="bg-base-300 h-full flex" class:flex-row={$dividex}  class:flex-col={!$dividex}>
    <div class="absolute right-0 flex flex-row bg-base-100 rounded-bl-lg p-2 divide-x-2 divide-transparent">
        <span class="text-base-content">Created {new Date($tenos[$activetenoind].date).toDateString()}</span>
    </div>
    <textarea bind:value={$tenos[$activetenoind].body} class="flex-grow resize-none w-[50%] bg-base-300 border-base-content" class:w-[50%]={$dividex} class:h-[50%]={!$dividex} class:border-r={$dividex} class:border-b={!$dividex}></textarea>
    <div class="prose flex-grow resize-none border-base-content" class:w-[50%]={dividex} class:h-[50%]={!$dividex} class:min-w-full={!$dividex} class:border-l={!$dividex} class:border-t={!$dividex}>
        <SvelteMarkdown source={$tenos[$activetenoind].body} />
    </div>
</div>
{:else}
<div class="flex bg-base-300 items-center h-full justify-center">
    No teno selected
</div>
{/if}