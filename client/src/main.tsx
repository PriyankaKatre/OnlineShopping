import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MensCollections from './modules/products/components/mens-collections/MensCollections.tsx'
import WomensCollections from './modules/products/components/womens-collection/WomensCollections.tsx'
import KidsCollections from './modules/products/components/kids-collections/KidsCollections.tsx'
import UploadProduct from './modules/products/components/upload-product/UploadProduct.tsx'
import OrderList from './modules/orders/components/order-list/OrderList.tsx'
import UserLogin from './modules/User/Components/user-login/UserLogin.tsx'
import UserRegister from './modules/User/Components/user-register/UserRegister.tsx'
import Home from './modules/layout/components/home/Home.tsx'
import Cart from './modules/orders/components/cart/Cart.tsx'
import ProductDetails from './modules/products/components/product-details/ProductDetails.tsx'
import UserProfile from './modules/User/Components/user-profile/UserProfile.tsx'
import Checkout from './modules/orders/components/checkout/Checkout.tsx'
import PrivateRoute from './router/PrivateRouter.tsx'


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: 'this is a error message',
    children: [
    //   {
    //     path: "/about", // parentPath/{path} => localhost:1244/about
    //     element: (
    //       <Suspense fallback={<h1>Loading....</h1>}>
    //         <About />
    //       </Suspense>
    //     ),
    //     children: [
    //       {
    //         path: "profile", // parentPath/{path} => localhost:1244/about/profile
    //         element: <Profile />,
    //       },
    //     ],
        //   },
    {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/men",
        element: <MensCollections />,
      },
      {
        path: "/products/women",
        element: <WomensCollections />,
      },
      {
        path: "/products/kids",
        element: <KidsCollections />,
      },
      {
        path: "/products/upload",
          element:
              <PrivateRoute>
                    <UploadProduct />
              </PrivateRoute >
      },
      {
        path: "/products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "/orders/list",
        element: <OrderList />,
        },
      {
        path: "/orders/cart",
        element: <Cart />,
      },
      {
        path: "/orders/checkout",
        element: <Checkout />,
      },
      {
        path: "/user/login",
        element: <UserLogin />,
      },
      {
        path: "/user/register",
        element: <UserRegister />,
        },
      {
        path: "/user/profile",
        element: <UserProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
            //Second approach
            {/* <RouterProvider router={appRouter} >
            </RouterProvider> */}
        </Provider>
  </React.StrictMode>,
)
