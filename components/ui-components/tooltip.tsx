interface TooltipProps {
	content: string;
	children: React.ReactNode;
}

function Tooltip({ children, content }: TooltipProps) {
	return (
		<div className='group relative inline-flex items-center'>
			{children}
			<span
				role='tooltip'
				className='absolute top-full left-1/2 z-10 mt-2 -translate-x-1/2 -translate-y-1 scale-95 whitespace-nowrap rounded-md border border-border bg-background px-3 py-2 text-base text-secondary-foreground opacity-0 shadow-sm transition-[opacity,translate,scale] [duration:120ms,200ms,200ms] ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:scale-100 motion-reduce:transition-none'
			>
				{content}
			</span>
		</div>
	);
}

export default Tooltip;
