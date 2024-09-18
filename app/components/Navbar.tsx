"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react"; 
import { fetchSites } from "@/lib/api";
import { Site } from "@/types"; 

export default function Navbar() {
  const [filter, setFilter] = useState<string>("");
  const [filteredSites, setFilteredSites] = useState<Site[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [searchVisible, setSearchVisible] = useState<boolean>(false);

  // Toggle the search input field when clicking the search icon or text
  const handleToggleSearch = () => {
    setSearchVisible((prev) => !prev);
    const filterInput = document.getElementById("navbar-filter-input");
    if (filterInput && !searchVisible) {
      filterInput.focus();
      setShowResults(true);
    }
  };

  // Fetch sites when the filter input changes
  useEffect(() => {
    const fetchFilteredSites = async () => {
      if (filter.length > 0) {
        const data = await fetchSites(1, filter);
        setFilteredSites(data);
        setShowResults(true);
      } else {
        setShowResults(false);
        setFilteredSites([]);
      }
    };

    fetchFilteredSites();
  }, [filter]);

  return (
    <nav className="bg-white shadow-md py-4 relative px-2 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          TrackTik
        </Link>

        <ul className="flex space-x-6 text-gray-700 font-medium items-center">
          <li className="flex items-center space-x-2 cursor-pointer" onClick={handleToggleSearch}>
            <Search className="w-5 h-5 text-blue-600" />
            <span className="hover:text-blue-600 transition-colors">Search</span>
          </li>
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Sites
            </Link>
          </li>
          <li>
            <span className="text-gray-400 cursor-not-allowed pointer-events-none">
              About
            </span>
          </li>
        </ul>
      </div>

      <div
        className={`absolute top-16 left-0 w-full transition-transform duration-300 ease-in-out z-50 ${
          searchVisible ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        } origin-top bg-white border-t border-gray-200`}
      >
        <div className="container mx-auto px-4 py-2">
          <input
            type="text"
            id="navbar-filter-input"
            placeholder="Search sites..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />

          {showResults && filteredSites.length > 0 && (
            <ul className="bg-white border border-gray-200 rounded-lg shadow-lg mt-2 z-50">
              {filteredSites.map((site) => (
                <li
                  key={site.id}
                  className="px-4 py-2 hover:bg-gray-100 transition-colors border-b border-gray-200"
                >
                  <Link href={`/sites/${site.id}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-medium">{site.title}</span>
                      <span className="text-sm text-gray-500">{site.address.city}, {site.address.country}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {showResults && filteredSites.length === 0 && filter.length > 0 && (
            <p className="text-center text-gray-500 mt-2">No sites found</p>
          )}
        </div>
      </div>
    </nav>
  );
}
