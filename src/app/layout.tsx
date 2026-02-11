import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
		default: 'Ilia',
		template: '%s · Ilia',
	},
  description: 'Personal essays, projects, photos, and more',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
