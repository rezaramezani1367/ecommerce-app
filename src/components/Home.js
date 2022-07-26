import React, { useEffect } from "react";
import { getProducts } from "../action";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { FaEye, FaStar } from "react-icons/fa";
import Error from "./Error";
import Filter from "./Filter";

function Home() {
  const { products:{data, loading, error} } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "home";
    dispatch(getProducts());
  }, []);
 
  switch (true) {
    case Boolean(error.length):
      return <Error error={error} />;
    case loading:
      return <Loading />;
    default:
      
      return (
        // <div className="grid grid-cols-4 gap-1 mt-3">
        //   <div className="bg-slate-50 border"> <Filter /> </div>
          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-6 gap-3">
          {data.map((item, index) => {
            return (
              <div
                className="border rounded-md overflow-hidden cursor-pointer shadow-md"
                onClick={() => {
                  navigate(`/products/${item._id}`);
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
                  <p className="font-bold line-clamp-1">{item.name}</p>
                  <hr className="my-2" />
                  <p>
                    <span className="font-bold">Price :</span>
                    <span className="ml-2 text-red-700 font-bold">
                      {item.price}$
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        // </div>
      );
  }
}

export default Home;
