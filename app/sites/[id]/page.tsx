"use client";

import { useEffect, useState } from "react";
import { fetchClientById, fetchSiteById } from "@/lib/api";
import { Site, Client } from "@/types";

export default function SiteDetails({ params }: { params: { id: string } }) {
  const { id } = params;

  const [site, setSite] = useState<Site | null>(null);
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSiteDetails = async () => {
      setLoading(true);
      try {
        const siteData = await fetchSiteById(id);
        setSite(siteData);

        const clientData = await fetchClientById(siteData.clientId);
        setClient(clientData);
      } catch (error) {
        console.error("Error fetching site or client details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSiteDetails();
  }, [id]);

  if (loading)
    return (
      <div className="flex mt-20 pt-20 justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
      </div>
    );

  if (!site || !client) return <p className="text-center">No data found</p>;

  return (
    <div className="container mx-auto p-6 lg:p-12 relative">
      <div className="absolute lg:top-20 lg:left-20 m-2">
        <button
          onClick={() => history.back()}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Back
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 lg:p-10">
        <h1 className="text-4xl mt-10 font-bold text-center mb-8 text-gray-800">{site.title}</h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Site Address</h2>
          <p className="text-lg text-gray-600">
            {site.address.street}, {site.address.city}, {site.address.state}, {site.address.country}, {site.address.zipCode}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Site Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {site.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${site.title} image`}
                className="w-full h-64 object-cover rounded-lg shadow-md transition-transform hover:scale-105 duration-300"
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Main Contact</h2>
          <div className="text-lg text-gray-600">
            <p>
              <strong>Name:</strong> {site.contacts.main.firstName} {site.contacts.main.lastName}
            </p>
            <p>
              <strong>Email:</strong> {site.contacts.main.email}
            </p>
            <p>
              <strong>Phone:</strong> {site.contacts.main.phoneNumber}
            </p>
            <p>
              <strong>Job Title:</strong> {site.contacts.main.jobTitle}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Client Details</h2>
          <div className="flex items-center space-x-6 bg-gray-100 p-4 rounded-lg shadow-sm">

            {client.logo && (
              <img
                src={client.logo}
                alt={`${client.givenName} logo`}
                className="w-24 h-24 object-cover rounded-lg shadow-md"
              />
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-800">{client.givenName}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {client.tags.map((tag) => (
                  <span key={tag} className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
