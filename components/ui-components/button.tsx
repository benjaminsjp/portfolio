import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
	'rounded-sm font-medium min-h-11 cursor-pointer inline-flex items-center justify-center border border-transparent transition-colors duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:pointer-events-none [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground hover:bg-primary/80',
				outline:
					'bg-transparent text-foreground border-primary hover:bg-primary/30',
				ghost: 'bg-transparent text-foreground hover:bg-primary/30',
				link: 'bg-transparent text-foreground underline-offset-4 hover:underline focus-visible:underline px-0',
			},
			size: {
				default: "px-4 py-2 gap-2 [&_svg:not([class*='size-'])]:size-4",
				lg: "px-6 py-3 text-lg gap-2 [&_svg:not([class*='size-'])]:size-5",
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
		compoundVariants: [
			{
				variant: 'link',
				class: 'px-0',
			},
		],
	},
);

interface ButtonProps {
	children: React.ReactNode;
	variant?: 'default' | 'outline' | 'ghost' | 'link';
	size?: 'default' | 'lg';
	className?: string;
}

function Button({ children, variant, size, className, ...props }: ButtonProps) {
	return (
		<button
			className={cn(buttonVariants({ variant, size }), className)}
			{...props}
		>
			{children}
		</button>
	);
}

export { buttonVariants, Button };
