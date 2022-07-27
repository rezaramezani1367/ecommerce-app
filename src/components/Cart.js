import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaRegTimesCircle } from "react-icons/fa";
import {} from "../action";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { data, loading } = useSelector((state) => state.products);
  const [getCart, setGetCart] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // dispatch(getProducts());
    setGetCart(JSON.parse(localStorage.getItem("cart")));
  }, []);
  // console.log(getCart)

  if (!localStorage.getItem("cart")) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="font-bold text-2xl">The shopping cart is empty</div>
      </div>
    );
  }
  return (
    <div className="my-6">
      {getCart.map((item) => {
        const { product, count } = item;
        return (
          <div
            className="border grid grid-cols-11 items-center gap-2 my-2 shadow"
            key={product._id}
          >
            <div className="col-span-1">
              <img src={product.image} className="" alt={product.name} />
            </div>
            <div className="font-bold col-span-3">{product.name}</div>
            <div className="text-center col-span-2">
              <span className="font-bold ">{product.price}$</span>
            </div>
            <div className="border flex items-center gap-1 md:gap-2 lg:gap-7 justify-center shadow-sm col-span-2">
              <div className=" cursor-pointer text-sm text-red-600">
                <FaMinus className="" />
              </div>
              <span className="font-bold text-xl">{count}</span>
              <div className=" cursor-pointer text-sm text-green-600">
                <FaPlus className="" />
              </div>
            </div>
            <div className="text-center col-span-2">
              <span className="font-bold">Total: {product.price*count}$</span>
            </div>
            <div className="flex justify-center text-red-500 hover:text-red-700 transition-all cursor-pointer">
              <FaRegTimesCircle />
            </div>
          </div>
        );
      })}
      <div className="flex justify-center">
        <button className="btn mt-6 ">Next</button>
      </div>
    </div>
  );
}

export default Cart;
