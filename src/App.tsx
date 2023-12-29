import React from "react";
import "./App.css";
import { signIn, logOut } from "./Firebase/Auth";

const App: React.FC = () => {
  return (
    <>
      <h1 className="text-red-900">Hello</h1>

      <button onClick={() => signIn()} className="border border-black p-4">
        Sign IN
      </button>

      <button onClick={() => logOut()} className=" border border-red-600 p-4">
        Logout
      </button>
    </>
  );
};

export default App;
