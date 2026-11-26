import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { Button, buttonVariants } from '../ui-components/button';
import { cn } from '@/lib/utils';
import { MailIcon } from 'lucide-react';
import Tooltip from '../ui-components/tooltip';

function HeroHome() {
	return (
		<section id='home' className='bg-secondary/40 '>
			<div className='container mx-auto grid grid-cols-1 items-center gap-20 px-4 pt-24 pb-20 lg:py-6 lg:grid-cols-2'>
				<div className='flex min-w-0 flex-col gap-4'>
					<h1 className='mb-4 max-w-3xl text-6xl leading-tight font-bold'>
						Benjamin Pedersen
					</h1>
					<p className='mb-6 max-w-2xl text-lg leading-relaxed text-muted-foreground'>
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
				<div className='relative min-w-0 w-full aspect-square max-h-[900px] lg:aspect-3/4 overflow-hidden rounded-xl'>
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
