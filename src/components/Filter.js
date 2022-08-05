import React from "react";
import { useSelector } from "react-redux";

function Filter() {
  const {
    products: { loading, error, data },
  } = useSelector((last) => last);
  console.log(data);
  return (
    <div className="p-3">
      {/* name */}
      <section>
        <p className="font-bold">Name</p>
        <hr className="my-1.5" />
        {data.map((item, index) => {
          return (
            <label className="cursor-pointer flex gap-1.5 my-1">
              <input type="checkbox" className="accent-pink-500" />{" "}
              <span className="line-clamp-1">{item.name}</span>
            </label>
          );
        })}
      </section>
    </div>
  );
}

export default Filter;
