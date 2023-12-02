import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getParticularCategory } from "../../../services/operations/categoryAPI";
import { setProviders } from "../../../slices/providerSlice";
import { BsServer } from "react-icons/bs";
import { ACCOUNT_TYPE } from "../../../utils/constants";

import { GiVacuumCleaner } from "react-icons/gi";
import { BsTelephoneInboundFill } from "react-icons/bs";
import { MdHomeRepairService } from "react-icons/md";
import { GiGardeningShears } from "react-icons/gi";
import Provider from "./provider/provider";
import { MdPhotoSizeSelectActual } from "react-icons/md";

function Providers() {
  const location = useLocation();
  const index = location.state?.index;

  let icon;
  switch(index){
    case 1:
      icon = <GiVacuumCleaner size={40}/>
      break;
    case 2:
      icon = <BsTelephoneInboundFill size={40}/>
      break;
    case 3:
      icon = <MdHomeRepairService size={40}/>
      break
    default:
      icon = <GiGardeningShears size={40}/>
      break
  }

  document.title = "OneTap";
  const { id } = useParams();
  const [providers, setProvider] = useState(null);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const categories = useSelector((state) => state.category);

  console.log(user, profile, categories);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const result = await getParticularCategory(id);
        localStorage.setItem(
          "providers",
          JSON.stringify(result.categoryProviders)
        );
        dispatch(setProviders(result.categoryProviders));
        console.log(result);
        setProvider(result);
      } catch (error) {
        console.log("Could not fetch Provider Details");
      }
    })();
    console.log(providers);
  }, []);

  if (providers == null) {
    return (
      <div className="h-[91vh] flex flex-col items-center justify-center">
        <h1 className="pt-3 text-center font-bold text-3xl">Loading...</h1>
      </div>
    );
  }

  if (providers.success == true && providers?.categoryProviders.length == 0) {
    return (
      <div>
        {profile.user.accountType === ACCOUNT_TYPE.PROVIDER ? (
          <div className="bg-primary-500 p-3 m-3 rounded-lg text-white flex justify-between items-center">
            <h1>Create an provider now</h1>
            <button
              className="bg-white p-1 rounded-md"
              onClick={() => navigate("/create-provider")}
            >
              <p className="text-primary-500 text-md">Create Provider</p>
            </button>
          </div>
        ) : null}
        <div className="h-[91vh] flex flex-col items-center justify-center">
          <BsServer className="text-primary-500" size={`10vh`} />
          <h1 className="pt-3 text-center font-bold text-3xl">
            Sorry, No providers in this category
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-around flex-wrap lg:flex-row flex-col px-4">
      {providers?.categoryProviders?.map((provider) => (
          <Provider key={provider.id} provider={provider} icon={<MdPhotoSizeSelectActual size={40}/>}/>
      ))}
    </div>
  );
}

export default Providers;
