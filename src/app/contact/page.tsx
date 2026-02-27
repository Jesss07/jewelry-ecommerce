'use client';

import React from 'react';

export default function ContactPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for contacting us. We will get back to you shortly.');
    };

    return (
        <div className="min-h-screen pt-32 pb-12 bg-[#0a0a0a] text-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                <h1 className="text-4xl md:text-5xl font-playfair tracking-widest text-[#D4AF37] mb-8 uppercase text-center">
                    Contact Us
                </h1>
                <div className="w-24 h-[1px] bg-[#D4AF37] mx-auto mb-12"></div>

                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-lg shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm text-neutral-400 mb-2 uppercase tracking-wider">Name</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded focus:outline-none focus:border-[#D4AF37] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-400 mb-2 uppercase tracking-wider">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded focus:outline-none focus:border-[#D4AF37] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-neutral-400 mb-2 uppercase tracking-wider">Message</label>
                            <textarea
                                required
                                rows={5}
                                className="w-full bg-neutral-800 border border-neutral-700 text-white px-4 py-3 rounded focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-[#D4AF37] text-black hover:bg-[#c29b2b] transition-colors duration-300 uppercase tracking-widest text-sm font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
