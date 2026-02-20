import type { Metadata } from "next";
import Link from "next/link";
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
			<body>
				<Header />
				<main className="flex flex-col gap-m p-s overflow-scroll">
					{children}
				</main>
			</body>
		</html>
	);
}

function Header() {
	return (
		<header className="p-s flex justify-between">
			<h1>Camera</h1>
			<nav>
				<ul className="flex gap-2 text-[var(--secondary)]">
					<li>
						<Link href="/camera">Camera</Link>
					</li>
					<li>
						<Link href="/library">Library</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
