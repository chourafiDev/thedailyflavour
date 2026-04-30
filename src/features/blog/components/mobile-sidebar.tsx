"use client";

import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaArrowRight, FaFacebook, FaPinterest } from "react-icons/fa";
import type { TableOfContentHeading } from "@/components/table-of-content";
import TableOfContent from "@/components/table-of-content";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/metadata";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
	slug: string;
	title: string;
	imageUrl?: string;
	headings: TableOfContentHeading[];
}

const MobileSidebar = ({
	slug,
	title,
	imageUrl,
	headings,
}: MobileSidebarProps) => {
	const postUrl = `${siteConfig.url}/blog/${slug}`;
	const postImage = imageUrl
		? imageUrl.startsWith("http")
			? imageUrl
			: `${siteConfig.url}${imageUrl}`
		: `${siteConfig.url}/default-og-image.jpg`;

	const encodedUrl = encodeURIComponent(postUrl);
	const encodedTitle = encodeURIComponent(title);
	const encodedImage = encodeURIComponent(postImage);

	return (
		<div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border px-2 py-3 flex items-center gap-2">
			{/* Share label */}
			<span className="text-xs font-bold text-foreground shrink-0">Share:</span>

			{/* Facebook */}
			<Link
				href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
				aria-label="Share on Facebook"
				rel="noopener noreferrer"
				target="_blank"
				className={cn(
					buttonVariants({ variant: "outline", size: "sm" }),
					"flex-1 bg-background dark:bg-soft-linen gap-1.5",
				)}
			>
				<FaFacebook className="size-3.5 text-[#1877F2]" aria-hidden="true" />
				<span className="text-xs font-semibold hidden sm:block">Facebook</span>
			</Link>

			{/* Twitter */}
			<Link
				href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
				aria-label="Share on Twitter"
				rel="noopener noreferrer"
				target="_blank"
				className={cn(
					buttonVariants({ variant: "outline", size: "sm" }),
					"flex-1 bg-background dark:bg-soft-linen gap-1.5",
				)}
			>
				<BsTwitterX className="size-3.5" aria-hidden="true" />
				<span className="text-xs font-semibold hidden sm:block">Twitter</span>
			</Link>

			{/* Pinterest share */}
			<Link
				href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`}
				aria-label="Share on Pinterest"
				rel="noopener noreferrer"
				target="_blank"
				className={cn(
					buttonVariants({ variant: "outline", size: "sm" }),
					"flex-1 bg-background dark:bg-soft-linen gap-1.5",
				)}
			>
				<FaPinterest className="size-3.5 text-[#E60023]" aria-hidden="true" />
				<span className="text-xs font-semibold hidden sm:block">Pinterest</span>
			</Link>

			{/* Divider */}
			<div className="h-6 w-[1px] bg-border shrink-0" aria-hidden="true" />

			{/* Pinterest follow */}
			<Link
				href="https://www.pinterest.com/the_daily_flavour/"
				target="_blank"
				rel="noopener noreferrer"
				className={cn(
					buttonVariants({ variant: "default", size: "sm", shadow: "sm" }),
					"bg-[#E60023] dark:text-white dark:border-[#E60023] shrink-0 gap-1.5",
				)}
			>
				<FaPinterest className="size-3.5" aria-hidden="true" />
				<span className="text-xs font-semibold hidden sm:block">Pinterest</span>
				<FaArrowRight className="size-3" aria-hidden="true" />
			</Link>

			{/* Table of contents */}
			<div className="shrink-0">
				<TableOfContent
					headings={headings}
					size="sm"
					className="text-xs"
					showIcon={false}
				/>
			</div>
		</div>
	);
};

export default MobileSidebar;
