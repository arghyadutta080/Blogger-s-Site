import React from "react";
import { Blog } from "./BlogList";

export interface props {
    blog: Blog, 
    index: number
}

const BlogElement: React.FC<props> = ({blog, index}) => {
  return (
    <div className={` pt-8 pb-10`}>
      <div>
        <img
          src={blog.previewImage} 
          alt=""
          className=" h-60 w-96 rounded-3xl"
        />
      </div>
      <div className="flex flex-col text-white space-y-3 mt-8">
        <div className=" flex flex-row space-x-5">
          <span className=" text-sm font-thin">Mar 16, 2020</span>
          <span className="text-sm font-normal"> Marketing</span>
        </div>
        <span className=" text-2xl font-bold">{blog.blogTitle}</span>
        <div className=" flex flex-row items-center space-x-3">
          <img src={blog.blogger.photoURL} alt="" className="h-7 w-7 rounded-full" />
          <span className=" text-lg font-semibold">{blog.blogger.displayName}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogElement;
