'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Tooltip from './tooltip';

type NavigationItem = {
	label: string;
	href: string;
	external?: boolean;
	showLabel?: boolean;
	icon?: React.ReactNode;
	tooltip?: string;
};

interface NavigationMenuProps {
	items: NavigationItem[];
}

function NavigationItemLink({
	item,
	isCurrentPageHash,
	hash,
}: {
	item: NavigationItem;
	isCurrentPageHash: boolean;
	hash: string | null;
}) {
	const showLabel = item.showLabel !== false;
	const className =
		'inline-flex items-center gap-2 hover:text-primary min-h-11';
	const ariaLabel = showLabel ? undefined : item.label;

	const content = (
		<>
			{item.icon}
			{showLabel ? item.label : null}
		</>
	);

	if (isCurrentPageHash && hash) {
		return (
			<a href={hash} className={className} aria-label={ariaLabel}>
				{content}
			</a>
		);
	}

	if (item.external) {
		return (
			<a
				href={item.href}
				target='_blank'
				rel='noopener noreferrer'
				className={className}
				aria-label={ariaLabel}
			>
				{content}
			</a>
		);
	}

	return (
		<Link href={item.href} className={className} aria-label={ariaLabel}>
			{content}
		</Link>
	);
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
					'w-fit rounded-xl border border-border bg-secondary/80 px-6 py-2 shadow-sm backdrop-blur-lg',
					'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
				)}
				style={{ transform: `translateX(${centered ? centerX : 0}px)` }}
			>
				<ul className='flex items-center gap-8 text-secondary-foreground'>
					{items.map((item) => {
						const hashIndex = item.href.indexOf('#');
						const hash = hashIndex >= 0 ? item.href.slice(hashIndex) : null;
						const path =
							hashIndex >= 0 ? item.href.slice(0, hashIndex) || '/' : item.href;
						const isCurrentPageHash =
							Boolean(hash) &&
							(path === pathname || (path === '/' && pathname === '/'));

						const link = (
							<NavigationItemLink
								item={item}
								isCurrentPageHash={isCurrentPageHash}
								hash={hash}
							/>
						);

						return (
							<li key={item.href}>
								{item.tooltip ?
									<Tooltip content={item.tooltip}>{link}</Tooltip>
								:	link}
							</li>
						);
					})}
				</ul>
			</nav>
		</div>
	);
}

export default NavigationMenu;
