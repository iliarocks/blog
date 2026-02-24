import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import "@/app/globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
	title: "Ilia",
	description: "Personal essays, projects, photos, and more",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Header />
				<main className="gap-m p-s">
					{children}
					<Analytics />
				</main>
			</body>
		</html>
	);
}

