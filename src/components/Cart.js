import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaRegTimesCircle } from "react-icons/fa";
import {} from "../action";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

function Cart() {
<<<<<<< HEAD


  const [getCart, setGetCart] = useState([]);
  const [counter, setCounter] = useState([]);
  const [totolPrice, setTotolPrice] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      JSON.parse(localStorage.getItem("cart")).forEach(({ count }) => {
        setCounter((last) => [...last, count]);
      });
      setGetCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    let price = 0;
    getCart.forEach(({ product, count }) => {
      price += count * product.price;
    });
    setTotolPrice(price.toFixed(2));
  }, [counter]);

  const addCounter = (index) => {
    const helpStorage = [...getCart];
    setCounter((last) => {
      let help = [...last];
      help[index] =
        help[index] < helpStorage[index].product.countInStock
          ? help[index] + 1
          : helpStorage[index].product.countInStock;
      return [...help];
    });
    helpStorage[index].count =
      helpStorage[index].count < helpStorage[index].product.countInStock
        ? helpStorage[index].count + 1
        : helpStorage[index].product.countInStock;
    localStorage.setItem("cart", JSON.stringify([...helpStorage]));
  };
  const minusCounter = (index) => {
    const helpStorage = [...getCart];
    setCounter((last) => {
      let help = [...last];
      help[index] = help[index] > 0 ? help[index] - 1 : 0;
      return [...help];
    });

    helpStorage[index].count =
      helpStorage[index].count > 0 ? helpStorage[index].count - 1 : 0;
    localStorage.setItem("cart", JSON.stringify([...helpStorage]));
  };
  const removeItem = (index) => {
    const helpStorage = [...getCart];
    helpStorage.splice(index, 1);
    helpStorage.length
      ? localStorage.setItem("cart", JSON.stringify(helpStorage))
      : localStorage.clear("cart");
    setGetCart((last) => {
      return helpStorage.length ? [...helpStorage] : [];
    });
    setCounter((last) => {
      if (helpStorage.length) {
        let help = [...last];
        help.splice(index, 1);
        return [...help];
      } else {
        return [];
      }
    });
  };

 
=======
  const { data, loading } = useSelector((state) => state.products);
  const [getCart, setGetCart] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // dispatch(getProducts());
    setGetCart(JSON.parse(localStorage.getItem("cart")));
  }, []);
  // console.log(getCart)

>>>>>>> 078e0f700d9d9c8d3b2b56bd072fed2ccaffc05c
  if (!localStorage.getItem("cart")) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="font-bold text-2xl">The shopping cart is empty</div>
      </div>
    );
  }
  return (
    <div className="my-6">
<<<<<<< HEAD
      {getCart.map((item, index) => {
=======
      {getCart.map((item) => {
>>>>>>> 078e0f700d9d9c8d3b2b56bd072fed2ccaffc05c
        const { product, count } = item;
        return (
          <div
            className="border grid grid-cols-11 items-center gap-2 my-2 shadow"
            key={product._id}
          >
            <div className="col-span-1">
<<<<<<< HEAD
              <img src={product.image} alt={product.name} />
            </div>
            <div className="font-bold col-span-3">{product.name}</div>
            <div className="text-center col-span-2">
              <span className="font-bold ">{product.price.toFixed(2)}$</span>
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
                Total: {(product.price * counter[index]).toFixed(2)}$
              </span>
            </div>
            <div
              className="flex justify-center text-red-500 hover:text-red-700
             transition-all cursor-pointer"
              onClick={() => removeItem(index)}
            >
=======
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
>>>>>>> 078e0f700d9d9c8d3b2b56bd072fed2ccaffc05c
              <FaRegTimesCircle />
            </div>
          </div>
        );
      })}
<<<<<<< HEAD
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
=======
>>>>>>> 078e0f700d9d9c8d3b2b56bd072fed2ccaffc05c
      <div className="flex justify-center">
        <button className="btn mt-6" onClick={()=>{navigate('/login')}}>Next</button>
      </div>
    </div>
  );
}

export default Cart;
