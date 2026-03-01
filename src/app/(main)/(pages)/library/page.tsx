"use client";

import { db } from "@/library/db";

function Library() {
	const { isLoading, error, data } = db.useQuery({ library: {} });

	if (isLoading || error) return;

	const { library } = data;

	return (
		<ul className="flex flex-col gap-xs">
			{library.map((item) => {
				return (
					<li className="flex gap-l justify-between lg:gap-xl" key={item.id}>
						<p className="truncate lg:flex lg:justify-between lg:w-[70%]">
							<span>{item.title}</span>
							<span className="lg:hidden"> · </span>
							<span className="text-[var(--secondary)]">{item.authors}</span>
						</p>
						<p>{item.type}</p>
					</li>
				);
			})}
		</ul>
	);
}

export default Library;
