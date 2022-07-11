<script lang=ts>
    import Container from "$lib/components/Container.svelte";
    import ActiveTeno from "$lib/components/main/ActiveTeno.svelte";
    import SideBar from "$lib/components/main/SideBar.svelte";
    import TabBar from "$lib/components/main/TabBar.svelte";
</script>

<Container>
    <div class="flex flex-row w-full h-full">
        <SideBar />
        <div class="flex-grow flex flex-col max-w-[85%]">
            <TabBar />
            <ActiveTeno />
        </div>
    </div>
</Container>