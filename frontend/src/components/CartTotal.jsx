import React, { useContext } from 'react'
import { ShoppingBag, Truck, ReceiptText } from 'lucide-react'

import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {

    const {
        curreny,
        delivery_fee,
        getCartAmount
    } = useContext(ShopContext)

    // =========================================
    // CART AMOUNT
    // =========================================

    const subtotal = Number(getCartAmount()) || 0
    const shippingFee = Number(delivery_fee) || 0

    // =========================================
    // FINAL TOTAL
    // =========================================

    const total =
        subtotal === 0
            ? 0
            : subtotal + shippingFee

    return (
        <div className="
            w-full
            rounded-3xl
            border
            border-neutral-200
            bg-white
            p-5
            shadow-sm
            sm:p-6
        ">

            {/* =========================================
                HEADER
            ========================================= */}

            <div className="
                flex
                items-start
                justify-between
                gap-4
            ">

                <div>
                    <div className="text-xl sm:text-2xl">
                        <Title
                            text1="CART"
                            text2="TOTALS"
                        />
                    </div>

                    <p className="
                        mt-1
                        text-xs
                        leading-5
                        text-neutral-400
                    ">
                        Review your order summary
                    </p>
                </div>

                <div className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-neutral-100
                    text-neutral-700
                ">
                    <ReceiptText
                        size={18}
                        strokeWidth={1.8}
                    />
                </div>

            </div>

            {/* =========================================
                TOTAL DETAILS
            ========================================= */}

            <div className="
                mt-6
                rounded-2xl
                border
                border-neutral-100
                bg-neutral-50/70
                p-4
            ">

                {/* SUBTOTAL */}

                <div className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    text-sm
                ">

                    <div className="
                        flex
                        items-center
                        gap-2.5
                    ">
                        <div className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            bg-white
                            text-neutral-500
                            shadow-sm
                        ">
                            <ShoppingBag
                                size={15}
                                strokeWidth={1.8}
                            />
                        </div>

                        <span className="text-neutral-500">
                            Subtotal
                        </span>
                    </div>

                    <span className="
                        font-semibold
                        text-neutral-900
                    ">
                        {curreny} {subtotal.toFixed(2)}
                    </span>

                </div>

                <div className="
                    my-4
                    h-px
                    bg-neutral-200
                " />

                {/* SHIPPING */}

                <div className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    text-sm
                ">

                    <div className="
                        flex
                        items-center
                        gap-2.5
                    ">
                        <div className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            bg-white
                            text-neutral-500
                            shadow-sm
                        ">
                            <Truck
                                size={15}
                                strokeWidth={1.8}
                            />
                        </div>

                        <div>
                            <span className="text-neutral-500">
                                Shipping Fee
                            </span>

                            <p className="
                                mt-0.5
                                text-[10px]
                                text-neutral-400
                            ">
                                Standard delivery
                            </p>
                        </div>
                    </div>

                    <span className="
                        font-semibold
                        text-neutral-900
                    ">
                        {curreny} {shippingFee.toFixed(2)}
                    </span>

                </div>

            </div>

            {/* =========================================
                FINAL TOTAL
            ========================================= */}

            <div className="
                mt-4
                flex
                items-end
                justify-between
                gap-4
                rounded-2xl
                bg-neutral-950
                px-4
                py-4
                text-white
                sm:px-5
            ">

                <div>
                    <p className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-[0.18em]
                        text-neutral-400
                    ">
                        Total Amount
                    </p>

                    <p className="
                        mt-1
                        text-xs
                        text-neutral-400
                    ">
                        Including shipping
                    </p>
                </div>

                <div className="
                    text-right
                    text-lg
                    font-semibold
                    tracking-tight
                    sm:text-xl
                ">
                    {curreny} {total.toFixed(2)}
                </div>

            </div>

        </div>
    )
}

export default CartTotal
