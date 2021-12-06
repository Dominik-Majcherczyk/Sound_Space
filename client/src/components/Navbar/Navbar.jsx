import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppBar} from "@material-ui/core";
import { useNavigate, useLocation  } from "react-router-dom";
import logo from "../../images/soundspace-logo.png";
import {ReactComponent as Svg1} from '../../svg/svg1.svg';
import {ReactComponent as Svg2} from '../../svg/svg2.svg';
import {ReactComponent as Svg3} from '../../svg/svg2.svg';
import decode from "jwt-decode"
export default function Navbar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate('/')
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;

    //wylogowanie po upłynięcu czasu tokena (na ten moment 1h)
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar position="static" color="inherit">
      {/* <Typography variant="h2" align="center">
           Songs
        </Typography>
        <div>
                {user ? (
                    <div>
                        <img className="avatar" alt={user.result.name} src={user.result.imageUrl}/>
                        <h5>{user.result.name}</h5>
                        <button onClick={logout}>logout</button>
                    </div>
                ):(
                    <Link to="/auth">Sign IN</Link>
                )}
            </div> */}

      <div>
        <nav className="bg-white dark:bg-gray-800  shadow py-4 ">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between h-16">
              <div className=" flex items-center  ">
                <a className="flex-shrink-0 hidden md:block" href="/">
                  <img className="h-12 w-12" src={logo} alt="Workflow" />
                </a>
                <div className="hidden lg:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a
                      className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                      href="/#"
                    >
                      Home
                    </a>
                    <a
                      className="text-gray-800 dark:text-white  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                      href="/#"
                    >
                      Gallery
                    </a>
                    <a
                      className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                      href="/#"
                    >
                      Content
                    </a>
                    <a
                      className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-md font-medium"
                      href="/#"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center w-80 lg:w-64 h-full group">
                <div className="absolute z-50 flex items-center justify-center block w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">

                   <Svg1/>
                </div>
                    <Svg2/>
                <input
                  type="text"
                  className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded-2xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input"
                  placeholder="Search"
                />
                <div className="absolute right-0 hidden h-auto px-2 py-1 mr-2 text-xs text-gray-400 border border-gray-300 rounded-2xl md:block">
                  +
                </div>
              </div>

              <div className="block">
                <div className="ml-4 flex items-center md:ml-6">
                  <div className="ml-3 relative">
                    <div className="relative inline-block text-left">
                      <div>
                        {user ? (
                          <div>
                            <button
                              type="button"
                              className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                              id="options-menu"
                            >
                              <div className="h-8 w-8">
                                <img
                                  className="rounded-full "
                                  alt={user.result.name}
                                  src={user.result.imageUrl}
                                />
                              </div>
                            </button>
                          </div>
                        ) : (
                          <Link to="/auth">Sign IN</Link>
                        )}
                      </div>

                      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                        <div
                          className="py-1 "
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <a
                            href="#"
                            className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                            role="menuitem"
                          >
                            <span className="flex flex-col">
                              <span>Settings</span>
                            </span>
                          </a>
                          <a
                            href="#"
                            className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                            role="menuitem"
                          >
                            <span className="flex flex-col">
                              <span>Account</span>
                            </span>
                          </a>
                          <a
                            onClick={logout}
                            className="block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                            role="menuitem"
                          >
                            <span className="flex flex-col">
                              <span>Logout</span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex lg:hidden">
                <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                <Svg3/>
                </button>
              </div>
            </div>
          </div>
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/#"
              >
                Home
              </a>
              <a
                className="text-gray-800 dark:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/#"
              >
                Gallery
              </a>
              <a
                className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/#"
              >
                Content
              </a>
              <a
                className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                href="/#"
              >
                Contact
              </a>
            </div>
          </div>
        </nav>
      </div>
    </AppBar>
  );
}
