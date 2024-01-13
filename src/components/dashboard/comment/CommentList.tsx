import React, { useContext, useEffect } from "react";
import CommentElement from "./CommentElement.tsx";
import no_comment from "../../../assets/no_comment.png"
import { AuthContext } from "../../../context/AuthContext.ts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";


export interface Comment {
  commentId: string;
  comment: {
    blogId: string;
    bloggerId: string;
    commentText: string;
    commenter: {
      displayName: string;
      photoURL: string;
      userId: string;
      username: string;
    };
  };
}

interface Props {
    comments: Comment[]
}


const CommentList: React.FC<Props> = ({comments}) => {

    const context = useContext(AuthContext);
    const isAuthenticated = context.isAuthenticated;
    const user = context.user;

    const navigate = useNavigate();

    useEffect(() =>{
      if (isAuthenticated && user.username == "") {
        navigate(`/dashboard/profile/_undefined_username_`);
        toast.error("Setup your @username first!");
      }
    },[])


  return (
    <>
      {isAuthenticated ? (
        <div className={`w-10/12 ${comments.length > 4 ? "h-full" : "h-screen"} z-10 mt-16 `}>
          {comments.length > 0 ? (
            <div className="border-t-2 h-full border-l-2 flex flex-col space-y-8 pt-8 pl-10">
              {comments.map((e, index) => {
                return <CommentElement commentInfo={e} key={index} />;
              })}
            </div>
          ) : (
            <div className="text-white border-t-2 border-l-2 h-full flex justify-center items-center">
              <div className="flex flex-col items-center">
                <img src={no_comment} alt="" className=" h-60 w-72" />
                <span className="text-white font-extrabold text-3xl mt-5">
                  No Comments Yet!
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

export default CommentList;
