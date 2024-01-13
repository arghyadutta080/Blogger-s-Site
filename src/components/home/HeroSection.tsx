import React, { useContext, useState } from "react";
import homepage_bg from "../../assets/home_page_bg.png";
import logo from "../../assets/logo-removebg.png";
import { AuthContext } from "../../context/AuthContext.ts";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../Firebase/Auth.ts";
import Modal from "react-modal";
import google_logo from "../../assets/google-logo.png";

const HeroSection: React.FC = () => {
  const context = useContext(AuthContext);
  const isAuthenticated = context.isAuthenticated;
  const checkAuth = context.checkAuth;
  const navigate = useNavigate();

  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const navigation = async () => {
    if (isAuthenticated) {
      // console.log("inside navigation")
      navigate(`/dashboard/posts`);
    } else {
      openModal();
    }
  };

  const authenticate = async () => {
    closeModal();
    await signIn();
    await checkAuth(); // globally user is set
    navigate(`/dashboard/posts`);
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 md:py-24 sm:py-32 h-screen">
      <img
        src={homepage_bg}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div className="mx-auto mt-20 md:mt-0 max-w-8xl h-full px-6 lg:px-14 flex flex-col md:justify-around md:items-center justify-evenly items-center">
        <div className="mx-auto w-full lg:mx-0 ">
          <div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-blue-400 pb-1">
              Welcome to
            </h2>
            <div className=" flex flex-row items-center">
              <h4 className="text-2xl md:text-5xl font-bold tracking-tight text-blue-400">
                Blogger's World
              </h4>
              <img src={logo} alt="" className=" ms-4 h-12 md:h-20" />
            </div>
          </div>
        </div>

        <div className="md:text-5xl text-2xl font-bold text-center text-green-400 flex flex-col justify-center items-center">
          <span>Write your First Blog</span> <span>in your own way</span>
        </div>

        <button
          className="md:text-3xl text-xl leading-6 w-fit border-2 border-white hover:border-blue-400 active:border-white py-3 px-5 rounded-full font-bold text-white hover:text-blue-400 active:text-white shadow-md shadow-white hover:shadow-blue-400 active:shadow-white"
          onClick={() => navigation()}
        >
          Create Blog <span aria-hidden="true"></span>
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Authentication Modal"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-4 z-50 rounded-2xl w-4/12 h-2/5"
      >
        <h2 className=" text-3xl font-bold text-start text-white flex flex-row justify-start items-center mt-3">
          <span className=" font-bold text-xl pe-2 text-blue-400">
            Blogger’s World{" "}
          </span>
          <img className="h-6 w-auto rounded-full" src={logo} alt="" />
        </h2>
        <h2 className="  flex flex-col justify-center items-center mt-10">
          <span className="text-2xl font-bold text-center text-white">
            Sign In to your account
          </span>{" "}
          <div className=" text-center text-white">
            Not a blogger?{" "}
            <span className="text-blue-400">Start writing now!</span>
          </div>
        </h2>
        <button
          className=" w-full px-5 py-2 rounded-full bg-black flex flex-row items-center justify-center mt-10 space-x-5"
          onClick={() => authenticate()}
        >
          <img src={google_logo} alt="" className=" h-8 w-8" />
          <span className="text-white text-lg font-bold">
            Continue with Google
          </span>
        </button>
      </Modal>
    </div>
  );
};

export default HeroSection;
