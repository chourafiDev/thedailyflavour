import type { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
	generateTermsMetadata,
	generateWebPageSchema,
	siteConfig,
} from "@/lib/metadata";

export const metadata: Metadata = generateTermsMetadata();

const TermsOfServicePage = () => {
	const webPageSchema = generateWebPageSchema(
		"Terms of Service",
		`Terms of Service for ${siteConfig.name}.`,
		"/terms-of-service",
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
					<span itemProp="name">Terms of Service</span>
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
							Terms of Service
						</h1>
						<p className="text-muted-foreground">Last updated: {lastUpdated}</p>
					</header>

					<div className="prose prose-lg max-w-none space-y-8">
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Agreement to Terms
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								By accessing or using {siteConfig.name}, you agree to be bound
								by these Terms of Service and all applicable laws and
								regulations. If you do not agree with any of these terms, you
								are prohibited from using or accessing this site.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Use License
							</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								Permission is granted to temporarily access the materials
								(information or software) on {siteConfig.name} for personal,
								non-commercial transitory viewing only. This is the grant of a
								license, not a transfer of title, and under this license you may
								not:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>Modify or copy the materials</li>
								<li>
									Use the materials for any commercial purpose or for any public
									display (commercial or non-commercial)
								</li>
								<li>
									Attempt to decompile or reverse engineer any software
									contained on {siteConfig.name}
								</li>
								<li>
									Remove any copyright or other proprietary notations from the
									materials
								</li>
								<li>
									Transfer the materials to another person or &quot;mirror&quot;
									the materials on any other server
								</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Content Disclaimer
							</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								The materials on {siteConfig.name} are provided on an &apos;as
								is&apos; basis. {siteConfig.name} makes no warranties, expressed
								or implied, and hereby disclaims and negates all other
								warranties including, without limitation, implied warranties or
								conditions of merchantability, fitness for a particular purpose,
								or non-infringement of intellectual property or other violation
								of rights.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								All content on this website is for informational and
								entertainment purposes only. Recipe results may vary based on
								ingredients, equipment, and technique. Always use your own
								judgment when preparing food, especially regarding allergies and
								dietary restrictions.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Affiliate Links and Advertising
							</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								{siteConfig.name} participates in affiliate marketing programs.
								This means we may earn a commission when you click on or make
								purchases via affiliate links on our website. This comes at no
								additional cost to you.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								We only recommend products and services that we genuinely
								believe will add value to our readers. All opinions expressed on
								this site are our own.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								User Content
							</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								If you submit comments, reviews, or other content to{" "}
								{siteConfig.name}, you grant us a non-exclusive, royalty-free,
								perpetual, and worldwide license to use, modify, and display
								that content.
							</p>
							<p className="text-muted-foreground leading-relaxed mb-4">
								You agree not to post content that:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>Is illegal, harmful, threatening, or abusive</li>
								<li>Infringes on intellectual property rights</li>
								<li>Contains viruses or malicious code</li>
								<li>Is spam or unsolicited advertising</li>
								<li>Violates any person&apos;s privacy</li>
							</ul>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Copyright and Intellectual Property
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								All content on {siteConfig.name}, including but not limited to
								text, images, graphics, logos, and software, is the property of{" "}
								{siteConfig.name} or its content suppliers and is protected by
								international copyright laws. Unauthorized use of any materials
								may violate copyright, trademark, and other laws.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								External Links
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								{siteConfig.name} may contain links to external websites that
								are not provided or maintained by us. We do not guarantee the
								accuracy, relevance, timeliness, or completeness of any
								information on these external websites. The inclusion of any
								links does not necessarily imply a recommendation or endorse the
								views expressed within them.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Limitation of Liability
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								In no event shall {siteConfig.name} or its suppliers be liable
								for any damages (including, without limitation, damages for loss
								of data or profit, or due to business interruption) arising out
								of the use or inability to use the materials on{" "}
								{siteConfig.name}, even if {siteConfig.name} or an authorized
								representative has been notified orally or in writing of the
								possibility of such damage.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Governing Law
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								These terms and conditions are governed by and construed in
								accordance with applicable laws. Any disputes relating to these
								terms shall be subject to the exclusive jurisdiction of the
								courts in the relevant jurisdiction.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Changes to Terms
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								We reserve the right to revise these Terms of Service at any
								time without notice. By using this website, you agree to be
								bound by the current version of these Terms of Service.
							</p>
						</section>

						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Contact Us
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								If you have any questions about these Terms of Service, please
								contact us:
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

export default TermsOfServicePage;
