import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import BlogList, { Blog } from "../components/dashboard/blog/BlogList";
import { getAllBlogs, getMyBlogs } from "../firebase/Blog";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import { AuthContext } from "../context/AuthContext";
import Profile from "../components/Profile";
import CommentList, {
  Comment,
} from "../components/dashboard/comment/CommentList";
import { getMyComments } from "../firebase/Comment";

const Dashboard: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const context = useContext(AuthContext);
  const isAuthenticated = context.isAuthenticated;

  const getBlogs = async () => {
    const bloglist: any = await getAllBlogs();
    setBlogs(bloglist);
    console.log("All blogs", blogs);
  };

  const showMyBlogs = async () => {
    if (isAuthenticated) {
      const bloglist: Blog[] | any = await getMyBlogs();
      setBlogs(bloglist);
    } else {
      setBlogs([]);
    }
    console.log("My blogs", blogs);
  }; 

  const showMyComments = async () => {
    if (isAuthenticated) {
      const commentList: Comment[] | any = await getMyComments();
      setComments(commentList);
      console.log("comments", comments);
    } else {
      setComments([]);
    }
  };

  useEffect(() => {
    getBlogs();
    showMyComments();
  }, []);

  return (
    <div className="bg-slate-800 mb-0">
      <div className=" h-full mb-0">
        <Navbar />
        <div className="flex flex-row h-full">
          <Sidebar getBlogs={getBlogs} showMyBlogs={showMyBlogs} showMyComments={showMyComments} />
          <Routes>
            <Route path="posts" element={<BlogList blogs={blogs} />} />
            <Route
              path=":username/blogs"
              element={<BlogList blogs={blogs} />}
            />
            <Route
              path=":username/comments"
              element={<CommentList comments={comments} />}
            />
            <Route path="profile/:username" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
