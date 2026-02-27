'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

export default function DashboardPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchMyOrders = async () => {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user.token}` },
                };
                const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders/myorders`, config);
                setOrders(data);
            } catch (error) {
                toast.error('Error fetching orders');
            } finally {
                setLoading(false);
            }
        };

        fetchMyOrders();
    }, [user, router]);

    const handleCancelOrder = async (orderId: string) => {
        if (window.confirm('Are you sure you want to cancel this order?')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${user?.token}` },
                };
                await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/cancel`, {}, config);
                toast.success('Order cancelled successfully');
                // Refresh orders visually
                setOrders(orders.map((o: any) => o._id === orderId ? { ...o, status: 'Cancelled' } : o));
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Error cancelling order');
            }
        }
    }

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-10 w-10 border-b-2 border-gold rounded-full"></div></div>;
    }

    return (
        <div className="bg-light min-h-screen py-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-playfair text-3xl mb-2 text-dark">My Account</h1>
                <p className="text-gray-500 text-sm tracking-widest uppercase mb-10 pb-4 border-b border-gold/20">Welcome back, {user?.name}</p>

                <div className="bg-white shadow-xl border border-gold/10 p-6 md:p-8">
                    <h2 className="font-playfair text-2xl mb-6">Order History</h2>

                    {orders.length === 0 ? (
                        <div className="text-center py-10">
                            <p className="text-gray-500 mb-6">You have not placed any orders yet.</p>
                            <Link href="/shop" className="btn-primary">Browse Collection</Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-4 font-medium text-sm text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="py-4 font-medium text-sm text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="py-4 font-medium text-sm text-gray-500 uppercase tracking-wider">Total</th>
                                        <th className="py-4 font-medium text-sm text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="py-4 font-medium text-sm text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order: any) => (
                                        <tr key={order._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 text-sm font-medium text-dark">{order._id.substring(0, 10)}...</td>
                                            <td className="py-4 text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="py-4 text-sm text-gold font-playfair font-medium">${order.totalPrice.toLocaleString()}</td>
                                            <td className="py-4 text-sm">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide
                            ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                                'bg-gray-100 text-gray-800'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-sm text-right">
                                                {(order.status === 'Pending' || order.status === 'Confirmed') && (
                                                    <button
                                                        onClick={() => handleCancelOrder(order._id)}
                                                        className="text-red-500 hover:text-red-700 text-xs uppercase tracking-widest transition-colors font-medium border border-red-200 hover:border-red-500 px-3 py-1 rounded-sm"
                                                    >
                                                        Cancel
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
