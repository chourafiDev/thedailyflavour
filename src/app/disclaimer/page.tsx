import type { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
	title: "Disclaimer",
	description: `Disclaimer for ${siteConfig.name}. Important information about the content and advice provided on our website.`,
};

const DisclaimerPage = () => {
	return (
		<>
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
				<article className="max-w-4xl mx-auto">
					<header className="mb-8">
						<h1 className="text-4xl font-bold text-foreground mb-4">
							Disclaimer
						</h1>
						<p className="text-muted-foreground">
							Last updated:{" "}
							{new Date().toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
					</header>

					<div className="prose prose-lg max-w-none space-y-8">
						{/* General Disclaimer */}
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

						{/* Travel Information */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Travel Information Disclaimer
							</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								All travel information, recommendations, and advice on{" "}
								{siteConfig.name} are based on personal experiences and research
								at the time of writing. Travel conditions, regulations, safety
								situations, and circumstances can change rapidly and without
								notice.
							</p>
							<p className="text-muted-foreground leading-relaxed mb-4">
								We strongly recommend that you:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>
									Check official government travel advisories before traveling
								</li>
								<li>
									Verify all information with official and local sources before
									making travel decisions
								</li>
								<li>Purchase comprehensive travel insurance</li>
								<li>Register with your embassy when traveling abroad</li>
								<li>
									Stay informed about current events and safety conditions in
									your destination
								</li>
								<li>Use your own judgment and common sense</li>
							</ul>
						</section>

						{/* Safety Disclaimer */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Safety and Risk Disclaimer
							</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								Travel inherently involves risks. While we provide safety tips
								and recommendations based on our experiences, we cannot
								guarantee your safety or security while traveling. You are
								solely responsible for:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>Your personal safety and security decisions</li>
								<li>Assessing risks in any situation</li>
								<li>Following local laws and customs</li>
								<li>Obtaining necessary visas and travel documents</li>
								<li>Getting appropriate vaccinations and medical clearances</li>
								<li>Understanding and managing travel-related risks</li>
							</ul>
						</section>

						{/* Medical Disclaimer */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Medical and Health Disclaimer
							</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								{siteConfig.name} is not a medical or health professional. Any
								health or medical information provided on this website is for
								informational purposes only and should not be considered
								professional medical advice, diagnosis, or treatment.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								Always consult with a qualified healthcare provider before
								traveling, especially if you have pre-existing medical
								conditions. Seek immediate medical attention if you experience
								health issues while traveling.
							</p>
						</section>

						{/* Financial Disclaimer */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Financial and Budget Information
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								Budget estimates, costs, and financial information provided on{" "}
								{siteConfig.name} are based on personal experiences and are
								subject to change. Actual costs may vary depending on exchange
								rates, inflation, seasonal pricing, personal spending habits,
								and other factors. Always research current prices and maintain a
								financial buffer for unexpected expenses.
							</p>
						</section>

						{/* Affiliate Disclaimer */}
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
								We only recommend products, services, and accommodations that we
								have personally used or thoroughly researched. However, our
								positive experience does not guarantee yours will be the same.
								Always conduct your own research before making purchases or
								bookings.
							</p>
						</section>

						{/* External Links */}
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

						{/* Photography Disclaimer */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Photography and Images
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								Unless otherwise stated, all photographs on {siteConfig.name}{" "}
								are our own. Images are meant to represent destinations and
								experiences but may not reflect current conditions. Colors,
								lighting, and appearance may differ from what you experience in
								person. Weather, seasons, renovations, and other factors can
								significantly change the appearance of locations.
							</p>
						</section>

						{/* Personal Experience */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Personal Experience Disclaimer
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								All content on {siteConfig.name} reflects personal experiences,
								opinions, and perspectives. Your experience may differ based on
								numerous factors including but not limited to: timing of visit,
								personal preferences, cultural background, budget, travel style,
								language skills, and individual circumstances. What worked for
								us may not work for you.
							</p>
						</section>

						{/* Changes and Updates */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Changes and Updates
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								Destinations, businesses, accommodations, and services mentioned
								on {siteConfig.name} may change ownership, close, relocate, or
								alter their offerings without notice. We strive to keep
								information current but cannot guarantee that all content
								reflects the latest changes. Always verify information before
								making travel arrangements.
							</p>
						</section>

						{/* Errors and Omissions */}
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

						{/* Professional Advice */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Professional Advice
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								{siteConfig.name} does not provide professional legal, medical,
								financial, or other expert advice. If you require such advice,
								please consult with a licensed professional in the relevant
								field. Never rely solely on information from travel blogs for
								important decisions.
							</p>
						</section>

						{/* Limitation of Liability */}
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

						{/* Contact */}
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
									<strong>Email:</strong> {siteConfig.creator.email}
								</li>
								<li>
									<strong>Website:</strong> {siteConfig.url}
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
