import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaRegTimesCircle } from "react-icons/fa";
import { AddTocartLS, minusTocartLS, removeFromcartLS } from "../action";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Cart() {
  const { data, error, loading } = useSelector((last) => last.cart);
  const dispatch = useDispatch();

  const [totolPrice, setTotolPrice] = useState(0);
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
    let price = 0;
    data.forEach(({ product, count }) => {
      price += count * product.price;
    });
    setTotolPrice(price.toFixed(2));
  }, [data]);

  const addCounter = (index) => {
    dispatch(AddTocartLS(index));
  };
  const minusCounter = (index) => {
    dispatch(minusTocartLS(index));
  };
  const removeItem = (index) => {
  dispatch(removeFromcartLS(index))
  };
  switch (true) {
    case !localStorage.getItem("cart"):
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
          {data.map((item, index) => {
            const { product, count } = item;
            return (
              <div
                className="border grid grid-cols-11 items-center gap-2 my-2 shadow"
                key={product._id}
              >
                <div
                  className="col-span-1 hover:cursor-pointer transition-all"
                  onClick={() => {
                    navigate(`/products/${product._id}`);
                  }}
                >
                  <img src={product.image} alt={product.name} />
                </div>
                <div
                  className="font-bold col-span-3 hover:cursor-pointer hover:text-red-800 transition-all"
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
                <div className="border flex items-center gap-1 md:gap-2 lg:gap-7 justify-center shadow-sm col-span-2">
                  <div
                    className=" cursor-pointer text-sm text-red-600"
                    onClick={() => minusCounter(index)}
                  >
                    <FaMinus />
                  </div>
                  <span className="font-bold text-xl">{count}</span>
                  <div
                    className=" cursor-pointer text-sm text-green-600"
                    onClick={() => addCounter(index)}
                  >
                    <FaPlus />
                  </div>
                </div>
                <div className="text-center col-span-2">
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
          <div className="flex justify-end ">
            <div className="w-80 grid grid-cols-3 gap-2 border shadow-sm">
              <div className="text-slate-500 bg-slate-100 p-2 font-bold">
                Total Price
              </div>
              <div className="font-bold col-span-2 text-red-600 text-lg p-2">
                {totolPrice}$
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className="btn mt-6"
              onClick={() => {
                if (!localStorage.getItem("user")) {
                  Toast.fire({
                    icon: "warning",
                    title: `please Login`,
                  });

                  navigate("/login");
                } else if (!localStorage.getItem("address")) {
                  Toast.fire({
                    icon: "warning",
                    title: `Please complete the address form`,
                  });

                  navigate("/address");
                } else {
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
