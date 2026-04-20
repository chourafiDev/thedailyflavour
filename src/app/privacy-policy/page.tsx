import type { Metadata } from "next";
import Breadcrumbs from "@/components/breadcrumbs";
import { siteConfig } from "@/lib/metadata";

export const metadata: Metadata = {
	title: "Privacy Policy",
	description: `Privacy Policy for ${siteConfig.name}. Learn how we collect, use, and protect your personal information.`,
};

const PrivacyPolicyPage = () => {
	return (
		<>
			<Breadcrumbs>
				<li
					itemProp="itemListElement"
					itemScope
					itemType="https://schema.org/ListItem"
					className="text-foreground"
				>
					<span itemProp="name">Privacy Policy</span>
					<meta itemProp="position" content="2" />
				</li>
			</Breadcrumbs>

			<main className="custom-container py-10">
				<article className="max-w-4xl mx-auto">
					<header className="mb-8">
						<h1 className="text-4xl font-bold text-foreground mb-4">
							Privacy Policy
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
						{/* Introduction */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Introduction
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								Welcome to {siteConfig.name}. We respect your privacy and are
								committed to protecting your personal data. This privacy policy
								will inform you about how we look after your personal data when
								you visit our website and tell you about your privacy rights and
								how the law protects you.
							</p>
						</section>

						{/* Information We Collect */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Information We Collect
							</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								We may collect, use, store and transfer different kinds of
								personal data about you:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>
									<strong>Identity Data:</strong> Name, username or similar
									identifier
								</li>
								<li>
									<strong>Contact Data:</strong> Email address
								</li>
								<li>
									<strong>Technical Data:</strong> IP address, browser type and
									version, time zone setting, browser plug-in types and
									versions, operating system and platform
								</li>
								<li>
									<strong>Usage Data:</strong> Information about how you use our
									website
								</li>
								<li>
									<strong>Marketing Data:</strong> Your preferences in receiving
									marketing from us and your communication preferences
								</li>
							</ul>
						</section>

						{/* How We Use Your Information */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								How We Use Your Information
							</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								We will only use your personal data when the law allows us to.
								Most commonly, we will use your personal data in the following
								circumstances:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>To provide and improve our services to you</li>
								<li>To send you our newsletter (if you&apos;ve subscribed)</li>
								<li>To respond to your inquiries and support requests</li>
								<li>To analyze website usage and improve user experience</li>
								<li>
									To comply with legal obligations and enforce our terms of
									service
								</li>
							</ul>
						</section>

						{/* Cookies */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Cookies
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								We use cookies and similar tracking technologies to track
								activity on our website and store certain information. Cookies
								are files with a small amount of data which may include an
								anonymous unique identifier. You can instruct your browser to
								refuse all cookies or to indicate when a cookie is being sent.
								However, if you do not accept cookies, you may not be able to
								use some portions of our website.
							</p>
						</section>

						{/* Third-Party Services */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Third-Party Services
							</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								We may employ third-party companies and individuals to
								facilitate our service. These third parties have access to your
								personal data only to perform specific tasks on our behalf and
								are obligated not to disclose or use it for any other purpose.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								Third-party services we use may include:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
								<li>Google Analytics (website analytics)</li>
								<li>Email service providers (newsletter distribution)</li>
								<li>Advertising partners (affiliate links)</li>
							</ul>
						</section>

						{/* Data Security */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Data Security
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								We have put in place appropriate security measures to prevent
								your personal data from being accidentally lost, used or
								accessed in an unauthorized way, altered or disclosed. However,
								no method of transmission over the Internet or method of
								electronic storage is 100% secure.
							</p>
						</section>

						{/* Your Rights */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Your Rights
							</h2>
							<p className="text-muted-foreground leading-relaxed mb-4">
								Under data protection laws, you have rights including:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>
									<strong>Right to access:</strong> You have the right to
									request copies of your personal data
								</li>
								<li>
									<strong>Right to rectification:</strong> You have the right to
									request correction of inaccurate or incomplete data
								</li>
								<li>
									<strong>Right to erasure:</strong> You have the right to
									request deletion of your personal data
								</li>
								<li>
									<strong>Right to restrict processing:</strong> You have the
									right to request restriction of processing of your personal
									data
								</li>
								<li>
									<strong>Right to data portability:</strong> You have the right
									to request transfer of your data to another organization
								</li>
								<li>
									<strong>Right to object:</strong> You have the right to object
									to our processing of your personal data
								</li>
							</ul>
						</section>

						{/* Children's Privacy */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Children&apos;s Privacy
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								Our website is not intended for children under 13 years of age.
								We do not knowingly collect personal information from children
								under 13. If you are a parent or guardian and believe your child
								has provided us with personal information, please contact us.
							</p>
						</section>

						{/* Changes to Privacy Policy */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Changes to This Privacy Policy
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								We may update our Privacy Policy from time to time. We will
								notify you of any changes by posting the new Privacy Policy on
								this page and updating the &quot;Last updated&quot; date at the
								top of this Privacy Policy. You are advised to review this
								Privacy Policy periodically for any changes.
							</p>
						</section>

						{/* Contact */}
						<section>
							<h2 className="text-2xl font-bold text-foreground mb-4">
								Contact Us
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								If you have any questions about this Privacy Policy, please
								contact us:
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

export default PrivacyPolicyPage;
