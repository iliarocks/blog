"use client";

import Link from "next/link";
import "@/app/globals.css";
import { db } from "@/library/db";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import { FormEventHandler, useState } from "react";

const EMAIL = "parun.ilia@gmail.com";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<db.SignedIn>
					<Header />
					<main className="flex flex-col gap-m p-s overflow-scroll">
						{children}
					</main>
				</db.SignedIn>
				<db.SignedOut>
					<Login />
				</db.SignedOut>
			</body>
		</html>
	);
}

function Header() {
	return (
		<header className="flex justify-between p-s">
			<Button onClick={() => db.auth.signOut()}>Exit</Button>
			<nav>
				<ul className="flex gap-2 text-[var(--secondary)]">
					<li>
						<Link href="/dashboard/camera">Camera</Link>
					</li>
					<li>
						<Link href="/dashboard/library">Library</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}

function Login() {
	const [code, setCode] = useState<string>("");

	const sendEmail = () => {
		db.auth
			.sendMagicCode({ email: EMAIL })
			.catch((error) => alert(error.body?.message));
	};

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		if (!code) return;

		db.auth
			.signInWithMagicCode({ email: EMAIL, code })
			.catch((error) => alert(error.body?.message));
	};

	return (
		<div className="h-screen w-screen grid place-items-center">
			<form onSubmit={handleSubmit} className="flex flex-col w-[300px] gap-s">
				<TextInput placeholder="Code" value={code} onUpdate={setCode} />
				<section className="flex justify-between">
					<Button onClick={sendEmail}>Send code</Button>
					<Button type="submit">Verify code</Button>
				</section>
			</form>
		</div>
	);
}
