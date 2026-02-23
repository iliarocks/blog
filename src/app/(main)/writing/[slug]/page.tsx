"use client";

import { db } from "@/library/db";
import { format } from "date-fns";
import { use } from "react";
import  Markdown from "react-markdown";

function Article({ params }: { params: Promise<{ slug: string }> }) {
	const { isLoading, error, data } = db.useQuery({ writing: {} });
	const { slug } = use(params);

	if (isLoading || error) return;

	const { writing } = data;
	const article = writing.find((item) => item.id == slug);

	if (!article) return;

	return (
		<article className="flex flex-col gap-m max-w-[70ch] mx-auto mb-xl">
			<header className="flex justify-between">
				<h1 className="text-lg">{article.title}</h1>
				<p className="text-[var(--secondary)]">{format(article.postedAt, "MMMM dd yyyy")}</p>
			</header>
			<Markdown>{article.text}</Markdown>
		</article>
	);
}

export default Article;
