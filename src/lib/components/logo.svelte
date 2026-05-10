<script lang="ts">
	import favicon from '$lib/assets/favicon.png';

	interface Props {
		height?: number;
	}

	let { height = 28 }: Props = $props();
</script>

<a href="/" class="flex items-center group" aria-label="OSDG home">
	<img src={favicon} alt="OSDG logo" style="height:{height}px;width:auto" />
</a>
