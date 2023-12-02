const BASE_URL = process.env.REACT_APP_BASE_URL;
const AUTH_URL = BASE_URL + '/auth';

export const endpoints = {
    SENDOTP_API: AUTH_URL + "/sendOTP",
    SIGNUP_API: AUTH_URL + "/signup",
    LOGIN_API: AUTH_URL + "/signin",
    FORGET_PASSWORD_API: AUTH_URL + '/forgetPassword',
    CHANGE_PASSWORD_API: AUTH_URL + '/changePassword'
}


const PROVIDER_URL = BASE_URL + '/provides';

export const categoryEndPoints = {
    GET_ALL_CATEGORIES: PROVIDER_URL + "/showAllCategories",
    GET_CATEGORY: PROVIDER_URL + '/getCategory'
};

export const providerEndPoints = {
    ADD_PROVIDER: PROVIDER_URL + "/createProvider",
    GET_ALL_PROVIDERS: PROVIDER_URL + '/getAllProviders',
    GET_PROVIDER: PROVIDER_URL+'/getProviderDetails'
}