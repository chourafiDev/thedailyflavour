/* import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { touristCarryingLuggage } from "@/lib/assets";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";

export const navigationLinks = [
	{ href: "/", label: "Home" },
	{ href: "/blog", label: "Our Blog" },
	{
		label: "Categories",
		submenu: true,
		type: "description",
		items: [
			{
				href: "/destinations",
				label: "Destinations",
			},
			{
				href: "/travel-tips",
				label: "Travel Tips",
			},
			{
				href: "/safety",
				label: "Safety Guide",
			},
			{
				href: "/budget-travel",
				label: "Budget Travel",
			},
			{
				href: "/tours",
				label: "Tours & Experiences",
			},
			{
				href: "/packing",
				label: "Packing Guides",
			},
		],
	},
	{ href: "/about-us", label: "About Us" },
	{ href: "/contact", label: "Contact" },
];

const NavLinks = () => {
	return (
		<div className="flex items-center gap-2">
			<Popover>
				<PopoverTrigger asChild>
					<Button
						className="group size-8 md:hidden"
						variant="ghost"
						size="icon"
					>
						<svg
							className="pointer-events-none"
							width={16}
							height={16}
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							xmlns="http://www.w3.org/2000/svg"
						>
							<title>Menu</title>
							<path
								d="M4 12L20 12"
								className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
							/>
							<path
								d="M4 12H20"
								className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
							/>
							<path
								d="M4 12H20"
								className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
							/>
						</svg>
					</Button>
				</PopoverTrigger>
				<PopoverContent align="start" className="w-64 p-1 md:hidden">
					<NavigationMenu className="max-w-none *:w-full">
						<NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
							{navigationLinks.map((link, index) => (
								<NavigationMenuItem key={link.label} className="w-full">
									{link.submenu ? (
										<>
											<div className="text-orange-600 px-2 py-1.5 text-xs font-medium">
												{link.label}
											</div>
											<ul>
												{link.items.map((item, itemIndex) => (
													<li key={item.label}>
														<NavigationMenuLink
															href={item.href}
															className="py-1.5"
														>
															{item.label}
														</NavigationMenuLink>
													</li>
												))}
											</ul>
										</>
									) : (
										<NavigationMenuLink href={link.href} className="py-1.5">
											{link.label}
										</NavigationMenuLink>
									)}
									{index < navigationLinks.length - 1 &&
										((!link.submenu && navigationLinks[index + 1].submenu) ||
											(link.submenu && !navigationLinks[index + 1].submenu) ||
											(link.submenu &&
												navigationLinks[index + 1].submenu &&
												link.type !== navigationLinks[index + 1].type)) && (
											<div
												aria-orientation="horizontal"
												className="bg-border -mx-1 my-1 h-px w-full"
											/>
										)}
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</PopoverContent>
			</Popover>

			<NavigationMenu viewport={false} className="max-md:hidden">
				<NavigationMenuList className="gap-2">
					{navigationLinks.map((link, index) => (
						<NavigationMenuItem key={link.label}>
							{link.submenu ? (
								<>
									<NavigationMenuTrigger className="text-foreground bg-transparent text-[15px] hover:bg-soft-linen px-2 py-0 font-normal *:[svg]:-me-0.5 *:[svg]:size-3.5">
										{link.label}
									</NavigationMenuTrigger>
									<NavigationMenuContent className="data-[motion=from-end]:slide-in-from-right-16! data-[motion=from-start]:slide-in-from-left-16! data-[motion=to-end]:slide-out-to-right-16! data-[motion=to-start]:slide-out-to-left-16! z-50 p-1">
										<div className="w-[850px] flex items-start gap-6">
											<ul className="w-[40%] space-y-1">
												{link.items.map((cat) => (
													<li key={cat.href}>
														<Link href="/">
															<Card className="p-0 border-0 hover:bg-soft-linen duration-200 ease-linear">
																<CardContent className="flex items-center gap-3 p-2">
																	<div className="relative h-14 w-20 rounded-md overflow-hidden">
																		<Image
																			src={cat.image}
																			alt={cat.label}
																			fill
																			className="absolute object-cover"
																		/>
																	</div>

																	<div>
																		<p className="text-foreground font-medium">
																			{cat.label}
																		</p>
																		<p className="text-foreground/60 text-[13px] leading-[18px]">
																			Lorem ipsum dolor sit amet consectetur.
																		</p>
																	</div>
																</CardContent>
															</Card>
														</Link>
													</li>
												))}
											</ul>

											<div className="w-[60%] bg-soft-linen rounded-lg px-6 py-4">
												<p className="text-foreground font-medium text-[15px] mb-4">
													Latest Posts
												</p>

												<div className="space-y-5">
													<article className="flex items-center gap-3">
														<Link href="">
															<div className="relative w-40 h-24 rounded-lg overflow-hidden">
																<Image
																	src={touristCarryingLuggage}
																	alt=""
																	fill
																	placeholder="blur"
																	className="absolute object-cover transition-all duration-300 hover:scale-110"
																/>
															</div>
														</Link>

														<div>
															<div className="flex items-center gap-0 mt-4 mb-1">
																<p className="text-[10px] font-semibold text-foreground">
																	FEBRUARY 12, 2025
																</p>
																<RxDividerVertical className="text-foreground font-bold rotate-12" />
																<Link
																	href="/author"
																	className="text-[10px] text-foreground font-semibold"
																>
																	<span className="text-muted-foreground">
																		POST BY
																	</span>{" "}
																	MAYA PENA
																</Link>
															</div>

															<h3 className="post-title text-lg">
																<Link href="">
																	Best places to travel solo female in us
																</Link>
															</h3>
														</div>
													</article>
													<article className="flex items-center gap-3">
														<Link href="">
															<div className="relative w-40 h-24 rounded-lg overflow-hidden">
																<Image
																	src={touristCarryingLuggage}
																	alt=""
																	fill
																	placeholder="blur"
																	className="absolute object-cover transition-all duration-300 hover:scale-110"
																/>
															</div>
														</Link>

														<div>
															<div className="flex items-center gap-0 mt-4 mb-1">
																<p className="text-[10px] font-semibold text-foreground">
																	FEBRUARY 12, 2025
																</p>
																<RxDividerVertical className="text-foreground font-bold rotate-12" />
																<Link
																	href="/author"
																	className="text-[10px] text-foreground font-semibold"
																>
																	<span className="text-muted-foreground">
																		POST BY
																	</span>{" "}
																	MAYA PENA
																</Link>
															</div>

															<h3 className="post-title text-lg">
																<Link href="">
																	Best places to travel solo female in us
																</Link>
															</h3>
														</div>
													</article>
													<article className="flex items-center gap-3">
														<Link href="">
															<div className="relative w-40 h-24 rounded-lg overflow-hidden">
																<Image
																	src={touristCarryingLuggage}
																	alt=""
																	fill
																	placeholder="blur"
																	className="absolute object-cover transition-all duration-300 hover:scale-110"
																/>
															</div>
														</Link>

														<div>
															<div className="flex items-center gap-0 mt-4 mb-1">
																<p className="text-[10px] font-semibold text-foreground">
																	FEBRUARY 12, 2025
																</p>
																<RxDividerVertical className="text-foreground font-bold rotate-12" />
																<Link
																	href="/author"
																	className="text-[10px] text-foreground font-semibold"
																>
																	<span className="text-muted-foreground">
																		POST BY
																	</span>{" "}
																	MAYA PENA
																</Link>
															</div>

															<h3 className="post-title text-lg">
																<Link href="">
																	Best places to travel solo female in us
																</Link>
															</h3>
														</div>
													</article>
												</div>

												<Link
													href="/blog"
													className="mt-14 flex items-center gap-1.5 text-sm underline"
												>
													All Blog Posts{" "}
													<ArrowRight className="size-3 mt-0.5" />
												</Link>
											</div>
										</div>
									</NavigationMenuContent>
								</>
							) : (
								<NavigationMenuLink
									href={link.href}
									className="text-foreground hover:bg-soft-linen text-[15px] py-1.5 px-3 font-normal"
								>
									{link.label}
								</NavigationMenuLink>
							)}
						</NavigationMenuItem>
					))}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};

export default NavLinks;
 */