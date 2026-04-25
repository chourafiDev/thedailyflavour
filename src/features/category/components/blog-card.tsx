import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";
import { siteConfig } from "@/lib/metadata";

const BlogCard = ({
	image,
	date,
	author,
	authorSlug,
	title,
	slug,
	category,
	categorySlug,
	excerpt,
}: {
	image: string;
	date: string;
	author: string;
	authorSlug: string;
	title: string;
	slug: string;
	category: string;
	categorySlug: string;
	excerpt: string;
}) => {
	return (
		<article
			itemScope
			itemType="https://schema.org/BlogPosting"
			className="group flex md:flex-row flex-col items-center md:gap-10 gap-5"
		>
			{/* Image */}
			<div className="relative flex-1 w-full h-full">
				<Link href={`/blog/${slug}`} itemProp="url" className="w-full h-full">
					<figure
						itemProp="image"
						itemScope
						itemType="https://schema.org/ImageObject"
						className="relative w-full h-[250px] rounded-md overflow-hidden"
					>
						<Image
							src={image}
							alt={title}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 25vw"
							className="absolute object-cover object-bottom transition-all duration-300 group-hover:scale-110"
							itemProp="url"
							loading="lazy"
						/>
					</figure>
				</Link>

				{/* Category badge */}
				<div className="absolute top-3 left-3 z-20">
					<Link
						href={`/category/${categorySlug}`}
						rel="category tag"
						className="bg-foreground/40 backdrop-blur-md border border dark:border-white px-4 py-2 rounded-full text-[11px] text-white font-bold uppercase leading-none"
					>
						{category}
					</Link>
				</div>
			</div>

			{/* Content */}
			<div className="flex-1">
				{/* Meta */}
				<div className="flex items-center gap-0 md:mb-4 mb-2">
					<time
						dateTime={date}
						itemProp="datePublished"
						className="text-xs font-bold text-foreground"
					>
						{format(new Date(date), "MMMM d, yyyy").toUpperCase()}
					</time>
					<RxDividerVertical
						className="text-foreground font-bold rotate-12"
						aria-hidden="true"
					/>
					<div itemProp="author" itemScope itemType="https://schema.org/Person">
						<Link
							href={`/author/${authorSlug}`}
							className="text-xs text-foreground font-bold"
						>
							<span className="text-muted-foreground">POST BY</span>{" "}
							<span itemProp="name" className="uppercase">
								{author}
							</span>
						</Link>
					</div>
				</div>

				{/* Title & Excerpt */}
				<div className="md:mb-8 mb-4">
					<h2
						itemProp="headline"
						className="post-title group-hover:underline md:text-2xl text-xl mb-3"
					>
						<Link href={`/blog/${slug}`}>{title}</Link>
					</h2>

					<p
						itemProp="description"
						className="text-muted-foreground text-sm line-clamp-2"
						dangerouslySetInnerHTML={{
							__html: excerpt,
						}}
					/>
				</div>

				{/* Read More */}
				<Link
					href={`/blog/${slug}`}
					className="inline-flex items-center text-primary hover:underline text-sm font-semibold"
					aria-label={`Read full article: ${title}`}
				>
					Read Full Recipe
					<svg
						className="ml-1 h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</Link>
			</div>

			{/* hidden publisher info */}
			<div
				itemProp="publisher"
				itemScope
				itemType="https://schema.org/Organization"
				className="hidden"
			>
				<meta itemProp="name" content={siteConfig.name} />
				<div
					itemProp="logo"
					itemScope
					itemType="https://schema.org/ImageObject"
				>
					<meta itemProp="url" content={`${siteConfig.url}/logo.png`} />
				</div>
			</div>
		</article>
	);
};

export default BlogCard;
