import React from 'react'
import { Link } from 'react-router-dom'
import {
    ArrowRight,
    Award,
    Heart,
    Headphones,
    ShieldCheck,
    Sparkles,
    Truck,
    ShoppingBag
} from 'lucide-react'

import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsLetterBox'

const About = () => {

    const features = [
        {
            icon: Award,
            title: 'Quality First',
            description:
                'We focus on delivering products that combine quality, comfort and modern style.'
        },
        {
            icon: ShoppingBag,
            title: 'Curated Collections',
            description:
                'Every collection is thoughtfully selected to make everyday shopping easier and better.'
        },
        {
            icon: Headphones,
            title: 'Customer Support',
            description:
                'Our customers are at the heart of everything we do, with support whenever you need it.'
        }
    ]

    return (
        <div className="border-t border-gray-100">

            {/* =====================================================
                HERO
            ===================================================== */}

            <section className="bg-[#f6f6f3]">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">

                    <div className="max-w-3xl">

                        <div className="flex items-center gap-2 mb-5">

                            <span className="w-8 h-px bg-gray-800"></span>

                            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-gray-500">
                                EASYBUY / OUR STORY
                            </p>

                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light tracking-tight text-gray-900 leading-[1.05]">

                            More than a store.

                            <br />

                            <span className="font-serif italic">
                                It's your style.
                            </span>

                        </h1>

                        <p className="mt-6 max-w-2xl text-sm sm:text-base text-gray-500 leading-7">
                            EASYBUY is built around a simple idea — shopping should
                            feel effortless, inspiring and personal. We bring
                            carefully selected fashion closer to you, all in one
                            place.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mt-8">

                            <Link
                                to="/"
                                className="group inline-flex items-center gap-2 bg-black text-white px-6 py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all"
                            >
                                Explore Collection

                                <ArrowRight
                                    size={16}
                                    className="group-hover:translate-x-1 transition-transform"
                                />

                            </Link>

                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 border border-gray-300 bg-white px-6 py-3.5 rounded-full text-sm font-medium text-gray-800 hover:border-black transition-all"
                            >
                                Get in Touch
                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                OUR STORY
            ===================================================== */}

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">

                <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

                    {/* Image */}

                    <div className="relative">

                        <div className="overflow-hidden rounded-[2rem] bg-gray-100">

                            <img
                                src={assets.about_img}
                                alt="EASYBUY collection"
                                className="w-full h-[420px] sm:h-[520px] lg:h-[600px] object-cover hover:scale-[1.03] transition-transform duration-700"
                            />

                        </div>


                        {/* Floating Badge */}

                        <div className="absolute -bottom-5 right-5 sm:right-8 bg-white border border-gray-100 shadow-xl rounded-2xl px-5 py-4">

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-full bg-[#f6f6f3] flex items-center justify-center">

                                    <Sparkles
                                        size={18}
                                        strokeWidth={1.7}
                                        className="text-gray-700"
                                    />

                                </div>

                                <div>

                                    <p className="text-xs text-gray-400 uppercase tracking-wider">
                                        EASYBUY
                                    </p>

                                    <p className="text-sm font-semibold text-gray-900">
                                        Made for your style
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Content */}

                    <div className="lg:py-8">

                        <div className="flex items-center gap-2 mb-5">

                            <span className="w-7 h-px bg-gray-800"></span>

                            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-gray-500">
                                WHO WE ARE
                            </p>

                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-gray-900 leading-tight">

                            Fashion made

                            <br />

                            <span className="font-serif italic">
                                effortlessly yours.
                            </span>

                        </h2>

                        <div className="mt-7 space-y-5 text-sm sm:text-base text-gray-500 leading-7">

                            <p>
                                EASYBUY is an e-commerce platform created to make
                                discovering and shopping for fashion simple. From
                                everyday essentials to statement pieces, our
                                collections are designed around modern lifestyles.
                            </p>

                            <p>
                                We believe great style does not need to be
                                complicated. That's why we focus on clean
                                collections, an easy shopping experience and
                                products that fit naturally into your wardrobe.
                            </p>

                        </div>


                        {/* Mission */}

                        <div className="mt-9 border-l-2 border-black pl-5">

                            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400">
                                OUR MISSION
                            </p>

                            <p className="mt-2 text-base sm:text-lg text-gray-800 leading-7">
                                To make fashion shopping simple, accessible and
                                enjoyable — while putting our customers first.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                STATS
            ===================================================== */}

            <section className="border-y border-gray-200">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="grid grid-cols-2 lg:grid-cols-4">

                        <div className="py-8 sm:py-10 lg:py-12 text-center border-r border-gray-200">

                            <p className="text-3xl sm:text-4xl font-light text-gray-900">
                                100%
                            </p>

                            <p className="mt-2 text-xs uppercase tracking-wider text-gray-400">
                                Customer Focused
                            </p>

                        </div>


                        <div className="py-8 sm:py-10 lg:py-12 text-center lg:border-r border-gray-200">

                            <p className="text-3xl sm:text-4xl font-light text-gray-900">
                                24/7
                            </p>

                            <p className="mt-2 text-xs uppercase tracking-wider text-gray-400">
                                Support
                            </p>

                        </div>


                        <div className="py-8 sm:py-10 lg:py-12 text-center border-r border-t lg:border-t-0 border-gray-200">

                            <p className="text-3xl sm:text-4xl font-light text-gray-900">
                                7 Days
                            </p>

                            <p className="mt-2 text-xs uppercase tracking-wider text-gray-400">
                                Easy Returns
                            </p>

                        </div>


                        <div className="py-8 sm:py-10 lg:py-12 text-center border-t lg:border-t-0 border-gray-200">

                            <p className="text-3xl sm:text-4xl font-light text-gray-900">
                                Easy
                            </p>

                            <p className="mt-2 text-xs uppercase tracking-wider text-gray-400">
                                Shopping
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                WHY CHOOSE US
            ===================================================== */}

            <section className="bg-[#f6f6f3] py-16 sm:py-24 lg:py-28">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Heading */}

                    <div className="text-center max-w-2xl mx-auto">

                        <div className="flex items-center justify-center gap-2 mb-4">

                            <span className="w-7 h-px bg-gray-800"></span>

                            <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-gray-500">
                                WHY EASYBUY
                            </p>

                            <span className="w-7 h-px bg-gray-800"></span>

                        </div>

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-gray-900">

                            Shopping should feel

                            <span className="font-serif italic">
                                {' '}easy.
                            </span>

                        </h2>

                        <p className="mt-4 text-sm text-gray-500 leading-6">
                            Everything we do is designed around making your
                            shopping experience smoother and more enjoyable.
                        </p>

                    </div>


                    {/* Feature Cards */}

                    <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mt-12">

                        {features.map((feature, index) => {

                            const Icon = feature.icon

                            return (

                                <div
                                    key={index}
                                    className="group bg-white border border-gray-200 rounded-3xl p-7 sm:p-9 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition-all duration-300"
                                >

                                    <div className="w-12 h-12 rounded-2xl bg-[#f6f6f3] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">

                                        <Icon
                                            size={21}
                                            strokeWidth={1.6}
                                        />

                                    </div>

                                    <h3 className="mt-7 text-lg font-semibold text-gray-900">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm text-gray-500 leading-6">
                                        {feature.description}
                                    </p>

                                    <div className="mt-7 flex items-center gap-2 text-xs font-medium text-gray-500">

                                        <span className="w-5 h-px bg-gray-300"></span>

                                        EASYBUY

                                    </div>

                                </div>

                            )

                        })}

                    </div>

                </div>

            </section>


            {/* =====================================================
                OUR PROMISE
            ===================================================== */}

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

                <div className="rounded-[2rem] bg-black text-white overflow-hidden">

                    <div className="grid lg:grid-cols-2">

                        <div className="p-8 sm:p-12 lg:p-16">

                            <div className="flex items-center gap-2 mb-5">

                                <Heart
                                    size={15}
                                    strokeWidth={1.7}
                                />

                                <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-gray-400">
                                    OUR PROMISE
                                </p>

                            </div>

                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light leading-tight">

                                Built around

                                <br />

                                <span className="font-serif italic">
                                    you.
                                </span>

                            </h2>

                            <p className="mt-6 text-sm sm:text-base text-gray-400 leading-7 max-w-lg">
                                From discovering a product to receiving your
                                order, we want every part of your EASYBUY
                                experience to feel straightforward and
                                reliable.
                            </p>

                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 mt-8 bg-white text-black px-6 py-3.5 rounded-full text-sm font-medium hover:bg-gray-200 transition-all"
                            >
                                Talk to Us

                                <ArrowRight size={16} />

                            </Link>

                        </div>


                        <div className="bg-[#1a1a1a] p-8 sm:p-12 lg:p-16 flex flex-col justify-center">

                            <div className="space-y-7">

                                <div className="flex items-start gap-4">

                                    <ShieldCheck
                                        size={22}
                                        strokeWidth={1.5}
                                        className="text-gray-300 mt-1 flex-shrink-0"
                                    />

                                    <div>

                                        <p className="font-medium">
                                            Quality-focused
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Products selected with care.
                                        </p>

                                    </div>

                                </div>


                                <div className="flex items-start gap-4">

                                    <Truck
                                        size={22}
                                        strokeWidth={1.5}
                                        className="text-gray-300 mt-1 flex-shrink-0"
                                    />

                                    <div>

                                        <p className="font-medium">
                                            Simple delivery
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            A straightforward journey from
                                            checkout to doorstep.
                                        </p>

                                    </div>

                                </div>


                                <div className="flex items-start gap-4">

                                    <Heart
                                        size={22}
                                        strokeWidth={1.5}
                                        className="text-gray-300 mt-1 flex-shrink-0"
                                    />

                                    <div>

                                        <p className="font-medium">
                                            Customer first
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Your experience remains at the
                                            center of EASYBUY.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                NEWSLETTER
            ===================================================== */}

            <NewsletterBox />

        </div>
    )
}

export default About
