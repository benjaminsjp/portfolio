import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
	'inline-flex items-center rounded-full border border-transparent px-2.5 py-1 text-sm',
	{
		variants: {
			variant: {
				default: 'bg-primary/10 text-primary',
				brand: '',
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
}: React.ComponentProps<'span'> & { variant?: 'default' | 'brand'; color?: string }) {
	const brandStyle = color
		? {
				color,
				backgroundColor: `color-mix(in oklch, ${color} 8%, transparent)`,
				borderColor: `color-mix(in oklch, ${color} 22%, transparent)`,
			}
		: undefined;

	return (
		<span
			className={cn(
				badgeVariants({ variant: color ? 'brand' : variant }),
				className,
			)}
			style={{ ...brandStyle, ...style }}
			{...props}
		>
			{children}
		</span>
	);
}

export default Badge;
