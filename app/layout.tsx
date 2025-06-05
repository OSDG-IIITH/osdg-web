import type { Metadata } from 'next';
import './globals.css';
import Script from 'next/script';
import Navbar from '../components/Navbar';
export const metadata: Metadata = {
    title: 'OSDG | IIITH',
    description: 'The official website of the Open Source Developers Group at IIIT Hyderabad',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" data-oid="uk1i6jh">
            <body className="bg-black text-green-400 font-mono" data-oid="b0ip.r:">
                <Navbar />
                {children}

                <Script src="/builtwith.js" strategy="afterInteractive" data-oid="d7pkpwn" />
            </body>
        </html>
    );
}
