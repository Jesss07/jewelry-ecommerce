'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-hot-toast';
import { ChevronLeft, Truck, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const { addToCart } = useCart();

    const [product, setProduct] = useState<any>(null);
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
                setProduct(data);
            } catch (error) {
                toast.error('Product not found');
                router.push('/shop');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProduct();
    }, [id, router]);

    const handleAddToCart = () => {
        addToCart({
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
            countInStock: product.countInStock,
            qty,
        });
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push('/cart');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-light">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="bg-light min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <Link href="/shop" className="inline-flex items-center text-sm uppercase tracking-widest text-gray-500 hover:text-gold mb-10 transition-colors">
                    <ChevronLeft size={16} className="mr-2" /> Back to Collection
                </Link>

                <div className="bg-white p-6 md:p-12 shadow-xl border border-gold/10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">

                        {/* Image Gallery */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="aspect-[4/5] relative overflow-hidden bg-gray-50"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col justify-center"
                        >
                            <span className="text-gold text-xs uppercase tracking-[0.2em] mb-4 block">{product.category}</span>
                            <h1 className="font-playfair text-3xl md:text-4xl mb-4 text-dark">{product.name}</h1>
                            <p className="font-playfair text-2xl text-gold mb-8">${product.price.toLocaleString()}</p>

                            <div className="prose prose-sm text-gray-500 mb-8 leading-relaxed">
                                <p>{product.description}</p>
                            </div>

                            <div className="mb-8 p-4 bg-light border border-gold/20 flex gap-4 text-sm text-dark">
                                <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-gold" /> Authenticity Guaranteed</div>
                                <div className="flex items-center gap-2"><Truck size={18} className="text-gold" /> Complimentary Delivery</div>
                            </div>

                            <div className="border-t border-b border-gray-100 py-6 mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium uppercase tracking-widest">Status</span>
                                    <span className={`text-sm ${product.countInStock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>

                                {product.countInStock > 0 && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium uppercase tracking-widest">Quantity</span>
                                        <select
                                            value={qty}
                                            onChange={(e) => setQty(Number(e.target.value))}
                                            className="border border-gray-200 px-4 py-2 focus:outline-none focus:border-gold bg-transparent"
                                        >
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.countInStock === 0}
                                    className={`flex-1 ${product.countInStock === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed px-8 py-3 uppercase tracking-widest text-sm font-medium' : 'btn-outline'}`}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    disabled={product.countInStock === 0}
                                    className={`flex-1 ${product.countInStock === 0 ? 'hidden' : 'btn-primary'}`}
                                >
                                    Buy Now <ArrowRight size={16} className="ml-2" />
                                </button>
                            </div>

                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
}
