import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { NavItemMobile } from "@/components/navigation-menu";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { NavigationMenu } from ".";
import Logo from "./logo";

const MobileNav = ({ menu }: { menu: NavigationMenu }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="rounded-full lg:hidden"
					data-slot="button"
					type="button"
					aria-haspopup="dialog"
					aria-expanded="false"
					aria-controls="radix-_R_56lb_"
					data-state="closed"
					aria-label="Open navigation menu"
					title="Menu"
				>
					<MenuIcon className="size-5" />
				</Button>
			</SheetTrigger>
			<SheetContent className="bg-white w-full flex justify-between gap-0 p-4">
				<div>
					<div className="px-4 pb-4 border-b">
						<Logo />
					</div>
					<div className="container grid gap-y-6 overflow-y-auto px-4 pt-5 pb-12">
						{menu.map((item) =>
							item.submenu ? (
								<Accordion type="single" collapsible key={item.label}>
									<AccordionItem value="item-1">
										<AccordionTrigger className="capitalize text-base font-semibold hover:no-underline py-0">
											{item.label}
										</AccordionTrigger>
										<AccordionContent className="space-y-0 pb-0">
											<ul className="grid gap-0 font-medium pt-3">
												{item?.items?.map((item) => (
													<li key={item.href}>
														<SheetClose asChild>
															<NavItemMobile item={item} />
														</SheetClose>
													</li>
												))}
											</ul>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							) : (
								<Link
									href={`/${item.href}`}
									key={item.label}
									className="text-base font-semibold"
								>
									{item.label}
								</Link>
							),
						)}
					</div>
				</div>

				<Link
					href="/"
					className={cn(
						buttonVariants({ variant: "default", size: "lg" }),
						"h-12",
					)}
				>
					Let&apos;s Talk
				</Link>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNav;
