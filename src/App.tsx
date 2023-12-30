import React, { useEffect } from "react";
import "./App.css";
import { signIn, logOut, isAuthenticated } from "./firebase/Auth";
import TextEditor from "./components/TextEditor";


const App: React.FC = () => {

  const signInUser = async () => {
    const userInfo = await signIn()
    console.log("Inside signInUser ", userInfo);
  }

  const checkAuth = async () => {
    const authState: any = await isAuthenticated();
    if (authState.authState) {
      console.log("user is authenticated")  
    } else {
      console.log("inside checkAuth", authState.authState);
    } 
  };

  const logOutUser = async () => {
    const authState: any = await logOut();
    console.log("inside logoutUser", authState.authState);
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <h1 className="text-red-900">Hello</h1>

      <button onClick={() => signInUser()} className="border border-black p-4">
        Sign IN
      </button>

      <button onClick={() => logOutUser()} className=" border border-red-600 p-4">
        Logout
      </button>

      <TextEditor/>
    </>
  );
};

export default App;
