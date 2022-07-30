import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { EmptyUser } from "../action";

function Header() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [flagUser, setFlagUser] = useState(false);
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    setProfile(
      localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {}
    );
  }, [user]);

  console.log(profile);
  return (
    <div className="border-b shadow py-2.5">
      <div className="container-main flex justify-between  items-center">
        <div className=" cursor-pointer font-bold hover:text-blue-800 transition-all">
          <Link to="/">Home</Link>
        </div>
        <div>
          <ul className="flex flex-row-reverse items-center">
            <li className="ml-6 font-bold ">
              {Object.keys(profile).length ? (
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
                      <li
                        className="cursor-pointer my-1 hover:text-red-600 transition-all duration-150"
                        onClick={() => {
                          dispatch(EmptyUser());
                          localStorage.removeItem("user");
                          Toast.fire({
                            icon: "success",
                            title: `User loged out`,
                          });
                          navigate("/");
                        }}
                      >
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
