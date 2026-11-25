export type TechItem = {
	name: string;
	priority: number;
	color: string;
};

export type Project = {
	slug: string;
	title: string;
	image: string;
	imageAlt: string;
	summary: string;
	about: string;
	features: { name: string; description: string }[];
	link: string;
	tech: TechItem[];
};

export const FEATURED_TECH_LIMIT = 3;

export const projects: Project[] = [
	{
		slug: 'pan-showcase',
		title: 'Pån - Få fart på oppgavelisten din.',
		image: '/assets/images/pan-showcase.png',
		imageAlt: 'Forhåndsvisning av Pån - Få fart på oppgavelisten din.',
		summary:
			'Pån er et fokusert arbeidsområde for å flytte oppgaver på en Kanban-tavle, gruppere dem i sidepanelet, og åpne delte org-tavler når du trenger mer enn en solo-liste.',
		about:
			'Jeg startet Pån som et sideprosjekt for å lære meg mer om Next.js og Tailwind CSS. Jeg har også lært mye om PostgreSQL og Drizzle ORM. Samtidig har jeg utviklet min egen kompetanse innen design og brukergrensesnitt.',
		features: [
			{
				name: 'Sanntidsoppdatering',
				description:
					'Opprett delte tavler for å samarbeide med andre i sanntid. Se når andre er inne på en task, gjør endringer og få med deg når ting skjer. Kommenter og samhandle med andre medlemmer for å gi tilbakemeldinger og effektivisere samarbeidet.',
			},
			{
				name: 'Kanban-tavle',
				description:
					'Opprett, flytt og grupper oppgaver på en Kanban-tavle. Få oversikt over hva som skal gjøres, og hva som er i gang.',
			},
			{
				name: 'Kalender',
				description:
					'Gi oppgaver en deadline og få oversikt i kalenderen. Nærmer en deadline seg? Da kan du varlse de ansvarlige for oppgaven.',
			},
		],

		link: 'https://pan-omega-dusky.vercel.app/',
		tech: [
			{ name: 'Next.js', priority: 1, color: '#0057ff' },
			{ name: 'TypeScript', priority: 2, color: '#58a6e8' },
			{ name: 'Neon Postgres', priority: 3, color: '#00e599' },
			{ name: 'Tailwind CSS', priority: 4, color: '#38bdf8' },
			{ name: 'Shadcn/UI', priority: 5, color: '#d4d4d8' },
			{ name: 'Drizzle', priority: 6, color: '#c5f74f' },
			{ name: 'Neon Auth', priority: 7, color: '#00e599' },
			{ name: 'Vercel', priority: 8, color: '#0070f3' },
		],
	},
	{
		slug: 'kodekassa-showcase',
		title: 'Kodekassa - Dokumentasjon for diverse WordPress-plugins.',
		image: '/assets/images/kodekassa-showcase.png',
		imageAlt:
			'Forhåndsvisning av Kodekassa - Dokumentasjon for diverse WordPress-plugins.',
		summary:
			'Dokumentasjon for diverse WordPress-plugins, med versjoner, nedlastinger og søk i ett sted. Deriblant flatsome-css-snippets.',
		about:
			'Kodekassa samler byråets plugin-dokumentasjon og CSS-snippets. Innholdet skrives i MDX, og plugin-nedlastinger peker på GitHub Releases.',
		features: [
			{
				name: 'Versjonsstyring',
				description: 'Se versjoner av plugins og CSS-snippets.',
			},
		],
		link: 'https://kodekassa.no/',
		tech: [
			{ name: 'Next.js', priority: 1, color: '#0057ff' },
			{ name: 'TypeScript', priority: 2, color: '#58a6e8' },
			{ name: 'MDX', priority: 3, color: '#fcb32c' },
			{ name: 'Tailwind CSS', priority: 4, color: '#38bdf8' },
			{ name: 'Shadcn/UI', priority: 5, color: '#d4d4d8' },
			{ name: 'Shiki', priority: 6, color: '#7ebc6f' },
			{ name: 'Vercel', priority: 7, color: '#0070f3' },
		],
	},
];

export function getProject(slug: string) {
	return projects.find((project) => project.slug === slug);
}

export function getSortedTech(tech: TechItem[]) {
	return tech.toSorted((a, b) => a.priority - b.priority);
}

export function getFeaturedTech(tech: TechItem[], limit = FEATURED_TECH_LIMIT) {
	return getSortedTech(tech).slice(0, limit);
}

export function getTechTransitionName(slug: string, name: string) {
	const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
	return `project-tech-${slug}-${id}`;
}
