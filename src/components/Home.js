import React, { useEffect } from "react";
import { getProducts } from "../action";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { FaEye, FaStar } from "react-icons/fa";

function Home() {
  const { data, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-6 gap-3">
      {data.map((item) => {
        return (
          <div
            className="border rounded-md overflow-hidden cursor-pointer shadow-md"
            onClick={() => {
              navigate(`/products/${item._id}`, { state: item });
            }}
            key={item._id}
          >
            <div className="relative">
              <img src={item.image} alt={item.name} />
              <div className=" flex justify-between absolute bottom-0 w-full p-2">
                <div className="flex items-center gap-1 cursor-pointer ">
                  <span className="text-sm font-bold text-slate-600">
                    {item.numReviews}
                  </span>
                  <FaEye className="text-red-600 text-lg" />
                </div>
                <div className="flex items-center gap-1 cursor-pointer ">
                  <span className="text-sm font-bold text-slate-600">
                    {item.rating}
                  </span>
                  <FaStar className="text-yellow-500 text-lg" />
                </div>
              </div>
            </div>
            <div className="py-2 px-6">
              <p className="font-bold">{item.name}</p>
              <hr className="my-2" />
              <p>
                <span className="font-bold">Price :</span>
                <span className="ml-2 text-red-700 font-bold">{item.price}$</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
