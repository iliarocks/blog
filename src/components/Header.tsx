"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
	const pathname = usePathname();
	const title = pathname.split("/").pop() ?? "Ilia";
	const formatted = title.charAt(0).toUpperCase() + title.slice(1);

	return (
		<header className="p-s flex justify-between">
			<h1>{formatted}</h1>
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

export default Header;
