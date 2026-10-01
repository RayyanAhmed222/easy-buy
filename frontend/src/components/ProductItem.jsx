import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Plus, ArrowRight } from 'lucide-react'

import { ShopContext } from '../context/ShopContext'

const ProductItem = ({
    id,
    image,
    name,
    price,
    sizes = []
}) => {

    const { currency, addToCart } = useContext(ShopContext)

    const [showSizes, setShowSizes] = useState(false)
    const [liked, setLiked] = useState(false)


    // =================================================
    // ADD TO CART
    // =================================================

    const handleAddToCart = (e) => {

        e.preventDefault()
        e.stopPropagation()

        if (sizes.length > 0) {

            setShowSizes(true)

        } else {

            addToCart(id)

        }
    }


    // =================================================
    // SELECT SIZE
    // =================================================

    const handleSize = (e, size) => {

        e.preventDefault()
        e.stopPropagation()

        addToCart(id, size)

        setShowSizes(false)
    }


    // =================================================
    // WISHLIST
    // =================================================

    const handleWishlist = (e) => {

        e.preventDefault()
        e.stopPropagation()

        setLiked(!liked)
    }


    return (

        <Link
            to={`/product/${id}`}
            className="group block text-gray-700"
        >

            {/* ================================================= */}
            {/* ================= PRODUCT IMAGE ================== */}
            {/* ================================================= */}

            <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5]">

                {/* Product Image */}

                <img
                    src={image?.[0]}
                    alt={name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                />


                {/* Subtle Hover Overlay */}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />


                {/* ================================================= */}
                {/* ================= CART AREA ====================== */}
                {/* ================================================= */}

                <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-center p-3">

                    {!showSizes ? (

                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="
                                flex items-center justify-center gap-3
                                bg-white
                                px-5 py-3
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.15em]
                                text-black
                                shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                                opacity-0
                                translate-y-4
                                transition-all
                                duration-300
                                group-hover:translate-y-0
                                group-hover:opacity-100
                                hover:bg-black
                                hover:text-white
                            "
                        >

                            <span>
                                Add to Cart
                            </span>

                            <Plus
                                size={14}
                                strokeWidth={1.5}
                            />

                        </button>

                    ) : (

                        /* ================================================= */
                        /* ================= SIZE SELECTOR ================= */
                        /* ================================================= */

                        <div
                            className="
                                flex
                                w-full
                                items-center
                                justify-center
                                gap-1.5
                                bg-white/95
                                px-2
                                py-2
                                shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                                backdrop-blur-sm
                            "
                        >

                            <span className="mr-1 text-[8px] font-semibold uppercase tracking-wider text-gray-400">
                                Size
                            </span>

                            {sizes.map((size) => (

                                <button
                                    key={size}
                                    type="button"
                                    onClick={(e) =>
                                        handleSize(e, size)
                                    }
                                    className="
                                        min-w-8
                                        border
                                        border-gray-200
                                        px-2
                                        py-1.5
                                        text-[9px]
                                        font-medium
                                        text-gray-700
                                        transition-all
                                        duration-200
                                        hover:border-black
                                        hover:bg-black
                                        hover:text-white
                                    "
                                >
                                    {size}
                                </button>

                            ))}

                        </div>

                    )}

                </div>

            </div>


            {/* ================================================= */}
            {/* ================= PRODUCT INFO ================== */}
            {/* ================================================= */}

            <div className="pt-4">

                {/* Product Name */}

                <p className="line-clamp-1 text-sm font-medium tracking-[-0.2px] text-[#222] transition-colors duration-300 group-hover:text-black">
                    {name}
                </p>


                {/* Price + Details */}

                <div className="mt-2 flex items-center justify-between">

                    <p className="text-sm font-medium text-black">
                        {currency}{price}
                    </p>


                    <span className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-[0.12em] text-gray-400 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">

                        View

                        <ArrowRight
                            size={12}
                            strokeWidth={1.4}
                        />

                    </span>

                </div>

            </div>

        </Link>

    )
}

export default ProductItem
