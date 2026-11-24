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

import aboutImg from '../assets/about_img.png'
import NewsletterBox from '../components/NewsLetterBox'

const features = [
    {
        icon: Award,
        title: 'Quality First',
        description: 'We focus on delivering products that combine quality, comfort and modern style.'
    },
    {
        icon: ShoppingBag,
        title: 'Curated Collections',
        description: 'Every collection is thoughtfully selected to make everyday shopping easier and better.'
    },
    {
        icon: Headphones,
        title: 'Customer Support',
        description: 'Our customers are at the heart of everything we do, with support whenever you need it.'
    }
]

const stats = [
    { value: '100%', label: 'Customer Focused' },
    { value: '24/7', label: 'Support' },
    { value: '7 Days', label: 'Easy Returns' },
    { value: 'Easy', label: 'Shopping' }
]

const promises = [
    {
        icon: ShieldCheck,
        title: 'Quality-focused',
        description: 'Products selected with care.'
    },
    {
        icon: Truck,
        title: 'Simple delivery',
        description: 'A straightforward journey from checkout to doorstep.'
    },
    {
        icon: Heart,
        title: 'Customer first',
        description: 'Your experience remains at the center of EASYBUY.'
    }
]

const About = () => {
    return (
        <div className="border-t border-gray-100">
            {/* Hero */}
            <section className="bg-[#f6f6f3]">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
                    <div className="max-w-3xl">
                        <div className="mb-5 flex items-center gap-2">
                            <span className="h-px w-8 bg-gray-800" />
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gray-500 sm:text-xs">
                                EASYBUY / OUR STORY
                            </p>
                        </div>

                        <h1 className="text-4xl font-light leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                            More than a store.
                            <br />
                            <span className="font-serif italic">It's your style.</span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                            EASYBUY is built around a simple idea — shopping should feel effortless,
                            inspiring and personal. We bring carefully selected fashion closer to you,
                            all in one place.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <Link
                                to="/"
                                className="group inline-flex items-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-gray-800"
                            >
                                Explore Collection
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </Link>

                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3.5 text-sm font-medium text-gray-800 transition-all hover:border-black"
                            >
                                Get in Touch
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                    <div className="relative">
                        <div className="overflow-hidden rounded-3xl bg-gray-100">
                            <img
                                src={aboutImg}
                                alt="EASYBUY collection"
                                className="h-96 w-full object-cover transition-transform duration-700 hover:scale-[1.03] sm:h-120 lg:h-140"
                            />
                        </div>

                        <div className="absolute -bottom-5 right-5 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-xl sm:right-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6f6f3]">
                                    <Sparkles size={18} strokeWidth={1.7} className="text-gray-700" />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-gray-400">EASYBUY</p>
                                    <p className="text-sm font-semibold text-gray-900">Made for your style</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:py-8">
                        <div className="mb-5 flex items-center gap-2">
                            <span className="h-px w-7 bg-gray-800" />
                            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500 sm:text-xs">
                                WHO WE ARE
                            </p>
                        </div>

                        <h2 className="text-3xl font-light leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                            Fashion made
                            <br />
                            <span className="font-serif italic">effortlessly yours.</span>
                        </h2>

                        <div className="mt-7 space-y-5 text-sm leading-7 text-gray-500 sm:text-base">
                            <p>
                                EASYBUY is an e-commerce platform created to make discovering and
                                shopping for fashion simple. From everyday essentials to statement
                                pieces, our collections are designed around modern lifestyles.
                            </p>
                            <p>
                                We believe great style does not need to be complicated. That's why we
                                focus on clean collections, an easy shopping experience and products
                                that fit naturally into your wardrobe.
                            </p>
                        </div>

                        <div className="mt-9 border-l-2 border-black pl-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                                OUR MISSION
                            </p>
                            <p className="mt-2 text-base leading-7 text-gray-800 sm:text-lg">
                                To make fashion shopping simple, accessible and enjoyable — while
                                putting our customers first.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-y border-gray-200">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4">
                        {stats.map((item, idx) => (
                            <div
                                key={item.label}
                                className={`py-8 text-center sm:py-10 lg:py-12 ${
                                    idx % 2 === 0 ? 'border-r border-gray-200' : ''
                                } ${idx >= 2 ? 'border-t border-gray-200 lg:border-t-0' : ''} ${
                                    idx === 1 ? 'lg:border-r lg:border-gray-200' : ''
                                }`}
                            >
                                <p className="text-3xl font-light text-gray-900 sm:text-4xl">
                                    {item.value}
                                </p>
                                <p className="mt-2 text-xs uppercase tracking-wider text-gray-400">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="bg-[#f6f6f3] py-16 sm:py-24 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mb-4 flex items-center justify-center gap-2">
                            <span className="h-px w-7 bg-gray-800" />
                            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500 sm:text-xs">
                                WHY EASYBUY
                            </p>
                            <span className="h-px w-7 bg-gray-800" />
                        </div>

                        <h2 className="text-3xl font-light text-gray-900 sm:text-4xl lg:text-5xl">
                            Shopping should feel
                            <span className="font-serif italic"> easy.</span>
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-gray-500">
                            Everything we do is designed around making your shopping experience
                            smoother and more enjoyable.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-4 sm:gap-6 md:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon
                            return (
                                <div
                                    key={feature.title}
                                    className="group rounded-3xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] sm:p-9"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f6f6f3] transition-all duration-300 group-hover:bg-black group-hover:text-white">
                                        <Icon size={21} strokeWidth={1.6} />
                                    </div>

                                    <h3 className="mt-7 text-lg font-semibold text-gray-900">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-gray-500">
                                        {feature.description}
                                    </p>

                                    <div className="mt-7 flex items-center gap-2 text-xs font-medium text-gray-500">
                                        <span className="h-px w-5 bg-gray-300" />
                                        EASYBUY
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Our Promise */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="overflow-hidden rounded-3xl bg-black text-white">
                    <div className="grid lg:grid-cols-2">
                        <div className="p-8 sm:p-12 lg:p-16">
                            <div className="mb-5 flex items-center gap-2">
                                <Heart size={15} strokeWidth={1.7} />
                                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400 sm:text-xs">
                                    OUR PROMISE
                                </p>
                            </div>

                            <h2 className="text-3xl font-light leading-tight sm:text-4xl lg:text-5xl">
                                Built around
                                <br />
                                <span className="font-serif italic">you.</span>
                            </h2>

                            <p className="mt-6 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
                                From discovering a product to receiving your order, we want every
                                part of your EASYBUY experience to feel straightforward and reliable.
                            </p>

                            <Link
                                to="/contact"
                                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-all hover:bg-gray-200"
                            >
                                Talk to Us
                                <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="flex flex-col justify-center bg-[#1a1a1a] p-8 sm:p-12 lg:p-16">
                            <div className="space-y-7">
                                {promises.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <div key={item.title} className="flex items-start gap-4">
                                            <Icon
                                                size={22}
                                                strokeWidth={1.5}
                                                className="mt-1 shrink-0 text-gray-300"
                                            />
                                            <div>
                                                <p className="font-medium">{item.title}</p>
                                                <p className="mt-1 text-sm text-gray-500">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <NewsletterBox />
        </div>
    )
}

export default About