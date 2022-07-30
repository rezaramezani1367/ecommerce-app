import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaSpinner } from "react-icons/fa";
import { createUser, EmptyUser } from "../action";
import Swal from "sweetalert2";

function Address() {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    address: { value: "", validate: false, start: false },
    city: { value: "", validate: false, start: false },
    postalCode: { value: "", validate: false, start: false },
    phone: { value: "", validate: false, start: false },
  });
  const { address, city, postalCode, phone } = { ...inputs };
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
    if (
      !address.validate ||
      !city.validate ||
      !postalCode.validate ||
      !phone.validate
    ) {
      setInputs((last) => {
        let help = { ...last };
        if (!address.validate) {
          help.address = { ...help.address, start: true };
        }
        if (!city.validate) {
          help.city = { ...help.city, start: true };
        }
        if (!postalCode.validate) {
          help.postalCode = { ...help.postalCode, start: true };
        }
        if (!phone.validate) {
          help.phone = { ...help.phone, start: true };
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
      dispatch(EmptyUser());
    }
    if (Object.keys(user).length) {
      Toast.fire({
        icon: "success",
        title: `${address.value} created successfully`,
      });
      dispatch(EmptyUser());
      navigate("/");
    }
  }, [error, user]);

  const newUser = () => {
    if (checkValidate()) {
      // console.log("first");
    //   dispatch(createUser(name.value, email.value, password.value));
    }
    // console.log(user, error);
  };
  return (
    <div className="my-6 grid justify-center">
      <div className="w-100 sm:w-96 border rounded-xl shadow-lg overflow-hidden">
        <div className="text-center py-3 font-bold text-xl mb-2 border-b bg-slate-200">
          Address Page
        </div>
        <form
          className="p-4"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            newUser();
          }}
        >
          {/* Address */}
          <div className="mb-3">
            <input
              autoFocus
              type="text"
              className={
                !address.validate && address.start
                  ? "input placeholder:text-sm border-red-500 placeholder:text-red-500"
                  : "input placeholder:text-sm "
              }
              placeholder="Address ..."
              value={address.value}
              onChange={(e) => {
                let value = e.target.value;
                setInputs((last) => {
                  return { ...last, address: { ...address, value: value } };
                });
              }}
              onBlur={(e) => {
                let value = e.target.value;

                setInputs((last) => {
                  return value.trim().length
                    ? {
                        ...last,
                        address: { start: true, value: value, validate: true },
                      }
                    : {
                        ...last,
                        address: { start: true, value: value, validate: false },
                      };
                });
              }}
            />
            {address.start && !address.validate && (
              <p className="text-xs px-3 pt-1 text-red-500">
                The address field must be filled
              </p>
            )}
          </div>


          <div className="flex justify-center">
            <button
              type="submit"
              className="btn flex gap-2 items-center"
              disabled={loading}
              onClick={newUser}
            >
              <FaSpinner
                className={loading ? "block animate-spin" : "hidden"}
              />
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Address;
