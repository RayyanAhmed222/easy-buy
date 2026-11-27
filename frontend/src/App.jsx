import React, { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { GoogleOAuthProvider } from '@react-oauth/google'
import 'react-toastify/dist/ReactToastify.css'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'

const Men = lazy(() => import('./pages/Men'))
const Women = lazy(() => import('./pages/Women'))
const Juniors = lazy(() => import('./pages/Juniors'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Product = lazy(() => import('./pages/Product'))
const Cart = lazy(() => import('./pages/Cart'))
const Login = lazy(() => import('./pages/Login'))
const Orders = lazy(() => import('./pages/Orders'))
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'))
const Profile = lazy(() => import('./pages/Profile'))

const catalogRoutes = [
  '/men',
  '/men/:subCategory',
  '/men/:subCategory/:subSubCategory',
  '/women',
  '/women/:subCategory',
  '/women/:subCategory/:subSubCategory',
  '/juniors',
  '/juniors/:gender',
  '/juniors/:gender/:subCategory',
  '/juniors/:gender/:subCategory/:subSubCategory',
]

const getCatalogElement = (path) => {
  if (path.startsWith('/men')) return <Men />
  if (path.startsWith('/women')) return <Women />
  return <Juniors />
}

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

const App = () => {
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
        <ScrollToTop />
        <ToastContainer />
        <Navbar />
        <SearchBar />

        <Suspense fallback={<div className='py-16 text-center text-sm text-gray-400'>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />

            {catalogRoutes.map((path) => (
              <Route key={path} path={path} element={getCatalogElement(path)} />
            ))}

            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/orders' element={<Orders />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </GoogleOAuthProvider>
  )
}

export default App