import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { exitUser } from "../action";

function Header() {
  const { user:{user},cart:{data}} = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [flagUser, setFlagUser] = useState(false);
  const [countCart, setCountCart] = useState(0)
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
    let totalCount=0;
    console.log(data)
    data.forEach(({count})=>{
      totalCount +=count;
    })
  //  console.log(data)
   setCountCart(totalCount);
  }, [data])
  

  useEffect(() => {
    console.log(user)
    setProfile(
      localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {}
    );
  }, [user]);

  return (
    <div className="border-b shadow py-2.5">
      <div className="container-main flex justify-between text-xl  items-center">
        <div className=" cursor-pointer font-bold hover:text-blue-800 transition-all">
          <Link to="/">Home</Link>
        </div>
        <div>
          <ul className="flex flex-row-reverse items-center gap-12">
            <li className="font-bold ">
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
                    <ul className="absolute top-6 right-0 z-50 border border-slate-300 shadow-lg text-sm opacity-95 bg-white py-2 pl-2 pr-6 rounded-md">
                      <li className="cursor-pointer my-1 hover:text-red-600 transition-all duration-150">
                        <Link to="/setting">Setting</Link>
                      </li>
                      <li className="cursor-pointer my-1 hover:text-red-600 transition-all duration-150">
                        <Link to="/orders">Orders</Link>
                      </li>
                      <li
                        className="cursor-pointer my-1 hover:text-red-600 transition-all duration-150"
                        onClick={() => {
                          dispatch(exitUser());
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

            <li
              className="font-bold cursor-pointer relative"
              onClick={() => {
                navigate("/cart");
              }}
            >
              <FaShoppingCart />

              <p
                className="px-1.5 py-0.5 text-xs bg-red-600 text-white  rounded-2xl absolute top-2 left-3 opacity-90"
                onClick={() => {
                  navigate("/cart");
                }}
              >
               {countCart}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Header);
