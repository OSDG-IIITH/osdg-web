<script lang="ts">
	interface Props {
		name: string;
		handle: string;
		size?: number;
	}

	let { name, handle, size = 56 }: Props = $props();

	function hash(s: string) {
		let h = 0;
		for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
		return Math.abs(h);
	}

	const initials = $derived(
		name
			.split(/\s+/)
			.map((p) => p[0])
			.slice(0, 2)
			.join('')
			.toUpperCase()
	);

	const gradient = $derived.by(() => {
		const h = hash(handle || name);
		const hue = 200 + (h % 60);
		const bg1 = `hsl(${hue},55%,78%)`;
		const bg2 = `hsl(${hue + 20},45%,62%)`;
		return `linear-gradient(135deg,${bg1} 0%,${bg2} 100%)`;
	});

	const fs = $derived(Math.round(size * 0.32));
</script>

<div
	class="relative grid place-items-center font-mono font-semibold flex-none"
	style="width:{size}px;height:{size}px;background:{gradient};color:#0a0d13;border-radius:8px;font-size:{fs}px;letter-spacing:-0.02em"
>
	{initials}
</div>
