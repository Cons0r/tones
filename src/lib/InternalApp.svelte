<script lang=ts>
    import Container from "$lib/components/Container.svelte";
    import ActiveTeno from "$lib/components/main/ActiveTeno.svelte";
    import SideBar from "$lib/components/main/SideBar.svelte";
    import TabBar from "$lib/components/main/TabBar.svelte";
	export let type: "web" | "electron";
    export let version: string | undefined;
</script>
<Container {type} {version}>
    <div class="flex flex-row w-full h-full">
        <SideBar />
        <div class="flex-grow flex flex-col max-w-[85%]">
            <TabBar />
            <ActiveTeno />
        </div>
    </div>
    <div title="runnning {type} version" class="absolute hover:text-transparent hover:pointer-events-none hover:bg-transparent bottom-4 right-4 uppercase font-extrabold bg-neutral text-neutral-content rounded-md p-2 transition-colors">
        {type}
    </div>
</Container>