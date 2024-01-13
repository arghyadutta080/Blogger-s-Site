import React from "react";
import "./App.css";
import AuthUserState from "./context/AuthUserState.tsx";
import HomePage from "./pages/HomePage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.tsx";
import { Toaster } from "react-hot-toast";
import BlogPreviewPage from "./pages/BlogPreviewPage.tsx";
import ViewBlog from "./pages/ViewBlog.tsx";

const App: React.FC = () => {
  // Blog Functions

  // const defaultBlob = new Blob(["Default Content"], { type: "text/plain" });

  // const [imgFile, setImageFile] = useState<Blob | Uint8Array | ArrayBuffer>(
  //   defaultBlob
  // );

  // const updateBlog = async () => {
  //   const blogText = "<h1>this is updated blog - 2</h1>";
  //   const blogTitle = "Blog Updation Testing 2";
  //   const previewImg = imgFile;
  //   const updatedInfo = { blogText, blogTitle, previewImg };

  //   const blogUpdationStatus = await updateMyBlog(
  //     "GfV27aEP69nFpHKpu9MdE6LkT",
  //     updatedInfo
  //   );

  //   console.log("Blog updation status", blogUpdationStatus);
  // };

  return (
    <AuthUserState>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/:username/:blogname/preview" element={<BlogPreviewPage />} />
          <Route path="/:bloggername/blog/:blogId" element={<ViewBlog />} />
        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </Router>
    </AuthUserState>
  );
};

export default App;
