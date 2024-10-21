import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/utils/Providers';

export const metadata: Metadata = {
  title: 'Subabase Todo App',
  description: 'this is a subabase todo app mad by @osama',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
