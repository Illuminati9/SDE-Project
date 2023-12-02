import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { MONEY } from "../../../utils/constants";
import { MdPhotoSizeSelectActual } from "react-icons/md";

const ProviderDetails = ({ icon }) => {
  const { id } = useParams();
  console.log(typeof id);

  const { providers } = useSelector((state) => state.provider);

  console.log(providers);

  if (providers == null) {
    return <>No Details found</>;
  }

  let providerDetails = providers.filter((provider) => provider._id == id);

  console.log(providerDetails);

  return (
    <>
        <h1 className="font-bold text-center text-2xl py-5">Provider Details</h1>
      <div className="md:flex md:items-center pb-5">
        <div className="w-full h-64 md:w-1/2 lg:h-96">
          <div className="h-full w-full rounded-md object-cover bg-gray-100 max-w-lg mx-auto flex justify-center items-center" ><MdPhotoSizeSelectActual size={100}/></div>
        </div>
        <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
          <h3 className="text-gray-700 uppercase text-lg">
            {providerDetails[0]?.shopName}
          </h3>
          <h4 className="text-gray-600 text-md">
            {providerDetails[0]?.shopDescription}
          </h4>

          <span className="text-gray-500 font-bold text-lg mt-3">
            {MONEY.RUPEE} {providerDetails[0]?.price}
          </span>
          <hr className="my-3" />
          <h3 className="text-lg font-semibold">Address: </h3>
          <div className="pl-3">
            <p>{providerDetails[0].address.shopNumber}</p>
            <p>{providerDetails[0].address.streetName}</p>
            <p>{providerDetails[0].address.city}</p>
            <p>{providerDetails[0].address.state}</p>
            <p>{providerDetails[0].pincode}</p>
          </div>
          <h3 className="text-lg font-semibold">Phone Number: </h3>
          <p className="pl-3">+91 {providerDetails[0].phoneNumber}</p>
          <div className="flex items-center mt-6">
            <button className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProviderDetails;
