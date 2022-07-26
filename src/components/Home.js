import React, { useEffect } from "react";
import { getProducts } from "../action";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";

function Home() {
  const { data, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  console.log(data);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 my-4 gap-3">
      {data.map((item) => {
        return (
          <div className="border rounded-md overflow-hidden cursor-pointer shadow-md">
            <img src={item.image} alt="image" />
            <div className="py-2 px-6">
              <p className="font-bold">{item.name}</p>
              <hr  className="my-2"/>
              <p>
                <span className="font-bold">Price :</span>
                {item.price}$
              </p>
              <p>
                <span className="font-bold">Rate :</span>
                {item.rating}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
