'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

export interface CartItem {
    product: string; // product ID
    name: string;
    image: string;
    price: number;
    qty: number;
    countInStock: number;
}

export interface ShippingAddress {
    address: string;
    city: string;
    postalCode: string;
    country: string;
}

interface CartContextType {
    cartItems: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: string;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    saveShippingAddress: (address: ShippingAddress) => void;
    savePaymentMethod: (method: string) => void;
    clearCart: () => void;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const addDecimals = (num: number) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
        address: '', city: '', postalCode: '', country: ''
    });
    const [paymentMethod, setPaymentMethod] = useState<string>('Razorpay');

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedCart = localStorage.getItem('cartItems');
        if (storedCart) setCartItems(JSON.parse(storedCart));

        const storedAddress = localStorage.getItem('shippingAddress');
        if (storedAddress) setShippingAddress(JSON.parse(storedAddress));

        const storedPayment = localStorage.getItem('paymentMethod');
        if (storedPayment) setPaymentMethod(JSON.parse(storedPayment));
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, mounted]);

    const addToCart = (item: CartItem) => {
        const existItem = cartItems.find((x) => x.product === item.product);

        if (existItem) {
            setCartItems(
                cartItems.map((x) =>
                    x.product === existItem.product ? item : x
                )
            );
            toast.success('Cart updated');
        } else {
            setCartItems([...cartItems, item]);
            toast.success('Added to cart');
        }
    };

    const removeFromCart = (id: string) => {
        setCartItems(cartItems.filter((x) => x.product !== id));
        toast.success('Removed from cart');
    };

    const saveShippingAddress = (address: ShippingAddress) => {
        setShippingAddress(address);
        localStorage.setItem('shippingAddress', JSON.stringify(address));
    };

    const savePaymentMethod = (method: string) => {
        setPaymentMethod(method);
        localStorage.setItem('paymentMethod', JSON.stringify(method));
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    // Calculations
    const itemsPrice = Number(addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)));
    const shippingPrice = itemsPrice > 100 ? 0 : 20; // free shipping over 100
    const taxPrice = Number(addDecimals(0.18 * itemsPrice)); // 18% GST
    const totalPrice = Number((itemsPrice + shippingPrice + taxPrice).toFixed(2));

    return (
        <CartContext.Provider
            value={{
                cartItems,
                shippingAddress,
                paymentMethod,
                addToCart,
                removeFromCart,
                saveShippingAddress,
                savePaymentMethod,
                clearCart,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
