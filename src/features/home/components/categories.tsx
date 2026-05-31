import Link from "next/link";
import { BiDish } from "react-icons/bi";
import { LuDessert } from "react-icons/lu";
import { MdOutlineEmojiFoodBeverage } from "react-icons/md";
import { PiBowlFoodBold } from "react-icons/pi";
import { getAllCategories } from "@/lib/wordpress";

interface WPCategory {
	name: string;
	slug: string;
	count: number;
}

const Categories = async () => {
	const categories: WPCategory[] = await getAllCategories();

	return (
		<section aria-labelledby="categories-heading" className="section-bottom mx-auto lg:max-w-4xl">
			<h2 id="categories-heading" className="title md:text-center mb-4">
				Explore By Category
			</h2>

			<div className="grid md:grid-cols-4 grid-cols-2 items-center gap-3">
				{categories.map((cat) => (
					<Link
						key={cat.slug}
						href={cat.slug}
						className="border rounded-md flex flex-col justify-center items-center hover:bg-soft-linen duration-150 ease-in p-6"
					>
						{cat.name === "Dessert" ? (
							<LuDessert className="size-8" />
						) : cat.name === "Breakfast" ? (
							<MdOutlineEmojiFoodBeverage className="size-8" />
						) : cat.name === "Dinner" ? (
							<BiDish className="size-8" />
						) : (
							<PiBowlFoodBold className="size-8" />
						)}
						<div className="mt-4">
							<h3 className="text-foreground font-bold text-center text-xl">
								{cat.name}
							</h3>
							<p className="text-muted-foreground text-center text-sm">
								{cat.count ?? 0} Posts
							</p>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

export default Categories;
