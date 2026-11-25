import HeroHome from '@/components/home/hero-home';
import Projects from '@/components/home/projects';
import { DirectionalTransition } from '@/components/ui-components/directional-transition';
import About from '@/components/home/about';

export default function Home() {
	return (
		<DirectionalTransition>
			<div className='flex min-h-full flex-1 flex-col'>
				<a
					href='#main'
					className='sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-sm focus:text-background'
				>
					Skip to content
				</a>
				<main>
					<HeroHome />
					<Projects />
					<About />
				</main>
			</div>
		</DirectionalTransition>
	);
}
