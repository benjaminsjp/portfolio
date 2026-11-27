export const THEME_STORAGE_KEY = 'theme';
export const THEME_CHANGE_EVENT = 'themechange';
export const MODE_STORAGE_KEY = 'mode';
export const MODE_CHANGE_EVENT = 'modechange';

export const THEMES = [
	{ id: 'warm', label: 'Varm', swatch: 'oklch(0.76 0.13 68)' },
	{ id: 'midnight-blue', label: 'Midnatt', swatch: 'oklch(0.72 0.14 255)' },
	{ id: 'forest-green', label: 'Skog', swatch: 'oklch(0.72 0.12 145)' },
	{ id: 'rose', label: 'Rose', swatch: 'oklch(0.72 0.14 20)' },
] as const;

export const MODES = [
	{ id: 'light', label: 'Lys' },
	{ id: 'dark', label: 'Mørk' },
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];
export type ModeId = (typeof MODES)[number]['id'];

const THEME_IDS = new Set<string>(THEMES.map((theme) => theme.id));
const MODE_IDS = new Set<string>(MODES.map((mode) => mode.id));

export function isThemeId(value: string | null): value is ThemeId {
	return value !== null && THEME_IDS.has(value);
}

export function isModeId(value: string | null): value is ModeId {
	return value !== null && MODE_IDS.has(value);
}

export const THEME_INIT_SCRIPT = `(function(){try{var d=document.documentElement;var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(${JSON.stringify(THEMES.map((theme) => theme.id))}.indexOf(t)!==-1)d.setAttribute('data-theme',t);var m=localStorage.getItem('${MODE_STORAGE_KEY}');var mode=m==='light'||m==='dark'?m:'dark';d.setAttribute('data-mode',mode);d.style.colorScheme=mode}catch(e){}})();`;
