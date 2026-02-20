import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	async redirects() {
		return [
			{
				source: "/dashboard",
				destination: "/dashboard/camera",
				permanent: true,
			},
			{
				source: "/",
				destination: "/camera",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
