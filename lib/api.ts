import axios from "axios";
import { Client } from "@/types/client";

const API_URL = "https://tracktik-challenge.staffr.com";

// Fetch clients with pagination and filtering
export const fetchClients = async (page: number, filter: string): Promise<Client[]> => {
  try {
    const response = await axios.get<Client[]>(
      `${API_URL}/clients?_page=${page}&_limit=5&givenName_like=${filter}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
    throw error;
  }
};

// Fetch a specific client by ID
export const fetchClientById = async (id: number): Promise<Client> => {
  try {
    const response = await axios.get<Client>(`${API_URL}/clients/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching client details:", error);
    throw error;
  }
};
