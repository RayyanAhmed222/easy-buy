import React from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowRight,
    Mail,
    MapPin,
    Phone,
    Clock,
    MessageCircle,
    Headphones,
} from 'lucide-react'
import { FaInstagram } from 'react-icons/fa'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {

    return (
        <div className="border-t border-gray-100">

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="bg-[#f6f6f3]">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">

                    <div className="max-w-3xl">

                        <div className="flex items-center gap-2 mb-5">

                            <span className="w-8 h-px bg-gray-800"></span>

                            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-gray-500">
                                EASYBUY / CONTACT
                            </p>

                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-gray-900 leading-[1.05]">

                            Let's start a

                            <br />

                            <span className="font-serif italic">
                                conversation.
                            </span>

                        </h1>

                        <p className="mt-6 max-w-2xl text-sm sm:text-base text-gray-500 leading-7">
                            Have a question about an order, product or anything
                            else? Our team is here to help make your EASYBUY
                            experience as smooth as possible.
                        </p>

                    </div>

                </div>

            </section>


            {/* =====================================================
                CONTACT CONTENT
            ===================================================== */}

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

                    {/* Image */}

                    <div className="relative">

                        <div className="overflow-hidden rounded-[2rem] bg-gray-100">

                            <img
                                src={assets.contact_img}
                                alt="EASYBUY customer support"
                                className="w-full h-[420px] sm:h-[520px] lg:h-[600px] object-cover hover:scale-[1.03] transition-transform duration-700"
                            />

                        </div>


                        {/* Floating Support Badge */}

                        <div className="absolute -bottom-5 right-5 sm:right-8 bg-white border border-gray-100 shadow-xl rounded-2xl px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-full bg-[#f6f6f3] flex items-center justify-center">

                                    <Headphones
                                        size={18}
                                        strokeWidth={1.7}
                                        className="text-gray-700"
                                    />

                                </div>

                                <div>

                                    <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                        EASYBUY SUPPORT
                                    </p>

                                    <p className="text-sm font-semibold text-gray-900">
                                        We're here to help
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Contact Details */}

                    <div>

                        <div className="flex items-center gap-2 mb-5">

                            <span className="w-7 h-px bg-gray-800"></span>

                            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-gray-500">
                                GET IN TOUCH
                            </p>

                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 leading-tight">

                            We're always

                            <br />

                            <span className="font-serif italic">
                                happy to help.
                            </span>

                        </h2>


                        <p className="mt-5 text-sm sm:text-base text-gray-500 leading-7 max-w-lg">
                            Whether you need help with an order, want to know
                            more about a product, or simply have a question,
                            feel free to reach out.
                        </p>


                        {/* Contact Cards */}

                        <div className="mt-8 space-y-3">

                            {/* Store */}

                            <div className="group flex items-start gap-4 border border-gray-200 rounded-2xl p-5 hover:border-gray-300 hover:shadow-sm transition-all">

                                <div className="w-11 h-11 rounded-xl bg-[#f6f6f3] flex items-center justify-center flex-shrink-0">

                                    <MapPin
                                        size={19}
                                        strokeWidth={1.6}
                                        className="text-gray-700"
                                    />

                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-gray-900">
                                        Our Store
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1 leading-6">
                                        EASYBUY Store
                                        <br />
                                        Karachi, Pakistan
                                    </p>

                                </div>

                            </div>


                            {/* Phone */}

                            <div className="group flex items-start gap-4 border border-gray-200 rounded-2xl p-5 hover:border-gray-300 hover:shadow-sm transition-all">

                                <div className="w-11 h-11 rounded-xl bg-[#f6f6f3] flex items-center justify-center flex-shrink-0">

                                    <Phone
                                        size={19}
                                        strokeWidth={1.6}
                                        className="text-gray-700"
                                    />

                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-gray-900">
                                        Phone
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        +92 300 0000000
                                    </p>

                                </div>

                            </div>


                            {/* Email */}

                            <div className="group flex items-start gap-4 border border-gray-200 rounded-2xl p-5 hover:border-gray-300 hover:shadow-sm transition-all">

                                <div className="w-11 h-11 rounded-xl bg-[#f6f6f3] flex items-center justify-center flex-shrink-0">

                                    <Mail
                                        size={19}
                                        strokeWidth={1.6}
                                        className="text-gray-700"
                                    />

                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-gray-900">
                                        Email
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        support@easybuy.com
                                    </p>

                                </div>

                            </div>


                            {/* Hours */}

                            <div className="group flex items-start gap-4 border border-gray-200 rounded-2xl p-5 hover:border-gray-300 hover:shadow-sm transition-all">

                                <div className="w-11 h-11 rounded-xl bg-[#f6f6f3] flex items-center justify-center flex-shrink-0">

                                    <Clock
                                        size={19}
                                        strokeWidth={1.6}
                                        className="text-gray-700"
                                    />

                                </div>

                                <div>

                                    <p className="text-sm font-semibold text-gray-900">
                                        Support Hours
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Monday – Saturday
                                        <br />
                                        10:00 AM – 8:00 PM
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                SUPPORT CTA
            ===================================================== */}

            <section className="bg-[#f6f6f3] py-16 sm:py-20">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="bg-black text-white rounded-[2rem] overflow-hidden">

                        <div className="grid md:grid-cols-2">

                            <div className="p-8 sm:p-12 lg:p-14">

                                <div className="flex items-center gap-2 mb-5">

                                    <MessageCircle
                                        size={15}
                                        strokeWidth={1.7}
                                    />

                                    <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-gray-400">
                                        CUSTOMER CARE
                                    </p>

                                </div>

                                <h2 className="text-3xl sm:text-4xl font-light leading-tight">

                                    Need help with

                                    <br />

                                    <span className="font-serif italic">
                                        your order?
                                    </span>

                                </h2>

                                <p className="mt-5 text-sm text-gray-400 leading-6 max-w-md">
                                    Our support team can help you with order
                                    questions, product information and general
                                    assistance.
                                </p>

                                <Link
                                    to="/orders"
                                    className="inline-flex items-center gap-2 mt-7 bg-white text-black px-6 py-3.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-all"
                                >

                                    View My Orders

                                    <ArrowRight size={16} />

                                </Link>

                            </div>


                            <div className="bg-[#171717] p-8 sm:p-12 lg:p-14 flex flex-col justify-center">

                                <div className="flex items-start gap-4">

                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">

                                        <Headphones
                                            size={21}
                                            strokeWidth={1.5}
                                        />

                                    </div>

                                    <div>

                                        <p className="text-lg font-medium">
                                            We're here for you
                                        </p>

                                        <p className="text-sm text-gray-500 mt-2 leading-6">
                                            Reach out whenever you need
                                            assistance and we'll do our best
                                            to make your experience easier.
                                        </p>

                                    </div>

                                </div>


                                <div className="mt-8 pt-6 border-t border-white/10">

                                    <div className="flex items-center gap-3 text-gray-400">

                                        <FaInstagram size={17} />

                                        <span className="text-sm">
                                            Follow EASYBUY for new arrivals
                                            and updates
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                QUICK LINKS
            ===================================================== */}

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                    <Link
                        to="/"
                        className="group border border-gray-200 rounded-2xl p-6 hover:border-black transition-all"
                    >

                        <p className="text-xs uppercase tracking-wider text-gray-400">
                            Explore
                        </p>

                        <div className="flex items-center justify-between mt-3">

                            <p className="font-medium text-gray-900">
                                Shop Collection
                            </p>

                            <ArrowRight
                                size={17}
                                className="group-hover:translate-x-1 transition-transform"
                            />

                        </div>

                    </Link>


                    <Link
                        to="/about"
                        className="group border border-gray-200 rounded-2xl p-6 hover:border-black transition-all"
                    >

                        <p className="text-xs uppercase tracking-wider text-gray-400">
                            Discover
                        </p>

                        <div className="flex items-center justify-between mt-3">

                            <p className="font-medium text-gray-900">
                                About EASYBUY
                            </p>

                            <ArrowRight
                                size={17}
                                className="group-hover:translate-x-1 transition-transform"
                            />

                        </div>

                    </Link>


                    <Link
                        to="/orders"
                        className="group border border-gray-200 rounded-2xl p-6 hover:border-black transition-all"
                    >

                        <p className="text-xs uppercase tracking-wider text-gray-400">
                            Account
                        </p>

                        <div className="flex items-center justify-between mt-3">

                            <p className="font-medium text-gray-900">
                                Track Orders
                            </p>

                            <ArrowRight
                                size={17}
                                className="group-hover:translate-x-1 transition-transform"
                            />

                        </div>

                    </Link>

                </div>

            </section>


            {/* =====================================================
                NEWSLETTER
            ===================================================== */}

            <NewsLetterBox />

        </div>
    )
}

export default Contact
