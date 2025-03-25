import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import{FaBars,FaBarsStaggered} from "react-icons/fa6"
import {TbUserCircle} from "react-icons/tb"
import {RiUserLine} from "react-icons/ri"
import { ShopContext } from '../../context/ShopContext'
import logo from '../vite.png'


const Header = () => {
const[menuOpened, setmenuOpened]=useState(false);
const {getCartCount, navigate, token, setToken}=useContext(ShopContext)


const toggleMenu = ()=> setmenuOpened((prev)=>!prev)

const logout =()=>{
  localStorage.removeItem('token')
  setToken('')
  navigate('/login')
}

  return (
    <header className="max-padd-container w-full mb-2">
      <div className="flexBetween py-3 ">
        {/* LOGO */}
        <img src={logo} alt="" width={70} height={70} />
        <Link to={"/"} className=' flex flex-1 bold-24 xl:bold-28 '>ElectroMart</Link>

        {/* NAVBAR */}
      <div className='flex-1 '>
        <Navbar containerStyles={`${menuOpened ? "flex items-start flex-col gap-y-8 fixed top-16 right-6 p-5 bg-white rounded-xl shadow-md w-52 ring-1 ring-slate-900/5 z-50 " : "hidden xl:flex gap-x-5 xl:gap-x-7 medium-15 bg-primary ring-1  ring-slate-900/5 rounded-full p-1"}`}
        onClick={()=>setmenuOpened(false)}
        />
        </div>
        {/* buttons */}
        <div className='flex-1 flex items-center justify-end gap-x-2 xs:gap-x-8'>
            {/* menu toggle */}
            <>
            {menuOpened ? 
            (<FaBarsStaggered 
                onClick={toggleMenu}
                className='xl:hidden cursor-pointer text-xl '/>):
            (<FaBars 
                onClick={toggleMenu}
                className='xl:hidden cursor-pointer text-xl '/>)}
            </>
            {/* cart */}
            <Link to={'/cart'} className='flex relative'>
            <div className='text-[27px] ring-1 ring-slate-900
            rounded-full px-3 bold-18'>
               Cart 
               <span className='bg-secondary text-white text-[12px]
               font-semibold absolute -top-3.5 -right-2 flexCenter w-4
               h-4 rounded-full shadow-md'>
                {getCartCount()}
               </span>
            </div>
            </Link>
            {/* user profile */}
            <div className='group relative'>
              <div>
                {token ? (
                  <div>
                    <TbUserCircle className='text-[29px] cursor-pointer'/>
                  </div>
                ) : (
                  <button onClick={()=>navigate('/login')} className='btn-dark flexCenter gap-x-2'>
                Login
                <RiUserLine className='text-xl'/>
                </button>
                )}
              </div>
            {/* DROPDOWN */}
            {token && (
              <ul className=' bg-white p-2 w-32 ring-1 ring-slate-900/5 rounded absolute right-0 top-7 hidden group-hover:flex flex-col medium-14 shadow-md z-50'>
                <li onClick={()=>navigate('/orders')} className='p-2 text-tertiary rounded-md hover:bg-primary
                cursor-pointer'>Orders</li>
                <li onClick={logout} className='p-2 text-tertiary rounded-md hover:bg-primary
                cursor-pointer'>Logout</li>
              </ul>
            )}
            </div>
        </div>
      </div>
    </header>
  )
}

export default Header