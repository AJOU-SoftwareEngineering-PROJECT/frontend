const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function getAuthToken() {
  return localStorage.getItem("auth_token");
}

export async function request(path, options = {}) {
  const token = getAuthToken();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

/* Books */
export function getBooks() {
  return request("/books");
}

export function createBook(data) {
  return request("/books", {
    method: "POST",
    body: JSON.stringify({
      name: data.name,
      intro: data.intro,
      author_id: data.author_id || 1,
    }),
  });
}

export function searchBooks(keyword) {
  return request(`/books/search?q=${encodeURIComponent(keyword)}`);
}

export function getRankedBooks() {
  return request("/books/rank");
}

/* Comments */
export function getSentenceComments(sentenceId) {
  return request(`/sentences/${sentenceId}/comments`);
}

export function createSentenceComment(sentenceId, content) {
  return request(`/sentences/${sentenceId}/comments`, {
    method: "POST",
    body: JSON.stringify({
      content,
    }),
  });
}

/* Scraps / Bookmark */
export function createScrap(sentenceId) {
  return request("/scraps", {
    method: "POST",
    body: JSON.stringify({
      sentence_id: sentenceId,
    }),
  });
}

export function getMyScraps() {
  return request("/users/me/scraps");
}