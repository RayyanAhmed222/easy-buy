import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SlidersHorizontal, ChevronDown, ArrowRight, X } from 'lucide-react'

import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'
import categoryOptions from '../config/categoryOptions.js'

const Men = () => {
    const { products } = useContext(ShopContext)
    const navigate = useNavigate()
    const { subCategory, subSubCategory } = useParams()

    // =========================
    // SORTING
    // =========================
    const [sortType, setSortType] = useState('relavent')
    const [filterProducts, setFilterProducts] = useState([])
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

    // =========================
    // FIND ACTUAL SUB CATEGORY
    // =========================
    const actualSubCategory = Object.keys(
        categoryOptions.Men || {}
    ).find(
        (key) =>
            key.toLowerCase() === subCategory?.toLowerCase()
    )

    // =========================
    // GET SUB-SUB CATEGORIES
    // =========================
    const subSubCategories =
        categoryOptions.Men?.[actualSubCategory] || []

    // =========================
    // FIND ACTUAL SUB-SUB CATEGORY
    // =========================
    const actualSubSubCategory = subSubCategories.find(
        (item) =>
            item
                .toLowerCase()
                .replace(/\s+/g, '-') ===
            subSubCategory?.toLowerCase()
    )

    // =========================
    // FILTER PRODUCTS
    // =========================
    const getFilteredProducts = () => {
        return products.filter((item) => {

            // /men
            if (!subCategory) {
                return item.category === 'Men'
            }

            // /men/t-shirts
            if (!subSubCategory) {
                return (
                    item.category === 'Men' &&
                    item.subCategory?.toLowerCase() ===
                    actualSubCategory?.toLowerCase()
                )
            }

            // /men/t-shirts/tank-top
            return (
                item.category === 'Men' &&
                item.subCategory?.toLowerCase() ===
                actualSubCategory?.toLowerCase() &&
                item.subSubCategory?.toLowerCase() ===
                actualSubSubCategory?.toLowerCase()
            )
        })
    }

    // =========================
    // UPDATE + SORT PRODUCTS
    // =========================
    useEffect(() => {
        let sortedProducts = [...getFilteredProducts()]

        if (sortType === 'low-high') {
            sortedProducts.sort(
                (a, b) => a.price - b.price
            )
        }

        if (sortType === 'high-low') {
            sortedProducts.sort(
                (a, b) => b.price - a.price
            )
        }

        setFilterProducts(sortedProducts)
    }, [
        products,
        subCategory,
        subSubCategory,
        actualSubCategory,
        actualSubSubCategory,
        sortType
    ])

    // =========================
    // PAGE TITLE
    // =========================
    const pageTitle = subCategory
        ? actualSubCategory || 'Collection'
        : 'Men’s Collection'

    const pageDescription = subSubCategory
        ? `Explore our ${actualSubSubCategory || 'latest'} collection.`
        : subCategory
            ? `Discover premium ${actualSubCategory || 'men’s'} styles designed for everyday confidence.`
            : 'Discover modern essentials, timeless pieces and fresh styles for every occasion.'

    return (
        <div className="pt-6 sm:pt-10 pb-16">

            {/* =========================
                HERO / PAGE INTRO
            ========================= */}
            <div className="relative overflow-hidden rounded-[2rem] bg-[#f5f5f2] mb-10 sm:mb-12">

                {/* Decorative Background */}
                <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/70 blur-3xl" />
                <div className="absolute -bottom-28 -left-20 w-72 h-72 rounded-full bg-white/80 blur-3xl" />

                <div className="relative px-6 sm:px-10 lg:px-14 py-10 sm:py-14 lg:py-16">

                    {/* Small Label */}
                    <div className="flex items-center gap-3 mb-5">
                        <span className="w-8 sm:w-10 h-[1px] bg-black" />

                        <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-gray-500">
                            EASYBUY / MEN
                        </p>
                    </div>

                    {/* Main Heading */}
                    <div className="max-w-3xl">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-[#171717] leading-[1.05]">
                            {pageTitle}
                        </h1>

                        <p className="mt-5 max-w-xl text-sm sm:text-base leading-7 text-gray-500">
                            {pageDescription}
                        </p>
                    </div>

                    {/* Current Category */}
                    <div className="mt-7 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500">
                        <button
                            onClick={() => navigate('/men')}
                            className="hover:text-black transition"
                        >
                            Men
                        </button>

                        {actualSubCategory && (
                            <>
                                <span>/</span>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/men/${subCategory}`
                                        )
                                    }
                                    className={
                                        !subSubCategory
                                            ? 'text-black font-medium'
                                            : 'hover:text-black transition'
                                    }
                                >
                                    {actualSubCategory}
                                </button>
                            </>
                        )}

                        {actualSubSubCategory && (
                            <>
                                <span>/</span>

                                <span className="text-black font-medium">
                                    {actualSubSubCategory}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* =========================
                CATEGORY NAVIGATION
            ========================= */}
            {subCategory && (
                <div className="mb-10">

                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-xs font-semibold tracking-[0.2em] text-gray-400">
                                EXPLORE
                            </p>

                            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mt-1">
                                Shop by style
                            </h2>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide">

                            {/* ALL */}
                            <button
                                onClick={() =>
                                    navigate(
                                        `/men/${subCategory}`
                                    )
                                }
                                className={`
                                    shrink-0 rounded-full px-5 py-2.5
                                    text-xs sm:text-sm font-medium
                                    border transition-all duration-300
                                    ${
                                        !subSubCategory
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black'
                                    }
                                `}
                            >
                                All
                            </button>

                            {/* SUB-SUB CATEGORIES */}
                            {subSubCategories.map((item) => {
                                const slug = item
                                    .toLowerCase()
                                    .replace(/\s+/g, '-')

                                const isActive =
                                    subSubCategory?.toLowerCase() === slug

                                return (
                                    <button
                                        key={item}
                                        onClick={() =>
                                            navigate(
                                                `/men/${subCategory}/${slug}`
                                            )
                                        }
                                        className={`
                                            shrink-0 rounded-full px-5 py-2.5
                                            text-xs sm:text-sm font-medium
                                            border transition-all duration-300
                                            ${
                                                isActive
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-gray-600 border-gray-200 hover:border-black hover:text-black'
                                            }
                                        `}
                                    >
                                        {item}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* =========================
                PRODUCTS HEADER
            ========================= */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-7">

                <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-gray-400 mb-1">
                        COLLECTION
                    </p>

                    <div className="flex items-center gap-3">
                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                            {subSubCategory
                                ? actualSubSubCategory
                                : subCategory
                                    ? actualSubCategory
                                    : 'All Men'}
                        </h2>

                        <span className="text-xs sm:text-sm text-gray-400">
                            {filterProducts.length} items
                        </span>
                    </div>
                </div>

                {/* SORT */}
                <div className="flex items-center gap-3">

                    {/* Mobile Filter Button */}
                    <button
                        onClick={() =>
                            setMobileFilterOpen(true)
                        }
                        className="sm:hidden flex items-center gap-2 border border-gray-200 rounded-full px-4 py-2.5 text-xs font-medium"
                    >
                        <SlidersHorizontal size={15} />
                        Filter
                    </button>

                    {/* Sort Dropdown */}
                    <div className="relative group">
                        <select
                            value={sortType}
                            onChange={(e) =>
                                setSortType(e.target.value)
                            }
                            className="
                                appearance-none
                                bg-white
                                border border-gray-200
                                rounded-full
                                pl-4 pr-10
                                py-2.5
                                text-xs sm:text-sm
                                text-gray-700
                                outline-none
                                cursor-pointer
                                hover:border-gray-400
                                focus:border-black
                                transition
                            "
                        >
                            <option value="relavent">
                                Sort: Relevant
                            </option>

                            <option value="low-high">
                                Price: Low to High
                            </option>

                            <option value="high-low">
                                Price: High to Low
                            </option>
                        </select>

                        <ChevronDown
                            size={15}
                            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"
                        />
                    </div>
                </div>
            </div>

            {/* =========================
                ACTIVE FILTER
            ========================= */}
            {(subCategory || subSubCategory) && (
                <div className="flex flex-wrap items-center gap-2 mb-7">

                    <span className="text-xs text-gray-400">
                        Showing:
                    </span>

                    {subCategory && (
                        <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5 text-xs">
                            <span>
                                {actualSubCategory}
                            </span>

                            <button
                                onClick={() =>
                                    navigate('/men')
                                }
                                className="text-gray-400 hover:text-black"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    )}

                    {subSubCategory && (
                        <div className="flex items-center gap-2 bg-black text-white rounded-full px-3 py-1.5 text-xs">
                            <span>
                                {actualSubSubCategory}
                            </span>

                            <button
                                onClick={() =>
                                    navigate(
                                        `/men/${subCategory}`
                                    )
                                }
                                className="text-gray-400 hover:text-white"
                            >
                                <X size={12} />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* =========================
                PRODUCTS GRID
            ========================= */}
            {filterProducts.length > 0 ? (
                <div className="
                    grid
                    grid-cols-2
                    sm:grid-cols-3
                    lg:grid-cols-4
                    gap-x-3
                    sm:gap-x-5
                    lg:gap-x-6
                    gap-y-8
                    sm:gap-y-10
                ">
                    {filterProducts.map((item, index) => (
                        <ProductItem
                            key={item._id || index}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                            sizes={item.sizes}
                        />
                    ))}
                </div>
            ) : (
                /* =========================
                    EMPTY STATE
                ========================= */
                <div className="min-h-[350px] flex items-center justify-center border border-dashed border-gray-200 rounded-3xl">

                    <div className="text-center px-6">

                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                            <SlidersHorizontal
                                size={22}
                                className="text-gray-400"
                            />
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900">
                            No products found
                        </h3>

                        <p className="text-sm text-gray-400 mt-2 max-w-sm mx-auto">
                            We couldn't find products in this
                            collection. Try exploring another
                            category.
                        </p>

                        <button
                            onClick={() =>
                                navigate('/men')
                            }
                            className="
                                mt-6
                                inline-flex
                                items-center
                                gap-2
                                bg-black
                                text-white
                                rounded-full
                                px-5
                                py-2.5
                                text-xs
                                font-medium
                                hover:bg-gray-800
                                transition
                            "
                        >
                            Explore Men
                            <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            )}

            {/* =========================
                BOTTOM INFO
            ========================= */}
            {filterProducts.length > 0 && (
                <div className="mt-16 sm:mt-20 border-t border-gray-100 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">

                    <p className="text-xs text-gray-400">
                        Showing {filterProducts.length} products
                    </p>
                    
                </div>
            )}

            {/* =========================
                MOBILE FILTER OVERLAY
            ========================= */}
            {mobileFilterOpen && (
                <div className="fixed inset-0 z-[100] sm:hidden">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() =>
                            setMobileFilterOpen(false)
                        }
                    />

                    {/* Bottom Sheet */}
                    <div className="
                        absolute
                        bottom-0
                        left-0
                        right-0
                        bg-white
                        rounded-t-[2rem]
                        p-6
                        animate-[slideUp_0.3s_ease-out]
                    ">

                        <div className="flex items-center justify-between mb-7">

                            <div>
                                <p className="text-xs text-gray-400 tracking-wider">
                                    SORT PRODUCTS
                                </p>

                                <h3 className="text-xl font-semibold mt-1">
                                    Refine your view
                                </h3>
                            </div>

                            <button
                                onClick={() =>
                                    setMobileFilterOpen(false)
                                }
                                className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
                            >
                                <X size={17} />
                            </button>
                        </div>

                        <div className="space-y-2">

                            <button
                                onClick={() => {
                                    setSortType('relavent')
                                    setMobileFilterOpen(false)
                                }}
                                className={`
                                    w-full
                                    flex
                                    items-center
                                    justify-between
                                    px-4
                                    py-4
                                    rounded-xl
                                    text-sm
                                    border
                                    ${
                                        sortType === 'relavent'
                                            ? 'border-black bg-black text-white'
                                            : 'border-gray-200'
                                    }
                                `}
                            >
                                Relevant
                            </button>

                            <button
                                onClick={() => {
                                    setSortType('low-high')
                                    setMobileFilterOpen(false)
                                }}
                                className={`
                                    w-full
                                    flex
                                    items-center
                                    justify-between
                                    px-4
                                    py-4
                                    rounded-xl
                                    text-sm
                                    border
                                    ${
                                        sortType === 'low-high'
                                            ? 'border-black bg-black text-white'
                                            : 'border-gray-200'
                                    }
                                `}
                            >
                                Price: Low to High
                            </button>

                            <button
                                onClick={() => {
                                    setSortType('high-low')
                                    setMobileFilterOpen(false)
                                }}
                                className={`
                                    w-full
                                    flex
                                    items-center
                                    justify-between
                                    px-4
                                    py-4
                                    rounded-xl
                                    text-sm
                                    border
                                    ${
                                        sortType === 'high-low'
                                            ? 'border-black bg-black text-white'
                                            : 'border-gray-200'
                                    }
                                `}
                            >
                                Price: High to Low
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Men
