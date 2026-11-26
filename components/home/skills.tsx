import { Sparkle } from 'lucide-react';
import Badge from '@/components/ui-components/badge';

const skillCategories = [
	{
		name: 'Frontend',
		skills: [
			'Next.js',
			'TypeScript',
			'Tailwind CSS',
			'Shadcn UI',
			'HTML',
			'CSS',
			'JavaScript',
		],
		description:
			'Brukervennlige og responsive design for nettsider og applikasjoner.',
	},
	{
		name: 'CMS og Custom Plugins',
		skills: ['WordPress', 'Payload CMS', 'WordPress Plugins'],
		description:
			'WordPress og Payload CMS er mye brukt for å lage nettsider og applikasjoner. Jeg har også utviklet egne plugins for kunder hos Bli Synlig.',
	},
	{
		name: 'Data og verktøy',
		skills: [
			'Neon Postgres',
			'Drizzle ORM',
			'Git og GitHub',
			'KI - Kunstig intelligens',
			'Notion',
		],
		description:
			'Databaser, verktøy og teknologier for å lage nettsider og applikasjoner.',
	},
];

function Skills() {
	return (
		<section id='skills'>
			<div className='container mx-auto flex flex-col gap-10 px-4 py-20 md:gap-12'>
				<div className='flex flex-col gap-4'>
					<div className='flex items-center gap-3'>
						<h2 className='text-4xl font-bold md:text-6xl'>Ferdigheter</h2>
					</div>
					<p className='text-xl text-muted-foreground'>
						Her er noen av de teknologiene jeg har brukt i mine prosjekter.
					</p>
				</div>
				{skillCategories.map((category) => (
					<div
						key={category.name}
						className='grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-30 border-t border-border pt-12 '
					>
						<div className='flex max-w-lg flex-col gap-6'>
							<h3 className='text-2xl font-bold md:text-4xl'>
								{category.name}
							</h3>
							<p className='text-lg text-muted-foreground'>
								{category.description}
							</p>
						</div>
						<div className='flex flex-wrap gap-2 max-w-md'>
							{category.skills.map((skill) => (
								<Badge
									className='bg-secondary/40 text-primary text-lg py-2 px-4'
									key={skill}
								>
									{skill}
								</Badge>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default Skills;
