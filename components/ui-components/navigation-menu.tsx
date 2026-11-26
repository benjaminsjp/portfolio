'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { MenuIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Tooltip from './tooltip';
import { Button } from './button';

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

function getItemRoute(item: NavigationItem, pathname: string) {
	const hashIndex = item.href.indexOf('#');
	const hash = hashIndex >= 0 ? item.href.slice(hashIndex) : null;
	const path =
		hashIndex >= 0 ? item.href.slice(0, hashIndex) || '/' : item.href;
	const isCurrentPageHash =
		Boolean(hash) && (path === pathname || (path === '/' && pathname === '/'));

	return { hash, isCurrentPageHash };
}

function NavigationItemLink({
	item,
	isCurrentPageHash,
	hash,
	className,
	...rest
}: {
	item: NavigationItem;
	isCurrentPageHash: boolean;
	hash: string | null;
	className?: string;
} & React.AriaAttributes) {
	const showLabel = item.showLabel !== false;
	const linkClassName = cn(
		'inline-flex items-center gap-2 hover:text-primary min-h-11 min-w-11 md:justify-center',
		className,
	);
	const ariaLabel = showLabel ? undefined : item.label;

	const content = (
		<>
			{item.icon}
			{showLabel ? item.label : null}
		</>
	);

	if (isCurrentPageHash && hash) {
		return (
			<a href={hash} className={linkClassName} aria-label={ariaLabel} {...rest}>
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
				className={linkClassName}
				aria-label={ariaLabel}
				{...rest}
			>
				{content}
			</a>
		);
	}

	return (
		<Link
			href={item.href}
			className={linkClassName}
			aria-label={ariaLabel}
			{...rest}
		>
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

		const large = window.matchMedia('(min-width: 1024px)');

		const updateOffset = () => {
			if (!large.matches) {
				setCenterX(0);
				return;
			}

			setCenterX(Math.max(0, (container.clientWidth - nav.offsetWidth) / 2));
		};

		updateOffset();
		const observer = new ResizeObserver(updateOffset);
		observer.observe(container);
		observer.observe(nav);
		large.addEventListener('change', updateOffset);
		return () => {
			observer.disconnect();
			large.removeEventListener('change', updateOffset);
		};
	}, []);

	return (
		<div ref={containerRef} className='container mx-auto hidden px-4 md:block'>
			<nav
				ref={navRef}
				aria-label='Hovedmeny'
				className={cn(
					'pointer-events-auto mx-auto w-fit rounded-xl border border-border bg-secondary/80 px-6 py-2 shadow-sm backdrop-blur-lg lg:mx-0',
					'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
				)}
				style={{ transform: `translateX(${centered ? centerX : 0}px)` }}
			>
				<ul className='flex items-center gap-8 text-secondary-foreground'>
					{items.map((item) => {
						const { hash, isCurrentPageHash } = getItemRoute(item, pathname);

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

function NavigationMenuMobile({ items }: NavigationMenuProps) {
	const pathname = usePathname();
	const menuId = useId();
	const rootRef = useRef<HTMLDivElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		setOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (!open) return;

		const onPointerDown = (event: PointerEvent) => {
			if (!rootRef.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return;
			setOpen(false);
			buttonRef.current?.focus();
		};

		document.addEventListener('pointerdown', onPointerDown);
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [open]);

	return (
		<div className='container mx-auto flex justify-end px-4 md:hidden'>
			<div
				ref={rootRef}
				className={cn(
					'pointer-events-auto flex flex-col items-end overflow-hidden rounded-xl border border-border bg-secondary/80 shadow-sm backdrop-blur-lg',
					'transition-[min-width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
					open && 'min-w-56',
				)}
			>
				<div className='flex flex-row items-center gap-2 w-full'>
					<div
						className={cn(
							'items-center gap-2 mr-auto pl-4',
							open ? 'flex' : 'hidden',
						)}
					>
						<p className='text-muted-foreground uppercase text-sm font-semibold'>
							Meny
						</p>
					</div>
					<Button
						ref={buttonRef}
						type='button'
						variant='ghost'
						size='icon'
						aria-expanded={open}
						aria-controls={menuId}
						aria-label={open ? 'Lukk meny' : 'Åpne meny'}
						onClick={() => setOpen((isOpen) => !isOpen)}
						className='shrink-0 bg-transparent hover:bg-transparent'
					>
						{open ?
							<XIcon />
						:	<MenuIcon />}
					</Button>
				</div>
				<div
					className={cn(
						'grid min-w-0 overflow-hidden  transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
						open ? 'w-full grid-rows-[1fr]' : 'w-0 grid-rows-[0fr]',
					)}
				>
					<nav
						id={menuId}
						aria-label='Hovedmeny'
						inert={!open}
						aria-hidden={!open}
						className='min-h-0 overflow-hidden'
						onClick={(event) => {
							if ((event.target as HTMLElement).closest('a')) {
								setOpen(false);
							}
						}}
					>
						<ul className='flex flex-col p-2 text-secondary-foreground border-t border-border'>
							{items.map((item) => {
								const { hash, isCurrentPageHash } = getItemRoute(
									item,
									pathname,
								);

								return (
									<li key={item.href}>
										<NavigationItemLink
											item={{ ...item, showLabel: true }}
											isCurrentPageHash={isCurrentPageHash}
											hash={hash}
											className='w-full rounded-lg px-3'
										/>
									</li>
								);
							})}
						</ul>
					</nav>
				</div>
			</div>
		</div>
	);
}

export { NavigationMenuMobile };
export default NavigationMenu;
