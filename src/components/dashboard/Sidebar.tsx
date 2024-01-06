import React, { useContext } from "react";
import { FaRegPenToSquare, FaRegCopy } from "react-icons/fa6";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { FaPlus, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logOut } from "../../firebase/Auth";
import ProfileModal from "../Profile";

interface Props {
  getBlogs: () => Promise<void>;
  showMyBlogs: () => Promise<void>;
}

const Sidebar: React.FC<Props> = ({ getBlogs, showMyBlogs }) => {
  const context = useContext(AuthContext);
  const user = context.user;
  const setIsAuthenticated = context.setIsAuthenticated;

  const iconStyle = " h-8 w-8";
  const textStyle =
    " text-2xl font-bold hover:text-white active:text-green-400 cursor-pointer";
  const listStyle = "flex flex-row items-center justify-start space-x-3";
  const buttonStyle =
    "border-black shadow-inner shadow-black bg-slate-900 rounded-full w-fit px-4 py-1 text-white hover:text-blue-400 hover:border-blue-400 hover hover:shadow-blue-400 active:border-black active:shadow-black active:text-white";

  const logOutUser = async () => {
    const authState: any = await logOut();
    setIsAuthenticated(false);
    console.log("inside logoutUser", authState.authState);
  };

  return (
    <div className=" w-2/12 h-screen z-10 pt-16 space-y-5">
      <ul className=" space-y-10 ps-10 border-t-2 h-full">
        <button className={`${listStyle} mt-8 ${buttonStyle}`}>
          <FaPlus className=" h-5 w-5" />{" "}
          <span className=" text-2xl font-bold">New Post</span>
        </button>
        {/* new blog create and preview */}

        <Link
          to="posts"
          className={`${listStyle} text-green-400 hover:text-white active:text-green-400`}
          onClick={() => getBlogs()}
        >
          <FaRegPenToSquare className={iconStyle} />{" "}
          <span className={textStyle}>Posts</span>
        </Link>

        <li
          className={`${listStyle} text-green-400 hover:text-white active:text-green-400`}
        >
          <LiaCommentDotsSolid className={iconStyle} />{" "}
          <span className={textStyle}>Comments</span>
        </li>
        {/* view comments */}

        <Link
          to={`${user?.username || "_undefined_username_"}/blogs`}
          className={`${listStyle} text-green-400 hover:text-white active:text-green-400`}
          onClick={() => showMyBlogs()}
        >
          <FaRegCopy className={iconStyle} />{" "}
          <span className={textStyle}>My Blogs</span>
        </Link>

        <Link
          to={`profile/${user?.username || "_undefined_username_"}`}
          className={`${listStyle} text-green-400 hover:text-white active:text-green-400`}
        >
          <FaUserCircle className={iconStyle} />{" "}
          <span className={textStyle}>Profile</span>
        </Link>
        {/* <ProfileModal /> */}
        {/* profile update */}

        <button
          className={`${listStyle} border-2 ${buttonStyle}`}
          onClick={() => logOutUser()}
        >
          <FaSignOutAlt className=" h-7 w-7" />{" "}
          <span className=" text-2xl font-semibold">Sign Out</span>
        </button>
      </ul>
    </div>
  );
};

export default Sidebar;
