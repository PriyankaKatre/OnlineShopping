import './App.css'
import {Outlet } from "react-router-dom";
import NavBar from './modules/layout/components/navbar/NavBar';
import Footer from './modules/layout/components/footer/Footer';
import Alert from './modules/layout/components/alert/Alert';
import { useEffect } from 'react';
import { getLoggedInUserInfo } from './redux/user/userThunk';
import { useDispatch } from 'react-redux';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PrivateRoute from './router/PrivateRouter';
import Home from './modules/layout/components/home/Home';
import Cart from './modules/orders/components/cart/Cart';
import CheckOut from './modules/orders/components/checkout/Checkout';
import OrderList from './modules/orders/components/order-list/OrderList';
import OrderSuccess from './modules/orders/components/order-success/OrderSuccess';
import MensCollection from './modules/products/components/mens-collections/MensCollections';
import ProductDetails from './modules/products/components/product-details/ProductDetails';
import UploadProduct from './modules/products/components/upload-product/UploadProduct';
import WomensCollection from './modules/products/components/womens-collection/WomensCollections.tsx'
import KidsCollection from './modules/products/components/kids-collections/KidsCollections.tsx'
import UserLogin from './modules/User/Components/user-login/UserLogin.tsx';
import UserProfile from './modules/User/Components/user-profile/UserProfile.tsx';
import UserRegister from './modules/User/Components/user-register/UserRegister.tsx';

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLoggedInUserInfo() as any)
    },[])

    return (
        <div className='flex flex-col min-h-screen bg-orange-100'>
            <BrowserRouter>
                <NavBar/>
                <Alert/>
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route  path="/products/men" element={<MensCollection/>}/>
                    <Route  path="/products/kids" element={<KidsCollection/>}/>
                    <Route  path="/products/women" element={<WomensCollection/>}/>
                    <Route  path="/products/upload" element={<PrivateRoute><UploadProduct/></PrivateRoute>}/>
                    <Route  path="/products/:productId" element={<ProductDetails/>}/>
                    <Route  path="/orders/cart" element={ <PrivateRoute><Cart/></PrivateRoute>}/>
                    <Route  path="/orders/list" element={<PrivateRoute><OrderList/></PrivateRoute>}/>
                    <Route  path="/orders/checkout" element={<PrivateRoute><CheckOut/></PrivateRoute>}/>
                    <Route  path="/orders/success" element={<PrivateRoute><OrderSuccess/></PrivateRoute>}/>
                    <Route  path="/user/login" element={<UserLogin/>}/>
                    <Route path="/user/register" element={<UserRegister />} />
                    <Route
                        path="/user/profile"
                        element={
                            <PrivateRoute>
                                <UserProfile />
                            </PrivateRoute>
                        }
                    />
                    {/* <PrivateRoute path="/user/profile" element={<UserProfile />} /> */}
                    {/* <Route path="/user/profile" element={<PrivateRoute element={<UserProfile />} />} /> */}
                </Routes>
                <Footer />
            </BrowserRouter>

        {/* 2nd approach Using createBrowserRouter, RouterProvider */}
        {/* <NavBar />
        <Alert />
        <Outlet />
        <Footer /> */}
      </div>
  )
}

export default App
