import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import Image from "next/image";
import Link from "next/link";
import type { DummyRecipe } from "@/lib/dummy-data";

const PLACEHOLDER =
	"https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80";

export function BlogCard({ post }: { post: DummyRecipe }) {
	const imageUrl = post.mainImage?.url || PLACEHOLDER;
	const imageAlt = post.mainImage?.alt || post.title || "Featured recipe";
	const categoryTitle = post.category?.title || "Recipes";
	const postTitle = post.title || "Untitled Recipe";
	const postSlug = post.slug || "#";

	return (
		<NavigationMenuPrimitive.Link asChild>
			<Link
				href={`/blog/${postSlug}`}
				className="group relative isolate z-0 flex h-full min-h-[200px] rounded-md overflow-hidden transition-colors duration-75"
			>
				{/* Background Image */}
				<Image
					src={imageUrl}
					alt={imageAlt}
					fill
					sizes="(max-width: 768px) 100vw, 33vw"
					className="absolute object-cover transition-all duration-300 group-hover:scale-110"
				/>

				{/* Category Badge */}
				<div className="absolute top-3 left-3 bg-foreground/20 backdrop-blur-md border dark:border-white px-4 py-1.5 rounded-full z-20">
					<p className="text-[11px] text-white font-semibold uppercase">
						{categoryTitle}
					</p>
				</div>

				{/* Title */}
				<div className="absolute bottom-0 left-0 w-full z-10">
					<h3 className="text-white font-bold text-base leading-6 px-4 pb-4 group-hover:underline">
						{postTitle}
					</h3>
				</div>

				{/* Gradient Overlay */}
				<div className="absolute bg-gradient-to-t from-black/80 to-transparent h-full w-full top-0 left-0" />
			</Link>
		</NavigationMenuPrimitive.Link>
	);
}
