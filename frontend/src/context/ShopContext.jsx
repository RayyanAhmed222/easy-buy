import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [search, setSearch] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);

    // Get token from localStorage when the app starts
    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );

    const navigate = useNavigate();


    // =========================
    // ADD TO CART
    // =========================
    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error("Select Product Size");
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {

            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }

        } else {

            cartData[itemId] = {};
            cartData[itemId][size] = 1;

        }

        // Update cart immediately in frontend
        setCartItems(cartData);


        // If user is logged in, save cart to database
        if (token) {

            try {

                await axios.post(
                    backendUrl + "/api/cart/add",
                    {
                        itemId,
                        size
                    },
                    {
                        headers: {
                            token
                        }
                    }
                );

            } catch (error) {

                console.log(error);
                toast.error(error.message);

            }
        }
    };


    // =========================
    // GET CART COUNT
    // =========================
    const getCartCount = () => {

        let totalCount = 0;

        for (const items in cartItems) {

            for (const item in cartItems[items]) {

                try {

                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }

                } catch (error) {

                    console.log(error);

                }
            }
        }

        return totalCount;
    };


    // =========================
    // UPDATE CART QUANTITY
    // =========================
    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);


        // If user is logged in, update database
        if (token) {

            try {

                await axios.post(
                    backendUrl + "/api/cart/update",
                    {
                        itemId,
                        size,
                        quantity
                    },
                    {
                        headers: {
                            token
                        }
                    }
                );

            } catch (error) {

                console.log(error);
                toast.error(error.message);

            }
        }
    };


    // =========================
    // GET CART TOTAL AMOUNT
    // =========================
    const getCartAmount = () => {

        let totalAmount = 0;

        for (const items in cartItems) {

            let itemInfo = products.find(
                (product) => product._id === items
            );

            for (const item in cartItems[items]) {

                try {

                    if (cartItems[items][item] > 0) {

                        totalAmount +=
                            itemInfo.price *
                            cartItems[items][item];

                    }

                } catch (error) {

                    console.log(error);

                }
            }
        }

        return totalAmount;
    };


    // =========================
    // GET PRODUCTS
    // =========================
    const getProductsData = async () => {

        try {

            const response = await axios.get(
                backendUrl + "/api/product/list"
            );

            if (response.data.success) {

                setProducts(response.data.products);

            } else {

                toast.error(response.data.message);

            }

        } catch (error) {

            console.log(error);
            toast.error(error.message);

        }
    };


    // =========================
    // GET USER CART FROM DATABASE
    // =========================
    const getUserCart = async (userToken) => {

        try {

            const response = await axios.post(
                backendUrl + "/api/cart/get",
                {},
                {
                    headers: {
                        token: userToken
                    }
                }
            );

            if (response.data.success) {

                setCartItems(response.data.cartData);

            }

        } catch (error) {

            console.log(error);
            toast.error(error.message);

        }
    };


    // =========================
    // GET PRODUCTS WHEN APP STARTS
    // =========================
    useEffect(() => {

        getProductsData();

    }, []);


    // =========================
    // GET CART WHEN TOKEN CHANGES
    // =========================
    useEffect(() => {

        if (token) {

            getUserCart(token);

        }

    }, [token]);


    // =========================
    // CONTEXT VALUE
    // =========================
    const value = {

        products,
        currency,
        delivery_fee,

        search,
        setSearch,

        showSearch,
        setShowSearch,

        cartItems,
        addToCart,
        setCartItems,

        getCartCount,
        updateQuantity,

        getCartAmount,

        navigate,

        backendUrl,

        setToken,
        token
    };


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};


export default ShopContextProvider;
