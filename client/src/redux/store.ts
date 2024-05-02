import { configureStore } from '@reduxjs/toolkit'
import registerUserSlice from './user/userSlice';
import alertSlice from './user/alertSlice';
import productSlice from './product/product.slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import orderSlice from './orders/order.slice';


export const store = configureStore({
  reducer: {
        users: registerUserSlice,
        alerts: alertSlice,
        products: productSlice,
        orders: orderSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
setupListeners(store.dispatch)
