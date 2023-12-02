import React,{useEffect, useState} from "react";
import Categories from "../components/core/categories/categories";
import { getCategories } from "../services/operations/categoryAPI";
import { setCategories } from "../slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import Error from "./error";

function Services() {
  const dispatch = useDispatch();
  let [categories,setCategory]=useState(null)

  useEffect(() => {
    (async () => {
      try {
        const result = await getCategories();
        localStorage.setItem('categories',JSON.stringify(result.allCategory));
        dispatch(setCategories(result.allCategory));
        setCategory(result.allCategory);
      } catch (error) {
        console.log("Could not fetch Category Details");
      }
    })();
  }, []);

  if(categories==null){
    return <div>
      Loading...
    </div>
  }

  return (
    <div className="px-3">
      <div className="w-full h-[20px]"></div>
      <h1 className="font-bold text-primary-500 text-2xl">
        Explore Categories below
      </h1>
      <Categories categories={categories} />
    </div>
  );
}

export default Services;
