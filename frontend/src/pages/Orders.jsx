import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import {
    Package,
    CalendarDays,
    CreditCard,
    Truck,
    RefreshCw,
    ChevronRight,
    ShoppingBag,
    ShieldCheck,
    MapPin
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Orders = () => {

    const { backendUrl, token, currency } = useContext(ShopContext)

    const [orderData, setOrderData] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const loadOrderData = async (isRefresh = false) => {
        try {

            if (!token) {
                setLoading(false)
                return
            }

            if (isRefresh) {
                setRefreshing(true)
            } else {
                setLoading(true)
            }

            const response = await axios.post(
                backendUrl + '/api/order/userorders',
                {},
                {
                    headers: { token }
                }
            )

            if (response.data.success) {

                let allOrdersItem = []

                response.data.orders.forEach((order) => {

                    order.items.forEach((item) => {

                        allOrdersItem.push({
                            ...item,
                            status: order.status,
                            payment: order.payment,
                            paymentMethod: order.paymentMethod,
                            date: order.date
                        })

                    })

                })

                setOrderData(allOrdersItem.reverse())
            }

        } catch (error) {

            console.log(error)

        } finally {

            setLoading(false)
            setRefreshing(false)

        }
    }

    useEffect(() => {
        loadOrderData()
    }, [token])

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }

    const getStatusStyle = (status) => {

        const currentStatus = status?.toLowerCase()

        if (
            currentStatus === 'delivered' ||
            currentStatus === 'completed'
        ) {
            return {
                dot: 'bg-emerald-500',
                badge: 'bg-emerald-50 text-emerald-700 border-emerald-100'
            }
        }

        if (
            currentStatus === 'cancelled' ||
            currentStatus === 'cancel'
        ) {
            return {
                dot: 'bg-red-500',
                badge: 'bg-red-50 text-red-700 border-red-100'
            }
        }

        if (
            currentStatus === 'shipped' ||
            currentStatus === 'out for delivery'
        ) {
            return {
                dot: 'bg-blue-500',
                badge: 'bg-blue-50 text-blue-700 border-blue-100'
            }
        }

        return {
            dot: 'bg-amber-500',
            badge: 'bg-amber-50 text-amber-700 border-amber-100'
        }
    }

    if (!token) {
        return null
    }

    return (
        <div className="border-t border-gray-100">

            {/* =========================================================
                PAGE HEADER
            ========================================================= */}

            <section className="bg-[#f6f6f3]">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">

                        <div>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-7 h-px bg-black"></span>

                                <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-gray-500">
                                    EASYBUY / ACCOUNT
                                </p>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-gray-900">
                                My <span className="font-serif italic">Orders.</span>
                            </h1>

                            <p className="mt-4 max-w-xl text-sm sm:text-base text-gray-500 leading-7">
                                Keep track of your purchases, payment details and
                                delivery status all in one place.
                            </p>

                        </div>

                        <div className="flex items-center gap-3">

                            <div className="bg-white border border-gray-200 rounded-2xl px-5 py-4">

                                <p className="text-xs uppercase tracking-wider text-gray-400">
                                    Total Items
                                </p>

                                <p className="text-2xl font-semibold text-gray-900 mt-1">
                                    {orderData.length}
                                </p>

                            </div>

                            <button
                                onClick={() => loadOrderData(true)}
                                disabled={refreshing}
                                className="group flex items-center gap-2 bg-black text-white px-5 py-4 rounded-2xl text-sm font-medium hover:bg-gray-800 transition-all disabled:opacity-60"
                            >
                                <RefreshCw
                                    size={16}
                                    className={refreshing ? 'animate-spin' : ''}
                                />

                                Refresh
                            </button>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================================================
                ORDERS CONTENT
            ========================================================= */}

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

                {/* Loading */}

                {loading && (

                    <div className="space-y-5">

                        {[1, 2, 3].map((item) => (

                            <div
                                key={item}
                                className="border border-gray-200 rounded-3xl p-5 sm:p-6 animate-pulse"
                            >

                                <div className="flex gap-5">

                                    <div className="w-24 h-28 sm:w-28 sm:h-36 bg-gray-100 rounded-2xl"></div>

                                    <div className="flex-1 space-y-4">

                                        <div className="h-5 bg-gray-100 rounded w-2/3"></div>

                                        <div className="h-4 bg-gray-100 rounded w-1/3"></div>

                                        <div className="h-4 bg-gray-100 rounded w-1/2"></div>

                                        <div className="h-8 bg-gray-100 rounded w-32"></div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}


                {/* Empty Orders */}

                {!loading && orderData.length === 0 && (

                    <div className="border border-gray-200 rounded-3xl p-10 sm:p-16 text-center">

                        <div className="w-20 h-20 rounded-full bg-[#f6f6f3] flex items-center justify-center mx-auto">

                            <ShoppingBag
                                size={30}
                                strokeWidth={1.5}
                                className="text-gray-600"
                            />

                        </div>

                        <h2 className="text-2xl sm:text-3xl font-light text-gray-900 mt-6">
                            No orders yet
                        </h2>

                        <p className="text-sm text-gray-500 mt-3 max-w-md mx-auto leading-6">
                            You haven't placed any orders yet. Explore our latest
                            collections and find something you'll love.
                        </p>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 mt-7 bg-black text-white px-6 py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all"
                        >
                            Start Shopping
                            <ChevronRight size={16} />
                        </Link>

                    </div>

                )}


                {/* Orders */}

                {!loading && orderData.length > 0 && (

                    <div className="space-y-5">

                        {orderData.map((item, index) => {

                            const statusStyle = getStatusStyle(item.status)

                            return (

                                <div
                                    key={index}
                                    className="group border border-gray-200 rounded-3xl overflow-hidden bg-white hover:border-gray-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-300"
                                >

                                    {/* Order Top Bar */}

                                    <div className="px-5 sm:px-7 py-4 border-b border-gray-100 bg-gray-50/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                                        <div className="flex items-center gap-3">

                                            <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                                                <Package
                                                    size={17}
                                                    className="text-gray-600"
                                                    strokeWidth={1.8}
                                                />
                                            </div>

                                            <div>

                                                <p className="text-xs uppercase tracking-wider text-gray-400">
                                                    Order Item
                                                </p>

                                                <p className="text-sm font-medium text-gray-900">
                                                    #{String(index + 1).padStart(3, '0')}
                                                </p>

                                            </div>

                                        </div>


                                        <div
                                            className={`inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full border text-xs font-medium ${statusStyle.badge}`}
                                        >

                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                                            ></span>

                                            {item.status || 'Processing'}

                                        </div>

                                    </div>


                                    {/* Order Main */}

                                    <div className="p-5 sm:p-7">

                                        <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">


                                            {/* Product */}

                                            <div className="flex items-start gap-5 flex-1 min-w-0">

                                                <div className="w-24 h-28 sm:w-28 sm:h-36 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">

                                                    <img
                                                        src={item.image?.[0]}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />

                                                </div>


                                                <div className="min-w-0 pt-1">

                                                    <h3 className="text-base sm:text-lg font-medium text-gray-900 line-clamp-2">
                                                        {item.name}
                                                    </h3>


                                                    <p className="text-lg font-semibold text-gray-900 mt-3">
                                                        {currency}{item.price}
                                                    </p>


                                                    <div className="flex flex-wrap items-center gap-2 mt-4">

                                                        <span className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                                                            Size: {item.size || 'N/A'}
                                                        </span>

                                                        <span className="px-3 py-1.5 rounded-full bg-gray-100 text-xs font-medium text-gray-600">
                                                            Qty: {item.quantity}
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>


                                            {/* Order Details */}

                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col gap-4 lg:min-w-[230px] border-t lg:border-t-0 lg:border-l border-gray-100 pt-5 lg:pt-0 lg:pl-7">

                                                <div className="flex items-start gap-3">

                                                    <CalendarDays
                                                        size={17}
                                                        className="text-gray-400 mt-0.5"
                                                        strokeWidth={1.7}
                                                    />

                                                    <div>

                                                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                                            Ordered
                                                        </p>

                                                        <p className="text-sm text-gray-700 mt-1">
                                                            {formatDate(item.date)}
                                                        </p>

                                                    </div>

                                                </div>


                                                <div className="flex items-start gap-3">

                                                    <CreditCard
                                                        size={17}
                                                        className="text-gray-400 mt-0.5"
                                                        strokeWidth={1.7}
                                                    />

                                                    <div>

                                                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                                            Payment
                                                        </p>

                                                        <p className="text-sm text-gray-700 mt-1 capitalize">
                                                            {item.paymentMethod || 'N/A'}
                                                        </p>

                                                    </div>

                                                </div>


                                                <div className="flex items-start gap-3">

                                                    <Truck
                                                        size={17}
                                                        className="text-gray-400 mt-0.5"
                                                        strokeWidth={1.7}
                                                    />

                                                    <div>

                                                        <p className="text-[10px] uppercase tracking-wider text-gray-400">
                                                            Delivery
                                                        </p>

                                                        <p className="text-sm text-gray-700 mt-1">
                                                            {item.status || 'Processing'}
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>


                                            {/* Track Button */}

                                            <div className="lg:self-center">

                                                <button
                                                    onClick={() => loadOrderData(true)}
                                                    className="w-full lg:w-auto inline-flex items-center justify-center gap-2 border border-gray-200 bg-white px-5 py-3 rounded-full text-sm font-medium text-gray-800 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                                                >

                                                    <MapPin size={16} />

                                                    Track Order

                                                    <ChevronRight size={15} />

                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )

                        })}

                    </div>

                )}


                {/* =====================================================
                    TRUST BAR
                ===================================================== */}

                {!loading && orderData.length > 0 && (

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3">

                        <div className="flex items-center gap-4 border border-gray-200 rounded-2xl px-5 py-4">

                            <div className="w-10 h-10 rounded-full bg-[#f6f6f3] flex items-center justify-center">
                                <ShieldCheck
                                    size={19}
                                    className="text-gray-700"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    Secure Orders
                                </p>

                                <p className="text-xs text-gray-400 mt-0.5">
                                    Your order information is protected
                                </p>
                            </div>

                        </div>


                        <div className="flex items-center gap-4 border border-gray-200 rounded-2xl px-5 py-4">

                            <div className="w-10 h-10 rounded-full bg-[#f6f6f3] flex items-center justify-center">
                                <Truck
                                    size={19}
                                    className="text-gray-700"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    Order Tracking
                                </p>

                                <p className="text-xs text-gray-400 mt-0.5">
                                    Stay updated on your delivery
                                </p>
                            </div>

                        </div>


                        <div className="flex items-center gap-4 border border-gray-200 rounded-2xl px-5 py-4">

                            <div className="w-10 h-10 rounded-full bg-[#f6f6f3] flex items-center justify-center">
                                <ShoppingBag
                                    size={19}
                                    className="text-gray-700"
                                />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    EASYBUY Collection
                                </p>

                                <p className="text-xs text-gray-400 mt-0.5">
                                    Discover more styles
                                </p>
                            </div>

                        </div>

                    </div>

                )}

            </section>

        </div>
    )
}

export default Orders
