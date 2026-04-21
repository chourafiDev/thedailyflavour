import Image from "next/image";
import Link from "next/link";
import { getAllCategories } from "@/lib/wordpress";

// Fallback images per slug — replace with ACF category image field later
const CATEGORY_IMAGES: Record<string, { url: string; alt: string }> = {
	breakfast: {
		url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
		alt: "Breakfast recipes",
	},
	dinner: {
		url: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
		alt: "Dinner recipes",
	},
	dessert: {
		url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
		alt: "Dessert recipes",
	},
	drinks: {
		url: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80",
		alt: "Drinks recipes",
	},
	healthy: {
		url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
		alt: "Healthy recipes",
	},
	"meal-prep": {
		url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
		alt: "Meal prep",
	},
};

const FALLBACK = {
	url: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80",
	alt: "Recipe",
};

interface WPCategory {
	name: string;
	slug: string;
	count: number;
}

interface CategoryWithImage extends WPCategory {
	image: { url: string; alt: string };
}

const Categories = async () => {
	const raw: WPCategory[] = await getAllCategories();

	const categories: CategoryWithImage[] = raw
		.filter((c) => c.slug !== "uncategorized")
		.slice(0, 6)
		.map((c) => ({
			...c,
			image: CATEGORY_IMAGES[c.slug] ?? FALLBACK,
		}));

	if (categories.length < 6) return null;

	return (
		<section aria-labelledby="categories-heading" className="section-bottom">
			<h2 id="categories-heading" className="title mb-4">
				Explore By Category
			</h2>

			<div className="flex md:flex-row flex-col gap-4">
				{/* Left Column - 2 cards stacked */}
				<div className="md:w-[30%] w-full space-y-4">
					<CategoryCard category={categories[0]} />
					<CategoryCard category={categories[1]} />
				</div>

				{/* Middle Column - 1 tall card */}
				<Link
					href={`/category/${categories[2].slug}`}
					className="block relative md:h-auto h-56 md:w-[30%] w-full rounded-md overflow-hidden group"
				>
					<div className="md:h-[464px] h-56">
						<Image
							src={categories[2].image.url}
							alt={categories[2].image.alt}
							fill
							className="absolute object-cover transition-transform duration-300 group-hover:scale-110"
						/>
						<div className="absolute bottom-4 left-4 z-30">
							<h3 className="text-white font-bold text-lg">
								{categories[2].name}
							</h3>
							<p className="text-white text-sm">
								{categories[2].count ?? 0} Posts
							</p>
						</div>
						<div className="absolute z-10 bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent" />
					</div>
				</Link>

				{/* Right Column - 1 card on top, 2 cards on bottom */}
				<div className="md:w-[40%] w-full space-y-4">
					<CategoryCard category={categories[3]} />
					<div className="flex md:flex-row flex-col gap-4">
						<CategoryCard category={categories[4]} />
						<CategoryCard category={categories[5]} />
					</div>
				</div>
			</div>
		</section>
	);
};

interface CategoryCardProps {
	category: CategoryWithImage;
}

const CategoryCard = ({ category }: CategoryCardProps) => (
	<Link
		href={`/category/${category.slug}`}
		className="block relative h-56 w-full rounded-md overflow-hidden group"
	>
		<Image
			src={category.image.url}
			alt={category.image.alt}
			fill
			className="absolute object-cover transition-transform duration-300 group-hover:scale-110"
		/>
		<div className="absolute bottom-4 left-4 z-30">
			<h3 className="text-white font-bold text-lg">{category.name}</h3>
			<p className="text-white text-sm">{category.count ?? 0} Posts</p>
		</div>
		<div className="absolute z-10 bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent" />
	</Link>
);

export default Categories;
