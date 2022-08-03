import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Address() {
  const {user:{user}}=useSelector(last=>last)
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
  useEffect(() => {
    if (localStorage.getItem("address")) {
      const addressLs = JSON.parse(localStorage.getItem("address"));
      setInputs((last) => {
        return {
          ...last,
          address: { start:true,validate:true, value: addressLs.address },
          city: { start:true,validate:true, value: addressLs.city },
          postalCode: { start:true,validate:true, value: addressLs.postalCode },
          phone: { start:true,validate:true, value: addressLs.phone },
        };
      });
    }
  }, []);

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

  const saveAddressToLS = () => {
    if (checkValidate()) {
      if (localStorage.getItem("address")) {
        localStorage.removeItem("address");
      }
      localStorage.setItem(
        "address",
        JSON.stringify({
          address: address.value,
          city: city.value,
          postalCode: postalCode.value,
          phone: phone.value,
        })
      );
      Toast.fire({
        icon: "success",
        title: `Address created successfully`,
      });
      navigate("/checkout");
    }
  };

  switch (true) {
    case Boolean(!Object.keys(user).length):
      Toast.fire({
        icon: "success",
        title: `Address exists`,
      });
      return (
        <>
          <Navigate replace to="/checkout" />
        </>
      );

    default:
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
                saveAddressToLS();
              }}
            >
              {/* Address */}
              <div className="mb-3">
                <input
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
                            address: {
                              start: true,
                              value: value,
                              validate: true,
                            },
                          }
                        : {
                            ...last,
                            address: {
                              start: true,
                              value: value,
                              validate: false,
                            },
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
              {/* city */}
              <div className="mb-3">
                <input
                  type="text"
                  className={
                    !city.validate && city.start
                      ? "input placeholder:text-sm border-red-500 placeholder:text-red-500"
                      : "input placeholder:text-sm "
                  }
                  placeholder="City ..."
                  value={city.value}
                  onChange={(e) => {
                    let value = e.target.value;
                    setInputs((last) => {
                      return { ...last, city: { ...city, value: value } };
                    });
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;

                    setInputs((last) => {
                      return value.trim().length
                        ? {
                            ...last,
                            city: { start: true, value: value, validate: true },
                          }
                        : {
                            ...last,
                            city: {
                              start: true,
                              value: value,
                              validate: false,
                            },
                          };
                    });
                  }}
                />
                {city.start && !city.validate && (
                  <p className="text-xs px-3 pt-1 text-red-500">
                    The city field must be filled
                  </p>
                )}
              </div>
              {/* postalCode */}
              <div className="mb-3">
                <input
                  type="text"
                  className={
                    !postalCode.validate && postalCode.start
                      ? "input placeholder:text-sm border-red-500 placeholder:text-red-500"
                      : "input placeholder:text-sm "
                  }
                  placeholder="Postal Code ..."
                  value={postalCode.value}
                  onChange={(e) => {
                    let value = e.target.value;
                    setInputs((last) => {
                      return {
                        ...last,
                        postalCode: { ...postalCode, value: value },
                      };
                    });
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;

                    setInputs((last) => {
                      return /^[1-9][0-9]{9}$/.test(value)
                        ? {
                            ...last,
                            postalCode: {
                              start: true,
                              value: value,
                              validate: true,
                            },
                          }
                        : {
                            ...last,
                            postalCode: {
                              start: true,
                              value: value,
                              validate: false,
                            },
                          };
                    });
                  }}
                />
                {postalCode.start && !postalCode.validate && (
                  <p className="text-xs px-3 pt-1 text-red-500">
                    The postalCode field must be number(10character) and Should not begin with 0  example 1234567890
                  </p>
                )}
              </div>
              {/* phone */}
              <div className="mb-3">
                <input
                  type="text"
                  className={
                    !phone.validate && phone.start
                      ? "input placeholder:text-sm border-red-500 placeholder:text-red-500"
                      : "input placeholder:text-sm "
                  }
                  placeholder="Phone ..."
                  value={phone.value}
                  onChange={(e) => {
                    let value = e.target.value;
                    setInputs((last) => {
                      return { ...last, phone: { ...phone, value: value } };
                    });
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;

                    setInputs((last) => {
                      return  /^[0][9][0-9]{9}$/.test(value)
                        ? {
                            ...last,
                            phone: {
                              start: true,
                              value: value,
                              validate: true,
                            },
                          }
                        : {
                            ...last,
                            phone: {
                              start: true,
                              value: value,
                              validate: false,
                            },
                          };
                    });
                  }}
                />
                {phone.start && !phone.validate && (
                  <p className="text-xs px-3 pt-1 text-red-500">
                    The phone field must be number(11character) and started by 09  example 09123456789
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn flex gap-2 items-center"
                  onClick={saveAddressToLS}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      );
  }
}
export default Address;
