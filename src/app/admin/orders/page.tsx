'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

export default function ManageOrdersPage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || !user.isAdmin) {
            router.push('/login');
            return;
        }

        fetchOrders();
    }, [user, router]);

    const fetchOrders = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user?.token}` } };
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/orders`, config);
            setOrders(data);
        } catch (error) {
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user?.token}` } };
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/orders/${orderId}/status`, { status: newStatus }, config);
            toast.success('Order status updated');
            fetchOrders(); // refresh data
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Update failed');
        }
    };

    if (loading) return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin h-10 w-10 border-b-2 border-gold rounded-full"></div></div>;

    return (
        <div className="bg-light min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="font-playfair text-3xl mb-8 border-b border-gold/20 pb-4">Manage Orders</h1>

                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-8">
                    <Link href="/admin" className="px-6 py-2 bg-white border border-gold/20 text-dark hover:bg-dark hover:text-white transition-colors text-sm tracking-widest font-medium uppercase">Dashboard</Link>
                    <Link href="/admin/orders" className="px-6 py-2 bg-dark text-white text-sm tracking-widest font-medium uppercase">Manage Orders</Link>
                </div>

                <div className="bg-white shadow-xl border border-gold/10 p-6 md:p-8">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-4 font-medium text-sm text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="py-4 font-medium text-sm text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="py-4 font-medium text-sm text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="py-4 font-medium text-sm text-gray-500 uppercase tracking-wider">Total</th>
                                    <th className="py-4 font-medium text-sm text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="py-4 font-medium text-sm text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order: any) => (
                                    <tr key={order._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 text-sm font-medium text-dark">{order._id.substring(0, 8)}</td>
                                        <td className="py-4 text-sm text-gray-600">{order.user?.name || 'Deleted User'}</td>
                                        <td className="py-4 text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="py-4 text-sm text-gold font-playfair font-medium">${order.totalPrice.toLocaleString()}</td>
                                        <td className="py-4 text-sm">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide
                            ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                                                        order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                                'bg-gray-100 text-gray-800'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-sm">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                                disabled={order.status === 'Cancelled'}
                                                className="border border-gray-200 px-3 py-1 text-xs focus:outline-none focus:border-gold bg-transparent"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Confirmed">Confirmed</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
