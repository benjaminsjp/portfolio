import type { CSSProperties } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { TechColor } from '@/lib/projects';

const badgeVariants = cva(
	'inline-flex items-center rounded-full border border-transparent px-2.5 py-1 text-sm',
	{
		variants: {
			variant: {
				default: 'bg-primary/10 text-primary',
				simple: 'bg-secondary/40 text-foreground border-border',
				chip: '',
			},
			size: {
				sm: 'text-sm',
				md: 'text-base',
				lg: 'text-lg',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

function Badge({
	variant = 'default',
	color,
	className,
	style,
	children,
	...props
}: Omit<React.ComponentProps<'span'>, 'color'> & {
	variant?: 'default' | 'simple';
	color?: TechColor;
}) {
	const colorStyle =
		color ?
			({
				'--badge-dark': color.dark,
				color: 'light-dark(oklch(from var(--badge-dark) clamp(0.12, (0.62 - l) * 100, 0.98) 0 0), oklch(from var(--badge-dark) max(l, 0.82) c h))',
				backgroundColor:
					'light-dark(var(--badge-dark), color-mix(in oklch, var(--badge-dark) 5%, transparent))',
				borderColor:
					'light-dark(var(--badge-dark), color-mix(in oklch, var(--badge-dark) 22%, transparent))',
			} as CSSProperties)
		:	undefined;

	return (
		<span
			data-badge-color={color ? '' : undefined}
			className={cn(
				badgeVariants({ variant: color ? 'chip' : variant }),
				className,
			)}
			style={{ ...colorStyle, ...style }}
			{...props}
		>
			{children}
		</span>
	);
}

export default Badge;
