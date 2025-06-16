'use client';

import { useState, useEffect } from 'react';

// Define the OrderDetail interface for consistency
interface OrderDetail {
  id: string;
  date: string;
  total: number;
  status: string;
  items: number;
  productImage: string;
  trackingNumber: string;
  shippingAddress: string;
  timeline: { status: string; date: string; location?: string }[];
  products: { name: string; quantity: number; price: number; image: string }[];
}

// Mock detailed order data for demonstration
const mockDetailedOrders: { [key: string]: OrderDetail } = {
  'ORD001': {
    id: 'ORD001',
    date: '2023-11-01',
    total: 749,
    status: 'Delivered',
    items: 2,
    productImage: 'https://placehold.co/50x50/facc15/3f3f46?text=P1',
    trackingNumber: 'TRK123456789',
    shippingAddress: '123 Candle Street, Scentville, CA 90210',
    timeline: [
      { status: 'Order Placed', date: '2023-11-01 10:00 AM' },
      { status: 'Confirmed', date: '2023-11-01 11:30 AM' },
      { status: 'Shipped', date: '2023-11-02 03:00 PM', location: 'Warehouse A' },
      { status: 'In Transit', date: '2023-11-03 09:00 AM', location: 'Shipping Hub B' },
      { status: 'Out for Delivery', date: '2023-11-04 07:00 AM', location: 'Local Distribution Center' },
      { status: 'Delivered', date: '2023-11-04 02:15 PM', location: 'Customer Address' },
    ],
    products: [
      { name: 'Sandalwood Bliss Candle', quantity: 1, price: 499, image: 'https://www.radliving.in/cdn/shop/products/rad5062.jpg?v=1663946515' },
      { name: 'Lavender Dream Candle', quantity: 1, price: 250, image: 'https://placehold.co/50x50/a78bfa/3f3f46?text=P2' },
    ],
  },
  'ORD002': {
    id: 'ORD002',
    date: '2024-01-20',
    total: 1299,
    status: 'Processing',
    items: 3,
    productImage: 'https://placehold.co/50x50/a78bfa/3f3f46?text=P2',
    trackingNumber: 'TRK987654321',
    shippingAddress: '123 Candle Street, Scentville, CA 90210',
    timeline: [
      { status: 'Order Placed', date: '2024-01-20 09:00 AM' },
      { status: 'Confirmed', date: '2024-01-20 10:15 AM' },
      { status: 'Processing', date: '2024-01-21 02:00 PM' },
    ],
    products: [
      { name: 'Ocean Breeze Diffuser', quantity: 1, price: 650, image: 'https://placehold.co/50x50/a78bfa/3f3f46?text=Diffuser' },
      { name: 'Rose & Sandalwood Wax Melts', quantity: 2, price: 320, image: 'https://placehold.co/50x50/f87171/3f3f46?text=Wax+Melts' },
    ],
  },
  'ORD003': {
    id: 'ORD003',
    date: '2024-03-05',
    total: 450,
    status: 'Cancelled',
    items: 1,
    productImage: 'https://placehold.co/50x50/f87171/3f3f46?text=P3',
    trackingNumber: 'TRK112233445',
    shippingAddress: '123 Candle Street, Scentville, CA 90210',
    timeline: [
      { status: 'Order Placed', date: '2024-03-05 08:00 AM' },
      { status: 'Cancelled by Customer', date: '2024-03-05 09:30 AM' },
    ],
    products: [
      { name: 'Citrus Burst Candle', quantity: 1, price: 450, image: 'https://placehold.co/50x50/f87171/3f3f46?text=P3' },
    ],
  },
};

interface TrackOrderDetailsPageProps {
  orderId: string;
  onBack: () => void; // Callback to go back to the profile page
}

/**
 * TrackOrderDetailsPage Component
 * Displays detailed tracking information for a specific order.
 * Fetches mock data based on the provided orderId.
 */
export default function TrackOrderDetailsPage({ orderId, onBack }: TrackOrderDetailsPageProps) {
  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching order details from an API
    setLoading(true);
    setError(null);
    const fetchedOrder = mockDetailedOrders[orderId];
    if (fetchedOrder) {
      setOrder(fetchedOrder);
    } else {
      setError('Order details not found.');
    }
    setLoading(false);
  }, [orderId]);

  if (loading) {
    return (
      <div className="bg-zinc-950 text-white min-h-screen flex items-center justify-center font-sans">
        <p className="text-xl">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-zinc-950 text-white min-h-screen flex flex-col items-center justify-center font-sans">
        <p className="text-xl text-red-400">{error}</p>
        <button
          onClick={onBack}
          className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
        >
          Back to Profile
        </button>
      </div>
    );
  }

  if (!order) {
    return null; // Should not happen if error handling is correct, but for safety
  }

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Profile
        </button>

        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-yellow-400">Order Tracking: {order.id}</h1>
        <p className="text-center text-zinc-400 mb-8">Tracking Number: <span className="font-semibold text-yellow-300">{order.trackingNumber}</span></p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary Card */}
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-300">Order Summary</h3>
            <div className="space-y-3 text-zinc-300">
              <p><strong>Order Date:</strong> {order.date}</p>
              <p><strong>Order Total:</strong> <span className="text-yellow-400">₹{order.total}</span></p>
              <p><strong>Current Status:</strong> <span className={`font-semibold ${order.status === 'Delivered' ? 'text-green-400' : order.status === 'Processing' ? 'text-blue-400' : 'text-red-400'}`}>{order.status}</span></p>
              <p><strong>Items:</strong> {order.items}</p>
              <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
            </div>
          </div>

          {/* Order Timeline Card */}
          <div className="bg-zinc-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-300">Tracking Timeline</h3>
            <div className="relative border-l-2 border-zinc-600 pl-6 space-y-6">
              {order.timeline.map((event, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-zinc-900 font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="font-semibold text-zinc-200">{event.status}</p>
                  <p className="text-zinc-400 text-sm">{event.date}</p>
                  {event.location && <p className="text-zinc-500 text-xs">Location: {event.location}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ordered Products Card */}
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg mt-8">
          <h3 className="text-2xl font-semibold mb-4 text-yellow-300">Ordered Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {order.products.map((product, index) => (
              <div key={index} className="bg-zinc-700 p-3 rounded-md flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-md"
                  onError={(e) => { e.currentTarget.src = 'https://placehold.co/64x64/3f3f46/facc15?text=Prod'; }}
                />
                <div>
                  <p className="font-semibold text-zinc-200">{product.name}</p>
                  <p className="text-zinc-400 text-sm">Quantity: {product.quantity}</p>
                  <p className="text-yellow-400 font-medium">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
