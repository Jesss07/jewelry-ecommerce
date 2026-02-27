'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

export default function ShopPage() {
    const { addToCart } = useCart();
    const router = useRouter();

    const handleAddToCart = (product: any) => {
        addToCart({
            product: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty: 1
        });
    };

    const handleBuyNow = (product: any) => {
        handleAddToCart(product);
        router.push('/cart');
    };

    return (
        <div className="min-h-screen pt-32 pb-12 bg-[#0a0a0a] text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-playfair tracking-widest text-white mb-4 uppercase">
                        Our Collection
                    </h1>
                    <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="group flex flex-col bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-[#D4AF37]/50 transition-colors duration-300">
                            <div className="relative w-full h-64 bg-neutral-800 overflow-hidden flex items-center justify-center">
                                {/* Use standard img to handle placeholder paths without Next Image errors */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105 transform"
                                    onError={(e: any) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="absolute inset-0 hidden items-center justify-center text-neutral-500 font-playfair italic">
                                    [Image: {product.name}]
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-playfair text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-neutral-400 mb-6 flex-grow leading-relaxed">
                                    {product.description}
                                </p>
                                <div className="text-xl text-[#D4AF37] font-semibold tracking-wide mb-6">
                                    ${product.price.toLocaleString()}
                                </div>

                                <div className="flex flex-col space-y-3 mt-auto">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 uppercase tracking-widest text-xs font-semibold"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        onClick={() => handleBuyNow(product)}
                                        className="w-full py-3 bg-[#D4AF37] text-black hover:bg-[#c29b2b] transition-colors duration-300 uppercase tracking-widest text-xs font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
