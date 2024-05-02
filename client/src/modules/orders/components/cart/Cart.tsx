import React from 'react';
import {useDispatch , useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import { OrderState } from '../../../../models/IOrder';
import { decrementProductQty, deleteCartProduct, incrementProductQty } from '../../../../redux/orders/order.slice';
import { CartUtil } from '../../../../util/CartUtils';

interface IProps{}

let Cart:React.FC<IProps> = () => {
    let dispatch = useDispatch();

    let orderState = useSelector((state : {orders : OrderState}) => {
        return state.orders;
    });

    let {loading , cartItems} = orderState;

    let IncrementQty = (productId : string) => {
        dispatch(incrementProductQty(productId));
    };

    let decrementQty = (productId : string) => {
        dispatch(decrementProductQty(productId));
    };

    let clickDeleteProduct = (productId : string) => {
       dispatch(deleteCartProduct(productId));
    };


    return (
        <React.Fragment>
            <section className="bg-orange-200">
                <p className="text-3xl px-5 md:px-10 lg:px-20 py-3">
                    <i className="fa fa-shopping-cart" /> Your Cart
                </p>
            </section>

            {
                cartItems.length > 0 ?
                    <React.Fragment>
                        <section className="px-5 md:px-10 lg:px-20 m-3 ">
                            <div className="grid grid-cols lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2 bg-white">
                                    <div className="bg-gradient-to-r from-slate-900 to-slate-500 p-5 text-xl">
                                        <p className='text-orange-200'>Your cart Items</p>
                                    </div>
                                    <div className='p-5'>
                                        <table className="min-w-full border-collapse border border-gray-200
                                        bg-orange-200 ">
                                            <thead className='border-b-2'>
                                                <tr className='p-5'>
                                                    <th className="p-2">SNO</th>
                                                    <th className="p-2">Image</th>
                                                    <th className="p-2">Name</th>
                                                    <th className="p-2">Price</th>
                                                    <th className="p-2">Qty</th>
                                                    <th className="p-2">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                cartItems.length > 0 &&
                                                <React.Fragment>
                                                    {
                                                        cartItems.map((cartItem, index) => {
                                                            return (
                                                                <tr key={cartItem._id} className='border-b-2'>
                                                                    <td className="p-2 text-center">{index + 1}</td>
                                                                    <td className="p-2 text-center">
                                                                        <img src={cartItem.image} alt="" width="25" height="50"/>
                                                                    </td>
                                                                    <td className="p-2 text-center">{cartItem.name}</td>
                                                                    <td className="p-2 text-center">&#8377; {cartItem.price.toFixed(2)}</td>
                                                                    <td className="p-2 text-center">
                                                                        <i className="fa fa-minus-circle mx-1" onClick={() => decrementQty(cartItem._id!) } />
                                                                        {cartItem.qty}
                                                                        <i className="fa fa-plus-circle mx-1" onClick={() => IncrementQty(cartItem._id!) }/>
                                                                    </td>
                                                                    <td className="p-2 text-center">
                                                                        <button className="text-white p-2 bg-gradient-to-r
                                                                         from-red-950
                                                                         from-red-900
                                                                         to-red-500 rounded m-5" onClick= {() => clickDeleteProduct(cartItem._id || '')}>Delete</button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </React.Fragment>
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="bg-white">
                                    <div className="bg-gradient-to-r from-slate-900 to-slate-500 p-5 text-xl">
                                        <p className='text-orange-200'>Your Total</p>
                                    </div>
                                    <div className="p-5">
                                        <ul className="bg-orange-200">
                                            <li className="p-2">
                                                Total : <b>&#8377; {CartUtil.calcTotal(cartItems)}</b>
                                            </li>
                                            <li className="p-2">
                                                Tax : <b>&#8377; {CartUtil.calcTax(cartItems)}</b>
                                            </li>
                                            <li className="p-2">
                                                Grand Total : <b>&#8377; {CartUtil.calcGrandTotal(cartItems)}</b>
                                            </li>
                                        </ul>
                                        <div className='pt-5 text-white '>
                                            <Link to={`/orders/checkout`} className="p-2 bg-gradient-to-r from-green-950 from-green-900 to-green-500 rounded m-5">Checkout</Link>
                                            <Link to={`/`} className="p-2 bg-gradient-to-r from-fuchsia-950 via-fuchsia-900 to-fuchsia-700 rounded">Shop More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </React.Fragment> :
                    <React.Fragment>
                        <div className="text-center">
                            <p className="text-2xl mb-4">-------------- Your Cart is Empty --------------</p>
                            <small>Please Shop Here
                                <Link to={'/'} className="ml-4 p-2 bg-gradient-to-r from-green-950 via-green-900 to-green-700 rounded text-white text-sm">Shop Now</Link>
                            </small>
                        </div>
                    </React.Fragment>
            }
        </React.Fragment>
    );
};
export default Cart;
