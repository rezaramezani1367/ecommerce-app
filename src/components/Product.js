import React, { useEffect } from "react";
import { useParams, useLocation ,useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { getProduct } from "../action";
import { FaEye,FaStar } from "react-icons/fa";

function Product() {
  const { data, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate=useNavigate();
  useEffect(() => {
    dispatch(getProduct(id));
  }, []);
  // console.log(data);
  const CartAddToStorage=()=>{
    const www=[{product:[...data][0],count:1}];
    localStorage.setItem('cart',JSON.stringify(www))
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-2 border p-3 items-center">
      <div>
        <img src={data[0].image} alt={data[0].name} className="shadow-lg" />
        <div className="m-2 flex gap-6">
          <div className="flex items-center gap-1 cursor-pointer ">
            <span className="text-sm font-bold text-slate-600">
              {data[0].numReviews}
            </span>
            <FaEye className="text-red-600 text-lg" />
          </div>
          <div className="flex items-center gap-1 cursor-pointer ">
            <span className="text-sm font-bold text-slate-600">
              {data[0].rating}
            </span>
            <FaStar className="text-yellow-500 text-lg" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-center font-bold text-blue-800 text-lg">
          {data[0].name}
        </p>
        <hr className="my-3" />
        <ul className="flex flex-col gap-y-2 list-none py-2">
          <li className="grid grid-cols-2 gap-2 border shadow-sm">
            <span className="text-slate-500 bg-slate-100 p-2">Brand</span>
            <span className="font-bold  text-slate-600 p-2">
              {data[0].brand}
            </span>
          </li>
          <li className="grid grid-cols-2 gap-2 border shadow-sm">
            <span className="text-slate-500 bg-slate-100 p-2">Category</span>
            <span className="font-bold  text-slate-600 p-2">
              {data[0].category}
            </span>
          </li>
          <li className="grid grid-cols-2 gap-2 border shadow-sm">
            <span className="text-slate-500 bg-slate-100 p-2">
              Count In Stock
            </span>
            <span className="font-bold  text-red-600 p-2">
              {data[0].countInStock}
            </span>
          </li>
          <li className="grid grid-cols-2 gap-2 border shadow-sm">
            <span className="text-slate-500 bg-slate-100 p-2">Price</span>
            <span className="font-bold  text-red-600 p-2">
              {data[0].price}$
            </span>
          </li>
          <li className="grid grid-cols-1 gap-2 border shadow-sm">
            <span className="text-slate-500 bg-slate-100 p-2">Description</span>
            <span className="font-bold  text-slate-600 p-2">
              {data[0].description}
            </span>
          </li>
          <li className="mt-5">
           <button className="btn" onClick={()=>{
            CartAddToStorage();
            navigate(`/cart`)
           }}>Add To Card</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Product;
