'use client';

import React from 'react';

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-32 pb-12 bg-[#0a0a0a] text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
                <h1 className="text-4xl md:text-5xl font-playfair tracking-widest text-[#D4AF37] mb-8 uppercase">
                    About Lumière
                </h1>
                <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mb-12"></div>

                <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                    Lumière was founded on a simple principle: to bring the world’s most exquisite diamonds and gemstones to those who appreciate true artistry. For over three generations, our master jewelers have crafted pieces that celebrate life's most precious moments.
                </p>
                <p className="text-lg text-neutral-400 leading-relaxed mb-16">
                    Every piece in our collection is meticulously designed, ethically sourced, and crafted with an uncompromising dedication to perfection. We invite you to explore our world of luminous elegance.
                </p>
            </div>
        </div>
    );
}
