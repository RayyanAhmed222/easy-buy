import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
    Heart,
    ShoppingBag,
    ChevronRight,
    ShieldCheck,
    Truck,
    RotateCcw,
    Star,
    Minus,
    Plus
} from 'lucide-react'

import { ShopContext } from '../context/ShopContext'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {

    const { productId } = useParams()
    const { products, currency, addToCart } = useContext(ShopContext)

    const [productData, setProductData] = useState(false)
    const [image, setImage] = useState('')
    const [size, setSize] = useState('')
    const [liked, setLiked] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState('description')

    useEffect(() => {
        const product = products.find(
            (item) => item._id === productId
        )

        if (product) {
            setProductData(product)
            setImage(product.image?.[0] || '')
            setSize('')
            setQuantity(1)
        }
    }, [productId, products])

    const handleAddToCart = () => {
        if (productData.sizes?.length > 0 && !size) {
            return
        }

        for (let i = 0; i < quantity; i++) {
            addToCart(productData._id, size)
        }
    }

    if (!productData) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sm text-gray-500">
                        Loading product...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="pt-6 sm:pt-10">

            {/* ================= BREADCRUMB ================= */}

            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-8">
                <Link
                    to="/"
                    className="hover:text-black transition"
                >
                    Home
                </Link>

                <ChevronRight size={14} />

                <span>{productData.category}</span>

                {productData.subCategory && (
                    <>
                        <ChevronRight size={14} />
                        <span>{productData.subCategory}</span>
                    </>
                )}

                <ChevronRight size={14} />

                <span className="text-gray-700 truncate max-w-[180px]">
                    {productData.name}
                </span>
            </div>


            {/* ================= PRODUCT SECTION ================= */}

            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-16">

                {/* ================= IMAGE GALLERY ================= */}

                <div className="flex flex-col-reverse sm:flex-row gap-3">

                    {/* Thumbnail Images */}

                    <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-[90px] w-full scrollbar-hide">

                        {productData.image?.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => setImage(item)}
                                className={`
                                    relative flex-shrink-0
                                    w-[72px] sm:w-full
                                    aspect-[3/4]
                                    overflow-hidden
                                    rounded-xl
                                    bg-[#f5f5f2]
                                    transition-all duration-300
                                    ${
                                        image === item
                                            ? 'ring-2 ring-black ring-offset-2'
                                            : 'opacity-60 hover:opacity-100'
                                    }
                                `}
                            >
                                <img
                                    src={item}
                                    alt={`${productData.name} ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}

                    </div>


                    {/* Main Image */}

                    <div className="relative flex-1 bg-[#f5f5f2] rounded-2xl overflow-hidden group">

                        <img
                            src={image}
                            alt={productData.name}
                            className="
                                w-full
                                aspect-[4/5]
                                object-cover
                                transition-transform
                                duration-700
                                group-hover:scale-[1.03]
                            "
                        />

                    </div>

                </div>


                {/* ================= PRODUCT INFORMATION ================= */}

                <div className="flex flex-col">

                    {/* Category */}

                    <p className="text-[11px] tracking-[0.22em] uppercase text-gray-400 font-medium">
                        EASYBUY / {productData.category}
                    </p>


                    {/* Product Name */}

                    <h1 className="
                        text-3xl
                        sm:text-4xl
                        lg:text-5xl
                        font-medium
                        tracking-tight
                        text-gray-900
                        mt-3
                        leading-[1.08]
                    ">
                        {productData.name}
                    </h1>


                    {/* Rating */}

                    <div className="flex items-center gap-3 mt-5">

                        <div className="flex items-center gap-1">

                            {[1, 2, 3, 4].map((star) => (
                                <Star
                                    key={star}
                                    size={15}
                                    className="fill-black text-black"
                                />
                            ))}

                            <Star
                                size={15}
                                className="text-gray-300"
                            />

                        </div>

                        <span className="text-sm text-gray-500">
                            4.5
                        </span>

                        <span className="text-sm text-gray-300">
                            |
                        </span>

                        <span className="text-sm text-gray-500">
                            122 Reviews
                        </span>

                    </div>


                    {/* Price */}

                    <div className="mt-7 flex items-center gap-4">

                        <p className="text-3xl font-semibold text-gray-900">
                            {currency}{productData.price}
                        </p>

                        <span className="text-xs px-3 py-1.5 rounded-full bg-[#f1f1ed] text-gray-600">
                            Inclusive of taxes
                        </span>

                    </div>


                    {/* Description */}

                    <p className="
                        mt-6
                        text-sm
                        sm:text-[15px]
                        leading-7
                        text-gray-500
                        max-w-xl
                    ">
                        {productData.description}
                    </p>


                    {/* Divider */}

                    <div className="h-px bg-gray-200 my-7"></div>


                    {/* Size */}

                    {productData.sizes?.length > 0 && (
                        <div>

                            <div className="flex items-center justify-between mb-4">

                                <p className="text-sm font-semibold text-gray-900">
                                    Select Size
                                </p>

                            </div>

                            <div className="flex flex-wrap gap-2">

                                {productData.sizes.map((item, index) => (

                                    <button
                                        key={index}
                                        onClick={() => setSize(item)}
                                        className={`
                                            min-w-[58px]
                                            px-5
                                            py-3
                                            rounded-lg
                                            border
                                            text-sm
                                            font-medium
                                            transition-all
                                            duration-200
                                            ${
                                                size === item
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-gray-700 border-gray-200 hover:border-black'
                                            }
                                        `}
                                    >
                                        {item}
                                    </button>

                                ))}

                            </div>

                            {!size && (
                                <p className="text-xs text-gray-400 mt-3">
                                    Please select a size before adding to cart.
                                </p>
                            )}

                        </div>
                    )}


                    {/* Add To Cart */}

                    <button
                        onClick={handleAddToCart}
                        disabled={
                            productData.sizes?.length > 0 && !size
                        }
                        className="
                            mt-7
                            w-full
                            flex
                            items-center
                            justify-center
                            gap-3
                            bg-black
                            text-white
                            py-4
                            rounded-xl
                            text-sm
                            font-semibold
                            tracking-wide
                            hover:bg-gray-800
                            active:scale-[0.99]
                            disabled:bg-gray-300
                            disabled:cursor-not-allowed
                            transition-all
                            duration-300
                        "
                    >
                        <ShoppingBag size={18} />
                        {size || productData.sizes?.length === 0
                            ? 'ADD TO CART'
                            : 'SELECT A SIZE'}
                    </button>


                    {/* Product Benefits */}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5">

                        <div className="rounded-xl bg-[#f7f7f4] p-4">
                            <Truck
                                size={19}
                                strokeWidth={1.6}
                            />
                            <p className="text-xs font-semibold mt-3">
                                Fast Delivery
                            </p>
                            <p className="text-[11px] text-gray-500 mt-1">
                                Quick & reliable shipping
                            </p>
                        </div>

                        <div className="rounded-xl bg-[#f7f7f4] p-4">
                            <RotateCcw
                                size={19}
                                strokeWidth={1.6}
                            />
                            <p className="text-xs font-semibold mt-3">
                                Easy Returns
                            </p>
                            <p className="text-[11px] text-gray-500 mt-1">
                                7 days return policy
                            </p>
                        </div>

                        <div className="rounded-xl bg-[#f7f7f4] p-4">
                            <ShieldCheck
                                size={19}
                                strokeWidth={1.6}
                            />
                            <p className="text-xs font-semibold mt-3">
                                Secure
                            </p>
                            <p className="text-[11px] text-gray-500 mt-1">
                                100% secure checkout
                            </p>
                        </div>

                    </div>


                    {/* Trust Information */}

                    <div className="mt-6 py-5 border-y border-gray-200">

                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <ShieldCheck size={17} />
                            <span>100% Original Product</span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-3">
                            <Truck size={17} />
                            <span>Cash on Delivery Available</span>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-gray-600 mt-3">
                            <RotateCcw size={17} />
                            <span>Easy 7-Day Return & Exchange</span>
                        </div>

                    </div>

                </div>

            </div>


            {/* ================= DESCRIPTION / REVIEWS ================= */}

            <div className="mt-20 sm:mt-28">

                {/* Tabs */}

                <div className="flex border-b border-gray-200">

                    <button
                        onClick={() => setActiveTab('description')}
                        className={`
                            relative
                            px-5
                            sm:px-7
                            py-4
                            text-sm
                            font-medium
                            transition
                            ${
                                activeTab === 'description'
                                    ? 'text-black'
                                    : 'text-gray-400 hover:text-black'
                            }
                        `}
                    >
                        Description

                        {activeTab === 'description' && (
                            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></span>
                        )}
                    </button>

                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`
                            relative
                            px-5
                            sm:px-7
                            py-4
                            text-sm
                            font-medium
                            transition
                            ${
                                activeTab === 'reviews'
                                    ? 'text-black'
                                    : 'text-gray-400 hover:text-black'
                            }
                        `}
                    >
                        Reviews (122)

                        {activeTab === 'reviews' && (
                            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"></span>
                        )}
                    </button>

                </div>


                {/* Tab Content */}

                {activeTab === 'description' ? (

                    <div className="max-w-4xl py-8 space-y-5 text-sm leading-7 text-gray-500">

                        <p>
                            Discover premium style with EASYBUY. This
                            product has been carefully selected to combine
                            modern design, everyday comfort and effortless
                            styling.
                        </p>

                        <p>
                            Designed for versatile everyday wear, this piece
                            can easily become part of your regular wardrobe.
                            Pair it with your favourite essentials to create
                            a look that feels naturally yours.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">

                            <div className="p-5 rounded-xl bg-[#f7f7f4]">
                                <p className="text-xs uppercase tracking-wider text-gray-400">
                                    Quality
                                </p>
                                <p className="text-sm font-medium text-gray-900 mt-2">
                                    Premium Selection
                                </p>
                            </div>

                            <div className="p-5 rounded-xl bg-[#f7f7f4]">
                                <p className="text-xs uppercase tracking-wider text-gray-400">
                                    Style
                                </p>
                                <p className="text-sm font-medium text-gray-900 mt-2">
                                    Modern & Versatile
                                </p>
                            </div>

                            <div className="p-5 rounded-xl bg-[#f7f7f4]">
                                <p className="text-xs uppercase tracking-wider text-gray-400">
                                    Experience
                                </p>
                                <p className="text-sm font-medium text-gray-900 mt-2">
                                    Made for Everyday
                                </p>
                            </div>

                        </div>

                    </div>

                ) : (

                    <div className="py-8">

                        <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-8">

                            <div>
                                <p className="text-4xl font-semibold">
                                    4.5
                                </p>

                                <div className="flex gap-1 mt-2">
                                    {[1, 2, 3, 4].map((star) => (
                                        <Star
                                            key={star}
                                            size={14}
                                            className="fill-black text-black"
                                        />
                                    ))}
                                    <Star
                                        size={14}
                                        className="text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="text-sm text-gray-500">
                                Based on 122 customer reviews
                            </div>

                        </div>

                        <div className="border-t border-gray-200 pt-6">

                            <div className="flex items-start gap-4">

                                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
                                    A
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">
                                        Verified Customer
                                    </p>

                                    <div className="flex gap-1 mt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={12}
                                                className="fill-black text-black"
                                            />
                                        ))}
                                    </div>

                                    <p className="text-sm text-gray-500 mt-3 leading-6 max-w-2xl">
                                        Great quality and really nice fit.
                                        The product looks exactly as shown
                                        and the overall shopping experience
                                        was smooth.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>


            {/* ================= RELATED PRODUCTS ================= */}

            <div className="mt-10">

                <RelatedProducts
                    category={productData.category}
                    subCategory={productData.subCategory}
                />

            </div>

        </div>
    )
}

export default Product
