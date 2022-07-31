import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaRegTimesCircle } from "react-icons/fa";
import { getMyOrders, setOrders } from "../action";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import Error from "./Error";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Orders() {
  const { loading, orders, error } = useSelector((last) => last.orders);

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
  const userLS = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};
  useEffect(() => {
    if (Object.keys(userLS).length) {
      dispatch(getMyOrders(userLS.token));
    }
  }, []);

  switch (true) {
    case !localStorage.getItem("user"):
      Toast.fire({
        icon: "info",
        title: `Please Login`,
      });
      return (
        <>
          <Navigate to="/login" />
        </>
      );
    case loading:
      return (
        <>
          <Loading />
        </>
      );
    case error:
      return (
        <>
          <Error error={error} />
        </>
      );
    case !Object.values(orders).length:
      return (
        <div className="flex justify-center items-center h-96">
          <div className="font-bold text-2xl text-red-500">
            The orders list is empty
          </div>
        </div>
      );

    default:
      return (
        <div className="my-6">
          <div className="grid grid-cols-10 text-center border bg-slate-200 shadow font-bold py-2 mb-2 gap-1">
            <div>#</div>
            <div className="col-span-2">Count Items Order</div>
            <div className="col-span-2">total Price</div>
            <div>Is Paid</div>
            <div className="col-span-2">Is Delivered</div>
            <div className="col-span-2">Create at</div>
          </div>
          {Object.values(orders).map((item, index) => {
            return (
              <div
                className="grid grid-cols-10 text-center border bg-slate-50 shadow font-bold py-2 mb-2 hover:cursor-pointer hover:bg-slate-300 transition-all duration-200 gap-1"
                key={index}
                onClick={()=>{
                  navigate(`/orders/${item._id}`)
                }}
              >
                <div>{index + 1}</div>
                <div className="col-span-2">{item.orderItems.length}</div>
                <div className="text-red-500 col-span-2">
                  {item.totalPrice}$
                </div>
                <div>{item.isPaid ? "Yes" : "No"}</div>
                <div className="col-span-2">
                  {item.isDelivered ? "Yes" : "No"}
                </div>
                <div className="col-span-2">
                  {" "}
                  {item.createdAt.substring(0, 10)}
                </div>
              </div>
            );
          })}
        </div>
      );
  }
}
export default Orders;
