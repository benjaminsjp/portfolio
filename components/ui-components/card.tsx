import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const cardVariants = cva('overflow-hidden', {
	variants: {
		variant: {
			default:
				'bg-secondary/80 shadow-sm backdrop-blur-sm border border-border rounded-xl',
			simple: 'bg-transparent shadow-none border-none',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

function Card({
	className,
	variant,
	...props
}: React.ComponentProps<'div'> & { variant?: 'default' | 'simple' }) {
	return (
		<div className={cn(cardVariants({ variant }), className)} {...props} />
	);
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
	return <div className={cn('p-0', className)} {...props} />;
}

export { Card, CardContent };
