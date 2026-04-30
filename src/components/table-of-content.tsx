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

export interface TableOfContentHeading {
	id: string;
	text: string;
	level: "h2" | "h3" | "h4";
}

interface TableOfContentProps {
	headings: TableOfContentHeading[];
	title?: string;
	showIcon?: boolean;
	className?: string;
	size?:
		| "lg"
		| "default"
		| "sm"
		| "icon"
		| "icon-sm"
		| "icon-lg"
		| null
		| undefined;
}

const TableOfContent = ({
	headings,
	title = "Table of Contents",
	showIcon = true,
	className,
	size = "lg",
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
			const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
			window.scrollTo({ top: y, behavior: "smooth" });
		}
	};

	if (headings.length === 0) return null;

	let h2Count = 0;
	let h3Count = 0;

	const numberedHeadings = headings.map((heading) => {
		if (heading.level === "h2") {
			h2Count++;
			h3Count = 0;
			return { ...heading, number: `${h2Count}.` };
		}
		if (heading.level === "h3") {
			h3Count++;
			return { ...heading, number: `${h2Count}.${h3Count}` };
		}
		return { ...heading, number: "" };
	});

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					className={cn("w-full relative dark:text-background", className)}
					variant={"white"}
					size={size}
					shadow={"sm"}
				>
					Table Of Content {showIcon && <Menu className="absolute right-4" />}
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-[400px] sm:w-[540px] gap-0">
				<SheetHeader>
					<SheetTitle className="font-bold">{title}</SheetTitle>
					<SheetDescription>
						Jump to any section of this article
					</SheetDescription>
				</SheetHeader>

				<nav
					className="border-t border-gray-50 overflow-y-scroll py-4 px-2"
					aria-label="Table of contents"
				>
					<ol className="space-y-2">
						{numberedHeadings.map((heading) => (
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
										{heading.number}
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
