'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
    return (
        <div className="min-h-screen pt-32 pb-12 bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
            <div className="max-w-lg mx-auto px-4 text-center">
                <CheckCircle className="w-24 h-24 text-[#D4AF37] mx-auto mb-8" strokeWidth={1.5} />

                <h1 className="text-4xl md:text-5xl font-playfair tracking-widest text-white mb-4 uppercase">
                    Order Placed
                </h1>

                <p className="text-[#D4AF37] text-2xl font-playfair mb-8 italic">
                    Successfully!
                </p>

                <p className="text-neutral-400 mb-12 leading-relaxed">
                    Thank you for your purchase. We will process your order and send you a confirmation email shortly.
                </p>

                <Link
                    href="/shop"
                    className="inline-block py-4 px-10 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 uppercase tracking-widest text-sm font-bold"
                >
                    Back to Shop
                </Link>
            </div>
        </div>
    );
}
