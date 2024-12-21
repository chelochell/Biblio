import React from "react";

const ProfilePage = () => {
  return (
    <div>
      <h1>Fretchel Gerarman</h1>

      <div role="tablist" className="tabs tabs-bordered flex-end">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Tab 1"
        />
        <div role="tabpanel" className="tab-content p-10">
          <button className="btn">Add Button</button>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Tab 2"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10">
        
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            open modal
          </button>
          <dialog id="my_modal_4" className="modal">
  <div className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg">Add a New Book</h3>
    <p className="py-4">Keep track of your reads with a new collection.</p>

    {/* Form for Adding a Book */}
    <form method="dialog" className="space-y-4">
      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter the book title"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      {/* Author Input */}
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          id="author"
          name="author"
          placeholder="Enter the author's name"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      {/* Description Input */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          rows="4"
          placeholder="Write a brief description of the book"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>

      {/* Genre Dropdown */}
      <div>
        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
        <select
          id="genre"
          name="genre"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="mystery">Mystery</option>
          <option value="fantasy">Fantasy</option>
          <option value="romance">Romance</option>
          <option value="science-fiction">Science Fiction</option>
          <option value="biography">Biography</option>
          <option value="historical">Historical</option>
        </select>
      </div>

      {/* Reviews Input */}
      <div>
        <label htmlFor="reviews" className="block text-sm font-medium text-gray-700">Reviews</label>
        <textarea
          id="reviews"
          name="reviews"
          rows="4"
          placeholder="Write your review or feedback"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>

      {/* Status Dropdown */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select
          id="status"
          name="status"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="to-be-read">To Be Read</option>
          <option value="reading">Reading</option>
          <option value="finished">Finished</option>
          <option value="dropped">Dropped</option>
          <option value="re-reading">Re-Reading</option>
        </select>
      </div>

      {/* Image Upload */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Book Cover</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-sm shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      {/* Modal Actions */}
      <div className="modal-action">
        <button type="submit" className="btn btn-primary">Save Book</button>
        <button type="button" className="btn">Close</button>
      </div>
    </form>
  </div>
</dialog>

        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Tab 2"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10">
          <button className="btn">Content 3</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
