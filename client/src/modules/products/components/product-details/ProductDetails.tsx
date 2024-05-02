import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ProductState } from '../../../../models/IProduct';
import { getProductDetails } from '../../../../redux/product/productThunk';
import { useParams } from 'react-router-dom';
import Spinner from '../../../layout/components/spinner/Spinner';
import { addToCart } from '../../../../redux/orders/order.slice';

function ProductDetails() {
    const dispatch = useDispatch()
    let {productId} = useParams<string>();
    const productState= useSelector((state: {products : ProductState}) => {
        return state.products
    })



    let { loading, product, errorMessage } = productState;

     console.log('product', product)

    useEffect(() => {
        dispatch(getProductDetails(productId!) as any)
    }, [productId])

    let [productQty , setProductQty] = useState({
        qty : ''
    });

    // updateQtyInput
    let updateQtyInput = (event : React.ChangeEvent<HTMLSelectElement>) => {
        setProductQty({
            qty : event.target.value
        });
    };

    let submitAddToCart = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
         // dispatch action add to cart
         console.log('inside add to cart')
        dispatch(addToCart(product));
    };

    console.log('productQty', productQty.qty)
    return (
        <>
            <section className="bg-orange-200">
                <p className="text-3xl px-5 md:px-10 lg:px-20 py-3">Selected Product</p>
            </section>
            {
                loading ? <Spinner/> :
                <>
                    {
                        Object.keys(product).length > 0 &&
                            <section>
                                <div className="container my-3 px-20 h-screen">
                                    <div className=" grid grid-cols-2">
                                        <div className="place-self-center mr-20 ">
                                            <img src={product.image} alt="" className="img-fluid "/>
                                        </div>
                                        <div className="">
                                            <p className="h3">NAME : <b>{product.name}</b></p>
                                            <p className="h3">Brand : <b>{product.brand}</b></p>
                                            <p className="h5">Price : <b className="text-danger">&#8377; {product.price.toFixed(2)}</b></p>
                                            <form onSubmit={submitAddToCart}>
                                                <div className="form-group">
                                                    <select
                                                        required
                                                        value={productQty.qty}
                                                        onChange={updateQtyInput}
                                                        className='block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                                                        <option value="">Select Qty</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        </select>
                                                    <input type="submit" className="bg-orange-300 px-4 py-1 my-2 rounded" value="add to Cart"/>
                                                </div>
                                            </form>
                                            <p className='pb'>{product.usage}</p>
                                            <p className='py-10'>{product.description}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>
                    }
                </>
            }
        </>
    )
}

export default ProductDetails
