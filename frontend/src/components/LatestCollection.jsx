import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'

const LatestCollection = () => {

    const { products } = useContext(ShopContext)

    const [latestProducts, setLatestProduct] = useState([])

    useEffect(() => {
        setLatestProduct(products.slice(0, 10))
    }, [products])


    return (

        <section className="mt-20 sm:mt-28">

            {/* ================================================= */}
            {/* ================= SECTION HEADER ================= */}
            {/* ================================================= */}

            <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

                <div>

                    {/* Small Label */}

                    <div className="mb-4 flex items-center gap-3">

                        <span className="h-[1px] w-8 bg-black sm:w-10" />

                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-400">
                            EASYBUY / NEW IN
                        </p>

                    </div>


                    {/* Heading */}

                    <h2 className="text-3xl font-medium tracking-[-1.5px] text-[#171717] sm:text-4xl lg:text-5xl">

                        Fresh

                        <span className="font-serif italic font-normal">
                            {' '}Picks
                        </span>

                    </h2>

                    <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500">
                        Explore the latest pieces selected for your
                        everyday wardrobe.
                    </p>

                </div>

            </div>


            {/* ================================================= */}
            {/* ================= PRODUCTS ======================= */}
            {/* ================================================= */}

            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-5 md:grid-cols-4 lg:grid-cols-5">

                {latestProducts.map((item, index) => (

                    <div
                        key={item._id || index}
                        className="group"
                    >

                        <ProductItem
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            sizes={item.sizes}
                        />

                    </div>

                ))}

            </div>


            {/* ================================================= */}
            {/* ================= MOBILE VIEW ALL ================= */}
            {/* ================================================= */}

            <div className="mt-12 flex justify-center sm:hidden">

                <Link
                    to="/"
                    className="group flex items-center gap-3 border border-black px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-black hover:text-white"
                >

                    <span>
                        Explore Collection
                    </span>

                    <ArrowRight
                        size={15}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />

                </Link>

            </div>

        </section>

    )
}

export default LatestCollection
