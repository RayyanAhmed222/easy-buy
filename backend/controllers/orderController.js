import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing orders using COD method
const placeOrder = async (req, res) => {
    try {

        const { items, amount, address } = req.body;
        const userId = req.userId;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };

        const newOrder = new orderModel(orderData);

        await newOrder.save();

        await userModel.findByIdAndUpdate(
            userId,
            { cartData: {} }
        );

        res.json({
            success: true,
            message: "Order Placed"
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// All Orders - Admin
const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({});

        res.json({
            success: true,
            orders
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// User Orders
const userOrders = async (req, res) => {
    try {

        const userId = req.userId;

        const orders = await orderModel.find({ userId });

        res.json({
            success: true,
            orders
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};


// Update order status - Admin
const updateStatus = async (req, res) => {
    try {

        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(
            orderId,
            { status }
        );

        res.json({
            success: true,
            message: "Status Updated"
        });

    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {

        const { orderId, payment } = req.body;

        await orderModel.findByIdAndUpdate(
            orderId,
            { payment }
        );

        res.json({
            success: true,
            message: 'Payment status updated'
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });

    }
};

const deleteOrder = async (req, res) => {
    try {

        const { orderId } = req.body;

        if (!orderId) {
            return res.json({
                success: false,
                message: "Order ID is required"
            });
        }

        const deletedOrder = await orderModel.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            return res.json({
                success: false,
                message: "Order not found"
            });
        }

        res.json({
            success: true,
            message: "Order deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.json({
            success: false,
            message: error.message
        });
    }
};



export {
    placeOrder,
    allOrders,
    userOrders,
    updateStatus,
    updatePaymentStatus,
    deleteOrder
};
