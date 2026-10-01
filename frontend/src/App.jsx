import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Men from './pages/Men'
import Women from './pages/Women'
import Juniors from './pages/Juniors'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Orders from './pages/Orders'
import PlaceOrder from './pages/PlaceOrder'
import Navbar from './components/navbar'
import Footer from './components/Footer'
import SearchBar from './components/searchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/Profile'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vW] lg::px=[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/men' element={<Men />} />
        <Route path='/men/:subCategory' element={<Men />} />
        <Route path='/men/:subCategory/:subSubCategory' element={<Men />} />
        <Route path='/women' element={<Women />} />
        <Route path='/women/:subCategory' element={<Women />} />
        <Route path='/women/:subCategory/:subSubCategory' element={<Women />} />
        <Route path='/juniors' element={<Juniors />} />
        <Route path='/juniors/:gender' element={<Juniors />} />
        <Route path='/juniors/:gender/:subCategory' element={<Juniors />} />
        <Route path='/juniors/:gender/:subCategory/:subSubCategory' element={<Juniors />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
