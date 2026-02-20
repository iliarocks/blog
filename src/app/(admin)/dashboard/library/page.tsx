"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import schema from "@/instant.schema";
import { db } from "@/library/db";
import { id, InstaQLEntity } from "@instantdb/react";
import { FormEventHandler, useState } from "react";

type Item = InstaQLEntity<typeof schema, "library", {}>;

function LibraryDashboard() {
	const { isLoading, error, data } = db.useQuery({ library: {} });
	const [title, setTitle] = useState<string>("");
	const [authors, setAuthors] = useState<string>("");
	const [type, setType] = useState<string>("");

	if (isLoading || error) return;

	const { library } = data;

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		if (!title || !authors || !type) return;

		db.transact(db.tx.library[id()].create({ title, authors, type }));

		setTitle("");
		setAuthors("");
		setType("");
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-col gap-s md:flex-row md:gap-m">
				<section className="flex flex-col gap-s grow [&>*]:flex-1 md:flex-row">
					<TextInput placeholder="Title" value={title} onUpdate={setTitle} />
					<TextInput
						placeholder="Authors"
						value={authors}
						onUpdate={setAuthors}
					/>
					<TextInput placeholder="Type" value={type} onUpdate={setType} />
				</section>
				<Button type="submit" className="max-md:self-start">
					Post
				</Button>
			</form>
			<LibraryList items={library} />
		</>
	);
}

function LibraryList({ items }: { items: Item[] }) {
	const handleDelete = (libraryId: string) => {
		db.transact(db.tx.library[libraryId].delete());
	};

	return (
		<ul className="flex flex-col gap-xs">
			{items.map((item) => {
				return (
					<li className="flex gap-l" key={item.id}>
						<section className="flex justify-between gap-m grow truncate">
							<p>
								<span>{item.title} · </span>
								<span className="text-[var(--secondary)]">{item.authors}</span>
							</p>
							<p>{item.type}</p>
						</section>
						<Button onClick={() => handleDelete(item.id)}>Delete</Button>
					</li>
				);
			})}
		</ul>
	);
}

export default LibraryDashboard;
