import React from 'react'
import { NavLink } from 'react-router-dom'
import {
    Plus,
    Package,
    ShoppingBag,
    LayoutDashboard
} from 'lucide-react'

const Sidebar = () => {

    const navItems = [
        {
            name: 'Add Product',
            path: '/add',
            icon: Plus
        },
        {
            name: 'Products',
            path: '/list',
            icon: Package
        },
        {
            name: 'Orders',
            path: '/orders',
            icon: ShoppingBag
        }
    ]

    return (
        <aside className="
            sticky
            top-0
            z-40
            flex
            h-screen
            w-[72px]
            shrink-0
            flex-col
            border-r
            border-neutral-200
            bg-white
            lg:w-[230px]
        ">

            {/* =========================================
                BRAND
            ========================================= */}
            <div className="
                flex
                h-[76px]
                items-center
                justify-center
                border-b
                border-neutral-100
                lg:justify-start
                lg:px-6
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    {/* Logo Mark */}
                    <div className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        bg-black
                        text-white
                    ">
                        <span className="
                            text-sm
                            font-bold
                            tracking-tight
                        ">
                            E
                        </span>
                    </div>


                    {/* Brand Text */}
                    <div className="hidden lg:block">

                        <p className="
                            text-sm
                            font-bold
                            tracking-[0.12em]
                            text-neutral-950
                        ">
                            EASYBUY
                        </p>

                        <p className="
                            mt-0.5
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.2em]
                            text-neutral-400
                        ">
                            Admin Panel
                        </p>

                    </div>

                </div>

            </div>


            {/* =========================================
                NAVIGATION
            ========================================= */}
            <nav className="
                flex
                flex-1
                flex-col
                gap-1.5
                px-2
                py-5
                lg:px-3
            ">

                <p className="
                    mb-2
                    hidden
                    px-3
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-neutral-400
                    lg:block
                ">
                    Management
                </p>


                {navItems.map((item) => {

                    const Icon = item.icon

                    return (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.path === '/'}
                            className={({ isActive }) => `
                                group
                                relative
                                flex
                                h-11
                                items-center
                                justify-center
                                gap-3
                                rounded-xl
                                px-3
                                text-sm
                                font-medium
                                transition-all
                                duration-200
                                lg:justify-start
                                ${
                                    isActive
                                        ? `
                                            bg-black
                                            text-white
                                            shadow-sm
                                        `
                                        : `
                                            text-neutral-500
                                            hover:bg-neutral-100
                                            hover:text-neutral-950
                                        `
                                }
                            `}
                        >

                            {({ isActive }) => (
                                <>

                                    {/* Active Indicator */}
                                    {isActive && (
                                        <span className="
                                            absolute
                                            -left-[13px]
                                            hidden
                                            h-6
                                            w-1
                                            rounded-r-full
                                            bg-black
                                            lg:block
                                        " />
                                    )}


                                    <Icon
                                        size={18}
                                        strokeWidth={isActive ? 2.4 : 1.8}
                                        className="
                                            shrink-0
                                            transition-transform
                                            duration-200
                                            group-hover:scale-105
                                        "
                                    />


                                    <span className="hidden lg:block">
                                        {item.name}
                                    </span>

                                </>
                            )}

                        </NavLink>
                    )
                })}

            </nav>


            {/* =========================================
                BOTTOM INFO
            ========================================= */}
            <div className="
                border-t
                border-neutral-100
                p-3
            ">

                <div className="
                    rounded-xl
                    bg-neutral-50
                    p-3
                ">

                    <div className="
                        mx-auto
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        bg-white
                        text-neutral-500
                        shadow-sm
                        lg:mx-0
                    ">
                        <Package size={15} />
                    </div>

                    <div className="mt-2 hidden lg:block">

                        <p className="
                            text-[11px]
                            font-semibold
                            text-neutral-800
                        ">
                            EASYBUY Admin
                        </p>

                        <p className="
                            mt-0.5
                            text-[9px]
                            leading-4
                            text-neutral-400
                        ">
                            Manage your store from one place.
                        </p>

                    </div>

                </div>

            </div>

        </aside>
    )
}

export default Sidebar
