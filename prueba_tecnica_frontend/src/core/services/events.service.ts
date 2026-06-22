import { fetchWithAuth } from "@/core/lib/fetchWithAuth";
import { EventFormData } from "@/core/interfaces/event.interface";

const BASE_URL = `${import.meta.env.VITE_API}/events`;

export const eventsService = {

  async getAll() {
    return fetchWithAuth(BASE_URL, { method: "GET" });
  },

  async getById(id: number) {
    return fetchWithAuth(`${BASE_URL}/${id}`, { method: "GET" });
  },

  async create(data: EventFormData) {
    return fetchWithAuth(BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async update(id: number, data: EventFormData) {
    return fetchWithAuth(`${BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  async finalize(id: number) {
    return fetchWithAuth(`${BASE_URL}/${id}/finalize`, { method: "PUT" });
  },

  async delete(id: number) {
    return fetchWithAuth(`${BASE_URL}/${id}`, { method: "DELETE" });
  },
};