'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';
import { X } from 'lucide-react';

export default function CartPage() {
    const { cartItems, removeFromCart, totalPrice } = useCart();
    const router = useRouter();

    return (
        <div className="min-h-screen pt-32 pb-12 bg-[#0a0a0a] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-playfair tracking-widest text-[#D4AF37] mb-12 uppercase text-center">
                    Your Cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-neutral-400 mb-8 text-lg">Your cart is currently empty.</p>
                        <Link href="/shop" className="inline-block py-3 px-8 bg-[#D4AF37] text-black hover:bg-[#c29b2b] transition-colors duration-300 uppercase tracking-widest text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="flex-grow">
                            <div className="hidden sm:grid grid-cols-6 gap-4 pb-4 border-b border-neutral-800 text-sm tracking-widest text-neutral-400 uppercase">
                                <div className="col-span-3">Product</div>
                                <div className="col-span-1 text-center">Price</div>
                                <div className="col-span-1 text-center">Quantity</div>
                                <div className="col-span-1 text-right">Remove</div>
                            </div>

                            <div className="space-y-6 mt-6">
                                {cartItems.map((item) => (
                                    <div key={item.product} className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center py-4 border-b border-neutral-800/50">
                                        <div className="col-span-3 flex items-center space-x-6">
                                            <div className="w-24 h-24 bg-neutral-800 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                    onError={(e: any) => {
                                                        e.target.style.display = 'none';
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <div className="font-playfair text-lg text-white">
                                                    {item.name}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-1 text-center text-[#D4AF37]">
                                            ${item.price.toFixed(2)}
                                        </div>

                                        <div className="col-span-1 text-center text-neutral-300">
                                            {item.qty}
                                        </div>

                                        <div className="col-span-1 text-right">
                                            <button
                                                onClick={() => removeFromCart(item.product)}
                                                className="text-neutral-500 hover:text-red-500 transition-colors p-2"
                                                title="Remove Item"
                                            >
                                                <X size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="w-full lg:w-1/3">
                            <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-lg sticky top-32">
                                <h2 className="text-2xl font-playfair text-white mb-6 border-b border-neutral-800 pb-4">Order Summary</h2>

                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-neutral-400">Total Amount</span>
                                    <span className="text-2xl text-[#D4AF37] font-semibold">${totalPrice.toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={() => router.push('/checkout')}
                                    className="w-full py-4 bg-[#D4AF37] text-black hover:bg-[#c29b2b] transition-colors duration-300 uppercase tracking-widest text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
