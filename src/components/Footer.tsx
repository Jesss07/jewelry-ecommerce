'use client';

import Link from 'next/link';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-20 pb-10 border-t border-white/5 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="font-playfair text-2xl tracking-[0.15em] mb-6 block">LUMIÈRE</Link>
                        <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs">
                            Crafting timeless luxury and exquisite diamond jewelry since 1992.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white/60 hover:text-gold transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-white/60 hover:text-gold transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-white/60 hover:text-gold transition-colors"><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-lg font-medium tracking-wider mb-6">Shop</h3>
                        <ul className="space-y-4">
                            <li><Link href="/shop?category=Rings" className="text-white/60 hover:text-gold transition-colors text-sm">Engagement Rings</Link></li>
                            <li><Link href="/shop?category=Necklaces" className="text-white/60 hover:text-gold transition-colors text-sm">Fine Necklaces</Link></li>
                            <li><Link href="/shop?category=Earrings" className="text-white/60 hover:text-gold transition-colors text-sm">Earrings</Link></li>
                            <li><Link href="/shop?category=Bracelets" className="text-white/60 hover:text-gold transition-colors text-sm">Bracelets</Link></li>
                            <li><Link href="/shop?category=High+Jewelry" className="text-white/60 hover:text-gold transition-colors text-sm">High Jewelry</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-medium tracking-wider mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><Link href="/about" className="text-white/60 hover:text-gold transition-colors text-sm">Our Heritage</Link></li>
                            <li><Link href="/about" className="text-white/60 hover:text-gold transition-colors text-sm">Maison</Link></li>
                            <li><Link href="/about" className="text-white/60 hover:text-gold transition-colors text-sm">Sustainability</Link></li>
                            <li><Link href="/contact" className="text-white/60 hover:text-gold transition-colors text-sm">Careers</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-medium tracking-wider mb-6">Client Care</h3>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li><a href="tel:+18001234567" className="hover:text-gold transition-colors">+1 (800) 123-4567</a></li>
                            <li><a href="mailto:concierge@lumiere.com" className="hover:text-gold transition-colors">concierge@lumiere.com</a></li>
                            <li>Mon - Fri: 9am - 8pm EST</li>
                        </ul>
                        <Link href="/contact" className="inline-block mt-6 text-gold text-sm uppercase tracking-widest border-b border-gold pb-1 hover:text-white hover:border-white transition-all">
                            Book an Appointment
                        </Link>
                    </div>

                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
                    <p>&copy; {new Date().getFullYear()} Lumière Jewelry. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
