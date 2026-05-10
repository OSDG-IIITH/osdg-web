export interface PostMeta {
	title: string;
	author: string;
	date: string;
	readingTime: number;
	tags: string[];
	excerpt: string;
}

export interface Post {
	slug: string;
	meta: PostMeta;
}

/** returns all posts sorted newest first */
export function getposts(): Post[] {
	const modules = import.meta.glob('/src/blog/*.md', { eager: true });
	return Object.entries(modules)
		.map(([path, mod]) => ({
			slug: path.split('/').pop()!.replace('.md', ''),
			meta: (mod as { metadata: PostMeta }).metadata
		}))
		.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}
