<script lang=ts>
	import Keypad from "$lib/components/Keypad.svelte";
	import { fade, scale } from "svelte/transition";

	export let close: (...data: any) => {}
	export let data: any;

	function wrap(returndata: string) {
		return () => {
			close(returndata)
		}
	}

	function ok(e: CustomEvent<{ input: string }>) {
		close(e.detail.input)
	}
</script>

<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
	<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" on:click={wrap("")} transition:fade></div>
	<div class="fixed z-10 inset-0 overflow-y-auto">
		<div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
		<div class="relative bg-base-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full" transition:scale>
			<div class="bg-base px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
			<div class="sm:flex sm:items-start">
				<div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-info sm:mx-0 sm:h-10 sm:w-10">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-info-content" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
				</svg>
				</div>
				<div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
				<h3 class="text-lg leading-6 font-medium text-base-content" id="modal-title">Lock {data?.teno?.title}</h3>
				<div class="mt-2">
					<p class="text-sm text-gray-500">Dont forget the PIN!</p>
				</div>
				</div>
			</div>
			</div>
			<div class="flex justify-center">
				<div class="min-w-xs max-w-xs">
					<Keypad on:ok={ok}></Keypad>
				</div>
			</div>
		</div>
		</div>
	</div>
	</div>