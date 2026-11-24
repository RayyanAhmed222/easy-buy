import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Edit from './pages/Edit'

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = '$'

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer />

      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />

          <div className="flex w-full">
            <Sidebar />

            <div className="min-w-0 flex-1">
              <Routes>
                <Route path="/" element={<Dashboard token={token} />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/edit-product/:id" element={<Edit token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App