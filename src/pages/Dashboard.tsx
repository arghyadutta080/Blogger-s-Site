import React from "react";
import Navbar from "../components/home/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import BlogList from "../components/dashboard/blog/BlogList";

const Dashboard: React.FC = () => {
  return (
    <div className=" bg-slate-800 h-full">
      <Navbar />
      <div className="flex flex-row h-full">
        <Sidebar />
        <BlogList />
      </div>
    </div>
  );
};

export default Dashboard;
