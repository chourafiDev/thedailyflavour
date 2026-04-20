"use client";

import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

// Local type — replaces TableOfContentHeading from @/types/extended-sanity
export interface TableOfContentHeading {
	id: string;
	text: string;
	level: "h2" | "h3" | "h4";
}

interface TableOfContentProps {
	headings: TableOfContentHeading[];
	title?: string;
}

const TableOfContent = ({
	headings,
	title = "Table of Contents",
}: TableOfContentProps) => {
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{
				rootMargin: "0px 0px -80% 0px",
				threshold: 0.1,
			},
		);

		for (const heading of headings) {
			const element = document.getElementById(heading.id);
			if (element) {
				observer.observe(element);
			}
		}

		return () => {
			observer.disconnect();
		};
	}, [headings]);

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		e.preventDefault();
		const element = document.getElementById(id);
		if (element) {
			const yOffset = -80;
			const y =
				element.getBoundingClientRect().top + window.pageYOffset + yOffset;
			window.scrollTo({ top: y, behavior: "smooth" });
		}
	};

	if (headings.length === 0) return null;

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button className="w-full relative" size={"lg"} shadow={"bold"}>
					Table Of Content <Menu className="absolute right-4" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-[400px] sm:w-[540px] gap-0">
				<SheetHeader className="px-4 pt-4">
					<SheetTitle className="font-bold">{title}</SheetTitle>
					<SheetDescription>
						Jump to any section of this article
					</SheetDescription>
				</SheetHeader>

				<nav
					className="bg-white border-t border-gray-200 overflow-y-scroll py-4 px-2"
					aria-label="Table of contents"
				>
					<ol className="space-y-2">
						{headings.map((heading, index) => (
							<li
								key={heading.id}
								className={cn(
									heading.level === "h2" && "ml-0",
									heading.level === "h3" && "ml-4",
									heading.level === "h4" && "ml-8",
								)}
							>
								<a
									href={`#${heading.id}`}
									onClick={(e) => handleClick(e, heading.id)}
									className={cn(
										"flex items-center gap-2 py-1.5 px-3 text-sm transition-colors rounded-md hover:bg-soft-linen",
										activeId === heading.id
											? "bg-soft-linen text-link font-bold"
											: "text-foreground",
									)}
								>
									<span
										className={cn(
											"text-xs min-w-[20px]",
											activeId === heading.id
												? "text-foreground"
												: "text-foreground/80",
										)}
									>
										{index + 1}.
									</span>
									<span className="flex-1">{heading.text}</span>
								</a>
							</li>
						))}
					</ol>
				</nav>
			</SheetContent>
		</Sheet>
	);
};

export default TableOfContent;
