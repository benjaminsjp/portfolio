import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Button, buttonVariants } from '../ui-components/button';
import { cn } from '@/lib/utils';
import { MailIcon } from 'lucide-react';
import Tooltip from '../ui-components/tooltip';

function HeroHome() {
	return (
		<section
			id='home'
			className='bg-background from-primary/30 to-secondary/40 via-secondary/40 bg-radial-[at_100%_0%] '
		>
			<div className='container mx-auto grid grid-cols-1 items-end gap-20 px-4 pt-24 pb-20 lg:pt-6 lg:pb-12 lg:grid-cols-2'>
				<div className='flex min-w-0 flex-col gap-4'>
					<h1 className='mb-4 max-w-3xl text-6xl lg:text-8xl leading-none font-bold'>
						Benjamin Pedersen<span className='text-primary'>.</span>
					</h1>
					<p className='mb-6 max-w-xl text-lg leading-relaxed text-muted-foreground'>
						Web-utvikler i Bli Synlig AS. Jeg bygger WordPress-nettsteder og
						diverse apper med Next.js. Brukervennlige og stabile grensesnitt er
						viktig for meg.
					</p>
					<div className='flex gap-2 flex-wrap'>
						<Tooltip content='benped2006@icloud.com'>
							<a
								href='mailto:benped2006@icloud.com'
								className={cn(
									buttonVariants({ variant: 'default', size: 'lg' }),
								)}
							>
								<MailIcon /> Kontakt meg
							</a>
						</Tooltip>
						<a
							href='#projects'
							className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
						>
							Se prosjekter
						</a>
					</div>
				</div>
				<div className='relative min-w-0 w-full aspect-square max-h-225 lg:aspect-3/4 overflow-hidden rounded-2xl'>
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
			<div className='container mx-auto px-4 pt-6 pb-10 border-t border-border grid grid-cols-1 gap-4 md:grid-cols-3'>
				<div className='flex flex-col gap-2'>
					<p className='text-muted-foreground'>Jobb</p>
					<p>Bli Synlig AS</p>
				</div>
				<div className='flex flex-col gap-2'>
					<p className='text-muted-foreground'>Bakgrunn</p>
					<p>IT-utvikler med fagbrev</p>
				</div>
				<div className='flex flex-col gap-2'>
					<p className='text-muted-foreground'>Jobber med</p>
					<p>WordPress og Next.js</p>
				</div>
			</div>
		</section>
	);
}

export default HeroHome;
