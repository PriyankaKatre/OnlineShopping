import { createSlice } from "@reduxjs/toolkit";
import { IProduct, ProductState } from "../../models/IProduct";
import { getKidsProduct, getMensProduct, getProductDetails, getWomensProduct, uploadProduct } from "./productThunk";

const initialState: ProductState = {
    loading: false,
    product: {} as IProduct,
    products: [] as IProduct[],
    errorMessage: '',
}

const extraReducer = (builder: any) => {
  builder
    .addCase(uploadProduct.pending, (state: ProductState) => {
        state.loading = true
    })
    .addCase(uploadProduct.fulfilled, (state:ProductState, action:any) => {
        state.loading = false
    })
    .addCase(uploadProduct.rejected, (state:ProductState, action:any) => {
        state.errorMessage = action.payload
    })

    // Get Men's Products
    .addCase(getMensProduct.pending, (state:ProductState) => {
        state.loading = true
    })
    .addCase(getMensProduct.fulfilled, (state:ProductState, action: any) => {
        state.loading = false
        state.products = action.payload
    })
    .addCase(getMensProduct.rejected, (state:ProductState) => {
        state.loading = false
    })

    // Get Women's Products
    .addCase(getWomensProduct.pending, (state:ProductState) => {
        state.loading = true
    })
    .addCase(getWomensProduct.fulfilled, (state:ProductState, action: any) => {
        state.loading = false
        state.products = action.payload
    })
    .addCase(getWomensProduct.rejected, (state:ProductState) => {
        state.loading = false
    })

    // Get Kid's Products
    .addCase(getKidsProduct.pending, (state:ProductState) => {
        state.loading = true
    })
    .addCase(getKidsProduct.fulfilled, (state:ProductState, action: any) => {
        state.loading = false
        state.products = action.payload
    })
    .addCase(getKidsProduct.rejected, (state:ProductState) => {
        state.loading = false
    })

    // get Product Details

    .addCase(getProductDetails.pending, (state:ProductState) => {
        state.loading = true
    })
    .addCase(getProductDetails.fulfilled, (state:ProductState, action: any) => {
        state.loading = false
        console.log('action.payload', action.payload)
        state.product = action.payload
    })
    .addCase(getProductDetails.rejected, (state:ProductState) => {
        state.loading = false
    })

    //Get user info

    // .addCase(getLoggedInUserInfo.pending, (state:ProductState) => {
    //     state.loading = true
    // })
    //   .addCase(getLoggedInUserInfo.fulfilled, (state: ProductState, action: any) => {
    //       setTokenHeader(action.payload.token)
    //       console.log('tokennnnnnnnnnn', action.payload)
    //     state.loading = false
    //     state.user = action.payload
    //     state.isAuthenticated = true
    // })
    // .addCase(getLoggedInUserInfo.rejected, (state:ProductState, action:any) => {
    //     state.loading = false
    //     state.errorMessage = action.payload
    //     state.isAuthenticated = false
    // })
};
const uploadProductSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        // logoutUser(state) {
        //     localStorage.removeItem(import.meta.env.VITE_FEATURE_KEY)
        //     state.isAuthenticated=false
        // }
        addToCart(state, action) {

        }
    },
    extraReducers: (builder) => {
        extraReducer(builder);
    }

})

//export const { logoutUser } = registerUserSlice.actions

export default uploadProductSlice.reducer
