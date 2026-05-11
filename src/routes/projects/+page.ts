import { getprojects } from '$lib/projects';

export async function load() {
	return { projects: await getprojects() };
}
