import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Categories from "../components/core/categories/categories";
import { getCategories } from "../services/operations/categoryAPI";
import Services from "./services";

export const Dashboard = () => {
  document.title = 'OneTap - DashBoard'
  const  user  = JSON.parse(localStorage.getItem('user'));
  console.log(user);

  return (
    <div className="px-3">
      <h1 className="pt-3 font-bold text-3xl">Hello, {user.firstName} {user.lastName}</h1>
      <div className="w-full h-[20px]"></div>
      <Services/>
    </div>
  );
};
