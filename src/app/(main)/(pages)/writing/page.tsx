"use client";

import { db } from "@/library/db";
import { format } from "date-fns";
import Link from "next/link";

function Writing() {
	const { isLoading, error, data } = db.useQuery({ writing: {} });

	if (isLoading || error) return;

	const { writing } = data;

	return (
		<ul className="flex flex-col gap-xs">
			{writing.map((item) => {
				return (
					<li className="flex gap-l justify-between" key={item.id}>
						<Link href={`/writing/${item.id}`} className="truncate">{item.title}</Link>
						<p className="hidden text-[var(--secondary)] md:block">{format(item.postedAt, "MMMM dd yyyy")}</p>
					</li>
				);
			})}
		</ul>
	);
}

export default Writing;
