import React, { useContext, useState } from 'react'
import axios from 'axios'
import {
    MapPin,
    User,
    Mail,
    Phone,
    Home,
    CreditCard,
    Banknote,
    ShieldCheck,
    Lock,
    ArrowRight,
    CheckCircle2,
    Truck
} from 'lucide-react'
import { toast } from 'react-toastify'

import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod')
    const [placingOrder, setPlacingOrder] = useState(false)

    const {
        navigate,
        backendUrl,
        token,
        cartItems,
        setCartItems,
        getCartAmount,
        delivery_fee,
        products
    } = useContext(ShopContext)


    // =========================================
    // FORM DATA
    // =========================================

    const [formData, setFormData] = useState({

        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: 'Pakistan',
        phone: ''

    })


    // =========================================
    // INPUT HANDLER
    // =========================================

    const onChangeHandler = (event) => {

        const name = event.target.name
        const value = event.target.value

        setFormData(data => ({
            ...data,
            [name]: value
        }))

    }


    // =========================================
    // PLACE ORDER
    // =========================================

    const onSubmitHandler = async (event) => {

        event.preventDefault()

        if (!token) {
            toast.error('Please login before placing your order.')
            navigate('/login')
            return
        }

        try {

            setPlacingOrder(true)


            // =========================================
            // CREATE ORDER ITEMS
            // =========================================

            let orderItems = []

            for (const items in cartItems) {

                for (const item in cartItems[items]) {

                    if (cartItems[items][item] > 0) {

                        const itemInfo = structuredClone(
                            products.find(
                                product => product._id === items
                            )
                        )

                        if (itemInfo) {

                            itemInfo.size = item

                            itemInfo.quantity =
                                cartItems[items][item]

                            orderItems.push(itemInfo)

                        }

                    }

                }

            }


            // =========================================
            // CHECK CART
            // =========================================

            if (orderItems.length === 0) {

                toast.error('Your cart is empty.')
                setPlacingOrder(false)
                navigate('/cart')

                return
            }


            // =========================================
            // ORDER DATA
            // =========================================

            const orderData = {

                address: formData,

                items: orderItems,

                amount:
                    getCartAmount() + delivery_fee,

                paymentMethod: method

            }


            // =========================================
            // CASH ON DELIVERY
            // =========================================

            if (method === 'cod') {

                const response = await axios.post(

                    backendUrl + '/api/order/place',

                    orderData,

                    {
                        headers: {
                            token
                        }
                    }

                )


                if (response.data.success) {

                    setCartItems({})

                    toast.success('Order placed successfully!')

                    navigate('/orders')

                } else {

                    toast.error(
                        response.data.message
                    )

                }

                return
            }


            // =========================================
            // ONLINE PAYMENT
            // =========================================

            if (method === 'online') {

                const response = await axios.post(

                    backendUrl + '/api/order/payment',

                    orderData,

                    {
                        headers: {
                            token
                        }
                    }

                )


                if (response.data.success) {

                    const {
                        paymentUrl,
                        paymentData
                    } = response.data


                    // Create temporary PayFast form

                    const form =
                        document.createElement('form')

                    form.method = 'POST'
                    form.action = paymentUrl


                    // Add PayFast fields

                    Object.entries(paymentData).forEach(
                        ([key, value]) => {

                            const input =
                                document.createElement('input')

                            input.type = 'hidden'
                            input.name = key
                            input.value = value

                            form.appendChild(input)

                        }
                    )


                    document.body.appendChild(form)

                    // Redirect to PayFast

                    form.submit()

                } else {

                    toast.error(
                        response.data.message
                    )

                }

            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message
            )

        } finally {

            setPlacingOrder(false)

        }

    }


    return (

        <form
            onSubmit={onSubmitHandler}
            className="
                pt-6
                sm:pt-10
                pb-20
            "
        >

            {/* =========================================
                HEADER
            ========================================= */}

            <div className="
                mb-10
                flex
                flex-col
                sm:flex-row
                sm:items-end
                sm:justify-between
                gap-3
            ">

                <div>

                    <p className="
                        text-[10px]
                        uppercase
                        tracking-[0.25em]
                        text-gray-400
                    ">
                        EASYBUY / CHECKOUT
                    </p>

                    <h1 className="
                        text-3xl
                        sm:text-4xl
                        font-medium
                        tracking-tight
                        text-gray-900
                        mt-2
                    ">
                        Complete your order
                    </h1>

                    <p className="
                        text-sm
                        text-gray-500
                        mt-2
                    ">
                        Enter your delivery details and choose your
                        preferred payment method.
                    </p>

                </div>


                {/* Secure Checkout */}

                <div className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-gray-500
                    bg-[#f5f5f2]
                    px-4
                    py-2.5
                    rounded-full
                    w-fit
                ">

                    <Lock size={14} />

                    Secure Checkout

                </div>

            </div>


            {/* =========================================
                CHECKOUT GRID
            ========================================= */}

            <div className="
                grid
                grid-cols-1
                lg:grid-cols-[1fr_390px]
                gap-8
                lg:gap-14
                items-start
            ">


                {/* =========================================
                    LEFT SIDE
                ========================================= */}

                <div className="space-y-6">


                    {/* =========================================
                        DELIVERY INFORMATION
                    ========================================= */}

                    <div className="
                        border
                        border-gray-200
                        rounded-2xl
                        p-6
                        sm:p-8
                    ">

                        {/* Section Header */}

                        <div className="
                            flex
                            items-start
                            gap-4
                            mb-7
                        ">

                            <div className="
                                w-11
                                h-11
                                rounded-xl
                                bg-[#f5f5f2]
                                flex
                                items-center
                                justify-center
                                flex-shrink-0
                            ">

                                <MapPin
                                    size={20}
                                    strokeWidth={1.6}
                                />

                            </div>

                            <div>

                                <p className="
                                    text-[10px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-gray-400
                                ">
                                    Step 01
                                </p>

                                <h2 className="
                                    text-xl
                                    font-medium
                                    mt-1
                                ">
                                    Delivery Information
                                </h2>

                                <p className="
                                    text-xs
                                    text-gray-500
                                    mt-1
                                ">
                                    Where should we deliver your order?
                                </p>

                            </div>

                        </div>


                        {/* =========================================
                            NAME
                        ========================================= */}

                        <div className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            gap-4
                        ">

                            <div>

                                <label className="
                                    block
                                    text-xs
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    First Name
                                </label>

                                <div className="relative">

                                    <User
                                        size={16}
                                        className="
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-400
                                        "
                                        strokeWidth={1.6}
                                    />

                                    <input
                                        required
                                        onChange={onChangeHandler}
                                        name="firstName"
                                        value={formData.firstName}
                                        className="
                                            w-full
                                            border
                                            border-gray-200
                                            rounded-xl
                                            pl-11
                                            pr-4
                                            py-3.5
                                            text-sm
                                            outline-none
                                            transition
                                            focus:border-black
                                            focus:ring-1
                                            focus:ring-black
                                        "
                                        placeholder="First name"
                                        type="text"
                                    />

                                </div>

                            </div>


                            <div>

                                <label className="
                                    block
                                    text-xs
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    Last Name
                                </label>

                                <div className="relative">

                                    <User
                                        size={16}
                                        className="
                                            absolute
                                            left-4
                                            top-1/2
                                            -translate-y-1/2
                                            text-gray-400
                                        "
                                        strokeWidth={1.6}
                                    />

                                    <input
                                        required
                                        onChange={onChangeHandler}
                                        name="lastName"
                                        value={formData.lastName}
                                        className="
                                            w-full
                                            border
                                            border-gray-200
                                            rounded-xl
                                            pl-11
                                            pr-4
                                            py-3.5
                                            text-sm
                                            outline-none
                                            transition
                                            focus:border-black
                                            focus:ring-1
                                            focus:ring-black
                                        "
                                        placeholder="Last name"
                                        type="text"
                                    />

                                </div>

                            </div>

                        </div>


                        {/* =========================================
                            EMAIL
                        ========================================= */}

                        <div className="mt-4">

                            <label className="
                                block
                                text-xs
                                font-medium
                                text-gray-700
                                mb-2
                            ">
                                Email Address
                            </label>

                            <div className="relative">

                                <Mail
                                    size={16}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-400
                                    "
                                    strokeWidth={1.6}
                                />

                                <input
                                    required
                                    onChange={onChangeHandler}
                                    name="email"
                                    value={formData.email}
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-xl
                                        pl-11
                                        pr-4
                                        py-3.5
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-black
                                        focus:ring-1
                                        focus:ring-black
                                    "
                                    placeholder="you@example.com"
                                    type="email"
                                />

                            </div>

                        </div>


                        {/* =========================================
                            STREET
                        ========================================= */}

                        <div className="mt-4">

                            <label className="
                                block
                                text-xs
                                font-medium
                                text-gray-700
                                mb-2
                            ">
                                Street Address
                            </label>

                            <div className="relative">

                                <Home
                                    size={16}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-400
                                    "
                                    strokeWidth={1.6}
                                />

                                <input
                                    required
                                    onChange={onChangeHandler}
                                    name="street"
                                    value={formData.street}
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-xl
                                        pl-11
                                        pr-4
                                        py-3.5
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-black
                                        focus:ring-1
                                        focus:ring-black
                                    "
                                    placeholder="House number, street name, area"
                                    type="text"
                                />

                            </div>

                        </div>


                        {/* =========================================
                            CITY / STATE
                        ========================================= */}

                        <div className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            gap-4
                            mt-4
                        ">

                            <div>

                                <label className="
                                    block
                                    text-xs
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    City
                                </label>

                                <input
                                    required
                                    onChange={onChangeHandler}
                                    name="city"
                                    value={formData.city}
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-xl
                                        px-4
                                        py-3.5
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-black
                                        focus:ring-1
                                        focus:ring-black
                                    "
                                    placeholder="City"
                                    type="text"
                                />

                            </div>


                            <div>

                                <label className="
                                    block
                                    text-xs
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    State / Province
                                </label>

                                <input
                                    required
                                    onChange={onChangeHandler}
                                    name="state"
                                    value={formData.state}
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-xl
                                        px-4
                                        py-3.5
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-black
                                        focus:ring-1
                                        focus:ring-black
                                    "
                                    placeholder="State"
                                    type="text"
                                />

                            </div>

                        </div>


                        {/* =========================================
                            ZIP / COUNTRY
                        ========================================= */}

                        <div className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            gap-4
                            mt-4
                        ">

                            <div>

                                <label className="
                                    block
                                    text-xs
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    ZIP / Postal Code
                                </label>

                                <input
                                    required
                                    onChange={onChangeHandler}
                                    name="zipcode"
                                    value={formData.zipcode}
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-xl
                                        px-4
                                        py-3.5
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-black
                                        focus:ring-1
                                        focus:ring-black
                                    "
                                    placeholder="Postal code"
                                    type="text"
                                />

                            </div>


                            <div>

                                <label className="
                                    block
                                    text-xs
                                    font-medium
                                    text-gray-700
                                    mb-2
                                ">
                                    Country
                                </label>

                                <input
                                    required
                                    onChange={onChangeHandler}
                                    name="country"
                                    value={formData.country}
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-xl
                                        px-4
                                        py-3.5
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-black
                                        focus:ring-1
                                        focus:ring-black
                                    "
                                    placeholder="Country"
                                    type="text"
                                />

                            </div>

                        </div>


                        {/* =========================================
                            PHONE
                        ========================================= */}

                        <div className="mt-4">

                            <label className="
                                block
                                text-xs
                                font-medium
                                text-gray-700
                                mb-2
                            ">
                                Phone Number
                            </label>

                            <div className="relative">

                                <Phone
                                    size={16}
                                    className="
                                        absolute
                                        left-4
                                        top-1/2
                                        -translate-y-1/2
                                        text-gray-400
                                    "
                                    strokeWidth={1.6}
                                />

                                <input
                                    required
                                    onChange={onChangeHandler}
                                    name="phone"
                                    value={formData.phone}
                                    className="
                                        w-full
                                        border
                                        border-gray-200
                                        rounded-xl
                                        pl-11
                                        pr-4
                                        py-3.5
                                        text-sm
                                        outline-none
                                        transition
                                        focus:border-black
                                        focus:ring-1
                                        focus:ring-black
                                    "
                                    placeholder="+92 300 0000000"
                                    type="tel"
                                />

                            </div>

                        </div>

                    </div>


                    {/* =========================================
                        PAYMENT METHOD
                    ========================================= */}

                    <div className="
                        border
                        border-gray-200
                        rounded-2xl
                        p-6
                        sm:p-8
                    ">

                        {/* Header */}

                        <div className="
                            flex
                            items-start
                            gap-4
                            mb-7
                        ">

                            <div className="
                                w-11
                                h-11
                                rounded-xl
                                bg-[#f5f5f2]
                                flex
                                items-center
                                justify-center
                                flex-shrink-0
                            ">

                                <CreditCard
                                    size={20}
                                    strokeWidth={1.6}
                                />

                            </div>

                            <div>

                                <p className="
                                    text-[10px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-gray-400
                                ">
                                    Step 02
                                </p>

                                <h2 className="
                                    text-xl
                                    font-medium
                                    mt-1
                                ">
                                    Payment Method
                                </h2>

                                <p className="
                                    text-xs
                                    text-gray-500
                                    mt-1
                                ">
                                    Choose how you'd like to pay.
                                </p>

                            </div>

                        </div>


                        {/* =========================================
                            COD
                        ========================================= */}

                        <button
                            type="button"
                            onClick={() => setMethod('cod')}
                            className={`
                                w-full
                                text-left
                                flex
                                items-center
                                gap-4
                                p-4
                                rounded-xl
                                border
                                transition-all
                                ${
                                    method === 'cod'
                                        ? 'border-black bg-[#fafaf8]'
                                        : 'border-gray-200 hover:border-gray-400'
                                }
                            `}
                        >

                            <div className={`
                                w-11
                                h-11
                                rounded-lg
                                flex
                                items-center
                                justify-center
                                ${
                                    method === 'cod'
                                        ? 'bg-black text-white'
                                        : 'bg-[#f5f5f2] text-gray-600'
                                }
                            `}>

                                <Banknote
                                    size={20}
                                    strokeWidth={1.6}
                                />

                            </div>


                            <div className="flex-1">

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-gray-900
                                ">
                                    Cash on Delivery
                                </p>

                                <p className="
                                    text-xs
                                    text-gray-500
                                    mt-1
                                ">
                                    Pay when your order arrives.
                                </p>

                            </div>


                            <div className={`
                                w-5
                                h-5
                                rounded-full
                                border
                                flex
                                items-center
                                justify-center
                                ${
                                    method === 'cod'
                                        ? 'border-black'
                                        : 'border-gray-300'
                                }
                            `}>

                                {method === 'cod' && (
                                    <span className="
                                        w-2.5
                                        h-2.5
                                        rounded-full
                                        bg-black
                                    " />
                                )}

                            </div>

                        </button>


                        {/* Payment Security */}

                        <div className="
                            flex
                            items-center
                            gap-2
                            mt-5
                            text-xs
                            text-gray-400
                        ">

                            <ShieldCheck size={14} />

                            Your payment information is securely processed.

                        </div>

                    </div>

                </div>


                {/* =========================================
                    RIGHT SIDE
                ========================================= */}

                <div className="
                    lg:sticky
                    lg:top-6
                    space-y-4
                ">


                    {/* =========================================
                        ORDER SUMMARY
                    ========================================= */}

                    <div className="
                        bg-[#f5f5f2]
                        rounded-2xl
                        p-6
                        sm:p-7
                    ">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-gray-400
                        ">
                            Your Order
                        </p>

                        <h2 className="
                            text-xl
                            font-medium
                            mt-2
                            mb-6
                        ">
                            Order Summary
                        </h2>


                        <CartTotal />


                        {/* Checkout Button */}

                        <button
                            type="submit"
                            disabled={placingOrder}
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
                                disabled:bg-gray-400
                                disabled:cursor-not-allowed
                            "
                        >

                            {placingOrder ? (

                                <>
                                    <div className="
                                        w-4
                                        h-4
                                        border-2
                                        border-white/40
                                        border-t-white
                                        rounded-full
                                        animate-spin
                                    " />

                                    Processing...

                                </>

                            ) : (

                                <>
                                    {method === 'online'
                                        ? 'Continue to Payment'
                                        : 'Place Order'
                                    }

                                    <ArrowRight size={17} />

                                </>

                            )}

                        </button>

                    </div>


                    {/* =========================================
                        DELIVERY INFO
                    ========================================= */}

                    <div className="
                        border
                        border-gray-200
                        rounded-2xl
                        p-5
                    ">

                        <div className="
                            flex
                            items-center
                            gap-3
                        ">

                            <div className="
                                w-9
                                h-9
                                rounded-lg
                                bg-[#f5f5f2]
                                flex
                                items-center
                                justify-center
                            ">

                                <Truck
                                    size={17}
                                    strokeWidth={1.6}
                                />

                            </div>

                            <div>

                                <p className="
                                    text-xs
                                    font-semibold
                                ">
                                    Reliable Delivery
                                </p>

                                <p className="
                                    text-[11px]
                                    text-gray-400
                                    mt-1
                                ">
                                    Your order will be carefully packed
                                    and delivered to your address.
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* =========================================
                        TRUST FEATURES
                    ========================================= */}

                    <div className="
                        grid
                        grid-cols-3
                        gap-2
                    ">

                        <div className="
                            border
                            border-gray-200
                            rounded-xl
                            p-3
                            text-center
                        ">

                            <ShieldCheck
                                size={16}
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

                        </div>


                        <div className="
                            border
                            border-gray-200
                            rounded-xl
                            p-3
                            text-center
                        ">

                            <Truck
                                size={16}
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

                        </div>


                        <div className="
                            border
                            border-gray-200
                            rounded-xl
                            p-3
                            text-center
                        ">

                            <CheckCircle2
                                size={16}
                                className="mx-auto"
                                strokeWidth={1.5}
                            />

                            <p className="
                                text-[10px]
                                font-medium
                                mt-2
                            ">
                                Reliable
                            </p>

                        </div>

                    </div>


                    {/* Back to Cart */}

                    <button
                        type="button"
                        onClick={() => navigate('/cart')}
                        className="
                            w-full
                            text-sm
                            text-gray-500
                            hover:text-black
                            py-3
                            transition
                        "
                    >
                        ← Back to Cart
                    </button>

                </div>

            </div>

        </form>

    )
}

export default PlaceOrder
