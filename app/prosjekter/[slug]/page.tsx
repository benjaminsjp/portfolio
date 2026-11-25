import { ViewTransition } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, SquareArrowUpRightExit } from 'lucide-react';
import { buttonVariants } from '@/components/ui-components/button';
import { DirectionalTransition } from '@/components/ui-components/directional-transition';
import { TechStack } from '@/components/ui-components/tech-stack';
import { cn } from '@/lib/utils';
import { getProject, projects } from '@/lib/projects';

export const instant = false;

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
	params,
}: PageProps<'/prosjekter/[slug]'>) {
	const { slug } = await params;
	const project = getProject(slug);

	if (!project) {
		return { title: 'Prosjekt' };
	}

	return {
		title: project.title,
		description: project.summary,
	};
}

export default async function ProjectPage({
	params,
}: PageProps<'/prosjekter/[slug]'>) {
	const { slug } = await params;
	const project = getProject(slug);

	if (!project) {
		notFound();
	}

	return (
		<DirectionalTransition>
			<main className='container max-w-6xl mx-auto px-4 pt-32 pb-16'>
				<Link
					href='/'
					transitionTypes={['nav-back']}
					className={cn(
						buttonVariants({ variant: 'link', size: 'default' }),
						'mb-10 inline-flex items-center gap-2',
					)}
				>
					<ArrowLeft className='size-4' /> Tilbake
				</Link>

				{/* Project Title */}

				<ViewTransition
					name={`project-title-${project.slug}`}
					share='text-morph'
					default='none'
				>
					<h1 className='text-5xl lg:text-7xl mb-4 lg:mb-10 leading-tight font-bold'>
						{project.title}
					</h1>
				</ViewTransition>

				{/* Project Summary and Tech Stack */}
				<div className='mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12'>
					<div className='flex max-w-2xl min-w-0 flex-col'>
						<ViewTransition
							name={`project-summary-${project.slug}`}
							share='text-morph'
							default='none'
						>
							<p className='mb-6 text-lg leading-relaxed text-muted-foreground'>
								{project.summary}
							</p>
						</ViewTransition>
						<TechStack slug={project.slug} tech={project.tech} />
					</div>
					<div className='flex shrink-0 gap-6 flex-wrap'>
						<a
							href={project.github}
							className={cn(buttonVariants({ variant: 'link' }))}
							target='_blank'
							rel='noopener noreferrer'
						>
							GitHub <SquareArrowUpRightExit className='size-4' />
						</a>
						<a
							href={project.link}
							target='_blank'
							className={cn(
								buttonVariants({
									variant: 'outline',
								}),
							)}
						>
							Gå til nettsiden <SquareArrowUpRightExit className='size-4' />
						</a>
					</div>
				</div>

				{/* Project image */}

				<ViewTransition
					name={`project-image-${project.slug}`}
					share='morph'
					default='none'
				>
					<div className='relative mb-12 aspect-video w-full overflow-hidden rounded-xl'>
						<Image
							src={project.image}
							alt={project.imageAlt}
							fill
							priority
							sizes='100vw'
							className='rounded-xl object-cover'
						/>
					</div>
				</ViewTransition>

				<div className='max-w-3xl mx-auto flex flex-col gap-6'>
					{/* Project Body */}
					<div className='flex flex-col gap-6 mb-10'>
						<h2 className='text-4xl font-bold '>Om prosjektet</h2>
						<p className='max-w-2xl leading-relaxed'>{project.about}</p>
					</div>

					{/* Project Features */}

					<div className='mb-10'>
						<h2 className='text-4xl font-bold mb-6'>Funksjoner</h2>
						{project.features.map((feature) => (
							<div className='flex flex-col mb-10' key={feature.name}>
								<h3 className='text-2xl font-bold mb-2'>{feature.name}</h3>
								<p className='leading-relaxed'>{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</main>
		</DirectionalTransition>
	);
}
