import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.ts";
import { Blog } from "./dashboard/blog/BlogList.tsx";
import { getMyBlogs } from "../Firebase/Blog.ts";
import { updateUser } from "../Firebase/Profile.ts";
import toast from "react-hot-toast";
import { Comment } from "./dashboard/comment/CommentList.tsx";
import { getMyComments } from "../Firebase/Comment.ts";
import { FaCircleUser } from "react-icons/fa6";
import ReactLoading from "react-loading";

const Profile: React.FC = () => {
  const context = useContext(AuthContext);
  const user = context.user;
  const setUser = context.setUser;
  const isAuthenticated = context.isAuthenticated;

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const [editMode, setEditMode] = useState(false);

  const [field, setField] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const [onLoading, setOnLoading] = useState<boolean>(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setOnLoading(true);

    const userUpdateStatus = await updateUser({
      username: username,
      field: field,
    });

    setUser({
      userId: user.userId,
      photoURL: user.photoURL,
      field: field,
      username: username,
      email: user.email,
      displayName: user.displayName,
      authState: user.authState,
    });

    if (userUpdateStatus) {
      toast.success("Your profile is successfully updated");
    } else {
      toast.error("Profile updation is failed!");
    }

    setEditMode(false);
    setOnLoading(false);
  };

  const getBlogs = async () => {
    const Blogs: Blog[] | any = await getMyBlogs();
    setBlogs(Blogs);
  };

  const getComments = async () => {
    const Comments: Comment[] | any = await getMyComments();
    setComments(Comments);
  };

  useEffect(() => {
    setField(user?.field);
    setUsername(user?.username);
    getBlogs();
    getComments();
    console.log(user);
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div className="w-10/12 h-screen z-10 mt-16 border-t-2 border-l-2">
          <div className=" mt-6 px-10">
            <h3 className="text-2xl font-semibold leading-7 text-white">
              Your profile
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-white">
              Personal and Blogging details ...
            </p>
          </div>
          <div className="mt-10 px-10 flex flex-row justify-evenly">
            <div className="flex justify-center items-start py-6">
              <img
                src={user?.photoURL}
                alt="_profile_photo_"
                className=" h-36 w-36 border rounded-full"
              />
            </div>
            <form className=" " onSubmit={(event) => submitHandler(event)}>
              <div className=" divide-y-2 divide-blue-500">
                <div className="pl-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-lg font-medium leading-6 text-white">
                    Full name
                  </dt>
                  <dd
                    className={`mt-1 ${
                      editMode ? "" : "pl-10"
                    } text-lg leading-6 text-white sm:col-span-2 sm:mt-0`}
                  >
                    {user.displayName}
                  </dd>
                </div>
                <div className="pl-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-lg font-medium leading-6 text-white">
                    Username
                  </dt>
                  {editMode ? (
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="px-2 py-1 rounded-sm bg-slate-700 text-white"
                      required
                    />
                  ) : (
                    <dd
                      className="mt-1 pl-10 text-lg leading-6 text-white sm:col-span-2 sm:mt-0"
                      onClick={() => setEditMode(true)}
                    >
                      {username}
                    </dd>
                  )}
                </div>
                <div className="pl-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-lg font-medium leading-6 text-white">
                    Email address
                  </dt>
                  <dd
                    className={`mt-1 ${
                      editMode ? "" : "pl-10"
                    } text-lg leading-6 text-white sm:col-span-2 sm:mt-0`}
                  >
                    {user?.email}
                  </dd>
                </div>
                <div className="pl-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-lg font-medium leading-6 text-white">
                    Field
                  </dt>
                  {editMode ? (
                    <input
                      type="text"
                      value={field}
                      onChange={(e) => setField(e.target.value)}
                      className="px-2 py-1 rounded-sm bg-slate-700 text-white"
                      required
                    />
                  ) : (
                    <dd
                      className="mt-1 pl-10 text-lg leading-6 text-white sm:col-span-2 sm:mt-0"
                      onClick={() => setEditMode(true)}
                    >
                      {field}
                    </dd>
                  )}
                </div>
                <div className="pl-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-lg font-medium leading-6 text-white">
                    Total Blogs
                  </dt>
                  <dd
                    className={`mt-1 ${
                      editMode ? "" : "pl-10"
                    } text-lg leading-6 text-white sm:col-span-2 sm:mt-0`}
                  >
                    {blogs.length}
                  </dd>
                </div>
                <div className="pl-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-lg font-medium leading-6 text-white">
                    Total Comments
                  </dt>
                  <dd
                    className={`mt-1 ${
                      editMode ? "" : "pl-10"
                    } text-lg leading-6 text-white sm:col-span-2 sm:mt-0`}
                  >
                    {comments.length}
                  </dd>
                </div>
              </div>

              <div className="mt-6 flex flex-row justify-evenly">
                <button
                  className="px-3 py-1 text-2xl text-white font-bold border-2 border-blue-400 rounded-2xl hover:border-white hover:bg-white hover:text-blue-600 active:border-blue-400 active:border-4"
                  onClick={() => setEditMode(!editMode)}
                >
                  Edit
                </button>
                {onLoading ? (
                  <div className=" px-6 py-1 border-2 border-blue-400 rounded-2xl">
                    <ReactLoading
                      type={"spin"}
                      color={"#29A3FC"}
                      height={30}
                      width={30}
                    />
                  </div>
                ) : (
                  <button
                    className="px-3 py-1 text-2xl text-white font-bold border-2 border-blue-400 rounded-2xl hover:border-white hover:bg-white hover:text-blue-600 active:border-blue-400 active:border-4"
                    type="submit"
                  >
                    Save
                  </button>
                )}
              </div>
            </form>
          </div>
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

export default Profile;
