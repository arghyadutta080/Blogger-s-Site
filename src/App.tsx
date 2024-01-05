import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { signIn, logOut, auth, AuthState } from "./firebase/Auth";
// import TextEditor from "./components/TextEditor";
import { getUser, updateUser } from "./firebase/Profile";
import {
  createBlog,
  getAllBlogs,
  getBlog,
  getMyBlogs,
  updateMyBlog,
} from "./firebase/Blog";
import { createComment } from "./firebase/Comment";
import AuthUserState from "./context/AuthUserState";
// import { AuthContext } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const App: React.FC = () => {
  // Authentication and User Functions

  const signInUser = async () => {
    const userInfo = await signIn();
    console.log("Inside signInUser ", userInfo);
  };
  

  const getUserInfo = async () => {
    // const user = auth.currentUser;
    // if (user !== null) {
    
    // } else {
    //   console.log("user not authenticated, info not available!");
    // }
  };

  const updateUserInfo = async () => {
    // const user = auth.currentUser;
    // if (user !== null) {
    const userUpdateStatus = await updateUser({
      // all fields will be send with values while dealing with form
      username: "data_dynamo",
      // displayName: "ARGHYA"
      // email field will be frezzed at non editable mode
    });
    console.log("user updation status ", userUpdateStatus);
    // } else {
    //   console.log("user not authenticated");
    // }
  };

  const logOutUser = async () => {
    const authState: any = await logOut();
    console.log("inside logoutUser", authState.authState);
  };

  // Blog Functions

  const defaultBlob = new Blob(["Default Content"], { type: "text/plain" });

  const [imgFile, setImageFile] = useState<Blob | Uint8Array | ArrayBuffer>(
    defaultBlob
  );

  const getImgFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetFiles = event.target.files;
    if (
      targetFiles &&
      (targetFiles[0].type == "image/jpeg" ||
        targetFiles[0].type == "image/png")
    ) {
      setImageFile(targetFiles[0]);
    }
  };

  const createNewBlog = async () => {
    const user = auth.currentUser;
    if (user != null) {
      const blogTitle = "Exploring the Enchanting World of Nature";
      const blogText = `<h2><strong style="color: var(--tw-prose-bold);">Exploring the Enchanting World of Nature</strong></h2><h3>In the hustle and bustle of our daily lives, it's easy to forget the beauty that surrounds us. Take a moment to step outside and immerse yourself in the wonders of nature. 🌳🌺</h3><p><br></p><h3><strong style="color: var(--tw-prose-bold);">Nature's Symphony:</strong></h3><ul><li>Close your eyes, and you'll hear the symphony of birdsong, the rustling of leaves, and the gentle hum of insects. It's a melody that has been playing for centuries, and each note is a testament to the harmony of the natural world.</li></ul><p><br></p><h3><strong style="color: var(--tw-prose-bold);">A Breath of Fresh Air:</strong></h3><ul><li>Inhale deeply, and feel the crispness of the air. Nature provides a breath of fresh air, cleansing both our lungs and our minds. There's something magical about the way a forest breeze carries away the worries that lingered.</li></ul><p><br></p>`;

      const blogCreationStatus = await createBlog(
        {
          blogTitle,
          blogText,
        },
        imgFile,
        user
      );

      console.log("new Blog Creation Status", blogCreationStatus);
    }
  };

  const updateBlog = async () => {
    const blogText = "<h1>this is updated blog - 2</h1>";
    const blogTitle = "Blog Updation Testing 2";
    const previewImg = imgFile;
    const updatedInfo = { blogText, blogTitle, previewImg };

    const blogUpdationStatus = await updateMyBlog(
      "GfV27aEP69nFpHKpu9MdE6LkT",
      updatedInfo
    );

    console.log("Blog updation status", blogUpdationStatus);
  };

  const getBlogs = async () => {
    const blogs = await getAllBlogs();
    console.log("All blogs", blogs);
  };

  const showBlog = async () => {
    const blog = await getBlog("GfV27aEP69nFpHKpu9M6LkT");
    console.log("Get a blog", blog);
  };

  const showMyBlogs = async () => {
    const user = auth.currentUser;
    if (user != null) {
      const blogs = await getMyBlogs(user.uid);
      console.log("My blogs", blogs);
    }
  };

  // comment functions

  const createNewComment = async () => {
    const user = auth.currentUser;

    if (user != null) {
      const commentText = "Testing Comment 2";
      const blogId = "5K2rRi9yjKMmxH468q45tf81M";
      const comment = { commentText, blogId };

      const commentCreationStatus = await createComment(comment, user);

      console.log("comment creation status ", commentCreationStatus);
    }
  };

  useEffect(() => {
    // checkAuth();
    // getUserInfo();
    showMyBlogs();
    getBlogs();  
    // showBlog();
    // getAllUsers();
  }, []);


  return (
    <AuthUserState>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/:username/blogs" element={} /> */}
          {/* <Route path="/:username/:blogId" element={} /> */}
          {/* <Route path="/blogs" element={} /> */}
          <Route path="/dashboard" element={<Dashboard/>} />

          {/* <Route exact path="/event" element={<EventPage />} />
          <Route exact path="/notice" element={<NoticePage />} />
          <Route exact path="/team" element={<TeamPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          {/* routing ProfilePage components 
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} /> */}
        </Routes>
      </Router>

      {/* <h1 className="text-red-900">Hello</h1>

        <button
          onClick={() => signInUser()}
          className="border border-black p-4"
        >
          Sign IN
        </button>

        <button
          onClick={() => logOutUser()}
          className=" border border-red-600 p-4"
        >
          Logout
        </button>

        <button
          onClick={() => updateUserInfo()}
          className=" border border-red-600 p-4"
        >
          Update
        </button>

        <TextEditor />

        <input
          type="file"
          onChange={(event) => getImgFile(event)}
          alt=""
          placeholder="Submit image"
          className=" border-blue-500"
        />

        <button
          onClick={() => createNewBlog()}
          className=" border border-red-600 p-4 m-4"
        >
          Create Blog
        </button>

        <button
          onClick={() => updateBlog()}
          className=" border border-red-600 p-4 m-4"
        >
          Update Blog
        </button>

        <button
          onClick={() => createNewComment()}
          className=" border border-red-600 p-4 m-4"
        >
          Add comment
        </button> */}
    </AuthUserState>
  );
};

export default App;
