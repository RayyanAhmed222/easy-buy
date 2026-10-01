import React from 'react'
import { LogOut, ShieldCheck } from 'lucide-react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken }) => {
    const handleLogout = () => {
        setToken('')
    }

    return (
        <header className="
            sticky
            top-0
            z-50
            flex
            h-[76px]
            items-center
            justify-between
            border-b
            border-neutral-200
            bg-white/95
            px-4
            backdrop-blur-xl
            sm:px-6
            lg:px-8
        ">

            {/* LEFT — LOGO */}
            <div className="flex items-center gap-4">

                <div className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-black
                    text-white
                    shadow-sm
                ">
                    <span className="text-sm font-bold tracking-tight">
                        E
                    </span>
                </div>

                <div className="hidden sm:block">
                    <p className="
                        text-sm
                        font-bold
                        tracking-[0.12em]
                        text-neutral-950
                    ">
                        EASYBUY
                    </p>

                    <div className="mt-0.5 flex items-center gap-1.5">
                        <ShieldCheck
                            size={11}
                            strokeWidth={2}
                            className="text-neutral-400"
                        />

                        <span className="
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-neutral-400
                        ">
                            Admin Panel
                        </span>
                    </div>
                </div>
            </div>

            {/* CENTER LOGO */}
            <div className="
                absolute
                left-1/2
                hidden
                -translate-x-1/2
                md:block
            ">
            </div>

            {/* RIGHT — ADMIN + LOGOUT */}
            <div className="flex items-center gap-3">

                {/* ADMIN STATUS */}
                <div className="
                    hidden
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-neutral-200
                    bg-neutral-50
                    px-3
                    py-2
                    sm:flex
                ">
                    <span className="
                        h-2
                        w-2
                        rounded-full
                        bg-emerald-500
                        shadow-[0_0_0_3px_rgba(16,185,129,0.10)]
                    " />

                    <span className="
                        text-[11px]
                        font-semibold
                        text-neutral-600
                    ">
                        Admin
                    </span>
                </div>

                {/* LOGOUT */}
                <button
                    type="button"
                    onClick={handleLogout}
                    className="
                        group
                        flex
                        h-10
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-neutral-200
                        bg-white
                        px-3.5
                        text-sm
                        font-semibold
                        text-neutral-700
                        shadow-sm
                        hover:border-neutral-950
                        hover:bg-neutral-950
                        hover:text-white
                        active:scale-[0.97]
                        sm:px-4
                    "
                >
                    <LogOut
                        size={16}
                        strokeWidth={2}
                        className="
                            transition-transform
                            duration-200
                            group-hover:-translate-x-0.5
                        "
                    />

                    <span className="hidden sm:block">
                        Logout
                    </span>
                </button>
            </div>
        </header>
    )
}

export default Navbar

