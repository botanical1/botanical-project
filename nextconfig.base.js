
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const securityHeaders = [
	{
		key: 'X-DNS-Prefetch-Control',
		value: 'on',
	},
	{
		key: 'Strict-Transport-Security',
		value: 'max-age=63072000; includeSubDomains; preload',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
	{
		key: 'X-XSS-Protection',
		value: '1; mode=block',
	},
];

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	swcMinify: true,
	poweredByHeader: false,
	experimental: {
		profiling: true,
		nextScriptWorkers: true,
	},
	async headers() {
		return [
			{
				source: '/:path*',
				headers: securityHeaders,
			},
		];
	},
	reactStrictMode: true,
	images: {
		domains: ['cdn.shopify.com'],
		formats: ['image/webp', 'image/avif'],
		minimumCacheTTL: 86400,
		deviceSizes: [320, 640, 750, 828, 1080, 1200, 1320, 1920, 2640],
		imageSizes: [8, 16, 32, 48, 64, 96, 128, 256, 384],
	},
	nx: {
		svgr: true,
	},
};

module.exports = withNx(withBundleAnalyzer(nextConfig));
