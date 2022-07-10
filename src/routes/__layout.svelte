<script>
    import "../app.css";

	import { onMount } from 'svelte'
	import { theme } from "$lib/store"
	
	onMount(() => {
		theme.subscribe(t => {
			const themestring = t?'light':'dark'
			document.documentElement.setAttribute('data-theme', themestring)
		})
	})
</script>



<div class="w-screen h-screen bg-base-100 flex flex-col max-w-[100vw] max-h-[100vh]">
	<nav class="navbar bg-base-200">
		<button class="btn btn-ghost normal-case text-xl">teno</button>
		<div class="flex-grow"></div>
		<label class="swap swap-rotate btn btn-ghost">
			<input type="checkbox" bind:checked={$theme}>
			<svg xmlns="http://www.w3.org/2000/svg" class="swap-on fill-current h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
				<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
			</svg>
			<svg xmlns="http://www.w3.org/2000/svg" class="swap-off fill-current h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
				<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
			  </svg>
		</label>
	</nav>
	<div class="flex-grow">
		<slot />
	</div>
</div>