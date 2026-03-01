"use client";

import schema from "@/instant.schema";
import { db } from "@/library/db";
import { InstaQLEntity } from "@instantdb/react";
import { useWindowWidth } from "@react-hook/window-size";
import { Masonry } from "masonic";
import { useEffect, useState } from "react";

type Image = InstaQLEntity<
	typeof schema,
	"camera",
	{ $files: {} },
	undefined,
	true
>;

function Camera() {
	const { isLoading, error, data } = db.useQuery({ camera: { $files: {} } });

	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	if (isLoading) return;

	if (error) return;

	const { camera } = data;

	const sorted = camera.toSorted(
		(a, b) => b.takenAt.getTime() - a.takenAt.getTime(),
	);

	return (
		<>
			{activeIndex !== null && (
				<ImageDialog
					images={sorted}
					selected={activeIndex}
					onSelect={setActiveIndex}
				/>
			)}
			<CameraGrid images={sorted} onSelect={setActiveIndex} />
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
	const width = useWindowWidth();
	const isDesktop = width >= 1023;
	const columnWidth = isDesktop ? 350 : undefined;

	const render = ({ data, index }: { data: Image; index: number }) => {
		return (
			<button onClick={() => onSelect(index)}>
				<Image image={data} />
			</button>
		);
	};

	return (
		<Masonry
			items={images}
			columnGutter={12}
			columnWidth={columnWidth}
			render={render}
		/>
	);
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
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [images, selected]);

	return (
		<div
			className="fixed inset-0 z-1 flex flex-col items-center justify-center gap-s p-s bg-[var(--background)]"
			onClick={() => onSelect(null)}
		>
			<Image image={images[selected]} onClick={(e) => e.stopPropagation()} />
			<p
				className="text-[var(--secondary)] shrink-0"
				onClick={(e) => e.stopPropagation()}
			>
				{images[selected].location}
			</p>
		</div>
	);
}

function Image({
	image,
	...props
}: { image: Image } & React.ComponentPropsWithoutRef<"img">) {
	const [loaded, setLoaded] = useState(false);
	return (
		<img
			{...props}
			className={`min-h-0 min-w-0 max-h-full max-w-full object-contain transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${props.className ?? ""}`}
			src={image.$files?.url}
			alt={image.alt}
			onLoad={() => setLoaded(true)}
		/>
	);
}

export default Camera;
