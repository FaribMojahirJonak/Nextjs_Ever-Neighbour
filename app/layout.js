import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Ever Neighbour",
    description: "A community service based website",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="p-6">
            <body className={inter.className}>
                <nav>
                    <ul className="flex gap-6">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/event">Events</Link>
                        </li>
                        <li>
                            <Link href="/blog">Blogs</Link>
                        </li>
                        <li>
                            <Link href="/resident">Residents</Link>
                        </li>
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                        <li>
                            <Link href="/signup">Signup</Link>
                        </li>
                    </ul>
                </nav>
                <hr />
                {children}
            </body>
        </html>
    );
}