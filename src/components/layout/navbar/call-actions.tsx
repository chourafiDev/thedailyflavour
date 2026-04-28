import Link from "next/link";
import { Suspense } from "react";
import { FaInstagram, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import SearchSheet from "@/components/layout/navbar/search-sheet";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../../ui/button";
import { Skiper } from "./theme-toggle-button";
import SearchSheetWrapper from "./search-sheet-wrapper";

const CallActions = () => {
	return (
		<div className="flex items-center gap-1">
			<Skiper />

			<Suspense fallback={<div>Loading search...</div>}>
				<SearchSheetWrapper />
			</Suspense>

			<div className="h-10 w-1 mx-3 bg-border" />
			<div className="md:flex hidden items-center gap-2">
				<Link
					href="/contact"
					className={cn(
						buttonVariants({
							variant: "default",
							size: "icon",
							shadow: "soft",
						}),
						"size-10",
					)}
				>
					<FaPinterestP />
				</Link>
				<Link
					href="/contact"
					className={cn(
						buttonVariants({
							variant: "default",
							size: "icon",
							shadow: "soft",
						}),
						"size-10",
					)}
				>
					<FaInstagram />
				</Link>
				<Link
					href="/contact"
					className={cn(
						buttonVariants({
							variant: "default",
							size: "icon",
							shadow: "soft",
						}),
						"size-10",
					)}
				>
					<FaXTwitter />
				</Link>
			</div>
		</div>
	);
};

export default CallActions;
