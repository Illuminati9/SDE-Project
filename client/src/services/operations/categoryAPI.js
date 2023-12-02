import { toast } from 'react-hot-toast';
import { setLoading, setCategories } from '../../slices/categorySlice';
import { apiConnector } from '../apiConnector';
import { categoryEndPoints } from '../apis';

const { GET_ALL_CATEGORIES, GET_CATEGORY } = categoryEndPoints;

export async function getCategories() {
        const toastId = toast.loading('Loading...');
    let result = [];
    try {
        const response = await apiConnector("GET", GET_ALL_CATEGORIES);
        console.log(response.data);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        setCategories(response.data)
        result = response.data;
    } catch (error) {
        console.log("COURSE_DETAILS_API API ERROR............", error);
        result = error.response.data;
        console.log("result", result);
    }
    toast.dismiss(toastId);
    return result;
}

export async function getParticularCategory(id){
    const toastId = toast.loading('Loading...');
    let result = [];
    try{
        const response = await apiConnector('GET',`${GET_CATEGORY}/${id}`);
        console.log(response.data);
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        result = response.data;
    }catch(error){
        console.log("COURSE_DETAILS_API API ERROR............", error);
        result = error.response.data;
        console.log("result", result);
    }
    toast.dismiss(toastId);
    return result;
}