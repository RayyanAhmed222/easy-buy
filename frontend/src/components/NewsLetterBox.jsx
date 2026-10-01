import React, { useState } from 'react'
import { ArrowRight, Mail } from 'lucide-react'

const NewsLetterBox = () => {

    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const onSubmitHandler = (event) => {

        event.preventDefault()

        if (!email.trim()) return

        setSubscribed(true)
        setEmail('')

        setTimeout(() => {
            setSubscribed(false)
        }, 4000)
    }


    return (

        <section className="relative mt-24 overflow-hidden bg-[#f5f5f2] sm:mt-32">

            {/* ================================================= */}
            {/* ================= DECORATIVE TEXT ================ */}
            {/* ================================================= */}

            <div className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none text-[120px] font-semibold tracking-[-10px] text-black/[0.025] sm:text-[200px] lg:text-[260px]">
                EB
            </div>


            {/* ================================================= */}
            {/* ================= CONTENT ========================= */}
            {/* ================================================= */}

            <div className="relative z-10 px-5 py-16 text-center sm:px-10 sm:py-20 lg:py-24">

                {/* Label */}

                <div className="mb-5 flex items-center justify-center gap-3">

                    <span className="h-[1px] w-8 bg-black sm:w-10" />

                    <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-gray-400 sm:text-[10px]">
                        EASYBUY / NEWSLETTER
                    </p>

                    <span className="h-[1px] w-8 bg-black sm:w-10" />

                </div>


                {/* Heading */}

                <h2 className="text-3xl font-medium tracking-[-1.5px] text-[#171717] sm:text-4xl lg:text-5xl">

                    Stay in the

                    <span className="font-serif italic font-normal">
                        {' '}loop.
                    </span>

                </h2>


                {/* Offer */}

                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2">

                    <span className="h-1.5 w-1.5 rounded-full bg-black" />

                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-600">
                        Get 20% off your first order
                    </p>

                </div>


                {/* Description */}

                <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-gray-500">
                    Sign up for the latest collections, exclusive offers,
                    styling inspiration and updates from EASYBUY.
                </p>


                {/* ================================================= */}
                {/* ================= NEWSLETTER FORM =============== */}
                {/* ================================================= */}

                {!subscribed ? (

                    <form
                        onSubmit={onSubmitHandler}
                        className="mx-auto mt-8 flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:gap-0"
                    >

                        {/* Input */}

                        <div className="flex flex-1 items-center border border-gray-200 bg-white px-4 py-3.5 transition-all duration-300 focus-within:border-black">

                            <Mail
                                size={16}
                                strokeWidth={1.5}
                                className="mr-3 shrink-0 text-gray-400"
                            />

                            <input
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                className="w-full bg-transparent text-sm text-black outline-none placeholder:text-gray-400"
                                type="email"
                                placeholder="Enter your email address"
                                required
                            />

                        </div>


                        {/* Button */}

                        <button
                            type="submit"
                            className="group flex items-center justify-center gap-4 bg-black px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-[#222] sm:px-8"
                        >

                            <span>
                                Subscribe
                            </span>

                            <ArrowRight
                                size={15}
                                strokeWidth={1.5}
                                className="transition-transform duration-300 group-hover:translate-x-1"
                            />

                        </button>

                    </form>

                ) : (

                    /* ================================================= */
                    /* ================= SUCCESS MESSAGE =============== */
                    /* ================================================= */

                    <div className="mx-auto mt-8 flex max-w-xl items-center justify-center border border-black/10 bg-white px-5 py-4">

                        <div className="mr-3 flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">

                            <span className="text-xs">
                                ✓
                            </span>

                        </div>

                        <p className="text-sm text-gray-600">
                            You're subscribed! Welcome to EASYBUY.
                        </p>

                    </div>

                )}


                {/* Privacy */}

                <p className="mt-4 text-[10px] leading-5 text-gray-400">
                    By subscribing, you agree to receive emails from EASYBUY.
                    You can unsubscribe at any time.
                </p>

            </div>

        </section>

    )
}

export default NewsLetterBox
