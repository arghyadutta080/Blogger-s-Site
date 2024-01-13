import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Blog } from "../components/dashboard/blog/BlogList.tsx";
import { getBlog } from "../Firebase/Blog.ts";
import Navbar from "../components/home/Navbar.tsx";
import { FaRegComment } from "react-icons/fa";
import {
  comment,
  createComment,
  getBlogComments,
} from "../Firebase/Comment.ts";
import CommentElement from "../components/dashboard/comment/CommentElement.tsx";
import { CiPaperplane } from "react-icons/ci";
import ReactLoading from "react-loading";
import toast from "react-hot-toast";
import { Comment } from "../components/dashboard/comment/CommentList.tsx";

const ViewBlog: React.FC = () => {
  const { blogId }: any = useParams();

  const [blog, setBlog] = useState<Blog>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [myComment, setMyComment] = useState<string>("");

  const [onLoading, setOnLoading] = useState<boolean>(false);

  const blogData = async (blogId: string) => {
    const fetchData: any = await getBlog(blogId);
    setBlog(fetchData);
  };

  const showComments = async (blogId: string) => {
    const commentList: Comment[] | any = await getBlogComments(blogId);
    setComments(commentList);
    // console.log("comments", comments);
  };

  const doComment = async () => {
    if (myComment !== "") {
      setOnLoading(true);
      const commentInfo: comment = {
        commentText: myComment,
        blogId,
      };
      setMyComment("");
      await createComment(commentInfo);
      showComments(blogId);
      setOnLoading(false);
    } else {
      toast.error("Cann't submit empty comment");
    }
  };

  useEffect(() => {
    blogData(blogId);
    showComments(blogId);
  }, []);

  return (
    <div>
      <Navbar />

      {/* Blog details */}

      <div className="relative isolate overflow-hidden md:py-20 sm:py-32 h-full mb-0 flex flex-col justify-center items-center">
        <h1 className=" w-7/12 font-bold text-white text-5xl text-center mt-4 mb-7">
          {blog?.blogTitle}
        </h1>
        <div className=" flex flex-row items-center justify-start space-x-3 w-6/12 mb-7">
          <img
            src={blog?.blogger.photoURL}
            alt=""
            className=" h-7 w-7 rounded-full"
          />
          <span className=" text-white">
            {blog?.blogger.displayName} | @{blog?.blogger.username}
          </span>
          <a
            href="#comments"
            className="flex flex-row items-center justify-between space-x-2 pl-5 cursor-pointer"
          >
            <FaRegComment className="h-5 w-5 text-green-400" />
            <span className=" text-white text-xl">{comments.length}</span>
          </a>
        </div>
        <img src={blog?.previewImg} alt="" className=" mb-10 w-7/12 px-12" />
        {blog && (
          <div
            className=" w-7/12 h-full px-12 text-white text-justify"
            dangerouslySetInnerHTML={{ __html: blog?.blogText }}
          ></div>
        )}
        <div id="comments" className=" w-6/12 flex flex-col">
          {/* comments add and display */}

          <h3 className="text-white font-semibold text-3xl mt-10 mb-3">{`Responses(${comments.length})`}</h3>
          <div className=" flex flex-row items-center justify-start space-x-3 mt-3 mb-5">
            <input
              type="text"
              placeholder="What are your thoughts?"
              className="w-8/12 text-xl px-3 py-1 rounded-md text-center "
              value={myComment}
              onChange={(event) => setMyComment(event.target.value)}
            />
            {onLoading ? (
              <ReactLoading
                type={"spin"}
                color={"white"}
                height={30}
                width={30}
              />
            ) : (
              <CiPaperplane
                className=" h-10 w-10 text-white cursor-pointer hover:scale-125"
                onClick={() => doComment()}
              />
            )}
          </div>

          <div className="space-y-3">
            {comments.map((element, index) => {
              return <CommentElement commentInfo={element} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
