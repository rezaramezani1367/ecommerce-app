import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { changeProfile, getProfile } from "../action";
import Swal from "sweetalert2";

function Setting() {
  const {
    user: { user, loading, error },
  } = useSelector((state) => state);
  const [status, setStatus] = useState(false);

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    oldPassword: { value: "", validate: false, start: false },
    newPassword: { value: "", validate: false, start: false },
    repeatPass: { value: "", validate: false, start: false },
  });
  const { oldPassword, newPassword, repeatPass } = { ...inputs };
  const navigate = useNavigate();
  // console.log(user)
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
    if (
      !oldPassword.validate ||
      !newPassword.validate ||
      !repeatPass.validate
    ) {
      setInputs((last) => {
        let help = { ...last };

        if (!oldPassword.validate) {
          help.oldPassword = { ...help.oldPassword, start: true };
        }
        if (!newPassword.validate) {
          help.newPassword = { ...help.newPassword, start: true };
        }

        if (!repeatPass.validate) {
          help.repeatPass = { ...help.repeatPass, start: true };
        }
        return { ...help };
      });
      return false;
    }
    return true;
  };
  useEffect(() => {
    document.title = `Setting`;
  }, []);

  useEffect(() => {
    if (status && error.length) {
      Toast.fire({
        icon: "error",
        title: error,
      });
    }
    if (status && Object.keys(user).length) {
      Toast.fire({
        icon: "success",
        title: `${user.name} changed successfully`,
      });
      dispatch(changeProfile(newPassword.value));
      navigate("/");
    }
  }, [error, user]);

  const changeUser = () => {
    if (checkValidate()) {
      dispatch(getProfile());
      setStatus(true);
    }
  };
  const oldPasswordValidate = (value) => {
    setInputs((last) => {
      return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(
        value
      ) && value === user.password
        ? {
            ...last,
            oldPassword: {
              start: true,
              value: value,
              validate: true,
            },
          }
        : {
            ...last,
            oldPassword: {
              start: true,
              value: value,
              validate: false,
            },
          };
    });
  };
  const newPasswordValidate = (value) => {
    setInputs((last) => {
      if (
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/.test(value)
      ) {
        return repeatPass.value === value
          ? {
              ...last,
              newPassword: {
                start: true,
                value: value,
                validate: true,
              },
              repeatPass: {
                ...repeatPass,
                start: true,
                validate: true,
              },
            }
          : {
              ...last,
              newPassword: {
                start: true,
                value: value,
                validate: true,
              },
              repeatPass: {
                ...repeatPass,
                start: true,
                validate: false,
              },
            };
      } else {
        return {
          ...last,
          newPassword: {
            start: true,
            value: value,
            validate: false,
          },
        };
      }
    });
  };
  const repeatNewPasswordValidate = (value) => {
    setInputs((last) => {
      return value === newPassword.value
        ? {
            ...last,
            repeatPass: {
              start: true,
              value: value,
              validate: true,
            },
          }
        : {
            ...last,
            repeatPass: {
              start: true,
              value: value,
              validate: false,
            },
          };
    });
  };
  switch (true) {
    case Boolean(!Object.keys(user).length):
      Toast.fire({
        icon: "info",
        title: `Please Login`,
      });
      return (
        <>
          <Navigate to="/login" />
        </>
      );
    default:
      return (
        <div className="my-6 grid justify-center">
          <div className="w-100 sm:w-96 border rounded-xl shadow-lg overflow-hidden">
            <div className="text-center py-3 font-bold text-xl mb-2 border-b bg-slate-200">
              Change Password Page
            </div>
            <form
              className="p-4"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                changeUser();
              }}
            >
              {/* old password */}
              <div className="mb-3">
                <input
                  autoFocus
                  type="password"
                  className={
                    !oldPassword.validate && oldPassword.start
                      ? "input placeholder:text-sm border-red-500 placeholder:text-red-500 "
                      : "input placeholder:text-sm"
                  }
                  placeholder="Old Password ..."
                  value={oldPassword.name}
                  onChange={(e) => {
                    let value = e.target.value;
                    oldPasswordValidate(value);
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;
                    oldPasswordValidate(value);
                  }}
                />
                {!oldPassword.validate && oldPassword.start && (
                  <p className="text-xs px-3 pt-1 text-red-500">
                    The old password field is invalid or wrong
                  </p>
                )}
              </div>
              {/* new password */}
              <div className="mb-3">
                <input
                  type="password"
                  className={
                    !newPassword.validate && newPassword.start
                      ? "input placeholder:text-sm border-red-500 placeholder:text-red-500 "
                      : "input placeholder:text-sm"
                  }
                  placeholder="New Password ..."
                  value={newPassword.name}
                  onChange={(e) => {
                    let value = e.target.value;
                    newPasswordValidate(value);
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;
                    newPasswordValidate(value);
                  }}
                />
                {!newPassword.validate && newPassword.start && (
                  <p className="text-xs px-3 pt-1 text-red-500">
                    The new password field is invalid
                  </p>
                )}
              </div>

              {/* repeat password */}
              <div className="mb-4">
                <input
                  type="password"
                  className={
                    !repeatPass.validate && repeatPass.start
                      ? "input placeholder:text-sm border-red-500 placeholder:text-red-500 "
                      : "input placeholder:text-sm"
                  }
                  placeholder="Repeat New Password ..."
                  value={inputs.repeatPass[0]}
                  onChange={(e) => {
                    let value = e.target.value;
                    repeatNewPasswordValidate(value);
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;
                    repeatNewPasswordValidate(value);
                  }}
                />
                {!repeatPass.validate && repeatPass.start && (
                  <p className="text-xs px-3 pt-1 text-red-500">
                    It must be the same as the new password field
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn flex gap-2 items-center"
                  disabled={loading}
                  onClick={changeUser}
                >
                  <FaSpinner
                    className={loading ? "block animate-spin" : "hidden"}
                  />
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      );
  }
}

export default Setting;
