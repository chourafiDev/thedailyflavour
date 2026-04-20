import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import Articles from "@/features/search/components/articles";
import SearchForm from "@/features/search/components/search-results";
import {
	generateSearchMetadata,
	generateSearchPageSchema,
	siteConfig,
} from "@/lib/metadata";

interface SearchPageProps {
	searchParams: Promise<{
		q?: string;
		category?: string;
	}>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
	const params = await searchParams;
	return generateSearchMetadata(params.q, params.category);
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	const params = await searchParams;
	const query = params.q || "";
	const category = params.category || "";

	const searchSchema = generateSearchPageSchema();

	const categoryTitle = category
		? siteConfig.categories[category as keyof typeof siteConfig.categories]
				?.title || category
		: "";

	return (
		<>
			<JsonLd data={searchSchema} id="search-schema" />

			<main id="main-content" className="custom-container pt-6">
				{/* Page Header */}
				<header className="mb-8">
					<h1 className="title mb-1">
						{query && category
							? `"${query}" in ${categoryTitle}`
							: query
								? `Search Results for "${query}"`
								: category
									? `${categoryTitle} Articles`
									: "Search Travel Guides"}
					</h1>
					<p className="text-muted-foreground">
						{query || category
							? "Discover solo female travel guides, tips, and destination information."
							: "Find destinations, safety tips, budget guides, and travel inspiration for solo female travelers."}
					</p>
				</header>

				<Suspense
					fallback={
						<div className="flex items-center justify-center py-20">
							<div className="text-center space-y-2">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto" />
								<p className="text-muted-foreground">Loading search form...</p>
							</div>
						</div>
					}
				>
					<SearchForm />
				</Suspense>

				<Suspense
					fallback={
						<div className="flex items-center justify-center py-20">
							<div className="text-center space-y-2">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground mx-auto" />
								<p className="text-muted-foreground">
									Loading search results...
								</p>
							</div>
						</div>
					}
				>
					<Articles query={query} category={category} />
				</Suspense>
			</main>
		</>
	);
};

export default SearchPage;
