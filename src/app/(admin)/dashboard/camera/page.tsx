"use client";

import { FormEventHandler, useState } from "react";
import schema from "@/instant.schema";
import { db } from "@/library/db";
import { id, InstaQLEntity } from "@instantdb/react";
import exifr from "exifr";
import Button from "@/components/Button";
import FileInput from "@/components/FileInput";
import TextInput from "@/components/TextInput";
import imageCompression from "browser-image-compression";

type Image = InstaQLEntity<
	typeof schema,
	"camera",
	{ $files: {} },
	undefined,
	true
>;

function CameraDashboard() {
	const { isLoading, error, data } = db.useQuery({ camera: { $files: {} } });
	const [image, setImage] = useState<File>();
	const [alt, setAlt] = useState("");
	const [location, setLocation] = useState("");

	if (isLoading || error) return;

	const { camera } = data;

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		if (!image || !alt || !location) return;

		const compressed = await imageCompression(image, {
			maxSizeMB: 3,
			maxWidthOrHeight: 2400,
			useWebWorker: true,
			fileType: "image/jpeg",
			initialQuality: 0.85,
		});

		const exif = await exifr.parse(image);
		const takenAt = exif.DateTimeOriginal.toISOString();
		const path = `camera/${image.name}`;
		const { data } = await db.storage.uploadFile(path, compressed);

		await db.transact(
			db.tx.camera[id()]
				.create({ alt, takenAt, location })
				.link({ $files: data.id }),
		);
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-s md:flex-row md:gap-m"
			>
				<section className="flex max-md:justify-between gap-s items-center grow">
					<TextInput placeholder="Alt text" value={alt} onUpdate={setAlt} />
					<TextInput
						placeholder="Location"
						value={location}
						onUpdate={setLocation}
					/>
					<FileInput
						label={image?.name}
						accept="image/*"
						onChange={(e) => setImage(e.currentTarget.files?.[0])}
					/>
				</section>
				<Button type="submit" className="max-md:self-start">
					Post
				</Button>
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
