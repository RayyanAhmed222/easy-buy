import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {

    return (

        <section className="relative overflow-hidden bg-[#f7f7f5]">

            <div className="grid min-h-[620px] grid-cols-1 lg:grid-cols-2">

                {/* ================================================= */}
                {/* ================= LEFT CONTENT ================== */}
                {/* ================================================= */}

                <div className="relative flex items-center px-6 py-16 sm:px-10 lg:px-16 xl:px-20">

                    {/* Decorative Background Text */}

                    <span className="pointer-events-none absolute -left-5 bottom-[-35px] select-none text-[120px] font-semibold tracking-[-8px] text-black/[0.025] sm:text-[180px]">
                        EB
                    </span>


                    <div className="relative z-10 max-w-xl">

                        {/* Small Label */}

                        <div className="mb-7 flex items-center gap-3">

                            <span className="h-[1px] w-10 bg-black sm:w-14" />

                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gray-500 sm:text-xs">
                                EASYBUY / NEW SEASON
                            </p>

                        </div>


                        {/* Main Heading */}

                        <h1 className="text-[48px] font-medium leading-[0.95] tracking-[-2.5px] text-[#171717] sm:text-[64px] lg:text-[72px] xl:text-[82px]">

                            Style that

                            <br />

                            <span className="font-serif italic font-normal">
                                speaks
                            </span>

                            {' '}for itself.

                        </h1>


                        {/* Description */}

                        <p className="mt-7 max-w-md text-sm leading-7 text-gray-500 sm:text-base">
                            Discover our latest fashion collection,
                            thoughtfully selected for modern everyday style.
                        </p>


                        {/* CTA */}

                        <div className="mt-9 flex flex-wrap items-center gap-6">

                            <Link
                                to="/men"
                                className="group inline-flex items-center gap-5 bg-black px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#222]"
                            >

                                <span>
                                    Men Collections
                                </span>

                                <span className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>

                            </Link>


                            <Link
                                to="/women"
                                className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-black"
                            >

                                <span>
                                    Explore Women
                                </span>

                                <span className="h-[1px] w-7 bg-black transition-all duration-300 group-hover:w-11" />

                            </Link>

                        </div>


                        {/* Bottom Information */}

                        <div className="mt-12 flex items-center gap-7 border-t border-black/10 pt-6">

                            <div>
                                <p className="text-lg font-semibold tracking-tight text-black">
                                    2026
                                </p>

                                <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-gray-400">
                                    Collection
                                </p>
                            </div>


                            <div className="h-8 w-px bg-black/10" />


                            <div>
                                <p className="text-lg font-semibold tracking-tight text-black">
                                    03
                                </p>

                                <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-gray-400">
                                    Collections
                                </p>
                            </div>


                            <div className="h-8 w-px bg-black/10" />

                        </div>

                    </div>

                </div>


                {/* ================================================= */}
                {/* ================= RIGHT IMAGE =================== */}
                {/* ================================================= */}

                <div className="group relative min-h-[480px] overflow-hidden lg:min-h-full">

                    {/* Main Image */}

                    <img
                        src={assets.hero}
                        alt="EASYBUY latest fashion collection"
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                    />


                    {/* Image Overlay */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5" />


                    {/* Top Badge */}

                    <div className="absolute right-5 top-5 sm:right-8 sm:top-8">

                        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/50 bg-white/10 text-center backdrop-blur-md sm:h-24 sm:w-24">

                            <div>

                                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white">
                                    New
                                </p>

                                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                                    Drop
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Image Bottom Text */}

                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between sm:bottom-8 sm:left-8 sm:right-8">

                        <div>

                            <p className="text-[9px] uppercase tracking-[0.25em] text-white/70">
                                Featured
                            </p>

                            <p className="mt-1 text-xl font-medium tracking-tight text-white sm:text-2xl">
                                Latest Arrivals
                            </p>

                        </div>


                        <Link
                            to="/"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black"
                            aria-label="Explore latest arrivals"
                        >
                            <span className="text-lg">
                                ↗
                            </span>
                        </Link>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* ================= BOTTOM MARQUEE ================= */}
            {/* ================================================= */}

            <div className="flex overflow-hidden border-t border-black/10 bg-white">

                <div className="flex min-w-max items-center gap-8 px-6 py-4">

                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                        New Arrivals
                    </span>

                    <span className="h-1 w-1 rounded-full bg-black" />

                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                        Men's Collection
                    </span>

                    <span className="h-1 w-1 rounded-full bg-black" />

                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                        Women's Collection
                    </span>

                    <span className="h-1 w-1 rounded-full bg-black" />

                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                        Juniors
                    </span>

                    <span className="h-1 w-1 rounded-full bg-black" />

                    <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                        Easy Shopping
                    </span>

                </div>

            </div>

        </section>

    )
}

export default Hero
