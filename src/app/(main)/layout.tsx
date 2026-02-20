import type { Metadata } from "next";
import "@/app/globals.css";

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
			<body className="grid grid-cols-2">{children}</body>
		</html>
	);
}
