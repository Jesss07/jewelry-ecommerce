'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';
export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Shop', href: '/shop' },
        { name: 'Collections', href: '/collections' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md border-b border-gold/20 
      ${isScrolled ? 'bg-[var(--color-bg)] shadow-lg py-4' : 'bg-[var(--color-bg)] py-6'}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-playfair text-2xl tracking-[0.15em] text-[var(--color-text)] hover:text-gold transition-colors"
                    >
                        LUMIÈRE
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`text-sm uppercase tracking-widest transition-colors relative group 
                ${pathname === link.href ? 'text-gold' : 'text-[var(--color-text)] hover:text-gold'}`}
                            >
                                {link.name}
                                <span
                                    className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 
                  group-hover:w-full ${pathname === link.href ? 'w-full' : ''}`}
                                ></span>
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-6 text-[var(--color-text)]">

                        <button className="hover:text-gold transition-colors">
                            <Search size={20} />
                        </button>

                        {user ? (
                            <div className="relative group cursor-pointer">
                                <div className="flex items-center space-x-1 hover:text-gold transition-colors">
                                    <User size={20} />
                                    <span className="text-sm hidden sm:block">
                                        {user.name.split(' ')[0]}
                                    </span>
                                </div>

                                <div className="absolute right-0 mt-2 w-48 bg-[var(--color-bg)] border border-gold/20 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pt-2 pb-2">
                                    {user.isAdmin && (
                                        <Link href="/admin" className="block px-4 py-2 text-sm hover:text-gold hover:bg-white/5">
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <Link href="/dashboard" className="block px-4 py-2 text-sm hover:text-gold hover:bg-white/5">
                                        My Orders
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-2 text-sm hover:text-gold hover:bg-white/5"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className="hover:text-gold transition-colors">
                                <User size={20} />
                            </Link>
                        )}

                        {/* Cart */}
                        <Link href="/cart" className="hover:text-gold transition-colors relative">
                            <ShoppingBag size={20} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-gold text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-md">
                                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                                </span>
                            )}
                        </Link>

                        {/* 🔥 THEME TOGGLE ADDED HERE */}
                        <ThemeToggle />

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="hover:text-gold transition-colors"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[var(--color-bg)] border-t border-white/10 absolute top-full left-0 w-full shadow-2xl">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-4 text-center text-sm uppercase tracking-widest hover:text-gold hover:bg-white/5"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}