import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import NoticeModal from './NoticeModal/NoticeModal';



function Header({ user }) {
  const [showModal, setShowModal] = useState(false);
  const notifications = ["Notification 1", "Notification 2", "Notification 3", "Notification 4", "Notification 5", "Notification 6", "Notification 7", "Notification 8", "Notification 9", "Notification 10", "Notification 11", "Notification 12", "Notification 13", "Notification 14", "Notification 15", "Notification 16", "Notification 17", "Notification 18", "Notification 19", "Notification 20"];
  

  

  function logout() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }


  return (
    <header className=" block h-20 top-0 z-50">
      <div className="absolute bg-gray-800 inset-x-0 z-50">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 md:px-8 lg:px-8"
          aria-label="Global"
        >
          <div className="flex flex-row gap-9 items-center">
            <div className="flex md:flex-1 lg:flex-1">
              <a href="/" className="-m-1.5 p-1.5">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </div>

            <div className="flex gap-x-12">
              <Link
                to="/about"
                className="font-semibold leading-6 text-gray-300"
              >
                About
              </Link>
              <Link
                to="/"
                className="font-semibold leading-6 text-gray-300"
              >
                HomePage
              </Link>
              {/*<Link
                to="/login"
                className=" font-semibold leading-6 text-gray-300"
              >
                Login
  </Link>*/}
              <Link
                to="/mypage"
                className=" font-semibold leading-6 text-gray-300"
              >
                MyPage
              </Link>
            </div>
          </div>
          
            <div className="flex flex-1 justify-end gap-7 items-center">
            <FaBell
              className="text-gray-300 cursor-pointer"
              size={20}
              onClick={() => setShowModal(true)}
            />
            {user ? (
              <>
                <Link
                  to="/mypage"
                  className="font-semibold leading-6 text-gray-300"
                >
                  {user.username || "사용자명"}
                </Link>
                <Link
                  className="font-semibold leading-6 text-gray-300 border border-gray-300 rounded-md px-2 py-1 cursor-pointer"
                  onClick={() => logout()}
                >
                  Logout
                </Link>
                
                
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-semibold leading-6 text-gray-300"
                >
                  Sign in
                </Link>

                <Link
                  to="/signup"
                  className="font-semibold leading-6 text-gray-300 border border-gray-300 rounded-md px-2 py-1"
                >
                  Sign up
                </Link>
              </>
            )}
          </div> 
        </nav>
      </div>
      {showModal && (
        <NoticeModal
          notifications={notifications}
          onClose={() => setShowModal(false)}
        />
      )}
    </header>
  );
}

export default Header;