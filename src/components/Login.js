import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { loginUser } from "../action";
import Swal from "sweetalert2";

function Login() {
  const { user:{user, loading, error} } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: { value: "", validate: false, start: false },
    password: { value: "", validate: false, start: false },
  });
  const { email, password } = { ...inputs };
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
  const checkValidate = () => {
    if (!email.validate || !password.validate) {
      console.log("novalidate");
      setInputs((last) => {
        let help = { ...last };
        if (!password.validate) {
          help.password = { ...help.password, start: true };
        }
        if (!email.validate) {
          help.email = { ...help.email, start: true };
        }
        return { ...help };
      });
      return false;
    }
    return true;
  };
  useEffect(() => {
    if (error.length) {
      Toast.fire({
        icon: "error",
        title: error,
      });
    }
    if (Object.keys(user).length) {
      Toast.fire({
        icon: "success",
        title: `${user.name} login successfully`,
      });
      navigate("/");
    }
  }, [error, user]);

  const login = () => {
    if (checkValidate()) {
      dispatch(loginUser(email.value, password.value));
    }
  };
  switch (true) {
    case Boolean(Object.keys(user).length):
      Toast.fire({
        icon: "success",
        title: `User loged in`,
      });
      return (
        <>
          <Navigate replace to="/" />
        </>
      );
    default:
      return (
        <div className="my-6 grid justify-center">
          <div className="w-100 sm:w-96 border rounded-xl shadow-lg overflow-hidden">
            <div className="text-center py-3 font-bold text-xl mb-2 border-b bg-slate-200">
              Login Page
            </div>
            <form
              className="p-4"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                console.log("first");
                login();
              }}
            >
              {/* email */}
              <div className="mb-3">
                <input
                  autoFocus
                  type="text"
                  className={
                    !email.validate && email.start
                      ? "input placeholder:text-sm border-red-500 placeholder:text-red-500 "
                      : "input placeholder:text-sm"
                  }
                  placeholder="Email ..."
                  value={email.value}
                  onChange={(e) => {
                    let value = e.target.value;
                    setInputs((last) => {
                      return { ...last, email: { ...email, value: value } };
                    });
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;
                    setInputs((last) => {
                      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                        ? {
                            ...last,
                            email: {
                              start: true,
                              value: value,
                              validate: true,
                            },
                          }
                        : {
                            ...last,
                            email: {
                              start: true,
                              value: value,
                              validate: false,
                            },
                          };
                    });
                  }}
                />
                {!email.validate && email.start && (
                  <p className="text-xs px-3 pt-1 text-red-500">
                    The email field is invalid
                  </p>
                )}
              </div>

              {/* password */}
              <div className="mb-3">
                <input
                  type="password"
                  className={
                    !password.validate && password.start
                      ? "input placeholder:text-sm border-red-500 placeholder:text-red-500 "
                      : "input placeholder:text-sm"
                  }
                  placeholder="Password ..."
                  value={password.name}
                  onChange={(e) => {
                    let value = e.target.value;
                    setInputs((last) => {
                      return {
                        ...last,
                        password: { ...password, value: value },
                      };
                    });
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;

                    setInputs((last) => {
                      return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(
                        value
                      )
                        ? {
                            ...last,
                            password: {
                              start: true,
                              value: value,
                              validate: true,
                            },
                          }
                        : {
                            ...last,
                            password: {
                              start: true,
                              value: value,
                              validate: false,
                            },
                          };
                    });
                  }}
                />
                {!password.validate && password.start && (
                  <p className="text-xs px-3 pt-1 text-red-500">
                    The password field has Minimum 8 characters, at least one
                    uppercase letter, one lowercase letter, one number and one
                    special character
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn flex gap-2 items-center"
                  disabled={loading}
                  onClick={login}
                >
                  <FaSpinner
                    className={loading ? "block animate-spin" : "hidden"}
                  />
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      );
  }
}
export default Login;
