import React from 'react'
import { Link } from 'react-router-dom'
import {
    FaInstagram,
    FaFacebookF,
    FaLinkedinIn
} from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FiArrowUpRight } from 'react-icons/fi'

const Footer = () => {

    return (
        <footer className="mt-32 border-t border-gray-100 bg-white">

            {/* ================= MAIN FOOTER ================= */}

            <div className="px-5 pt-16 pb-10 sm:px-10 lg:px-16">

                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[2.5fr_1fr_1fr_1.5fr]">

                    {/* ================= BRAND ================= */}

                    <div>

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

                        <p className="mt-5 max-w-md text-sm leading-7 text-gray-500">
                            Discover fashion that fits your style.
                            Shop the latest collections for men, women
                            and juniors — all in one place.
                        </p>


                        {/* ================= SOCIAL ICONS ================= */}

                        <div className="mt-7 flex items-center gap-3">

                            {/* Instagram */}

                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                            >
                                <FaInstagram size={17} />
                            </a>


                            {/* Facebook */}

                            <a
                                href="#"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                            >
                                <FaFacebookF size={16} />
                            </a>


                            {/* X */}

                            <a
                                href="#"
                                aria-label="X"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                            >
                                <FaXTwitter size={16} />
                            </a>


                            {/* LinkedIn */}

                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                            >
                                <FaLinkedinIn size={16} />
                            </a>

                        </div>

                    </div>


                    {/* ================= COMPANY ================= */}

                    <div>

                        <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-black">
                            Company
                        </h3>

                        <ul className="flex flex-col gap-4 text-sm text-gray-500">

                            <li>
                                <Link
                                    to="/"
                                    className="transition-colors duration-300 hover:text-black"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/about"
                                    className="transition-colors duration-300 hover:text-black"
                                >
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/contact"
                                    className="transition-colors duration-300 hover:text-black"
                                >
                                    Contact
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* ================= SHOP ================= */}

                    <div>

                        <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-black">
                            Shop
                        </h3>

                        <ul className="flex flex-col gap-4 text-sm text-gray-500">

                            <li>
                                <Link
                                    to="/men"
                                    className="transition-colors duration-300 hover:text-black"
                                >
                                    Men's Collection
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/women"
                                    className="transition-colors duration-300 hover:text-black"
                                >
                                    Women's Collection
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/juniors"
                                    className="transition-colors duration-300 hover:text-black"
                                >
                                    Juniors
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/cart"
                                    className="transition-colors duration-300 hover:text-black"
                                >
                                    Shopping Cart
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/orders"
                                    className="transition-colors duration-300 hover:text-black"
                                >
                                    My Orders
                                </Link>
                            </li>

                        </ul>

                    </div>


                    {/* ================= NEWSLETTER ================= */}

                    <div>

                        <h3 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-black">
                            Stay Updated
                        </h3>

                        <p className="mb-5 text-sm leading-6 text-gray-500">
                            Subscribe to receive updates about new
                            collections, special offers and more.
                        </p>


                        {/* Newsletter */}

                        <div className="flex border-b border-gray-300 pb-2">

                            <input
                                type="email"
                                placeholder="Your email address"
                                className="min-w-0 flex-1 bg-transparent text-sm text-black outline-none placeholder:text-gray-400"
                            />

                            <button
                                type="button"
                                aria-label="Subscribe"
                                className="ml-3 text-black transition-transform duration-300 hover:translate-x-1"
                            >
                                <FiArrowUpRight size={19} />
                            </button>

                        </div>


                        <p className="mt-3 text-[11px] leading-5 text-gray-400">
                            By subscribing, you agree to our privacy policy.
                        </p>

                    </div>

                </div>


                {/* ================= BOTTOM ================= */}

                <div className="mt-14 border-t border-gray-100 pt-7">

                    <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-400 sm:flex-row">

                        <p>
                            © 2026 EASYBUY. All rights reserved.
                        </p>


                        <div className="flex items-center gap-5">

                            <span>
                                Secure Shopping
                            </span>

                            <span className="hidden h-3 w-px bg-gray-200 sm:block" />

                            <span>
                                Easy Returns
                            </span>

                        </div>


                        <p>
                            Designed for modern shopping.
                        </p>

                    </div>

                </div>

            </div>

        </footer>
    )
}

export default Footer
