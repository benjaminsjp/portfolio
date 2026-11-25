import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { Button, buttonVariants } from '../ui-components/button';
import { cn } from '@/lib/utils';

function HeroHome() {
	return (
		<section id='home' className='bg-secondary/50 pt-32'>
			<div className='container mx-auto grid grid-cols-1 items-center gap-20 px-4 py-20 lg:grid-cols-2'>
				<div className='flex min-w-0 flex-col gap-4'>
					<h1 className='mb-4 max-w-3xl text-6xl leading-tight font-bold'>
						Benjamin Pedersen
					</h1>
					<p className='mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground'>
						Web-utvikler i Bli Synlig AS. Jeg bygger WordPress-nettsteder og
						diverse apper med Next.js. Brukervennlige og stabile grensesnitt er
						viktig for meg.
					</p>
					<div className='flex gap-2'>
						<Button size='lg'>Kontakt meg</Button>
						<a
							href='#projects'
							className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
						>
							Se prosjekter <ArrowDown />
						</a>
					</div>
				</div>
				<div className='relative min-w-0 w-full aspect-square lg:aspect-3/4 overflow-hidden rounded-xl'>
					<Image
						src='/assets/images/portrait.jpg'
						alt='Portrett av Benjamin Pedersen'
						fill
						priority
						sizes='(min-width: 1024px) 50vw, 100vw'
						className='object-cover'
					/>
				</div>
			</div>
		</section>
	);
}

export default HeroHome;
