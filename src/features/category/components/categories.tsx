import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { getAllCategories } from "@/lib/wordpress";

interface WPCategory {
	name: string;
	slug: string;
	count: number;
}

const Categories = async () => {
	const allCategories: WPCategory[] = await getAllCategories();

	return (
		<div>
			<p className="text-foreground font-bold text-lg mb-3">Categories</p>

			<ul className="space-y-2.5">
				{allCategories.map((cat, index) => (
					<li className="space-y-2.5" key={cat.slug}>
						<Link
							href={`/category/${cat.slug}`}
							className="group flex items-center justify-between"
						>
							<p className="font-semibold text-sm text-foreground">
								{cat.name}
							</p>
							<p className="size-8 flex items-center justify-center rounded-full text-xs font-medium text-muted-foreground group-hover:bg-foreground group-hover:text-background duration-300 ease-linear border border-muted-foreground/30">
								{cat.count ?? 0}
							</p>
						</Link>
						{index < allCategories.length - 1 && <Separator />}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
