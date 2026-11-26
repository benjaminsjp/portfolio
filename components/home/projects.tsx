import { ViewTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '../ui-components/card';
import { TechStack } from '../ui-components/tech-stack';
import { projects, type Project } from '@/lib/projects';
import { Button } from '../ui-components/button';
import { ArrowRight } from 'lucide-react';
import { Tab, Tabs } from '../ui-components/tabs';

function ProjectCard({ project }: { project: Project }) {
	return (
		<Link
			href={`/prosjekter/${project.slug}`}
			prefetch={true}
			transitionTypes={['nav-forward']}
			className='block w-full'
		>
			<Card variant='simple' className='group/card'>
				<div className='flex flex-col bg-secondary/50 rounded-xl border border-border'>
					<ViewTransition
						name={`project-image-${project.slug}`}
						share='morph'
						default='none'
					>
						<div className='relative aspect-video overflow-hidden rounded-xl flex flex-col'>
							<Image
								src={project.image}
								alt={project.imageAlt}
								fill
								className='object-cover md:group-hover/card:scale-105 md:transition-transform md:duration-300'
							/>
						</div>
					</ViewTransition>
				</div>
				<CardContent className='pt-6'>
					<div className='max-w-xl'>
						<ViewTransition
							name={`project-title-${project.slug}`}
							share='text-morph'
							default='none'
						>
							<h3 className='mb-2 text-3xl font-semibold'>{project.title}</h3>
						</ViewTransition>
						<ViewTransition
							name={`project-summary-${project.slug}`}
							share='text-morph'
							default='none'
						>
							<p className='leading-relaxed text-muted-foreground text-lg'>
								{project.summary}
							</p>
						</ViewTransition>
					</div>
					<div className='flex flex-col md:flex-row items-start md:items-center gap-4 mt-4'>
						<div>
							<TechStack slug={project.slug} tech={project.tech} featured />
						</div>
						<Button variant='outline' className='w-full md:w-auto md:ml-auto'>
							Mer om prosjektet <ArrowRight className='size-4' />
						</Button>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
}

function Projects() {
	return (
		<section id='projects'>
			<div className='container mx-auto scroll-mt-32 px-4 py-20'>
				<div className='mb-16'>
					<h2 className='text-4xl font-bold md:text-6xl'>
						Utvalgte prosjekter<span className='text-primary'>.</span>
					</h2>
				</div>
				<Tabs orientation='vertical'>
					{projects.map((project) => (
						<Tab
							key={project.slug}
							label={project.name}
							description={project.tabDescription}
						>
							<ProjectCard project={project} />
						</Tab>
					))}
				</Tabs>
			</div>
		</section>
	);
}

export default Projects;
