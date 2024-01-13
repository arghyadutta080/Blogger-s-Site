import { useContext, useState } from "react";
import { FaBars } from "react-icons/fa6";
import logo from "../../assets/logo.png";
import { signIn } from "../../Firebase/Auth.ts";
import { AuthContext } from "../../context/AuthContext.ts";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const context = useContext(AuthContext);
  const user = context.user;
  const isAuthenticated = context.isAuthenticated;
  const checkAuth = context.checkAuth;

  const signInUser = async () => {
    await signIn();
    await checkAuth(); // globally user is set
    // console.log("Inside signInUser ", user);
  };

  return (
    <header
      className={`${
        mobileMenuOpen ? "hidden" : "bg-transparent absolute z-30 w-full"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-8xl items-center justify-between md:p-2 p-3 lg:px-8`}
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            to="/"
            className="-m-1.5 p-1.5 flex flex-row justify-between items-center"
          >
            <span className=" font-bold text-3xl pe-2 text-blue-400">
              Blogger’s World{" "}
            </span>
            <img className="h-8 w-auto rounded-full" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <FaBars className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
          {isAuthenticated ? (
            <div className="flex flex-row items-center space-x-5">
              <img
                src={user.photoURL}
                alt=""
                className=" rounded-full h-12 w-12"
              />
              <span className="text-white font-bold text-xl">
                {user.displayName}
              </span>
            </div>
          ) : (
            <a
              href="#"
              className="text-xl leading-6 border-2 border-white hover:border-blue-400 active:border-white py-2 px-3 rounded-full font-bold text-white hover:text-blue-400 active:text-white shadow-inner shadow-white hover:shadow-blue-400 active:shadow-white"
              onClick={() => signInUser()}
            >
              Log in / Sign up <span aria-hidden="true"></span>
            </a>
          )}
        </div>
      </nav>
      {/* <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="inset-y-0 right-0  overflow-y-auto bg-transparent fixed z-50 w-full px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5 flex flex-row justify-between">
              <span className=" font-bold text-xl pe-2 text-blue-400">
                Blogger’s World{" "}
              </span>
              <img className="h-8 w-auto rounded-full" src={logo} alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6">
                <a
                  href="#"
                  className="text-md leading-6 border-2 py-2 px-3 rounded-full font-bold border-white hover:border-blue-400 active:border-white text-white hover:text-blue-400 active:text-white shadow-inner shadow-white hover:shadow-blue-400 active:shadow-white"
                >
                  Log in / Sign up <span aria-hidden="true"></span>
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog> */}
    </header>
  );
};

export default Navbar;
