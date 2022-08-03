import React, { useEffect, useState } from "react";
import {
  FaMinus,
  FaPlus,
  FaRegTimesCircle,
  FaRegTrashAlt,
} from "react-icons/fa";
import { AddTocartLS, minusTocartLS, removeFromcartLS } from "../action";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Cart() {
  const {
    cart: { data, error, loading },
    user: { user },
  } = useSelector((last) => last);
  const dispatch = useDispatch();

  const [totolPrice, setTotolPrice] = useState(0);
  const navigate = useNavigate();
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  useEffect(() => {
    document.title = `Cart `;
  }, [])
  

  useEffect(() => {
    let price = 0;
    data.forEach(({ product, count }) => {
      price += count * product.price;
    });
    setTotolPrice(price.toFixed(2));
  }, [data]);

  const addCounter = (index) => {
    dispatch(AddTocartLS(index));
    if (data[index].count === data[index].product.countInStock) {
      Toast.fire({
        icon: "error",
        title: `${data[index].product.name} is max count`,
      });
    }
  };
  const minusCounter = (index) => {
    dispatch(minusTocartLS(index));
    if (data[index].count === 0) {
      Toast.fire({
        icon: "error",
        title: `${data[index].product.name} is deleted from cart`,
      });
      dispatch(removeFromcartLS(index));
    }
  };
  const removeItem = (index) => {
    Toast.fire({
      icon: "error",
      title: `${data[index].product.name} is deleted from cart`,
    });
    dispatch(removeFromcartLS(index));
  };
  switch (true) {
    case Boolean(!Object.keys(data).length):
      return (
        <div className="flex justify-center items-center h-96">
          <div className="font-bold text-2xl text-red-500">
            The shopping cart is empty
          </div>
        </div>
      );

    default:
      return (
        <div className="my-6">
          {data.map(({ product, count }, index) => {
            return (
              <div
                className="border grid grid-cols-12 md:grid-cols-11 items-center gap-2 my-2 shadow text-xs font-normal md:text-base md:font-bold"
                key={product._id}
              >
                <div
                  className="col-span-2 md:col-span-1 hover:cursor-pointer transition-all "
                  onClick={() => {
                    navigate(`/products/${product._id}`);
                  }}
                >
                  <img src={product.image} alt={product.name} />
                </div>
                <div
                  className="font-bold col-span-3 hover:cursor-pointer hover:text-red-800 transition-all line-clamp-2 md:line-clamp-1"
                  onClick={() => {
                    navigate(`/products/${product._id}`);
                  }}
                >
                  {product.name}
                </div>
                <div className="text-center col-span-2">
                  <span className="font-bold ">
                    {product.price?.toFixed(2)}$
                  </span>
                </div>
                <div className="border grid grid-cols-4  items-center  justify-center shadow-lg col-span-4 md:col-span-2 text-center md:h-2/3 lg:h-3/5">
                  <div
                    className="cursor-pointer text-sm text-red-500 flex justify-center border-r h-full items-center hover:bg-slate-200 transition-all duration-150"
                    onClick={() => minusCounter(index)}
                  >
                    {count === 1 ? <FaRegTrashAlt /> : <FaMinus />}
                  </div>
                  <div className="font-bold text-xl col-span-2 h-full flex items-center justify-center gap-1">
                    <span>{count}</span>
                    {count === product.countInStock && (
                      <span className="text-xs text-red-500">| max</span>
                    )}
                  </div>
                  <div
                    className=" cursor-pointer text-sm  flex justify-center text-green-500 border-l hover:bg-slate-200 h-full items-center  transition-all duration-150"
                    onClick={() => addCounter(index)}
                  >
                    <FaPlus />
                  </div>
                </div>
                <div className="text-center hidden md:block md:col-span-2">
                  <span className="font-bold">
                    Total: {(product.price * count).toFixed(2)}$
                  </span>
                </div>
                <div
                  className="flex justify-center text-red-500 hover:text-red-700
             transition-all cursor-pointer"
                  onClick={() => removeItem(index)}
                >
                  <FaRegTimesCircle />
                </div>
              </div>
            );
          })}
          <div className="flex justify-end">
            <div className="w-2/3  sm:w-2/5 grid grid-cols-2 gap-2 border  text-xs font-normal md:text-base md:font-bold  items-center">
              <div className="text-slate-500 bg-slate-100  font-bold h-full p-2">
                Total Price
              </div>
              <div className="font-bold text-red-600 md:text-lg h-full p-2">
                {totolPrice}$
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="btn mt-6"
              onClick={() => {
                switch (true) {
                  case !Object.keys(user):
                    Toast.fire({
                      icon: "warning",
                      title: `please Login`,
                    });

                    navigate("/login");
                  case Boolean(!localStorage.getItem("address")):
                    Toast.fire({
                      icon: "warning",
                      title: `Please complete the address form`,
                    });

                    navigate("/address");
                  default:
                    navigate("/checkout");
                }
              }}
            >
              Next
            </button>
          </div>
        </div>
      );
  }
}

export default Cart;
