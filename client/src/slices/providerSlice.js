import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    providers: null,
    loading: false,
}

const providerSlice = createSlice({
    name: 'providers',
    initialState: initialState,
    reducers:{
        setProviders(state,value){
            state.providers = value.payload;
        },
        setLoading(state,value){
            state.loading = value.payload;
        }
    }
})

export const {setProviders,setLoading} = providerSlice.actions;
export default providerSlice.reducer;