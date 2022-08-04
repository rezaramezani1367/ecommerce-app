import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { addProductTocartLS, getProduct } from "../action";
import { FaEye, FaMinus, FaPlus, FaRegTrashAlt, FaStar } from "react-icons/fa";
import Error from "./Error";
import Swal from "sweetalert2";
import { AddTocartLS, minusTocartLS, removeFromcartLS } from "../action";
function Product() {
  const {
    products: { data, loading, error },
    cart,
  } = useSelector((state) => state);
  const [indexCart, setIndexCart] = useState(-1);
  const dispatch = useDispatch();
  const { id } = useParams();
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
    dispatch(getProduct(id));
    document.title = `Product `;
    // index cart
    // const productItem = [...data][0];

    cart.data.forEach((item, index) => {
      if (item.product._id == id) {
        setIndexCart(index);
      }
    });
  }, []);
  console.log(indexCart);
  const addCounter = (index) => {
    dispatch(AddTocartLS(index));
    if (cart.data[index].count === cart.data[index].product.countInStock) {
      Toast.fire({
        icon: "error",
        title: `${cart.data[index].product.name} is max count`,
      });
    }
  };
  const minusCounter = (index) => {
    dispatch(minusTocartLS(index));
    if (cart.data[index].count === 0) {
      setIndexCart(-1);
      Toast.fire({
        icon: "error",
        title: `${cart.data[index].product.name} is deleted from cart`,
      });
      dispatch(removeFromcartLS(index));
    }
  };
  const CartAddToStorage = () => {
    console.log("cart");
    if (indexCart === -1) {
      setIndexCart(cart.data.length);
    }
    dispatch(addProductTocartLS([...data][0], indexCart));
  };
  switch (true) {
    case loading:
      return <Loading />;
    case Boolean(error):
      return <Error error={error} />;
    default:
      return (
        <div className="my-6 grid grid-cols-1 md:grid-cols-2 border p-3 items-center">
          <div>
            <img
              src={data[0]?.image}
              alt={data[0]?.name}
              className="shadow-lg"
            />
            <div className="m-2 flex gap-6">
              <div className="flex items-center gap-1 cursor-pointer ">
                <span className="text-sm font-bold text-slate-600">
                  {data[0]?.numReviews}
                </span>
                <FaEye className="text-red-600 text-lg" />
              </div>
              <div className="flex items-center gap-1 cursor-pointer ">
                <span className="text-sm font-bold text-slate-600">
                  {data[0]?.rating}
                </span>
                <FaStar className="text-yellow-500 text-lg" />
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-center font-bold text-blue-800 text-lg">
              {data[0]?.name}
            </p>
            <hr className="my-3" />
            <ul className="flex flex-col gap-y-2 list-none py-2">
              <li className="grid grid-cols-2 gap-2 border shadow-sm">
                <span className="text-slate-500 bg-slate-100 p-2">Brand</span>
                <span className="font-bold  text-slate-600 p-2">
                  {data[0]?.brand}
                </span>
              </li>
              <li className="grid grid-cols-2 gap-2 border shadow-sm">
                <span className="text-slate-500 bg-slate-100 p-2">
                  Category
                </span>
                <span className="font-bold  text-slate-600 p-2">
                  {data[0]?.category}
                </span>
              </li>
              <li className="grid grid-cols-2 gap-2 border shadow-sm">
                <span className="text-slate-500 bg-slate-100 p-2">
                  Count In Stock
                </span>
                <span className="font-bold  text-red-600 p-2">
                  {data[0]?.countInStock}
                </span>
              </li>
              <li className="grid grid-cols-2 gap-2 border shadow-sm">
                <span className="text-slate-500 bg-slate-100 p-2">Price</span>
                <span className="font-bold  text-red-600 p-2">
                  {data[0]?.price}$
                </span>
              </li>
              <li className="grid grid-cols-1 gap-2 border shadow-sm">
                <span className="text-slate-500 bg-slate-100 p-2">
                  Description
                </span>
                <span className="font-bold  text-slate-600 p-2">
                  {data[0]?.description}
                </span>
              </li>
              <li className="mt-5">
                {data[0]?.countInStock ? (
                  <div className="flex gap-4">
                    {cart.data[indexCart]?.count ? (
                      <>
                        <div className="border w-2/3 sm:w-1/3 md:w-1/2  grid grid-cols-4  items-center  justify-center shadow-lg col-span-4 md:col-span-2 text-center h-full">
                          <div
                            className="cursor-pointer text-sm text-red-500 flex justify-center border-r h-full items-center hover:bg-slate-200 transition-all duration-150"
                            onClick={() => minusCounter(indexCart)}
                          >
                            {console.log(cart)}
                            {cart.data[indexCart]?.count === 1 ? (
                              <FaRegTrashAlt />
                            ) : (
                              <FaMinus />
                            )}
                          </div>
                          <div className="font-bold text-xl col-span-2 h-full flex items-center justify-center gap-1">
                            <span>{cart.data[indexCart]?.count}</span>
                            {cart.data[indexCart]?.count ===
                              data[0].countInStock && (
                              <span className="text-xs text-red-500">
                                | max
                              </span>
                            )}
                          </div>
                          <div
                            className=" cursor-pointer text-sm  flex justify-center text-green-500 border-l hover:bg-slate-200 h-full items-center  transition-all duration-150"
                            onClick={() => addCounter(indexCart)}
                          >
                            <FaPlus />
                          </div>
                        </div>
                        <div
                          className="btn-cart"
                          onClick={() => {
                            navigate(`/cart`);
                          }}
                        >
                          View Cart
                        </div>
                      </>
                    ) : (
                      <button
                        className="btn"
                        onClick={() => {
                          CartAddToStorage();
                          // navigate(`/cart`);
                        }}
                      >
                        Add To Card
                      </button>
                    )}
                  </div>
                ) : (
                  <button className="btn">Notify when available</button>
                )}
              </li>
            </ul>
          </div>
        </div>
      );
  }
}
export default Product;
