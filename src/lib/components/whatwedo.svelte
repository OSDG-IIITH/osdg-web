<script lang="ts">
	const cols = [
		{
			tag: 'build/',
			title: 'We ship',
			body: 'We build projects for the IIIT community, from forms platforms to course review sites. We maintain them, we listen to feedback, we iterate.'
		},
		{
			tag: 'learn/',
			title: 'We teach',
			body: 'Workshops on open source, linux, design, and whatever someone is excited about that month. Free for all to attend.'
		},
		{
			tag: 'host/',
			title: 'We gather',
			body: "We host discussion sessions for people to talk about recent developments in tech, and to show what they've been working on"
		}
	];
</script>

<section class="border-t border-border mt-16">
	<div
		class="mx-auto px-6 lg:px-10 py-20 grid md:grid-cols-3 gap-px bg-border rounded overflow-hidden border border-border"
	>
		{#each cols as c (c.tag)}
			<div class="bg-bg p-8">
				<div class="font-mono text-mute text-[12px] mb-4">{c.tag}</div>
				<div class="font-mono text-accent text-[20px] mb-3 font-semibold tracking-tight">
					{c.title}
				</div>
				<p class="font-mono text-[13px] leading-[1.7] text-fg-dim">{c.body}</p>
			</div>
		{/each}
	</div>
</section>
