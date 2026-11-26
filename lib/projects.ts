export type TechItem = {
	name: string;
	priority: number;
	color: string;
};

export type Project = {
	slug: string;
	name: string;
	tabDescription: string;
	title: string;
	image: string;
	imageAlt: string;
	summary: string;
	about: string;
	features: { name: string; description: string }[];
	link: string;
	github: string;
	tech: TechItem[];
};

export const FEATURED_TECH_LIMIT = 3;

export const projects: Project[] = [
	{
		slug: 'pan-showcase',
		name: 'Pån',
		tabDescription: 'Oppgaver og prosjekter',
		title: 'Pån - Få fart på oppgavelisten din.',
		image: '/assets/images/pan-showcase.png',
		imageAlt: 'Forhåndsvisning av Pån - Få fart på oppgavelisten din.',
		summary:
			'Pån er en app som lar deg få styr på oppgaver og prosjekter og samhandle med andre i sanntid.',
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
		github: 'https://github.com/benjaminsjp/Todo-app',
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
		name: 'Kodekassa',
		tabDescription: 'WordPress-plugins',
		title: 'Kodekassa - Dokumentasjon for diverse WordPress-plugins.',
		image: '/assets/images/kodekassa-showcase.png',
		imageAlt:
			'Forhåndsvisning av Kodekassa - Dokumentasjon for diverse WordPress-plugins.',
		summary:
			'Kodekassa er en side som samler dokumentasjon for diverse WordPress-plugins jeg har laget.',
		about:
			'Med mange plugins og lite kontroll kom jeg frem til at det var på tide å lage en side som samler dokumentasjon og nedlastinger på ett sted. Da ble Kodekassa født. Enklere for meg og for mine kollegaer å finne og bruke mine plugins.',
		features: [
			{
				name: 'Versjonskontroll',
				description:
					'For å holde oversikt, og kunne hoppe tilbake en versjon der det trengs, har jeg lagt til versjonskontroll. Dette gjør det enkelt å se hva som er nytt i en versjon, og hva som har blitt fikset.',
			},
			{
				name: 'Nedlastinger',
				description:
					'Plugins lastes opp til GitHub Releases, og lenkes til via kodekassa. Den nyeste realeasen vil også være enkelt tilgjengelig øverst på siden.',
			},
			{
				name: 'Dokumentasjon',
				description:
					'Les hvordan pluginet fungerer og hvordan det kan brukes. Man finner også ulike shortcodes, klasser og funksjoner for det gitte pluginet.',
			},
		],
		link: 'https://kodekassa.no/',
		github: 'https://github.com/benjaminsjp/wordpress-plugins-docs',
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
