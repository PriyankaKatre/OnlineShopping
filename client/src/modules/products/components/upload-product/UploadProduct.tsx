import React, { useState } from 'react'
import { IProduct } from '../../../../models/IProduct';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProduct } from '../../../../redux/product/productThunk';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { removeAlert } from '../../../../redux/user/alertSlice';
import { v4 } from 'uuid';
import { UserState } from '../../../../models/IUser';

function UploadProduct() {
    let dispatch = useDispatch();
    const navigate = useNavigate();

    const [productState, setProductState] = useState({
        product: {} as IProduct
    })
    const { product } = productState;
    let updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setProductState({
            product: {
                ...product,
                [event.target.name]: event.target.value
            }
        });
    }

    let updateImage = async (event:React.ChangeEvent<HTMLInputElement | any>) => {
        let imageFile:Blob = event.target.files[0];
        let base64Image:string | ArrayBuffer = await convertBase64String(imageFile);
        setProductState({
            ...productState,
            product : {
                ...productState.product,
                image : base64Image.toString()
            }
        });
    };
     let userState:UserState = useSelector((state : {users : UserState}) => {
        return state.users;
    });

    let {user} = userState;

    let convertBase64String = (imageFile:Blob):Promise<string | ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.addEventListener('load', () => {
                if(fileReader.result){
                    resolve(fileReader.result);
                }
                else {
                    reject('Error Occurred');
                }
            })
        });
    };

    let submitUploadProduct = async (event: React.FormEvent<HTMLFormElement>) => {
        let id = v4();
        event.preventDefault();
        // dispatch to server
        try {
            const Resultaction = await dispatch(uploadProduct(product) as any);
            const result = unwrapResult(Resultaction);
            result && navigate('/');
            setTimeout(() => {
                dispatch(removeAlert(id));
            }, 3000);
        }
        catch (error: any) {
            console.log(error.message)
        }
    };
   return (
       <>
           <section className="bg-orange-200">
                <p className="text-3xl px-5 md:px-10 lg:px-20 py-3">Upload Products</p>
            </section>
            <section className="px-5 md:px-10 lg:px-20">
               <div className="container">
                   {/* if user is an ADMIN */}
                   {
                       user && user.isAdmin ?
                        <>
                            <div className="mt-3">
                                <p className="text-2xl">Upload Products Here</p>
                                <p className="py-3 text-lg" >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad, dicta earum eligendi eos explicabo fuga id, in labore natus, nobis non provident qui quod ratione reiciendis reprehenderit tempore veritatis!</p>
                            </div>
                            <div className="w-2/3">
                                <form onSubmit={submitUploadProduct}>
                                    <div className="form-group mt-3">
                                        <input
                                            required
                                            name="name"
                                            value={product.name}
                                            onChange={updateInput}
                                            type="text"
                                            className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                        placeholder="Name"
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input
                                            required
                                            name="brand"
                                        value={product.brand}
                                            onChange={updateInput}
                                            type="text" className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                        placeholder="Brand"
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input
                                            required
                                            name="image"
                                            onChange={updateImage}
                                            className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            type="file"
                                            id="formFile"
                                        />
                                    {

                                            product.image &&
                                            <img src={product.image} alt="" width="20" height="25"/>
                                        }
                                    </div>
                                    <div className="form-group mt-3">
                                        <input
                                            required
                                            name="price"
                                            value={product.price}
                                            onChange={updateInput}
                                            type="number" className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            placeholder="Price"
                                    />
                                    </div>
                                    <div className="form-group mt-3">
                                        <input
                                            required
                                            name="qty"
                                            value={product.qty}
                                            onChange={updateInput}
                                            type="number" className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            placeholder="Qty"
                                    />
                                    </div>
                                    <div className="form-group mt-3">
                                        <select
                                            required
                                            name="category"
                                            value={product.category}
                                            onChange={updateInput}
                                            className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                                            <option value="">Select a Category</option>
                                            <option value="MEN">Men's Collection</option>
                                            <option value="WOMEN">Women's Collection</option>
                                            <option value="KIDS">Kids's Collection</option>
                                        </select>
                                    </div>
                                    <div className="form-group mt-3">
                                        <textarea
                                            required
                                            name="description"
                                            value={product.description}
                                            onChange={updateInput}
                                            rows={3} className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            placeholder="Description"
                                    />
                                    </div>
                                    <div className="form-group mt-3">
                                        <textarea
                                            required
                                            name="usage"
                                            value={product.usage}
                                            onChange={updateInput}
                                            rows={3} className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                            placeholder="Usage"
                                        />
                                    </div>
                                    <div className="form-group mt-2">
                                        <input type="submit" className="bg-gray-600 px-4 py-1 m-2 rounded text-white" value="Upload"/>
                                    </div>
                                </form>
                               </div>
                        </>
                           :
                        <>
                            <div className="container mt-3">
                                <div className="text-center">
                                    <p className="text-xl text-red-500">
                                        Hey <b>Priyanka !! </b>
                                        You are not Authorized to Upload any Product!!</p>
                                    <small><b>NOTE : If you really wants to upload products, <br/> please contact the Admin to grant you access</b></small>
                                </div>
                            </div>
                        </>
                   }
                </div>
            </section>
            <div style={{marginBottom : '50px'}}/>
        </>
    );
}

export default UploadProduct
