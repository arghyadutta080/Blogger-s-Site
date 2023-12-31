import React, { useEffect } from "react";
import "./App.css";
import { signIn, logOut, isAuthenticated, auth } from "./firebase/Auth";
import TextEditor from "./components/TextEditor";
import { getUser, updateUser } from "./firebase/Profile";

const App: React.FC = () => {
  const signInUser = async () => {
    const userInfo = await signIn();
    console.log("Inside signInUser ", userInfo);
  };

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
        username: "gdsc_rcciit",
        displayName: "Google DSC RCCIIT 2023-24"
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

  useEffect(() => {
    checkAuth();
    getUserInfo();
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
    </>
  );
};

export default App;
