import type { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
	generateDisclaimerMetadata,
	generateWebPageSchema,
	siteConfig,
} from "@/lib/metadata";

export const metadata: Metadata = generateDisclaimerMetadata();

const DisclaimerPage = () => {
	const webPageSchema = generateWebPageSchema(
		"Disclaimer",
		`Disclaimer for ${siteConfig.name}.`,
		"/disclaimer",
	);

	const lastUpdated = "January 1, 2025";

	return (
		<>
			<JsonLd data={webPageSchema} id="webpage-schema" />

			<Breadcrumbs>
				<li
					itemProp="itemListElement"
					itemScope
					itemType="https://schema.org/ListItem"
					className="text-foreground"
				>
					<span itemProp="name">Disclaimer</span>
					<meta itemProp="position" content="2" />
				</li>
			</Breadcrumbs>

			<main className="custom-container py-10">
				<article
					className="max-w-4xl mx-auto"
					itemScope
					itemType="https://schema.org/WebPage"
				>
					<header className="mb-8">
						<h1 className="text-4xl font-bold text-foreground mb-4">
							Disclaimer
						</h1>
						<p className="text-muted-foreground">Last updated: {lastUpdated}</p>
					</header>

					<div className="prose prose-lg max-w-none space-y-8">
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								General Disclaimer
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								The information provided by {siteConfig.name} is for general
								informational purposes only. All information on the site is
								provided in good faith, however we make no representation or
								warranty of any kind, express or implied, regarding the
								accuracy, adequacy, validity, reliability, availability, or
								completeness of any information on the site.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Recipe Disclaimer
							</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								All recipes and cooking advice on {siteConfig.name} are based on
								personal experience and testing. Results may vary depending on
								your ingredients, equipment, technique, and other factors. We
								strongly recommend that you:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>Read the full recipe before starting to cook</li>
								<li>
									Check ingredients for allergens before preparing any dish
								</li>
								<li>
									Use your own judgment when adjusting seasoning and cooking
									times
								</li>
								<li>Verify substitutions with a reliable culinary source</li>
								<li>
									Follow safe food handling and storage practices at all times
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Nutritional Information Disclaimer
							</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								{siteConfig.name} is not staffed by registered dietitians or
								nutritionists. Any nutritional information provided is estimated
								and for informational purposes only. Actual values may vary
								based on specific ingredients, brands, portion sizes, and
								preparation methods.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								If you have specific dietary needs, allergies, or health
								conditions, always consult a qualified healthcare or nutrition
								professional before making changes to your diet.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Allergy Disclaimer
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								While we do our best to note common allergens in our recipes, we
								cannot guarantee that any recipe is free from allergens due to
								potential cross-contamination or ingredient variations between
								brands. If you have a serious food allergy, please consult the
								packaging of every ingredient you use and seek professional
								medical advice if needed.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Affiliate Links Disclaimer
							</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								{siteConfig.name} participates in various affiliate marketing
								programs. This means we may earn a commission when you click on
								or make purchases through affiliate links on our site, at no
								additional cost to you.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								We only recommend products, kitchen tools, and ingredients that
								we have personally used or thoroughly researched. However, our
								positive experience does not guarantee yours will be the same.
								Always conduct your own research before making purchases.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								External Links Disclaimer
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								{siteConfig.name} contains links to external websites that are
								not provided or maintained by us. We have no control over the
								nature, content, and availability of those sites. The inclusion
								of any links does not necessarily imply a recommendation or
								endorsement of the views expressed within them. We are not
								responsible for the content, accuracy, or opinions expressed on
								external websites.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Photography and Images
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								Unless otherwise stated, all photographs on {siteConfig.name}{" "}
								are our own. Food photography is styled for visual appeal and
								may not exactly represent the finished dish. Colors, portion
								sizes, and presentation may differ depending on your ingredients
								and plating style.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Personal Experience Disclaimer
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								All content on {siteConfig.name} reflects personal experiences,
								opinions, and perspectives. Your results may differ based on
								numerous factors including ingredient quality, cooking
								equipment, skill level, personal taste preferences, and
								individual circumstances. What worked for us may not work for
								you.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Errors and Omissions
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								Despite our best efforts to provide accurate information,{" "}
								{siteConfig.name} may contain typographical errors,
								inaccuracies, or omissions. We do not warrant that the content
								is error-free. If you notice any errors, please contact us so we
								can correct them.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Professional Advice
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								{siteConfig.name} does not provide professional medical,
								nutritional, financial, or legal advice. If you require such
								advice, please consult with a licensed professional in the
								relevant field. Never rely solely on a recipe blog for important
								health or dietary decisions.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Limitation of Liability
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								Under no circumstance shall we have any liability to you for any
								loss or damage of any kind incurred as a result of the use of
								the site or reliance on any information provided on the site.
								Your use of the site and your reliance on any information on the
								site is solely at your own risk.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Questions or Concerns
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								If you have any questions or concerns about this disclaimer,
								please contact us:
							</p>
							<ul className="list-none space-y-2 text-muted-foreground mt-4">
								<li>
									<strong>Email:</strong>{" "}
									<a
										href={`mailto:${siteConfig.creator.email}`}
										className="text-primary hover:underline"
									>
										{siteConfig.creator.email}
									</a>
								</li>
								<li>
									<strong>Website:</strong>{" "}
									<a
										href={siteConfig.url}
										className="text-primary hover:underline"
									>
										{siteConfig.url}
									</a>
								</li>
							</ul>
						</section>
					</div>
				</article>
			</main>
		</>
	);
};

export default DisclaimerPage;
