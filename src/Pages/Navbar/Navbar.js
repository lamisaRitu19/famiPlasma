import React, { useContext, useState } from "react";
import hearts from "../../assets/icons/hearts.svg";
import userImg from "../../assets/icons/user.svg";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import InvitePopup from "../../components/Popups/InvitePopup";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const handleLogout = async () => {
    try {
      await signOutUser().then(async (userCredential) => {
        Swal.fire({
          position: "bottom-end",
          width: 400,
          icon: "success",
          title: "Successfully logged out!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("logged out", userCredential);
      });
    } catch (error) {
      console.error("SignOut user error", error);
    }
  };

  return (
    <div className="pb-16">
      <div className="navbar fixed top-0 z-50 bg-navRed text-white px-6 sm:px-36">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <div className="dropdown-content mt-3 z-[1] p-2 shadow bg-borderDark rounded-box w-96">
              <div
                tabIndex={0}
                className="menu menu-sm text-dark text-lg font-semibold"
              >
                <div className="my-2">
                  <NavLink
                    to="/"
                    className="block"
                    style={({ isActive }) => ({
                      borderBottom: isActive ? "1px solid #ef5552" : "none",
                      paddingBottom: isActive ? "2px" : "0",
                    })}
                  >
                    Home
                  </NavLink>
                </div>
                <span className="my-2">
                  <NavLink
                    to="/members"
                    className="block"
                    style={({ isActive }) => ({
                      borderBottom: isActive ? "1px solid #ef5552" : "none",
                      paddingBottom: isActive ? "2px" : "0",
                    })}
                  >
                    Members
                  </NavLink>
                </span>
                <span className="my-2">
                  <NavLink
                    to="/messages"
                    className="block"
                    style={({ isActive }) => ({
                      borderBottom: isActive ? "1px solid #ef5552" : "none",
                      paddingBottom: isActive ? "2px" : "0",
                    })}
                  >
                    Messages
                  </NavLink>
                </span>
                <span className="my-2">
                  <NavLink
                    to="/profile"
                    className="block"
                    style={({ isActive }) => ({
                      borderBottom: isActive ? "1px solid #ef5552" : "none",
                      paddingBottom: isActive ? "2px" : "0",
                    })}
                  >
                    Profile
                  </NavLink>
                </span>
              </div>
              <div className=" my-5">
                {user ? (
                  <>
                    <button
                      onClick={() => setShowInviteModal(true)}
                      className="btn bg-white text-navRed font-bold border-0 mr-3"
                    >
                      Invite
                    </button>
                    <button
                      onClick={handleLogout}
                      className="bg-navRed rounded-md px-4 py-3"
                    >
                      <span>Log Out</span>
                      <img
                        src={userImg}
                        alt="userImg"
                        className="inline ml-1"
                      />
                    </button>
                  </>
                ) : (
                  <Link to="/login" className="bg-navRed rounded-md px-4 py-2">
                    <span>Log In</span>
                    <img src={userImg} alt="userImg" className="inline ml-1" />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <a className="text-xl font-bold ml-1 lg:ml-0">
            <img src={hearts} alt="hearts" className="inline" /> FamiPlasma
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <div className="text-lg font-semibold px-1">
            <span className="mx-3">
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  borderBottom: isActive ? "1px solid white" : "none",
                  paddingBottom: isActive ? "4px" : "0",
                })}
              >
                Home
              </NavLink>
            </span>
            <span className="mx-3">
              <NavLink
                to="/members"
                style={({ isActive }) => ({
                  borderBottom: isActive ? "1px solid white" : "none",
                  paddingBottom: isActive ? "4px" : "0",
                })}
              >
                Members
              </NavLink>
            </span>
            <span className="mx-3">
              <NavLink
                to="/messages"
                style={({ isActive }) => ({
                  borderBottom: isActive ? "1px solid white" : "none",
                  paddingBottom: isActive ? "4px" : "0",
                })}
              >
                Messages
              </NavLink>
            </span>
            <span className="mx-3">
              <NavLink
                to="/profile"
                style={({ isActive }) => ({
                  borderBottom: isActive ? "1px solid white" : "none",
                  paddingBottom: isActive ? "4px" : "0",
                })}
              >
                Profile
              </NavLink>
            </span>
          </div>
        </div>
        <div className="navbar-end gap-2 2xl:gap-5 hidden lg:flex">
          {user ? (
            <>
              <button
                onClick={() => setShowInviteModal(true)}
                className="btn bg-white text-navRed font-bold border-0"
              >
                Invite
              </button>
              <p className="text-lg font-semibold">
                {user?.name?.split(" ")[0]}
              </p>
              <button
                onClick={handleLogout}
                className="border border-white rounded-md px-4 py-2"
              >
                <span>Log Out</span>
                <img src={userImg} alt="userImg" className="inline ml-1" />
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="border border-white rounded-md px-4 py-2"
            >
              <span>Log In</span>
              <img src={userImg} alt="userImg" className="inline ml-1" />
            </Link>
          )}
        </div>
      </div>
      <InvitePopup
        onClose={() => setShowInviteModal(false)}
        visible={showInviteModal}
      ></InvitePopup>
    </div>
  );
};

export default Navbar;
