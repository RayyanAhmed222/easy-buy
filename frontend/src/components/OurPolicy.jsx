import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, ShieldCheck, RotateCcw, Headphones } from 'lucide-react'

const OurPolicy = () => {

    const policies = [
        {
            icon: assets.exchange_icon,
            fallbackIcon: RotateCcw,
            title: 'Easy Exchange',
            description: 'Hassle-free exchanges made simple.',
            detail: 'Flexible exchange policy'
        },
        {
            icon: assets.quality_icon,
            fallbackIcon: ShieldCheck,
            title: '7 Days Returns',
            description: 'Shop confidently with easy returns.',
            detail: 'Simple return process'
        },
        {
            icon: assets.support_img,
            fallbackIcon: Headphones,
            title: '24/7 Support',
            description: 'We are always here when you need us.',
            detail: 'Dedicated customer care'
        }
    ]

    return (

        <section className="mt-24 sm:mt-32">

            {/* ================================================= */}
            {/* ================= SECTION INTRO ================= */}
            {/* ================================================= */}

            <div className="mb-10 text-center">

                <div className="mb-4 flex items-center justify-center gap-3">

                    <span className="h-[1px] w-8 bg-black" />

                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                        EASYBUY / WHY SHOP WITH US
                    </p>

                    <span className="h-[1px] w-8 bg-black" />

                </div>

                <h2 className="text-3xl font-medium tracking-[-1.5px] text-[#171717] sm:text-4xl">

                    Shopping made

                    <span className="font-serif italic font-normal">
                        {' '}simple.
                    </span>

                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-gray-500">
                    Everything you need for a smooth, secure and
                    enjoyable shopping experience.
                </p>

            </div>


            {/* ================================================= */}
            {/* ================= POLICY CARDS ================== */}
            {/* ================================================= */}

            <div className="grid grid-cols-1 border-y border-gray-100 sm:grid-cols-3">

                {policies.map((policy, index) => {

                    const FallbackIcon = policy.fallbackIcon

                    return (

                        <div
                            key={policy.title}
                            className={`
                                group relative px-6 py-10 text-center
                                transition-all duration-500
                                hover:bg-[#fafafa]
                                sm:px-8 lg:px-10
                                ${index !== 0 ? 'border-t sm:border-l sm:border-t-0 border-gray-100' : ''}
                            `}
                        >

                            {/* Icon */}

                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-50 transition-all duration-500 group-hover:scale-105 group-hover:bg-white group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.07)]">

                                {policy.icon ? (

                                    <img
                                        src={policy.icon}
                                        className="h-9 w-9 object-contain opacity-75 transition-opacity duration-300 group-hover:opacity-100"
                                        alt={policy.title}
                                    />

                                ) : (

                                    <FallbackIcon
                                        size={27}
                                        strokeWidth={1.4}
                                        className="text-gray-600"
                                    />

                                )}

                            </div>


                            {/* Title */}

                            <h3 className="text-sm font-semibold text-black sm:text-base">
                                {policy.title}
                            </h3>


                            {/* Description */}

                            <p className="mx-auto mt-2 max-w-xs text-xs leading-6 text-gray-500 sm:text-sm">
                                {policy.description}
                            </p>


                            {/* Detail */}

                            <div className="mt-5 flex items-center justify-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400">

                                <span>
                                    {policy.detail}
                                </span>

                                <ArrowRight
                                    size={12}
                                    strokeWidth={1.5}
                                    className="transition-transform duration-300 group-hover:translate-x-1"
                                />

                            </div>

                        </div>

                    )

                })}

            </div>


            {/* ================================================= */}
            {/* ================= TRUST BAR ====================== */}
            {/* ================================================= */}

            <div className="mt-6 flex flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-6">

                <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                    Secure Shopping
                </span>

                <span className="hidden h-3 w-px bg-gray-200 sm:block" />

                <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                    Quality Products
                </span>

                <span className="hidden h-3 w-px bg-gray-200 sm:block" />

                <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
                    Customer First
                </span>

            </div>

        </section>

    )
}

export default OurPolicy
