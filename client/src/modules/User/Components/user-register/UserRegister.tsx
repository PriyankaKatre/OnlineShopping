import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import brand from "../../../../assets/img/brand.png";
import { useDispatch } from 'react-redux';
import { removeAlert } from '../../../../redux/user/alertSlice';
import {v4} from 'uuid';
import { unwrapResult } from '@reduxjs/toolkit';
import { registerUser } from '../../../../redux/user/userThunk';

interface IUser {
    name: string,
    email: string,
    password: string
}

interface IUserError {
    nameError: string,
    emailError: string,
    passwordError: string
}

function UserRegister() {
    let id = v4();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(true)

   //Approach 1st
    const [userState, setUserState] = useState<IUser>({
        name: '',
        email: '',
        password: ''
    })

    const [userErrorState, setUserErrorState] = useState<IUserError>({
        nameError: '',
        emailError: '',
        passwordError: ''
    })

    const { name, email, password } = userState;
    const { nameError, emailError, passwordError } = userErrorState

    // const getUserDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setUserState({ ...userState, [event.target.name]: event.target.value })
    // }

    useEffect(() => {
        setDisabled(!name || !email  || !password)
    }, [name, email, password])

    const validateUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserState({ ...userState, name: event.target.value })
        let regExp = /^[a-zA-Z0-9_]{5,10}$/;
        !regExp.test(event.target.value) ?
            setUserErrorState({ ...userErrorState, nameError: 'Please Enter a proper name' })
            :
            setUserErrorState({ ...userErrorState, nameError: '' })
    }
    const validateUserPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserState({...userState, password: event.target.value})
        let regExp = /^[a-zA-Z0-9_]\w{6,14}$/;
        !regExp.test(event.target.value) ?
            setUserErrorState({ ...userErrorState, passwordError: 'Please Enter a proper password' })
            :
            setUserErrorState({ ...userErrorState, passwordError: '' })
    }
    const validateUserEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
         setUserState({...userState, email: event.target.value})
        let regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
         setUserState({...userState, email: event.target.value})
        !regExp.test(event.target.value) ?
            setUserErrorState({ ...userErrorState, emailError: 'Please Enter a proper email' })
            :
            setUserErrorState({ ...userErrorState, emailError: '' })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const Resultaction = await dispatch(registerUser(userState) as any)
            const result = unwrapResult(Resultaction);
            result && navigate('/user/login');
            setTimeout(() => {
                dispatch(removeAlert(id));
            }, 3000);
            setUserState(
                {
                    name: '',
                    email: '',
                    password: ''
                }
            )
        } catch (error: any) {
            console.log(error.message)
        }
    }

  return (
      <>
        <section className="px-5 md:px-10 lg:px-20">
            <p className="text-3xl p-3 bg-orange-200">Register Here</p>
        </section>
        <section className="p-3">
            <div className="lg:w-1/3 md:w-2/4 sm:w-1/2 m-auto bg-orange-200 my-5">
                <div className="bg-gray-600 px-5 py-2 text-2xl text-white">
                    <p className="h3">Register Here</p>
                </div>
                <div className="w-3/4 m-auto">
                    <form onSubmit={handleSubmit}>
                          <div className="pt-5">
                            <input
                                name="name"
                                value={name}
                                onChange={validateUserName}
                                type="text"
                                className={`block w-full rounded-md py-1.5 pl-7 pr-20
                                   text-gray-900 ring-1 ring-transparent focus:outline-none ${nameError && 'ring-2 ring-red-400 ring-inset'}`}
                                placeholder="Name"
                            />
                            <small
                                className="mt-2 text-sm text-red-500">
                                {nameError}
                            </small>
                        </div>
                        <div className="pt-5">
                            <input
                                name="email"
                                value={email}
                                onChange={validateUserEmail}
                                type="email"
                                className={`block w-full rounded-md py-1.5 pl-7 pr-20
                                   text-gray-900 ring-1 ring-transparent focus:outline-none ${emailError && 'ring-2 ring-red-400 ring-inset'}`}
                                placeholder="Email"
                            />
                            <small className="mt-2 text-sm text-red-500">
                                  { emailError }
                            </small>
                        </div>
                        <div className="pt-5">
                            <input
                                name="password"
                                value={ password}
                                onChange={validateUserPassword}
                                type="password"
                                className={`block w-full rounded-md py-1.5 pl-7 pr-20
                                   text-gray-900 ring-1 ring-transparent focus:outline-none ${passwordError && 'ring-2 ring-red-400 ring-inset'}`}
                                placeholder="Password"
                            />
                            <small className="mt-2 text-sm text-red-500">
                                  { passwordError}
                            </small>
                        </div>
                        <div className="pt-5">
                              <input
                                type="submit"
                                value="Register"
                                disabled={disabled}
                                className={`bg-gray-600 px-4 py-1 m-2 rounded text-white cursor-pointer ${disabled && 'cursor-not-allowed'}`}
                            />
                        </div>
                        <span className="pt-5">Already Have an Account ?
                            <Link to="/users/login">
                                <strong> Login</strong>
                            </Link>
                        </span>
                    </form>
                </div>
                <div className="p-5 mt-5 bg-gray-600">
                    <img src={brand} alt="" width="150" height="30" className="m-auto w-28"/>
                </div>
            </div>
        </section>
      </>
    );
}

export default UserRegister
