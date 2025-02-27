import React, { useState, useEffect, useRef } from "react";
import { useBookStore } from "../store/book";
import axios from "axios";
import pp from "../images/pp.jpg";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";

const ProfilePage = () => {
  const modalRef = useRef(null);
  const { user } = useAuthStore();
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    reviews: "",
    status: "",
    image: null,
    imagePreview: null,
  });

  const { createBook, books, fetchBook } = useBookStore();

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  const resetForm = () => {
    setNewBook({
      title: "",
      author: "",
      description: "",
      genre: "",
      reviews: "",
      status: "",
      image: null,
      imagePreview: null,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBook((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    if (!newBook.image) {
      alert("Please select a book cover image");
      return;
    }

    const formData = new FormData();
    formData.append("file", newBook.image);

    try {
      const uploadRes = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!uploadRes.data.success) {
        alert("Failed to upload image: " + uploadRes.data.message);
        return;
      }

      console.log("Upload response:", uploadRes.data);

      const imageUrl = uploadRes.data.fileUrl;
      if (!imageUrl) {
        console.error("Upload response:", uploadRes.data);
        alert("Failed to get image URL from upload response");
        return;
      }

      const bookData = {
        title: newBook.title,
        author: newBook.author,
        description: newBook.description,
        genre: newBook.genre,
        reviews: newBook.reviews,
        status: newBook.status,
        image: imageUrl,
      };

      const { success, message } = await createBook(bookData);

      if (success) {
        modalRef.current?.close();
        resetForm();
        alert("Book added successfully!");
        await fetchBook();
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while adding the book.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <div className="mb-8 text-center justify-center items-center flex flex-col font-urbanist mt-24">
        <img src={pp} alt="" className="w-24 h-24 rounded-full" />
        <h1 className="text-3xl font-bold mb-2 mt-6 ">{user.username}</h1>
        <p className="text-[#526C03]">Book Cluster</p>
        <div className="mt-6">
          <button className="bg-[#292229] text-white px-4 py-2 rounded-2xl hover:bg-[#526C03] hover:text-white transition-all duration-300">
            Edit Profile
          </button>
        </div>
      </div>

      <div
        role="tablist"
        className="tabs tabs-bordered mb-6 justify-center items-center"
      >
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Collection"
          defaultChecked
        />

        <div role="tabpanel" className="tab-content p-4" >
          <div className="flex justify-end mb-4">
            <button
              className="bg-[#292229] rounded-full"
              onClick={() => modalRef.current?.showModal()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
                color="white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>

          {/* BOOKS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center items-center ">
            {books.map((book) => (
              <div key={book._id} className="card bg-base-100 shadow-xl">
                <figure className="px-4 pt-4">
                  <img
                    src={book.image || "/placeholder-book.png"}
                    alt={book.title}
                    className="rounded-xl h-48 w-full object-cover"
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

      <dialog ref={modalRef} className="modal">
        <div className="w-11/11 max-w-5xl">
          <h3 className="font-bold text-lg">Add a New Book</h3>
          <p className="py-4">
            Keep track of your reads with a new collection.
          </p>

          <form onSubmit={handleAddBook} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newBook.title}
                onChange={handleInputChange}
                placeholder="Enter the book title"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={newBook.author}
                onChange={handleInputChange}
                placeholder="Enter the author's name"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newBook.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Write a brief description of the book"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-gray-700"
              >
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                value={newBook.genre}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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

            <div>
              <label
                htmlFor="reviews"
                className="block text-sm font-medium text-gray-700"
              >
                Reviews
              </label>
              <textarea
                id="reviews"
                name="reviews"
                value={newBook.reviews}
                onChange={handleInputChange}
                rows="4"
                placeholder="Write your review or feedback"
                className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={newBook.status}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Book Cover Image
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
                {newBook.imagePreview && (
                  <div className="relative h-12 w-12">
                    <img
                      src={newBook.imagePreview}
                      alt="Book cover preview"
                      className="h-full w-full rounded object-cover"
                    />
                  </div>
                )}
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Please upload an image for the book cover
              </p>
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                Add Book
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  modalRef.current?.close();
                  resetForm();
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ProfilePage;
