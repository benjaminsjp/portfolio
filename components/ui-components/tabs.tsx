'use client';

import {
	Children,
	isValidElement,
	startTransition,
	useId,
	useRef,
	useState,
	ViewTransition,
	type KeyboardEvent,
	type ReactElement,
	type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

const tabsVariants = {
	horizontal: {
		root: 'flex flex-col gap-4',
		list: 'flex flex-row flex-wrap gap-2 border-b-2 border-border',
		trigger: 'border-b-2 -mb-0.5',
		panel: 'w-full min-w-0',
	},
	vertical: {
		root: 'flex lg:flex-row flex-col items-start gap-4',
		list: 'flex flex-row lg:flex-col shrink-0 gap-6 lg:gap-2 lg:border-l-2 lg:border-b-0 border-b-2 border-border',
		trigger:
			'lg:border-l-2 lg:border-b-0 border-b-2 lg:-ml-0.5 lg:mb-0 -mb-0.5 lg:px-6 py-4',
		panel: 'min-w-0 flex-1 w-full',
	},
} as const;

type TabProps = {
	label: string;
	description?: string;
	children: ReactNode;
};

function Tab({ children }: TabProps) {
	return children;
}

type TabElement = ReactElement<TabProps, typeof Tab>;

function isTabElement(child: unknown): child is TabElement {
	if (!isValidElement(child)) return false;
	const props = child.props as Partial<TabProps>;
	return typeof props.label === 'string';
}

function Tabs({
	orientation = 'horizontal',
	children,
	className,
	...props
}: {
	orientation?: 'horizontal' | 'vertical';
	children: ReactNode;
} & React.ComponentProps<'div'>) {
	const id = useId();
	const [activeIndex, setActiveIndex] = useState(0);
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const tabs = Children.toArray(children).filter(isTabElement);
	const currentIndex = Math.min(activeIndex, Math.max(tabs.length - 1, 0));
	const activeTab = tabs[currentIndex];

	const selectTab = (index: number, focus = false) => {
		startTransition(() => setActiveIndex(index));
		if (focus) {
			tabRefs.current[index]?.focus();
		}
	};

	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		if (tabs.length === 0) return;

		const prev = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
		const next = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';

		let nextIndex: number | null = null;
		if (event.key === prev) {
			nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
		} else if (event.key === next) {
			nextIndex = (currentIndex + 1) % tabs.length;
		} else if (event.key === 'Home') {
			nextIndex = 0;
		} else if (event.key === 'End') {
			nextIndex = tabs.length - 1;
		}

		if (nextIndex === null) return;
		event.preventDefault();
		selectTab(nextIndex, true);
	};

	return (
		<div className={cn(tabsVariants[orientation].root, className)} {...props}>
			<div
				role='tablist'
				aria-orientation={orientation}
				className={tabsVariants[orientation].list}
				onKeyDown={onKeyDown}
			>
				{tabs.map((tab, index) => {
					const selected = index === currentIndex;
					const tabId = `${id}-tab-${index}`;
					const panelId = `${id}-panel-${index}`;

					return (
						<button
							key={tabId}
							ref={(node) => {
								tabRefs.current[index] = node;
							}}
							type='button'
							role='tab'
							id={tabId}
							aria-selected={selected}
							aria-controls={panelId}
							tabIndex={selected ? 0 : -1}
							onClick={() => selectTab(index)}
							className={cn(
								'flex min-w-0 lg:min-w-xs cursor-pointer flex-col items-start gap-0.5 text-left outline-none select-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-ring/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
								tabsVariants[orientation].trigger,
								selected ?
									'border-primary text-foreground'
								:	'border-transparent text-muted-foreground hover:text-foreground',
							)}
						>
							<span className='font-semibold text-xl lg:text-2xl'>
								{tab.props.label}
							</span>
							{tab.props.description ?
								<span className='text-base text-muted-foreground'>
									{tab.props.description}
								</span>
							:	null}
						</button>
					);
				})}
			</div>
			<ViewTransition default='none' update='auto'>
				<div
					role='tabpanel'
					id={`${id}-panel-${currentIndex}`}
					aria-labelledby={`${id}-tab-${currentIndex}`}
					className={tabsVariants[orientation].panel}
				>
					{activeTab}
				</div>
			</ViewTransition>
		</div>
	);
}

export { Tabs, Tab };
export default Tabs;
