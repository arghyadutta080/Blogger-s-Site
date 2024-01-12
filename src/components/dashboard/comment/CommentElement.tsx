import React, { useEffect, useState } from "react";
import { Comment } from "./CommentList";
import { getBlog } from "../../../firebase/Blog";
import { Blog } from "../blog/BlogList";


interface Props {
  commentInfo: Comment;
}


const CommentElement: React.FC<Props> = ({ commentInfo }) => {
  const [blogTitle, setBlogTitle] = useState<string>("");

  const blog = async () => {
    const blogData: Blog | any = await getBlog(commentInfo.comment.blogId);
    setBlogTitle(blogData.blogTitle);
  }; 

  useEffect(() => {
    blog();
  }, []);

  return (
    <div className=" w-7/12 border-2 border-blue-500 rounded-2xl h-fit px-3 py-2 text-white flex flex-col space-y-3">
      <div className=" flex flex-row justify-start items-center space-x-2">
        <img
          src={commentInfo.comment.commenter.photoURL}
          alt=""
          className="h-6 w-6 rounded-full"
        />
        <span className=" text-lg font-semibold">{commentInfo.comment.commenter.displayName}</span>
      </div>
      <span className=" text-sm font-normal">
        {commentInfo.comment.commentText}
      </span>
      <span className="text-sm font-thin">{blogTitle}</span>
    </div>
  );
};

export default CommentElement;
