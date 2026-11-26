import type { Metadata } from 'next';
import {
	Schibsted_Grotesk,
	Newsreader,
	Hanken_Grotesk,
} from 'next/font/google';
import './globals.css';
import Navigation from '@/components/header/navigation';
import Footer from '@/components/footer/footer';
import { THEME_INIT_SCRIPT } from '@/lib/themes';

const hankenGrotesk = Hanken_Grotesk({
	variable: '--font-hanken-grotesk',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
});

const newsreader = Newsreader({
	variable: '--font-newsreader',
	subsets: ['latin'],
	style: ['normal', 'italic'],
});

export const metadata: Metadata = {
	title: {
		default: 'Benjamin Pedersen',
		template: '%s · Benjamin Pedersen',
	},
	description:
		'Personal site of Benjamin Pedersen, a web developer at Bli Synlig AS.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang='en'
			data-scroll-behavior='smooth'
			suppressHydrationWarning
			className={`${hankenGrotesk.variable} ${newsreader.variable} h-full antialiased`}
		>
			<head>
				<script
					id='theme-init'
					dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
				/>
			</head>
			<body className='min-h-full flex flex-col bg-background text-foreground'>
				<header className='pointer-events-none fixed top-6 z-50 w-full'>
					<Navigation />
				</header>
				{children}
				<Footer />
			</body>
		</html>
	);
}
