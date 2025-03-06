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

  useEffect(() => {
    if (user) {
      fetchClusters(user._id);
    }
  }, [user]);
  console.log(clusters);

  const editProfileModalRef = useRef(null);

  const [activeTab, setActiveTab] = useState("Collection");

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
                            <h2 className="card-title">{cluster.name}</h2>
                            <p className="text-gray-600">
                              {cluster.description}
                            </p>
                            <div className="card-actions justify-end">
                              <button className="btn btn-primary btn-sm">
                                View Books
                              </button>
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
