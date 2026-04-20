// features/home/components/categories.tsx
// CHANGED: removed Sanity imports + async, uses dummyCategories instead
// UNCHANGED: all classNames, layout, JSX structure

import Image from "next/image";
import Link from "next/link";
import { type DummyCategory, dummyCategories } from "@/lib/dummy-data";

const Categories = () => {
	const categories = dummyCategories.slice(0, 6);

	// Don't render if less than 6 categories
	if (categories.length < 6) {
		return null;
	}

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
					className="block relative md:h-auto h-56 md:w-[30%] w-full rounded-lg overflow-hidden group"
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
								{categories[2].title}
							</h3>
							<p className="text-white text-sm">{categories[2].count} Posts</p>
						</div>

						<div className="absolute z-10 bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent" />
					</div>
				</Link>

				{/* Right Column - 1 card on top, 2 cards on bottom */}
				<div className="md:w-[40%] w-full space-y-4">
					<CategoryCard category={categories[3]} />

					{/* Bottom 2 cards */}
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
	category: DummyCategory;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
	return (
		<Link
			href={`/category/${category.slug}`}
			className="block relative h-56 w-full rounded-lg overflow-hidden group"
		>
			<Image
				src={category.image.url}
				alt={category.image.alt}
				fill
				className="absolute object-cover transition-transform duration-300 group-hover:scale-110"
			/>

			<div className="absolute bottom-4 left-4 z-30">
				<h3 className="text-white font-bold text-lg">{category.title}</h3>
				<p className="text-white text-sm">{category.count} Posts</p>
			</div>

			<div className="absolute z-10 bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent" />
		</Link>
	);
};

export default Categories;
