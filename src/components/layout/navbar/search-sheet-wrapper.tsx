import { getAllCategories, getTrendingRecipes } from "@/lib/wordpress";
import SearchSheet from "./search-sheet";

const SearchSheetWrapper = async () => {
	const [categories, trendingPosts] = await Promise.all([
		getAllCategories(),
		getTrendingRecipes(5),
	]);

	const mappedCategories = categories.map(
		(cat: { name: string; slug: string }) => ({
			title: cat.name,
			slug: cat.slug,
		}),
	);

	return (
		<SearchSheet categories={mappedCategories} trendingPosts={trendingPosts} />
	);
};

export default SearchSheetWrapper;
