import Link from "next/link";
import { Suspense } from "react";
import { FaInstagram, FaPinterestP } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../../ui/button";
import SearchSheetWrapper from "./search-sheet-wrapper";
import { Skiper } from "./theme-toggle-button";

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
					href="https://www.pinterest.com/the_daily_flavour/"
					target="_blank"
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
					href="https://www.instagram.com/the_daily_flavour_/"
					target="_blank"
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
			</div>
		</div>
	);
};

export default CallActions;
