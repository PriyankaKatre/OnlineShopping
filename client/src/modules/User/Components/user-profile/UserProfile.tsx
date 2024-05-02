import React, {useEffect, useState} from 'react';

import {useDispatch , useSelector} from "react-redux";
import Spinner from "../../../layout/components/spinner/Spinner";
import { UserState } from '../../../../models/IUser';
import { addUserAddress } from '../../../../redux/user/userThunk';
import { AppDispatch } from '../../../../redux/store';
import { removeAlert } from '../../../../redux/user/alertSlice';
import { v4 } from 'uuid';


interface IProps{}

let UserProfile:React.FC<IProps> = () => {
    let dispatch = useDispatch<AppDispatch>();

    let [enableState , setEnableState] = useState({
        isEnable : false
    });

    let [addressState , setAddressState] = useState({
        mobile : '',
        flat : '',
        street : '',
        landmark : '',
        city : '',
        state : '',
        country : '',
        pin : ''
    });

    let changeAddressInput = (event : React.ChangeEvent<HTMLInputElement>) => {
        setAddressState({
            ...addressState,
            [event.target.name] : event.target.value
        });
    };

    let switchEnableState = (event : React.ChangeEvent<HTMLInputElement>) => {
        setEnableState({
            isEnable: event.target.checked
        })
    };

    // read the user data from Redux Store
    let userState:UserState = useSelector((state : {users : UserState}) => {
        return state.users;
    });

    let { loading, user } = userState;

    console.log('user', user)

    // update the user data from store to local state
    useEffect(() => {
        setAddressState({
            ...addressState,
            mobile : user && user.address ? user.address.mobile : '',
            flat : user && user.address ? user.address.flat : '',
            street : user && user.address ? user.address.street : '',
            landmark : user && user.address ? user.address.landmark : '',
            city : user && user.address ? user.address.city : '',
            state : user && user.address ? user.address.state : '',
            country : user && user.address ? user.address.country : '',
            pin : user && user.address ? user.address.pin : ''
        })
    }, [user]);

    let submitUpdateAddress = (event: React.FormEvent<HTMLFormElement>) => {
        let id = v4();
        event.preventDefault();
        dispatch(addUserAddress(addressState));
        setEnableState({
            isEnable: false
        });
        setTimeout(() => {
            dispatch(removeAlert(id));
        }, 3000);
    };

    return (
        <React.Fragment>
            <section className="bg-orange-200">
                <p className="text-3xl px-5 md:px-10 lg:px-20 py-3">Your Profile</p>
            </section>
            {
                loading ? <Spinner/> :
                    <React.Fragment>
                        {
                            Object.keys(user).length > 0 &&
                            <section className="px-5 md:px-10 lg:px-20 m-3 ">
                                <div className="grid grid-cols lg:grid-cols-3 gap-4">
                                    <div className="">
                                        <img src={user.avatar} alt="" className="img-fluid rounded-circle profile-img"/>
                                    </div>
                                    <div className="lg:col-span-2">
                                        <div className="bg-white">
                                            <div className=" bg-gradient-to-r from-slate-900 to-slate-500 p-5 text-xl">
                                                <p className='text-orange-200'>Your Profile</p>
                                            </div>
                                            <div className="p-5">
                                                <ul className="bg-orange-200 p-4">
                                                    <li className="">
                                                        NAME : {user.name}
                                                    </li>
                                                    <li className="list-group-item">
                                                        Email : {user.email}
                                                    </li>
                                                    <li className="list-group-item">
                                                        Mobile : {user.address?.mobile}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="mt-3 relative">
                                            <div className="bg-gradient-to-r from-slate-900 to-slate-500 p-5 text-xl">
                                                <p className='text-orange-200'>Billing Address</p>
                                            </div>
                                            <div className="absolute top-5 right-20">
                                                <span className="text-white">
                                                    <label className="inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" value="" className="sr-only peer" onChange={switchEnableState}/>
                                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                                        <span className="ms-3 text-sm font-medium text-orange-200">Enable Address</span>
                                                    </label>
                                                </span>
                                            </div>
                                            <div className="bg-white">
                                                {
                                                    !enableState.isEnable &&
                                                    <ul className="p-5">
                                                        <li className="bg-orange-200 p-4">
                                                            <small>Mobile : {addressState.mobile}</small><br/>
                                                            <small>Flat : {addressState.flat}</small><br/>
                                                            <small>Street : {addressState.street}</small><br/>
                                                            <small>Landmark : {addressState.landmark}</small><br/>
                                                            <small>City : {addressState.city}</small><br/>
                                                            <small>State : {addressState.state}</small><br/>
                                                            <small>Country : {addressState.country}</small><br/>
                                                            <small>Pin : {addressState.pin}</small><br/>
                                                        </li>
                                                    </ul>
                                                }
                                                {
                                                        enableState.isEnable &&
                                                        <div className='p-5'>
                                                        <form onSubmit={submitUpdateAddress} className="bg-orange-200 p-4">
                                                            <div className="mb-3 grid grid-cols-8">
                                                                <span className="bg-zinc-600 text-brown p-2 text-orange-200">Mobile</span>
                                                                <input
                                                                    autoFocus
                                                                    required
                                                                    name="mobile"
                                                                    value={addressState.mobile}
                                                                    onChange={changeAddressInput}
                                                                    type="text" className="col-span-7 p-2"/>
                                                            </div>
                                                            <div className="mb-3 grid grid-cols-8">
                                                                <span className="bg-zinc-600 text-brown p-2 text-orange-200">Flat</span>
                                                                <input
                                                                    required
                                                                    name="flat"
                                                                    value={addressState.flat}
                                                                    onChange={changeAddressInput}
                                                                    type="text" className="col-span-7 p-2"/>
                                                            </div>
                                                            <div className="mb-3 grid grid-cols-8">
                                                                <span className="bg-zinc-600 text-brown p-2 text-orange-200">Street</span>
                                                                <input
                                                                    required
                                                                    name="street"
                                                                    value={addressState.street}
                                                                    onChange={changeAddressInput}
                                                                    type="text" className="col-span-7 p-2"/>
                                                            </div>
                                                            <div className="mb-3 grid grid-cols-8">
                                                                <span className="bg-zinc-600 text-brown p-2 text-orange-200">Landmark</span>
                                                                <input
                                                                    required
                                                                    name="landmark"
                                                                    value={addressState.landmark}
                                                                    onChange={changeAddressInput}
                                                                    type="text" className="col-span-7 p-2"/>
                                                            </div>
                                                            <div className="mb-3 grid grid-cols-8">
                                                                <span className="bg-zinc-600 text-brown p-2 text-orange-200">City</span>
                                                                <input
                                                                    required
                                                                    name="city"
                                                                    value={addressState.city}
                                                                    onChange={changeAddressInput}
                                                                    type="text" className="col-span-7 p-2"/>
                                                            </div>
                                                            <div className="mb-3 grid grid-cols-8">
                                                                <span className="bg-zinc-600 text-brown p-2 text-orange-200">State</span>
                                                                <input
                                                                    required
                                                                    name="state"
                                                                    value={addressState.state}
                                                                    onChange={changeAddressInput}
                                                                    type="text" className="col-span-7 p-2"/>
                                                            </div>
                                                            <div className="mb-3 grid grid-cols-8">
                                                                <span className="bg-zinc-600 text-brown p-2 text-orange-200">Country</span>
                                                                <input
                                                                    required
                                                                    name="country"
                                                                    value={addressState.country}
                                                                    onChange={changeAddressInput}
                                                                    type="text" className="col-span-7 p-2"/>
                                                            </div>
                                                            <div className="mb-3 grid grid-cols-8">
                                                                <span className="bg-zinc-600 text-brown p-2 text-orange-200">Pin</span>
                                                                <input
                                                                    required
                                                                    name="pin"
                                                                    value={addressState.pin}
                                                                    onChange={changeAddressInput}
                                                                    type="text" className="col-span-7 p-2"/>
                                                            </div>
                                                            <div className="mb-3 grid grid-cols-8">
                                                                <input type="submit" className="p-2 text-orange-200 bg-gradient-to-r from-zinc-950 from-zinc-900 to-zinc-500 rounded" value="Update"/>
                                                            </div>
                                                            </form>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{marginBottom : '150px'}}/>
                            </section>
                        }
                    </React.Fragment>
            }
        </React.Fragment>
    );
};
export default UserProfile;
