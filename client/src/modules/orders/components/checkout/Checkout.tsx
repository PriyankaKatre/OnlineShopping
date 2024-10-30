import React from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import { UserState } from '../../../../models/IUser';
import { OrderState } from '../../../../models/IOrder';
import { CartUtil } from '../../../../util/CartUtils';

interface IProps{}

const CheckOut:React.FC<IProps> = () => {

    const userState:UserState = useSelector((state : {users : UserState}) => {
        return state.users;
    });


    const {user} = userState;

    const orderState:OrderState = useSelector((state : {orders : OrderState}) => {
        return state.orders;
    });

    const {cartItems} = orderState;

    // Accept the Stripe payment form
    // let handleToken = async (token?, addresses?) => {
    //     const body = {
    //         product : {
    //             name : `${cartItems[0].name} & Others`,
    //             amount : CartUtil.calcGrandTotal(cartItems) * 100,
    //             currency : 'INR',
    //         },
    //         customer : {
    //             name : addresses.billing_name,
    //             address : {
    //                 line1: addresses.billing_address_line1,
    //                 postal_code: addresses.billing_address_zip,
    //                 city: addresses.billing_address_city,
    //                 state: addresses.billing_address_state,
    //                 country: addresses.billing_address_country,
    //             }
    //         },
    //         description : "Shopping from BrainsKart",
    //         email : token.email,
    //         source : token.id,
    //         stripeTokenType : token.type
    //     };

    //     // Order Items
    //     let items = cartItems.map(cartItem => {
    //         return {
    //             name : cartItem.name,
    //             brand : cartItem.brand,
    //             price : cartItem.price,
    //             qty : cartItem.qty
    //         }
    //     })
    //     let order = {
    //         items : items,
    //         tax : CartUtil.calcTax(cartItems),
    //         total : CartUtil.calcTotal(cartItems)
    //     };

    //     // dispatch action
    //     dispatch(orderActions.makeStripePayment(body,history, order));
    // }


    return (
        <React.Fragment>
            <section className="bg-orange-200">
                <p className="text-3xl px-5 md:px-10 lg:px-20 py-3">
                    <i className="fa fa-shopping-cart" /> Checkout Items
                </p>
            </section>
            <section className="px-5 md:px-10 lg:px-20 m-3 ">
                <div className="grid grid-cols lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 bg-white relative">
                        <div className="bg-gradient-to-r from-slate-900 to-slate-500 p-5 text-xl">
                            <p className='text-orange-200'>Your cart Items</p>
                        </div>
                        <div className="absolute top-4 right-10">
                            <Link to={`/user/profile`} className="p-2 bg-orange-200">Update Address</Link>
                        </div>
                        <div className="p-5">
                            {
                                //user && user.address &&
                                <ul className="bg-orange-200 p-4">
                                    <li>
                                        <small>Mobile : { user?.address?.mobile || ''}</small><br/>
                                        <small>Flat : { user?.address?.flat || ''}</small><br/>
                                        <small>Street : { user?.address?.street || ''}</small><br/>
                                        <small>Landmark : { user?.address?.landmark || ''}</small><br/>
                                        <small>City : { user?.address?.city || ''}</small><br/>
                                        <small>State : { user?.address?.state || ''}</small><br/>
                                        <small>Country : { user?.address?.country || ''}</small><br/>
                                        <small>Pin : { user?.address?.pin || ''}</small><br/>
                                    </li>
                                </ul>
                            }
                        </div>
                        <div className="mt-3">
                            <div className="bg-gradient-to-r from-slate-900 to-slate-500 p-5 text-xl">
                                <p className='text-orange-200'>Payment Details</p>
                            </div>
                            <div className="bg-white">
                                <form className='p-4'>
                                    <div>
                                        <input type="radio" name="flexRadioDefault"
                                                id="flexRadioDefault1"/>
                                            <label className="pl-4" htmlFor="flexRadioDefault1">
                                                Cash On Delivery
                                            </label>
                                    </div>
                                    <div>
                                        <input type="radio" name="flexRadioDefault"
                                                id="flexRadioDefault2"/>
                                            <label className="pl-4" htmlFor="flexRadioDefault2">
                                                Credit Card Payment
                                            </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-gradient-to-r from-slate-900 to-slate-500 p-5 text-xl">
                            <p className='text-orange-200'>Your Cart</p>
                        </div>
                        <div className="bg-white">
                            <ul className="p-4">
                                {
                                    cartItems.length > 0 &&
                                        cartItems.map(cartItem => {
                                           return (
                                                <li key={cartItem._id} className="grid grid-cols-5 border">
                                                    <div className="">
                                                        <img src={cartItem.image} alt="" width="50" height="75"/>
                                                    </div>
                                                    <div className="col-span-4">
                                                        <small>{cartItem.name}</small><br/>
                                                        <small><b>&#8377; {cartItem.price.toFixed(2)}</b></small><br/>
                                                        <small>Qty : {cartItem.qty}</small>
                                                    </div>
                                                </li>
                                           )
                                        })
                                    }
                            </ul>
                            <div className="p-5">
                                <ul className="bg-orange-200 ">
                                    <li className='border p-2'>
                                        Total : <b>&#8377; {CartUtil.calcTotal(cartItems).toFixed(2)}</b>
                                    </li>
                                    <li className='border p-2'>
                                        Tax : <b>&#8377; {CartUtil.calcTax(cartItems).toFixed(2)}</b>
                                    </li>
                                    <li className='border p-2'>
                                        Grand Total : <b>&#8377; {CartUtil.calcGrandTotal(cartItems).toFixed(2)}</b>
                                    </li>
                                </ul>
                            </div>
                            {/*PAY with Card Button*/}
                            {/* <StripeCheckout
                                token={handleToken}
                                billingAddress
                                stripeKey={stripeAPIKey}
                                name="Stripe Payment"
                                amount={CartUtil.calcGrandTotal(cartItems) * 100}
                                description="Payments with Stripe"
                                currency="INR"
                                zipCode
                                image={stripeImage}
                                panelLabel="Pay for {{amount}}">
                            </StripeCheckout> */}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};
export default CheckOut;
