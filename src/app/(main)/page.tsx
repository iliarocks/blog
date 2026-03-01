"use client";

import Link from "next/link";

function Home() {
	return (
		<main className="grid h-screen w-screen place-items-center">
			<div className="flex flex-col gap-xs">
				<h1 className="text-[var(--secondary)]">Ilia Parunashvili</h1>
				<nav>
					<ul className="flex gap-xs">
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
			</div>
		</main>
	);
}

export default Home;
