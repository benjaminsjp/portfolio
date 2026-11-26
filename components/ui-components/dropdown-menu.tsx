'use client';

import {
	cloneElement,
	createContext,
	isValidElement,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
	type KeyboardEvent,
	type ReactElement,
} from 'react';
import { usePathname } from 'next/navigation';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

type DropdownContextValue = {
	open: boolean;
	setOpen: (open: boolean) => void;
	triggerId: string;
	menuId: string;
	contentName: string;
	triggerRef: React.RefObject<HTMLButtonElement | null>;
	rootRef: React.RefObject<HTMLDivElement | null>;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdown() {
	const context = useContext(DropdownContext);
	if (!context) {
		throw new Error('DropdownMenu components must be used within DropdownMenu');
	}
	return context;
}

const CONTENT_DURATION_MS = 200;

const contentVariants = cva(
	'top-full absolute z-50 mt-2 min-w-40 rounded-md border border-border bg-background p-1 shadow-sm transition-[opacity,scale] duration-200 ease-out motion-reduce:transition-none',
	{
		variants: {
			align: {
				start: 'left-0 origin-top-left',
				end: 'right-0 origin-top-right',
			},
		},
		defaultVariants: {
			align: 'start',
		},
	},
);

const itemVariants = cva(
	'flex w-full min-h-11 cursor-pointer items-center rounded-lg px-3 text-left text-foreground outline-none select-none transition-colors duration-200 hover:bg-primary/30 focus-visible:bg-primary/30 focus-visible:ring-2 focus-visible:ring-ring/80 disabled:pointer-events-none disabled:opacity-50',
);

function DropdownMenu({
	children,
	className,
	...props
}: React.ComponentProps<'div'>) {
	const id = useId();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const rootRef = useRef<HTMLDivElement | null>(null);
	const contentName = `dropdown-${id.replace(/[^a-zA-Z0-9_-]/g, '')}`;

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

		const onKeyDown = (event: globalThis.KeyboardEvent) => {
			if (event.key !== 'Escape') return;
			event.preventDefault();
			setOpen(false);
			triggerRef.current?.focus();
		};

		document.addEventListener('pointerdown', onPointerDown);
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('pointerdown', onPointerDown);
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [open]);

	return (
		<DropdownContext.Provider
			value={{
				open,
				setOpen,
				triggerId: `${id}-trigger`,
				menuId: `${id}-menu`,
				contentName,
				triggerRef,
				rootRef,
			}}
		>
			<div
				ref={rootRef}
				className={cn('relative inline-flex', className)}
				{...props}
			>
				{children}
			</div>
		</DropdownContext.Provider>
	);
}

function DropdownMenuTrigger({
	render,
	children,
	className,
	onClick,
	...props
}: React.ComponentProps<'button'> & {
	render?: ReactElement<React.ComponentProps<'button'>>;
}) {
	const { open, setOpen, triggerId, menuId, triggerRef } = useDropdown();

	const triggerProps = {
		id: triggerId,
		type: 'button' as const,
		'aria-haspopup': 'menu' as const,
		'aria-expanded': open,
		'aria-controls': menuId,
		onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
			onClick?.(event);
			if (event.defaultPrevented) return;
			setOpen(!open);
		},
	};

	if (render) {
		if (!isValidElement(render)) return null;

		return cloneElement(render, {
			...triggerProps,
			ref: triggerRef,
			className: cn(render.props.className, className),
			onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
				render.props.onClick?.(event);
				triggerProps.onClick(event);
			},
		});
	}

	return (
		<button ref={triggerRef} className={className} {...triggerProps} {...props}>
			{children}
		</button>
	);
}

function getMenuItems(menu: HTMLElement) {
	return [
		...menu.querySelectorAll<HTMLButtonElement>(
			'[role="menuitem"]:not(:disabled)',
		),
	];
}

function DropdownMenuContent({
	children,
	className,
	align = 'start',
	...props
}: React.ComponentProps<'div'> & {
	align?: 'start' | 'end';
}) {
	const { open, menuId, triggerId, contentName } = useDropdown();
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [mounted, setMounted] = useState(open);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (open) {
			setMounted(true);
			setVisible(true);
			return;
		}

		setVisible(false);
		const timeout = window.setTimeout(
			() => setMounted(false),
			CONTENT_DURATION_MS,
		);
		return () => window.clearTimeout(timeout);
	}, [open]);

	useEffect(() => {
		if (!visible) return;
		const first = menuRef.current?.querySelector<HTMLButtonElement>(
			'[role="menuitem"]:not(:disabled)',
		);
		first?.focus();
	}, [visible]);

	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		const menu = menuRef.current;
		if (!menu) return;

		const items = getMenuItems(menu);
		if (items.length === 0) return;

		const currentIndex = items.indexOf(
			document.activeElement as HTMLButtonElement,
		);

		let nextIndex: number | null = null;
		if (event.key === 'ArrowDown') {
			nextIndex = (currentIndex + 1) % items.length;
		} else if (event.key === 'ArrowUp') {
			nextIndex = (currentIndex - 1 + items.length) % items.length;
		} else if (event.key === 'Home') {
			nextIndex = 0;
		} else if (event.key === 'End') {
			nextIndex = items.length - 1;
		}

		if (nextIndex === null) return;
		event.preventDefault();
		items[nextIndex]?.focus();
	};

	if (!mounted) return null;

	return (
		<div
			ref={menuRef}
			id={menuId}
			role='menu'
			aria-labelledby={triggerId}
			aria-hidden={!visible}
			className={cn(
				contentVariants({ align }),
				visible ?
					'scale-100 opacity-100 starting:scale-95 starting:opacity-0'
				:	'pointer-events-none scale-95 opacity-0',
				className,
			)}
			style={{ viewTransitionName: contentName }}
			onKeyDown={onKeyDown}
			{...props}
		>
			{children}
		</div>
	);
}

function DropdownMenuItem({
	children,
	className,
	onSelect,
	onClick,
	...props
}: React.ComponentProps<'button'> & {
	onSelect?: () => void;
}) {
	const { setOpen, triggerRef } = useDropdown();

	return (
		<button
			type='button'
			role='menuitem'
			tabIndex={-1}
			className={cn(itemVariants(), className)}
			{...props}
			onClick={(event) => {
				onClick?.(event);
				if (event.defaultPrevented) return;
				onSelect?.();
				setOpen(false);
				triggerRef.current?.focus();
			}}
		>
			{children}
		</button>
	);
}

function DropdownMenuSeparator({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			role='separator'
			className={cn('my-1 h-px bg-border', className)}
			{...props}
		/>
	);
}

function DropdownMenuGroup({
	children,
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div role='group' className={cn('flex flex-col', className)} {...props}>
			{children}
		</div>
	);
}

export {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuGroup,
};
