const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";
import { getAuthToken } from "./auth";

export async function request(path, options = {}) {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

export async function getBooks() {
  return request("/books");
}
