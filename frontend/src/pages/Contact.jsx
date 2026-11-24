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
import contactImg from '../assets/contact_img.png' // apni file ka exact naam/extension check karein
import NewsLetterBox from '../components/NewsLetterBox'

const contactInfo = [
    {
        icon: MapPin,
        title: 'Our Store',
        lines: ['EASYBUY Store', 'Karachi, Pakistan'],
    },
    {
        icon: Phone,
        title: 'Phone',
        lines: ['+92 300 0000000'],
    },
    {
        icon: Mail,
        title: 'Email',
        lines: ['support@easybuy.com'],
    },
    {
        icon: Clock,
        title: 'Support Hours',
        lines: ['Monday – Saturday', '10:00 AM – 8:00 PM'],
    },
]

const quickLinks = [
    { label: 'Explore', title: 'Shop Collection', to: '/' },
    { label: 'Discover', title: 'About EASYBUY', to: '/about' },
    { label: 'Account', title: 'Track Orders', to: '/orders' },
]

const Contact = () => {
    return (
        <div className="border-t border-gray-100">
            {/* Hero */}
            <section className="bg-[#f6f6f3]">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                    <div className="max-w-3xl">
                        <div className="mb-5 flex items-center gap-2">
                            <span className="h-px w-8 bg-gray-800" />
                            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gray-500 sm:text-xs">
                                EASYBUY / CONTACT
                            </p>
                        </div>

                        <h1 className="text-4xl font-light leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                            Let's start a
                            <br />
                            <span className="font-serif italic">conversation.</span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                            Have a question about an order, product or anything else? Our team is
                            here to help make your EASYBUY experience as smooth as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                    <div className="relative">
                        <div className="overflow-hidden rounded-3xl bg-gray-100">
                            <img
                                src={contactImg}
                                alt="EASYBUY customer support"
                                className="h-96 w-full object-cover transition-transform duration-700 hover:scale-[1.03] sm:h-[480px] lg:h-[560px]"
                            />
                        </div>

                        <div className="absolute -bottom-5 right-5 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-xl sm:right-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f6f6f3]">
                                    <Headphones size={18} strokeWidth={1.7} className="text-gray-700" />
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

                    <div>
                        <div className="mb-5 flex items-center gap-2">
                            <span className="h-px w-7 bg-gray-800" />
                            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-500 sm:text-xs">
                                GET IN TOUCH
                            </p>
                        </div>

                        <h2 className="text-3xl font-light leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                            We're always
                            <br />
                            <span className="font-serif italic">happy to help.</span>
                        </h2>

                        <p className="mt-5 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
                            Whether you need help with an order, want to know more about a product,
                            or simply have a question, feel free to reach out.
                        </p>

                        <div className="mt-8 space-y-3">
                            {contactInfo.map((item) => {
                                const Icon = item.icon
                                return (
                                    <div
                                        key={item.title}
                                        className="group flex items-start gap-4 rounded-2xl border border-gray-200 p-5 transition-all hover:border-gray-300 hover:shadow-sm"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f6f6f3]">
                                            <Icon size={19} strokeWidth={1.6} className="text-gray-700" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">
                                                {item.title}
                                            </p>
                                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                                {item.lines.map((line, idx) => (
                                                    <React.Fragment key={line}>
                                                        {idx > 0 && <br />}
                                                        {line}
                                                    </React.Fragment>
                                                ))}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Support CTA */}
            <section className="bg-[#f6f6f3] py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden rounded-3xl bg-black text-white">
                        <div className="grid md:grid-cols-2">
                            <div className="p-8 sm:p-12 lg:p-14">
                                <div className="mb-5 flex items-center gap-2">
                                    <MessageCircle size={15} strokeWidth={1.7} />
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400 sm:text-xs">
                                        CUSTOMER CARE
                                    </p>
                                </div>

                                <h2 className="text-3xl font-light leading-tight sm:text-4xl">
                                    Need help with
                                    <br />
                                    <span className="font-serif italic">your order?</span>
                                </h2>

                                <p className="mt-5 max-w-md text-sm leading-6 text-gray-400">
                                    Our support team can help you with order questions, product
                                    information and general assistance.
                                </p>

                                <Link
                                    to="/orders"
                                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-all hover:bg-gray-200"
                                >
                                    View My Orders
                                    <ArrowRight size={16} />
                                </Link>
                            </div>

                            <div className="flex flex-col justify-center bg-[#171717] p-8 sm:p-12 lg:p-14">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                                        <Headphones size={21} strokeWidth={1.5} />
                                    </div>
                                    <div>
                                        <p className="text-lg font-medium">We're here for you</p>
                                        <p className="mt-2 text-sm leading-6 text-gray-500">
                                            Reach out whenever you need assistance and we'll do our
                                            best to make your experience easier.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-8 border-t border-white/10 pt-6">
                                    <div className="flex items-center gap-3 text-gray-400">
                                        <FaInstagram size={17} />
                                        <span className="text-sm">
                                            Follow EASYBUY for new arrivals and updates
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {quickLinks.map((item) => (
                        <Link
                            key={item.title}
                            to={item.to}
                            className="group rounded-2xl border border-gray-200 p-6 transition-all hover:border-black"
                        >
                            <p className="text-xs uppercase tracking-wider text-gray-400">
                                {item.label}
                            </p>
                            <div className="mt-3 flex items-center justify-between">
                                <p className="font-medium text-gray-900">{item.title}</p>
                                <ArrowRight
                                    size={17}
                                    className="transition-transform group-hover:translate-x-1"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <NewsLetterBox />
        </div>
    )
}

export default Contact