import React, { useState, useEffect, useRef } from "react";
import { useBookStore } from "../store/book";
import axios from "axios";
import pp from "../images/pp.jpg";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";
import { useClusterStore } from "../store/cluster";
import { Link } from "react-router-dom";
const ProfilePage = () => {
  const { user } = useAuthStore();
  const { clusters, fetchClusters, createCluster } = useClusterStore();

  useEffect(() => {
   
    if(user){
      fetchClusters(user._id);
    }
  }, [user]);
  console.log(clusters);
  const addBookModalRef = useRef(null);
  const editProfileModalRef = useRef(null);
 
  const [activeTab, setActiveTab] = useState("Collection");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});
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

  const { createBook, books, fetchBook, deleteBook } = useBookStore();

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
    setFormErrors({});
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormErrors({...formErrors, image: "Image size should be less than 5MB"});
        return;
      }
      
      setNewBook((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
      
      
      if (formErrors.image) {
        const newErrors = {...formErrors};
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
      const newErrors = {...formErrors};
      delete newErrors[name];
      setFormErrors(newErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!newBook.title.trim()) errors.title = "Title is required";
    if (!newBook.author.trim()) errors.author = "Author is required";
    if (!newBook.description.trim()) errors.description = "Description is required";
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
        setFormErrors({image: "Failed to upload image: " + uploadRes.data.message});
        setIsSubmitting(false);
        return;
      }

      const imageUrl = uploadRes.data.fileUrl;
      if (!imageUrl) {
        console.error("Upload response:", uploadRes.data);
        setFormErrors({image: "Failed to get image URL from upload response"});
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
      };

      const { success, message } = await createBook(bookData);

      if (success) {
        addBookModalRef.current?.close();
        resetForm();
        
       
        const toast = document.createElement('div');
        toast.className = 'toast toast-top toast-end';
        toast.innerHTML = `
          <div class="alert alert-success">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Book added successfully!</span>
          </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => document.body.removeChild(toast), 3000);
        
        await fetchBook();
      } else {
        setFormErrors({submit: message});
      }
    } catch (error) {
      console.error("Error:", error);
      setFormErrors({submit: "An error occurred while adding the book."});
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <div className="mb-8 text-center justify-center items-center flex flex-col font-urbanist mt-24">
        <img src={pp} alt="" className="w-24 h-24 rounded-full object-cover" />
        <h1 className="text-3xl font-bold mb-2 mt-6 ">{user.username}</h1>
        <p className="text-[#526C03]">Book Cluster</p>
        <div className="mt-6">
          <button
            className="bg-[#292229] text-white px-4 py-2 rounded-2xl hover:bg-[#526C03] hover:text-white transition-all duration-300"
            onClick={() => editProfileModalRef?.current?.showModal()}
          >
            Edit Profile
          </button>
        
        </div>
      </div>

      
      <div className="flex flex-col items-center">
        <div className="w-full max-w-4xl">
         
          <div className="flex w-full border-b border-gray-200">
            <div 
              className={`py-4 px-4 font-medium text-center flex-1 relative cursor-pointer ${
                activeTab === "Collection" ? "text-[#292229]" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("Collection")}
            >
              Collection
              {activeTab === "Collection" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#292229]"></div>
              )}
            </div>
            <div 
              className={`py-4 px-4 font-medium text-center flex-1 relative cursor-pointer ${
                activeTab === "Clubs" ? "text-[#292229]" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("Clubs")}
            >
              Clubs
              {activeTab === "Clubs" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#292229]"></div>
              )}
            </div>
            <div 
              className={`py-4 px-4 font-medium text-center flex-1 relative cursor-pointer ${
                activeTab === "Posts" ? "text-[#292229]" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("Posts")}
            >
              Posts
              {activeTab === "Posts" && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#292229]"></div>
              )}
            </div>
          </div>

          
          <div className="py-4">
            
            {activeTab === "Collection" && (
              <div>
                <div className="flex justify-end mb-4">
                  <button
                    className="btn btn-circle"
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
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </button>
                </div>

                <div>
                  {clusters && clusters.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {clusters.map((cluster) => (
                        <Link 
                          to={{
                            pathname: `/cluster/${cluster._id}`,
                            params: { clusterId: cluster._id },
                           
                          }} 
                          key={cluster._id} 
                          className="bg-red-500"
                        >
                          {cluster.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p>No clusters found</p>
                  )}
                </div>

                {books.length === 0 ? (
                  <div className="card bg-base-100 shadow-lg">
                    <div className="card-body text-center">
                      <h3 className="card-title justify-center text-xl mb-2">No books in your collection yet</h3>
                      <p className="text-base-content/70 mb-4">Add your first book to start your collection</p>
                      <div className="card-actions justify-center">
                        <button 
                          className="btn btn-primary"
                          onClick={() => addBookModalRef.current?.showModal()}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5 mr-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                          Add Your First Book
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book) => (
                      <div key={book._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                        <figure className="px-4 pt-4">
                          <img
                            src={book.image || "/placeholder-book.png"}
                            alt={book.title}
                            className="rounded-xl h-48 w-full object-cover"
                          />
                        </figure>
                        <div className="card-body">
                          <h2 className="card-title">{book.title}</h2>
                          <p className="text-sm text-base-content/70">by {book.author}</p>
                          <p className="text-sm line-clamp-3">{book.description}</p>
                          <div className="card-actions justify-between mt-2">
                            <div className="badge badge-primary">{book.genre}</div>
                            <div className="badge badge-secondary">{book.status}</div>
                            <div className="cursor-pointer" onClick={() => deleteBook(book._id)}>delete</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

           
            {activeTab === "Clubs" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Clubss</h2>
                <p>Loveu</p>
              </div>
            )}

            
            {activeTab === "Posts" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Profile Posts</h2>
                <p>Your profile Posts will appear here.</p>
              </div>
            )}
          </div>
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
          
          <h3 className="font-bold text-xl mb-2">Add a New Book</h3>
          <p className="text-base-content/70 mb-6">
            Keep track of your reads with a new collection entry.
          </p>

          {formErrors.submit && (
            <button className="alert alert-error mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{formErrors.submit}</span>
            </button>
          )}

          <form onSubmit={handleAddBook} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label className="label pt-0">
                  <span className="label-text">Title <span className="text-error">*</span></span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newBook.title}
                  onChange={handleInputChange}
                  placeholder="Enter the book title"
                  className={`input input-bordered w-full ${formErrors.title ? "input-error" : ""}`}
                />
                {formErrors.title && (
                  <label className="label">
                    <span className="label-text-alt text-error">{formErrors.title}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label pt-0">
                  <span className="label-text">Author <span className="text-error">*</span></span>
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={newBook.author}
                  onChange={handleInputChange}
                  placeholder="Enter the author's name"
                  className={`input input-bordered w-full ${formErrors.author ? "input-error" : ""}`}
                />
                {formErrors.author && (
                  <label className="label">
                    <span className="label-text-alt text-error">{formErrors.author}</span>
                  </label>
                )}
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text">Description <span className="text-error">*</span></span>
              </label>
              <textarea
                id="description"
                name="description"
                value={newBook.description}
                onChange={handleInputChange}
                rows="2"
                placeholder="Write a brief description of the book"
                className={`textarea textarea-bordered w-full ${formErrors.description ? "textarea-error" : ""}`}
              />
              {formErrors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">{formErrors.description}</span>
                </label>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text">Genre <span className="text-error">*</span></span>
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={newBook.genre}
                  onChange={handleInputChange}
                  className={`select select-bordered w-full ${formErrors.genre ? "select-error" : ""}`}
                >
                  <option value="" disabled>Select a genre</option>
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
                    <span className="label-text-alt text-error">{formErrors.genre}</span>
                  </label>
                )}
              </div>

              <div className="form-control w-full">
                <label className="label py-1">
                  <span className="label-text">Status <span className="text-error">*</span></span>
                </label>
                <select
                  id="status"
                  name="status"
                  value={newBook.status}
                  onChange={handleInputChange}
                  className={`select select-bordered w-full ${formErrors.status ? "select-error" : ""}`}
                >
                  <option value="" disabled>Select a status</option>
                  <option value="to-be-read">To Be Read</option>
                  <option value="reading">Reading</option>
                  <option value="finished">Finished</option>
                  <option value="dropped">Dropped</option>
                  <option value="re-reading">Re-Reading</option>
                </select>
                {formErrors.status && (
                  <label className="label">
                    <span className="label-text-alt text-error">{formErrors.status}</span>
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
                <span className="label-text">Book Cover Image</span>
              </label>
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={`file-input file-input-sm file-input-bordered w-full ${formErrors.image ? "file-input-error" : ""}`}
                  />
                  {formErrors.image && (
                    <label className="label pt-0 pb-1">
                      <span className="label-text-alt text-error">{formErrors.image}</span>
                    </label>
                  )}
                  <label className="label pt-0 pb-1">
                    <span className="label-text-alt">Maximum file size: 5MB</span>
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

            <div className="modal-action mt-2">
              <button 
                type="submit" 
                className={`btn  btn-sm ${isSubmitting ? "loading" : ""}`}
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

    
      <dialog ref={editProfileModalRef} className="modal">
        <div className="modal-box bg-base-100">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-xl mb-2">Edit Profile</h3>
          <div className="divider"></div>
          <div className="py-4 flex flex-col items-center justify-center">
            <div className="avatar mb-4">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={pp} alt="User avatar" />
              </div>
            </div>
            <p className="text-center mb-6">editt</p>
            
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ProfilePage;