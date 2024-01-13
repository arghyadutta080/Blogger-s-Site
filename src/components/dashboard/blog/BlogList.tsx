import React, { useContext, useEffect } from "react";
import BlogElement from "./BlogElement.tsx";
import no_blog from "../../../assets/no_blog.png";
import { AuthContext } from "../../../context/AuthContext.ts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";


export interface Blog {
  blogId: string;
  blogText: string | TrustedHTML;
  blogTitle: string;
  previewImg: string;
  blogger: {
    displayName: string;
    photoURL: string;
    username: string;
  };
}

interface Props {
  blogs: Blog[];
}


const BlogList: React.FC<Props> = ({ blogs }) => {

  const context = useContext(AuthContext);
  const isAuthenticated = context.isAuthenticated;
  const user = context.user;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user.username == "") {
      navigate(`/dashboard/profile/_undefined_username_`);
      toast.error("Setup your @username first!");
    }
  }, []);


  return (
    <>
      {isAuthenticated ? (
        <div
          className={`w-10/12 ${
            blogs.length > 2 ? "h-full" : "h-screen"
          }  z-10 pt-16 mb-0`}
        >
          {blogs.length > 0 ? (
            <div className="border-t-2 border-l-2 h-full flex flex-row justify-evenly flex-wrap space-x-5 pb-16">
              {blogs.map((e, index) => {
                return <BlogElement blog={e} key={index} />;
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
      ) : (
        <div className="w-10/12 h-screen z-10 mt-16 border-t-2 border-l-2 flex flex-col items-center justify-center text-3xl font-extrabold text-white">
          <FaCircleUser className=" h-60 w-60 pb-3" />
          <h3>Login First!</h3>
        </div>
      )}
    </>
  );
};

export default BlogList;
