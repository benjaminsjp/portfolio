'use client';

import { useEffect, useState, type KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import {
	isThemeId,
	THEME_CHANGE_EVENT,
	THEME_STORAGE_KEY,
	THEMES,
	type ThemeId,
} from '@/lib/themes';

function ThemePicker({
	className,
	name,
}: {
	className?: string;
	name: 'theme-picker-nav' | 'theme-picker-menu';
}) {
	const [theme, setTheme] = useState<ThemeId>('warm');

	useEffect(() => {
		document.documentElement.setAttribute('data-mode', 'dark');
		document.documentElement.style.colorScheme = 'dark';

		const current = document.documentElement.getAttribute('data-theme');
		if (isThemeId(current)) {
			setTheme(current);
		}

		const onChange = (event: Event) => {
			const id = (event as CustomEvent<string>).detail;
			if (isThemeId(id)) {
				setTheme(id);
			}
		};

		window.addEventListener(THEME_CHANGE_EVENT, onChange);
		return () => window.removeEventListener(THEME_CHANGE_EVENT, onChange);
	}, []);

	const select = (id: ThemeId) => {
		setTheme(id);
		document.documentElement.setAttribute('data-theme', id);
		window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: id }));
		try {
			localStorage.setItem(THEME_STORAGE_KEY, id);
		} catch {
			// private mode
		}
	};

	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		const index = THEMES.findIndex((item) => item.id === theme);
		if (index < 0) return;

		let nextIndex: number | null = null;
		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			nextIndex = (index + 1) % THEMES.length;
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			nextIndex = (index - 1 + THEMES.length) % THEMES.length;
		}

		if (nextIndex === null) return;
		event.preventDefault();
		select(THEMES[nextIndex].id);
	};

	return (
		<div
			role='radiogroup'
			aria-label='Fargetema'
			className={cn('flex items-center gap-1', className)}
			style={{ viewTransitionName: name }}
			onKeyDown={onKeyDown}
		>
			{THEMES.map((item) => {
				const selected = theme === item.id;

				return (
					<button
						key={item.id}
						type='button'
						role='radio'
						aria-checked={selected}
						aria-label={item.label}
						title={item.label}
						tabIndex={selected ? 0 : -1}
						onClick={() => select(item.id)}
						className={cn(
							'inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
							selected && 'border-2 border-ring ring-offset-0',
						)}
					>
						<span
							aria-hidden
							className='size-5 rounded-full'
							style={{ backgroundColor: item.swatch }}
						/>
					</button>
				);
			})}
		</div>
	);
}

export { ThemePicker };
export default ThemePicker;
