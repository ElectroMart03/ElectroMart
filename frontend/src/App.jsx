import React from 'react'
import Header from './assets/components/Header'
import { Route, Routes } from "react-router-dom"
import Home from './assets/pages/Home'
import Collection from './assets/pages/Collection'
import Blog from './assets/pages/Blog'
import Product from './assets/pages/Product'
import { ToastContainer } from "react-toastify"
import Cart from './assets/pages/Cart'
import PlaceOrder from './assets/pages/PlaceOrder'
import Login from './assets/pages/Login'
import Orders from './assets/pages/orders'
import Verify from './assets/pages/Verify'
import Contact from './assets/pages/Contact'




const App = () => {
  return (
    <main className='overflow-hidden text-tertiary'>
      <ToastContainer/>
      <Header/>
      <Routes>
       <Route path='/' element= {<Home/>}/> 
       <Route path='/Collection' element={<Collection/>}/>
       <Route path='/Blog' element={<Blog/>}/>
       <Route path='/product/:productId' element={<Product/>}/>
       <Route path='/Cart' element={<Cart/>}/>
       <Route path='/place-order' element={<PlaceOrder/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/orders' element={<Orders/>}/>
       <Route path='/verify' element={<Verify/>}/>
       <Route path='/Contact' element={<Contact/>}/>
       
       
       
       



      </Routes>

    </main>
  )
}
  
export default App