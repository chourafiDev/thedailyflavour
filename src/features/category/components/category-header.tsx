import { siteConfig } from "@/lib/metadata";

interface CategoryHeaderProps {
	slug: string;
	postCount: number;
}

const formatSlugToTitle = (slug: string): string => {
	return slug
		.split("-")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
};

const CategoryHeader = ({ slug, postCount }: CategoryHeaderProps) => {
	const category =
		siteConfig.categories[slug as keyof typeof siteConfig.categories];

	if (!category) {
		return null;
	}

	const displayTitle = formatSlugToTitle(slug);

	return (
		<section className="mt-10 md:mb-16 mb-10 lg:w-[60%]">
			<div className="flex items-center gap-3">
				<h1 className="text-foreground font-marcellus text-4xl font-semibold">
					{displayTitle}
				</h1>
				<div className="px-3 py-1 bg-foreground rounded-full">
					<p className="text-xs font-medium text-background">
						{postCount} {postCount === 1 ? "article" : "articles"}
					</p>
				</div>
			</div>
			<p
				itemProp="description"
				className="text-muted-foreground text-[15px] font-normal mt-4"
			>
				{category.description}
			</p>
		</section>
	);
};

export default CategoryHeader;
