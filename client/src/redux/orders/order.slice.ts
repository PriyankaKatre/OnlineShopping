import { createSlice } from "@reduxjs/toolkit";
import { IOrder, OrderState } from "../../models/IOrder";

const initialState: OrderState= {
    loading: false,
    cartItems: [],
    order : {} as IOrder,
    orderList : [] as IOrder[],
    errorMessage: '',
}

const orderSlice = createSlice({
    name: "Order",
    initialState,
    reducers: {
        addToCart(state, action) {
            const ifItemExisting = state.cartItems.find(cartItem => { return cartItem._id === action.payload._id })
            console.log('ifItemExisting', ifItemExisting)
            if (ifItemExisting) { return state }
            else {
                state.cartItems.push(action.payload)
            }
        },
        incrementProductQty(state, action) {
            let incrementItem = state.cartItems.map(cartItem => {
                if(cartItem._id === action.payload){
                    return {
                        ...cartItem,
                        qty : cartItem.qty + 1
                    }
                }
                return cartItem;
            })
             return {
                ...state,
                cartItems : [...incrementItem]
            }
        },
        decrementProductQty(state, action) {
            console.log('action.payloaddec', action.payload)
            let decrementItem = state.cartItems.map(cartItem => {
                if(cartItem._id === action.payload){
                    return {
                        ...cartItem,
                        qty : (cartItem.qty - 1 > 0) ? cartItem.qty - 1 : 1
                    }
                }
                return cartItem;
            })
             return {
                ...state,
                cartItems : [...decrementItem]
            }
        },
        deleteCartProduct(state, action) {
            const updateCartItems = state.cartItems.filter(cartItem => {
                return cartItem._id !== action.payload
            })
            return {
                ...state,
                cartItems: [...updateCartItems]
            }
        }

    },

})

export const { addToCart, incrementProductQty, decrementProductQty, deleteCartProduct } = orderSlice.actions

export default orderSlice.reducer
