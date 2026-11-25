'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface NavigationMenuProps {
	items: {
		label: string;
		href: string;
	}[];
}

function NavigationMenu({ items }: NavigationMenuProps) {
	const pathname = usePathname();
	const containerRef = useRef<HTMLDivElement>(null);
	const navRef = useRef<HTMLElement>(null);
	const [scrolled, setScrolled] = useState(false);
	const [centerX, setCenterX] = useState(0);

	const centered = pathname !== '/' || scrolled;

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 64);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	useEffect(() => {
		const container = containerRef.current;
		const nav = navRef.current;
		if (!container || !nav) return;

		const updateOffset = () => {
			setCenterX(Math.max(0, (container.clientWidth - nav.offsetWidth) / 2));
		};

		updateOffset();
		const observer = new ResizeObserver(updateOffset);
		observer.observe(container);
		observer.observe(nav);
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={containerRef} className='container mx-auto px-4'>
			<nav
				ref={navRef}
				className={cn(
					'w-fit rounded-xl border border-border bg-secondary/80 px-6 py-4 shadow-sm backdrop-blur-lg',
					'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
				)}
				style={{ transform: `translateX(${centered ? centerX : 0}px)` }}
			>
				<ul className='flex items-center gap-8 text-secondary-foreground'>
					{items.map((item) => {
						const hashIndex = item.href.indexOf('#');
						const hash =
							hashIndex >= 0 ? item.href.slice(hashIndex) : null;
						const path =
							hashIndex >= 0
								? item.href.slice(0, hashIndex) || '/'
								: item.href;
						const isCurrentPageHash =
							Boolean(hash) && (path === pathname || (path === '/' && pathname === '/'));

						return (
							<li key={item.href}>
								{isCurrentPageHash ? (
									<a href={hash!} className='hover:text-primary'>
										{item.label}
									</a>
								) : (
									<Link href={item.href} className='hover:text-primary'>
										{item.label}
									</Link>
								)}
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}

export default NavigationMenu;
