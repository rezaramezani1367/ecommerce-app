import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaRegTimesCircle } from "react-icons/fa";
import {} from "../action";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Cart() {
  const [getCart, setGetCart] = useState([]);
  const [counter, setCounter] = useState([]);
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

  if (!localStorage.getItem("cart")) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="font-bold text-2xl">The shopping cart is empty</div>
      </div>
    );
  }
  return (
    <div className="my-6">
      {getCart.map((item, index) => {
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
                icon: "success",
                title: `please Login`
              })
             
              navigate("/login");
            }
           else if (!localStorage.getItem("address")) {
              Toast.fire({
                icon: "success",
                title: `Please complete the address form`
              })
             
              navigate("/address");
            }else{

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

export default Cart;
