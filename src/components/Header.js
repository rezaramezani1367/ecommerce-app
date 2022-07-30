import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );
  const [flagUser, setFlagUser] = useState(false);

  console.log(user);
  return (
    <div className="border-b shadow py-2.5">
      <div className="container-main flex justify-between  items-center">
        <div className=" cursor-pointer font-bold hover:text-blue-800 transition-all">
          <Link to="/">Home</Link>
        </div>
        <div>
          <ul className="flex flex-row-reverse items-center">
            <li className="ml-6 font-bold ">
              {Object.keys(user).length ? (
                <div className="relative">
                  <div
                    className="cursor-pointer btn-user"
                    onClick={() => {
                      setFlagUser(!flagUser);
                    }}
                  >
                    <FaUser />
                  </div>
                  {flagUser && (
                    <ul className="absolute top-6 right-0 z-50 border border-slate-300 shadow-lg opacity-95 bg-white py-2 pl-2 pr-6 rounded-md">
                      <li className="cursor-pointer my-1 hover:text-red-600 transition-all duration-150">
                      <Link to="/setting">Setting</Link>
                      </li>
                      <li className="cursor-pointer my-1 hover:text-red-600 transition-all duration-150">
                        Orders
                      </li>
                      <li className="cursor-pointer my-1 hover:text-red-600 transition-all duration-150">
                        Logout
                      </li>
                    </ul>
                  )}
                </div>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>

            <li className="font-bold cursor-pointer">
              <FaShoppingCart />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
