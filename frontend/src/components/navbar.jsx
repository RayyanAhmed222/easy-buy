import React, { useContext, useState } from 'react'

import {
    Search,
    ShoppingBag,
    UserRound,
    Menu,
    X,
    ChevronDown,
    ArrowRight,
    User,
    Package,
    LogOut
} from 'lucide-react'

import { Link, NavLink } from 'react-router-dom'

import { ShopContext } from '../context/ShopContext'
import categoryOptions from '../config/categoryOptions.js'


const Navbar = () => {
    const [visible, setVisible] = useState(false)

    const {
        getCartCount,
        navigate,
        token,
        setToken,
        setCartItems,
        setShowSearch
    } = useContext(ShopContext)


    // =========================================================
    // LOGOUT
    // =========================================================

    const logout = () => {
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
        setVisible(false)
        navigate('/login')
    }


    // =========================================================
    // SEARCH
    // =========================================================

    const openSearch = () => {
        setShowSearch(true)
    }


    // =========================================================
    // SLUG
    // =========================================================

    const makeSlug = (text) => {
        return String(text)
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
    }


    // =========================================================
    // CATEGORY DATA
    // =========================================================

    const menCategories = Object.keys(categoryOptions?.Men || {})
    const womenCategories = Object.keys(categoryOptions?.Women || {})
    const kidsCategories = Object.keys(categoryOptions?.Kids || {})


    return (
        <>
            {/* =====================================================
                NAVBAR
            ===================================================== */}

            <nav className="relative z-[100] border-b border-neutral-100 bg-white">

                <div className="
                    mx-auto
                    flex
                    h-[76px]
                    items-center
                    justify-between
                    px-4
                    sm:px-6
                    lg:px-8
                ">

                    {/* =================================================
                        LOGO
                    ================================================= */}

                    <Link
                        to="/"
                        className="group shrink-0"
                    >

                        <div className="flex items-center gap-3">

                            <div className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-xl
                                bg-black
                                text-white
                                transition-transform
                                duration-300
                                group-hover:scale-105
                            ">
                                <span className="text-sm font-bold">
                                    E
                                </span>
                            </div>


                            <div className="hidden sm:block">

                                <h1 className="
                                    text-[17px]
                                    font-bold
                                    tracking-[0.08em]
                                    text-neutral-950
                                ">
                                    EASYBUY
                                </h1>

                                <p className="
                                    mt-0.5
                                    text-[8px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.22em]
                                    text-neutral-400
                                ">
                                    Fashion Store
                                </p>

                            </div>

                        </div>

                    </Link>


                    {/* =================================================
                        DESKTOP NAV
                    ================================================= */}

                    <div className="hidden lg:block">

                        <ul className="flex items-center gap-7">

                            {/* HOME */}

                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) => `
                                    group
                                    relative
                                    py-2
                                    text-[11px]
                                    font-semibold
                                    tracking-[0.12em]
                                    transition-colors
                                    duration-200
                                    ${
                                        isActive
                                            ? 'text-black'
                                            : 'text-neutral-500 hover:text-black'
                                    }
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        HOME

                                        <span
                                            className={`
                                                absolute
                                                bottom-0
                                                left-0
                                                h-px
                                                bg-black
                                                transition-all
                                                duration-300
                                                ${
                                                    isActive
                                                        ? 'w-full'
                                                        : 'w-0 group-hover:w-full'
                                                }
                                            `}
                                        />
                                    </>
                                )}
                            </NavLink>


                            {/* =================================================
                                MEN
                            ================================================= */}

                            <div className="group relative">

                                <NavLink
                                    to="/men"
                                    className={({ isActive }) => `
                                        flex
                                        items-center
                                        gap-1.5
                                        py-2
                                        text-[11px]
                                        font-semibold
                                        tracking-[0.12em]
                                        transition-colors
                                        duration-200
                                        ${
                                            isActive
                                                ? 'text-black'
                                                : 'text-neutral-500 hover:text-black'
                                        }
                                    `}
                                >
                                    {({ isActive }) => (
                                        <>
                                            MEN

                                            <ChevronDown
                                                size={12}
                                                strokeWidth={1.8}
                                                className="transition-transform duration-300 group-hover:rotate-180"
                                            />

                                            <span
                                                className={`
                                                    absolute
                                                    bottom-0
                                                    left-0
                                                    h-px
                                                    bg-black
                                                    ${
                                                        isActive
                                                            ? 'w-full'
                                                            : 'w-0'
                                                    }
                                                `}
                                            />
                                        </>
                                    )}
                                </NavLink>


                                {/* MEN DROPDOWN */}

                                <div className="
                                    invisible
                                    absolute
                                    left-1/2
                                    top-full
                                    w-[450px]
                                    -translate-x-1/2
                                    translate-y-3
                                    pt-4
                                    opacity-0
                                    transition-all
                                    duration-300
                                    group-hover:visible
                                    group-hover:translate-y-0
                                    group-hover:opacity-100
                                ">

                                    <div className="
                                        rounded-2xl
                                        border
                                        border-neutral-200
                                        bg-white
                                        p-6
                                        shadow-[0_25px_70px_rgba(0,0,0,0.12)]
                                    ">

                                        <div className="mb-5">

                                            <p className="
                                                text-[9px]
                                                font-bold
                                                uppercase
                                                tracking-[0.2em]
                                                text-neutral-400
                                            ">
                                                Shop Men
                                            </p>

                                            <h3 className="
                                                mt-1
                                                text-lg
                                                font-semibold
                                                text-neutral-950
                                            ">
                                                Explore Men's Collection
                                            </h3>

                                        </div>


                                        <div className="grid grid-cols-2 gap-2">

                                            {menCategories.map((subCategory) => (
                                                <NavLink
                                                    key={subCategory}
                                                    to={`/men/${makeSlug(subCategory)}`}
                                                    className="
                                                        group/item
                                                        flex
                                                        items-center
                                                        justify-between
                                                        rounded-xl
                                                        px-4
                                                        py-3
                                                        text-sm
                                                        text-neutral-500
                                                        transition-all
                                                        duration-200
                                                        hover:bg-black
                                                        hover:text-white
                                                    "
                                                >

                                                    <span>
                                                        {subCategory}
                                                    </span>

                                                    <ArrowRight
                                                        size={14}
                                                        className="
                                                            -translate-x-1
                                                            opacity-0
                                                            transition-all
                                                            duration-200
                                                            group-hover/item:translate-x-0
                                                            group-hover/item:opacity-100
                                                        "
                                                    />

                                                </NavLink>
                                            ))}

                                        </div>


                                        <div className="
                                            mt-5
                                            border-t
                                            border-neutral-100
                                            pt-4
                                        ">

                                            <NavLink
                                                to="/men"
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.16em]
                                                    text-neutral-900
                                                "
                                            >

                                                <span>
                                                    View All Men's Collection
                                                </span>

                                                <ArrowRight size={14} />

                                            </NavLink>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                WOMEN
                            ================================================= */}

                            <div className="group relative">

                                <NavLink
                                    to="/women"
                                    className={({ isActive }) => `
                                        flex
                                        items-center
                                        gap-1.5
                                        py-2
                                        text-[11px]
                                        font-semibold
                                        tracking-[0.12em]
                                        transition-colors
                                        duration-200
                                        ${
                                            isActive
                                                ? 'text-black'
                                                : 'text-neutral-500 hover:text-black'
                                        }
                                    `}
                                >
                                    {({ isActive }) => (
                                        <>
                                            WOMEN

                                            <ChevronDown
                                                size={12}
                                                strokeWidth={1.8}
                                                className="transition-transform duration-300 group-hover:rotate-180"
                                            />

                                            <span
                                                className={`
                                                    absolute
                                                    bottom-0
                                                    left-0
                                                    h-px
                                                    bg-black
                                                    ${
                                                        isActive
                                                            ? 'w-full'
                                                            : 'w-0'
                                                    }
                                                `}
                                            />
                                        </>
                                    )}
                                </NavLink>


                                {/* WOMEN DROPDOWN */}

                                <div className="
                                    invisible
                                    absolute
                                    left-1/2
                                    top-full
                                    w-[450px]
                                    -translate-x-1/2
                                    translate-y-3
                                    pt-4
                                    opacity-0
                                    transition-all
                                    duration-300
                                    group-hover:visible
                                    group-hover:translate-y-0
                                    group-hover:opacity-100
                                ">

                                    <div className="
                                        rounded-2xl
                                        border
                                        border-neutral-200
                                        bg-white
                                        p-6
                                        shadow-[0_25px_70px_rgba(0,0,0,0.12)]
                                    ">

                                        <div className="mb-5">

                                            <p className="
                                                text-[9px]
                                                font-bold
                                                uppercase
                                                tracking-[0.2em]
                                                text-neutral-400
                                            ">
                                                Shop Women
                                            </p>

                                            <h3 className="
                                                mt-1
                                                text-lg
                                                font-semibold
                                                text-neutral-950
                                            ">
                                                Explore Women's Collection
                                            </h3>

                                        </div>


                                        <div className="grid grid-cols-2 gap-2">

                                            {womenCategories.map((subCategory) => (
                                                <NavLink
                                                    key={subCategory}
                                                    to={`/women/${makeSlug(subCategory)}`}
                                                    className="
                                                        group/item
                                                        flex
                                                        items-center
                                                        justify-between
                                                        rounded-xl
                                                        px-4
                                                        py-3
                                                        text-sm
                                                        text-neutral-500
                                                        transition-all
                                                        duration-200
                                                        hover:bg-black
                                                        hover:text-white
                                                    "
                                                >

                                                    <span>
                                                        {subCategory}
                                                    </span>

                                                    <ArrowRight
                                                        size={14}
                                                        className="
                                                            -translate-x-1
                                                            opacity-0
                                                            transition-all
                                                            duration-200
                                                            group-hover/item:translate-x-0
                                                            group-hover/item:opacity-100
                                                        "
                                                    />

                                                </NavLink>
                                            ))}

                                        </div>


                                        <div className="
                                            mt-5
                                            border-t
                                            border-neutral-100
                                            pt-4
                                        ">

                                            <NavLink
                                                to="/women"
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.16em]
                                                    text-neutral-900
                                                "
                                            >

                                                <span>
                                                    View All Women's Collection
                                                </span>

                                                <ArrowRight size={14} />

                                            </NavLink>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            {/* =================================================
                                JUNIORS
                            ================================================= */}

                            <div className="group relative">

                                <NavLink
                                    to="/juniors"
                                    className={({ isActive }) => `
                                        flex
                                        items-center
                                        gap-1.5
                                        py-2
                                        text-[11px]
                                        font-semibold
                                        tracking-[0.12em]
                                        transition-colors
                                        duration-200
                                        ${
                                            isActive
                                                ? 'text-black'
                                                : 'text-neutral-500 hover:text-black'
                                        }
                                    `}
                                >
                                    {({ isActive }) => (
                                        <>
                                            JUNIORS

                                            <ChevronDown
                                                size={12}
                                                strokeWidth={1.8}
                                                className="transition-transform duration-300 group-hover:rotate-180"
                                            />

                                            <span
                                                className={`
                                                    absolute
                                                    bottom-0
                                                    left-0
                                                    h-px
                                                    bg-black
                                                    ${
                                                        isActive
                                                            ? 'w-full'
                                                            : 'w-0'
                                                    }
                                                `}
                                            />
                                        </>
                                    )}
                                </NavLink>


                                {/* JUNIORS DROPDOWN */}

                                <div className="
                                    invisible
                                    absolute
                                    left-1/2
                                    top-full
                                    w-[520px]
                                    -translate-x-1/2
                                    translate-y-3
                                    pt-4
                                    opacity-0
                                    transition-all
                                    duration-300
                                    group-hover:visible
                                    group-hover:translate-y-0
                                    group-hover:opacity-100
                                ">

                                    <div className="
                                        rounded-2xl
                                        border
                                        border-neutral-200
                                        bg-white
                                        p-6
                                        shadow-[0_25px_70px_rgba(0,0,0,0.12)]
                                    ">

                                        <div className="mb-5">

                                            <p className="
                                                text-[9px]
                                                font-bold
                                                uppercase
                                                tracking-[0.2em]
                                                text-neutral-400
                                            ">
                                                Juniors
                                            </p>

                                            <h3 className="
                                                mt-1
                                                text-lg
                                                font-semibold
                                                text-neutral-950
                                            ">
                                                Shop By Gender
                                            </h3>

                                        </div>


                                        <div className="grid grid-cols-2 gap-4">

                                            {kidsCategories.map((gender) => {

                                                const subCategories = Object.keys(
                                                    categoryOptions?.Kids?.[gender] || {}
                                                )

                                                return (
                                                    <div
                                                        key={gender}
                                                        className="
                                                            rounded-xl
                                                            border
                                                            border-neutral-100
                                                            bg-neutral-50
                                                            p-4
                                                        "
                                                    >

                                                        <NavLink
                                                            to={`/juniors/${gender.toLowerCase()}`}
                                                            className="
                                                                mb-3
                                                                flex
                                                                items-center
                                                                justify-between
                                                                text-sm
                                                                font-semibold
                                                                text-neutral-900
                                                            "
                                                        >

                                                            <span>
                                                                {gender}
                                                            </span>

                                                            <ArrowRight size={14} />

                                                        </NavLink>


                                                        <div className="space-y-1">

                                                            {subCategories.map((subCategory) => (
                                                                <NavLink
                                                                    key={subCategory}
                                                                    to={`/juniors/${gender.toLowerCase()}/${makeSlug(subCategory)}`}
                                                                    className="
                                                                        block
                                                                        rounded-lg
                                                                        px-2.5
                                                                        py-2
                                                                        text-xs
                                                                        text-neutral-500
                                                                        hover:bg-white
                                                                        hover:text-black
                                                                    "
                                                                >
                                                                    {subCategory}
                                                                </NavLink>
                                                            ))}

                                                        </div>

                                                    </div>
                                                )
                                            })}

                                        </div>


                                        <div className="
                                            mt-5
                                            border-t
                                            border-neutral-100
                                            pt-4
                                        ">

                                            <NavLink
                                                to="/juniors"
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.16em]
                                                    text-neutral-900
                                                "
                                            >

                                                <span>
                                                    View All Juniors
                                                </span>

                                                <ArrowRight size={14} />

                                            </NavLink>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </ul>

                    </div>


                    {/* =================================================
                        RIGHT SIDE
                    ================================================= */}

                    <div className="flex items-center gap-1 sm:gap-2">

                        {/* PROFILE */}

                        <div className="group relative">

                            <button
                                type="button"
                                onClick={() => {
                                    if (!token) {
                                        navigate('/login')
                                    }
                                }}
                                aria-label="Profile"
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-neutral-600
                                    hover:bg-neutral-100
                                    hover:text-black
                                "
                            >
                                <UserRound
                                    size={19}
                                    strokeWidth={1.8}
                                />
                            </button>


                            {/* PROFILE DROPDOWN */}

                            {token && (
                                <div className="
                                    invisible
                                    absolute
                                    right-0
                                    top-full
                                    w-48
                                    translate-y-3
                                    pt-4
                                    opacity-0
                                    transition-all
                                    duration-300
                                    group-hover:visible
                                    group-hover:translate-y-0
                                    group-hover:opacity-100
                                ">

                                    <div className="
                                        overflow-hidden
                                        rounded-2xl
                                        border
                                        border-neutral-200
                                        bg-white
                                        p-2
                                        shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                                    ">


                                        <div className="py-1">

                                            {/* PROFILE */}

                                            <button
                                                type="button"
                                                onClick={() => navigate('/profile')}
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    gap-3
                                                    rounded-xl
                                                    px-3
                                                    py-2.5
                                                    text-left
                                                    text-sm
                                                    text-neutral-600
                                                    hover:bg-neutral-100
                                                    hover:text-black
                                                "
                                            >
                                                <User size={15} />

                                                <span>
                                                    My Profile
                                                </span>
                                            </button>


                                            {/* ORDERS */}

                                            <button
                                                type="button"
                                                onClick={() => navigate('/orders')}
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    gap-3
                                                    rounded-xl
                                                    px-3
                                                    py-2.5
                                                    text-left
                                                    text-sm
                                                    text-neutral-600
                                                    hover:bg-neutral-100
                                                    hover:text-black
                                                "
                                            >
                                                <Package size={15} />

                                                <span>
                                                    Orders
                                                </span>
                                            </button>


                                            {/* LOGOUT */}

                                            <button
                                                type="button"
                                                onClick={logout}
                                                className="
                                                    flex
                                                    w-full
                                                    items-center
                                                    gap-3
                                                    rounded-xl
                                                    px-3
                                                    py-2.5
                                                    text-left
                                                    text-sm
                                                    text-neutral-600
                                                    hover:bg-neutral-100
                                                    hover:text-black
                                                "
                                            >
                                                <LogOut size={15} />

                                                <span>
                                                    Logout
                                                </span>
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            )}

                        </div>


                        {/* CART */}

                        <Link
                            to="/cart"
                            aria-label="Shopping cart"
                            className="
                                group
                                relative
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                text-neutral-600
                                hover:bg-neutral-100
                                hover:text-black
                            "
                        >

                            <ShoppingBag
                                size={19}
                                strokeWidth={1.8}
                            />

                            <span className="
                                absolute
                                right-0
                                top-0
                                flex
                                h-[17px]
                                min-w-[17px]
                                items-center
                                justify-center
                                rounded-full
                                bg-black
                                px-1
                                text-[8px]
                                font-semibold
                                text-white
                            ">
                                {getCartCount()}
                            </span>

                        </Link>


                        {/* MOBILE MENU BUTTON */}

                        <button
                            type="button"
                            onClick={() => setVisible(true)}
                            aria-label="Open menu"
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                text-neutral-700
                                hover:bg-neutral-100
                                lg:hidden
                            "
                        >
                            <Menu
                                size={21}
                                strokeWidth={1.8}
                            />
                        </button>

                    </div>

                </div>

            </nav>


            {/* =====================================================
                MOBILE MENU
            ===================================================== */}

            <div
                className={`
                    fixed
                    inset-0
                    z-[200]
                    bg-white
                    transition-transform
                    duration-300
                    lg:hidden
                    ${
                        visible
                            ? 'translate-x-0'
                            : 'translate-x-full'
                    }
                `}
            >

                <div className="
                    flex
                    h-full
                    flex-col
                    overflow-y-auto
                ">

                    {/* MOBILE HEADER */}

                    <div className="
                        flex
                        h-[76px]
                        shrink-0
                        items-center
                        justify-between
                        border-b
                        border-neutral-100
                        px-5
                    ">

                        <Link
                            to="/"
                            onClick={() => setVisible(false)}
                            className="flex items-center gap-3"
                        >

                            <div className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-xl
                                bg-black
                                text-white
                            ">
                                <span className="text-sm font-bold">
                                    E
                                </span>
                            </div>


                            <div>

                                <h1 className="
                                    text-[16px]
                                    font-bold
                                    tracking-[0.08em]
                                    text-neutral-950
                                ">
                                    EASYBUY
                                </h1>

                                <p className="
                                    text-[7px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.2em]
                                    text-neutral-400
                                ">
                                    Fashion Store
                                </p>

                            </div>

                        </Link>


                        <button
                            type="button"
                            onClick={() => setVisible(false)}
                            aria-label="Close menu"
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-neutral-100
                                text-neutral-700
                                hover:bg-black
                                hover:text-white
                            "
                        >
                            <X size={18} />
                        </button>

                    </div>


                    {/* MOBILE SEARCH */}

                    <button
                        type="button"
                        onClick={() => {
                            setVisible(false)
                            setShowSearch(true)
                        }}
                        className="
                            mx-5
                            mt-5
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            border
                            border-neutral-200
                            bg-neutral-50
                            px-4
                            py-3.5
                            text-left
                        "
                    >

                        <Search
                            size={17}
                            strokeWidth={1.8}
                            className="text-neutral-400"
                        />

                        <span className="text-sm text-neutral-400">
                            Search products...
                        </span>

                    </button>


                    {/* MOBILE NAVIGATION */}

                    <div className="
                        flex
                        flex-col
                        px-5
                        py-5
                    ">

                        {/* HOME */}

                        <NavLink
                            to="/"
                            end
                            onClick={() => setVisible(false)}
                            className="
                                border-b
                                border-neutral-100
                                py-4
                                text-sm
                                font-semibold
                                tracking-wide
                            "
                        >
                            HOME
                        </NavLink>


                        {/* MEN */}

                        <div className="
                            border-b
                            border-neutral-100
                            py-4
                        ">

                            <NavLink
                                to="/men"
                                onClick={() => setVisible(false)}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    text-sm
                                    font-semibold
                                "
                            >

                                <span>
                                    MEN
                                </span>

                                <ArrowRight size={16} />

                            </NavLink>


                            <div className="
                                mt-3
                                grid
                                grid-cols-2
                                gap-2
                            ">

                                {menCategories.map((subCategory) => (
                                    <NavLink
                                        key={subCategory}
                                        to={`/men/${makeSlug(subCategory)}`}
                                        onClick={() => setVisible(false)}
                                        className="
                                            rounded-xl
                                            bg-neutral-50
                                            px-3
                                            py-3
                                            text-xs
                                            text-neutral-600
                                            hover:bg-black
                                            hover:text-white
                                        "
                                    >
                                        {subCategory}
                                    </NavLink>
                                ))}

                            </div>

                        </div>


                        {/* WOMEN */}

                        <div className="
                            border-b
                            border-neutral-100
                            py-4
                        ">

                            <NavLink
                                to="/women"
                                onClick={() => setVisible(false)}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    text-sm
                                    font-semibold
                                "
                            >

                                <span>
                                    WOMEN
                                </span>

                                <ArrowRight size={16} />

                            </NavLink>


                            <div className="
                                mt-3
                                grid
                                grid-cols-2
                                gap-2
                            ">

                                {womenCategories.map((subCategory) => (
                                    <NavLink
                                        key={subCategory}
                                        to={`/women/${makeSlug(subCategory)}`}
                                        onClick={() => setVisible(false)}
                                        className="
                                            rounded-xl
                                            bg-neutral-50
                                            px-3
                                            py-3
                                            text-xs
                                            text-neutral-600
                                            hover:bg-black
                                            hover:text-white
                                        "
                                    >
                                        {subCategory}
                                    </NavLink>
                                ))}

                            </div>

                        </div>


                        {/* JUNIORS */}

                        <div className="
                            border-b
                            border-neutral-100
                            py-4
                        ">

                            <NavLink
                                to="/juniors"
                                onClick={() => setVisible(false)}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    text-sm
                                    font-semibold
                                "
                            >

                                <span>
                                    JUNIORS
                                </span>

                                <ArrowRight size={16} />

                            </NavLink>


                            <div className="mt-4 space-y-5">

                                {kidsCategories.map((gender) => {

                                    const subCategories = Object.keys(
                                        categoryOptions?.Kids?.[gender] || {}
                                    )

                                    return (
                                        <div key={gender}>

                                            <NavLink
                                                to={`/juniors/${gender.toLowerCase()}`}
                                                onClick={() => setVisible(false)}
                                                className="
                                                    mb-2
                                                    block
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-[0.16em]
                                                    text-neutral-400
                                                "
                                            >
                                                {gender}
                                            </NavLink>


                                            <div className="
                                                grid
                                                grid-cols-2
                                                gap-2
                                            ">

                                                {subCategories.map((subCategory) => (
                                                    <NavLink
                                                        key={subCategory}
                                                        to={`/juniors/${gender.toLowerCase()}/${makeSlug(subCategory)}`}
                                                        onClick={() => setVisible(false)}
                                                        className="
                                                            rounded-xl
                                                            bg-neutral-50
                                                            px-3
                                                            py-3
                                                            text-xs
                                                            text-neutral-600
                                                            hover:bg-black
                                                            hover:text-white
                                                        "
                                                    >
                                                        {subCategory}
                                                    </NavLink>
                                                ))}

                                            </div>

                                        </div>
                                    )
                                })}

                            </div>

                        </div>


                        {/* ABOUT */}

                        <NavLink
                            to="/about"
                            onClick={() => setVisible(false)}
                            className="
                                border-b
                                border-neutral-100
                                py-4
                                text-sm
                                font-semibold
                            "
                        >
                            ABOUT
                        </NavLink>


                        {/* CONTACT */}

                        <NavLink
                            to="/contact"
                            onClick={() => setVisible(false)}
                            className="
                                border-b
                                border-neutral-100
                                py-4
                                text-sm
                                font-semibold
                            "
                        >
                            CONTACT
                        </NavLink>

                    </div>


                    {/* MOBILE ACCOUNT */}

                    {token && (
                        <div className="
                            mx-5
                            mb-6
                            mt-auto
                            rounded-2xl
                            bg-neutral-50
                            p-4
                        ">

                            <p className="
                                mb-3
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-[0.18em]
                                text-neutral-400
                            ">
                                My Account
                            </p>


                            <div className="grid grid-cols-2 gap-2">

                                <button
                                    type="button"
                                    onClick={() => {
                                        setVisible(false)
                                        navigate('/profile')
                                    }}
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-white
                                        px-3
                                        py-3
                                        text-xs
                                        font-medium
                                        text-neutral-700
                                        hover:bg-black
                                        hover:text-white
                                    "
                                >
                                    <User size={14} />
                                    Profile
                                </button>


                                <button
                                    type="button"
                                    onClick={() => {
                                        setVisible(false)
                                        navigate('/orders')
                                    }}
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-xl
                                        bg-white
                                        px-3
                                        py-3
                                        text-xs
                                        font-medium
                                        text-neutral-700
                                        hover:bg-black
                                        hover:text-white
                                    "
                                >
                                    <Package size={14} />
                                    Orders
                                </button>

                            </div>


                            <button
                                type="button"
                                onClick={logout}
                                className="
                                    mt-2
                                    flex
                                    w-full
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-xl
                                    bg-black
                                    px-3
                                    py-3
                                    text-xs
                                    font-semibold
                                    text-white
                                    hover:bg-neutral-800
                                "
                            >
                                <LogOut size={14} />
                                Logout
                            </button>

                        </div>
                    )}

                </div>

            </div>
        </>
    )
}


export default Navbar
