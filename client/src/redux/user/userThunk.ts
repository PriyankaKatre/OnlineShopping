import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 } from "uuid";
import { IAddress, IUser } from "../../models/IUser";
import { setAlert } from "./alertSlice";
import { getToken, isLoggedIn } from "../../util/AuthUtils";
import { setTokenHeader } from "../../util/TokenUtil";

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
// export const customersApi = createApi({
//   reducerPath: 'customersApi',
//     baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}` }),
//     endpoints: (builder) => ({
//         customers: builder.query<any, any>({
//         query: () => `/api/users/`,
//         }),
//     }),
// })

// customersApi.injectEndpoints({
//   endpoints: (builder) => ({
//     customers: builder.query({
//       query: () => '/api/users/',
//     }),
//   }),
//   overrideExisting: false,
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
//     prepareHeaders: (headers: any) => {
//     // If we have a token set in state, let's assume that we should be passing it.
//         if (isLoggedIn()) {
//          let token = getToken();
//         headers.set('x-auth-token', `${token}`);
//         }
//         return headers;
//     },
//   }),
// });


// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
//export const { useCustomersQuery } = customersApi

export const registerUser = createAsyncThunk('registerUser', async (user: IUser, thunkAPI) => {
     let id = v4();
    try {
        //Using Backend Cors config
        //const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/users/register`, user);

        //Using Vite proxy config
        const response = await axios.post(`/api/users/register`, user);
        thunkAPI.dispatch(setAlert({ id, message: response?.data?.msg, status: 'success' }))
        return response.data
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

export const loginUser = createAsyncThunk('loginUser', async (user: IUser, thunkAPI) => {
    let id = v4();
    try {
        //Using Backend Cors config

        //const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/users/login`, user);

        // Using Vite Proxy
        const response = await axios.post(`/api/users/login`, user);
        thunkAPI.dispatch(setAlert({ id, message: response?.data?.msg, status: 'success' }))
        thunkAPI.dispatch(getLoggedInUserInfo())
        return response.data
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

export const getLoggedInUserInfo = createAsyncThunk('getLoggedInUserInfo', async () => {
    try {
        if(isLoggedIn()){
            let token = getToken();
            setTokenHeader(token);
            //Using Backend Cors
            //const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/`);
            // Using Vite Proxy
            const response = await axios.get(`/api/users/`);
            return response.data
        }
    }
    catch (error: any) {
        console.log(error.message)
        // let errorList = error?.response?.data?.errors;
        //     if(errorList){
        //         for(let error of errorList){
        //             await thunkAPI.dispatch(setAlert({ id, message: error?.msg, status: 'error' }))
        //         }
        //     }
    }
})
export const addUserAddress = createAsyncThunk('addUserAddress', async (address:IAddress, thunkAPI) => {
    try {
         let id = v4();
        if(isLoggedIn()){
            let token = getToken();
            setTokenHeader(token);
            //Using Backend Cors
            //const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/`);
            // Using Vite Proxy
            const response = await axios.post(`/api/users/address`, address);
            thunkAPI.dispatch(setAlert({ id, message: response?.data?.msg, status: 'success' }))
            return response.data
        }
    }
    catch (error: any) {
        console.log(error.message)
        // let errorList = error?.response?.data?.errors;
        //     if(errorList){
        //         for(let error of errorList){
        //             await thunkAPI.dispatch(setAlert({ id, message: error?.msg, status: 'error' }))
        //         }
        //     }
    }
})

