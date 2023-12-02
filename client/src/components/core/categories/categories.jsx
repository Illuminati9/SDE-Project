import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../services/operations/categoryAPI";
import Category from "./category/category";
import { GiVacuumCleaner } from "react-icons/gi";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { MdHomeRepairService } from "react-icons/md";
import { GiGardeningShears } from "react-icons/gi";
import { Link } from "react-router-dom";

function Categories({ categories }) {
  const icons = [
    <GiVacuumCleaner size={40}/>,
    <BsTelephoneInboundFill size={40}/>,
    <MdHomeRepairService size={40}/>,
    <GiGardeningShears size={40}/>,
  ];

  return (
    <div className="mx-auto md:flex md:justify-around flex-wrap">
      {categories.map((category, key) => (
          <Category key={key} category={category} icon={icons[key]} index={key} />
      ))}
    </div>
  );
}

export default Categories;
