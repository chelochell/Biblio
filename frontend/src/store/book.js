import { create } from "zustand";


export const useBookStore = create((set) => ({
  books: [],
  setNewBook: (books) => set({ books }),
  popularBooks: [],
  setPopularBooks: (popularBooks) => set({ popularBooks }),
  createBook: async (newBook) => {
  
    const requiredFields = ['title', 'author', 'description', 'genre', 'status', 'image', 'reviews'];
    const missingFields = requiredFields.filter(field => !newBook[field]);
    
    if (missingFields.length > 0) {
      return { 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      };
    }

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      const data = await res.json();
      
      if (!data.success) {
        return { success: false, message: data.message || 'Failed to create book' };
      }

      set((state) => ({ books: [...state.books, data.data] }));
      return { success: true, message: "Book created successfully" };
    } catch (error) {
      console.error('Error creating book:', error);
      return { success: false, message: 'An error occurred while creating the book' };
    }
  },

  fetchBook: async () => {
    try {
      const res = await fetch("/api/books");
      const data = await res.json();
      
      if (!data.success) {
        console.error('Failed to fetch books:', data.message);
        return;
      }

      set({ books: data.data });
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  },

  deleteBook: async (pid) => {
    try {
      const res = await fetch(`/api/books/${pid}`, {
        method: "DELETE",
      });
      
      const data = await res.json();
      if (!data.success) {
        return { success: false, message: data.message };
      }

      set((state) => ({ 
        books: state.books.filter((book) => book._id !== pid) 
      }));
      
      return { success: true, message: data.message };
    } catch (error) {
      console.error('Error deleting book:', error);
      return { success: false, message: 'An error occurred while deleting the book' };
    }
  },

  updateBook: async (pid, updatedBook) => {
    try {
      const res = await fetch(`/api/books/${pid}`, {
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
        books: state.books.map((book) => 
          book._id === pid ? data.data : book
        ),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error('Error updating book:', error);
      return { success: false, message: 'An error occurred while updating the book' };
    }
  },
  fetchPopularBooks: async () => {
    try {
      const apiUrl = import.meta.env.VITE_RAPIDAPI_URL;
      const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
      const host = import.meta.env.VITE_RAPIDAPI_HOST;
      
      // Get current year and month
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // JavaScript months are 0-based

      const res = await fetch(`${apiUrl}/month/${year}/${month}`,  {
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': host
        }
      });

      const data = await res.json();
      set({ popularBooks: data });
    } catch (error) {
      console.error('Error fetching popular books:', error);
    }
  },
  
  
}));