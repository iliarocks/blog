"use client";

import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import schema from "@/instant.schema";
import { db } from "@/library/db";
import { id, InstaQLEntity } from "@instantdb/react";
import { format } from "date-fns";
import { FormEventHandler, useState } from "react";

type Item = InstaQLEntity<typeof schema,"writing", {}, undefined, true>;

function WritingDashboard() {
	const { isLoading, error, data } = db.useQuery({ writing: {} });
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");

	if (isLoading || error) return;

	const { writing } = data;

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		if (!title || !text) return;

		const postedAt = JSON.stringify(new Date());

		db.transact(db.tx.writing[id()].create({ title, text, postedAt })); 

		setTitle("");
		setText("");
	}

	return (
		<div className="grid grid-cols-2 gap-l">
			<form onSubmit={handleSubmit} className="flex flex-col gap-s">
				<section className="flex justify-between items-center">
					<TextInput placeholder="Title" value={title} onUpdate={setTitle} />
					<Button type="submit">Post</Button>
				</section>
				<textarea
					value={text}
					onChange={(e) => setText(e.currentTarget.value)}
					className="p-xs bg-[var(--tertiary)]"
				></textarea>
			</form>
			<WritingList items={writing} />
		</div>
	);
}

function WritingList({ items }: { items: Item[] }) {
	const handleDelete = (writingId: string) => {
		db.transact(db.tx.writing[writingId].delete());
	};

	return (
		<ul className="flex flex-col gap-xs">
			{items.map((item) => {
				return (
					<li className="flex gap-l" key={item.id}>
						<section className="flex justify-between gap-m grow truncate">
							<p>{item.title}</p>
							<p>{format(item.postedAt, "MMMM dd yyyy")}</p>
						</section>
						<Button onClick={() => handleDelete(item.id)}>Delete</Button>
					</li>
				);
			})}
		</ul>
	);
}

export default WritingDashboard;
