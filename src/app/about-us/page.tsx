import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Breadcrumbs from "@/components/breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import Subscribe from "@/components/subscribe";
import { Separator } from "@/components/ui/separator";
import {
	generateAboutMetadata,
	generateBreadcrumbSchema,
	generateOrganizationSchema,
	generateWebPageSchema,
	siteConfig,
} from "@/lib/metadata";

export const metadata: Metadata = generateAboutMetadata();

const AboutUsPage = () => {
	const organizationSchema = generateOrganizationSchema();
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: "Home", url: "/" },
		{ name: "About Us", url: "/about-us" },
	]);
	const webPageSchema = generateWebPageSchema(
		"About Us",
		siteConfig.branding.mission,
		"/about-us",
	);

	return (
		<>
			<JsonLd data={organizationSchema} id="organization-schema" />
			<JsonLd data={breadcrumbSchema} id="breadcrumb-schema" />
			<JsonLd data={webPageSchema} id="webpage-schema" />

			<Breadcrumbs>
				<li
					itemProp="itemListElement"
					itemScope
					itemType="https://schema.org/ListItem"
					className="text-foreground"
				>
					<span itemProp="name">About Us</span>
					<meta itemProp="position" content="2" />
				</li>
			</Breadcrumbs>

			<main id="main-content" className="custom-container">
				{/* Hero */}
				<header className="space-y-3 md:py-20 py-16">
					<h1 className="text-center title lg:text-5xl md:text-4xl text-3xl">
						About {siteConfig.shortName}
					</h1>
					<p className="text-center font-medium lg:px-72 md:px-20 px-4 text-muted-foreground text-lg">
						{siteConfig.branding.mission}
					</p>
				</header>

				{/* Featured image — warm kitchen / food flat-lay */}
				<figure className="relative rounded-lg overflow-hidden md:h-[550px] h-[500px] w-full md:mb-20 mb-16">
					<Image
						src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=2070&q=80"
						alt="Remi cooking in a warm family kitchen — The Daily Flavour"
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1400px"
						className="absolute object-cover"
						priority
					/>
					<figcaption className="sr-only">
						Quick global recipes made at home for busy families
					</figcaption>
				</figure>

				{/* What We Do */}
				<section
					aria-labelledby="what-we-do-heading"
					className="lg:w-[80%] mx-auto md:mb-20 mb-16"
				>
					<div className="space-y-6">
						<h2
							id="what-we-do-heading"
							className="text-foreground font-bold text-3xl mb-8"
						>
							What We Do
						</h2>

						<div className="space-y-6">
							<article className="grid md:grid-cols-8 grid-cols-1 gap-4">
								<h3 className="md:col-span-2 text-foreground text-lg font-semibold">
									Quick Global Recipes
								</h3>
								<p className="md:col-span-6 text-foreground/70 text-base leading-relaxed">
									Every recipe on The Daily Flavour is designed to be on your
									table in 30 minutes or less — without sacrificing an ounce of
									flavour. From Thai basil chicken to Moroccan chickpea stew, we
									make world cuisine accessible on a Tuesday night.
								</p>
							</article>

							<article className="grid md:grid-cols-8 grid-cols-1 gap-4">
								<h3 className="md:col-span-2 text-foreground text-lg font-semibold">
									Family-Friendly Meals
								</h3>
								<p className="md:col-span-6 text-foreground/70 text-base leading-relaxed">
									Our recipes are tested on real families. We keep the spice
									levels honest, the ingredient lists realistic, and the
									instructions clear enough that even the most chaotic weeknight
									doesn&apos;t stand a chance. No chef skills required.
								</p>
							</article>

							<article className="grid md:grid-cols-8 grid-cols-1 gap-4">
								<h3 className="md:col-span-2 text-foreground text-lg font-semibold">
									Global Flavour Education
								</h3>
								<p className="md:col-span-6 text-foreground/70 text-base leading-relaxed">
									Behind every recipe is a little story — the street food stall
									in Bangkok, the grandmother&apos;s kitchen in Marrakech, the
									noodle bar in Tokyo. We give you the context so cooking
									becomes a tiny journey, not just a task.
								</p>
							</article>
						</div>
					</div>
				</section>

				<div className="lg:w-[80%] mx-auto my-10">
					<Separator />
				</div>

				{/* Our Values */}
				<section
					aria-labelledby="our-values-heading"
					className="lg:w-[80%] mx-auto md:mb-20 mb-16"
				>
					<div className="space-y-6">
						<h2
							id="our-values-heading"
							className="text-foreground font-bold text-3xl mb-8"
						>
							Our Core Values
						</h2>

						<div className="space-y-6">
							<article className="grid md:grid-cols-8 grid-cols-1 gap-4">
								<h3 className="md:col-span-2 text-foreground text-lg font-semibold">
									Speed Without Shortcuts
								</h3>
								<p className="md:col-span-6 text-foreground/70 text-base leading-relaxed">
									Quick doesn&apos;t mean boring. We believe fast food should
									still taste incredible — so we obsess over flavour-building
									techniques that work in a fraction of the time.
								</p>
							</article>

							<article className="grid md:grid-cols-8 grid-cols-1 gap-4">
								<h3 className="md:col-span-2 text-foreground text-lg font-semibold">
									Real Ingredients
								</h3>
								<p className="md:col-span-6 text-foreground/70 text-base leading-relaxed">
									No obscure ingredients you&apos;ll use once and forget at the
									back of the cupboard. We build our recipes around what&apos;s
									actually in your supermarket — or already in your kitchen.
								</p>
							</article>

							<article className="grid md:grid-cols-8 grid-cols-1 gap-4">
								<h3 className="md:col-span-2 text-foreground text-lg font-semibold">
									Curiosity at the Table
								</h3>
								<p className="md:col-span-6 text-foreground/70 text-base leading-relaxed">
									We want cooking to feel like an adventure, not a chore. Every
									recipe is an invitation to try something new — a different
									spice, a new technique, a cuisine your family hasn&apos;t
									tried before.
								</p>
							</article>

							<article className="grid md:grid-cols-8 grid-cols-1 gap-4">
								<h3 className="md:col-span-2 text-foreground text-lg font-semibold">
									Every Cook Welcome
								</h3>
								<p className="md:col-span-6 text-foreground/70 text-base leading-relaxed">
									Whether you burn toast or run a Sunday roast, The Daily
									Flavour is for you. Our recipes scale from total beginner to
									confident home cook — and we never make you feel otherwise.
								</p>
							</article>
						</div>
					</div>
				</section>

				<div className="lg:w-[80%] mx-auto my-10">
					<Separator />
				</div>

				{/* Our Story */}
				<section
					aria-labelledby="our-story-heading"
					className="lg:w-[80%] mx-auto md:mb-20 mb-16"
				>
					<h2
						id="our-story-heading"
						className="text-foreground font-bold text-3xl mb-8"
					>
						Our Story
					</h2>
					<div className="space-y-5 text-foreground/70">
						<p className="text-base leading-relaxed">
							The Daily Flavour started as a simple notebook. Remi — a home cook
							obsessed with global food — kept scribbling down weeknight
							adaptations of recipes discovered on travels, in restaurants, and
							in the cookbooks of friends from every corner of the world.
						</p>
						<p className="text-base leading-relaxed">
							The problem was always the same: the recipes that tasted the most
							incredible were also the ones that took three hours. Remi spent
							years figuring out how to get 80% of the flavour in 20% of the
							time — and The Daily Flavour is where those discoveries live.
						</p>
						<p className="text-base leading-relaxed">
							What started as a personal archive has grown into a recipe blog
							visited by home cooks who believe weeknight dinners deserve to be
							genuinely exciting — Thai one night, Lebanese the next, Italian
							the night after. No two days the same. No night stuck in a rut.
						</p>
						<p className="text-base leading-relaxed font-medium text-foreground">
							The world&apos;s flavours are waiting. Let&apos;s bring them home.
						</p>
					</div>
				</section>

				{/* Newsletter CTA */}
				<Subscribe />

				{/* Contact */}
				<section
					aria-labelledby="contact-info-heading"
					className="lg:w-[80%] mx-auto mb-20"
				>
					<h2
						id="contact-info-heading"
						className="text-foreground font-bold text-3xl mb-8"
					>
						Get in Touch
					</h2>

					<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
						<div>
							<h3 className="font-semibold mb-3 text-lg">Email Us</h3>
							<div className="space-y-2">
								<div>
									<p className="text-sm text-muted-foreground mb-1">
										General Inquiries:
									</p>
									<Link
										href={`mailto:${siteConfig.contact.email}`}
										className="text-foreground text-[15px] hover:text-primary transition-colors"
									>
										{siteConfig.contact.email}
									</Link>
								</div>
							</div>
						</div>

						<div>
							<h3 className="font-semibold mb-3 text-lg">Follow Along</h3>
							<nav aria-label="Social media links" className="space-y-2">
								<Link
									href={siteConfig.social.instagram.url}
									target="_blank"
									rel="noopener noreferrer"
									className="block text-foreground text-[15px] hover:text-primary transition-colors"
								>
									Instagram {siteConfig.social.instagram.handle}
								</Link>
								<Link
									href={siteConfig.social.pinterest.url}
									target="_blank"
									rel="noopener noreferrer"
									className="block text-foreground text-[15px] hover:text-primary transition-colors"
								>
									Pinterest {siteConfig.social.pinterest.handle}
								</Link>
							</nav>
						</div>

						<div>
							<h3 className="font-semibold mb-3 text-lg">Work With Us</h3>
							<div>
								<p className="text-sm text-muted-foreground mb-1">
									Partnerships &amp; Collaborations:
								</p>
								<Link
									href={`mailto:${siteConfig.contact.email}`}
									className="text-foreground text-[15px] hover:text-primary transition-colors"
								>
									{siteConfig.contact.email}
								</Link>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default AboutUsPage;
