import { format } from "date-fns";
import Link from "next/link";
import JumpToRecipeButton from "@/components/Jump-to-recipe-button";
import PrintRecipeButton from "@/components/print-recipe-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ArticleHeaderPost {
	title: string;
	date: string;
	categories?: {
		nodes: { name: string; slug: string }[];
	};
	author: {
		name: string;
		slug: string;
		image?: string;
	};
}

interface ArticleHeaderProps {
	post: ArticleHeaderPost;
}

const ArticleHeader = ({ post }: ArticleHeaderProps) => {
	const title = post.title || "Untitled Post";
	const categoryTitle = post.categories?.nodes?.[0]?.name || "Recipes";
	const categorySlug = post.categories?.nodes?.[0]?.slug || "recipes";
	const publishedDate = post.date || new Date().toISOString();
	const authorName = post.author?.name || "Remi";
	const authorSlug = post.author?.slug || "#";

	const getInitials = (name: string) =>
		name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);

	return (
		<header className="flex lg:items-end items-start justify-between lg:flex-row flex-col lg:gap-0 gap-6 bg-soft-linen rounded-md md:px-10 px-5 md:py-8 py-5 md:mb-10 mb-5">
			<div>
				<div className="flex items-center gap-2.5">
					<div className="px-4 pt-1.5 pb-2 bg-foreground rounded-full">
						<Link
							href={`/category/${categorySlug}`}
							rel="category tag"
							className="text-xs font-semibold text-background uppercase"
						>
							{categoryTitle}
						</Link>
					</div>
				</div>

				<h1
					itemProp="headline"
					className="text-foreground font-marcellus font-black md:text-[44px] text-[30px] md:leading-12 leading-10 mt-4 mb-6"
				>
					{title}
				</h1>

				<div className="flex md:items-center items-start md:flex-row flex-col md:gap-4 gap-2">
					<div
						itemProp="author"
						itemScope
						itemType="https://schema.org/Person"
						className="flex items-center justify-center gap-1.5"
					>
						<Avatar className="size-10">
							<AvatarImage src={post.author.image} alt={authorName} />
							<AvatarFallback>{getInitials(authorName)}</AvatarFallback>
						</Avatar>
						<p className="text-foreground font-semibold text-[13px]">
							<span className="text-foreground/60 font-medium">Post by</span>{" "}
							<Link
								href={`/author/${authorSlug}`}
								itemProp="url"
								className="underline"
							>
								<span itemProp="name">{authorName}</span>
							</Link>
						</p>
					</div>

					<div className="h-4 w-[1px] bg-foreground/70 md:block hidden" aria-hidden="true" />

					<div className="flex items-center gap-2 text-[13px]">
						<p className="text-foreground/60 font-medium">Published</p>
						<time
							dateTime={publishedDate}
							itemProp="datePublished"
							className="text-foreground font-semibold"
						>
							{format(new Date(publishedDate), "MMMM d, yyyy").toUpperCase()}
						</time>
					</div>
				</div>
			</div>

			<div className="flex md:flex-row flex-col items-center justify-end md:gap-3 gap-2 md:w-auto w-full">
				<JumpToRecipeButton />
				{<PrintRecipeButton />}
			</div>
		</header>
	);
};

export default ArticleHeader;
