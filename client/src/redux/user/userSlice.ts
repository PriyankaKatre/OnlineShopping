import { createSlice } from "@reduxjs/toolkit";
import { IUser, UserState } from "../../models/IUser";
import { addUserAddress, getLoggedInUserInfo, loginUser, registerUser } from "./userThunk";


const initialState: UserState = {
    loading: false,
    user: {} as IUser,
    errorMessage: '',
    isAuthenticated: false,
    token: '',
    isSuccess: false,
    message: '',
    status:''
}

const extraReducer = (builder: any) => {
  builder
    .addCase(registerUser.pending, (state: UserState) => {
        state.loading = true
    })
    .addCase(registerUser.fulfilled, (state:UserState, action:any) => {
        state.loading = false
        state.user = action.payload
    })
    .addCase(registerUser.rejected, (state:UserState, action:any) => {
        state.errorMessage = action.payload
    })

    //login user
    .addCase(loginUser.pending, (state:UserState) => {
        state.loading = true
    })
    .addCase(loginUser.fulfilled, (state:UserState, action: any) => {
        localStorage.setItem(import.meta.env.VITE_FEATURE_KEY, action.payload.token)
        state.loading = false
        state.token = action.payload.token
        state.isAuthenticated = true
    })
    .addCase(loginUser.rejected, (state:UserState) => {
        localStorage.removeItemItem(import.meta.env.VITE_FEATURE_KEY)
        state.loading = false
        state.token = ''
        state.isAuthenticated = false
    })

    //Get user info

    .addCase(getLoggedInUserInfo.pending, (state:UserState) => {
        state.loading = true
    })
      .addCase(getLoggedInUserInfo.fulfilled, (state: UserState, action: any) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
    })
    .addCase(getLoggedInUserInfo.rejected, (state:UserState, action:any) => {
        state.loading = false
        state.errorMessage = action.payload
        state.isAuthenticated = false
    })

    // Add user address

    .addCase(addUserAddress.pending, (state:UserState) => {
        state.loading = true
    })
      .addCase(addUserAddress.fulfilled, (state: UserState) => {
        state.loading = false
        //state.user = action.payload
        //state.isAuthenticated = true
    })
    .addCase(addUserAddress.rejected, (state:UserState, action:any) => {
        state.loading = false
        state.errorMessage = action.payload
        //state.isAuthenticated = false
    })

};
const registerUserSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        logoutUser(state) {
            localStorage.removeItem(import.meta.env.VITE_FEATURE_KEY)
            state.isAuthenticated=false
        }
    },
    extraReducers: (builder) => {
        extraReducer(builder);
    }

})

export const { logoutUser } = registerUserSlice.actions

export default registerUserSlice.reducer
