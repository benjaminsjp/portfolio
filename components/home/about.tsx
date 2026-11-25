import Image from 'next/image';
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
					<p className='text-base leading-relaxed max-w-2xl text-muted-foreground'>
						Jeg har arbeidet med en rekke prosjekter, fra små sideprosjekter til
						større prosjekter for kunder.
					</p>
				</div>
			</div>
		</section>
	);
}

export default About;
