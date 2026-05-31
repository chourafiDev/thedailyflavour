import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { JsonLd } from "@/components/JsonLd";
import StartTheConversation from "@/components/start-the-conversation";
import Subscribe from "@/components/subscribe";
import { buttonVariants } from "@/components/ui/button";
import Categories from "@/features/home/components/categories";
import FeaturedPosts from "@/features/home/components/featured-posts";
import MostPopular from "@/features/home/components/most-popular";
import Trending from "@/features/home/components/trending";
import { sarahMitchellCover } from "@/lib/assets";
import {
	generateHomeMetadata,
	generateWebsiteSchema,
	siteConfig,
} from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = generateHomeMetadata();

export default async function Home() {
	const websiteSchema = generateWebsiteSchema();

	return (
		<>
			<JsonLd data={websiteSchema} id="website-schema" />

			<main id="main-content" className="custom-container">
				<h1 className="sr-only">
					{siteConfig.name}: {siteConfig.branding.tagline}
				</h1>

				<Trending />
				<section
					aria-labelledby="about-author"
					className="section-bottom flex md:flex-row flex-col items-center gap-3"
				>
					<div className="md:w-1/3 w-full h-80 relative rounded-md overflow-hidden">
						<Image
							src={sarahMitchellCover}
							alt="sarah-mitchell"
							fill
							className="rounded-md absolute object-cover"
						/>
					</div>
					<div className="md:w-2/3 w-full md:h-80 h-100 px-10 bg-soft-linen rounded-md flex flex-col justify-center">
						<h2 className="font-marcellus text-foreground text-2xl font-semibold mb-4">
							Welcome to The Daily Flavour !
						</h2>
						<p className="text-foreground mb-10">
							Mom of two, comfort food lover, and the heart behind{" "}
							<span className="font-semibold">The Daily Flavour.</span> I share
							real recipes from my real kitchen warm, simple, and always worth
							making twice. Grab a recipe and make yourself at home. 🍲
						</p>

						<div className="flex">
							<Link
								href="/search"
								className={cn(
									buttonVariants({
										variant: "default",
										size: "lg",
										shadow: "bold",
									}),
									"has-[>svg]:px-10 md:w-auto w-full",
								)}
							>
								Explore all recipes <FaArrowRightLong />
							</Link>
						</div>
					</div>
				</section>
				<Categories />
				<FeaturedPosts />
				<Subscribe />
				<MostPopular />
				<StartTheConversation />
			</main>
		</>
	);
}
