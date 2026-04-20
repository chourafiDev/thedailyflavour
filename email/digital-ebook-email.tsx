import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Section,
	Text,
} from "@react-email/components";

interface DigitalEbookEmailProps {
	downloadLink?: string;
}

export const DigitalEbookEmail = ({
	downloadLink = "https://solofemalevoyage.com/assets/download/travel-planner-2026.pdf",
}: DigitalEbookEmailProps) => (
	<Html>
		<Head />
		<Preview>Your FREE 2026 Southeast Asia Travel Planner is here! 🎉</Preview>
		<Body style={main}>
			<Container style={container}>
				{/* Header with logo/image */}
				<Section style={header}>
					<Heading style={h1}>Your Travel Planner is Ready! ✈️</Heading>
				</Section>

				{/* Main content */}
				<Section style={content}>
					<Text style={paragraph}>Hey there, adventurer! 👋</Text>

					<Text style={paragraph}>
						Welcome to the Solo Female Voyage community! 🌏✨
					</Text>

					<Text style={paragraph}>
						Your <strong>FREE 2026 Southeast Asia Travel Planner Bundle</strong>{" "}
						(52 pages!) is ready to download:
					</Text>

					{/* CTA Button */}
					<Section style={buttonContainer}>
						<Button style={button} href={downloadLink}>
							📥 Download Your Planner Now
						</Button>
					</Section>

					<Text style={paragraph}>
						<strong>Inside your planner, you'll find:</strong>
					</Text>

					<Text style={list}>
						✓ Full 2026 calendar & trip planning pages
						<br />✓ Budget trackers (perfect for affordable SEA travel!)
						<br />✓ Daily itineraries & packing checklists
						<br />✓ Travel journal pages for unforgettable moments
						<br />✓ And so much more...
					</Text>

					<Text style={tipBox}>
						💡 <strong>Quick tip:</strong> Print it out for a physical binder OR
						use it digitally in apps like GoodNotes or Notability!
					</Text>

					<Text style={paragraph}>
						I can't wait to hear where you're headed in 2026. Hit reply and tell
						me — Bali? Vietnam? Thailand? Myanmar?
					</Text>

					<Text style={paragraph}>
						Happy planning! 🗺️
						<br />
						Solo Female Voyage
					</Text>

					<Section style={divider} />

					{/* Footer */}
					<Text style={footer}>
						P.S. Keep an eye on your inbox — I'll be sharing my best solo female
						travel tips, destination guides, and safety advice for Southeast
						Asia every week. 💛
					</Text>

					<Text style={footer}>
						If the download button doesn't work, copy and paste this link into
						your browser:
						<br />
						<Link href={downloadLink} style={link}>
							{downloadLink}
						</Link>
					</Text>
				</Section>

				{/* Unsubscribe footer */}
				<Section style={unsubscribe}>
					<Text style={unsubscribeText}>
						You received this email because you signed up for our travel
						planner. If you no longer wish to receive emails from us, you can{" "}
						<Link href="{{unsubscribe}}" style={link}>
							unsubscribe here
						</Link>
						.
					</Text>
				</Section>
			</Container>
		</Body>
	</Html>
);

export default DigitalEbookEmail;

// Styles
const main = {
	backgroundColor: "#f6f9fc",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "20px 0 48px",
	marginBottom: "64px",
	maxWidth: "600px",
};

const header = {
	padding: "32px 32px 0",
};

const h1 = {
	color: "#04363D",
	fontSize: "28px",
	fontWeight: "bold",
	margin: "0 0 20px",
	padding: "0",
	lineHeight: "1.3",
};

const content = {
	padding: "0 32px",
};

const paragraph = {
	color: "#525f7f",
	fontSize: "16px",
	lineHeight: "1.6",
	margin: "16px 0",
};

const list = {
	color: "#525f7f",
	fontSize: "16px",
	lineHeight: "1.8",
	margin: "16px 0",
};

const tipBox = {
	backgroundColor: "#f8f6f7",
	borderLeft: "4px solid #04363D",
	padding: "16px",
	margin: "24px 0",
	fontSize: "15px",
	lineHeight: "1.6",
	color: "#525f7f",
};

const buttonContainer = {
	padding: "27px 0",
	textAlign: "center" as const,
};

const button = {
	backgroundColor: "#04363D",
	borderRadius: "8px",
	color: "#fff",
	fontSize: "16px",
	fontWeight: "bold",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "inline-block",
	padding: "14px 32px",
};

const divider = {
	borderBottom: "1px solid #e6ebf1",
	margin: "32px 0",
};

const footer = {
	color: "#8898aa",
	fontSize: "14px",
	lineHeight: "1.6",
	margin: "8px 0",
};

const link = {
	color: "#04363D",
	textDecoration: "underline",
};

const unsubscribe = {
	padding: "0 32px",
	marginTop: "32px",
};

const unsubscribeText = {
	color: "#8898aa",
	fontSize: "12px",
	lineHeight: "1.6",
};
