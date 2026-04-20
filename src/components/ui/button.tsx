import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 !cursor-pointer whitespace-nowrap rounded-full text-base font-semibold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: "bg-primary text-background",
				destructive:
					"bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"border bg-background hover:border-[2px] hover:border-foreground transition-colors",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors",
				white: "bg-white text-white-foreground",
				ghost:
					"hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 transition-colors",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-12 px-10 has-[>svg]:px-4",
				icon: "size-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
			shadow: {
				bold: [
					"border-2 border-foreground",
					"[box-shadow:4px_4px_0px_0px_#000]",
					"hover:translate-x-[4px] hover:translate-y-[4px] hover:[box-shadow:0px_0px_0px_0px_#000]",
					"active:translate-x-[4px] active:translate-y-[4px] active:[box-shadow:0px_0px_0px_0px_#000]",
					"transition-[transform,box-shadow] transition duration-300 ease-in-out",
				].join(" "),
				soft: [
					"border-2 border-foreground",
					"[box-shadow:3px_3px_0px_0px_#000]",
					"hover:translate-x-[3px] hover:translate-y-[3px] hover:[box-shadow:0px_0px_0px_0px_#000]",
					"active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_0px_0px_#000]",
					"transition-[transform,box-shadow] transition duration-300 ease-in-out",
				].join(" "),
				sm: [
					"border-2 border-foreground",
					"[box-shadow:2px_2px_0px_0px_#000]",
					"hover:translate-x-[2px] hover:translate-y-[2px] hover:[box-shadow:0px_0px_0px_0px_#000]",
					"active:translate-x-[2px] active:translate-y-[2px] active:[box-shadow:0px_0px_0px_0px_#000]",
					"transition-[transform,box-shadow] transition duration-300 ease-in-out",
				].join(" "),
				none: "transition-all",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			shadow: "none",
		},
	},
);

function Button({
	className,
	variant,
	size,
	shadow,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, shadow, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
