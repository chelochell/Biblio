import React, { useEffect, useState } from "react";
import search from "../images/search-icon.svg";
import bg_banner from "../images/bg_banner.svg";
import { useBookStore } from "../store/book";
import trendingBook from "../images/Trending Book 1.jpg";
import trendingBook2 from "../images/TrendingBook2.jpg";
import bookCover1 from "../images/BookClubCover1.jpg";
import Navbar from "../components/Navbar";


const HomePage = () => {
  const { books, fetchBook } = useBookStore();

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

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
      <div className="w-full h-screen">
        <img
          src={bg_banner}
          alt="Home"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center px-4 -mt-96">
        <h1 className="text-4xl md:text-5xl text-center max-w-3xl leading-relaxed">
          <span className="text-gray-700">Ready to </span>
          <span className="text-amber-400 font-medium">discover</span>
          <span className="text-gray-700"> your </span>
          <br />
          <span className="text-gray-700"> next </span>
          <span className="text-purple-600 italic">favorite book</span>
          <span className="text-gray-700">?</span>
        </h1>

        <p className="text-gray-600 text-center mt-6 mb-8 max-w-2xl">
          Explore thousands of titles across all genres and find the perfect
          story to dive into.
        </p>

        <div className="w-full max-w-2xl">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <img
                src="/images/search-icon.svg"
                alt="Search"
                className="w-5 h-5 text-gray-400"
              />
            </div>
            <input
              type="text"
              placeholder="Search by title, author, or genre..."
              className="w-full px-12 py-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <button className="px-6 py-2 bg-gray-800 text-white rounded-full">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-16 mx-12 mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-medium text-gray-800 mb-8">
            My Library
          </h2>

          <div className="flex space-x-6 overflow-x-auto pb-6">
            {books?.map((book) => (
              <div key={book._id} className="flex-shrink-0 w-48">
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-book.png";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
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

        <div>
          <div className="flex flex-col md:flex-row pt-5 m-10 ">
            <div className=" flex-grow pr-8">
              <h2 className="text-text-color font-lexend mb-2">
                by Lee Geum-yi
              </h2>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Can’t I Go Instead
              </h2>
              <p className="text-text-color font-lexend font-light ">
                a deeply moving and poignant tale that explores the boundless
                depths of love, sacrifice, and resilience.
              </p>
            </div>
            <div className="w-32 flex-shrink-0 ">
              <img
                src={trendingBook}
                alt="Book 1"
                className="w-full h-40 object-cover rounded-xl"
              />
            </div>
          </div>
          <hr className="border-gray-200 border-1 w-full h-1" />

          <div className="flex flex-col md:flex-row pt-5 m-10 ">
            <div className=" flex-grow pr-8">
              <h2 className="text-text-color font-lexend mb-2">by E.J. Koh</h2>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                The Magical Language of Others
              </h2>
              <p className="text-text-color font-lexend font-light ">
                aIt's a powerful memoir that delves into themes of family, love,
                loss, and the struggles of bridging cultural and generational
                divides.
              </p>
            </div>
            <div className="w-32 flex-shrink-0 ">
              <img
                src={trendingBook2}
                alt="Book 1"
                className="w-full h-40 object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="px-4 py-16 mx-12 mt-16">
        <h1 className="text-2xl font-medium text-gray-800 mb-4">
          Recommended for You
        </h1>
        <p className="text-gray-600 mb-8">
          Discover what everyone’s been talking about and find your next great
          read today.
        </p>
        <div className="bg-gradient-to-r from-[#FFDECF] via-yellow-200 to-[#C79645] h-auto w-full rounded-lg">
          <div className="flex flex-row items-center">
            <div>
              <img
                src={recommendedBook}
                alt="recommendedBook"
                className="object-cover rounded-xl pl-20 my-20"
              />
            </div>
            <div className="flex-1 ml-16">
              <div className="mb-6">
                <img src={curve} alt="curve" className="mb-4" />

                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  2024 Best Selling Books
                </h1>
              </div>
              <p className="text-text-color font-lexend font-light text-xl">
                Treasures that captured hearts and minds this year!
              </p>
              <div className="bg-[#F0F3EB] rounded-lg p-4 flex mt-5 w-auto mr-10">
                <img src={discoverBook} alt="discover book" />
                <div className="flex flex-col pl-6">
                  <h5 className="text-gray-800 font-lexend font-bold">
                    Discover gripping tales
                  </h5>
                  <p className="text-text-color font-lexend font-light">
                    Lose yourself in heartwarming stories of love, passion, and
                    connection.
                  </p>
                </div>
              </div>
              <button className=" mt-6 flex items-center justify-center px-8 py-4 text-white text-xl font-semibold bg-gradient-to-r from-[#7FC24A] to-[#8D77AB] rounded-full">
                <span>Explore All Best Sellers →</span>
              </button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="px-4 py-16 mx-12 mt-16">
        <h1 className="text-2xl font-lexend text-text-color font-bold">
          Book Clubs
        </h1>

        <div>
          <img
            src={bookCover1}
            alt="book cover"
            className="w-30 h-30 object-cover rounded-lg"
          />
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default HomePage;
