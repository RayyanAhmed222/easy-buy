import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import {
    User,
    Mail,
    Lock,
    ShieldCheck,
    Save,
    Eye,
    EyeOff,
    ArrowLeft,
    CheckCircle2
} from 'lucide-react'

const Profile = () => {

    const {
        token,
        navigate
    } = useContext(ShopContext)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    // =========================================
    // STATE
    // =========================================

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    // =========================================
    // GET PROFILE
    // =========================================

    const getProfile = async () => {

        try {

            setLoading(true)

            const response = await axios.get(
                backendUrl + '/api/user/profile',
                {
                    headers: {
                        token
                    }
                }
            )

            if (response.data.success) {

                setName(response.data.user.name)
                setEmail(response.data.user.email)

            } else {

                toast.error(response.data.message)

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

    // =========================================
    // LOAD PROFILE
    // =========================================

    useEffect(() => {

        if (!token) {
            navigate('/login')
            return
        }

        getProfile()

    }, [token])


    // =========================================
    // UPDATE PROFILE
    // =========================================

    const onSubmitHandler = async (e) => {

        e.preventDefault()

        try {

            setSaving(true)

            const response = await axios.put(
                backendUrl + '/api/user/profile',
                {
                    name,
                    email,
                    currentPassword,
                    newPassword
                },
                {
                    headers: {
                        token
                    }
                }
            )

            if (response.data.success) {

                toast.success(
                    response.data.message
                )

                setCurrentPassword('')
                setNewPassword('')

            } else {

                toast.error(
                    response.data.message
                )

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message
            )

        } finally {

            setSaving(false)

        }
    }


    // =========================================
    // NOT LOGGED IN
    // =========================================

    if (!token) {
        return null
    }


    // =========================================
    // LOADING
    // =========================================

    if (loading) {

        return (

            <div className="
                min-h-[65vh]
                flex
                items-center
                justify-center
            ">

                <div className="text-center">

                    <div className="
                        w-10
                        h-10
                        border-2
                        border-gray-200
                        border-t-black
                        rounded-full
                        animate-spin
                        mx-auto
                    "></div>

                    <p className="
                        text-sm
                        text-gray-500
                        mt-4
                    ">
                        Loading your profile...
                    </p>

                </div>

            </div>

        )
    }


    // =========================================
    // PAGE
    // =========================================

    return (

        <div className="pt-6 sm:pt-10 pb-20">

            {/* =========================================
                BACK / BREADCRUMB
            ========================================= */}

            <div className="
                flex
                items-center
                gap-2
                text-xs
                text-gray-400
                mb-8
            ">

                <button
                    onClick={() => navigate('/')}
                    className="
                        flex
                        items-center
                        gap-2
                        hover:text-black
                        transition
                    "
                >
                    <ArrowLeft size={14} />
                    Back to Home
                </button>

                <span>/</span>

                <span className="text-gray-700">
                    My Profile
                </span>

            </div>


            {/* =========================================
                PROFILE HERO
            ========================================= */}

            <div className="
                bg-[#f5f5f2]
                rounded-2xl
                p-6
                sm:p-8
                lg:p-10
                mb-8
            ">

                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    gap-5
                ">

                    {/* Avatar */}

                    <div className="
                        w-20
                        h-20
                        sm:w-24
                        sm:h-24
                        rounded-full
                        bg-black
                        text-white
                        flex
                        items-center
                        justify-center
                        flex-shrink-0
                        text-2xl
                        sm:text-3xl
                        font-medium
                    ">
                        {name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>


                    {/* User Info */}

                    <div>

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.25em]
                            text-gray-400
                        ">
                            EASYBUY / ACCOUNT
                        </p>

                        <h1 className="
                            text-2xl
                            sm:text-3xl
                            font-medium
                            text-gray-900
                            mt-2
                        ">
                            Welcome, {name}
                        </h1>

                        <div className="
                            flex
                            items-center
                            gap-2
                            mt-2
                            text-sm
                            text-gray-500
                        ">
                            <Mail size={14} />
                            {email}
                        </div>

                    </div>


                    {/* Verified */}

                    <div className="
                        sm:ml-auto
                        flex
                        items-center
                        gap-2
                        bg-white
                        px-4
                        py-2.5
                        rounded-full
                        text-xs
                        text-gray-700
                        w-fit
                    ">

                        <CheckCircle2
                            size={15}
                            className="text-green-600"
                        />

                        Account Active

                    </div>

                </div>

            </div>


            {/* =========================================
                MAIN GRID
            ========================================= */}

            <div className="
                grid
                grid-cols-1
                lg:grid-cols-[1fr_320px]
                gap-8
                lg:gap-12
                items-start
            ">


                {/* =========================================
                    FORM CARD
                ========================================= */}

                <div className="
                    border
                    border-gray-200
                    rounded-2xl
                    p-6
                    sm:p-8
                ">

                    {/* Header */}

                    <div className="mb-8">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.22em]
                            text-gray-400
                        ">
                            Personal Information
                        </p>

                        <h2 className="
                            text-xl
                            sm:text-2xl
                            font-medium
                            mt-2
                        ">
                            Account Details
                        </h2>

                        <p className="
                            text-sm
                            text-gray-500
                            mt-2
                        ">
                            Keep your account information up to date.
                        </p>

                    </div>


                    <form
                        onSubmit={onSubmitHandler}
                        className="space-y-6"
                    >

                        {/* =========================================
                            NAME
                        ========================================= */}

                        <div>

                            <label className="
                                block
                                text-xs
                                font-medium
                                text-gray-700
                                mb-2
                            ">
                                Full Name
                            </label>

                            <div className="relative">

                                <User
                                    size={17}
                                    strokeWidth={1.7}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-400
                                    "
                                />

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    placeholder="Enter your name"
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-xl
                                        pl-11
                                        pr-4
                                        py-3.5
                                        text-sm
                                        outline-none
                                        bg-white
                                        transition
                                        focus:border-black
                                        focus:ring-1
                                        focus:ring-black
                                    "
                                    required
                                />

                            </div>

                        </div>


                        {/* =========================================
                            EMAIL
                        ========================================= */}

                        <div>

                            <label className="
                                block
                                text-xs
                                font-medium
                                text-gray-700
                                mb-2
                            ">
                                Email Address
                            </label>

                            <div className="relative">

                                <Mail
                                    size={17}
                                    strokeWidth={1.7}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-400
                                    "
                                />

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="Enter your email"
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-xl
                                        pl-11
                                        pr-4
                                        py-3.5
                                        text-sm
                                        outline-none
                                        bg-white
                                        transition
                                        focus:border-black
                                        focus:ring-1
                                        focus:ring-black
                                    "
                                    required
                                />

                            </div>

                        </div>


                        {/* =========================================
                            PASSWORD SECTION
                        ========================================= */}

                        <div className="
                            border-t
                            border-gray-200
                            pt-7
                            mt-2
                        ">

                            <div className="mb-6">

                                <div className="
                                    flex
                                    items-center
                                    gap-2
                                ">

                                    <div className="
                                        w-9
                                        h-9
                                        rounded-lg
                                        bg-[#f5f5f2]
                                        flex
                                        items-center
                                        justify-center
                                    ">
                                        <Lock
                                            size={17}
                                            strokeWidth={1.6}
                                        />
                                    </div>

                                    <div>

                                        <h3 className="
                                            text-base
                                            font-medium
                                        ">
                                            Change Password
                                        </h3>

                                    </div>

                                </div>

                                <p className="
                                    text-xs
                                    text-gray-500
                                    mt-3
                                    leading-5
                                ">
                                    Leave these fields empty if you don't
                                    want to change your password.
                                </p>

                            </div>


                            {/* CURRENT PASSWORD */}

                            <div className="mb-5">

                                <label className="
                                    block
                                    text-xs
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    Current Password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={17}
                                        strokeWidth={1.7}
                                        className="
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-400
                                        "
                                    />

                                    <input
                                        type={
                                            showCurrentPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={currentPassword}
                                        onChange={(e) =>
                                            setCurrentPassword(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter current password"
                                        className="
                                            w-full
                                            border
                                            border-gray-200
                                            rounded-xl
                                            pl-11
                                            pr-12
                                            py-3.5
                                            text-sm
                                            outline-none
                                            transition
                                            focus:border-black
                                            focus:ring-1
                                            focus:ring-black
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowCurrentPassword(
                                                !showCurrentPassword
                                            )
                                        }
                                        className="
                                            absolute
                                            right-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-400
                                            hover:text-black
                                            transition
                                        "
                                    >
                                        {showCurrentPassword
                                            ? <EyeOff size={17} />
                                            : <Eye size={17} />
                                        }
                                    </button>

                                </div>

                            </div>


                            {/* NEW PASSWORD */}

                            <div>

                                <label className="
                                    block
                                    text-xs
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    New Password
                                </label>

                                <div className="relative">

                                    <Lock
                                        size={17}
                                        strokeWidth={1.7}
                                        className="
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-400
                                        "
                                    />

                                    <input
                                        type={
                                            showNewPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter new password"
                                        className="
                                            w-full
                                            border
                                            border-gray-200
                                            rounded-xl
                                            pl-11
                                            pr-12
                                            py-3.5
                                            text-sm
                                            outline-none
                                            transition
                                            focus:border-black
                                            focus:ring-1
                                            focus:ring-black
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowNewPassword(
                                                !showNewPassword
                                            )
                                        }
                                        className="
                                            absolute
                                            right-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-400
                                            hover:text-black
                                            transition
                                        "
                                    >
                                        {showNewPassword
                                            ? <EyeOff size={17} />
                                            : <Eye size={17} />
                                        }
                                    </button>

                                </div>

                            </div>

                        </div>


                        {/* =========================================
                            SAVE BUTTON
                        ========================================= */}

                        <button
                            type="submit"
                            disabled={saving}
                            className="
                                w-full
                                bg-black
                                text-white
                                py-4
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                gap-2.5
                                text-sm
                                font-semibold
                                tracking-wide
                                hover:bg-gray-800
                                active:scale-[0.99]
                                transition-all
                                disabled:bg-gray-400
                                disabled:cursor-not-allowed
                            "
                        >

                            {saving ? (
                                <>
                                    <div className="
                                        w-4
                                        h-4
                                        border-2
                                        border-white/40
                                        border-t-white
                                        rounded-full
                                        animate-spin
                                    "></div>

                                    Saving Changes...
                                </>
                            ) : (
                                <>
                                    <Save size={17} />
                                    Save Changes
                                </>
                            )}

                        </button>

                    </form>

                </div>


                {/* =========================================
                    SIDE INFORMATION
                ========================================= */}

                <div className="space-y-4">


                    {/* ACCOUNT SECURITY */}

                    <div className="
                        rounded-2xl
                        bg-[#f5f5f2]
                        p-6
                    ">

                        <div className="
                            w-11
                            h-11
                            rounded-xl
                            bg-white
                            flex
                            items-center
                            justify-center
                        ">

                            <ShieldCheck
                                size={21}
                                strokeWidth={1.5}
                            />

                        </div>

                        <h3 className="
                            text-base
                            font-medium
                            mt-5
                        ">
                            Your Account
                        </h3>

                        <p className="
                            text-xs
                            text-gray-500
                            leading-5
                            mt-2
                        ">
                            Your personal information is protected
                            and used only to provide you with a better
                            EASYBUY shopping experience.
                        </p>

                    </div>


                    {/* QUICK LINKS */}

                    <div className="
                        border
                        border-gray-200
                        rounded-2xl
                        p-6
                    ">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-gray-400
                        ">
                            Quick Access
                        </p>

                        <div className="mt-4 space-y-1">

                            <button
                                onClick={() => navigate('/orders')}
                                className="
                                    w-full
                                    flex
                                    items-center
                                    justify-between
                                    py-3
                                    text-sm
                                    text-gray-600
                                    hover:text-black
                                    transition
                                "
                            >
                                <span>My Orders</span>
                                <ArrowLeft
                                    size={15}
                                    className="rotate-180"
                                />
                            </button>

                            <div className="h-px bg-gray-100"></div>

                            <button
                                onClick={() => navigate('/cart')}
                                className="
                                    w-full
                                    flex
                                    items-center
                                    justify-between
                                    py-3
                                    text-sm
                                    text-gray-600
                                    hover:text-black
                                    transition
                                "
                            >
                                <span>Shopping Cart</span>
                                <ArrowLeft
                                    size={15}
                                    className="rotate-180"
                                />
                            </button>

                        </div>

                    </div>


                    {/* PASSWORD TIP */}

                    <div className="
                        flex
                        gap-3
                        p-5
                        rounded-2xl
                        border
                        border-gray-200
                    ">

                        <Lock
                            size={17}
                            className="text-gray-500 flex-shrink-0 mt-0.5"
                        />

                        <p className="
                            text-xs
                            text-gray-500
                            leading-5
                        ">
                            For better security, use a strong password
                            and never share it with anyone.
                        </p>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default Profile
