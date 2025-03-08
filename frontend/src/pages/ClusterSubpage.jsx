import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useBookStore } from "../store/book";
import { useClusterStore } from "../store/cluster";
import axios from "axios";
import Navbar from "../components/Navbar";

const ClusterSubpage = () => {
  const { clusterId } = useParams();
  const addBookModalRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [clusterDetails, setClusterDetails] = useState(null);
  const { books, fetchBook, createBook, deleteBook } = useBookStore();
  const { getClusterById } = useClusterStore();

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    reviews: "",
    status: "",
    image: null,
    imagePreview: null,
    clusterId: clusterId,
  });

  useEffect(() => {
    if (clusterId) {
      console.log("ClusterSubpage - clusterId from params:", clusterId);

      useBookStore.getState().setClusterId(clusterId);

      fetchBook(clusterId);

     

     
    }
  }, [clusterId, fetchBook, getClusterById]);

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
      clusterId: clusterId,
    });
    setFormErrors({});
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors({
          ...formErrors,
          image: "Image size should be less than 5MB",
        });
        return;
      }

      setNewBook((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));

      if (formErrors.image) {
        const newErrors = { ...formErrors };
        delete newErrors.image;
        setFormErrors(newErrors);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      const newErrors = { ...formErrors };
      delete newErrors[name];
      setFormErrors(newErrors);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!newBook.title.trim()) errors.title = "Title is required";
    if (!newBook.author.trim()) errors.author = "Author is required";
    if (!newBook.description.trim())
      errors.description = "Description is required";
    if (!newBook.genre) errors.genre = "Please select a genre";
    if (!newBook.status) errors.status = "Please select a status";
    if (!newBook.image) errors.image = "Please select a book cover image";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

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
        setFormErrors({
          image: "Failed to upload image: " + uploadRes.data.message,
        });
        setIsSubmitting(false);
        return;
      }

      const imageUrl = uploadRes.data.fileUrl;
      if (!imageUrl) {
        console.error("Upload response:", uploadRes.data);
        setFormErrors({
          image: "Failed to get image URL from upload response",
        });
        setIsSubmitting(false);
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
        clusterId: clusterId,
      };

      console.log("Creating book with data:", bookData);
      const { success, message } = await createBook(bookData);

      if (success) {
        addBookModalRef.current?.close();
        resetForm();

        const toast = document.createElement("div");
        toast.className = "toast toast-top toast-end";
        toast.innerHTML = `
          <div class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Book added successfully!</span>
          </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => document.body.removeChild(toast), 3000);

        await fetchBook(clusterId);
      } else {
        setFormErrors({ submit: message });
      }
    } catch (error) {
      console.error("Error:", error);
      setFormErrors({ submit: "An error occurred while adding the book." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <div className="mb-8 text-center mt-24 bg-[#064c37] mx-44 h-52 rounded-3xl">
        <h1 className="text-3xl font-bold mb-2">{clusterDetails?.name}</h1>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="flex justify-end mb-4">
            <button
              className=""
              onClick={() => addBookModalRef.current?.showModal()}
              aria-label="Add new book"
              title="Add new book"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
             
            </button>
          </div>

          {books && books.length === 0 ? (
            <div className="">
              <div className="text-center font-urbanist">
                <h3 className="card-title justify-center text-xl mb-2">
                  No books in this cluster yet
                </h3>
                <p className="text-base-content/70 mb-4">
                  Add your first book to start your collection
                </p>
                
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {books &&
                books.map((book) => (
                  <div
                    key={book._id}
                    className="bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 px-6 flex flex-row"
                  >
                    
                      <div className="h-48 w-max-42 my-6">
                        <img
                          src={book.image || "/placeholder-book.png"}
                          alt={book.title}
                          className="rounded-xl h-48 w-full object-cover"
                        />
                      </div>
                      
                 
                    <div className="card-body">
                      <h2 className="font-cormorant-garamond font-bold text-2xl">{book.title}</h2>
                      <p className="text-sm text-base-content/70">
                        by {book.author}
                      </p>
                      <p className="text-sm">{book.description}</p>
                      <div>
                        <div className="badge badge-primary">{book.genre}</div>
                        <div className="badge badge-secondary ml-2">
                          {book.status}
                        </div>
                        <button
                          className="btn btn-sm btn-error ml-2"
                          onClick={() => {
                            deleteBook(book._id);
                            setTimeout(() => fetchBook(clusterId), 500);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      <dialog ref={addBookModalRef} className="modal">
        <div className="modal-box w-11/12 max-w-3xl bg-base-100 max-h-[90vh] overflow-auto">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={resetForm}
            >
              ✕
            </button>
          </form>

          <h3 className="font-bold text-xl mb-2">
            Add a New Book to {clusterDetails?.name || "this cluster"}
          </h3>
          <p className="text-base-content/70 mb-6">
            Add a book to your collection in this cluster.
          </p>

          {formErrors.submit && (
            <div className="alert alert-error mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{formErrors.submit}</span>
            </div>
          )}

          <form onSubmit={handleAddBook} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label pt-0">
                  <span className="label-text">
                    Title <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newBook.title}
                  onChange={handleInputChange}
                  placeholder="Enter the book title"
                  className={`input input-bordered w-full ${
                    formErrors.title ? "input-error" : ""
                  }`}
                />
                {formErrors.title && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {formErrors.title}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label pt-0">
                  <span className="label-text">
                    Author <span className="text-error">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={newBook.author}
                  onChange={handleInputChange}
                  placeholder="Enter the author's name"
                  className={`input input-bordered w-full ${
                    formErrors.author ? "input-error" : ""
                  }`}
                />
                {formErrors.author && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {formErrors.author}
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text">
                  Description <span className="text-error">*</span>
                </span>
              </label>
              <textarea
                id="description"
                name="description"
                value={newBook.description}
                onChange={handleInputChange}
                rows="2"
                placeholder="Write a brief description of the book"
                className={`textarea textarea-bordered w-full ${
                  formErrors.description ? "textarea-error" : ""
                }`}
              />
              {formErrors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {formErrors.description}
                  </span>
                </label>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text">
                    Genre <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={newBook.genre}
                  onChange={handleInputChange}
                  className={`select select-bordered w-full ${
                    formErrors.genre ? "select-error" : ""
                  }`}
                >
                  <option value="" disabled>
                    Select a genre
                  </option>
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
                {formErrors.genre && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {formErrors.genre}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text">
                    Status <span className="text-error">*</span>
                  </span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={newBook.status}
                  onChange={handleInputChange}
                  className={`select select-bordered w-full ${
                    formErrors.status ? "select-error" : ""
                  }`}
                >
                  <option value="" disabled>
                    Select a status
                  </option>
                  <option value="to-be-read">To Be Read</option>
                  <option value="reading">Reading</option>
                  <option value="finished">Finished</option>
                  <option value="dropped">Dropped</option>
                  <option value="re-reading">Re-Reading</option>
                </select>
                {formErrors.status && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {formErrors.status}
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text">Reviews</span>
              </label>
              <textarea
                id="reviews"
                name="reviews"
                value={newBook.reviews}
                onChange={handleInputChange}
                rows="2"
                placeholder="Write your review or feedback (optional)"
                className="textarea textarea-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text">
                  Book Cover Image <span className="text-error">*</span>
                </span>
              </label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={`file-input file-input-sm file-input-bordered w-full ${
                      formErrors.image ? "file-input-error" : ""
                    }`}
                  />
                  {formErrors.image && (
                    <label className="label pt-0 pb-1">
                      <span className="label-text-alt text-error">
                        {formErrors.image}
                      </span>
                    </label>
                  )}
                  <label className="label pt-0 pb-1">
                    <span className="label-text-alt">
                      Maximum file size: 5MB
                    </span>
                  </label>
                </div>
                {newBook.imagePreview && (
                  <div className="avatar">
                    <div className="w-20 h-24 rounded">
                      <img
                        src={newBook.imagePreview}
                        alt="Book cover preview"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <input type="hidden" name="clusterId" value={clusterId} />

            <div className="modal-action mt-2">
              <button
                type="submit"
                className={`btn btn-primary btn-sm ${
                  isSubmitting ? "loading" : ""
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Book"}
              </button>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => {
                  addBookModalRef.current?.close();
                  resetForm();
                }}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={resetForm}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ClusterSubpage;
