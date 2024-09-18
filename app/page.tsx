"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchSites } from "@/lib/api";
import { Site } from "@/types";

export default function Home() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [filterTitle, setFilterTitle] = useState<string>("");

  useEffect(() => {
    const loadSites = async () => {
      setLoading(true);
      try {
        const data = await fetchSites(page, filterTitle);
        setSites(data);
      } catch (error) {
        console.error("Error loading sites:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSites();
  }, [page, filterTitle]);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left Sidebar (Filters) */}
      <aside className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md h-auto self-start sticky top-4 mt-14">
        <h2 className="text-xl text-center font-semibold mb-4">FILTERS</h2>

        <div className="mb-4">
          <label htmlFor="filterTitle" className="block mb-2 text-sm font-medium text-gray-700">
            Filter by Title
          </label>
          <input
            type="text"
            id="filterTitle"
            placeholder="Search by title"
            value={filterTitle}
            onChange={(e) => setFilterTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
          />
        </div>
      </aside>

      {/* Main Content (Site Cards and Pagination) */}
      <section className="lg:col-span-9">
        <h1 className="text-3xl font-bold text-center my-10">ALL SITES</h1>

        {loading ? (
          <div className="flex justify-center mt-20">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((site) => (
              <li
                key={site.id}
                className="p-4 bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300"
              >
                {site.images.length > 0 && (
                  <img
                    src={site.images[0]}
                    alt={`${site.title} image`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}

                <Link href={`/sites/${site.id}`}>
                  <div className="block text-blue-600 font-semibold hover:underline text-lg">
                    {site.title}
                  </div>
                </Link>

                <p className="text-gray-500">
                  {`${site.address.street}, ${site.address.city}, ${site.address.country}`}
                </p>

                <p className="text-gray-500">
                  Main Contact: {`${site.contacts.main.firstName} ${site.contacts.main.lastName}`}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {site.tags.map((tag) => (
                    <span key={tag} className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
