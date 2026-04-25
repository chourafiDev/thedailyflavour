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
					className="section-bottom relative rounded-md bg-soft-linen"
				>
					<div className="flex items-center p-4">
						<div>
							<Image
								src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								alt="remi"
								width={1000}
								height={1000}
								className="rounded-md"
							/>
						</div>
						<div className="px-14">
							<h2 className="font-marcellus text-foreground text-2xl font-semibold mb-4">
								Welcome to The Daily Flavour !
							</h2>
							<p className="text-foreground mb-10">
								Mom of two, comfort food lover, and the heart behind{" "}
								<span className="font-semibold">The Daily Flavour.</span> I share real recipes from my
								real kitchen warm, simple, and always worth making twice. Grab a
								recipe and make yourself at home. 🍲
							</p>

							<Link
								href="/"
								className={cn(
									buttonVariants({
										variant: "default",
										size: "lg",
										shadow: "bold",
									}),
									"has-[>svg]:px-10",
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
