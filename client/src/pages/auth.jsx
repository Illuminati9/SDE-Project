import React, { useEffect } from "react";
import OneTapLogo from "../assets/logo/onetap_logo_white.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../utils/constants";
import { toast } from "react-hot-toast";
import { sendOtp } from "../services/operations/authAPI";
import { setSignupData } from "../slices/authSlice";
import { login } from "../services/operations/authAPI";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state)=>state.auth);

  useEffect(()=>{
    if(token!==null){
      navigate('/dashboard');
    }
  },[])

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.CONSUMER);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      handleOnSignin();
    } else {
      handleOnSignUp();
    }
  };

  const handleOnSignin = () => {
    dispatch(login(email, password, navigate));
  };

  const handleOnSignUp = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    };
    dispatch(setSignupData(signupData));

    dispatch(sendOtp(formData.email, navigate));

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.CONSUMER);
  };

  const handleUserTypeChange = (e) => {
    setAccountType(e.target.value);
  };

  useEffect(() => {
    document.title = "OneTap - Auth";
  });
  return (
    <div className="flex page flex-col items-center justify-center w-full h-[91vh] ">
      <div className="inline-block">
        <div className="flex p-1 bg-[#471AA0] rounded-lg w-[50vw]">
          <div className=" flex flex-col justify-center rounded-l-lg px-2 w-[50%] h-[40vh]">
            <div className="">
              <img src={OneTapLogo} className="w-[5vw]" />
            </div>
            <h1 className="pt-3 text-sm text-gray-50">Welcome Back</h1>
            <h1 className="text-lg text-white mt-3">
              {isLogin ? "Login" : "Signup"} with your account
            </h1>
          </div>
          <div className=" flex flex-col bg-white rounded-lg justify-center w-[25vw] p-2">
            <h1 className="font-semibold text-black my-3 text-center">
              Start Your Journey with Us Now
            </h1>
            <form action="" className="flex flex-col m-3">
              {!isLogin ? (
                <>
                  <div className="w-full flex justify-around pb-1">
                    <label>
                      <input
                        type="radio"
                        name="accountType"
                        value={ACCOUNT_TYPE.CONSUMER}
                        checked={accountType === "Consumer"}
                        onChange={handleUserTypeChange}
                      />{" "}
                      Consumer
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="accountType"
                        value={ACCOUNT_TYPE.PROVIDER}
                        checked={accountType === "Provider"}
                        onChange={handleUserTypeChange}
                      />{" "}
                      Provider
                    </label>
                  </div>
                  <div className="flex justify-around">
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={handleOnChange}
                      placeholder="First Name"
                      className="mr-1 w-[50%] h-8 px-1 rounded-md border-2 border-gray-50 focus:border-gray-100"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={handleOnChange}
                      placeholder="Last Name"
                      className="ml-1 w-[50%] h-8 px-1 rounded-md border-2 border-gray-50"
                    />
                  </div>
                </>
              ) : null}
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleOnChange}
                className="my-1 h-8 px-1 rounded-md border-2 border-gray-50 focus:border-gray-100"
              />
              <input
                type="password"
                name="password"
                onChange={handleOnChange}
                value={password}
                placeholder="Password"
                className="my-1 h-8 px-1 rounded-md border-2 border-gray-50"
              />
              {!isLogin ? (
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Confirm Password"
                  className="my-1 h-8 px-1 rounded-md border-2 border-gray-50"
                />
              ) : null}
              {isLogin ? (
                <Link className="text-end text-[#471AA0] text-sm">
                  Forget Password?
                </Link>
              ) : null}
              <button
                type="button"
                onClick={handleOnSubmit}
                className="text-white my-2 bg-[#471AA0] hover:bg-[#251aa0] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-[#471AA0] dark:hover:bg-[#251aa0] dark:focus:ring-blue-800"
              >
                Sign {isLogin ? "In" : "Up"}
              </button>
              <div className="flex justify-center text-sm">
                <span className="text-center text-sm">
                  {isLogin ? "New to OneTap? " : "Already have an account? "}
                </span>
                <Link
                  className="ml-1 text-[#471AA0]"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Register Now!!" : "Login Now!!"}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
