import React from "react";
import { FaRegPenToSquare, FaRegCopy } from "react-icons/fa6";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const iconStyle = " h-8 w-8";
  const textStyle =
    " text-2xl font-bold hover:text-white active:text-green-400 cursor-pointer";
  const listStyle = "flex flex-row items-center justify-start space-x-3";
  const buttonStyle =
    "border-black shadow-inner shadow-black bg-slate-900 rounded-full w-fit px-4 py-1 text-white hover:text-blue-400 hover:border-blue-400 hover hover:shadow-blue-400 active:border-black active:shadow-black active:text-white";

  return (
    <div className=" w-2/12 h-full z-10 pt-16 space-y-5">
      <ul className=" space-y-10 ps-10 border-r-2 border-t-2 h-full">
        <button className={`${listStyle} mt-8 ${buttonStyle}`}>
          <FaPlus className=" h-5 w-5" />{" "}
          <span className=" text-2xl font-bold">New Post</span>
        </button>
        {/* <br /> */}
        <li
          className={`${listStyle} text-green-400 hover:text-white active:text-green-400`}
        >
          <FaRegPenToSquare className={iconStyle} />{" "}
          <span className={textStyle}>Posts</span>
        </li>
        <li
          className={`${listStyle} text-green-400 hover:text-white active:text-green-400`}
        >
          <LiaCommentDotsSolid className={iconStyle} />{" "}
          <span className={textStyle}>Comments</span>
        </li>
        <li
          className={`${listStyle} text-green-400 hover:text-white active:text-green-400`}
        >
          <FaRegCopy className={iconStyle} />{" "}
          <span className={textStyle}>My Blogs</span>
        </li>
        <button className={`${listStyle} border-2 ${buttonStyle}`}>
          <FaSignOutAlt className=" h-7 w-7" />{" "}
          <span className=" text-2xl font-semibold">Sign Out</span>
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;