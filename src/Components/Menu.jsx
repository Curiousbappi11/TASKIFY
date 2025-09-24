import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { MenuToggle } from "../features/uiSlice";
import { auth, googleProvider } from "../firebase/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

function Menu() {
  const navigate = useNavigate();
  const isMenuToggle = useSelector((state) => state.ui.isMenuToggle);
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleMenuClick = () => {
    dispatch(MenuToggle());
  };

  return (
    <>
      {/* menu container */}
      <div
        className={`px-4 ${isMenuToggle ? "translate-x-0" : "-translate-x-full"
          } absolute transition-transform duration-300 flex flex-col items-center gap-4 w-56 h-full py-10`}
      >
        {/* button wrapper */}
        <div className="w-full flex justify-end">
          {/* back */}
          <button
            className="group border rounded-full hover:bg-[#bbb] hover:border-[#bbb] p-3.5"
            onClick={handleMenuClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="size-4 group-hover:scale-170 group-hover:stroke-1 group-hover:-translate-x-0.5 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>

        {/* profile */}
        <div className="w-full flex flex-col  gap-5">
          {user ? (
            <>
              {/* Google user photo */}
              <img
                src={user.photoURL}
                alt="avatar"
                className="rounded-full shadow-md size-24"
              />

              {/* Google user name */}
              <p className="whitespace-pre-line text-4xl font-extrabold">
                {user.displayName.split(" ").join("\n")}
              </p>

            </>
          ) : (
            <>
              {/* fallback dummy profile */}
              <div className="rounded-full bg-[#444] grid place-content-center size-24">
                <p className="text-7xl font-black text-[#d3d3d3] ">A</p>
              </div>
              <p className="text-2xl font-extrabold">Guest User</p>
            </>
          )}
        </div>

        {/* menu links */}
        <div
          className="
        [&>button]:transition-transform 
        [&>button:hover]:translate-x-2 
        [&>button]:duration-300 
        [&>button]:cursor-pointer 
        text-[#111] 
        pt-4 pl-2 w-full flex flex-col gap-3 font-light"
        >
          <button
            className="flex gap-4"
            onClick={() => (navigate("/"), handleMenuClick())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <p>HOME</p>
          </button>

          <button
            className="flex gap-4"
            onClick={() => (navigate("/tasks"), handleMenuClick())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
              />
            </svg>
            <p>TASKS</p>
          </button>

          <button
            className="flex gap-4"
            onClick={() => (navigate("/notes"), handleMenuClick())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
            <p>NOTES</p>
          </button>

          <button
            className="flex gap-4"
            onClick={() => (navigate("/reminders"), handleMenuClick())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
              />
            </svg>
            <p>REMINDER</p>
          </button>

          <button
            className="flex gap-4"
            onClick={() => (navigate("/pomodoro"), handleMenuClick())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <p>POMODORO</p>
          </button>

          <button
            className="flex gap-4"
            onClick={() => (navigate("/calendar"), handleMenuClick())}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            <p>CALENDAR</p>
          </button>
        </div>

        <div className="mt-auto pt-6 border-t w-full flex justify-center">
          {user ? (
            <button
            onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition"
            >
              Logout
            </button>
          ) : (
            <button
            onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition"
            >
              Sign in
            </button>
          )}
        </div>



      </div>
    </>
  );
}

export default Menu;
