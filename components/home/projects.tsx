import { ViewTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '../ui-components/card';
import { TechStack } from '../ui-components/tech-stack';
import { projects } from '@/lib/projects';
import { Button } from '../ui-components/button';
import { ArrowRight } from 'lucide-react';

function Projects() {
	return (
		<section
			id='projects'
			className='container mx-auto scroll-mt-32 px-4 py-20'
		>
			<div className='mb-12'>
				<h2 className='text-4xl font-bold'>Prosjekter</h2>
			</div>
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-20'>
				{projects.map((project) => (
					<ViewTransition key={project.slug}>
						<Link
							href={`/prosjekter/${project.slug}`}
							prefetch={true}
							transitionTypes={['nav-forward']}
							className='block'
						>
							<Card variant='simple' className='group/card'>
								<ViewTransition
									name={`project-image-${project.slug}`}
									share='morph'
									default='none'
								>
									<div className='relative aspect-video overflow-hidden rounded-xl'>
										<Image
											src={project.image}
											alt={project.imageAlt}
											fill
											className='rounded-t-xl object-cover group-hover/card:scale-105 transition-transform duration-300'
										/>
									</div>
								</ViewTransition>
								<CardContent className='pt-6'>
									<ViewTransition
										name={`project-title-${project.slug}`}
										share='text-morph'
										default='none'
									>
										<h3 className='text-2xl font-semibold mb-2'>
											{project.title}
										</h3>
									</ViewTransition>
									<ViewTransition
										name={`project-summary-${project.slug}`}
										share='text-morph'
										default='none'
									>
										<p className='leading-relaxed text-muted-foreground'>
											{project.summary}
										</p>
									</ViewTransition>
									<div className='mt-4'>
										<TechStack
											slug={project.slug}
											tech={project.tech}
											featured
										/>
									</div>
									<Button
										variant='outline'
										className='mt-6 group-hover/card:bg-primary group-hover/card:text-primary-foreground'
									>
										Mer om prosjektet <ArrowRight className='size-4' />
									</Button>
								</CardContent>
							</Card>
						</Link>
					</ViewTransition>
				))}
			</div>
		</section>
	);
}

export default Projects;
