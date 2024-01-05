import React, { useContext } from "react";
import homepage_bg from "../../assets/home_page_bg.png";
import logo from "../../assets/logo-removebg.png";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../firebase/Auth";

const HeroSection: React.FC = () => {
  const context = useContext(AuthContext);
  const user = context.user;
  const isAuthenticated = context.isAuthenticated;
  const checkAuth = context.checkAuth;
  const navigate = useNavigate();

  const navigation = async () => {
    if (isAuthenticated) {
      console.log("inside navigation")
      navigate(`${user.username}/dashboard/posts`);
    } else {
      await signIn();
      await checkAuth(); // globally user is set
    }
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
    </div>
  );
};

export default HeroSection;
