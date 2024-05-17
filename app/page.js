import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mt-8 mb-6">Welcome to Ever Neighbour</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'black' }}>Events</h3>
              <p className="text-gray-600 mb-4">Explore upcoming events in your neighborhood.</p>
              <Link href="/event" className="text-blue-600 hover:underline">View Events</Link>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'black' }}>Blogs</h3>
              <p className="text-gray-600 mb-4">Read our latest blog posts and stay informed.</p>
              <Link href="/blog" className="text-blue-600 hover:underline">Read Blogs</Link>
            </div>
          </div>
          {/* Add more styled boxes for other sections if needed */}
        </div>
      </div>
    </div>
  );
}