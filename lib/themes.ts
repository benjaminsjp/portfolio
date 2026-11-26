export const THEME_STORAGE_KEY = 'theme';
export const THEME_CHANGE_EVENT = 'themechange';

export const THEMES = [
	{ id: 'warm', label: 'Varm', swatch: 'oklch(0.76 0.13 68)' },
	{ id: 'midnight-blue', label: 'Midnatt', swatch: 'oklch(0.72 0.14 255)' },
	{ id: 'forest-green', label: 'Skog', swatch: 'oklch(0.72 0.12 145)' },
	{ id: 'rose', label: 'Rose', swatch: 'oklch(0.72 0.14 20)' },
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];

const THEME_IDS = new Set<string>(THEMES.map((theme) => theme.id));

export function isThemeId(value: string | null): value is ThemeId {
	return value !== null && THEME_IDS.has(value);
}

export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(${JSON.stringify(THEMES.map((theme) => theme.id))}.indexOf(t)!==-1)document.documentElement.setAttribute('data-theme',t)}catch(e){}})();`;
