import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 } from "uuid";
import { setAlert } from "../user/alertSlice";
import { IProduct } from "../../models/IProduct";
import { getToken, isLoggedIn } from "../../util/AuthUtils";
import { setTokenHeader } from "../../util/TokenUtil";

export const uploadProduct = createAsyncThunk('uploadProduct', async (product: IProduct, thunkAPI) => {
    let id = v4();
    try {
        if (isLoggedIn()) {
            let token = getToken();
            setTokenHeader(token);
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/products/upload`, product,  { responseType: 'arraybuffer' });
            thunkAPI.dispatch(setAlert({ id, message: response?.data?.msg, status: 'success' }))
            return response.data
        }
    }
    catch (error:any) {
        let errorList = error?.response?.data?.errors;
            if(errorList){
                for(let error of errorList){
                    await thunkAPI.dispatch(setAlert({ id, message: error?.msg, status: 'error' }))
                }
            }
    }
})

export const getMensProduct = createAsyncThunk('getMensProduct', async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/men`);
        console.log('response', response)
        return response.data
    }
    catch (error:any) {
        let errorList  = error?.response?.data?.errors;
        console.log(errorList)
        // if(errorList){errorList
        //     for(let error of errorList){
        //         await thunkAPI.dispatch(setAlert({ id, message: error?.msg, status: 'error' }))
        //     }
        // }
    }
})

export const getWomensProduct = createAsyncThunk('getWomensProduct', async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/women`);
        console.log('response', response)
        return response.data
    }
    catch (error:any) {
        let errorList  = error?.response?.data?.errors;
        console.log(errorList)
        // if(errorList){errorList
        //     for(let error of errorList){
        //         await thunkAPI.dispatch(setAlert({ id, message: error?.msg, status: 'error' }))
        //     }
        // }
    }
})

export const getKidsProduct = createAsyncThunk('getKidsProduct', async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/kids`);
        console.log('response', response)
        return response.data
    }
    catch (error:any) {
        let errorList  = error?.response?.data?.errors;
        console.log(errorList)
        // if(errorList){errorList
        //     for(let error of errorList){
        //         await thunkAPI.dispatch(setAlert({ id, message: error?.msg, status: 'error' }))
        //     }
        // }
    }
})
export const getProductDetails = createAsyncThunk('getProductDetails', async (productId: string) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/products/${productId}`);
        console.log('response', response)
        return response.data
    }
    catch (error:any) {
        let errorList  = error?.response?.data?.errors;
        console.log(errorList)
        // if(errorList){errorList
        //     for(let error of errorList){
        //         await thunkAPI.dispatch(setAlert({ id, message: error?.msg, status: 'error' }))
        //     }
        // }
    }
})
