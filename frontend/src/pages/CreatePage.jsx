import React from "react";

const CreatePage = () => {
  return (
    <div>
      //dropdown
      <h1>Create a book</h1>
      <div className="dropdown dropdown-end relative">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <div className="flex flex-col">
            <h4>New cluster</h4>
            <p>A collection of books</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
