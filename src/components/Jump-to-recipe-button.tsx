"use client";

import { FaArrowDown } from "react-icons/fa6";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function JumpToRecipeButton() {
	return (
		<button
			type="button"
			onClick={() =>
				document
					.getElementById("recipe-card")
					?.scrollIntoView({ behavior: "smooth", block: "start" })
			}
			className={cn(
				buttonVariants({ variant: "default", size: "lg", shadow: "sm" }),
				"py-[22px] has-[>svg]:px-16",
			)}
		>
			Jump To Recipe <FaArrowDown />
		</button>
	);
}
