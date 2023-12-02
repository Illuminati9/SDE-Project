import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { createProvider } from "../../../../services/operations/providerAPI";

function NewProvider() {
  document.title = "OneTap - Create Provider";
  const { categories } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  if(categories==null){
    categories = localStorage.getItem('categories')
  }
  console.log(categories);
  console.log(user);
  const [providerDetails, setProviderDetails] = useState({
    shopName: "",
    shopDescription: "",
    price: "",
    phoneNumber: "",
    category: categories[0].name,
    shopNumber: "",
    streetName: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    if (user.accountType !== ACCOUNT_TYPE.PROVIDER) {
      navigate("/dashboard");
    }

  }, []);

  const handleInputChange = (e) => {
    setProviderDetails((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const result = await createProvider(providerDetails,user.token,navigate)
      console.log('Added Provider successfully');
    } catch (error) {
      console.log('Something went wrong, couldn\'t add provider details');
    }
  }

  return (
    <div className="m-3">
      <h1 className="font-semibold text-center mb-5 text-xl">
        Create a Provider Now to Earn
      </h1>
      <div className="flex justify-center">
        <form className="bg-primary-500 p-3 rounded-lg text-white w-[50vw] flex flex-col">
          <div className="flex justify-center items-center m-1">
            <label htmlFor="shopName" className="w-[25vw]">
              Service Name
            </label>
            <input
              className="w-[100%] p-1 rounded-sm text-black"
              type="text"
              name="shopName"
              id="shopName"
              placeholder="Name of the Service"
              onChange={handleInputChange}
            />
            <br />
          </div>
          <div className="flex justify-center m-1">
            <label htmlFor="shopDescription" className="w-[25vw]">
              Service Description
            </label>
            <input type="text"
              name="shopDescription"
              rows={3}
              className="w-[100%] p-1 rounded-sm text-black"
              placeholder="Description"
              onChange={handleInputChange}
            />
            <br />
          </div>
          <div className="flex justify-center m-1">
            <label htmlFor="price" className="w-[25vw]">
              Price for the service
            </label>
            <input
              className="w-[100%] p-1 rounded-sm text-black"
              type="text"
              name="price"
              id="price"
              maxLength={10}
              placeholder="Price for the service"
              onChange={handleInputChange}
            />
            <br />
          </div>
          <div className="flex justify-center m-1">
            <label htmlFor="phoneNumber" className="w-[25vw]">
              Phone Number
            </label>
            <input
              className="w-[100%] p-1 rounded-sm text-black"
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number of the owner for the reference"
              maxLength={10}
              onChange={handleInputChange}
            />
            <br />
          </div>
          <div className="flex justify-center m-1">
            <label htmlFor="category" className="w-[25vw]">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={providerDetails.category}
              onChange={handleInputChange}
              className="text-black w-[100%] p-1 rounded-sm"
            >
              {categories.map((category) => (
                <option
                  value={category._id}
                  key={category._id}
                  className="text-black"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center m-1">
            <label htmlFor="shopNumber" className="w-[25vw]">
              Shop Number
            </label>
            <input
              className="w-[100%] p-1 rounded-sm text-black"
              type="text"
              name="shopNumber"
              id="shopNumber"
              placeholder="Address of the shop"
              onChange={handleInputChange}
            />
            <br />
          </div>
          <div className="flex justify-center items-center m-1">
            <label htmlFor="streetName" className="w-[25vw]">
              Street Name
            </label>
            <input
              className="w-[100%] p-1 rounded-sm text-black"
              type="text"
              name="streetName"
              id="streetName"
              placeholder="Street Name"
              onChange={handleInputChange}
            />
            <br />
          </div>
          <div className="flex justify-center items-center m-1">
            <label htmlFor="city" className="w-[25vw]">
              City
            </label>
            <input
              className="w-[100%] p-1 rounded-sm text-black"
              type="text"
              name="city"
              id="city"
              placeholder="City"
              onChange={handleInputChange}
            />
            <br />
          </div>
          <div className="flex justify-center items-center m-1">
            <label htmlFor="state" className="w-[25vw]">
              State
            </label>
            <input
              className="w-[100%] p-1 rounded-sm text-black"
              type="text"
              name="state"
              id="state"
              placeholder="State"
              onChange={handleInputChange}
            />
            <br />
          </div>
          <div className="flex justify-center items-center m-1">
            <label htmlFor="pincode" className="w-[25vw]">
              Pincode
            </label>
            <input
              className="w-[100%] p-1 rounded-sm text-black"
              type="text"
              name="pincode"
              id="pincode"
              placeholder="Pin Code"
              maxLength={6}
              onChange={handleInputChange}
            />
            <br />
          </div>
          <div className="flex justify-center mt-2">
            <button onClick={handleSubmit} className="bg-white p-1 rounded-sm text-primary-500 w-[50%]">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProvider;
