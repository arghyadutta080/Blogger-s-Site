import React, { useEffect, useState } from "react";
import "./App.css";
import { signIn, logOut, isAuthenticated, auth } from "./firebase/Auth";
import TextEditor from "./components/TextEditor";
import { getUser, updateUser } from "./firebase/Profile";
import { getAllUsers } from "./firebase/SecurityTesting";
import { createBlog } from "./firebase/Blog";

const App: React.FC = () => {
  const signInUser = async () => {
    const userInfo = await signIn();
    console.log("Inside signInUser ", userInfo);
  };

  // Authentication and User Functions

  const checkAuth = async () => {
    const user: any = await isAuthenticated();
    if (user.authState) {
      console.log("user is authenticated");
    } else {
      console.log("inside checkAuth", user.authState);
    }
  };

  const getUserInfo = async () => {
    const user = auth.currentUser;
    if (user !== null) {
      const userInfo = await getUser(user);
      console.log("inside getUserInfo", userInfo);
    } else {
      console.log("user not authenticated");
    }
  };

  const updateUserInfo = async () => {
    const user = auth.currentUser;
    if (user !== null) {
      const userUpdateStatus = await updateUser(user, {
        // all fields will be send with values while dealing with form
        username: "data_dynamo",
        // displayName: "ARGHYA"
      });
      console.log("user updation status ", userUpdateStatus);
    } else {
      console.log("user not authenticated");
    }
  };

  const logOutUser = async () => {
    const authState: any = await logOut();
    console.log("inside logoutUser", authState.authState);
  };


  // Blog Functions

  const defaultBlob = new Blob(["Default Content"], { type: "text/plain" });
  
  const [imgFile, setImageFile] = useState<Blob | Uint8Array | ArrayBuffer >(defaultBlob);

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

  useEffect(() => {
    checkAuth();
    getUserInfo();
    // getAllUsers();
  }, []);

  return (
    <>
      <h1 className="text-red-900">Hello</h1>

      <button onClick={() => signInUser()} className="border border-black p-4">
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
    </>
  );
};

export default App;
