import React from "react";
import BlogElement from "./BlogElement";
import no_blog from "../../../assets/no_blog.png"

export interface Blog {
  blogId: string;
  blogText: string;
  blogTitle: string;
  previewImage: string;
  blogger: {
    displayName: string;
    photoURL: string;
    userId: string;
    username: string;
  };
}

interface Props {
  blogs: Blog[];
}


const BlogList: React.FC<Props> = ({ blogs }) => {
  return (
    <div
      className={`w-10/12 ${
        blogs.length > 2 ? "h-full" : "h-screen"
      }  z-10 pt-16 mb-0`}
    >
      {blogs.length > 0 ? (
        <div className="border-t-2 border-l-2 h-full flex flex-row justify-evenly flex-wrap space-x-5 pb-16">
          {blogs.map((e, index) => {
            return <BlogElement blog={e} index={index} key={index} />;
          })}
        </div>
      ) : (
        <div className="text-white border-t-2 border-l-2 h-full flex justify-center items-center">
          <div className="flex flex-col items-center">
            <img src={no_blog} alt="" className=" h-60 w-72" />
            <span className="text-white font-extrabold text-3xl mt-5">
              No Blogs Yet!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;
