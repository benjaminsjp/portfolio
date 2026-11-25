import { ViewTransition } from 'react';
import Badge from './badge';
import {
	getFeaturedTech,
	getSortedTech,
	getTechTransitionName,
	type TechItem,
} from '@/lib/projects';

function TechStack({
	slug,
	tech,
	featured = false,
}: {
	slug: string;
	tech: TechItem[];
	featured?: boolean;
}) {
	const items = featured ? getFeaturedTech(tech) : getSortedTech(tech);

	return (
		<ul aria-label='Teknologistack' className='flex flex-wrap gap-2'>
			{items.map((item) => (
				<ViewTransition
					key={item.name}
					name={getTechTransitionName(slug, item.name)}
					share='morph'
					default='none'
				>
					<li>
						<Badge color={item.color}>{item.name}</Badge>
					</li>
				</ViewTransition>
			))}
		</ul>
	);
}

export { TechStack };
