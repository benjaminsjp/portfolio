import Image from 'next/image';
import { Button, buttonVariants } from '../ui-components/button';
import { MailIcon, SquareArrowUpRightExit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from 'lucide-react';
import Tooltip from '../ui-components/tooltip';

function About() {
	return (
		<section id='about' className='bg-secondary/40'>
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
						Jeg er IT-utvikler med fagbrev bestått meget godt, og erfaring fra
						utvikling av nettsider i et mediebyrå. I jobben min hos Bli Synlig
						AS arbeider jeg hovedsakelig med WordPress, HTML, CSS og PHP.
					</p>
					<p className='text-base leading-relaxed max-w-2xl text-muted-foreground mb-6'>
						På fritiden utvikler jeg egne prosjekter med blant annet Next.js,
						React og TypeScript. Jeg har også utviklet egne WordPress-plugins
						som utvider eksisterende systemer med ny funksjonalitet.
					</p>
					<p className='text-base leading-relaxed max-w-2xl text-muted-foreground mb-6'>
						Jeg er spesielt interessert i frontendutvikling, komponentbaserte
						løsninger og gode brukeropplevelser. Jeg liker å utforske nye
						teknologier og finne praktiske løsninger på tekniske utfordringer.
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
