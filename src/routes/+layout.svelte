<script lang="ts">
	import './layout.css';
	// FIXME: get a proper favicon (this one doesnt have the right aspect ratio)
	import favicon from '$lib/assets/favicon.png';
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
{@render children()}
<Footer />
