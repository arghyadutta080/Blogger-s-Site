import React from "react";
import { Blog } from "./BlogList.tsx";
import { useNavigate } from "react-router-dom";


export interface props {
  blog: Blog;
}


const BlogElement: React.FC<props> = ({ blog }) => {
  const navigate = useNavigate();

  const redirectToViewBlog = () => {
    navigate(`/${blog.blogger.username}/blog/${blog.blogId}`)
  }

  return (
    <div className={` pt-8 pb-10`} onClick={() => redirectToViewBlog()}>
      <div className="h-60 w-96 rounded-2xl border-2">
        <img
          src={blog.previewImg}
          alt=""
          className=" h-full w-full rounded-2xl object-cover"
        />
      </div>
      <div className="flex flex-col text-white space-y-3 mt-8">
        <span className=" text-2xl font-bold">{blog.blogTitle}</span>
        <div className=" flex flex-row items-center space-x-3">
          <img
            src={blog.blogger.photoURL}
            alt=""
            className="h-7 w-7 rounded-full"
          />
          <span className=" text-lg font-semibold">
            {blog.blogger.displayName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogElement;
