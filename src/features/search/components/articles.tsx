import { ArticlesPaginated } from "@/components/articles-paginated";
import { searchRecipes } from "@/lib/wordpress";

const PLACEHOLDER =
	"https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80";

function stripHtml(html: string) {
	return html.replace(/<[^>]*>/g, "").trim();
}

interface ArticlesProps {
	query: string;
	category: string;
	page: number; // 👈 added
}

const Articles = async ({ query, category, page }: ArticlesProps) => {
	const results = await searchRecipes(
		query || undefined,
		category || undefined,
	);

	const posts = results.map(
		(r: {
			title: string;
			slug: string;
			excerpt: string;
			date: string;
			featuredImage?: { node?: { sourceUrl?: string } };
			categories?: { nodes?: { name: string; slug: string }[] };
			author?: { node?: { name?: string; slug?: string } };
		}) => ({
			title: r.title || "Untitled",
			slug: r.slug || "",
			excerpt: r.excerpt ? stripHtml(r.excerpt) : "",
			date: r.date || new Date().toISOString(),
			image: r.featuredImage?.node?.sourceUrl || PLACEHOLDER,
			category: r.categories?.nodes?.[0]?.name || "Recipes",
			categorySlug: r.categories?.nodes?.[0]?.slug || "recipes",
			author: r.author?.node?.name || "Sarah Mitchell",
			authorSlug: r.author?.node?.slug || "sarah-mitchell",
		}),
	);

	return (
		<ArticlesPaginated
			posts={posts}
			query={query}
			category={category}
			page={page}
		/>
	);
};

export default Articles;
