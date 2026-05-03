import Link from "next/link";
import { getNextRecipe, getPreviousRecipe } from "@/lib/wordpress";

interface PostNavigationProps {
	currentSlug: string;
}

type WPPost = {
	title: string;
	slug: string;
};

const PostNavigation = async ({ currentSlug }: PostNavigationProps) => {
	const [previousPost, nextPost] = await Promise.all([
		getPreviousRecipe(currentSlug),
		getNextRecipe(currentSlug),
	]);

	if (!previousPost && !nextPost) return null;

	return (
		<nav
			aria-label="Post navigation"
			className="lg:w-[80%] flex md:flex-row flex-col items-stretch bg-background dark:bg-soft-linen border rounded-lg mx-auto mb-28 overflow-hidden min-h-[8rem]"
		>
			{/* Previous Post */}
			{previousPost ? (
				<Link
					href={`/blog/${(previousPost as WPPost).slug}`}
					rel="prev"
					className="group px-10 py-6 flex-1 flex flex-col justify-center hover:bg-soft-linen dark:hover:bg-background transition-colors"
				>
					<span className="text-sm font-bold text-foreground underline">
						Previous Recipe
					</span>
					<h3 className="text-lg mt-2 font-bold text-foreground group-hover:underline line-clamp-2">
						{(previousPost as WPPost).title}
					</h3>
				</Link>
			) : (
				<div className="flex-1 px-10 py-6 flex flex-col justify-center opacity-50">
					<span className="text-sm font-bold text-muted-foreground">
						No previous recipe
					</span>
				</div>
			)}

			{/* Divider */}
			{previousPost && nextPost && (
				<div className="bg-border w-[1px]" aria-hidden="true" />
			)}

			{/* Next Post */}
			{nextPost ? (
				<Link
					href={`/blog/${(nextPost as WPPost).slug}`}
					rel="next"
					className="group text-right flex-1 px-10 py-6 flex flex-col justify-center hover:bg-soft-linen dark:hover:bg-background transition-colors"
				>
					<span className="text-sm font-bold text-foreground underline">
						Next Recipe
					</span>
					<h3 className="text-lg mt-2 font-bold text-foreground group-hover:underline line-clamp-2">
						{(nextPost as WPPost).title}
					</h3>
				</Link>
			) : (
				<div className="flex-1 px-10 py-6 flex flex-col justify-center text-right opacity-50">
					<span className="text-sm font-bold text-muted-foreground">
						No next recipe
					</span>
				</div>
			)}
		</nav>
	);
};

export default PostNavigation;
