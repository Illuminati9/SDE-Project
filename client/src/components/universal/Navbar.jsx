import React, { useEffect, useState } from "react";
import OneTapLogo from "../../assets/logo/onetap_logo_white.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/operations/authAPI";
import { ACCOUNT_TYPE } from "../../utils/constants";

function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  console.log(user)
  
  const handleLogout = () => {
    dispatch(logout(Navigate));
    Navigate("/");
  };

  return (
    <div className="h-[9vh]">
      <div className="bg-white dark:bg-[#471AA0] fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={OneTapLogo} className="h-8" alt="OneTap Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              OneTap
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {!token ? (
              <button
                type="button"
                onClick={() => Navigate("/auth")}
                className="text-[#471AA0] bg-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800"
              >
                Get started
              </button>
            ) : (
              <>
                {
                  (user.accountType === ACCOUNT_TYPE.PROVIDER && (
                    <button
                      type="button"
                      onClick={() => Navigate("/create-provider")}
                      className="text-[#471AA0] bg-white hover:bg-gray-50 mr-1 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800"
                    >
                      Create Provider
                    </button>
                  ))
                }
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-[#471AA0] bg-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800"
                >
                  Logout
                </button>
              </>
            )}
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#471AA0] rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-blue-800 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
              navbarOpen ? "" : "hidden"
            } `}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-[#471AA0] md:dark:bg-[#471AA0] dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to={"/services"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to={"/login"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent  md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
