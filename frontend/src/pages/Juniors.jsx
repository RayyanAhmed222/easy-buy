import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    SlidersHorizontal,
    ChevronDown,
    ArrowRight,
    X
} from 'lucide-react'

import { ShopContext } from '../context/ShopContext'
import ProductItem from '../components/ProductItem'
import categoryOptions from '../config/categoryOptions.js'

const Kids = () => {
    const { products } = useContext(ShopContext)
    const navigate = useNavigate()

    const {
        gender,
        subCategory,
        subSubCategory
    } = useParams()

    // =========================
    // SORTING
    // =========================
    const [sortType, setSortType] = useState('relavent')
    const [filterProducts, setFilterProducts] = useState([])
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

    // =========================
    // SELECTED GENDER
    // =========================
    const selectedGender = gender
        ? gender.charAt(0).toUpperCase() +
          gender.slice(1).toLowerCase()
        : null

    // =========================
    // FIND ACTUAL SUB CATEGORY
    // =========================
    const selectedSubCategory = subCategory
        ? Object.keys(
            categoryOptions.Kids?.[selectedGender] || {}
        ).find(
            (item) =>
                item
                    .toLowerCase()
                    .replace(/\s+/g, '-') ===
                subCategory.toLowerCase()
        )
        : null

    // =========================
    // GET SUB-SUB CATEGORIES
    // =========================
    const subSubCategories =
        categoryOptions.Kids?.[selectedGender]?.[
            selectedSubCategory
        ] || []

    // =========================
    // FIND ACTUAL SUB-SUB CATEGORY
    // =========================
    const selectedSubSubCategory = subSubCategory
        ? subSubCategories.find(
            (item) =>
                item
                    .toLowerCase()
                    .replace(/\s+/g, '-') ===
                subSubCategory.toLowerCase()
        )
        : null

    // =========================
    // FILTER PRODUCTS
    // =========================
    const getFilteredProducts = () => {
        return products.filter((item) => {

            // /juniors
            // ALL Kids products
            if (!gender) {
                return item.category === 'Kids'
            }

            // /juniors/boys
            // ALL Boys products
            if (gender && !subCategory) {
                return (
                    item.category === 'Kids' &&
                    item.gender?.toLowerCase() ===
                    gender.toLowerCase()
                )
            }

            // /juniors/boys/t-shirts
            // ALL Boys T-Shirts
            if (
                gender &&
                subCategory &&
                !subSubCategory
            ) {
                return (
                    item.category === 'Kids' &&
                    item.gender?.toLowerCase() ===
                    gender.toLowerCase() &&
                    item.subCategory?.toLowerCase() ===
                    selectedSubCategory?.toLowerCase()
                )
            }

            // /juniors/boys/t-shirts/basic
            // ONLY Boys Basic T-Shirts
            return (
                item.category === 'Kids' &&
                item.gender?.toLowerCase() ===
                gender.toLowerCase() &&
                item.subCategory?.toLowerCase() ===
                selectedSubCategory?.toLowerCase() &&
                item.subSubCategory?.toLowerCase() ===
                selectedSubSubCategory?.toLowerCase()
            )
        })
    }

    // =========================
    // UPDATE + SORT PRODUCTS
    // =========================
    useEffect(() => {
        let sortedProducts = [
            ...getFilteredProducts()
        ]

        if (sortType === 'low-high') {
            sortedProducts.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            )
        }

        if (sortType === 'high-low') {
            sortedProducts.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            )
        }

        setFilterProducts(sortedProducts)
    }, [
        products,
        gender,
        subCategory,
        subSubCategory,
        selectedSubCategory,
        selectedSubSubCategory,
        sortType
    ])

    // =========================
    // PAGE TITLE
    // =========================
    const pageTitle = !gender
        ? 'Juniors Collection'
        : selectedSubSubCategory
            ? selectedSubSubCategory
            : selectedSubCategory
                ? `${selectedGender} ${selectedSubCategory}`
                : `${selectedGender}'s Collection`

    // =========================
    // PAGE DESCRIPTION
    // =========================
    const pageDescription = selectedSubSubCategory
        ? `Explore our ${selectedSubSubCategory} styles for juniors.`
        : selectedSubCategory
            ? `Discover fun, comfortable ${selectedSubCategory.toLowerCase()} styles made for everyday adventures.`
            : gender
                ? `Explore stylish ${selectedGender?.toLowerCase()}'s fashion designed for comfort, confidence and everyday moments.`
                : 'Discover playful, comfortable and stylish essentials made for every young personality.'

    return (
        <div className="pt-6 sm:pt-10 pb-16">

            {/* =========================
                HERO / PAGE INTRO
            ========================= */}
            <div className="
                relative
                overflow-hidden
                rounded-[2rem]
                bg-[#f5f5f2]
                mb-10
                sm:mb-12
            ">

                {/* Decorative Background */}
                <div className="
                    absolute
                    -top-24
                    -right-24
                    w-72
                    h-72
                    rounded-full
                    bg-white/70
                    blur-3xl
                " />

                <div className="
                    absolute
                    -bottom-28
                    -left-20
                    w-72
                    h-72
                    rounded-full
                    bg-white/80
                    blur-3xl
                " />

                <div className="
                    relative
                    px-6
                    sm:px-10
                    lg:px-14
                    py-10
                    sm:py-14
                    lg:py-16
                ">

                    {/* Label */}
                    <div className="
                        flex
                        items-center
                        gap-3
                        mb-5
                    ">
                        <span className="
                            w-8
                            sm:w-10
                            h-[1px]
                            bg-black
                        " />

                        <p className="
                            text-[10px]
                            sm:text-xs
                            font-semibold
                            tracking-[0.25em]
                            text-gray-500
                        ">
                            EASYBUY / JUNIORS
                        </p>
                    </div>

                    {/* Heading */}
                    <div className="max-w-3xl">

                        <h1 className="
                            text-4xl
                            sm:text-5xl
                            lg:text-6xl
                            xl:text-7xl
                            font-semibold
                            tracking-tight
                            text-[#171717]
                            leading-[1.05]
                        ">
                            {pageTitle}
                        </h1>

                        <p className="
                            mt-5
                            max-w-xl
                            text-sm
                            sm:text-base
                            leading-7
                            text-gray-500
                        ">
                            {pageDescription}
                        </p>

                    </div>

                    {/* Breadcrumb */}
                    <div className="
                        mt-7
                        flex
                        flex-wrap
                        items-center
                        gap-2
                        text-xs
                        sm:text-sm
                        text-gray-500
                    ">

                        <button
                            onClick={() =>
                                navigate('/juniors')
                            }
                            className="
                                hover:text-black
                                transition
                            "
                        >
                            Juniors
                        </button>

                        {selectedGender && (
                            <>
                                <span>/</span>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/juniors/${gender}`
                                        )
                                    }
                                    className={
                                        !subCategory
                                            ? 'text-black font-medium'
                                            : 'hover:text-black transition'
                                    }
                                >
                                    {selectedGender}
                                </button>
                            </>
                        )}

                        {selectedSubCategory && (
                            <>
                                <span>/</span>

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/juniors/${gender}/${subCategory}`
                                        )
                                    }
                                    className={
                                        !subSubCategory
                                            ? 'text-black font-medium'
                                            : 'hover:text-black transition'
                                    }
                                >
                                    {selectedSubCategory}
                                </button>
                            </>
                        )}

                        {selectedSubSubCategory && (
                            <>
                                <span>/</span>

                                <span className="
                                    text-black
                                    font-medium
                                ">
                                    {selectedSubSubCategory}
                                </span>
                            </>
                        )}

                    </div>
                </div>
            </div>

            {/* =========================
                GENDER NAVIGATION
            ========================= */}
            {!gender && (
                <div className="mb-10">

                    <div className="mb-5">

                        <p className="
                            text-xs
                            font-semibold
                            tracking-[0.2em]
                            text-gray-400
                        ">
                            SHOP JUNIORS
                        </p>

                        <h2 className="
                            text-lg
                            sm:text-xl
                            font-semibold
                            text-gray-900
                            mt-1
                        ">
                            Choose a collection
                        </h2>

                    </div>

                    <div className="
                        grid
                        grid-cols-2
                        gap-3
                        sm:gap-5
                    ">

                        {/* BOYS */}
                        <button
                            onClick={() =>
                                navigate('/juniors/boys')
                            }
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-2xl
                                bg-[#f5f5f2]
                                p-5
                                sm:p-7
                                text-left
                                transition-all
                                duration-300
                                hover:shadow-lg
                            "
                        >

                            <div className="
                                absolute
                                -right-8
                                -bottom-8
                                w-28
                                h-28
                                rounded-full
                                bg-white/70
                                transition-transform
                                duration-500
                                group-hover:scale-150
                            " />

                            <div className="
                                relative
                                flex
                                items-end
                                justify-between
                            ">

                                <div>

                                    <p className="
                                        text-[10px]
                                        tracking-[0.2em]
                                        text-gray-400
                                        font-semibold
                                    ">
                                        COLLECTION 01
                                    </p>

                                    <h3 className="
                                        mt-2
                                        text-2xl
                                        sm:text-3xl
                                        font-semibold
                                        text-gray-900
                                    ">
                                        Boys
                                    </h3>

                                </div>

                                <ArrowRight
                                    size={20}
                                    className="
                                        text-gray-500
                                        group-hover:translate-x-1
                                        transition-transform
                                    "
                                />

                            </div>

                        </button>

                        {/* GIRLS */}
                        <button
                            onClick={() =>
                                navigate('/juniors/girls')
                            }
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-2xl
                                bg-[#f5f5f2]
                                p-5
                                sm:p-7
                                text-left
                                transition-all
                                duration-300
                                hover:shadow-lg
                            "
                        >

                            <div className="
                                absolute
                                -right-8
                                -bottom-8
                                w-28
                                h-28
                                rounded-full
                                bg-white/70
                                transition-transform
                                duration-500
                                group-hover:scale-150
                            " />

                            <div className="
                                relative
                                flex
                                items-end
                                justify-between
                            ">

                                <div>

                                    <p className="
                                        text-[10px]
                                        tracking-[0.2em]
                                        text-gray-400
                                        font-semibold
                                    ">
                                        COLLECTION 02
                                    </p>

                                    <h3 className="
                                        mt-2
                                        text-2xl
                                        sm:text-3xl
                                        font-semibold
                                        text-gray-900
                                    ">
                                        Girls
                                    </h3>

                                </div>

                                <ArrowRight
                                    size={20}
                                    className="
                                        text-gray-500
                                        group-hover:translate-x-1
                                        transition-transform
                                    "
                                />

                            </div>

                        </button>

                    </div>
                </div>
            )}

            {/* =========================
                SUB CATEGORY NAVIGATION
            ========================= */}
            {gender && !subCategory && (
                <div className="mb-10">

                    <div className="mb-5">

                        <p className="
                            text-xs
                            font-semibold
                            tracking-[0.2em]
                            text-gray-400
                        ">
                            EXPLORE
                        </p>

                        <h2 className="
                            text-lg
                            sm:text-xl
                            font-semibold
                            text-gray-900
                            mt-1
                        ">
                            Shop {selectedGender}
                        </h2>

                    </div>

                    <div className="
                        flex
                        gap-2
                        sm:gap-3
                        overflow-x-auto
                        pb-2
                        scrollbar-hide
                    ">

                        {Object.keys(
                            categoryOptions.Kids?.[
                                selectedGender
                            ] || {}
                        ).map((item) => {

                            const slug = item
                                .toLowerCase()
                                .replace(/\s+/g, '-')

                            return (
                                <button
                                    key={item}
                                    onClick={() =>
                                        navigate(
                                            `/juniors/${gender}/${slug}`
                                        )
                                    }
                                    className="
                                        shrink-0
                                        rounded-full
                                        px-5
                                        py-2.5
                                        text-xs
                                        sm:text-sm
                                        font-medium
                                        border
                                        border-gray-200
                                        bg-white
                                        text-gray-600
                                        hover:border-black
                                        hover:text-black
                                        transition-all
                                        duration-300
                                    "
                                >
                                    {item}
                                </button>
                            )
                        })}

                    </div>
                </div>
            )}

            {/* =========================
                SUB-SUB CATEGORY NAVIGATION
            ========================= */}
            {gender && selectedSubCategory && (
                <div className="mb-10">

                    <div className="mb-4">

                        <p className="
                            text-xs
                            font-semibold
                            tracking-[0.2em]
                            text-gray-400
                        ">
                            EXPLORE
                        </p>

                        <h2 className="
                            text-lg
                            sm:text-xl
                            font-semibold
                            text-gray-900
                            mt-1
                        ">
                            Shop by style
                        </h2>

                    </div>

                    <div className="
                        flex
                        gap-2
                        sm:gap-3
                        overflow-x-auto
                        pb-2
                        scrollbar-hide
                    ">

                        {/* ALL */}
                        <button
                            onClick={() =>
                                navigate(
                                    `/juniors/${gender}/${subCategory}`
                                )
                            }
                            className={`
                                shrink-0
                                rounded-full
                                px-5
                                py-2.5
                                text-xs
                                sm:text-sm
                                font-medium
                                border
                                transition-all
                                duration-300
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
                                subSubCategory?.toLowerCase() ===
                                slug

                            return (
                                <button
                                    key={item}
                                    onClick={() =>
                                        navigate(
                                            `/juniors/${gender}/${subCategory}/${slug}`
                                        )
                                    }
                                    className={`
                                        shrink-0
                                        rounded-full
                                        px-5
                                        py-2.5
                                        text-xs
                                        sm:text-sm
                                        font-medium
                                        border
                                        transition-all
                                        duration-300
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
            )}

            {/* =========================
                PRODUCTS HEADER
            ========================= */}
            <div className="
                flex
                flex-col
                sm:flex-row
                sm:items-end
                sm:justify-between
                gap-5
                mb-7
            ">

                <div>

                    <p className="
                        text-xs
                        font-semibold
                        tracking-[0.2em]
                        text-gray-400
                        mb-1
                    ">
                        COLLECTION
                    </p>

                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <h2 className="
                            text-2xl
                            sm:text-3xl
                            font-semibold
                            text-gray-900
                        ">
                            {!gender
                                ? 'All Juniors'
                                : selectedSubSubCategory
                                    ? selectedSubSubCategory
                                    : selectedSubCategory
                                        ? selectedSubCategory
                                        : `All ${selectedGender}`}
                        </h2>

                        <span className="
                            text-xs
                            sm:text-sm
                            text-gray-400
                        ">
                            {filterProducts.length} items
                        </span>

                    </div>
                </div>

                {/* SORT */}
                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    {/* Mobile Filter */}
                    <button
                        onClick={() =>
                            setMobileFilterOpen(true)
                        }
                        className="
                            sm:hidden
                            flex
                            items-center
                            gap-2
                            border
                            border-gray-200
                            rounded-full
                            px-4
                            py-2.5
                            text-xs
                            font-medium
                        "
                    >
                        <SlidersHorizontal size={15} />
                        Filter
                    </button>

                    {/* Sort Dropdown */}
                    <div className="relative">

                        <select
                            value={sortType}
                            onChange={(e) =>
                                setSortType(e.target.value)
                            }
                            className="
                                appearance-none
                                bg-white
                                border
                                border-gray-200
                                rounded-full
                                pl-4
                                pr-10
                                py-2.5
                                text-xs
                                sm:text-sm
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
                            className="
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                pointer-events-none
                                text-gray-500
                            "
                        />

                    </div>
                </div>
            </div>

            {/* =========================
                ACTIVE FILTERS
            ========================= */}
            {(gender ||
                subCategory ||
                subSubCategory) && (

                <div className="
                    flex
                    flex-wrap
                    items-center
                    gap-2
                    mb-7
                ">

                    <span className="
                        text-xs
                        text-gray-400
                    ">
                        Showing:
                    </span>

                    {/* GENDER */}
                    {gender && (
                        <div className="
                            flex
                            items-center
                            gap-2
                            bg-gray-100
                            rounded-full
                            px-3
                            py-1.5
                            text-xs
                        ">

                            <span>
                                {selectedGender}
                            </span>

                            <button
                                onClick={() =>
                                    navigate(
                                        '/juniors'
                                    )
                                }
                                className="
                                    text-gray-400
                                    hover:text-black
                                    transition
                                "
                            >
                                <X size={12} />
                            </button>

                        </div>
                    )}

                    {/* SUB CATEGORY */}
                    {selectedSubCategory && (
                        <div className="
                            flex
                            items-center
                            gap-2
                            bg-gray-100
                            rounded-full
                            px-3
                            py-1.5
                            text-xs
                        ">

                            <span>
                                {selectedSubCategory}
                            </span>

                            <button
                                onClick={() =>
                                    navigate(
                                        `/juniors/${gender}`
                                    )
                                }
                                className="
                                    text-gray-400
                                    hover:text-black
                                    transition
                                "
                            >
                                <X size={12} />
                            </button>

                        </div>
                    )}

                    {/* SUB-SUB CATEGORY */}
                    {selectedSubSubCategory && (
                        <div className="
                            flex
                            items-center
                            gap-2
                            bg-black
                            text-white
                            rounded-full
                            px-3
                            py-1.5
                            text-xs
                        ">

                            <span>
                                {selectedSubSubCategory}
                            </span>

                            <button
                                onClick={() =>
                                    navigate(
                                        `/juniors/${gender}/${subCategory}`
                                    )
                                }
                                className="
                                    text-gray-400
                                    hover:text-white
                                    transition
                                "
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
                            key={
                                item._id || index
                            }
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
                <div className="
                    min-h-[350px]
                    flex
                    items-center
                    justify-center
                    border
                    border-dashed
                    border-gray-200
                    rounded-3xl
                ">

                    <div className="
                        text-center
                        px-6
                    ">

                        <div className="
                            w-16
                            h-16
                            rounded-full
                            bg-gray-100
                            flex
                            items-center
                            justify-center
                            mx-auto
                            mb-5
                        ">
                            <SlidersHorizontal
                                size={22}
                                className="text-gray-400"
                            />
                        </div>

                        <h3 className="
                            text-lg
                            font-semibold
                            text-gray-900
                        ">
                            No products found
                        </h3>

                        <p className="
                            text-sm
                            text-gray-400
                            mt-2
                            max-w-sm
                            mx-auto
                        ">
                            We couldn't find products in
                            this collection. Try exploring
                            another juniors category.
                        </p>

                        <button
                            onClick={() =>
                                navigate('/juniors')
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
                            Explore Juniors

                            <ArrowRight size={14} />
                        </button>

                    </div>
                </div>
            )}

            {/* =========================
                BOTTOM INFO
            ========================= */}
            {filterProducts.length > 0 && (
                <div className="
                    mt-16
                    sm:mt-20
                    border-t
                    border-gray-100
                    pt-7
                    flex
                    flex-col
                    sm:flex-row
                    items-center
                    justify-between
                    gap-4
                ">

                    <p className="
                        text-xs
                        text-gray-400
                    ">
                        Showing {filterProducts.length} products
                    </p>

                    <button
                        onClick={() =>
                            navigate('/juniors')
                        }
                        className="
                            group
                            flex
                            items-center
                            gap-2
                            text-xs
                            font-medium
                            text-gray-700
                            hover:text-black
                            transition
                        "
                    >
                        View complete juniors collection

                        <ArrowRight
                            size={14}
                            className="
                                group-hover:translate-x-1
                                transition-transform
                            "
                        />
                    </button>

                </div>
            )}

            {/* =========================
                MOBILE SORT SHEET
            ========================= */}
            {mobileFilterOpen && (
                <div className="
                    fixed
                    inset-0
                    z-[100]
                    sm:hidden
                ">

                    {/* Overlay */}
                    <div
                        className="
                            absolute
                            inset-0
                            bg-black/40
                            backdrop-blur-sm
                        "
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
                    ">

                        {/* Header */}
                        <div className="
                            flex
                            items-center
                            justify-between
                            mb-7
                        ">

                            <div>

                                <p className="
                                    text-xs
                                    text-gray-400
                                    tracking-wider
                                ">
                                    SORT PRODUCTS
                                </p>

                                <h3 className="
                                    text-xl
                                    font-semibold
                                    mt-1
                                ">
                                    Refine your view
                                </h3>

                            </div>

                            <button
                                onClick={() =>
                                    setMobileFilterOpen(false)
                                }
                                className="
                                    w-9
                                    h-9
                                    rounded-full
                                    bg-gray-100
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                <X size={17} />
                            </button>

                        </div>

                        {/* Sort Options */}
                        <div className="space-y-2">

                            <button
                                onClick={() => {
                                    setSortType('relavent')
                                    setMobileFilterOpen(false)
                                }}
                                className={`
                                    w-full
                                    text-left
                                    px-4
                                    py-4
                                    rounded-xl
                                    text-sm
                                    border
                                    transition
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
                                    text-left
                                    px-4
                                    py-4
                                    rounded-xl
                                    text-sm
                                    border
                                    transition
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
                                    text-left
                                    px-4
                                    py-4
                                    rounded-xl
                                    text-sm
                                    border
                                    transition
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

export default Kids
