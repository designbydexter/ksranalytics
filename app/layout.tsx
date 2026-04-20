import type { Metadata } from 'next';
import { Playfair_Display, Space_Mono, DM_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KS&R on LinkedIn — 90-Day Performance Report',
  description: 'KS&R LinkedIn Performance Report · January 19 – April 18, 2026 · Prepared by Short Form Media',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${spaceMono.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning style={{ fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
