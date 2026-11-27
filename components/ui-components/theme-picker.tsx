'use client';

import { useEffect, useState, type KeyboardEvent } from 'react';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
	DEFAULT_MODE,
	DEFAULT_THEME,
	isModeId,
	isThemeId,
	MODE_CHANGE_EVENT,
	MODE_STORAGE_KEY,
	THEME_CHANGE_EVENT,
	THEME_STORAGE_KEY,
	THEMES,
	type ModeId,
	type ThemeId,
} from '@/lib/themes';
import Tooltip from '../ui-components/tooltip';

function persistAttribute(
	attribute: 'data-theme' | 'data-mode',
	storageKey: string,
	eventName: string,
	value: string,
) {
	document.documentElement.setAttribute(attribute, value);
	window.dispatchEvent(new CustomEvent(eventName, { detail: value }));
	try {
		localStorage.setItem(storageKey, value);
	} catch {
		// private mode
	}
}

function ThemePicker({
	className,
	name,
}: {
	className?: string;
	name: 'theme-picker-nav' | 'theme-picker-menu';
}) {
	const [theme, setTheme] = useState<ThemeId>(DEFAULT_THEME);
	const [mode, setMode] = useState<ModeId>(DEFAULT_MODE);

	useEffect(() => {
		const currentTheme = document.documentElement.getAttribute('data-theme');
		if (isThemeId(currentTheme)) {
			setTheme(currentTheme);
		}

		const currentMode = document.documentElement.getAttribute('data-mode');
		if (isModeId(currentMode)) {
			setMode(currentMode);
		}

		const onThemeChange = (event: Event) => {
			const id = (event as CustomEvent<string>).detail;
			if (isThemeId(id)) {
				setTheme(id);
			}
		};

		const onModeChange = (event: Event) => {
			const id = (event as CustomEvent<string>).detail;
			if (isModeId(id)) {
				setMode(id);
			}
		};

		window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);
		window.addEventListener(MODE_CHANGE_EVENT, onModeChange);
		return () => {
			window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
			window.removeEventListener(MODE_CHANGE_EVENT, onModeChange);
		};
	}, []);

	const selectMode = (id: ModeId) => {
		if (!isThemeId(document.documentElement.getAttribute('data-theme'))) {
			setTheme(DEFAULT_THEME);
			persistAttribute(
				'data-theme',
				THEME_STORAGE_KEY,
				THEME_CHANGE_EVENT,
				DEFAULT_THEME,
			);
		}
		setMode(id);
		document.documentElement.style.colorScheme = id;
		persistAttribute('data-mode', MODE_STORAGE_KEY, MODE_CHANGE_EVENT, id);
	};

	const selectTheme = (id: ThemeId) => {
		setTheme(id);
		persistAttribute('data-theme', THEME_STORAGE_KEY, THEME_CHANGE_EVENT, id);
		if (!isModeId(document.documentElement.getAttribute('data-mode'))) {
			selectMode(DEFAULT_MODE);
		}
	};

	const onThemeKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		const nextId = nextInGroup(THEMES, theme, event.key);
		if (!nextId) return;
		event.preventDefault();
		selectTheme(nextId);
	};

	const isLight = mode === 'light';
	const ModeIcon = isLight ? Moon : Sun;

	return (
		<div
			className={cn('flex items-center', className)}
			style={{ viewTransitionName: name }}
		>
			<div
				role='radiogroup'
				aria-label='Fargetema'
				className='flex items-center gap-1'
				onKeyDown={onThemeKeyDown}
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
							onClick={() => selectTheme(item.id)}
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
			<div className='flex bg-secondary w-px h-8 mx-1' />
			<Tooltip content={isLight ? 'Bytt til mørk modus' : 'Bytt til lys modus'}>
				<button
					type='button'
					role='switch'
					aria-checked={isLight}
					aria-label={isLight ? 'Bytt til mørk modus' : 'Bytt til lys modus'}
					title={isLight ? 'Bytt til mørk modus' : 'Bytt til lys modus'}
					onClick={() => selectMode(isLight ? 'dark' : 'light')}
					className='inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
				>
					<ModeIcon aria-hidden className='size-4' />
				</button>
			</Tooltip>
		</div>
	);
}

function nextInGroup<T extends { id: string }>(
	items: readonly T[],
	current: T['id'],
	key: string,
): T['id'] | null {
	const index = items.findIndex((item) => item.id === current);
	if (index < 0) return null;

	if (key === 'ArrowRight' || key === 'ArrowDown') {
		return items[(index + 1) % items.length].id;
	}

	if (key === 'ArrowLeft' || key === 'ArrowUp') {
		return items[(index - 1 + items.length) % items.length].id;
	}

	return null;
}

export { ThemePicker };
export default ThemePicker;
