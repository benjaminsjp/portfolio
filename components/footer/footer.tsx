import Image from 'next/image';

function Footer() {
	return (
		<footer className='bg-secondary/40 border-t border-border'>
			<div className='container mx-auto px-4 py-8'>
				<div className='flex flex-col md:flex-row items-center gap-4 border-b pb-8 border-border mb-20'>
					<a
						href='mailto:benped2006@icloud.com'
						className='text-muted-foreground hover:text-primary underline underline-offset-4 transition-colors min-h-11 flex items-center'
					>
						benped2006@icloud.com
					</a>
					<p className='text-center text-muted-foreground md:ml-auto'>
						&copy; Benjamin Pedersern. All rights reserved.
					</p>
				</div>
				<div className='w-full aspect-4/1 relative'>
					<Image
						src='/assets/svg/benjamin.svg'
						alt='Benjamin'
						fill
						className='object-contain'
					/>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
