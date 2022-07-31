import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaRegTimesCircle } from "react-icons/fa";
import { setOrders } from "../action";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Checkout() {
  const { loading, orders, error } = useSelector((last) => last.orders);
  const [getCart, setGetCart] = useState([]);
  const [address, setAddress] = useState([]);
  const [totolPrice, setTotolPrice] = useState(0);
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
    if (localStorage.getItem("cart")) {
      let price = 0;
      JSON.parse(localStorage.getItem("cart")).forEach(({ product, count }) => {
        price += count * product.price;
      });
      setGetCart(JSON.parse(localStorage.getItem("cart")));
      setAddress(JSON.parse(localStorage.getItem("address")));
      setTotolPrice(price.toFixed(2));
    }
  }, []);
  useEffect(() => {
    if (error.length) {
      Toast.fire({
        icon: "error",
        title: error,
      });
    }
    if(Object.keys(orders).length){
      Toast.fire({
        icon: "success",
        title: 'order submit successfully',
      });
    }
  }, [orders, error]);

  const addOrder = () => {
    const userLs = JSON.parse(localStorage.getItem("user"));
    const shippingAddress = { ...address };
    const orderItems = [];
    getCart.forEach(({ product, count }) => {
      if (count) {
        orderItems.push({
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          qty: count,
        });
      }
    });
    const ordersList = {
      orderItems,
      shippingAddress:{...shippingAddress},
      paymentMethod: "post",
      itemsPrice: totolPrice,
      shippingPrice: "0.00",
      totalPrice: totolPrice,
    };
    dispatch(setOrders({ ...ordersList }, userLs.token));
  };
  if (!localStorage.getItem("user")) {
    Toast.fire({
      icon: "info",
      title: `Please Login`,
    });
    return (
      <>
        <Navigate replace to="/login" />
      </>
    );
  }
  if (!localStorage.getItem("address")) {
    Toast.fire({
      icon: "info",
      title: `Please completed address form`,
    });
    return (
      <>
        <Navigate replace to="/address" />
      </>
    );
  }

  return (
    <div className="my-6">
      <div className="grid grid-cols-6 text-center border bg-slate-200 shadow font-bold py-2 mb-2">
        <div className="text-left px-4">Image</div>
        <div className="col-span-2 ">Name</div>
        <div className=" ">Price</div>
        <div className=" ">Count</div>
        <div className=" ">Total Price</div>
      </div>
      {getCart.map(({ product, count }, index) => {
        return (
          <div key={product._id}>
            {Boolean(count) && (
              <div className="grid grid-cols-6 text-center border  items-center my-1 bg-slate-50">
                <div className=" ">
                  <img
                    src={product.image}
                    alt={product.name}
                    className=" lg:w-3/5"
                  />
                </div>
                <div className="col-span-2">{product.name}</div>
                <div className="">{product.price}$</div>
                <div className="">{count}</div>
                <div className="">{product.price * count}$</div>
              </div>
            )}
          </div>
        );
      })}
      <div className="flex justify-end mb-3">
        <div className="w-80 grid grid-cols-3 gap-2 border shadow-sm">
          <div className="text-slate-500 bg-slate-100 p-2 font-bold">
            Total Price
          </div>
          <div className="font-bold col-span-2 text-red-600 text-lg p-2">
            {totolPrice}$
          </div>
        </div>
      </div>
      <hr className="my-3" />
      <div className="grid lg:grid-cols-2 gap-1">
        <div className="grid grid-cols-4 gap-2 border shadow-sm">
          <div className="text-slate-500 bg-slate-100 p-2 font-bold">
            Address
          </div>
          <div className="font-bold col-span-3 text-slate-600  p-2">
            {address.address}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 border shadow-sm">
          <div className="text-slate-500 bg-slate-100 p-2 font-bold">City</div>
          <div className="font-bold col-span-3 text-slate-600  p-2">
            {address.city}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 border shadow-sm">
          <div className="text-slate-500 bg-slate-100 p-2 font-bold">
            Postal code
          </div>
          <div className="font-bold col-span-3 text-slate-600  p-2">
            {address.postalCode}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2 border shadow-sm">
          <div className="text-slate-500 bg-slate-100 p-2 font-bold">Phone</div>
          <div className="font-bold col-span-3 text-slate-600  p-2">
            {address.phone}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-5">
        <button
          className="btn  mt-6"
          onClick={() => {
            navigate("/cart");
          }}
        >
          Edit cart
        </button>
        <button className="btn mt-6" onClick={addOrder}>
          Confrim
        </button>
      </div>
    </div>
  );
}

export default Checkout;