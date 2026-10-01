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
    Loader2
} from 'lucide-react'

import { backendUrl } from '../App'

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (loading) return

        try {
            setLoading(true)

            const response = await axios.post(
                backendUrl + '/api/user/admin',
                {
                    email,
                    password
                }
            )

            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
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

    return (
        <main className="
            relative
            min-h-screen
            overflow-hidden
            bg-[#f7f7f5]
            px-4
            py-8
            sm:px-6
        ">

            {/* BACKGROUND DECORATION */}
            <div className="
                pointer-events-none
                absolute
                -left-32
                -top-32
                h-72
                w-72
                rounded-full
                bg-neutral-200/50
                blur-3xl
            " />

            <div className="
                pointer-events-none
                absolute
                -bottom-40
                -right-32
                h-96
                w-96
                rounded-full
                bg-neutral-200/40
                blur-3xl
            " />

            {/* CONTENT */}
            <div className="
                relative
                z-10
                flex
                min-h-[calc(100vh-4rem)]
                items-center
                justify-center
            ">

                <div className="
                    w-full
                    max-w-[430px]
                ">

                    {/* BRAND */}
                    <div className="mb-8 text-center">

                        <div className="
                            mx-auto
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-black
                            text-white
                            shadow-lg
                            shadow-black/10
                        ">
                            <span className="
                                text-xl
                                font-bold
                                tracking-tight
                            ">
                                E
                            </span>
                        </div>

                        <h1 className="
                            mt-5
                            text-xl
                            font-bold
                            tracking-[0.12em]
                            text-neutral-950
                        ">
                            EASYBUY
                        </h1>

                        <div className="
                            mt-2
                            flex
                            items-center
                            justify-center
                            gap-1.5
                        ">
                            <ShieldCheck
                                size={13}
                                className="text-neutral-400"
                            />

                            <span className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-neutral-400
                            ">
                                Admin Portal
                            </span>
                        </div>

                    </div>

                    {/* LOGIN CARD */}
                    <div className="
                        rounded-[28px]
                        border
                        border-neutral-200
                        bg-white
                        p-6
                        shadow-[0_20px_60px_rgba(0,0,0,0.07)]
                        sm:p-8
                    ">

                        {/* CARD HEADER */}
                        <div className="mb-7">

                            <p className="
                                mb-2
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[0.2em]
                                text-neutral-400
                            ">
                                Secure Access
                            </p>

                            <h2 className="
                                text-2xl
                                font-semibold
                                tracking-tight
                                text-neutral-950
                                sm:text-[28px]
                            ">
                                Welcome back
                            </h2>

                            <p className="
                                mt-2
                                text-sm
                                leading-6
                                text-neutral-500
                            ">
                                Sign in to manage your EASYBUY store.
                            </p>

                        </div>

                        {/* FORM */}
                        <form
                            onSubmit={onSubmitHandler}
                            className="space-y-5"
                        >

                            {/* EMAIL */}
                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-xs
                                    font-semibold
                                    text-neutral-700
                                ">
                                    Email Address
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={17}
                                        strokeWidth={1.8}
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-neutral-400
                                        "
                                    />

                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="admin@example.com"
                                        autoComplete="email"
                                        required
                                        className="
                                            h-12
                                            w-full
                                            rounded-xl
                                            border
                                            border-neutral-200
                                            bg-neutral-50
                                            pl-11
                                            pr-4
                                            text-sm
                                            text-neutral-900
                                            placeholder:text-neutral-400
                                            transition-all
                                            duration-200
                                            focus:border-neutral-950
                                            focus:bg-white
                                            focus:ring-4
                                            focus:ring-neutral-950/5
                                        "
                                    />

                                </div>

                            </div>

                            {/* PASSWORD */}
                            <div>

                                <div className="
        mb-2
        flex
        items-center
        justify-between
    ">
                                    <label className="
            text-xs
            font-semibold
            text-neutral-700
        ">
                                        Password
                                    </label>

                                    <span className="
            text-[10px]
            font-medium
            text-neutral-400
        ">
                                        Protected
                                    </span>
                                </div>

                                <div className="relative">

                                    <LockKeyhole
                                        size={17}
                                        strokeWidth={1.8}
                                        className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-neutral-400
            "
                                    />

                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        required
                                        className="
                h-12
                w-full
                rounded-xl
                border
                border-neutral-200
                bg-neutral-50
                pl-11
                pr-12
                text-sm
                text-neutral-900
                placeholder:text-neutral-400
                transition-all
                duration-200
                focus:border-neutral-950
                focus:bg-white
                focus:ring-4
                focus:ring-neutral-950/5
            "
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="
                absolute
                right-3
                top-1/2
                flex
                h-8
                w-8
                -translate-y-1/2
                items-center
                justify-center
                rounded-lg
                text-neutral-400
                hover:bg-neutral-100
                hover:text-neutral-800
            "
                                        aria-label={
                                            showPassword
                                                ? 'Hide password'
                                                : 'Show password'
                                        }
                                    >
                                        {showPassword ? (
                                            <EyeOff size={17} />
                                        ) : (
                                            <Eye size={17} />
                                        )}
                                    </button>

                                </div>

                            </div>

                            {/* LOGIN BUTTON */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="
        group
        flex
        h-12
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-black
        px-5
        text-sm
        font-semibold
        text-white
        shadow-lg
        shadow-black/10
        transition-all
        duration-200
        hover:bg-neutral-800
        hover:shadow-xl
        hover:shadow-black/15
        active:scale-[0.98]
        disabled:cursor-not-allowed
        disabled:opacity-60
    "
                            >
                                {loading ? (
                                    <>
                                        <Loader2
                                            size={17}
                                            className="animate-spin"
                                        />

                                        <span>
                                            Signing in...
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span>
                                            Sign in to Admin
                                        </span>

                                        <ArrowRight
                                            size={17}
                                            className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                "
                                        />
                                    </>
                                )}
                            </button>

                        </form>

                        {/* SECURITY NOTE */}
                        <div className="
                            mt-6
                            flex
                            items-start
                            gap-3
                            rounded-xl
                            border
                            border-neutral-100
                            bg-neutral-50
                            p-3.5
                        ">

                            <div className="
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-white
                                text-neutral-500
                                shadow-sm
                            ">
                                <ShieldCheck size={15} />
                            </div>

                            <div>
                                <p className="
                                    text-[11px]
                                    font-semibold
                                    text-neutral-700
                                ">
                                    Secure admin access
                                </p>

                                <p className="
                                    mt-0.5
                                    text-[10px]
                                    leading-4
                                    text-neutral-400
                                ">
                                    Your store management area is protected
                                    by authenticated access.
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* FOOTER */}
                    <p className="
                        mt-6
                        text-center
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.16em]
                        text-neutral-400
                    ">
                        EASYBUY · Store Management
                    </p>

                </div>

            </div>

        </main>
    )
}

export default Login
