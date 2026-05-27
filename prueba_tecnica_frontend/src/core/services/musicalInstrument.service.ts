import { fetchWithAuth } from "@/core/lib/fetchWithAuth";
import { MusicalInstrumentFormData } from "@/core/interfaces/musicalInstrument.interface";

const BASE_URL = `${import.meta.env.VITE_API}/musical-instruments`;

export const musicalInstrumentService = {

  async getAll() {
    return fetchWithAuth(BASE_URL, { method: "GET" });
  },

  async getById(id: number) {
    return fetchWithAuth(`${BASE_URL}/${id}`, { method: "GET" });
  },

  async getCategories() {
    return fetchWithAuth(`${BASE_URL}/categories`, { method: "GET" });
  },

  async create(data: MusicalInstrumentFormData) {
    return fetchWithAuth(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async update(id: number, data: MusicalInstrumentFormData) {
    return fetchWithAuth(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async delete(id: number) {
    return fetchWithAuth(`${BASE_URL}/${id}`, { method: "DELETE" });
  },
};
