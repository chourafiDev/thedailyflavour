"use server";

import mailchimpClient from "@mailchimp/mailchimp_marketing";
import { render } from "@react-email/render";
import { Resend } from "resend";
import DigitalEbookEmail from "../../../email/digital-ebook-email";

// Initialize services
mailchimpClient.setConfig({
	apiKey: process.env.MAILCHIMP_API_KEY,
	server: process.env.MAILCHIMP_SERVER_PREFIX,
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Define the Mailchimp error type
interface MailchimpError {
	response?: {
		body?: {
			title?: string;
			detail?: string;
			status?: number;
		};
	};
	message?: string;
	status?: number;
}

const sendDigitalEbookEmail = async (
	email: string,
	isExistingSubscriber = false,
) => {
	try {
		const downloadLink =
			process.env.EBOOK_DOWNLOAD_URL ||
			"https://solofemalevoyage.com/assets/download/travel-planner-2026.pdf";

		console.log("Rendering email for:", email);
		console.log("Download link:", downloadLink);
		console.log("FROM_EMAIL:", process.env.FROM_EMAIL);

		const emailHtml = await render(
			DigitalEbookEmail({
				downloadLink,
			}),
		);

		const emailPlainText = await render(
			DigitalEbookEmail({
				downloadLink,
			}),
			{ plainText: true },
		);

		await resend.emails.send({
			from: `Solo Female Voyage ${process.env.FROM_EMAIL}`,
			to: [email],
			subject: "🎉 Your FREE 2026 Travel Planner is Here!",
			html: emailHtml,
			text: emailPlainText,
		});

		return true;
	} catch (error) {
		console.error("Ebook email sending error:", error);

		// Log the full error details
		if (error instanceof Error) {
			console.error("Error name:", error.name);
			console.error("Error message:", error.message);
			console.error("Error stack:", error.stack);
		}

		// If it's a Resend error, log the response
		if (typeof error === "object" && error !== null && "response" in error) {
			console.error("Resend error response:", JSON.stringify(error, null, 2));
		}

		return false;
	}
};

export const addDigitalEbookSubscriber = async ({
	email,
}: {
	email: string;
}) => {
	try {
		// Add to Mailchimp with a specific tag for ebook subscribers
		await mailchimpClient.lists.addListMember(
			process.env.MAILCHIMP_AUDIENCE_ID as string,
			{
				email_address: email,
				status: "subscribed",
				tags: ["Digital Ebook Subscriber", "2026 Travel Planner"], // Tag them for segmentation
			},
		);

		// Send ebook email
		const emailSent = await sendDigitalEbookEmail(email);

		if (!emailSent) {
			console.error(
				"Ebook email failed to send, but Mailchimp subscription succeeded",
			);
		}

		return {
			success: true,
			message: "🎉 Success! Check your email for your FREE travel planner.",
		};
	} catch (error) {
		console.error("Ebook subscription error:", error);

		// Type guard to check if error is a MailchimpError
		const isMailchimpError = (err: unknown): err is MailchimpError => {
			return typeof err === "object" && err !== null && "response" in err;
		};

		if (isMailchimpError(error)) {
			// Handle specific Mailchimp errors
			if (error.response?.body?.title === "Member Exists") {
				// Send ebook email anyway for existing subscribers
				const emailSent = await sendDigitalEbookEmail(email, true);

				return {
					success: true,
					message: emailSent
						? "📧 You're already subscribed! We've resent the planner to your email."
						: "You're already subscribed! Check your email for the planner.",
				};
			}

			if (error.response?.body?.title === "Invalid Resource") {
				return {
					success: false,
					error: "Please enter a valid email address",
				};
			}

			if (error.response?.body?.title === "Forgotten Email Not Subscribed") {
				return {
					success: false,
					error: "Please enter a valid email address",
				};
			}
		}

		// Handle generic errors
		if (error instanceof Error) {
			console.error("Error message:", error.message);
		}

		// Generic error fallback
		return {
			success: false,
			error: "Something went wrong. Please try again later.",
		};
	}
};
