import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { FaPinterest, FaTiktok } from "react-icons/fa";
import Breadcrumbs from "@/components/breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
	generateBreadcrumbSchema,
	generateContactMetadata,
	generateContactPageSchema,
	siteConfig,
} from "@/lib/metadata";

export async function generateMetadata() {
	return generateContactMetadata();
}

const ContactPage = () => {
	const contactSchema = generateContactPageSchema();
	const breadcrumbSchema = generateBreadcrumbSchema([
		{ name: "Home", url: "/" },
		{ name: "Contact Us", url: "/contact" },
	]);

	return (
		<>
			{/* JSON-LD Schemas */}
			<JsonLd data={contactSchema} id="contact-schema" />
			<JsonLd data={breadcrumbSchema} id="breadcrumb-schema" />

			{/* Breadcrumbs */}
			<Breadcrumbs>
				<li
					itemProp="itemListElement"
					itemScope
					itemType="https://schema.org/ListItem"
					className="text-foreground"
				>
					<span itemProp="name">Contact Us</span>
					<meta itemProp="position" content="2" />
				</li>
			</Breadcrumbs>

			<main id="main-content" className="md:py-10 py-5 custom-container">
				<section className="section-bottom rounded-xl md:px-10 px-4 py-20 bg-soft-linen">
					<h1 className="title text-center">Contact Us</h1>
					<p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
						Have questions about solo female travel? We&apos;re here to help you
						plan your next adventure with confidence and safety.
					</p>
				</section>

				<section aria-labelledby="contact-heading">
					<h2 id="contact-heading" className="sr-only">
						Contact Information and Form
					</h2>

					<div className="space-y-2 mb-10">
						<h2 className="title">Let&apos;s Connect</h2>
						<p className="text-muted-foreground text-base">
							Whether you have questions about solo travel safety, need
							destination advice, or want to share your travel story, we&apos;d
							love to hear from you.
						</p>
					</div>

					<div className="space-y-8">
						<div>
							<h3 className="text-foreground text-xl font-semibold mb-3">
								Get in Touch
							</h3>
							<div className="flex flex-col gap-3">
								<div>
									<span className="text-sm text-foreground font-bold">
										General Inquiries:
									</span>
									<br />
									<Link
										href={`mailto:${siteConfig.contact.email}`}
										className="text-muted-foreground text-[15px] hover:text-foreground transition-colors"
									>
										{siteConfig.contact.email}
									</Link>
								</div>
								<div>
									<span className="text-sm text-foreground font-bold">
										Support:
									</span>
									<br />
									<Link
										href={`mailto:${siteConfig.contact.email}`}
										className="text-muted-foreground text-[15px] hover:text-foreground transition-colors"
									>
										{siteConfig.contact.email}
									</Link>
								</div>
							</div>
						</div>

						<div>
							<h3 className="text-foreground text-xl font-semibold mb-2">
								Join Our Community
							</h3>
							<p className="text-muted-foreground text-[15px] mb-3">
								Follow us for daily travel inspiration, safety tips, and connect
								with fellow solo female travelers.
							</p>
							<ul className="flex items-center gap-2">
								<li>
									<Link
										href={siteConfig.social.instagram.url}
										aria-label={`Follow us on Instagram ${siteConfig.social.instagram.handle}`}
										className="flex items-center justify-center size-10 border hover:bg-foreground hover:text-background duration-200 ease-in rounded-full"
										target="_blank"
										rel="noopener noreferrer"
									>
										<AiFillInstagram size={24} aria-hidden="true" />
									</Link>
								</li>

								<li>
									<Link
										href={siteConfig.social.pinterest.url}
										aria-label={`Follow us on Pinterest ${siteConfig.social.pinterest.handle}`}
										className="flex items-center justify-center size-10 border hover:bg-foreground hover:text-background duration-200 ease-in rounded-full"
										target="_blank"
										rel="noopener noreferrer"
									>
										<FaPinterest size={20} aria-hidden="true" />
									</Link>
								</li>

								<li>
									<Link
										href={siteConfig.social.tiktok.url}
										aria-label={`Follow us on TikTok ${siteConfig.social.tiktok.handle}`}
										className="flex items-center justify-center size-10 border hover:bg-foreground hover:text-background duration-200 ease-in rounded-full"
										target="_blank"
										rel="noopener noreferrer"
									>
										<FaTiktok size={20} aria-hidden="true" />
									</Link>
								</li>
							</ul>
						</div>

						<div>
							<h3 className="text-foreground text-xl font-semibold mb-2">
								Response Time
							</h3>
							<p className="text-muted-foreground text-[15px]">
								We typically respond to all inquiries within 24-48 hours during
								business days. For urgent travel safety concerns, please contact
								local authorities.
							</p>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default ContactPage;
