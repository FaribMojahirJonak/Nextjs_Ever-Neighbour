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
      <html lang="en">
        <body>
          <div className="bg-gray-800 text-white min-h-screen">
            <nav className="bg-gray-900 shadow-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Link href="/" className="text-white font-bold text-xl">Ever Neighbour
                      </Link>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        <Link href="/about" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">About
                        </Link>
                        <Link href="/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard
                        </Link>
                        <Link href="/event" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Events
                        </Link>
                        <Link href="/blog" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Blogs
                        </Link>
                        <Link href="/resident" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Residents
                        </Link>
                        <Link href="/login" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Login
                        </Link>
                        <Link href="/signup" className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Signup
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </body>
      </html>
    );
  }