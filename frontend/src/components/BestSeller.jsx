import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'

import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const BestSeller = () => {

    const { products } = useContext(ShopContext)

    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {

        const bestProduct = products.filter(
            (item) => item.bestSeller
        )

        setBestSeller(bestProduct.slice(0, 5))

    }, [products])


    return (

        <section className="mt-24 sm:mt-32">

            {/* ================================================= */}
            {/* ================= SECTION HEADER ================= */}
            {/* ================================================= */}

            <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

                <div>

                    {/* Label */}

                    <div className="mb-4 flex items-center gap-3">

                        <span className="h-[1px] w-8 bg-black sm:w-10" />

                        <div className="flex items-center gap-2">

                            <Sparkles
                                size={13}
                                strokeWidth={1.5}
                                className="text-gray-400"
                            />

                            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                                EASYBUY / CUSTOMER FAVOURITES
                            </p>

                        </div>

                    </div>


                    {/* Heading */}

                    <h2 className="text-3xl font-medium tracking-[-1.5px] text-[#171717] sm:text-4xl lg:text-5xl">

                        Top

                        <span className="font-serif italic font-normal">
                            {' '}Picks
                        </span>

                    </h2>


                    {/* Description */}

                    <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                        The pieces everyone is talking about.
                        Discover our most-loved styles right now.
                    </p>

                </div>

            </div>


            {/* ================================================= */}
            {/* ================= FEATURED PRODUCTS ============== */}
            {/* ================================================= */}

            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5 md:grid-cols-4 lg:grid-cols-5">

                {bestSeller.map((item, index) => (

                    <div
                        key={item._id || index}
                        className="group"
                    >

                        <ProductItem
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                            sizes={item.sizes}
                        />

                    </div>

                ))}

            </div>


            {/* ================================================= */}
            {/* ================= BOTTOM FEATURE ================= */}
            {/* ================================================= */}

            <div className="mt-14 border-y border-gray-100 py-5">

                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">

                    <div className="flex items-center gap-3">

                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                            <Sparkles
                                size={13}
                                strokeWidth={1.5}
                            />
                        </span>

                        <p className="text-xs text-gray-500">
                            Loved by our customers
                        </p>

                    </div>


                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                        Handpicked styles · Everyday essentials · New season
                    </p>
                    
                </div>

            </div>

        </section>

    )
}

export default BestSeller
