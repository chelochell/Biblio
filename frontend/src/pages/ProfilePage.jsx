import React, { useState, useEffect } from "react";
import { useBookStore } from "../store/book";

const ProfilePage = () => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    reviews: '',
    status: '',
    image: '',
  });

  const { createBook, books, fetchBook } = useBookStore();

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  const handleAddBook = async () => {
    const { success, message } = await createBook(newBook);
    console.log("Success:", success);
    console.log("Message:", message);
    
    if (success) {
      document.getElementById("my_modal_4").close();
      // Reset the form
      setNewBook({
        title: '',
        author: '',
        description: '',
        genre: '',
        reviews: '',
        status: '',
        image: '',
      });
    } else {
      
      alert(message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Fretchel Gerarman</h1>
        <p className="text-gray-600">Book Collection</p>
      </div>

      {/* Tabs Navigation */}
      <div role="tablist" className="tabs tabs-bordered mb-6">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="My Collection"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-4">
          {/* Add Book Button */}
          <div className="flex justify-end mb-4">
            <button
              className="btn btn-primary"
              onClick={() => document.getElementById("my_modal_4").showModal()}
            >
              Add New Book
            </button>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <div key={book._id} className="card bg-base-100 shadow-xl">
                <figure className="px-4 pt-4">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="rounded-xl h-48 w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-book.png';
                    }}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{book.title}</h2>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                  <p className="text-sm">{book.description}</p>
                  <div className="flex justify-between mt-2">
                    <span className="badge badge-primary">{book.genre}</span>
                    <span className="badge badge-secondary">{book.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Reading Stats"
        />
        <div role="tabpanel" className="tab-content p-4">
          <h2 className="text-2xl font-bold mb-4">Reading Statistics</h2>
        
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Settings"
        />
        <div role="tabpanel" className="tab-content p-4">
          <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
        
        </div>
      </div>

    
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <h3 className="font-bold text-lg">Add a New Book</h3>
          <p className="py-4">Keep track of your reads with a new collection.</p>

          
          <form method="dialog" className="space-y-4">
           
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newBook.title}
                placeholder="Enter the book title"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                required
              />
            </div>

            
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={newBook.author}
                placeholder="Enter the author's name"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                required
              />
            </div>

          
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newBook.description}
                rows="4"
                placeholder="Write a brief description of the book"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                required
              ></textarea>
            </div>

           
            <div>
              <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                value={newBook.genre}
                className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                required
              >
                <option value="">Select a genre</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="mystery">Mystery</option>
                <option value="fantasy">Fantasy</option>
                <option value="romance">Romance</option>
                <option value="science-fiction">Science Fiction</option>
                <option value="biography">Biography</option>
                <option value="historical">Historical</option>
                <option value="self-help">Self-Help</option>
                <option value="thriller">Thriller</option>
                <option value="horror">Horror</option>
                <option value="poetry">Poetry</option>
              </select>
            </div>

            {/* Reviews Input */}
            <div>
              <label htmlFor="reviews" className="block text-sm font-medium text-gray-700">
                Reviews
              </label>
              <textarea
                id="reviews"
                name="reviews"
                value={newBook.reviews}
                rows="4"
                placeholder="Write your review or feedback"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setNewBook({ ...newBook, reviews: e.target.value })}
                required
              ></textarea>
            </div>

           
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={newBook.status}
                className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                onChange={(e) => setNewBook({ ...newBook, status: e.target.value })}
                required
              >
                <option value="">Select a status</option>
                <option value="to-be-read">To Be Read</option>
                <option value="reading">Reading</option>
                <option value="finished">Finished</option>
                <option value="dropped">Dropped</option>
                <option value="re-reading">Re-Reading</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Book Cover URL
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={newBook.image}
                  placeholder="Enter image URL (e.g., https://example.com/book-cover.jpg)"
                  className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(e) => setNewBook({ ...newBook, image: e.target.value })}
                  required
                />
                {newBook.image && (
                  <div className="relative h-12 w-12">
                    <img
                      src={newBook.image}
                      alt="Book cover preview"
                      className="h-full w-full rounded object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-book.png';
                      }}
                    />
                  </div>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Please provide a valid image URL for the book cover
              </p>
            </div>

           
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleAddBook}>
                Add Book
              </button>
              <button type="submit" className="btn btn-primary">
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ProfilePage;