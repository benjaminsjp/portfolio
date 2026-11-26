import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center rounded-full border border-transparent px-2.5 py-1 text-sm',
	{
		variants: {
			variant: {
				default: 'bg-primary/10 text-primary',
				simple: 'bg-secondary/40 text-foreground border-border',
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
}: React.ComponentProps<'span'> & {
	variant?: 'default' | 'simple';
	color?: string;
}) {
	const simpleStyle =
		color ?
			{
				color: `oklch(from ${color} max(l, 0.82) c h)`,
				backgroundColor: `color-mix(in oklch, ${color} 5%, transparent)`,
				borderColor: `color-mix(in oklch, ${color} 22%, transparent)`,
			}
		:	undefined;

	return (
		<span
			className={cn(
				badgeVariants({ variant: color ? 'simple' : variant }),
				className,
			)}
			style={{ ...simpleStyle, ...style }}
			{...props}
		>
			{children}
		</span>
	);
}

export default Badge;
