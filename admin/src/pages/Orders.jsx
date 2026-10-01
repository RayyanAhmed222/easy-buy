import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import {
    Package,
    RefreshCw,
    Trash2,
    MapPin,
    Phone,
    CreditCard,
    Clock3,
    CheckCircle2,
    Truck,
    Box,
    ChevronDown,
    ShoppingBag,
    UserRound,
    CalendarDays,
    Hash,
    XCircle,
    Search
} from 'lucide-react'

import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets.js'

const Orders = ({ token }) => {

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [deletingId, setDeletingId] = useState(null)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')

    // =========================================
    // FETCH ALL ORDERS
    // =========================================
    const fetchAllOrders = async (isRefresh = false) => {

        if (!token) {
            setLoading(false)
            return
        }

        try {

            if (isRefresh) {
                setRefreshing(true)
            } else {
                setLoading(true)
            }

            const response = await axios.post(
                backendUrl + '/api/order/list',
                {},
                {
                    headers: {
                        token
                    }
                }
            )

            if (response.data.success) {

                setOrders(
                    [...(response.data.orders || [])].reverse()
                )

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message ||
                'Failed to load orders'
            )

        } finally {

            setLoading(false)
            setRefreshing(false)

        }
    }

    // =========================================
    // UPDATE ORDER STATUS
    // =========================================
    const statusHandler = async (event, orderId) => {

        const newStatus = event.target.value

        try {

            const response = await axios.post(
                backendUrl + '/api/order/status',
                {
                    orderId,
                    status: newStatus
                },
                {
                    headers: {
                        token
                    }
                }
            )

            if (response.data.success) {

                toast.success('Order status updated')

                setOrders(prev =>
                    prev.map(order =>
                        order._id === orderId
                            ? { ...order, status: newStatus }
                            : order
                    )
                )

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message ||
                'Failed to update order status'
            )

        }
    }

    // =========================================
    // UPDATE PAYMENT STATUS
    // =========================================
    const paymentStatusHandler = async (event, orderId) => {

        const paymentStatus = event.target.value === 'Done'

        try {

            const response = await axios.post(
                backendUrl + '/api/order/payment-status',
                {
                    orderId,
                    payment: paymentStatus
                },
                {
                    headers: {
                        token
                    }
                }
            )

            if (response.data.success) {

                toast.success('Payment status updated')

                setOrders(prev =>
                    prev.map(order =>
                        order._id === orderId
                            ? { ...order, payment: paymentStatus }
                            : order
                    )
                )

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message ||
                'Failed to update payment status'
            )

        }
    }

    // =========================================
    // DELETE ORDER
    // =========================================
    const deleteOrderHandler = async (orderId) => {

        const confirmed = window.confirm(
            'Are you sure you want to delete this order? This action cannot be undone.'
        )

        if (!confirmed) {
            return
        }

        try {

            setDeletingId(orderId)

            const response = await axios.post(
                backendUrl + '/api/order/delete',
                {
                    orderId
                },
                {
                    headers: {
                        token
                    }
                }
            )

            if (response.data.success) {

                toast.success('Order deleted successfully')

                setOrders(prev =>
                    prev.filter(order => order._id !== orderId)
                )

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {

            console.log(error)

            toast.error(
                error.response?.data?.message ||
                error.message ||
                'Failed to delete order'
            )

        } finally {

            setDeletingId(null)

        }
    }

    // =========================================
    // FETCH ON LOAD
    // =========================================
    useEffect(() => {
        fetchAllOrders()
    }, [token])

    // =========================================
    // ORDER COUNTS
    // =========================================
    const orderStats = useMemo(() => {

        const total = orders.length

        const delivered = orders.filter(
            order => order.status === 'Delivered'
        ).length

        const pending = orders.filter(
            order =>
                order.status === 'Order Placed' ||
                order.status === 'Packing'
        ).length

        const shipped = orders.filter(
            order =>
                order.status === 'Shipped' ||
                order.status === 'Out for delivery'
        ).length

        return {
            total,
            delivered,
            pending,
            shipped
        }

    }, [orders])

    // =========================================
    // FILTER ORDERS
    // =========================================
    const filteredOrders = useMemo(() => {

        const query = search.trim().toLowerCase()

        return orders.filter(order => {

            const customerName = [
                order.address?.firstName,
                order.address?.lastName
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()

            const orderId = order._id?.toLowerCase() || ''

            const phone =
                order.address?.phone?.toString().toLowerCase() || ''

            const matchesSearch =
                !query ||
                customerName.includes(query) ||
                orderId.includes(query) ||
                phone.includes(query)

            const matchesStatus =
                statusFilter === 'All' ||
                order.status === statusFilter

            return matchesSearch && matchesStatus

        })

    }, [orders, search, statusFilter])

    // =========================================
    // PRICE FORMAT
    // =========================================
    const formatPrice = (amount) => {
        return Number(amount || 0).toLocaleString('en-PK', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })
    }

    // =========================================
    // DATE FORMAT
    // =========================================
    const formatDate = (date) => {

        if (!date) {
            return '-'
        }

        return new Date(date).toLocaleDateString('en-PK', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        })
    }

    // =========================================
    // STATUS STYLE
    // =========================================
    const getStatusStyle = (status) => {

        switch (status) {

            case 'Delivered':
                return {
                    bg: 'bg-emerald-50',
                    text: 'text-emerald-700',
                    border: 'border-emerald-100',
                    icon: CheckCircle2
                }

            case 'Shipped':
                return {
                    bg: 'bg-blue-50',
                    text: 'text-blue-700',
                    border: 'border-blue-100',
                    icon: Truck
                }

            case 'Out for delivery':
                return {
                    bg: 'bg-violet-50',
                    text: 'text-violet-700',
                    border: 'border-violet-100',
                    icon: Truck
                }

            case 'Packing':
                return {
                    bg: 'bg-amber-50',
                    text: 'text-amber-700',
                    border: 'border-amber-100',
                    icon: Box
                }

            default:
                return {
                    bg: 'bg-neutral-100',
                    text: 'text-neutral-700',
                    border: 'border-neutral-200',
                    icon: Clock3
                }

        }
    }

    // =========================================
    // PAYMENT STYLE
    // =========================================
    const getPaymentStyle = (payment) => {

        return payment
            ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
            : 'bg-orange-50 text-orange-700 border-orange-100'

    }

    return (

        <div className="min-h-screen bg-[#f7f7f5] px-4 py-5 sm:px-6 lg:px-8">

            {/* =========================================
                PAGE HEADER
            ========================================= */}
            <div className="mb-6">

                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                    <div>

                        <div className="mb-2 flex items-center gap-2">

                            <div className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-lg
                                bg-black
                                text-white
                            ">
                                <ShoppingBag size={16} />
                            </div>

                            <span className="
                                text-xs
                                font-semibold
                                uppercase
                                tracking-[0.18em]
                                text-neutral-500
                            ">
                                EASYBUY / ADMIN
                            </span>

                        </div>

                        <h1 className="
                            text-2xl
                            font-semibold
                            tracking-tight
                            text-neutral-950
                            sm:text-3xl
                        ">
                            Order Management
                        </h1>

                        <p className="mt-1 text-sm text-neutral-500">
                            Monitor orders, update delivery progress and manage payments.
                        </p>

                    </div>


                    {/* Refresh */}
                    <button
                        type="button"
                        onClick={() => fetchAllOrders(true)}
                        disabled={refreshing}
                        className="
                            flex
                            h-11
                            w-fit
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-neutral-200
                            bg-white
                            px-4
                            text-sm
                            font-medium
                            text-neutral-700
                            shadow-sm
                            hover:border-neutral-300
                            hover:bg-neutral-50
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                    >

                        <RefreshCw
                            size={16}
                            className={refreshing ? 'animate-spin' : ''}
                        />

                        Refresh Orders

                    </button>

                </div>

            </div>


            {/* =========================================
                STAT CARDS
            ========================================= */}
            <div className="
                mb-6
                grid
                grid-cols-2
                gap-3
                lg:grid-cols-4
            ">

                {/* Total */}
                <div className="
                    rounded-2xl
                    border
                    border-neutral-200
                    bg-white
                    p-4
                    shadow-sm
                ">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-neutral-400
                            ">
                                Total Orders
                            </p>

                            <p className="
                                mt-2
                                text-2xl
                                font-semibold
                                text-neutral-950
                            ">
                                {orderStats.total}
                            </p>
                        </div>

                        <div className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-neutral-100
                            text-neutral-700
                        ">
                            <ShoppingBag size={17} />
                        </div>

                    </div>

                </div>


                {/* Pending */}
                <div className="
                    rounded-2xl
                    border
                    border-neutral-200
                    bg-white
                    p-4
                    shadow-sm
                ">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-neutral-400
                            ">
                                Processing
                            </p>

                            <p className="
                                mt-2
                                text-2xl
                                font-semibold
                                text-amber-600
                            ">
                                {orderStats.pending}
                            </p>
                        </div>

                        <div className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-amber-50
                            text-amber-600
                        ">
                            <Clock3 size={17} />
                        </div>

                    </div>

                </div>


                {/* Shipped */}
                <div className="
                    rounded-2xl
                    border
                    border-neutral-200
                    bg-white
                    p-4
                    shadow-sm
                ">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-neutral-400
                            ">
                                In Transit
                            </p>

                            <p className="
                                mt-2
                                text-2xl
                                font-semibold
                                text-blue-600
                            ">
                                {orderStats.shipped}
                            </p>
                        </div>

                        <div className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-blue-50
                            text-blue-600
                        ">
                            <Truck size={17} />
                        </div>

                    </div>

                </div>


                {/* Delivered */}
                <div className="
                    rounded-2xl
                    border
                    border-neutral-200
                    bg-white
                    p-4
                    shadow-sm
                ">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-neutral-400
                            ">
                                Delivered
                            </p>

                            <p className="
                                mt-2
                                text-2xl
                                font-semibold
                                text-emerald-600
                            ">
                                {orderStats.delivered}
                            </p>
                        </div>

                        <div className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-xl
                            bg-emerald-50
                            text-emerald-600
                        ">
                            <CheckCircle2 size={17} />
                        </div>

                    </div>

                </div>

            </div>


            {/* =========================================
                SEARCH + FILTER
            ========================================= */}
            <div className="
                mb-5
                rounded-2xl
                border
                border-neutral-200
                bg-white
                p-3
                shadow-sm
            ">

                <div className="flex flex-col gap-3 lg:flex-row">

                    {/* Search */}
                    <div className="relative flex-1">

                        <Search
                            size={18}
                            className="
                                pointer-events-none
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                text-neutral-400
                            "
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by customer, order ID or phone..."
                            className="
                                h-11
                                w-full
                                rounded-xl
                                border
                                border-neutral-200
                                bg-neutral-50
                                pl-11
                                pr-10
                                text-sm
                                text-neutral-900
                                outline-none
                                placeholder:text-neutral-400
                                focus:border-black
                                focus:bg-white
                            "
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch('')}
                                className="
                                    absolute
                                    right-3
                                    top-1/2
                                    flex
                                    h-7
                                    w-7
                                    -translate-y-1/2
                                    items-center
                                    justify-center
                                    rounded-full
                                    text-neutral-400
                                    hover:bg-neutral-100
                                    hover:text-neutral-900
                                "
                            >
                                <XCircle size={16} />
                            </button>
                        )}

                    </div>


                    {/* Status Filter */}
                    <div className="relative lg:w-56">

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="
                                h-11
                                w-full
                                appearance-none
                                rounded-xl
                                border
                                border-neutral-200
                                bg-neutral-50
                                px-4
                                pr-10
                                text-sm
                                font-medium
                                text-neutral-800
                                outline-none
                                focus:border-black
                                focus:bg-white
                            "
                        >

                            <option value="All">
                                All Order Status
                            </option>

                            <option value="Order Placed">
                                Order Placed
                            </option>

                            <option value="Packing">
                                Packing
                            </option>

                            <option value="Shipped">
                                Shipped
                            </option>

                            <option value="Out for delivery">
                                Out for delivery
                            </option>

                            <option value="Delivered">
                                Delivered
                            </option>

                        </select>

                        <ChevronDown
                            size={16}
                            className="
                                pointer-events-none
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                text-neutral-400
                            "
                        />

                    </div>

                </div>

            </div>


            {/* =========================================
                RESULT COUNT
            ========================================= */}
            {!loading && (
                <div className="mb-4 flex items-center justify-between">

                    <p className="text-sm text-neutral-500">

                        Showing{' '}

                        <span className="font-semibold text-neutral-900">
                            {filteredOrders.length}
                        </span>

                        {' '}of{' '}

                        <span className="font-semibold text-neutral-900">
                            {orders.length}
                        </span>

                        {' '}orders

                    </p>

                </div>
            )}


            {/* =========================================
                LOADING
            ========================================= */}
            {loading ? (

                <div className="
                    rounded-2xl
                    border
                    border-neutral-200
                    bg-white
                    p-16
                    shadow-sm
                ">

                    <div className="flex flex-col items-center text-center">

                        <div className="
                            mb-4
                            h-10
                            w-10
                            animate-spin
                            rounded-full
                            border-2
                            border-neutral-200
                            border-t-black
                        " />

                        <p className="text-sm font-semibold text-neutral-900">
                            Loading orders
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">
                            Fetching the latest order information.
                        </p>

                    </div>

                </div>

            ) : filteredOrders.length === 0 ? (

                /* =========================================
                    EMPTY STATE
                ========================================= */
                <div className="
                    rounded-2xl
                    border
                    border-dashed
                    border-neutral-300
                    bg-white
                    px-6
                    py-16
                    text-center
                    shadow-sm
                ">

                    <div className="
                        mx-auto
                        mb-4
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-neutral-100
                        text-neutral-500
                    ">
                        <ShoppingBag size={25} />
                    </div>

                    <h3 className="
                        text-lg
                        font-semibold
                        text-neutral-900
                    ">
                        No orders found
                    </h3>

                    <p className="
                        mx-auto
                        mt-2
                        max-w-md
                        text-sm
                        text-neutral-500
                    ">
                        {search || statusFilter !== 'All'
                            ? 'Try changing your search or status filter.'
                            : 'There are currently no orders in your store.'
                        }
                    </p>

                </div>

            ) : (

                <div className="flex flex-col gap-5">

                    {filteredOrders.map((order, index) => {

                        const statusStyle =
                            getStatusStyle(order.status)

                        const StatusIcon =
                            statusStyle.icon

                        const customerName = [
                            order.address?.firstName,
                            order.address?.lastName
                        ]
                            .filter(Boolean)
                            .join(' ')

                        return (

                            <div
                                key={order._id || index}
                                className="
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-neutral-200
                                    bg-white
                                    shadow-sm
                                "
                            >

                                {/* =========================================
                                    ORDER HEADER
                                ========================================= */}
                                <div className="
                                    flex
                                    flex-col
                                    gap-4
                                    border-b
                                    border-neutral-100
                                    p-4
                                    sm:p-5
                                    lg:flex-row
                                    lg:items-center
                                    lg:justify-between
                                ">

                                    <div className="flex items-start gap-3">

                                        <div className="
                                            flex
                                            h-11
                                            w-11
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-black
                                            text-white
                                        ">
                                            <Package size={19} />
                                        </div>

                                        <div className="min-w-0">

                                            <div className="
                                                flex
                                                flex-wrap
                                                items-center
                                                gap-2
                                            ">

                                                <p className="
                                                    text-sm
                                                    font-semibold
                                                    text-neutral-950
                                                ">
                                                    Order #{order._id?.slice(-8)}
                                                </p>

                                                <span className="
                                                    rounded-full
                                                    border
                                                    border-neutral-200
                                                    bg-neutral-50
                                                    px-2
                                                    py-0.5
                                                    text-[10px]
                                                    font-medium
                                                    text-neutral-500
                                                ">
                                                    #{index + 1}
                                                </span>

                                            </div>

                                            <div className="
                                                mt-1
                                                flex
                                                flex-wrap
                                                items-center
                                                gap-3
                                                text-xs
                                                text-neutral-500
                                            ">

                                                <span className="flex items-center gap-1">
                                                    <CalendarDays size={12} />
                                                    {formatDate(order.date)}
                                                </span>

                                                <span className="flex items-center gap-1">
                                                    <UserRound size={12} />
                                                    {customerName || 'Customer'}
                                                </span>

                                            </div>

                                        </div>

                                    </div>


                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                        sm:justify-end
                                    ">

                                        <div className="text-left sm:text-right">

                                            <p className="
                                                text-[10px]
                                                font-semibold
                                                uppercase
                                                tracking-wider
                                                text-neutral-400
                                            ">
                                                Order Total
                                            </p>

                                            <p className="
                                                mt-0.5
                                                text-lg
                                                font-semibold
                                                text-neutral-950
                                            ">
                                                {currency}
                                                {formatPrice(order.amount)}
                                            </p>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                deleteOrderHandler(order._id)
                                            }
                                            disabled={
                                                deletingId === order._id
                                            }
                                            title="Delete order"
                                            className="
                                                flex
                                                h-10
                                                w-10
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                border
                                                border-red-100
                                                bg-red-50
                                                text-red-500
                                                hover:border-red-500
                                                hover:bg-red-500
                                                hover:text-white
                                                disabled:cursor-not-allowed
                                                disabled:opacity-50
                                            "
                                        >

                                            {deletingId === order._id ? (
                                                <span className="
                                                    h-4
                                                    w-4
                                                    animate-spin
                                                    rounded-full
                                                    border-2
                                                    border-red-200
                                                    border-t-red-500
                                                " />
                                            ) : (
                                                <Trash2 size={16} />
                                            )}

                                        </button>

                                    </div>

                                </div>


                                {/* =========================================
                                    STATUS STRIP
                                ========================================= */}
                                <div className="
                                    flex
                                    flex-col
                                    gap-3
                                    border-b
                                    border-neutral-100
                                    bg-neutral-50/60
                                    px-4
                                    py-3
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                    sm:px-5
                                ">

                                    <div className="flex flex-wrap items-center gap-2">

                                        <span className="
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-wider
                                            text-neutral-400
                                        ">
                                            Current Status
                                        </span>

                                        <span className={`
                                            inline-flex
                                            items-center
                                            gap-1.5
                                            rounded-full
                                            border
                                            px-2.5
                                            py-1
                                            text-[10px]
                                            font-semibold
                                            ${statusStyle.bg}
                                            ${statusStyle.text}
                                            ${statusStyle.border}
                                        `}>

                                            <StatusIcon size={12} />

                                            {order.status || 'Order Placed'}

                                        </span>

                                        <span className={`
                                            rounded-full
                                            border
                                            px-2.5
                                            py-1
                                            text-[10px]
                                            font-semibold
                                            ${getPaymentStyle(order.payment)}
                                        `}>

                                            Payment:
                                            {' '}
                                            {order.payment
                                                ? 'Done'
                                                : 'Pending'
                                            }

                                        </span>

                                    </div>


                                    <div className="
                                        flex
                                        items-center
                                        gap-2
                                        text-xs
                                        text-neutral-500
                                    ">

                                        <CreditCard size={14} />

                                        {order.paymentMethod || 'Payment'}

                                    </div>

                                </div>


                                {/* =========================================
                                    ORDER BODY
                                ========================================= */}
                                <div className="
                                    grid
                                    gap-6
                                    p-4
                                    sm:p-5
                                    lg:grid-cols-[1.5fr_1fr_220px]
                                ">

                                    {/* PRODUCTS */}
                                    <div>

                                        <div className="
                                            mb-3
                                            flex
                                            items-center
                                            justify-between
                                        ">

                                            <div className="flex items-center gap-2">

                                                <ShoppingBag
                                                    size={16}
                                                    className="text-neutral-500"
                                                />

                                                <h3 className="
                                                    text-sm
                                                    font-semibold
                                                    text-neutral-900
                                                ">
                                                    Products
                                                </h3>

                                            </div>

                                            <span className="
                                                rounded-full
                                                bg-neutral-100
                                                px-2.5
                                                py-1
                                                text-[10px]
                                                font-semibold
                                                text-neutral-600
                                            ">
                                                {order.items?.length || 0}
                                                {' '}
                                                {(order.items?.length || 0) === 1
                                                    ? 'Item'
                                                    : 'Items'
                                                }
                                            </span>

                                        </div>


                                        <div className="
                                            divide-y
                                            divide-neutral-100
                                            rounded-xl
                                            border
                                            border-neutral-100
                                        ">

                                            {order.items?.map(
                                                (item, itemIndex) => (

                                                    <div
                                                        key={itemIndex}
                                                        className="
                                                            flex
                                                            items-center
                                                            gap-3
                                                            p-3
                                                        "
                                                    >

                                                        <div className="
                                                            flex
                                                            h-10
                                                            w-10
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            bg-neutral-100
                                                        ">
                                                            <ShoppingBag
                                                                size={15}
                                                                className="text-neutral-500"
                                                            />
                                                        </div>

                                                        <div className="min-w-0 flex-1">

                                                            <p className="
                                                                truncate
                                                                text-xs
                                                                font-semibold
                                                                text-neutral-900
                                                            ">
                                                                {item.name}
                                                            </p>

                                                            <div className="
                                                                mt-1
                                                                flex
                                                                flex-wrap
                                                                gap-x-3
                                                                gap-y-1
                                                                text-[10px]
                                                                text-neutral-500
                                                            ">

                                                                <span>
                                                                    Qty: {item.quantity}
                                                                </span>

                                                                {item.size && (
                                                                    <span>
                                                                        Size: {item.size}
                                                                    </span>
                                                                )}

                                                            </div>

                                                        </div>

                                                    </div>

                                                )
                                            )}

                                        </div>

                                    </div>


                                    {/* CUSTOMER */}
                                    <div>

                                        <div className="
                                            mb-3
                                            flex
                                            items-center
                                            gap-2
                                        ">

                                            <UserRound
                                                size={16}
                                                className="text-neutral-500"
                                            />

                                            <h3 className="
                                                text-sm
                                                font-semibold
                                                text-neutral-900
                                            ">
                                                Customer
                                            </h3>

                                        </div>


                                        <div className="
                                            rounded-xl
                                            border
                                            border-neutral-100
                                            bg-neutral-50/60
                                            p-4
                                        ">

                                            <p className="
                                                text-sm
                                                font-semibold
                                                text-neutral-900
                                            ">
                                                {customerName || '-'}
                                            </p>


                                            <div className="
                                                mt-3
                                                space-y-2
                                                text-xs
                                                text-neutral-600
                                            ">

                                                <div className="
                                                    flex
                                                    items-start
                                                    gap-2
                                                ">
                                                    <MapPin
                                                        size={14}
                                                        className="
                                                            mt-0.5
                                                            shrink-0
                                                            text-neutral-400
                                                        "
                                                    />

                                                    <p>
                                                        {order.address?.street || '-'}
                                                        <br />
                                                        {order.address?.city || '-'}
                                                        {order.address?.state
                                                            ? `, ${order.address.state}`
                                                            : ''
                                                        }
                                                        <br />
                                                        {order.address?.country || '-'}
                                                        {order.address?.zipcode
                                                            ? ` - ${order.address.zipcode}`
                                                            : ''
                                                        }
                                                    </p>

                                                </div>


                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                ">

                                                    <Phone
                                                        size={14}
                                                        className="text-neutral-400"
                                                    />

                                                    <span>
                                                        {order.address?.phone || '-'}
                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                    </div>


                                    {/* ORDER CONTROLS */}
                                    <div>

                                        <div className="
                                            mb-3
                                            flex
                                            items-center
                                            gap-2
                                        ">

                                            <Truck
                                                size={16}
                                                className="text-neutral-500"
                                            />

                                            <h3 className="
                                                text-sm
                                                font-semibold
                                                text-neutral-900
                                            ">
                                                Order Controls
                                            </h3>

                                        </div>


                                        <div className="space-y-4">

                                            {/* Order Status */}
                                            <div>

                                                <label className="
                                                    mb-1.5
                                                    block
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-wider
                                                    text-neutral-400
                                                ">
                                                    Order Status
                                                </label>

                                                <div className="relative">

                                                    <select
                                                        onChange={(event) =>
                                                            statusHandler(
                                                                event,
                                                                order._id
                                                            )
                                                        }
                                                        value={
                                                            order.status ||
                                                            'Order Placed'
                                                        }
                                                        className="
                                                            h-11
                                                            w-full
                                                            appearance-none
                                                            rounded-xl
                                                            border
                                                            border-neutral-200
                                                            bg-white
                                                            px-3
                                                            pr-9
                                                            text-xs
                                                            font-medium
                                                            text-neutral-800
                                                            outline-none
                                                            focus:border-black
                                                        "
                                                    >

                                                        <option value="Order Placed">
                                                            Order Placed
                                                        </option>

                                                        <option value="Packing">
                                                            Packing
                                                        </option>

                                                        <option value="Shipped">
                                                            Shipped
                                                        </option>

                                                        <option value="Out for delivery">
                                                            Out for delivery
                                                        </option>

                                                        <option value="Delivered">
                                                            Delivered
                                                        </option>

                                                    </select>

                                                    <ChevronDown
                                                        size={15}
                                                        className="
                                                            pointer-events-none
                                                            absolute
                                                            right-3
                                                            top-1/2
                                                            -translate-y-1/2
                                                            text-neutral-400
                                                        "
                                                    />

                                                </div>

                                            </div>


                                            {/* Payment Status */}
                                            <div>

                                                <label className="
                                                    mb-1.5
                                                    block
                                                    text-[10px]
                                                    font-bold
                                                    uppercase
                                                    tracking-wider
                                                    text-neutral-400
                                                ">
                                                    Payment Status
                                                </label>

                                                <div className="relative">

                                                    <select
                                                        onChange={(event) =>
                                                            paymentStatusHandler(
                                                                event,
                                                                order._id
                                                            )
                                                        }
                                                        value={
                                                            order.payment
                                                                ? 'Done'
                                                                : 'Pending'
                                                        }
                                                        className="
                                                            h-11
                                                            w-full
                                                            appearance-none
                                                            rounded-xl
                                                            border
                                                            border-neutral-200
                                                            bg-white
                                                            px-3
                                                            pr-9
                                                            text-xs
                                                            font-medium
                                                            text-neutral-800
                                                            outline-none
                                                            focus:border-black
                                                        "
                                                    >

                                                        <option value="Pending">
                                                            Pending
                                                        </option>

                                                        <option value="Done">
                                                            Done
                                                        </option>

                                                    </select>

                                                    <ChevronDown
                                                        size={15}
                                                        className="
                                                            pointer-events-none
                                                            absolute
                                                            right-3
                                                            top-1/2
                                                            -translate-y-1/2
                                                            text-neutral-400
                                                        "
                                                    />

                                                </div>

                                            </div>


                                            {/* Amount */}
                                            <div className="
                                                rounded-xl
                                                bg-neutral-950
                                                p-4
                                                text-white
                                            ">

                                                <div className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                ">

                                                    <span className="
                                                        text-[10px]
                                                        font-semibold
                                                        uppercase
                                                        tracking-wider
                                                        text-neutral-400
                                                    ">
                                                        Total Amount
                                                    </span>

                                                    <CreditCard
                                                        size={15}
                                                        className="text-neutral-400"
                                                    />

                                                </div>

                                                <p className="
                                                    mt-1
                                                    text-xl
                                                    font-semibold
                                                ">
                                                    {currency}
                                                    {formatPrice(order.amount)}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        )
                    })}

                </div>

            )}

        </div>
    )
}

export default Orders
