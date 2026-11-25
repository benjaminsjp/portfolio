import NavigationMenu from '../ui-components/navigation-menu';

function Navigation() {
	const items = [
		{ label: 'Hjem', href: '/#' },
		{ label: 'Prosjekter', href: '/#projects' },
		{ label: 'Om meg', href: '/#about' },
		{ label: 'Kontakt', href: '/kontakt' },
	];

	return (
		<>
			<NavigationMenu items={items} />
		</>
	);
}

export default Navigation;
