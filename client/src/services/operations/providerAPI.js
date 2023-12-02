import { toast } from 'react-hot-toast'
import { setLoading, setProviders } from '../../slices/providerSlice'
import { apiConnector } from '../apiConnector'
import { providerEndPoints } from '../apis'

const { GET_ALL_PROVIDERS, GET_PROVIDER, ADD_PROVIDER } = providerEndPoints;

export async function getProvider(id){
    try {
        const provider = await apiConnector('GET',GET_PROVIDER+'/'+id);
        console.log(provider);
        return provider.data;
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}

export function getProviders() {
    return async (dispatch) => {
        const toastId = toast.loading('Loading..');
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("GET", GET_ALL_PROVIDERS);

            console.log(response.data);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success('Providers Fetched Successfully')
            dispatch(setProviders(response.data.providers));
            localStorage.setItem('providers', JSON.stringify(response.data.providers));
        } catch (error) {
            toast.error('Something went wrong');
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

export async function createProvider(data, token,navigate) {
    let result = null;
    const toastId = toast.loading('Loading...');
    try {
        let { shopName, shopDescription, price, phoneNumber, category, shopNumber, streetName, city, state, pincode } = data;
        pincode = parseInt(pincode);
        price = parseInt(price);
        console.log("printing data ", data);
        console.log("printing token", token);
        result = await apiConnector("POST", ADD_PROVIDER, {
             shopName,
             shopDescription, 
             price,
              phoneNumber,
               category, 
               shopNumber,
                streetName, 
                city, 
                state,
                 pincode }, {
            Authorization: `Bearer ${token}`
        })
        if (!result?.data?.success) {
            throw new Error("Could Not Add Provider Details");
        }
        toast.success("Provider Details Added Successfully");
        navigate('/dashboard')
    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}