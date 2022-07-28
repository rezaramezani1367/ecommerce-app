import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaEye, FaStar } from "react-icons/fa";
import { createUser } from "../action";
import Loading from "./Loading";
import Swal from "sweetalert2";

function Signup() {
  const [inputs, setInputs] = useState({
    name: ["", false],
    email: ["", false],
    password: ["", false],
    repeatPass: ["", false],
  });
  const { user, loading, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const navigate = useNavigate();
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
    // newUser();
  }, []);

  const newUser = () => {
    dispatch(createUser("eeeee", "we444we", "wewewe"));
    console.log(user, error);
    if (error) {
      Toast.fire({
        icon: "error",
        title: error,
      });
    }
  };
  console.log(inputs);
  return (
    <div className="my-6 grid justify-center">
      <div className="w-100 sm:w-96 border rounded-xl shadow-lg overflow-hidden">
        <div className="text-center py-3 font-bold text-xl mb-2 border-b bg-slate-200">
          Sign up Page
        </div>
        <form className="p-4" noValidate>
          <div className="mb-3">
            <input
              type="text"
              className={
                inputs.name[1]
                  ? "input placeholder:text-sm border-red-500 placeholder:text-red-500 "
                  : "input placeholder:text-sm"
              }
              placeholder="Name ..."
              value={inputs.name[0]}
              onChange={(e) => {
                setInputs((last) => {
                  return { ...last, name: [e.target.value, false] };
                });
              }}
              onBlur={(e) => {
                let value = e.target.value;
                if (!value.trim().length) {
                  setInputs((last) => {
                    return { ...last, name: [value, true] };
                  });
                }
              }}
            />
            {inputs.name[1] && (
              <p className="text-xs px-3 pt-1 text-red-500">
                The name field must be filled
              </p>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              className={
                inputs.email[1]
                  ? "input placeholder:text-sm border-red-500 placeholder:text-red-500 "
                  : "input placeholder:text-sm"
              }
              placeholder="Email ..."
              value={inputs.email[0]}
              onChange={(e) => {
                setInputs((last) => {
                  return { ...last, email: [e.target.value, false] };
                });
              }}
              onBlur={(e) => {
                let value = e.target.value;
                // console.log(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                  setInputs((last) => {
                    return { ...last, email: [value, true] };
                  });
                }
              }}
            />
            {inputs.email[1] && (
              <p className="text-xs px-3 pt-1 text-red-500">
                The email field is invalid
              </p>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              className={
                inputs.password[1]
                  ? "input placeholder:text-sm border-red-500 placeholder:text-red-500 "
                  : "input placeholder:text-sm"
              }
              placeholder="Password ..."
              value={inputs.password[0]}
              onChange={(e) => {
                setInputs((last) => {
                  return { ...last, password: [e.target.value, false] };
                });
              }}
              onBlur={(e) => {
                let value = e.target.value;
                
                if (
                  !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(
                    value
                  )
                ) {
                  setInputs((last) => {
                    return { ...last, password: [value, true] };
                  });
                }
              }}
            />
            {inputs.password[1] && (
              <p className="text-xs px-3 pt-1 text-red-500">
                The password field has Minimum 8 characters, at least one
                uppercase letter, one lowercase letter, one number and one
                special character
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              className={
                inputs.repeatPass[1]
                  ? "input placeholder:text-sm border-red-500 placeholder:text-red-500 "
                  : "input placeholder:text-sm"
              }
              placeholder="Repeat Password ..."
            />
            {inputs.repeatPass[1] && (
              <p className="text-xs px-3 pt-1 text-red-500">
                It must be the same as the password field
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button type="button" className="btn" onClick={newUser}>
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
