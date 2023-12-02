import React from "react";
import { MONEY } from "../../../../utils/constants";
import { useNavigate,Link } from "react-router-dom";

function Provider({ provider,icon }) {
  console.log(provider);
  console.log('Hell')

  return (
    <div className="bg-white md:w-[50%] sm:w-[80%] lg:w-[30%] xl:w-[20%] ">
      <div className="mx-auto  px-4 sm:px-6 py-4 ">
        <div className="mt-6 ">
          <div key={provider.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:py-0 py-5 h-80 flex justify-center items-center">
              {/* <img
                  src={provider.imageSrc}
                  alt={provider.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                /> */}

              <div className="text-black">{icon}</div>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <a href={provider.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {provider.shopName}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {provider.shopDescription}
                </p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {MONEY.RUPEE} {provider.price}
              </p>
            </div>
          </div>
        </div>
        <div className="cursor-pointer">
        <Link to={{pathname:`/providers/provider/${provider._id}`,state:{
            providerDetails: provider
        }}}>
          <button
            type="submit"
            className=" mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 cursor-pointer"
          >
            See Details
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Provider;
