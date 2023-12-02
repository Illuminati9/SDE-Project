import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import profileReducer from '../slices/profileSlice';
import categoryReducer from '../slices/categorySlice';
import providerSlice from "../slices/providerSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    category: categoryReducer,
    provider: providerSlice
});

export default rootReducer;
