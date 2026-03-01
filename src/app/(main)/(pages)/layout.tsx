import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
	title: "Ilia",
	description: "Personal essays, projects, photos, and more",
};

export default function PagesLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
			<main className="gap-m p-s">
				{children}
			</main>
		</>
	);
}
