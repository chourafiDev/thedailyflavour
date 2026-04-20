import { format } from "date-fns";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { DummyRecipe } from "@/lib/dummy-data";

interface ArticleHeaderProps {
	post: DummyRecipe;
}

const ArticleHeader = ({ post }: ArticleHeaderProps) => {
	const title = post.title || "Untitled Post";
	const categoryTitle = post.category?.title || "Recipes";
	const categorySlug = post.category?.slug || "recipes";
	const publishedDate = post.publishedAt || new Date().toISOString();
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
		<header className="flex flex-col items-center justify-center">
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

				<div className="h-5 w-[1px] bg-border" aria-hidden="true" />

				<time
					dateTime={publishedDate}
					itemProp="datePublished"
					className="text-foreground font-semibold text-xs"
				>
					{format(new Date(publishedDate), "MMMM d, yyyy").toUpperCase()}
				</time>
			</div>

			<h1
				itemProp="headline"
				className="text-foreground font-black md:text-[40px] text-[30px] md:leading-12 leading-10 text-center lg:px-24 my-3.5 lg:max-w-5xl"
			>
				{title}
			</h1>

			<div
				itemProp="author"
				itemScope
				itemType="https://schema.org/Person"
				className="flex items-center justify-center gap-1.5"
			>
				<Avatar className="size-10">
					<AvatarFallback>{getInitials(authorName)}</AvatarFallback>
				</Avatar>
				<p className="text-foreground font-semibold text-[13px]">
					<span className="text-foreground/60 font-medium">Post by</span>{" "}
					<Link
						href={`/author/${authorSlug}`}
						itemProp="url"
						className="hover:underline"
					>
						<span itemProp="name">{authorName}</span>
					</Link>
				</p>
			</div>
		</header>
	);
};

export default ArticleHeader;
