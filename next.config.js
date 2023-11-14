/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		METAKEEP_API_KEY: process.env.METAKEEP_API_KEY,
		WEBFLOW_SITE_KEY: process.env.WEBFLOW_SITE_KEY,
	},
};

module.exports = nextConfig;
