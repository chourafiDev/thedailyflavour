import { NavSmallItem } from "@/components/navigation-menu";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { getFeaturedRecipes } from "@/lib/wordpress";
import type { NavigationMenu as TNavigationMenu } from ".";
import { BlogCard } from "./blog-card";

const DesktopMenu = async ({ menu }: { menu: TNavigationMenu }) => {
	const posts = await getFeaturedRecipes(3);

	return (
		<NavigationMenu className="hidden lg:block">
			<NavigationMenuList>
				{menu.map((item) =>
					item.submenu ? (
						<NavigationMenuItem key={item.label}>
							<NavigationMenuTrigger className="hover:bg-soft-linen font-bold text-base">
								{item.label}
							</NavigationMenuTrigger>
							<NavigationMenuContent>
								<div className="grid w-full md:w-4xl md:grid-cols-[.30fr_1fr]">
									{/* Submenu Items */}
									<ul className="space-y-1 pr-2 md:border-r">
										{item.items?.map((subItem) => (
											<li key={subItem.label}>
												<NavSmallItem item={subItem} />
											</li>
										))}
									</ul>

									{/* Featured Posts */}
									<ul className="grid grow gap-2 pl-2 md:grid-cols-3">
										{posts.map(
											(post: {
												slug: string;
												title: string;
												featuredImage?: {
													node: { sourceUrl: string; altText: string };
												};
												categories?: {
													nodes: { name: string; slug: string }[];
												};
											}) => (
												<li key={post.slug || post.title}>
													<BlogCard post={post} />
												</li>
											),
										)}
									</ul>
								</div>
							</NavigationMenuContent>
						</NavigationMenuItem>
					) : (
						<NavigationMenuItem key={item.label}>
							<NavigationMenuLink
								href={item.href || "#"}
								className={cn(
									"group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-base font-bold transition-colors hover:bg-soft-linen focus:bg-soft-linen focus:outline-none disabled:pointer-events-none disabled:opacity-50",
								)}
							>
								{item.label}
							</NavigationMenuLink>
						</NavigationMenuItem>
					),
				)}
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export default DesktopMenu;
