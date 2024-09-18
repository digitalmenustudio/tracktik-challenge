import axios from "axios";
import { Site, Client } from "@/types/index";

// Base API URL
const API_URL = "https://tracktik-challenge.staffr.com";

// Fetch sites with pagination and filtering
export const fetchSites = async (page: number, filter: string): Promise<Site[]> => {
  try {
    const response = await axios.get<Site[]>(
      `${API_URL}/sites?_page=${page}&_limit=9&title_like=${filter}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching sites:", error);
    throw error;
  }
};

// Fetch specific site by ID
export const fetchSiteById = async (id: string): Promise<Site> => {
    try {
        const response = await axios.get<Site>(`${API_URL}/sites/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching site details:", error);
        throw error;
    }
};

// Fetch client details by client ID
export const fetchClientById = async (clientId: string): Promise<Client> => {
  try {
    const response = await axios.get<Client>(`${API_URL}/clients/${clientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client details:", error);
    throw error;
  }
};
