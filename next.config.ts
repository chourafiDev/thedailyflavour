import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "thedailyflavour.com",
			},
			{
				protocol: "https",
				hostname: "cms.thedailyflavour.com",
			},
		],
	},
};

export default nextConfig;
