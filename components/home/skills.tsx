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
						<h2 className='text-4xl font-bold md:text-6xl'>
							Ferdigheter<span className='text-primary'>.</span>
						</h2>
					</div>
					<p className='text-xl text-muted-foreground'>
						Her er noen av de teknologiene jeg har brukt i mine prosjekter.
					</p>
				</div>
				<div className='grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-16'>
					{skillCategories.map((category) => (
						<div
							key={category.name}
							className='flex flex-col w-full gap-8 border-t border-primary pt-6 '
						>
							<div className='flex flex-col gap-4'>
								<h3 className='text-xl font-bold md:text-2xl'>
									{category.name}
								</h3>
								<p className='text-base text-muted-foreground'>
									{category.description}
								</p>
							</div>
							<div className='flex flex-wrap gap-2'>
								{category.skills.map((skill) => (
									<Badge variant='simple' key={skill}>
										{skill}
									</Badge>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Skills;
