"use client";

import Header from "@/components/Header";
import schema from "@/instant.schema";
import { db } from "@/library/db";
import { InstaQLEntity } from "@instantdb/react";
import { Masonry } from "masonic";
import { useEffect, useState } from "react";

type Image = InstaQLEntity<typeof schema, "camera", { $files: {} }>;

function Camera() {
	const { isLoading, error, data } = db.useQuery({ camera: { $files: {} } });

	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	if (isLoading) return;

	if (error) return;

	const { camera } = data;

	const sorted = [...camera].sort(
		(a, b) => Date.parse(b.takenAt) - Date.parse(a.takenAt),
	);

	return (
		<>
			<Header>
				<span className="text-[var(--primary)]">Camera</span>
				<br />
				<span className="text-[var(--secondary)]">My Lens</span>
			</Header>
			<main className="p-l h-screen overflow-scroll">
				{activeIndex !== null && (
					<ImageDialog images={sorted} selected={activeIndex} onSelect={setActiveIndex} />
				)}
				<CameraGrid images={sorted} onSelect={setActiveIndex} />
			</main>
		</>
	);
}

function CameraGrid({
	images,
	onSelect,
}: {
	images: Image[];
	onSelect: (index: number) => void;
}) {
	const render = ({ data, index }: { data: Image; index: number }) => {
		return (
			<button onClick={() => onSelect(index)}>
				<Image image={data} />
			</button>
		);
	};

	return <Masonry items={images} columnGutter={12} render={render} />;
}

function ImageDialog({
	images,
	selected,
	onSelect,
}: {
	images: Image[];
	selected: number;
	onSelect: (index: number | null) => void;
}) {
	useEffect(() => {
		if (selected === null) return;

		const onKeyDown = (e: KeyboardEvent) => {
			e.preventDefault();
			switch (e.key) {
				case "Escape":
					onSelect(null);
					break;
				case "ArrowLeft":
					onSelect(Math.max(0, selected - 1));
					break;
				case "ArrowRight":
					onSelect(Math.min(images.length - 1, selected + 1));
					break;
			}
		}

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [images, selected]);

	return (
		<dialog
			open
			className="fixed z-1 inset-0 grid place-items-center p-l w-screen bg-[var(--background)]"
			onClick={() => onSelect(null)}
		>
			<Image image={images[selected]} />
		</dialog>
	);
}

function Image({ image }: { image: Image }) {
	return (
		<img
			className="min-h-0 min-w-0 max-h-full max-w-full object-contain"
			src={image.$files?.url}
			alt={image.alt}
		/>
	);
}

export default Camera;
