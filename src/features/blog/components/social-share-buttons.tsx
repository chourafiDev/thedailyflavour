import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaPinterest } from "react-icons/fa";
import { buttonVariants } from "@/components/ui/button";
import type { DummyRecipe } from "@/lib/dummy-data";
import { siteConfig } from "@/lib/metadata";
import { cn } from "@/lib/utils";

interface SocialShareButtonsProps {
	post: DummyRecipe;
}

const SocialShareButtons = ({ post }: SocialShareButtonsProps) => {
	const postUrl = `${siteConfig.url}/blog/${post.slug}`;
	const postTitle = post.title || "Check out this recipe";
	const postImage = post.mainImage?.url
		? post.mainImage.url.startsWith("http")
			? post.mainImage.url
			: `${siteConfig.url}${post.mainImage.url}`
		: `${siteConfig.url}/default-og-image.jpg`;

	const encodedUrl = encodeURIComponent(postUrl);
	const encodedTitle = encodeURIComponent(postTitle);
	const encodedImage = encodeURIComponent(postImage);

	return (
		<div>
			<p className="text-foreground font-bold text-[15px] mb-3">
				Share This Post
			</p>

			<div className="space-y-2">
				{/* Facebook Share */}
				<Link
					href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
					aria-label="Share on Facebook"
					rel="noopener noreferrer"
					target="_blank"
					className={cn(
						buttonVariants({ variant: "outline" }),
						"font-semibold w-full py-4 text-sm cursor-pointer bg-background dark:bg-soft-linen",
					)}
				>
					<FaFacebook aria-hidden="true" />
					Facebook
				</Link>

				{/* Twitter/X Share */}
				<Link
					href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
					aria-label="Share on Twitter"
					rel="noopener noreferrer"
					target="_blank"
					className={cn(
						buttonVariants({ variant: "outline" }),
						"font-semibold w-full py-4 text-sm cursor-pointer bg-background dark:bg-soft-linen",
					)}
				>
					<BsTwitterX aria-hidden="true" />
					Twitter
				</Link>

				{/* Pinterest Share */}
				<Link
					href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedTitle}`}
					aria-label="Share on Pinterest"
					rel="noopener noreferrer"
					target="_blank"
					className={cn(
						buttonVariants({ variant: "outline" }),
						"font-semibold w-full py-4 text-sm cursor-pointer bg-background dark:bg-soft-linen",
					)}
				>
					<FaPinterest aria-hidden="true" />
					Pinterest
				</Link>
			</div>
		</div>
	);
};

export default SocialShareButtons;
