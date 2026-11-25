'use client';

import { cn } from '@/lib/utils';
import { Sparkle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const skillCategories = [
	{
		name: 'Frontend',
		skills: ['Next.js', 'Tailwind CSS', 'React', 'HTML', 'CSS', 'JavaScript'],
		description:
			'Brukervennlige og responsive design for nettsider og applikasjoner.',
	},
	{
		name: 'WordPress',
		skills: ['WordPress', 'PHP', 'Plugins'],
		description: 'Nettsider og egne plugins for kunder hos Bli Synlig.',
	},
];

const FADE = 0.15;
const RUNWAY_VH = 120;
const COUNT = skillCategories.length;

function clampProgress(value: number) {
	return Math.min(1, Math.max(0, Math.round(value * 1000) / 1000));
}

function panelOpacity(local: number, isFirst: boolean, isLast: boolean) {
	if (!isFirst) {
		if (local <= -FADE) return 0;
		if (local < FADE) return clampProgress((local + FADE) / (2 * FADE));
	}

	if (isLast || local <= 1 - FADE) return 1;
	if (local < 1 + FADE) {
		return clampProgress((1 + FADE - local) / (2 * FADE));
	}

	return 0;
}

function restRaw(index: number) {
	return index <= 0 ? 0 : index + FADE;
}

function CategoryBody({
	category,
	progress,
}: {
	category: (typeof skillCategories)[number];
	progress?: number[];
}) {
	return (
		<div className='grid w-full grid-cols-1 items-start gap-30 md:grid-cols-2'>
			<div className='flex flex-col gap-6'>
				<div className='flex items-center gap-3'>
					<Sparkle className='size-6 text-primary' />
					<p className='text-lg text-primary uppercase'>Ferdigheter</p>
				</div>
				<h2 className='text-6xl font-bold'>{category.name}</h2>
				<p className='text-xl text-muted-foreground'>{category.description}</p>
				{progress ?
					<SkillsProgress progress={progress} />
				:	null}
			</div>
			<div className='flex flex-col flex-wrap gap-2'>
				{category.skills.map((skill) => (
					<div key={skill} className='flex border-b border-border py-3 md:py-6'>
						<p className='text-2xl font-semibold md:text-3xl'>{skill}</p>
					</div>
				))}
			</div>
		</div>
	);
}

function SkillsProgress({ progress }: { progress: number[] }) {
	return (
		<div aria-hidden className='flex gap-2'>
			{skillCategories.map((category, index) => (
				<div
					key={category.name}
					className='h-1.5 w-14 overflow-hidden rounded-full bg-border'
				>
					<div
						className='h-full w-[calc(var(--progress)*100%)] bg-primary'
						style={
							{
								'--progress': progress[index] ?? 0,
							} as React.CSSProperties
						}
					/>
				</div>
			))}
		</div>
	);
}

function Skills() {
	const trackRef = useRef<HTMLDivElement>(null);
	const [scrollT, setScrollT] = useState(0);

	useEffect(() => {
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const root = document.documentElement;
		let frame = 0;

		const applySnap = () => {
			root.style.setProperty(
				'scroll-snap-type',
				motion.matches ? 'none' : 'y proximity',
			);
		};

		const update = () => {
			if (motion.matches) {
				setScrollT(0);
				return;
			}

			const track = trackRef.current;
			if (!track) return;

			const rect = track.getBoundingClientRect();
			const range = rect.height - window.innerHeight;
			if (range <= 0) {
				setScrollT(0);
				return;
			}

			const next = clampProgress(-rect.top / range);
			setScrollT((prev) => (prev === next ? prev : next));
		};

		const onScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				update();
			});
		};

		applySnap();
		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		motion.addEventListener('change', applySnap);
		motion.addEventListener('change', update);

		return () => {
			root.style.removeProperty('scroll-snap-type');
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			motion.removeEventListener('change', applySnap);
			motion.removeEventListener('change', update);
		};
	}, []);

	const opacities = skillCategories.map((_, index) =>
		panelOpacity(scrollT * COUNT - index, index === 0, index === COUNT - 1),
	);
	const progress = skillCategories.map((_, index) =>
		clampProgress(scrollT * COUNT - index),
	);
	const layoutCategory = skillCategories.reduce((tallest, category) =>
		category.skills.length > tallest.skills.length ? category : tallest,
	);

	return (
		<section id='skills' className='scroll-mt-32'>
			<div className='hidden container mx-auto flex-col gap-16 px-4 pb-20 motion-reduce:flex'>
				{skillCategories.map((category) => (
					<CategoryBody key={category.name} category={category} />
				))}
			</div>

			<div
				ref={trackRef}
				className='relative motion-reduce:hidden'
				style={{ height: `${COUNT * RUNWAY_VH}vh` }}
			>
				{skillCategories.map((_, index) =>
					index === 0 ? null : (
						<div
							key={`snap-${index}`}
							aria-hidden
							className='pointer-events-none absolute left-0 h-px w-px'
							style={{
								top: `calc(${restRaw(index) / COUNT} * (100% - 100lvh))`,
								scrollSnapAlign: 'start',
							}}
						/>
					),
				)}
				<div className='sticky top-0 flex h-lvh items-center bg-background'>
					<div className='relative container mx-auto w-full px-4'>
						<div className='relative'>
							<div className='invisible' aria-hidden>
								<CategoryBody category={layoutCategory} progress={progress} />
							</div>
							{skillCategories.map((category, index) => {
								const opacity = opacities[index] ?? 0;
								const inactive = opacity < 0.05;

								return (
									<div
										key={category.name}
										className={cn(
											'absolute inset-0',
											inactive && 'pointer-events-none',
										)}
										style={{
											opacity,
											zIndex: Math.round(opacity * 10),
										}}
										aria-hidden={inactive}
										inert={inactive}
									>
										<CategoryBody category={category} progress={progress} />
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Skills;
