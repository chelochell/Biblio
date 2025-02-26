import React from "react";
import Navbar from "../components/Navbar";
const DiscoverPage = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="w-full h-screen  ">
        <div className="flex flex-col items-center justify-center bg-[#F7F4EE] text-center py-32">
          <div className="mt-24">
          <p className=" font-cormorant-garamond font-bold text-2xl  text-[#526C03]">Join a Book Club</p>
          <p className="  font-urbanist text-4xl font-bold mt-3 text-[#292229]">
            Discover and join a book club <br />that matches your reading interests.
          </p>
          </div>
        </div>

        <div className="mt-24 mx-12">
          <p className=" text-[#292229]">Engaging Book Clubs</p>
         
        </div>
      </div>
    </div>
  );
};

export default DiscoverPage;
