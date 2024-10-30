import { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct, ProductState } from '../../../../models/IProduct';
import { getWomensProduct } from '../../../../redux/product/productThunk';
import Spinner from '../../../layout/components/spinner/Spinner';
import { addToCart } from '../../../../redux/orders/order.slice';

function WomensCollections() {
    const dispatch = useDispatch()
    const productState= useSelector((state: {products : ProductState}) => {
        return state.products
    })

    let { loading, products } = productState;

    useEffect(() => {
        dispatch(getWomensProduct() as any)
    }, [])

    let AddToCartHandler = (product: IProduct) => {
        // dispatch action add to cart
        dispatch(addToCart(product));
    };

  return (
        <>
          <section className="bg-orange-200">
                <p className="text-3xl px-5 md:px-10 lg:px-20 py-3">Women's Collection</p>
            </section>

            {
                loading ? <Spinner /> :
                <section className="p-3">
                    <div className="px-5 md:px-10 lg:px-20">
                        <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-5 gap-4 bg-white-100">
                        {
                            products.length > 0 && products.map((product) => {
                                return (

                                    <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                        <Link to={`/products/${product._id}`}>
                                            <img src={product.image} alt="" className="h-80 w-full"/>
                                        </Link>
                                        <ul className=" border border-black-600 text-center m-4 text-zinc-500">
                                            <li className="">
                                                <p className="text-xl mb-2">{product.name}</p>
                                                <span>{ product.brand}</span>
                                                <p className="h6">&#8377; { product.price}</p>
                                                <button
                                                    className="bg-orange-300 px-4 py-1 m-2 rounded"
                                                    onClick={() =>AddToCartHandler(product)}
                                                >Add Cart</button>
                                            </li>
                                        </ul>
                                    </div>

                                )
                            })
                        }
                        </div>
                    </div>
                </section>
            }
        </>
  );
}

export default WomensCollections
