<script lang="ts">
	interface Props {
		label: string;
		active?: boolean;
		count?: number | null;
		onclick?: () => void;
	}

	let { label, active = false, count = null, onclick }: Props = $props();
</script>

<button
	type="button"
	{onclick}
	class={[
		'font-mono text-[12px] px-2.5 py-1 rounded border transition-colors',
		active
			? 'bg-accent text-bg border-accent'
			: 'bg-panel/60 text-fg-dim border-border hover:text-fg hover:border-border-2'
	]}
>
	<span class={active ? 'text-bg/60' : 'text-mute'}>#</span>{label}
	{#if count != null}
		<span class={['ml-1.5', active ? 'text-bg/50' : 'text-mute']}>{count}</span>
	{/if}
</button>
