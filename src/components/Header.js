import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { exitUser, getProfile } from "../action";

function Header() {
  const {
    user: { error, user },
    cart: { data },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [flagUser, setFlagUser] = useState(false);
  const [countCart, setCountCart] = useState(0);
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
    let totalCount = 0;
    data.forEach(({ count }) => {
      totalCount += count;
    });
    setCountCart(totalCount);
  }, [data]);

  useEffect(() => {
    setFlagUser(false);
    // validation token
  
    if(Object.keys(user).length){

      dispatch(getProfile());
    }
    
  }, []);
  useEffect(() => {
    // validation token when faild
    if (error === "Not authorized, token failed") {
     Toast.fire({
       icon: "error",
       title: 'Please login again',
     });
     dispatch(exitUser());
     navigate("/login");
   }
    
   
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
                    <ul
                      id="someElementID"
                      className="w-28 absolute top-6 right-0 z-50 border border-slate-300 shadow-lg text-sm opacity-95 bg-white  rounded-md"
                    >
                      <li className=" text-green-700 text-base p-2 bg-slate-200">
                        Hi {user.name}
                      </li>
                      <hr />

                      <li
                        className="cursor-pointer mx-2 hover:text-red-600 transition-all duration-150 px-4 py-1 border-b"
                        onClick={() => {
                          setFlagUser(false);
                        }}
                      >
                        <Link to="/setting">Setting</Link>
                      </li>
                      <li
                        className="cursor-pointer mx-2 hover:text-red-600 transition-all duration-150 px-4 py-1 border-b"
                        onClick={() => {
                          setFlagUser(false);
                        }}
                      >
                        <Link to="/orders">Orders</Link>
                      </li>
                      <li
                        className="cursor-pointer mx-2 hover:text-red-600 transition-all duration-150 px-4 py-1"
                        onClick={() => {
                          dispatch(exitUser());
                          Toast.fire({
                            icon: "success",
                            title: `User loged out`,
                          });
                          setFlagUser(false);
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
