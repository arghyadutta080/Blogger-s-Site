import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/home/Navbar.tsx";
import { AuthContext } from "../context/AuthContext.ts";

const BlogPreviewPage: React.FC = () => {
  //   receiving data from create-new-blog page

  const location = useLocation();
  const [receivedData, setReceivedData] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const data = queryParams.get("data");
    setReceivedData(data || "");
  }, [location.search]);

  const context = useContext(AuthContext);
  const user = context.user;

  //   sending data to create-new-blog page

  const navigate = useNavigate();
  const previewNavigation = () => {
    navigate(
      `/dashboard/${user?.username}/new-blog?data=${encodeURIComponent(
        receivedData
      )}`
    );
  };

  return (
    <div>
      <Navbar />
      <div className="relative isolate overflow-hidden bg-gray-900 md:py-20 sm:py-32 h-full mb-0 flex flex-col justify-center items-center">
        <h1 className="text-center font-bold text-white text-3xl mb-10">
          Your Blog Title
        </h1>
        <div
          className=" w-7/12 h-full px-12 text-white text-justify"
          dangerouslySetInnerHTML={{ __html: receivedData }}
        ></div>
        <button
          className="mt-16 px-3 py-1 text-2xl text-white font-bold border-2 border-blue-400 rounded-2xl hover:border-white hover:bg-white hover:text-blue-600 active:border-blue-400 active:border-4"
          onClick={() => previewNavigation()}
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default BlogPreviewPage;
