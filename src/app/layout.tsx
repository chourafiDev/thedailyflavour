import { Manrope, Marcellus } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Footer from "@/components/layout/footer";
import NavBar from "@/components/layout/navbar";
import "../styles/globals.css";
import type { Viewport } from "next";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import GoToTopButton from "@/components/go-to-top-button";
import { JsonLd } from "@/components/JsonLd";
import {
	generateBaseMetadata,
	generateWebsiteSchema,
	siteConfig,
} from "@/lib/metadata";

const manrope = Manrope({
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-manrope",
	subsets: ["latin"],
});

const marcellus = Marcellus({
	weight: "400",
	variable: "--font-marcellus",
	subsets: ["latin"],
});

export const metadata = generateBaseMetadata();

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#161616" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const websiteSchema = generateWebsiteSchema();

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta
					name="google-site-verification"
					content="yxeFNWpuhvlS0eo9B8iQrxf0t5J49c_LIm7DPQoOTZU"
				/>
				<meta
					name="facebook-domain-verification"
					content="4a1y1l86exge4zhu8x7fy6s5ao9jo4"
				/>
				<meta name="msvalidate.01" content="CD6B89087A11047F5523FAC02B18D301" />

				{/* Additional meta tags */}
				<meta name="author" content={siteConfig.creator.name} />
				<meta name="theme-color" content={siteConfig.branding.colors.primary} />

				{/* Social Media Meta Tags */}
				<meta property="og:site_name" content={siteConfig.name} />
				<meta name="twitter:site" content={siteConfig.creator.twitter} />

				{/* Pinterest Domain Verification */}
				<meta
					name="p:domain_verify"
					content="47cb10da423033dd19eb384a733fa0c0"
				/>

				<meta name="apple-mobile-web-app-title" content="MyWebSite" />

				{/* Microsoft Tiles */}
				<meta
					name="msapplication-TileColor"
					content={siteConfig.branding.colors.primary}
				/>

				{/* Preconnect to improve loading performance */}
				<link rel="preconnect" href="https://www.googletagmanager.com" />
				<link rel="preconnect" href="https://www.google-analytics.com" />
				<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
				<link rel="dns-prefetch" href="https://fonts.gstatic.com" />

				{/* Google tag */}
				<Script
					async
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALITICS_ID}`}
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.GOOGLE_ANALITICS_ID}');
          `}
				</Script>
			</head>
			<body
				className={`${manrope.className} ${marcellus.variable} antialiased`}
			>
				<JsonLd data={websiteSchema} id="website-schema" />

				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<NavBar />
					{children}
					<Footer />
					<NextTopLoader showSpinner={false} color="#04363D" />
					<GoToTopButton />
				</ThemeProvider>

				{/* Skip to main content - Accessibility */}
				<a
					href="#main-content"
					className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded"
				>
					Skip to main content
				</a>
			</body>
		</html>
	);
}
