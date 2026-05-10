import { getposts } from '$lib/posts';

export function load() {
	return { posts: getposts() };
}
