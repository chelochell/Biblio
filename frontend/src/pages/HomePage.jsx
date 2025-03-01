import React, { useEffect, useState } from "react";
import { useBookStore } from "../store/book";
import Navbar from "../components/Navbar";
import firstBook from "../images/PopularBoks/firstBook.jpg";


export const HomePage = () => {
  const { books, fetchBook, popularBooks, fetchPopularBooks } = useBookStore();

  useEffect(() => {
    fetchBook();
    fetchPopularBooks();
  }, []);

  useEffect(() => {
    console.log("Books:", books);
    console.log("Popular Books:", popularBooks);
  }, []);

  const [selectedGenre, setSelectedGenre] = useState("mystery");

  const genres = [
    "fiction",
    "non-fiction",
    "mystery",
    "fantasy",
    "romance",
    "science-fiction",
    "biography",
    "historical",
    "self-help",
    "thriller",
  ];

  return (
    <div>
      <Navbar />
      <div className="w-full h-screen relative text-center mt-40">
        <div className="relative z-10 flex flex-col items-center justify-center px-4 ">
          <h1 className="text-4xl md:text-5xl text-center max-w-3xl leading-relaxed font-urbanist font-bold">
            <span className="text-[#526C03]">Ready to discover your</span>
            <br />
            <span className="text-gray-700">next favorite book?</span>
          </h1>

          <p className="text-gray-600 text-center mt-6 mb-8 max-w-2xl font-urbanist font-light">
            Explore thousands of titles across all genres and find the
            <br />
            perfect story to dive into.
          </p>

          <div className="w-full max-w-2xl flex justify-center">
            <div className="relative w-full">
              <div className="relative flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative w-full md:w-3/4 border border-gray-300 rounded-2xl ">
                  <input
                    type="text"
                    placeholder="Search by title, author, or genre..."
                    className="input w-full pl-10 pr-16 py-4 rounded-2xl bg-white/80 backdrop-blur-sm h-auto"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <button className="px-4 py-2 bg-[#093D2B] text-white rounded-lg">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-16 mx-12">
        <div className="mb-6">
          <h2 className="text-4xl text-black-800 font-cormorant-garamond font-bold">
            Popular Book Club Picks
          </h2>
          <p className="text-gray-800">Must-read books</p>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
            {popularBooks && popularBooks.length > 0 ? (
              popularBooks.map((book) => (
                <div key={book._id} className="flex-none">
                  <div className="w-48 h-72 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={book.cover || firstBook}
                      alt={book.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = firstBook;
                      }}
                    />
                  </div>
                  <div className="mt-3">
                    <h3 className="font-medium text-sm text-gray-900 w-40">
                      {book.name}
                    </h3>
                    {book.author && (
                      <p className="text-sm text-gray-500">
                        {book.author}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-8">
                <p className="text-gray-600">
                  No popular books available at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-16 mx-12 ">
        <div className="max-w-7xl mx-auto mt-32">
          <h2 className="text-4xl text-black-800 font-cormorant-garamond font-bold mb-6">
            My Library
          </h2>

          <div className="flex space-x-6 overflow-x-auto pb-6">
            {books && books.length > 0 ? (
              books.map((book) => (
                <div key={book._id} className="flex-shrink-0 w-48">
                  <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={book.image || "/placeholder-book.png"}
                      alt={book.title || "Book cover"}
                      className="w-full h-full object-cover transition-opacity duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-book.png";
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-medium text-sm truncate">
                        {book.title || "Untitled"}
                      </h3>
                      <p className="text-gray-300 text-xs truncate">
                        {book.author || "Unknown Author"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center py-8">
                <p className="text-gray-600">
                  No books available at the moment.
                </p>
                <button
                  onClick={() =>
                    document
                      .querySelector('[aria-label="Add New Book"]')
                      ?.click()
                  }
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Add Your First Book
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <div className="w-full h-auto mb-60">
        <img
          src={authorbg}
          alt="authorbg"
          className="w-full h-auto object-cover"
        />
        <div className="relative flex flex-col items-center justify-center px-4 -mt-96">
          <p className="text-lg font-semibold">Author Feature List</p>
          <p className="text-sm text-gray-600">
            Meet the Minds Behind the Stories.
          </p>
        </div>
      </div>

      

      <div className="px-4 py-16 mx-12">
        <h1 className="text-2xl font-medium text-gray-800 mb-8">
          Trending Books
        </h1>
        <div className="flex flex-wrap gap-4 p-4">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium
                transition-colors duration-200
                ${
                  selectedGenre === genre
                    ? "bg-rose-100 text-rose-900"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {genre}
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
};
