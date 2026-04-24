"use client";

import { Printer } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PrintRecipeButton() {
	const handlePrint = () => {
		document.body.classList.add("print-recipe-only");
		window.print();
		document.body.classList.remove("print-recipe-only");
	};

	return (
		<button
			type="button"
			onClick={handlePrint}
			className={cn(
				buttonVariants({ variant: "outline", size: "lg", shadow: "sm" }),
				"gap-2 text-foreground",
			)}
		>
			<Printer size={16} />
			Print Recipe
		</button>
	);
}
