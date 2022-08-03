import React, { useEffect, useState } from "react";
import { FaRegEdit, FaSpinner } from "react-icons/fa";
import { setOrders } from "../action";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Checkout() {
  const {
    orders: { loading, orders, error },
    cart: { data },
    user: { user },
  } = useSelector((last) => last);
  const [address, setAddress] = useState([]);
  const [status, setStatus] = useState(false);
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
    document.title = `Checkout `;
    if (data.length) {
      let price = 0;
      data.forEach(({ product, count }) => {
        price += count * product.price;
      });

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
    if (status && Object.keys(orders).length) {
      console.log("status", status);
      console.log("orders", Boolean(Object.keys(orders).length));
      Toast.fire({
        icon: "success",
        title: "order submit successfully",
      });
      navigate(`/orders/${orders._id}`);
    }
  }, [orders, error]);

  const addOrder = () => {
    const shippingAddress = { ...address };
    const orderItems = [];
    data.forEach(({ product, count }) => {
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
      shippingAddress: { ...shippingAddress },
      paymentMethod: "post",
      itemsPrice: totolPrice,
      shippingPrice: "0.00",
      totalPrice: totolPrice,
    };
    dispatch(setOrders({ ...ordersList }, user.token));
    setStatus(true);
  };

  switch (true) {
    case Boolean(!Object.keys(user).length):
      Toast.fire({
        icon: "info",
        title: `Please Login`,
      });
      return (
        <>
          <Navigate replace to="/login" />
        </>
      );
    case Boolean(!Object.keys(data).length):
      Toast.fire({
        icon: "info",
        title: `The orders list is empty`,
      });
      return (
        <>
          <Navigate replace to="/" />
        </>
      );

    case Boolean(!localStorage.getItem("address")):
      Toast.fire({
        icon: "info",
        title: `Please completed address form`,
      });
      return (
        <>
          <Navigate replace to="/address" />
        </>
      );
    default:
      return (
        <div className="my-6">
          <p className="font-bold text-lg mb-2">cart review:</p>
          <div className="grid grid-cols-6 text-center border bg-slate-200 shadow font-bold py-2 mb-2">
            <div className="text-left px-4">Image</div>
            <div className="col-span-2 ">Name</div>
            <div className=" ">Price</div>
            <div className=" ">Count</div>
            <div className=" ">Total Price</div>
          </div>
          {data.map(({ product, count }, index) => {
            return (
              <div key={product._id}>
                <div className="grid grid-cols-6 text-center border  items-center my-1 bg-slate-50">
                  <div className=" ">
                    <img
                      src={product.image}
                      alt={product.name}
                      className=" lg:w-3/5"
                    />
                  </div>
                  <div className="col-span-2 line-clamp-2 md:line-clamp-1">
                    {product.name}
                  </div>
                  <div className="">{product.price}$</div>
                  <div className="">{count}</div>
                  <div className="">{product.price * count}$</div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-between">
            <div>
              <button
                className="btn-edit flex gap-1 items-center"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <FaRegEdit />
                Edit Cart
              </button>
            </div>
            <div className="w-2/3  sm:w-2/5 grid grid-cols-2 gap-2 border  text-xs font-normal md:text-base md:font-bold  items-center">
              <div className="text-slate-500 bg-slate-100  font-bold h-full p-2">
                Total Price
              </div>
              <div className="text-red-600 md:text-lg h-full p-2">
                {totolPrice}$
              </div>
            </div>
          </div>
          <hr className="my-3" />
          <p className="font-bold text-lg mb-2">Address:</p>
          <div className="grid lg:grid-cols-2 gap-1">
            <div className="grid grid-cols-4 gap-2 border shadow-sm">
              <div className="text-slate-500 bg-slate-100 p-2 font-bold">
                Address
              </div>
              <div className="col-span-3 text-slate-600  p-2">
                {address.address}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 border shadow-sm">
              <div className="text-slate-500 bg-slate-100 p-2 font-bold">
                City
              </div>
              <div className="col-span-3 text-slate-600  p-2">
                {address.city}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 border shadow-sm">
              <div className="text-slate-500 bg-slate-100 p-2 font-bold">
                Postal code
              </div>
              <div className="col-span-3 text-slate-600  p-2">
                {address.postalCode}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 border shadow-sm">
              <div className="text-slate-500 bg-slate-100 p-2 font-bold">
                Phone
              </div>
              <div className="col-span-3 text-slate-600  p-2">
                {address.phone}
              </div>
            </div>
          </div>
          <div className="mt-1.5">
            <button
              className="btn-edit flex gap-1 items-center"
              onClick={() => {
                navigate("/address");
              }}
            >
              <FaRegEdit />
              Edit Address
            </button>
          </div>
          <hr className="mt-3" />

          <div className="flex justify-center gap-5">
            <button
              type="submit"
              disabled={loading}
              className="btn mt-6 flex gap-2 items-center"
              onClick={addOrder}
            >
              <FaSpinner
                className={loading ? "block animate-spin" : "hidden"}
              />
              Confrim
            </button>
          </div>
        </div>
      );
  }
}

export default Checkout;
