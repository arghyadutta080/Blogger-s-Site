import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Blog } from "./dashboard/blog/BlogList";
import { getMyBlogs } from "../firebase/Blog";
import { updateUser } from "../firebase/Profile";
import toast from "react-hot-toast";
import { Comment } from "./dashboard/comment/CommentList";
import { getMyComments } from "../firebase/Comment";


const Profile: React.FC = () => {
  const context = useContext(AuthContext);
  const user = context.user;
  const setUser = context.setUser;
  const isAuthenticated = context.isAuthenticated;

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [comments, setComments] = useState<Comment[]>([])

  const [editMode, setEditMode] = useState(false);

  const [field, setField] = useState<string>("");
  const [username, setUsername] = useState<string>("");


  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
      authState: user.authState
    })

    if (userUpdateStatus) {
      toast.success("Your profile is successfully updated");
    } else {
      toast.error("Profile updation is failed!");
    }
  };

  const getBlogs = async () => {
    const Blogs: Blog[] | any = await getMyBlogs();
    setBlogs(Blogs);
  };

  const getComments =async () => {
    const Comments: Comment[] | any = await getMyComments();
    setComments(Comments);
  }

 
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
              Personal details and application.
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
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 text-2xl text-white font-bold border-2 border-blue-400 rounded-2xl hover:border-white hover:bg-white hover:text-blue-600 active:border-blue-400 active:border-4"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="w-10/12 h-screen z-10 mt-16 border-t-2 border-l-2 flex items-center justify-center text-3xl font-extrabold text-white">
          <h3>Login First!</h3>
        </div>
      )}
    </>
  );
};

export default Profile;
