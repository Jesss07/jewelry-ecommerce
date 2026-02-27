'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import { Users, ShoppingBag, DollarSign, AlertCircle } from 'lucide-react';

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || !user.isAdmin) {
            router.push('/login');
            return;
        }

        const fetchStats = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`, config);
                setStats(data);
            } catch (error) {
                toast.error('Failed to load dashboard statistics');
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user, router]);

    if (loading) return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin h-10 w-10 border-b-2 border-gold rounded-full"></div></div>;

    return (
        <div className="bg-light min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-playfair text-3xl mb-8 border-b border-gold/20 pb-4">Admin Overview</h1>

                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-8">
                    <Link href="/admin" className="px-6 py-2 bg-dark text-white text-sm tracking-widest font-medium uppercase">Dashboard</Link>
                    <Link href="/admin/orders" className="px-6 py-2 bg-white border border-gold/20 text-dark hover:bg-gold hover:text-white transition-colors text-sm tracking-widest font-medium uppercase">Manage Orders</Link>
                    {/* Manage Products disabled visually for brevity in this MVP, full CRUD is backend complete */}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

                    <div className="bg-white p-6 shadow-xl border border-gold/10">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm tracking-widest uppercase mb-1">Revenue</p>
                                <h3 className="font-playfair text-3xl text-dark">${stats?.totalRevenue.toLocaleString()}</h3>
                            </div>
                            <div className="p-3 bg-light rounded-sm"><DollarSign size={24} className="text-gold" /></div>
                        </div>
                    </div>

                    <div className="bg-white p-6 shadow-xl border border-gold/10">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm tracking-widest uppercase mb-1">Orders</p>
                                <h3 className="font-playfair text-3xl text-dark">{stats?.ordersCount}</h3>
                            </div>
                            <div className="p-3 bg-light rounded-sm"><ShoppingBag size={24} className="text-gold" /></div>
                        </div>
                    </div>

                    <div className="bg-white p-6 shadow-xl border border-gold/10">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm tracking-widest uppercase mb-1">Users</p>
                                <h3 className="font-playfair text-3xl text-dark">{stats?.usersCount}</h3>
                            </div>
                            <div className="p-3 bg-light rounded-sm"><Users size={24} className="text-gold" /></div>
                        </div>
                    </div>

                    <div className="bg-white p-6 shadow-xl border-red-500/20">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-gray-500 text-sm tracking-widest uppercase mb-1">Low Stock</p>
                                <h3 className="font-playfair text-3xl text-red-600">{stats?.lowStockItemsCount}</h3>
                            </div>
                            <div className="p-3 bg-red-50 rounded-sm"><AlertCircle size={24} className="text-red-500" /></div>
                        </div>
                    </div>

                </div>

                {/* Low Stock Alerts & Recent Orders */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 shadow-xl border border-gold/10">
                        <h2 className="font-playfair text-2xl mb-6">Recent Orders</h2>
                        <div className="space-y-4">
                            {stats?.recentOrders.map((order: any) => (
                                <div key={order._id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 transition-colors">
                                    <div>
                                        <p className="text-sm font-medium text-dark">{order.user?.name || 'Guest'}</p>
                                        <p className="text-xs text-gray-500">{order._id.substring(0, 8)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-playfair text-gold font-medium">${order.totalPrice}</p>
                                        <span className="text-xs text-gray-400 capitalize">{order.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-6 shadow-xl border border-gold/10">
                        <h2 className="font-playfair text-2xl mb-6">Low Stock Alerts</h2>
                        {stats?.lowStockProducts.length === 0 ? (
                            <p className="text-gray-500 text-sm">Inventory is healthy.</p>
                        ) : (
                            <div className="space-y-4">
                                {stats?.lowStockProducts.map((product: any) => (
                                    <div key={product._id} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0 hover:bg-red-50/50 px-2 transition-colors">
                                        <img src={product.image} alt={product.name} className="w-12 h-12 object-cover bg-gray-100" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-dark">{product.name}</p>
                                        </div>
                                        <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
                                            {product.countInStock} Left
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
