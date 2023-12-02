import React from "react";
import { Link } from "react-router-dom";

function Category(props) {
  const category = props.category;
  return (
    <div className="w-[48%] p-3 mb-1 flex justify-center">
      <div className="inline-block">
        <Link
          to={{
            pathname: `/providers/${category._id}`,
            state:{
              index: props.index
            }
          }}
        >
          <div className="flex flex-col justify-center border border-black rounded-md items-center h-[10rem] w-[300px]">
            <div>{props.icon}</div>
            <div className="font-semibold text-center">{category.name}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Category;
