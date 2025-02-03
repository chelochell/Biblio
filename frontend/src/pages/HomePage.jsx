import React, { useEffect, useState } from "react";
import bg from "../images/bg.svg";
import { useBookStore } from "../store/book";
import trendingBook from "../images/Trending Book 1.jpg";
import trendingBook2 from "../images/TrendingBook2.jpg";
import bookCover1 from "../images/BookClubCover1.jpg";
import Navbar from "../components/Navbar";
import firstBook from "../images/PopularBoks/firstBook.jpg";
import authorbg from "../images/authorbg.svg";



const HomePage = () => {
  const { books, fetchBook, popularBooks , fetchPopularBooks} = useBookStore();


  useEffect(() => {
    fetchBook();
    fetchPopularBooks();
  }, [fetchBook, fetchPopularBooks]);
  
  console.log(popularBooks);

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
          src={bg}
          alt="Home"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center px-4 -mt-96">
        <h1 className="text-4xl md:text-5xl text-center max-w-3xl leading-relaxed font-urbanist font-bold">
          <span className="text-[#526C03]">Ready to discover your</span><br />
          <span className="text-gray-700">next favorite book?</span>

        </h1>

        <p className="text-gray-600 text-center mt-6 mb-8 max-w-2xl font-urbanist font-light">
          Explore thousands of titles across all genres and find the<br />perfect
          story to dive into.
        </p>

        <div className="w-full max-w-2xl flex justify-center">
          <div className="relative w-full">
            <div className="relative flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative w-full md:w-3/4">
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

      <div className="px-4 py-16 mx-12 mt-16">
        <p className="text-2xl text-gray-800 font-cormorant-garamond font-bold">
          Popular Book Club Picks
        </p>
        <p>Must-read books </p>

        <div className="flex flex-row mt-5 gap-3">
          <div className="flex flex-col">
            <img src={firstBook} alt="firstBook" className="w-40 h-46 rounded-lg"/>
            <h3 className="font-semibold text-sm">House of Flame and Shadow</h3>
            <p className="text-sm text-gray-600">Sarah J. Maas</p>

          </div>

          <div>
            <h1></h1>
           
             
          </div>
          
        </div>
      </div>

      <div className="w-full h-auto mb-60">
        <img src={authorbg} alt="authorbg" className="w-full h-auto object-cover" />
        <div className="relative flex flex-col items-center justify-center px-4 -mt-96">
          <p className="text-lg font-semibold">Author Feature List</p>
          <p className="text-sm text-gray-600">Meet the Minds Behind the Stories.</p>
        </div>
      </div>

      <div className="px-4 py-16 mx-12 ">
        
        <div className="max-w-7xl mx-auto mt-32">
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
