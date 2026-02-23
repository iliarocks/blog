"use client";

import { FormEventHandler, useState } from "react";
import schema from "@/instant.schema";
import { db } from "@/library/db";
import { id, InstaQLEntity } from "@instantdb/react";
import exifr from "exifr";
import Button from "@/components/Button";
import FileInput from "@/components/FileInput";
import TextInput from "@/components/TextInput";

type Image = Omit<InstaQLEntity<typeof schema, "camera", { $files: {} }>, "takenAt"> & {
    takenAt: Date;
};

function CameraDashboard() {
	const { isLoading, error, data } = db.useQuery({ camera: { $files: {} } });
	const [image, setImage] = useState<File>();
	const [alt, setAlt] = useState<string>("");

	if (isLoading || error) return;

	const { camera } = data;

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		if (!image || !alt) return;

		const exif = await exifr.parse(image);
		const takenAt = exif.DateTimeOriginal.toISOString();
		const path = `camera/${image.name}`;
		const { data } = await db.storage.uploadFile(path, image);

		await db.transact(
			db.tx.camera[id()].create({ alt, takenAt }).link({ $files: data.id }),
		);
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-col gap-s md:flex-row md:gap-m">
				<section className="flex max-md:justify-between gap-s items-center grow">
					<TextInput placeholder="Alt text" value={alt} onUpdate={setAlt} />
					<FileInput
						label={image?.name}
						accept="image/*"
						onChange={(e) => setImage(e.currentTarget.files?.[0])}
					/>
				</section>
				<Button type="submit" className="max-md:self-start">Post</Button>
			</form>
			<CameraGrid images={camera} />
		</>
	);
}

function CameraGrid({ images }: { images: Image[] }) {
	const handleDelete = (path: string) => {
		db.storage.delete(path);
	};

	return (
		<ul className="grid grid-cols-1 gap-s items-start md:grid-cols-2 lg:grid-cols-4">
			{images.map((image, key) => {
				const file = image.$files;
				if (!file) return;

				return (
					<li className="flex flex-col bg-[var(--tertiary)]" key={key}>
						<img src={file.url} className="aspect-square w-full object-cover" />
						<div className="flex justify-between p-s">
							<p className="text-sm">{file.path.split("/")[1]}</p>
							<Button size="s" onClick={() => handleDelete(file.path)}>
								Delete
							</Button>
						</div>
					</li>
				);
			})}
		</ul>
	);
}

export default CameraDashboard;
