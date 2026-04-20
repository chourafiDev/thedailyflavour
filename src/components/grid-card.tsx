import { touristCarryingLuggage } from "@/lib/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

export function GridCard({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"group relative isolate z-0 flex h-full rounded-lg overflow-hidden px-5 py-4 transition-colors duration-75",
				className,
			)}
			{...props}
		>
			<Link href="/">
				<Image
					src={touristCarryingLuggage}
					alt="title"
					fill
					placeholder="blur"
					className="absolute object-cover transition-all duration-300 group-hover:scale-110"
				/>

				<div className="absolute top-3 left-3 bg-foreground/20 backdrop-blur-md px-4 py-1.5 rounded-full z-20">
					<p className="text-[11px] text-white font-semibold uppercase">
						Travel
					</p>
				</div>

				<div className="absolute bottom-0 left-0 w-full z-10">
					<h3 className="text-white font-bold text-base leading-6 px-4 pb-4 group-hover:underline">
						Best places to travel solo female in us
					</h3>
				</div>

				<div className="absolute bg-gradient-to-t from-black/80 to-transparent h-full w-full top-0 left-0" />
			</Link>
		</div>
	);
}
