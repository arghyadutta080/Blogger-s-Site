import React, { useContext, useEffect, useState } from "react";
import TextEditor from "./TextEditor.tsx";
import { createBlog } from "../../../Firebase/Blog.ts";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext.ts";
import ReactLoading from "react-loading";
import { FaCircleUser } from "react-icons/fa6";

const NewBlog: React.FC = () => {
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [htmlText, setHtmlText] = useState<string>("");

  const [onLoading, setOnLoading] = useState<boolean>(false);

  const context = useContext(AuthContext);
  const user = context.user;
  const isAuthenticated = context.isAuthenticated;

  //   sending data to blog-preview page

  const navigate = useNavigate();
  const previewNavigation = () => {
    navigate(
      `/${user?.username}/${
        blogTitle || "_title_not_defined_"
      }/preview?data=${encodeURIComponent(htmlText)}`
    );
  };

  //   receiving data from blog-preview page

  const location = useLocation();

  useEffect(() => {
    if (user && user.username == "") {
      // checking username is set or not
      navigate(`/dashboard/profile/_undefined_username_`);
      toast.error("Setup your @username first!");
    }
    const queryParams = new URLSearchParams(location.search); // query portion( "...?data=${encodeURIComponent(<-- sent data -->)}" ) is fetching from route-URL(navigated route)
    const data = queryParams.get("data"); // fetching required data from "data" parameter of the query
    setHtmlText(data || "");
  }, [location.search]);

  //   Creating img Blob file and sending to backend to upload in firebase storage

  const defaultBlob = new Blob(["Default Content"], { type: "text/plain" });

  const [imgFile, setImageFile] = useState<
    Blob | Uint8Array | ArrayBuffer | any
  >(defaultBlob);

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
    setOnLoading(true);
    const blogCreationStatus = await createBlog(
      {
        blogTitle,
        blogText: htmlText,
      },
      imgFile // a blob file received from getImgFile()
    );

    if (blogCreationStatus) {
      toast.success("Blog is successfully Created!");
    } else {
      toast.error("Blog creation failed!");
    }
    setOnLoading(false);
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="w-10/12 h-screen z-10 mt-16 ">
          <div className="border-t-2 h-full border-l-2 flex flex-col items-center space-y-5 pt-5 pb-8">
            <input
              type="text"
              placeholder="Your Blog Title"
              className="w-8/12 text-xl px-3 py-1 rounded-md text-center"
              value={blogTitle}
              onChange={(event) => setBlogTitle(event.target.value)}
            />
            <div className="bg-white w-8/12 h-[37.6rem]">
              <TextEditor htmlText={htmlText} setHtmlText={setHtmlText} />
            </div>
            <div className=" flex flex-row justify-between items-center w-8/12">
              <div className="bg-white rounded-md">
                <label
                  htmlFor="preview"
                  className="text-xl px-10 py-3 text-gray-500"
                >
                  {" "}
                  Preview Image
                </label>
                <input
                  type="file"
                  id="preview"
                  onChange={(event) => getImgFile(event)}
                  alt=""
                  placeholder="Submit image"
                  className=" border-blue-500 bg-white w-56 px-1 py-1 rounded-md"
                />
              </div>
              <button
                className=" px-3 py-1 text-2xl text-white font-bold border-2 border-blue-400 rounded-2xl hover:border-white hover:bg-white hover:text-blue-600 active:border-blue-400 active:border-4"
                onClick={() => previewNavigation()}
              >
                Preview Blog
              </button>
              {onLoading ? (
                <div className=" px-12 py-1 border-2 border-blue-400 rounded-2xl">
                  <ReactLoading
                    type={"spin"}
                    color={"#29A3FC"}
                    height={30}
                    width={30}
                  />
                </div>
              ) : (
                <button
                  disabled={
                    imgFile?.type == defaultBlob.type ||
                    blogTitle == "" ||
                    htmlText == "" ||
                    htmlText == "<p><br></p>"
                      ? true
                      : false
                  }
                  onClick={() => createNewBlog()}
                  className={`${
                    imgFile?.type == defaultBlob.type ||
                    blogTitle == "" ||
                    htmlText == "" ||
                    htmlText == "<p><br></p>"
                      ? "cursor-not-allowed"
                      : ""
                  } px-3 py-1 text-2xl text-white font-bold border-2 border-blue-400 rounded-2xl hover:border-white hover:bg-white hover:text-blue-600 ${
                    imgFile?.type != defaultBlob.type &&
                    blogTitle != "" &&
                    htmlText != ""
                      ? "active:border-blue-400 active:border-4"
                      : ""
                  }`}
                >
                  Save Blog
                </button>
              )}
            </div>
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

export default NewBlog;
