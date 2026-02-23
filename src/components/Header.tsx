"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
	const pathname = usePathname();
	const segments = pathname.split("/").filter(Boolean);
	const title = segments[0] ?? "Ilia";
	const formatted = title.charAt(0).toUpperCase() + title.slice(1);

	return (
		<header className="p-s flex justify-between">
			<h1>{formatted}</h1>
			<nav>
				<ul className="flex gap-2 text-[var(--secondary)] lg:gap-xs">
					<li>
						<Link href="/camera">Camera</Link>
					</li>
					<li>
						<Link href="/writing">Writing</Link>
					</li>
					<li>
						<Link href="/library">Library</Link>
					</li>
					<li>
						<a href="https://github.com/iliarocks">Code</a>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
