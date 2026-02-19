import React from "react";
import Link from "next/link";

function Header({ 
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<header className="p-l flex flex-col justify-between h-screen">
			<h1>{children}</h1>
			<nav>
				<ul className="flex flex-col gap-2 text-[var(--secondary)]">
					<li>
						<Link href="/code">Code</Link>
					</li>
					<li>
						<Link href="/writing">Writing</Link>
					</li>
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
