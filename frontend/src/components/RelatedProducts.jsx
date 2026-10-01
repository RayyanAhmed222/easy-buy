import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem'
import { ArrowRight, Sparkles } from 'lucide-react'

const RelatedProducts = ({ category, subCategory }) => {

    const { products } = useContext(ShopContext)

    const [related, setRelated] = useState([])

    useEffect(() => {

        if (products.length > 0) {

            let productsCopy = [...products]

            productsCopy = productsCopy.filter(
                (item) => item.category === category
            )

            productsCopy = productsCopy.filter(
                (item) => item.subCategory === subCategory
            )

            setRelated(productsCopy.slice(0, 5))
        }

    }, [products, category, subCategory])


    // Don't show the section if there are no related products
    if (related.length === 0) {
        return null
    }


    return (
        <section className="mt-24 sm:mt-32 mb-16">

            {/* =====================================================
                SECTION HEADER
            ===================================================== */}

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">

                <div>

                    {/* Small Label */}

                    <div className="flex items-center gap-2 mb-4">

                        <Sparkles
                            size={14}
                            strokeWidth={1.8}
                            className="text-gray-500"
                        />

                        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-gray-500">
                            EASYBUY / YOU MAY ALSO LIKE
                        </p>

                    </div>


                    {/* Heading */}

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-gray-900">

                        Related{' '}

                        <span className="font-serif italic">
                            Products.
                        </span>

                    </h2>


                    <p className="mt-3 text-sm text-gray-500 max-w-xl leading-6">

                        Complete your style with pieces selected from
                        the same collection.

                    </p>

                </div>


                {/* View All */}

                <Link
                    to={`/${category?.toLowerCase()}`}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-gray-800 w-fit"
                >

                    <span className="border-b border-gray-900 pb-1">
                        Explore Collection
                    </span>

                    <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                    />

                </Link>

            </div>


            {/* =====================================================
                PRODUCTS GRID
            ===================================================== */}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 sm:gap-x-5 gap-y-8">

                {related.map((item, index) => (

                    <div
                        key={item._id || index}
                        className="animate-[fadeIn_0.5s_ease-out]"
                    >

                        <ProductItem
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            sizes={item.sizes}
                        />

                    </div>

                ))}

            </div>


            {/* =====================================================
                MOBILE EXPLORE BUTTON
            ===================================================== */}

            <div className="flex justify-center mt-10 sm:hidden">

                <Link
                    to={`/${category?.toLowerCase()}`}
                    className="group flex items-center gap-2 border border-gray-200 rounded-full px-6 py-3 text-sm font-medium hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                >

                    Explore Collection

                    <ArrowRight
                        size={15}
                        className="group-hover:translate-x-1 transition-transform"
                    />

                </Link>

            </div>


            {/* =====================================================
                BOTTOM DIVIDER
            ===================================================== */}

            <div className="mt-14 flex items-center gap-4">

                <div className="h-px bg-gray-200 flex-1"></div>

                <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400">
                    EASYBUY
                </span>

                <div className="h-px bg-gray-200 flex-1"></div>

            </div>

        </section>
    )
}

export default RelatedProducts
