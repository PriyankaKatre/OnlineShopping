import { useState } from 'react'
import { Link } from 'react-router-dom'
import brandimg from '../../../../assets/img/brand.png'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { UserState } from '../../../../models/IUser'
import { isLoggedIn } from '../../../../util/AuthUtils'
import { logoutUser } from '../../../../redux/user/userSlice'
import { OrderState } from '../../../../models/IOrder'

const NavBar = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    const dispatch = useDispatch()

    const userState = useSelector((state: { users: UserState }) => state.users)

  const orderState= useSelector((state: {orders : OrderState}) => {
        return state.orders
    })
    console.log('orderState=>=>', orderState.cartItems.length)
    const {isAuthenticated, user } = userState

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    const handleLogout = () => {
        dispatch(logoutUser() as any)
    }

  return (
    <nav className='container-fluid bg-gray-600 px-5 md:px-10 lg:px-20 py-2'>
        <div className='flex justify-between items-center'>
            <Link to='/' className='navbar-brand'>
                <img src={brandimg} alt="" width="130" height= "30"></img>
            </Link>
            <div className={`md:flex-1 px-5`}>
                <ul className='md:flex md:flex-1 text-white'>
                    <li className={`flex-1 justify-between ${toggleMenu ? 'md:block': 'xs:hidden md:flex'} `}>
                        <li className='md:flex gap-8'>
                            <li className="hover:text-gray-100">
                                <NavLink to='/products/men' >Men's Wear</NavLink>
                            </li>
                            <li className="hover:text-gray-100">
                                <NavLink to='/products/women' >Women's Wear</NavLink>
                            </li>
                            <li className="hover:text-gray-100">
                                <NavLink to='/products/kids' >Kids's Wear</NavLink>
                              </li>
                              {
                                isLoggedIn() && isAuthenticated &&
                                  <li className="hover:text-gray-100">
                                      <NavLink to='/products/upload' >Upload</NavLink>
                                  </li>
                              }
                              {
                                  isLoggedIn() && isAuthenticated &&
                                  <li className="hover:text-gray-100 relative">
                                      <NavLink to='/orders/cart' >
                                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                          </svg>
                                          <span className="absolute top-px left-4 bg-green-500 text-white-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{orderState.cartItems.length}</span>
                                      </NavLink>
                                  </li>
                              }
                              {
                                  isLoggedIn() && isAuthenticated &&
                                  <li className="hover:text-gray-100">
                                      <NavLink to='/orders/list' >Orders</NavLink>
                                  </li>
                              }
                            </li>
                            <li className='md:flex gap-8'>
                            {
                                !isLoggedIn() && !isAuthenticated ?
                                        <>
                                    <li className="hover:text-gray-100">
                                        <NavLink to='/user/login' className="flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                </svg>
                                                    <span>Login</span>
                                        </NavLink>
                                    </li>
                                    <li className="hover:text-gray-100">
                                        <NavLink to='/user/register' className="flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg><span>Register</span>
                                        </NavLink>
                                    </li>
                                </> :
                                <>
                                    {
                                    user && Object.keys(user).length > 0 &&
                                        <li className="nav-item">
                                            <NavLink to="/user/profile" className="nav-link flex">
                                                <img src={user.avatar} alt="" width="25" height="25" className="rounded-circle"/>
                                                {user.name}
                                            </NavLink>
                                        </li>
                                    }
                                    <li className="hover:text-gray-100" onClick={(handleLogout)}>
                                        <NavLink to='/user/login' className="flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                            </svg>
                                        <span>LogOut</span> </NavLink>
                                    </li>
                                </>
                            }
                        </li>
                    </li>
                </ul>
            </div>
            <div className="md:hidden hover:text-gray-100 " onClick={handleToggleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
            </div>
        </div>
    </nav>
  )
}

export default NavBar
