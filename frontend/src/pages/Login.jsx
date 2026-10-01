import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
    ArrowRight,
    LockKeyhole,
    Mail,
    User,
    ShieldCheck,
    Eye,
    EyeOff,
    Sparkles
} from 'lucide-react'

import { ShopContext } from '../context/ShopContext'

const Login = () => {

    const [currentState, setCurrentState] = useState('Login')

    const {
        token,
        setToken,
        navigate,
        backendUrl
    } = useContext(ShopContext)

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)


    // =========================================================
    // SUBMIT
    // =========================================================

    const onSubmitHandler = async (event) => {

        event.preventDefault()

        try {

            setLoading(true)

            // =================================================
            // SIGN UP
            // =================================================

            if (currentState === 'Sign Up') {

                const response = await axios.post(
                    backendUrl + '/api/user/register',
                    {
                        name,
                        email,
                        password
                    }
                )

                if (response.data.success) {

                    setToken(response.data.token)

                    localStorage.setItem(
                        'token',
                        response.data.token
                    )

                    toast.success(
                        response.data.message || 'Account created successfully!'
                    )

                } else {

                    toast.error(
                        response.data.message
                    )

                }

            }

            // =================================================
            // LOGIN
            // =================================================

            else {

                const response = await axios.post(
                    backendUrl + '/api/user/login',
                    {
                        email,
                        password
                    }
                )

                if (response.data.success) {

                    setToken(response.data.token)

                    localStorage.setItem(
                        'token',
                        response.data.token
                    )

                    toast.success(
                        response.data.message || 'Welcome back to EASYBUY!'
                    )

                } else {

                    toast.error(
                        response.data.message
                    )

                }

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message
            )

        } finally {

            setLoading(false)

        }
    }


    // =========================================================
    // REDIRECT AFTER LOGIN
    // =========================================================

    useEffect(() => {

        if (token) {
            navigate('/')
        }

    }, [token, navigate])


    // =========================================================
    // SWITCH LOGIN / SIGN UP
    // =========================================================

    const switchState = () => {

        setCurrentState(
            currentState === 'Login'
                ? 'Sign Up'
                : 'Login'
        )

        setName('')
        setEmail('')
        setPassword('')
        setShowPassword(false)
    }


    // =========================================================
    // PAGE
    // =========================================================

    return (

        <div className="min-h-[calc(100vh-80px)] bg-[#f6f6f3] flex items-center justify-center px-4 py-12 sm:py-16">

            <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.08)]">


                {/* =================================================
                    LEFT BRAND SECTION
                ================================================= */}

                <div className="hidden lg:flex relative bg-black text-white p-12 xl:p-16 flex-col justify-between min-h-[650px] overflow-hidden">

                    {/* Decorative Text */}

                    <div className="absolute -right-20 -bottom-20 text-[240px] font-serif italic text-white/[0.035] select-none">
                        EB
                    </div>


                    {/* Top */}

                    <div>

                        <div className="flex items-center gap-2">

                            <Sparkles
                                size={15}
                                strokeWidth={1.7}
                            />

                            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gray-400">
                                EASYBUY
                            </p>

                        </div>


                        <h1 className="text-5xl xl:text-6xl font-light leading-[1.05] tracking-tight mt-12">

                            Style starts

                            <br />

                            <span className="font-serif italic">
                                here.
                            </span>

                        </h1>


                        <p className="mt-7 text-sm text-gray-400 leading-7 max-w-md">
                            Discover carefully selected styles, manage your
                            orders and enjoy a simple shopping experience
                            designed around you.
                        </p>

                    </div>


                    {/* Bottom Features */}

                    <div className="space-y-5 relative z-10">

                        <div className="flex items-center gap-4">

                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">

                                <ShieldCheck
                                    size={18}
                                    strokeWidth={1.6}
                                />

                            </div>

                            <div>

                                <p className="text-sm font-medium">
                                    Secure Account
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    Your information stays protected.
                                </p>

                            </div>

                        </div>


                        <div className="flex items-center gap-4">

                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">

                                <LockKeyhole
                                    size={18}
                                    strokeWidth={1.6}
                                />

                            </div>

                            <div>

                                <p className="text-sm font-medium">
                                    Easy Shopping
                                </p>

                                <p className="text-xs text-gray-500 mt-1">
                                    Everything you need in one place.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    RIGHT FORM SECTION
                ================================================= */}

                <div className="px-6 sm:px-10 lg:px-12 xl:px-16 py-10 sm:py-14 flex items-center">

                    <form
                        onSubmit={onSubmitHandler}
                        className="w-full max-w-md mx-auto"
                    >

                        {/* Mobile Brand */}

                        <div className="lg:hidden text-center mb-8">

                            <p className="text-xl font-semibold tracking-[0.15em]">
                                EASYBUY
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                Fashion made simple.
                            </p>

                        </div>


                        {/* Header */}

                        <div className="mb-8">

                            <div className="flex items-center gap-2 mb-4">

                                <span className="w-7 h-px bg-black"></span>

                                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400">
                                    {currentState === 'Login'
                                        ? 'WELCOME BACK'
                                        : 'JOIN EASYBUY'
                                    }
                                </p>

                            </div>


                            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-900">

                                {currentState === 'Login'
                                    ? 'Welcome back.'
                                    : 'Create your account.'
                                }

                            </h2>


                            <p className="text-sm text-gray-500 mt-3 leading-6">

                                {currentState === 'Login'
                                    ? 'Sign in to continue your EASYBUY journey.'
                                    : 'Create an account and start shopping with EASYBUY.'
                                }

                            </p>

                        </div>


                        {/* =================================================
                            NAME
                        ================================================= */}

                        {currentState === 'Sign Up' && (

                            <div className="mb-4">

                                <label className="block text-xs font-medium text-gray-600 mb-2">
                                    Full Name
                                </label>

                                <div className="relative">

                                    <User
                                        size={17}
                                        strokeWidth={1.7}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        value={name}
                                        type="text"
                                        placeholder="Enter your name"
                                        className="w-full h-13 pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 placeholder:text-gray-400 focus:border-black transition-colors"
                                        required
                                    />

                                </div>

                            </div>

                        )}


                        {/* =================================================
                            EMAIL
                        ================================================= */}

                        <div className="mb-4">

                            <label className="block text-xs font-medium text-gray-600 mb-2">
                                Email Address
                            </label>

                            <div className="relative">

                                <Mail
                                    size={17}
                                    strokeWidth={1.7}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    value={email}
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full h-13 pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 placeholder:text-gray-400 focus:border-black transition-colors"
                                    required
                                />

                            </div>

                        </div>


                        {/* =================================================
                            PASSWORD
                        ================================================= */}

                        <div className="mb-4">

                            <div className="flex items-center justify-between mb-2">

                                <label className="text-xs font-medium text-gray-600">
                                    Password
                                </label>

                            </div>


                            <div className="relative">

                                <LockKeyhole
                                    size={17}
                                    strokeWidth={1.7}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />


                                <input
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    type={
                                        showPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    placeholder="Enter your password"
                                    className="w-full h-13 pl-11 pr-12 py-3 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 placeholder:text-gray-400 focus:border-black transition-colors"
                                    required
                                />


                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                >

                                    {showPassword ? (
                                        <EyeOff size={17} />
                                    ) : (
                                        <Eye size={17} />
                                    )}

                                </button>

                            </div>

                        </div>


                        {/* =================================================
                            ACCOUNT SWITCH
                        ================================================= */}

                        <div className="flex items-center justify-between gap-4 mt-6">

                            <p className="text-sm text-gray-500">

                                {currentState === 'Login'
                                    ? "Don't have an account?"
                                    : 'Already have an account?'
                                }

                            </p>


                            <button
                                type="button"
                                onClick={switchState}
                                className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-0.5 hover:opacity-60 transition-opacity"
                            >

                                {currentState === 'Login'
                                    ? 'Create account'
                                    : 'Login here'
                                }

                            </button>

                        </div>


                        {/* =================================================
                            SUBMIT
                        ================================================= */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="group w-full mt-7 h-13 bg-black text-white rounded-xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >

                            {loading ? (

                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>

                                    {currentState === 'Login'
                                        ? 'Signing in...'
                                        : 'Creating account...'
                                    }
                                </>

                            ) : (

                                <>
                                    {currentState === 'Login'
                                        ? 'Sign In'
                                        : 'Create Account'
                                    }

                                    <ArrowRight
                                        size={16}
                                        className="group-hover:translate-x-1 transition-transform"
                                    />
                                </>

                            )}

                        </button>


                        {/* =================================================
                            SECURITY NOTE
                        ================================================= */}

                        <div className="flex items-center justify-center gap-2 mt-6 text-[11px] text-gray-400">

                            <ShieldCheck
                                size={14}
                                strokeWidth={1.7}
                            />

                            <span>
                                Your account information is kept secure.
                            </span>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default Login

