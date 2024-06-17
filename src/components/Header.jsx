import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import NoticeModal from "./NoticeModal/NoticeModal";
import pic1 from "../assets/햇반.jpg";
import pic2 from "../assets/카레.jpg";
import pic3 from "../assets/된찌.jpg";
import pic4 from "../assets/마라탕.jpg";
import pic5 from "../assets/탕후루.jpg";
function Header({ user }) {
  const [showModal, setShowModal] = useState(false);
  
  const data = [
    {
      food_id: 1,
      food_name: "햇반",
      food_pic: pic1,
      category: "밥",
      food_amount: 1,
      purchase_date: "2024-02-19T15:00:00.000Z",
      expiration_date: "2024-12-11T15:00:00.000Z",
      user_id: 4,
    },
    {
      food_id: 2,
      food_name: "카레이름",
      food_pic: pic2,
      category: "카테카테",
      food_amount: 2,
      purchase_date: "2024-04-09T15:00:00.000Z",
      expiration_date: "2024-05-17T15:00:00.000Z",
      user_id: 4,
    },
    {
      food_id: 3,
      food_name: "육회비빔밥",
      food_pic: "",
      category: "밥",
      food_amount: 1,
      purchase_date: "2024-05-17T15:00:00.000Z",
      expiration_date: "2024-05-22T15:00:00.000Z",
      user_id: 4,
    },
    {
      food_id: 4,
      food_name: "된장찌개",
      food_pic: pic3,
      category: "국",
      food_amount: 1,
      purchase_date: "2024-05-19T15:00:00.000Z",
      expiration_date: "2024-06-20T15:00:00.000Z",
      user_id: 4,
    },
    {
      food_id: 5,
      food_name: "마라탕",
      food_pic: pic4,
      category: "탕",
      food_amount: 1,
      purchase_date: "2024-05-15T15:00:00.000Z",
      expiration_date: "2024-06-01T15:00:00.000Z",
      user_id: 4,
    },
    {
      food_id: 6,
      food_name: "탕후루",
      food_pic: pic5,
      category: "간식",
      food_amount: 4,
      purchase_date: "2024-05-16T15:00:00.000Z",
      expiration_date: "2024-05-25T15:00:00.000Z",
      user_id: 4,
    },
  ];
  const notifications = [
    { food_name: "카레 이름", expiration_date: "2024-05-17" },
    { food_name: "육회 비빔밥", expiration_date: "2024-05-22" },
    { food_name: "된장찌개", expiration_date: "2024-06-20" },
    { food_name: "마라탕", expiration_date: "2024-06-01" },
    { food_name: "탕후루", expiration_date: "2024-05-25" },
  ];

  function logout() {
    sessionStorage.removeItem("user");
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
              <Link to="/" className="font-semibold leading-6 text-gray-300">
                나의 냉장고
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
                마이페이지
              </Link>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-7 items-center">
            <div className="relative cursor-pointer" onClick={() => setShowModal(true)}>
              <FaBell className="text-gray-300" size={24} />
              {notifications.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center h-5 w-5 text-xs font-bold leading-none text-white bg-red-600 rounded-full transform translate-x-2/3 -translate-y-2/3">
                  {notifications.length}
                </span>
              )}
            </div>
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
