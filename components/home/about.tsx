import Image from 'next/image';
import { Button, buttonVariants } from '../ui-components/button';
import { MailIcon, SquareArrowUpRightExit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from 'lucide-react';
import Tooltip from '../ui-components/tooltip';

function About() {
	return (
		<section id='about' className='bg-secondary/50'>
			<div className='container mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
				<div className='flex flex-col gap-6 aspect-4/3 overflow-hidden rounded-xl'>
					<Image
						src='/assets/images/benjamin-fisker.jpg'
						alt='Om meg'
						width={1000}
						height={1000}
						className='object-cover'
					/>
				</div>
				<div className='max-w-2xl flex flex-col'>
					<h2 className='text-4xl font-bold mb-6'>Om meg</h2>
					<p className='text-base leading-relaxed max-w-2xl text-muted-foreground mb-4'>
						Jeg heter Benjamin Pedersern, og jeg er en frontend utvikler med en
						stor interesse for design og brukergrensesnitt. Jeg har nylig fått
						fagbrevet som IT-utvikler med meget godt bestått.
					</p>
					<p className='text-base leading-relaxed max-w-2xl text-muted-foreground mb-4'>
						Jeg har arbeidet med en rekke prosjekter, fra små sideprosjekter til
						større prosjekter for kunder.
					</p>
					<div className='flex gap-3 flex-wrap'>
						<Tooltip content='benped2006@icloud.com'>
							<a
								className={cn(buttonVariants({ variant: 'outline' }))}
								href='mailto:benped2006@icloud.com'
							>
								<MailIcon />
								Send en e-post
							</a>
						</Tooltip>
						<a
							className={cn(buttonVariants({ variant: 'outline' }))}
							href='https://github.com/benjaminsjp'
							target='_blank'
							rel='noopener noreferrer'
						>
							<SquareArrowUpRightExit />
							GitHub
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export default About;
