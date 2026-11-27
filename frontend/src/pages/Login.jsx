import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google'
import { ArrowRight, LockKeyhole, Mail, User, ShieldCheck, Eye, EyeOff, Sparkles, KeyRound } from 'lucide-react'
import { ShopContext } from '../context/ShopContext'

const Login = () => {
    const [currentState, setCurrentState] = useState('Login')
    const [pinStep, setPinStep] = useState(false)
    const [pendingEmail, setPendingEmail] = useState('')
    const [pinCode, setPinCode] = useState('')

    const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const completeLoginWithToken = (jwtToken, successMsg) => {
        setToken(jwtToken)
        localStorage.setItem('token', jwtToken)
        toast.success(successMsg || 'Welcome to EASYBUY!')
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            setLoading(true)

            if (pinStep) {
                const response = await axios.post(
                    backendUrl + '/api/user/verify-signup-pin',
                    { email: pendingEmail, pin: pinCode }
                )

                if (response.data.success && response.data.token) {
                    completeLoginWithToken(response.data.token, response.data.message)
                } else {
                    toast.error(response.data.message || 'PIN verification failed')
                }
                return
            }

            if (currentState === 'Sign Up') {
                const response = await axios.post(
                    backendUrl + '/api/user/register',
                    { name, email, password }
                )

                if (response.data.success && response.data.requiresPin) {
                    setPendingEmail(response.data.email || email.trim().toLowerCase())
                    setPinCode('')
                    setPinStep(true)
                    toast.success(response.data.message || 'Verification PIN sent to your Gmail.')
                } else if (response.data.success && response.data.token) {
                    completeLoginWithToken(response.data.token, response.data.message)
                } else {
                    toast.error(response.data.message)
                }
            } else {
                const response = await axios.post(
                    backendUrl + '/api/user/login',
                    { email, password }
                )

                if (response.data.success) {
                    completeLoginWithToken(response.data.token, response.data.message || 'Welcome back to EASYBUY!')
                } else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleSuccess = async (credentialResponse) => {
        if (!credentialResponse?.credential) {
            toast.error('Google sign-in token was not received.')
            return
        }

        try {
            setLoading(true)
            const response = await axios.post(
                backendUrl + '/api/user/google-login',
                { credential: credentialResponse.credential }
            )

            if (response.data.success && response.data.requiresPin) {
                setPendingEmail(response.data.email)
                setPinCode('')
                setPinStep(true)
                toast.success(response.data.message || 'Verification PIN sent to your Gmail.')
            } else if (response.data.success && response.data.token) {
                completeLoginWithToken(response.data.token, response.data.message || 'Signed in with Google!')
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (token) {
            navigate('/')
        }
    }, [token, navigate])

    const switchState = () => {
        setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')
        setPinStep(false)
        setPendingEmail('')
        setPinCode('')
        setName('')
        setEmail('')
        setPassword('')
        setShowPassword(false)
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#f6f6f3] flex items-center justify-center px-4 py-12 sm:py-16">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-4xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
                <div className="hidden lg:flex relative bg-black text-white p-12 xl:p-16 flex-col justify-between min-h-162.5 overflow-hidden">
                    <div className="absolute -right-20 -bottom-20 text-[240px] font-serif italic text-white/[0.035] select-none">
                        EB
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <Sparkles size={15} strokeWidth={1.7} />
                            <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-gray-400">
                                EASYBUY
                            </p>
                        </div>

                        <h1 className="text-5xl xl:text-6xl font-light leading-[1.05] tracking-tight mt-12">
                            Style starts
                            <br />
                            <span className="font-serif italic">here.</span>
                        </h1>

                        <p className="mt-7 text-sm text-gray-400 leading-7 max-w-md">
                            Discover carefully selected styles, manage your orders and enjoy a simple shopping experience designed around you.
                        </p>
                    </div>

                    <div className="space-y-5 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                <ShieldCheck size={18} strokeWidth={1.6} />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Secure Account</p>
                                <p className="text-xs text-gray-500 mt-1">Your information stays protected.</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                <LockKeyhole size={18} strokeWidth={1.6} />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Easy Shopping</p>
                                <p className="text-xs text-gray-500 mt-1">Everything you need in one place.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 sm:px-10 lg:px-12 xl:px-16 py-10 sm:py-14 flex items-center">
                    <form onSubmit={onSubmitHandler} className="w-full max-w-md mx-auto">
                        <div className="lg:hidden text-center mb-8">
                            <p className="text-xl font-semibold tracking-[0.15em]">EASYBUY</p>
                            <p className="text-xs text-gray-400 mt-1">Fashion made simple.</p>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-7 h-px bg-black"></span>
                                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gray-400">
                                    {pinStep ? 'GMAIL VERIFICATION' : currentState === 'Login' ? 'WELCOME BACK' : 'JOIN EASYBUY'}
                                </p>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-900">
                                {pinStep
                                    ? 'Enter 6-digit PIN.'
                                    : currentState === 'Login'
                                        ? 'Welcome back.'
                                        : 'Create your account.'}
                            </h2>

                            <p className="text-sm text-gray-500 mt-3 leading-6">
                                {pinStep
                                    ? `We sent a verification PIN to ${pendingEmail}. Enter it below to complete sign-up.`
                                    : currentState === 'Login'
                                        ? 'Sign in to continue your EASYBUY journey.'
                                        : 'Verify your Gmail with a 6-digit PIN to create your EASYBUY account.'}
                            </p>
                        </div>

                        {pinStep ? (
                            <div className="mb-4">
                                <label className="block text-xs font-medium text-gray-600 mb-2">6-Digit Gmail PIN</label>
                                <div className="relative">
                                    <KeyRound size={17} strokeWidth={1.7} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        value={pinCode}
                                        type="text"
                                        inputMode="numeric"
                                        placeholder="123456"
                                        maxLength={6}
                                        className="w-full h-13 pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none text-sm tracking-[0.3em] text-gray-800 placeholder:text-gray-400 placeholder:tracking-normal focus:border-black transition-colors"
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPinStep(false)
                                            setPinCode('')
                                        }}
                                        className="text-xs font-medium text-gray-600 underline hover:text-black"
                                    >
                                        Change details / go back
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                {currentState === 'Sign Up' && (
                                    <div className="mb-4">
                                        <label className="block text-xs font-medium text-gray-600 mb-2">Full Name</label>
                                        <div className="relative">
                                            <User size={17} strokeWidth={1.7} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input
                                                onChange={(e) => setName(e.target.value)}
                                                value={name}
                                                type="text"
                                                placeholder="Enter your name"
                                                className="w-full h-13 pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 placeholder:text-gray-400 focus:border-black transition-colors"
                                                required
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <label className="block text-xs font-medium text-gray-600 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail size={17} strokeWidth={1.7} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            type="email"
                                            placeholder="you@example.com"
                                            className="w-full h-13 pl-11 pr-4 py-3 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 placeholder:text-gray-400 focus:border-black transition-colors"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <label className="text-xs font-medium text-gray-600">Password</label>
                                    </div>

                                    <div className="relative">
                                        <LockKeyhole size={17} strokeWidth={1.7} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            className="w-full h-13 pl-11 pr-12 py-3 border border-gray-200 rounded-xl outline-none text-sm text-gray-800 placeholder:text-gray-400 focus:border-black transition-colors"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4 mt-6">
                                    <p className="text-sm text-gray-500">
                                        {currentState === 'Login' ? "Don't have an account?" : 'Already have an account?'}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={switchState}
                                        className="text-sm font-medium text-gray-900 border-b border-gray-900 pb-0.5 hover:opacity-60 transition-opacity"
                                    >
                                        {currentState === 'Login' ? 'Create account' : 'Login here'}
                                    </button>
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="group w-full mt-7 h-13 bg-black text-white rounded-xl flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-800 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    {pinStep ? 'Verifying PIN...' : currentState === 'Login' ? 'Signing in...' : 'Sending PIN...'}
                                </>
                            ) : (
                                <>
                                    {pinStep ? 'Verify PIN & Sign Up' : currentState === 'Login' ? 'Sign In' : 'Send Gmail PIN'}
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>

                        {!pinStep && (
                            <>
                                <div className="flex items-center gap-3 my-5">
                                    <span className="h-px flex-1 bg-gray-200"></span>
                                    <span className="text-[11px] uppercase tracking-wider text-gray-400">or</span>
                                    <span className="h-px flex-1 bg-gray-200"></span>
                                </div>

                                <div className="flex justify-center">
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={() => toast.error('Google Sign-In failed or was cancelled.')}
                                        width="360"
                                        shape="pill"
                                        text={currentState === 'Login' ? 'signin_with' : 'signup_with'}
                                    />
                                </div>
                            </>
                        )}

                        <div className="flex items-center justify-center gap-2 mt-6 text-[11px] text-gray-400">
                            <ShieldCheck size={14} strokeWidth={1.7} />
                            <span>Your account information is kept secure.</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login