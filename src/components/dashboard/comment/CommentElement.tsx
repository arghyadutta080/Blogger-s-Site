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
    <div className=" w-7/12 border-2 border-blue-900 bg-blue-900 rounded-2xl h-fit px-3 py-2 text-white flex flex-col space-y-3">
      <div className=" flex flex-row justify-start space-x-5">
        <img
          src={commentInfo.comment.commenter.photoURL}
          alt=""
          className="h-7 w-7 rounded-full"
        />
        <span>{commentInfo.comment.commenter.displayName}</span>
      </div>
      <span className="text-xl font-semibold">
        {commentInfo.comment.commentText}
      </span>
      <span className="text-sm font-thin">{blogTitle}</span>
    </div>
  );
};

export default CommentElement;
