import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Blog } from "../components/dashboard/blog/BlogList";
import { getBlog } from "../firebase/Blog";
import Navbar from "../components/home/Navbar";


const ViewBlog: React.FC = () => {
  const { blogId }: any = useParams();
  const [blog, setBlog] = useState<Blog>();

  const blogData = async (blogId: string) => {
    const fetchData: any = await getBlog(blogId)
    setBlog(fetchData);
  }

  useEffect(() => {
    blogData(blogId)
  }, [])

  return (
    <div>
      <Navbar />
      <div className="relative isolate overflow-hidden bg-gray-900 md:py-20 sm:py-32 h-full mb-0 flex flex-col justify-center items-center">
        <h1 className=" w-7/12 font-bold text-white text-5xl text-center mt-4 mb-7">
          {blog?.blogTitle}
        </h1>
        <div className=" flex flex-row items-center justify-start space-x-3 w-6/12 mb-7">
            <img src={blog?.blogger.photoURL} alt="" className=" h-7 w-7 rounded-full"/>
            <span className=" text-white">{blog?.blogger.displayName} | @{blog?.blogger.username}</span>
        </div>
        <img src={blog?.previewImg} alt="" className=" mb-10 w-7/12 px-12"/>
        <div
          className=" w-7/12 h-full px-12 text-white text-justify"
          dangerouslySetInnerHTML={{ __html: blog?.blogText }}
        ></div>
      </div>
    </div>
  );
};

export default ViewBlog;
