import { create } from "zustand";

export const useBookStore = create((set) => ({
	books: [],
	setNewBook: (books) => set({ books }),
	createBook: async (newBook) => {
		if (!newBook.title || !newBook.image || !newBook.reviews ||  !newBook.author || !newBook.description || !newBook.genre || !newBook.status) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/books", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newBook),
		});
		const data = await res.json();
		set((state) => ({ books: [...state.books, data.data] }));
		return { success: true, message: "Book created successfully" };
	},
	fetchBook: async () => {
		const res = await fetch("/api/books");
		const data = await res.json();
		set({ books: data.data });
	},
	deleteBook: async (pid) => {
		const res = await fetch(`/api/books/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ books: state.books.filter((book) => book._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateBook: async (pid, updatedBook) => {
		const res = await fetch(`/api/books/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedBook),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			books: state.books.map((book) => (book._id === pid ? data.data : book)),
		}));

		return { success: true, message: data.message };
	},
}));