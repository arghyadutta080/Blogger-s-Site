import React from "react";
import BlogElement from "./BlogElement";

const BlogList:React.FC = () => {

    const blog: number[] = [1, 2, 3, 4, 5]

  return (
    <div className="w-10/12 h-full z-10 pt-16">
      <div className="border-t-2 border-l-2 h-full flex flex-row justify-evenly flex-wrap space-x-5 pb-16">
        {
            blog.map((e: number, index: number) => {
                return <BlogElement e = {e} index = {index}/>
            })
        }
      </div>
    </div>
  );
};

export default BlogList;
