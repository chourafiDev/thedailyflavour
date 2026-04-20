import CallActions from "./call-actions";
import DesktopMenu from "./desktop-menu";
import Logo from "./logo";
import MobileNav from "./mobile-nav";

export type NavigationItem = {
	href?: string;
	label: string;
	submenu?: boolean;
	type?: string;
	items?: {
		href: string;
		label: string;
	}[];
};

export type NavigationMenu = NavigationItem[];

const NAVIGATION_MENU: NavigationMenu = [
	{ href: "/", label: "Home" },
	{ href: "/category/dinner", label: "Dinner" },
	{ href: "/category/breakfast", label: "Breakfast" },
	{ href: "/category/dessert", label: "Dessert" },
	{ href: "/about-us", label: "About Us" },
	{
		label: "Discover More",
		submenu: true,
		type: "description",
		items: [
			{ href: "/category/drinks", label: "Drinks" },
			{ href: "/category/asian", label: "Asian Recipes" },
			{ href: "/category/healthy", label: "Healthy Eating" },
			{ href: "/category/meal-prep", label: "Meal Prep" },
			{ href: "/category/one-pan", label: "One Pan Dinners" },
			{ href: "/category/vegetarian", label: "Vegetarian" },
		],
	},
];

export default function NavBar() {
	return (
		<header className="custom-container sticky top-0 bg-background z-50 flex items-center justify-between border-b py-3.5">
			<div className="flex w-full h-full items-center justify-between">
				<Logo />
				<DesktopMenu menu={NAVIGATION_MENU} />

				<div className="flex items-center gap-2">
					<CallActions />
					<MobileNav menu={NAVIGATION_MENU} />
				</div>
			</div>
		</header>
	);
}
