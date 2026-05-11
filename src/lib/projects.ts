import projectsdata from '$lib/../data/projects.json';

export type Project = (typeof projectsdata)[0];

async function fetchstars(github: string): Promise<number | null> {
	if (!github || !github.includes('github.com')) return null;
	const match = github.match(/github\.com\/([^/]+\/[^/]+)/);
	if (!match) return null;
	try {
		const res = await fetch(`https://api.github.com/repos/${match[1]}`);
		if (!res.ok) return null;
		const data = await res.json();
		return typeof data.stargazers_count === 'number' ? data.stargazers_count : null;
	} catch {
		return null;
	}
}

/** returns projects with live github star counts, falling back to json values */
export async function getprojects(): Promise<Project[]> {
	return Promise.all(
		projectsdata.map(async (p) => {
			const stars = await fetchstars(p.github);
			return stars !== null ? { ...p, stars } : p;
		})
	);
}
