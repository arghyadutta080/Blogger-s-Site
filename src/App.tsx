import React, { useState } from "react";
import "./App.css";
import { auth } from "./firebase/Auth";
import { getBlog, updateMyBlog } from "./firebase/Blog";
import { createComment } from "./firebase/Comment";
import AuthUserState from "./context/AuthUserState";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import BlogPreviewPage from "./pages/BlogPreviewPage";
import ViewBlog from "./pages/ViewBlog";

const App: React.FC = () => {
  // Blog Functions

  const defaultBlob = new Blob(["Default Content"], { type: "text/plain" });

  const [imgFile, setImageFile] = useState<Blob | Uint8Array | ArrayBuffer>(
    defaultBlob
  );

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

  const showBlog = async () => {
    const blog = await getBlog("GfV27aEP69nFpHKpu9M6LkT");
    console.log("Get a blog", blog);
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

  return (
    <AuthUserState>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route
            path="/:username/:blogname/preview"
            element={<BlogPreviewPage />}
          />
          <Route
            path="/:username/blog/:blogId"
            element={<ViewBlog />}
          />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
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
