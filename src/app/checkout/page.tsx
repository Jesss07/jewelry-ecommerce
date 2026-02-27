'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../../context/CartContext';

export default function CheckoutPage() {
    const { cartItems, totalPrice, clearCart } = useCart();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const handlePlaceOrder = (e: React.FormEvent) => {
        e.preventDefault();
        clearCart();
        router.push('/success');
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-32 pb-12 bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
                <p className="text-xl text-neutral-400 mb-8">Your cart is empty.</p>
                <button onClick={() => router.push('/shop')} className="py-3 px-8 bg-[#D4AF37] text-black hover:bg-[#c29b2b] transition-colors duration-300 uppercase tracking-widest text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    Return to Shop
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-12 bg-[#0a0a0a] text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-playfair tracking-widest text-[#D4AF37] mb-12 uppercase text-center">
                    Checkout
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Order Summary */}
                    <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-lg order-2 md:order-1 h-fit">
                        <h2 className="text-2xl font-playfair text-white mb-6 border-b border-neutral-800 pb-4">Order Summary</h2>
                        <div className="space-y-4 mb-6">
                            {cartItems.map(item => (
                                <div key={item.product} className="flex justify-between items-center text-sm">
                                    <span className="text-neutral-300">{item.name} x {item.qty}</span>
                                    <span className="text-[#D4AF37]">${(item.price * item.qty).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-neutral-800 pt-4 mt-6">
                            <div className="flex justify-between items-center text-lg">
                                <span className="text-white font-playfair">Total</span>
                                <span className="text-[#D4AF37] font-semibold">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-lg order-1 md:order-2">
                        <h2 className="text-2xl font-playfair text-white mb-6 border-b border-neutral-800 pb-4">Payment Method</h2>
                        <form onSubmit={handlePlaceOrder}>
                            <div className="space-y-4 mb-8">
                                <label className={`flex items-center space-x-3 cursor-pointer p-4 border rounded transition-colors ${paymentMethod === 'cod' ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-neutral-800 hover:border-[#D4AF37]/50'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="cod"
                                        checked={paymentMethod === 'cod'}
                                        onChange={() => setPaymentMethod('cod')}
                                        className="form-radio text-[#D4AF37] focus:ring-[#D4AF37] bg-neutral-800 border-neutral-700 w-4 h-4"
                                    />
                                    <span className="text-white">Cash on Delivery</span>
                                </label>

                                <label className={`flex items-center space-x-3 cursor-pointer p-4 border rounded transition-colors ${paymentMethod === 'card' ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-neutral-800 hover:border-[#D4AF37]/50'}`}>
                                    <input
                                        type="radio"
                                        name="payment"
                                        value="card"
                                        checked={paymentMethod === 'card'}
                                        onChange={() => setPaymentMethod('card')}
                                        className="form-radio text-[#D4AF37] focus:ring-[#D4AF37] bg-neutral-800 border-neutral-700 w-4 h-4"
                                    />
                                    <span className="text-white">Credit / Debit Card</span>
                                </label>
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="space-y-4 mb-8 transition-all duration-300">
                                    <div>
                                        <label className="block text-sm text-neutral-400 mb-2 uppercase tracking-wider">Card Number</label>
                                        <input
                                            type="text"
                                            placeholder="0000 0000 0000 0000"
                                            required
                                            className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded focus:outline-none focus:border-[#D4AF37] transition-colors"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm text-neutral-400 mb-2 uppercase tracking-wider">Expiry</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                required
                                                className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded focus:outline-none focus:border-[#D4AF37] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-neutral-400 mb-2 uppercase tracking-wider">CVV</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                required
                                                className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded focus:outline-none focus:border-[#D4AF37] transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-neutral-400 mb-2 uppercase tracking-wider">Name on Card</label>
                                        <input
                                            type="text"
                                            placeholder="JANE DOE"
                                            required
                                            className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded focus:outline-none focus:border-[#D4AF37] transition-colors"
                                        />
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full py-4 bg-[#D4AF37] text-black hover:bg-[#c29b2b] transition-colors duration-300 uppercase tracking-widest text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
