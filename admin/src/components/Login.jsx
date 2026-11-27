import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
    ArrowRight,
    ArrowLeft,
    KeyRound,
    Loader2
} from 'lucide-react'

import { backendUrl } from '../App'

const Login = ({ setToken }) => {

    const [step, setStep] = useState('credentials') // 'credentials' | 'mfa'
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mfaToken, setMfaToken] = useState('')
    const [code, setCode] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onCredentialsSubmit = async (e) => {
        e.preventDefault()

        if (loading) return

        try {
            setLoading(true)

            const response = await axios.post(
                backendUrl + '/api/user/admin',
                {
                    email: email.trim(),
                    password
                }
            )

            if (!response.data.success) {
                toast.error(response.data.message)
                return
            }

            if (response.data.mfaRequired && response.data.mfaToken) {
                setMfaToken(response.data.mfaToken)
                setCode('')
                setStep('mfa')
                toast.info(response.data.message || 'Authenticator code required')
                return
            }

            if (response.data.token) {
                setToken(response.data.token)
            }

        } catch (error) {
            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message ||
                'Something went wrong. Please try again.'
            )

        } finally {
            setLoading(false)
        }
    }

    const onMfaSubmit = async (e) => {
        e.preventDefault()

        if (loading) return

        const cleanCode = code.trim()
        if (!cleanCode) {
            toast.error('Please enter your 6-digit authenticator code')
            return
        }

        try {
            setLoading(true)

            const response = await axios.post(
                backendUrl + '/api/user/mfa/verify',
                {
                    mfaToken,
                    code: cleanCode
                }
            )

            if (response.data.success && response.data.token) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message || 'Invalid authenticator code')
            }

        } catch (error) {
            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message ||
                'MFA verification failed. Please try again.'
            )

        } finally {
            setLoading(false)
        }
    }

    const resetToCredentials = () => {
        setStep('credentials')
        setMfaToken('')
        setCode('')
    }

    return (
        <main className="relative min-h-screen overflow-hidden bg-[#f7f7f5] px-4 py-8 sm:px-6">

            {/* BACKGROUND DECORATION */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-neutral-200/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-neutral-200/40 blur-3xl" />

            {/* CONTENT */}
            <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center justify-center">

                <div className="w-full max-w-[430px]">

                    {/* BRAND */}
                    <div className="mb-8 text-center">

                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white shadow-lg shadow-black/10">
                            <span className="text-xl font-bold tracking-tight">E</span>
                        </div>

                        <h1 className="mt-5 text-xl font-bold tracking-[0.12em] text-neutral-950">
                            EASYBUY
                        </h1>

                        <div className="mt-2 flex items-center justify-center gap-1.5">
                            <ShieldCheck size={13} className="text-neutral-400" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                                Admin Portal
                            </span>
                        </div>

                    </div>

                    {/* LOGIN CARD */}
                    <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.07)] sm:p-8">

                        {/* CARD HEADER */}
                        <div className="mb-7">

                            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                                {step === 'credentials' ? 'Secure Access' : 'Two-Factor Verification'}
                            </p>

                            <h2 className="text-2xl font-semibold tracking-tight text-neutral-950 sm:text-[28px]">
                                {step === 'credentials' ? 'Welcome back' : 'Authenticator code'}
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-neutral-500">
                                {step === 'credentials'
                                    ? 'Sign in to manage your EASYBUY store.'
                                    : 'Enter the 6-digit code from your authenticator app.'}
                            </p>

                        </div>

                        {step === 'credentials' ? (
                            <form onSubmit={onCredentialsSubmit} className="space-y-5">

                                {/* EMAIL */}
                                <div>
                                    <label className="mb-2 block text-xs font-semibold text-neutral-700">
                                        Email Address
                                    </label>

                                    <div className="relative">
                                        <Mail
                                            size={17}
                                            strokeWidth={1.8}
                                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                                        />

                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="admin@example.com"
                                            autoComplete="email"
                                            required
                                            className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/5"
                                        />
                                    </div>
                                </div>

                                {/* PASSWORD */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label className="text-xs font-semibold text-neutral-700">
                                            Password
                                        </label>

                                        <span className="text-[10px] font-medium text-neutral-400">
                                            Protected
                                        </span>
                                    </div>

                                    <div className="relative">
                                        <LockKeyhole
                                            size={17}
                                            strokeWidth={1.8}
                                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                                        />

                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            autoComplete="current-password"
                                            required
                                            className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-11 pr-12 text-sm text-neutral-900 placeholder:text-neutral-400 transition-all duration-200 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/5"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-800"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                        </button>
                                    </div>
                                </div>

                                {/* LOGIN BUTTON */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black px-5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-200 hover:bg-neutral-800 hover:shadow-xl hover:shadow-black/15 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={17} className="animate-spin" />
                                            <span>Signing in...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign in to Admin</span>
                                            <ArrowRight
                                                size={17}
                                                className="transition-transform duration-200 group-hover:translate-x-1"
                                            />
                                        </>
                                    )}
                                </button>

                            </form>
                        ) : (
                            <form onSubmit={onMfaSubmit} className="space-y-5">

                                {/* 6-DIGIT MFA CODE */}
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <label className="text-xs font-semibold text-neutral-700">
                                            6-Digit Code
                                        </label>

                                        <span className="text-[10px] font-medium text-neutral-400">
                                            MFA Active
                                        </span>
                                    </div>

                                    <div className="relative">
                                        <KeyRound
                                            size={17}
                                            strokeWidth={1.8}
                                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                                        />

                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            autoComplete="one-time-code"
                                            maxLength={6}
                                            value={code}
                                            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                            placeholder="123456"
                                            required
                                            autoFocus
                                            className="h-12 w-full rounded-xl border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm tracking-[0.35em] text-neutral-900 placeholder:tracking-normal placeholder:text-neutral-400 transition-all duration-200 focus:border-neutral-950 focus:bg-white focus:ring-4 focus:ring-neutral-950/5"
                                        />
                                    </div>
                                </div>

                                {/* VERIFY BUTTON */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black px-5 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-200 hover:bg-neutral-800 hover:shadow-xl hover:shadow-black/15 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 size={17} className="animate-spin" />
                                            <span>Verifying code...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Verify & Continue</span>
                                            <ArrowRight
                                                size={17}
                                                className="transition-transform duration-200 group-hover:translate-x-1"
                                            />
                                        </>
                                    )}
                                </button>

                                {/* BACK BUTTON */}
                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={resetToCredentials}
                                    className="flex w-full items-center justify-center gap-1.5 py-1 text-xs font-medium text-neutral-500 transition-colors hover:text-neutral-900 disabled:opacity-50"
                                >
                                    <ArrowLeft size={14} />
                                    <span>Back to email and password</span>
                                </button>

                            </form>
                        )}

                        {/* SECURITY NOTE */}
                        <div className="mt-6 flex items-start gap-3 rounded-xl border border-neutral-100 bg-neutral-50 p-3.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-neutral-500 shadow-sm">
                                <ShieldCheck size={15} />
                            </div>

                            <div>
                                <p className="text-[11px] font-semibold text-neutral-700">
                                    {step === 'credentials' ? 'Secure admin access' : 'Two-step verification enabled'}
                                </p>

                                <p className="mt-0.5 text-[10px] leading-4 text-neutral-400">
                                    {step === 'credentials'
                                        ? 'Your store management area is protected by authenticated access.'
                                        : 'Use the current code from Google Authenticator or Authy to complete login.'}
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* FOOTER */}
                    <p className="mt-6 text-center text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400">
                        EASYBUY · Store Management
                    </p>

                </div>

            </div>

        </main>
    )
}

export default Login