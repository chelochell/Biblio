import React, { useState, useEffect, useRef } from "react";
import { useBookStore } from "../store/book";

import pp from "../images/pp.jpg";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";
import { useClusterStore } from "../store/cluster";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { clusters, fetchClusters, createCluster } = useClusterStore();
  const { fetchBook } = useBookStore();
  
  // State to keep track of books for each cluster
  const [clusterBooks, setClusterBooks] = useState({});
  
  useEffect(() => {
    if (user) {
      fetchClusters(user._id);
    }
  }, [user, fetchClusters]);

  // Fetch books for each cluster when clusters are loaded
  useEffect(() => {
    if (clusters && clusters.length > 0) {
      const fetchBooksForClusters = async () => {
        const booksData = {};
        
        for (const cluster of clusters) {
          try {
            const books = await fetchBook(cluster._id);
            booksData[cluster._id] = books;
          } catch (error) {
            console.error(`Error fetching books for cluster ${cluster._id}:`, error);
            booksData[cluster._id] = [];
          }
        }
        
        setClusterBooks(booksData);
      };
      
      fetchBooksForClusters();
    }
  }, [clusters, fetchBook]);

  const editProfileModalRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Collection");

  // Function to render up to 3 book cover images for each cluster
  // Copy just this function and replace your current renderBookCovers function

const renderBookCovers = (cluster) => {
  const books = clusterBooks[cluster._id] || [];
  
  if (!books || books.length === 0) {
    return (
      <div className="bg-gray-200 rounded-xl h-48 w-full flex items-center justify-center">
        <p className="text-gray-500">No books yet</p>
      </div>
    );
  }

  // Take up to 3 books from the cluster
  const booksToShow = books.slice(0, 3);
  
  return (
    <div className="flex h-48 gap-2">
      {/* Left book - larger, takes about 60% of width */}
      <div className="w-3/5">
        <img
          src={booksToShow[0]?.image || "/placeholder-book.png"}
          alt={booksToShow[0]?.title || "Book cover"}
          className="rounded-xl h-full w-full object-cover"
        />
      </div>
      
      {/* Right column with stacked books - takes about 40% of width */}
      <div className="w-2/5 flex flex-col gap-2">
        {/* First book in right column */}
        <div className="h-1/2">
          {booksToShow.length > 1 ? (
            <img
              src={booksToShow[1]?.image || "/placeholder-book.png"}
              alt={booksToShow[1]?.title || "Book cover"}
              className="rounded-xl h-full w-full object-cover"
            />
          ) : (
            <div className="bg-gray-100 rounded-xl h-full w-full"></div>
          )}
        </div>
        
        {/* Second book in right column */}
        <div className="h-1/2">
          {booksToShow.length > 2 ? (
            <img
              src={booksToShow[2]?.image || "/placeholder-book.png"}
              alt={booksToShow[2]?.title || "Book cover"}
              className="rounded-xl h-full w-full object-cover"
            />
          ) : (
            <div className="bg-gray-100 rounded-xl h-full w-full"></div>
          )}
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <div className="mb-8 text-center justify-center items-center flex flex-col font-urbanist mt-24">
        <img src={pp} alt="" className="w-24 h-24 rounded-full object-cover" />
        <h1 className="text-3xl font-bold mb-2 mt-6 ">{user?.username || "User"}</h1>
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
                activeTab === "Collection"
                  ? "text-[#292229]"
                  : "text-gray-500 hover:text-gray-700"
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
                activeTab === "Clubs"
                  ? "text-[#292229]"
                  : "text-gray-500 hover:text-gray-700"
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
                activeTab === "Posts"
                  ? "text-[#292229]"
                  : "text-gray-500 hover:text-gray-700"
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
                <div>
                  {clusters && clusters.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {clusters.map((cluster) => (
                        <Link
                          to={`/cluster/${cluster._id}`}
                          key={cluster._id}
                          className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 p-4"
                        >
                          
                                                   <div className="card-body">
                            <p className="text-gray-600">
                              {cluster.description}
                            </p>
                            <div className="mt-3 mb-3">
                              {renderBookCovers(cluster)}
                            </div>
                            
                          </div>
                         
                        </Link>
                        
                      ))}
                       
                    </div>
                    
                  ) : (
                    <div className="card bg-base-100 shadow-lg">
                      <div className="card-body text-center">
                        <h3 className="card-title justify-center text-xl mb-2">
                          No clusters found
                        </h3>
                        <p className="text-base-content/70 mb-4">
                          Create your first cluster to organize your books
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "Clubs" && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Clubs</h2>
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

      <dialog ref={editProfileModalRef} className="modal">
        <div className="modal-box bg-base-100">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
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