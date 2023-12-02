import React, { useState, useEffect } from "react";
import OneTapLogo from "../assets/logo/onetap_logo_white.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/operations/authAPI";
import OTPInput from "react-otp-input";

function OTP() {
  const [OTP, setOTP] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!signupData) {
      navigate("/auth");
    }
  }, []);

  const handleVerifyAndSignup = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        OTP,
        navigate
      )
    );
  };

  return (
    <div className="flex page flex-col items-center justify-center w-full h-[91vh] ">
      <div className="inline-block">
        <div className="flex p-1 bg-[#471AA0] rounded-lg w-[50vw]">
          <div className=" flex flex-col justify-center rounded-l-lg px-2 w-[50%] h-[40vh]">
            <div className="">
              <img src={OneTapLogo} className="w-[5vw]" />
            </div>
            <h1 className="pt-3 text-sm text-gray-50">One More Step</h1>
            <h1 className="text-lg text-white mt-3">
              To continue your journey with US
            </h1>
          </div>
          <div className=" flex flex-col bg-white rounded-lg justify-center w-[25vw] p-2">
            <h1 className="pb-2 font-semibold">Enter OTP below</h1>
            <form onSubmit={handleVerifyAndSignup}>
              <OTPInput
                value={OTP}
                onChange={setOTP}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-[15%] border-0 text-white bg-primary-500 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                  />
                )}
                containerStyle={{
                  justifyContent: "space-between",
                  gap: "0 6px",
                }}
              />
              <button
                type="submit"
                className="w-full bg-primary-500 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-white"
              >
                Verify Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OTP;
