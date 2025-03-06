import { create } from "zustand";

const API_URL = "http://localhost:5000/api";

export const useBookStore = create((set, get) => ({
  books: [],
  booksLoading: false,
  booksError: null,
  clusterId: null,

  setClusterId: (clusterId) => set({ clusterId }),

  createBook: async (newBook) => {
    const requiredFields = [
      "title",
      "author",
      "description",
      "genre",
      "status",
      "image",
      "clusterId",
    ];
    const missingFields = requiredFields.filter((field) => !newBook[field]);

    if (missingFields.length > 0) {
      return {
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      };
    }

    try {
      console.log("Sending book data with clusterId:", newBook.clusterId);

      const res = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      const data = await res.json();

      if (!data.success) {
        return {
          success: false,
          message: data.message || "Failed to create book",
        };
      }

      set((state) => ({ books: [...state.books, data.data] }));
      return { success: true, message: "Book created successfully" };
    } catch (error) {
      console.error("Error creating book:", error);
      return {
        success: false,
        message: "An error occurred while creating the book",
      };
    }
  },

  fetchBook: async (clusterId) => {
    try {
      set({ booksLoading: true, booksError: null, clusterId });

      const res = await fetch(`${API_URL}/books/cluster/${clusterId}`);
      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`);
      }

      const data = await res.json();
      console.log("Fetched books data:", data);

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch books");
      }

      set({ books: data.data || [], booksLoading: false });
      return data.data;
    } catch (error) {
      console.error("Error fetching books:", error.message || error);
      set({
        booksError: error.message,
        booksLoading: false,
        books: [],
      });
      return [];
    }
  },

  // Delete book
  deleteBook: async (pid) => {
    try {
      const res = await fetch(`${API_URL}/books/${pid}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        books: state.books.filter((book) => book._id !== pid),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting book:", error);
      return {
        success: false,
        message: "An error occurred while deleting the book",
      };
    }
  },

  // Update book
  updateBook: async (pid, updatedBook) => {
    try {
      const res = await fetch(`${API_URL}/books/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedBook),
      });

      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({
        books: state.books.map((book) => (book._id === pid ? data.data : book)),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error updating book:", error);
      return {
        success: false,
        message: "An error occurred while updating the book",
      };
    }
  },

  // Fetch popular books
  fetchPopularBooks: async () => {
    try {
      set({ popularBooksLoading: true, popularBooksError: null });

      const baseUrl = import.meta.env.VITE_RAPIDAPI_URL?.replace(/\/+$/, "");
      const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
      const host = import.meta.env.VITE_RAPIDAPI_HOST;

      if (!baseUrl || !apiKey || !host) {
        throw new Error("Missing required API configuration");
      }

      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const url = `${baseUrl}/${year}/${month}`;

      const res = await fetch(url, {
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": host,
        },
      });

      if (!res.ok) {
        throw new Error(`API responded with status ${res.status}`);
      }

      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected API response format");
      }

      set({
        popularBooks: data,
        popularBooksLoading: false,
      });
    } catch (error) {
      console.error("Error fetching popular books:", error);
      set({
        popularBooksError: error.message,
        popularBooksLoading: false,
        popularBooks: [],
      });
    }
  },
}));
