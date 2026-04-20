"use server";

import mailchimpClient from "@mailchimp/mailchimp_marketing";
import { render } from "@react-email/render";
import { Resend } from "resend";
import WelcomeEmail from "../../../email/welcome-email";

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

// Define return types
type SubscriberResult =
	| { success: true; message: string }
	| { success: false; error: string };

const sendWelcomeEmail = async (
	email: string,
	isExistingSubscriber = false,
) => {
	try {
		const emailHtml = await render(
			WelcomeEmail({
				isExistingSubscriber,
			}),
		);

		const emailPlainText = await render(
			WelcomeEmail({
				isExistingSubscriber,
			}),
			{ plainText: true },
		);

		await resend.emails.send({
			from: `Solo Female Voyage ${process.env.FROM_EMAIL}`,
			to: [`${email}`],
			subject: "🎉 Welcome to our newsletter!",
			html: emailHtml,
			text: emailPlainText,
		});

		return true;
	} catch (error) {
		console.error("Email sending error:", error);
		return false;
	}
};

export const addWelcomeSubscriber = async ({
	email,
}: {
	email: string;
}): Promise<SubscriberResult> => {
	try {
		// Add to Mailchimp first
		await mailchimpClient.lists.addListMember(
			process.env.MAILCHIMP_AUDIENCE_ID as string,
			{
				email_address: email,
				status: "subscribed",
			},
		);

		// Send welcome email
		const emailSent = await sendWelcomeEmail(email);

		if (!emailSent) {
			console.error(
				"Email failed to send, but Mailchimp subscription succeeded",
			);
		}

		return {
			success: true,
			message: "🎉 Welcome! You've successfully subscribed to our newsletter.",
		};
	} catch (error) {
		console.error("Subscription error:", error);

		// Type guard to check if error is a MailchimpError
		const isMailchimpError = (err: unknown): err is MailchimpError => {
			return typeof err === "object" && err !== null && "response" in err;
		};

		if (isMailchimpError(error)) {
			// Handle specific Mailchimp errors
			if (error.response?.body?.title === "Member Exists") {
				// Send welcome email anyway for existing subscribers
				const emailSent = await sendWelcomeEmail(email, true);

				return {
					success: true,
					message: emailSent
						? "You're already subscribed! Thanks for your continued interest."
						: "You're already subscribed! Thanks for your interest.",
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
