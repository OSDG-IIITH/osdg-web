import { getposts } from '$lib/posts';

export const prerender = true;

export function GET() {
	const posts = getposts();
	const base = 'https://osdg.iiit.ac.in';

	const items = posts
		.map(
			(p) => `
    <item>
      <title>${p.meta.title}</title>
      <link>${p.meta.link ? (p.meta.link.startsWith('http') ? p.meta.link : base + p.meta.link) : `${base}/blog/${p.slug}`}</link>
      <pubDate>${new Date(p.meta.date).toUTCString()}</pubDate>
      <description>${p.meta.excerpt}</description>
    </item>`
		)
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>OSDG Blog</title>
    <link>${base}</link>
    <description>Open Source Developers Group, IIIT Hyderabad</description>
    ${items}
  </channel>
</rss>`;

	return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml' } });
}
