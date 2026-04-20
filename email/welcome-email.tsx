import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

interface WelcomeEmailProps {
	isExistingSubscriber?: boolean;
}

export const WelcomeEmail = ({
	isExistingSubscriber = false,
}: WelcomeEmailProps) => {
	const greeting = isExistingSubscriber
		? "Welcome back, fellow traveler! You're already part of our adventurous community."
		: "Welcome to Solo Female Voyage! We're thrilled to have you join our community of fearless travelers.";

	return (
		<Html>
			<Head />
			<Preview>
				✈️ Welcome to Solo Female Voyage! Your adventure starts here.
			</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[600px]">
						{/* Header */}
						<Section className="mt-[32px]">
							<Text className="text-center text-[28px] font-bold text-black m-0">
								✈️ Welcome Aboard! 🌍
							</Text>
							<Text className="text-center text-[16px] leading-[24px] text-[#666666] mt-[8px] mb-0">
								Your journey to fearless solo travel begins now
							</Text>
						</Section>

						{/* Main Content */}
						<Section className="bg-[#f9fafb] rounded-[8px] p-[24px] mt-[32px]">
							<Text className="text-[16px] leading-[24px] text-black">
								Hey Adventurer! 👋
							</Text>

							<Text className="text-[16px] leading-[24px] text-black">
								{greeting}
							</Text>

							<Text className="text-[16px] leading-[24px] text-black">
								You'll receive expert travel guides, safety tips, destination
								inspiration, and real stories from women traveling the world
								solo. We're here to empower you to explore the world confidently
								and safely.
							</Text>

							<Text className="text-[16px] leading-[24px] text-black mb-0">
								The world is waiting for you—let's explore it together! 🗺️
							</Text>
						</Section>

						{/* What to Expect */}
						<Section className="mt-[32px]">
							<Heading
								as="h2"
								className="text-[20px] font-bold text-black mt-0 mb-[16px]"
							>
								📬 What you'll discover:
							</Heading>
							<ul className="text-[16px] text-black pl-[20px] m-0">
								<li className="mb-[8px]">
									🌍 Destination guides curated for solo female travelers
								</li>
								<li className="mb-[8px]">
									🛡️ Essential safety tips and travel hacks
								</li>
								<li className="mb-[8px]">
									💰 Budget-friendly travel advice and money-saving strategies
								</li>
								<li className="mb-[8px]">
									🎒 Packing guides and gear recommendations
								</li>
								<li className="mb-[8px]">
									✨ Inspiring stories from women exploring the world
								</li>
								<li className="mb-[8px]">
									📍 Hidden gems and off-the-beaten-path adventures
								</li>
							</ul>
						</Section>

						{/* Call to Action */}
						<Section className="mt-[32px] bg-[#fef3f2] rounded-[8px] p-[20px] text-center">
							<Text className="text-[16px] text-black font-semibold mb-[12px]">
								🌟 Start Exploring Now
							</Text>
							<Text className="text-[14px] text-[#666666] mb-[16px]">
								Check out our latest travel guides and get inspired for your
								next adventure!
							</Text>
							<Link
								href="https://solofemalevoyage.com"
								className="inline-block bg-black text-white px-[24px] py-[12px] rounded-[6px] text-[14px] font-semibold no-underline"
							>
								Visit Our Blog
							</Link>
						</Section>

						{/* Footer */}
						<Section className="border-t border-solid border-[#eaeaea] pt-[20px] mt-[32px] text-center">
							<Text className="text-[16px] text-black mb-[8px]">
								Happy travels and safe adventures! 🧳
							</Text>
							<Text className="text-[16px] text-black">
								With wanderlust,
								<br />
								<strong>The Solo Female Voyage Team</strong>
							</Text>
						</Section>

						{/* Unsubscribe */}
						<Section className="mt-[32px] pt-[20px] border-t border-solid border-[#eaeaea]">
							<Text className="text-[12px] text-[#8898aa] text-center m-0">
								You're receiving this because you subscribed to Solo Female
								Voyage.
								<br />
								<Link
									href="https://solofemalevoyage.com/unsubscribe"
									className="text-[#8898aa] underline"
								>
									Unsubscribe here
								</Link>{" "}
								if you no longer wish to receive travel inspiration from us.
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

export default WelcomeEmail;
