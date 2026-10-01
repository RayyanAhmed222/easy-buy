import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import {
    ShoppingBag,
    Trash2,
    Plus,
    Minus,
    ArrowRight,
    ShieldCheck,
    Truck,
    RotateCcw,
    ChevronRight
} from 'lucide-react'
import CartTotal from '../components/CartTotal'

const Cart = () => {

    const {
        products,
        currency,
        cartItems,
        updateQuantity,
        navigate
    } = useContext(ShopContext)

    const [cartData, setCartData] = useState([])

    useEffect(() => {

        if (products.length > 0) {

            const tempData = []

            for (const items in cartItems) {

                for (const item in cartItems[items]) {

                    if (cartItems[items][item] > 0) {

                        tempData.push({
                            _id: items,
                            size: item,
                            quantity: cartItems[items][item]
                        })

                    }

                }

            }

            setCartData(tempData)

        }

    }, [cartItems, products])


    // ================= EMPTY CART =================

    if (cartData.length === 0) {

        return (
            <div className="min-h-[65vh] flex items-center justify-center py-16">

                <div className="text-center max-w-md mx-auto">

                    <div className="
                        w-24
                        h-24
                        rounded-full
                        bg-[#f5f5f2]
                        flex
                        items-center
                        justify-center
                        mx-auto
                    ">
                        <ShoppingBag
                            size={34}
                            strokeWidth={1.4}
                            className="text-gray-500"
                        />
                    </div>

                    <p className="
                        text-[11px]
                        uppercase
                        tracking-[0.25em]
                        text-gray-400
                        mt-7
                    ">
                        EASYBUY / CART
                    </p>

                    <h1 className="
                        text-3xl
                        sm:text-4xl
                        font-medium
                        text-gray-900
                        mt-3
                    ">
                        Your cart is empty.
                    </h1>

                    <p className="
                        text-sm
                        text-gray-500
                        leading-6
                        mt-4
                    ">
                        Looks like you haven't added anything to your
                        cart yet. Explore our collections and find
                        something you love.
                    </p>

                    <button
                        onClick={() => navigate('/')}
                        className="
                            mt-7
                            inline-flex
                            items-center
                            gap-3
                            bg-black
                            text-white
                            px-7
                            py-3.5
                            rounded-xl
                            text-sm
                            font-medium
                            hover:bg-gray-800
                            transition
                        "
                    >
                        Explore Collection
                        <ArrowRight size={17} />
                    </button>

                </div>

            </div>
        )
    }


    return (

        <div className="pt-8 sm:pt-12 pb-16">

            {/* ================= HEADER ================= */}

            <div className="mb-10">

                <div className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-gray-400
                    mb-4
                ">
                    <span>Home</span>
                    <ChevronRight size={13} />
                    <span className="text-gray-700">
                        Cart
                    </span>
                </div>

                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                    gap-3
                ">

                    <div>

                        <p className="
                            text-[11px]
                            uppercase
                            tracking-[0.25em]
                            text-gray-400
                        ">
                            EASYBUY / YOUR BAG
                        </p>

                        <h1 className="
                            text-3xl
                            sm:text-4xl
                            font-medium
                            tracking-tight
                            text-gray-900
                            mt-2
                        ">
                            Shopping Cart
                        </h1>

                    </div>

                    <p className="
                        text-sm
                        text-gray-500
                    ">
                        {cartData.length} {cartData.length === 1 ? 'item' : 'items'} in your cart
                    </p>

                </div>

            </div>


            {/* ================= MAIN CONTENT ================= */}

            <div className="
                grid
                grid-cols-1
                lg:grid-cols-[1fr_380px]
                gap-10
                lg:gap-16
                items-start
            ">


                {/* ================= CART ITEMS ================= */}

                <div>

                    {/* Desktop Header */}

                    <div className="
                        hidden
                        sm:grid
                        grid-cols-[1fr_130px_80px]
                        gap-5
                        pb-4
                        border-b
                        border-gray-200
                        text-[10px]
                        uppercase
                        tracking-[0.18em]
                        text-gray-400
                    ">

                        <span>Product</span>
                        <span className="text-center">
                            Quantity
                        </span>
                        <span className="text-right">
                            Remove
                        </span>

                    </div>


                    {/* Items */}

                    <div>

                        {cartData.map((item, index) => {

                            const productData = products.find(
                                (product) => product._id === item._id
                            )

                            if (!productData) return null

                            return (

                                <div
                                    key={index}
                                    className="
                                        py-6
                                        sm:py-7
                                        border-b
                                        border-gray-200
                                    "
                                >

                                    <div className="
                                        grid
                                        grid-cols-[1fr_auto]
                                        sm:grid-cols-[1fr_130px_80px]
                                        gap-4
                                        sm:gap-5
                                        items-center
                                    ">


                                        {/* ================= PRODUCT ================= */}

                                        <div className="
                                            flex
                                            items-start
                                            gap-4
                                            sm:gap-6
                                            min-w-0
                                        ">

                                            <div className="
                                                w-20
                                                sm:w-24
                                                aspect-[3/4]
                                                rounded-xl
                                                overflow-hidden
                                                bg-[#f5f5f2]
                                                flex-shrink-0
                                            ">

                                                <img
                                                    src={productData.image[0]}
                                                    alt={productData.name}
                                                    className="
                                                        w-full
                                                        h-full
                                                        object-cover
                                                    "
                                                />

                                            </div>


                                            <div className="
                                                min-w-0
                                                pt-1
                                            ">

                                                <p className="
                                                    text-sm
                                                    sm:text-base
                                                    font-medium
                                                    text-gray-900
                                                    leading-5
                                                ">
                                                    {productData.name}
                                                </p>

                                                <p className="
                                                    text-sm
                                                    text-gray-500
                                                    mt-2
                                                ">
                                                    {currency}{productData.price}
                                                </p>


                                                {/* Size */}

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    mt-3
                                                ">

                                                    <span className="
                                                        text-[10px]
                                                        uppercase
                                                        tracking-wider
                                                        text-gray-400
                                                    ">
                                                        Size
                                                    </span>

                                                    <span className="
                                                        min-w-[36px]
                                                        px-2
                                                        py-1
                                                        rounded-md
                                                        bg-[#f5f5f2]
                                                        text-xs
                                                        text-center
                                                        text-gray-700
                                                    ">
                                                        {item.size}
                                                    </span>

                                                </div>


                                                {/* Mobile Quantity */}

                                                <div className="
                                                    flex
                                                    sm:hidden
                                                    items-center
                                                    justify-between
                                                    mt-4
                                                ">

                                                    <div className="
                                                        flex
                                                        items-center
                                                        border
                                                        border-gray-200
                                                        rounded-lg
                                                        overflow-hidden
                                                    ">

                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item._id,
                                                                    item.size,
                                                                    Math.max(
                                                                        1,
                                                                        item.quantity - 1
                                                                    )
                                                                )
                                                            }
                                                            className="
                                                                w-8
                                                                h-8
                                                                flex
                                                                items-center
                                                                justify-center
                                                                hover:bg-gray-100
                                                                transition
                                                            "
                                                        >
                                                            <Minus size={13} />
                                                        </button>

                                                        <span className="
                                                            w-9
                                                            text-center
                                                            text-xs
                                                            font-medium
                                                        ">
                                                            {item.quantity}
                                                        </span>

                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item._id,
                                                                    item.size,
                                                                    item.quantity + 1
                                                                )
                                                            }
                                                            className="
                                                                w-8
                                                                h-8
                                                                flex
                                                                items-center
                                                                justify-center
                                                                hover:bg-gray-100
                                                                transition
                                                            "
                                                        >
                                                            <Plus size={13} />
                                                        </button>

                                                    </div>


                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item._id,
                                                                item.size,
                                                                0
                                                            )
                                                        }
                                                        className="
                                                            flex
                                                            items-center
                                                            gap-1.5
                                                            text-xs
                                                            text-gray-400
                                                            hover:text-red-500
                                                            transition
                                                        "
                                                    >
                                                        <Trash2 size={15} />
                                                        Remove
                                                    </button>

                                                </div>

                                            </div>

                                        </div>


                                        {/* ================= DESKTOP QUANTITY ================= */}

                                        <div className="
                                            hidden
                                            sm:flex
                                            justify-center
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                border
                                                border-gray-200
                                                rounded-lg
                                                overflow-hidden
                                            ">

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item._id,
                                                            item.size,
                                                            Math.max(
                                                                1,
                                                                item.quantity - 1
                                                            )
                                                        )
                                                    }
                                                    className="
                                                        w-9
                                                        h-9
                                                        flex
                                                        items-center
                                                        justify-center
                                                        hover:bg-gray-100
                                                        transition
                                                    "
                                                >
                                                    <Minus size={13} />
                                                </button>

                                                <span className="
                                                    w-10
                                                    text-center
                                                    text-xs
                                                    font-medium
                                                ">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item._id,
                                                            item.size,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="
                                                        w-9
                                                        h-9
                                                        flex
                                                        items-center
                                                        justify-center
                                                        hover:bg-gray-100
                                                        transition
                                                    "
                                                >
                                                    <Plus size={13} />
                                                </button>

                                            </div>

                                        </div>


                                        {/* ================= DELETE ================= */}

                                        <div className="
                                            hidden
                                            sm:flex
                                            justify-end
                                        ">

                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item._id,
                                                        item.size,
                                                        0
                                                    )
                                                }
                                                className="
                                                    w-10
                                                    h-10
                                                    rounded-full
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-gray-400
                                                    hover:bg-gray-100
                                                    hover:text-red-500
                                                    transition
                                                "
                                            >
                                                <Trash2 size={17} />
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            )

                        })}

                    </div>

                </div>


                {/* ================= ORDER SUMMARY ================= */}

                <div className="
                    lg:sticky
                    lg:top-6
                ">

                    <div className="
                        rounded-2xl
                        bg-[#f5f5f2]
                        p-6
                        sm:p-7
                    ">

                        <div className="mb-6">

                            <p className="
                                text-[10px]
                                uppercase
                                tracking-[0.2em]
                                text-gray-400
                            ">
                                Order Summary
                            </p>

                            <h2 className="
                                text-xl
                                font-medium
                                mt-2
                            ">
                                Your total
                            </h2>

                        </div>


                        {/* Existing CartTotal */}

                        <CartTotal />


                        {/* Checkout */}

                        <button
                            onClick={() => navigate('/place-order')}
                            className="
                                w-full
                                mt-7
                                bg-black
                                text-white
                                py-4
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                gap-3
                                text-sm
                                font-semibold
                                tracking-wide
                                hover:bg-gray-800
                                active:scale-[0.99]
                                transition-all
                            "
                        >
                            Proceed to Checkout
                            <ArrowRight size={17} />
                        </button>


                        {/* Continue Shopping */}

                        <button
                            onClick={() => navigate('/')}
                            className="
                                w-full
                                mt-3
                                py-3
                                text-sm
                                text-gray-600
                                hover:text-black
                                transition
                            "
                        >
                            Continue Shopping
                        </button>

                    </div>


                    {/* ================= TRUST FEATURES ================= */}

                    <div className="
                        grid
                        grid-cols-3
                        gap-2
                        mt-4
                    ">

                        <div className="
                            rounded-xl
                            border
                            border-gray-200
                            p-3
                            text-center
                        ">

                            <Truck
                                size={17}
                                className="mx-auto"
                                strokeWidth={1.5}
                            />

                            <p className="
                                text-[10px]
                                font-medium
                                mt-2
                            ">
                                Delivery
                            </p>

                            <p className="
                                text-[9px]
                                text-gray-400
                                mt-1
                            ">
                                Fast shipping
                            </p>

                        </div>


                        <div className="
                            rounded-xl
                            border
                            border-gray-200
                            p-3
                            text-center
                        ">

                            <RotateCcw
                                size={17}
                                className="mx-auto"
                                strokeWidth={1.5}
                            />

                            <p className="
                                text-[10px]
                                font-medium
                                mt-2
                            ">
                                Returns
                            </p>

                            <p className="
                                text-[9px]
                                text-gray-400
                                mt-1
                            ">
                                7 days
                            </p>

                        </div>


                        <div className="
                            rounded-xl
                            border
                            border-gray-200
                            p-3
                            text-center
                        ">

                            <ShieldCheck
                                size={17}
                                className="mx-auto"
                                strokeWidth={1.5}
                            />

                            <p className="
                                text-[10px]
                                font-medium
                                mt-2
                            ">
                                Secure
                            </p>

                            <p className="
                                text-[9px]
                                text-gray-400
                                mt-1
                            ">
                                Checkout
                            </p>

                        </div>

                    </div>


                    {/* Payment Note */}

                    <div className="
                        flex
                        items-center
                        gap-2
                        mt-5
                        px-2
                        text-xs
                        text-gray-400
                    ">
                        <ShieldCheck size={14} />
                        Secure & encrypted checkout
                    </div>

                </div>

            </div>

        </div>

    )
}

export default Cart
