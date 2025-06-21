'use client';

import { useState } from 'react';
import { User, ShoppingBag, Gift, Settings, Edit2 } from 'lucide-react'; // Icons for navigation


const mockUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '9876543210',
  address: '123 Candle Street, Scentville, CA 90210',
  joinDate: 'January 15, 2023',
  orders: [
    { id: 'ORD001', date: '2023-11-01', total: 749, status: 'Delivered', items: 2, productImage: 'https://placehold.co/50x50/facc15/3f3f46?text=P1' },
    { id: 'ORD002', date: '2024-01-20', total: 1299, status: 'Processing', items: 3, productImage: 'https://placehold.co/50x50/a78bfa/3f3f46?text=P2' },
    { id: 'ORD003', date: '2024-03-05', total: 450, status: 'Cancelled', items: 1, productImage: 'https://placehold.co/50x50/f87171/3f3f46?text=P3' },
  ],
  coupons: [
    { id: 'SAVE10', code: 'SAVE10PERCENT', discount: '10%', expires: '2024-12-31', status: 'Active' },
    { id: 'FREESHIP', code: 'SHIPFREE', discount: 'Free Shipping', expires: '2024-06-30', status: 'Active' },
    { id: 'WELCOME20', code: 'NEWUSER20', discount: '20%', expires: '2023-09-15', status: 'Expired' },
  ],
};


export default function ProfilePage() {
  // State to manage the active tab: 'details', 'orders', 'coupons', 'settings'
  const [activeTab, setActiveTab] = useState('details');
  // State for editable profile fields
  const [editableProfile, setEditableProfile] = useState({
    name: mockUserData.name,
    email: mockUserData.email,
    phone: mockUserData.phone,
    address: mockUserData.address,
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

 
  const handleSaveProfile = () => {
    console.log('Saving profile:', editableProfile);
    alert('Profile saved successfully!');
   
    setIsEditingProfile(false);
  };

  /**
   * Handles input changes for editable profile fields.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event.
   */
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableProfile((prev) => ({ ...prev, [name]: value }));
  };

  /**
  
   * @param {string} orderId - The ID of the order to track.
   */
  const handleTrackOrder = (orderId: string) => {
    alert(`Tracking details for Order ID: ${orderId}`);
    console.log(`Tracking details for Order ID: ${orderId}`);
    // Implement actual tracking logic here (e.g., navigate to /orders/${orderId}/track)
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-12 px-4 font-sans">
      <div className="max-w-6xl mx-auto bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-yellow-400">Your Profile</h1>

        {/* Profile Header Section (simplified without image) */}
        <div className="flex flex-col items-center gap-4 mb-8 pb-6 border-b border-zinc-700">
          <h2 className="text-2xl font-semibold">{mockUserData.name}</h2>
          <p className="text-zinc-400">{mockUserData.email}</p>
          <p className="text-zinc-500 text-sm">Member since {mockUserData.joinDate}</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`flex items-center px-6 py-2 rounded-full font-medium transition-colors duration-200 ${activeTab === 'details' ? 'bg-yellow-400 text-black shadow-md' : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'}`}
          >
            <User className="w-5 h-5 mr-2" /> Personal Details
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center px-6 py-2 rounded-full font-medium transition-colors duration-200 ${activeTab === 'orders' ? 'bg-yellow-400 text-black shadow-md' : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'}`}
          >
            <ShoppingBag className="w-5 h-5 mr-2" /> Orders
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`flex items-center px-6 py-2 rounded-full font-medium transition-colors duration-200 ${activeTab === 'coupons' ? 'bg-yellow-400 text-black shadow-md' : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'}`}
          >
            <Gift className="w-5 h-5 mr-2" /> Coupons
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center px-6 py-2 rounded-full font-medium transition-colors duration-200 ${activeTab === 'settings' ? 'bg-yellow-400 text-black shadow-md' : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'}`}
          >
            <Settings className="w-5 h-5 mr-2" /> Account Settings
          </button>
        </div>

        {/* --- Tab Content - Each section now its own card --- */}
        <div className="space-y-6"> {/* Added space-y for gap between cards if needed */}
          {activeTab === 'details' && (
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg"> {/* Card for Personal Details */}
              <h3 className="text-2xl font-semibold mb-4 text-yellow-300">Personal Details</h3>
              <div className="space-y-4">
                <p><strong>Name:</strong> {mockUserData.name}</p>
                <p><strong>Email:</strong> {mockUserData.email}</p>
                <p><strong>Phone:</strong> {mockUserData.phone}</p>
                <p><strong>Address:</strong> {mockUserData.address}</p>
                <button
                  onClick={() => { setActiveTab('settings'); setIsEditingProfile(true); }}
                  className="mt-4 bg-yellow-500 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-colors flex items-center"
                >
                  <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
                </button>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg"> {/* Card for Orders */}
              <h3 className="text-2xl font-semibold mb-4 text-yellow-300">My Orders</h3>
              {mockUserData.orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-zinc-700 rounded-md overflow-hidden">
                    <thead> {/* Correctly wrap the header row */}
                      <tr className="bg-zinc-600 text-zinc-200 text-left">
                        <th className="px-4 py-3">Order ID</th>
                        <th className="px-4 py-3">Image</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Total</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Items</th>
                        <th className="px-4 py-3">Action</th>
                      </tr>
                    </thead>
                    <tbody> {/* Correctly wrap the body rows */}
                      {mockUserData.orders.map((order) => (
                        <tr key={order.id} className="border-b border-zinc-600 last:border-b-0 hover:bg-zinc-700">
                          <td className="px-4 py-3 font-medium">{order.id}</td>
                          <td className="px-4 py-3">
                            {order.productImage && (
                              <img
                                src={order.productImage}
                                alt={`Product for ${order.id}`}
                                className="w-10 h-10 rounded-md object-cover"
                                onError={(e) => { e.currentTarget.src = 'https://placehold.co/50x50/3f3f46/facc15?text=NoImg'; }}
                              />
                            )}
                          </td>
                          <td className="px-4 py-3 text-zinc-300">{order.date}</td>
                          <td className="px-4 py-3 text-yellow-400">₹{order.total}</td>
                          <td className={`px-4 py-3 ${order.status === 'Delivered' ? 'text-green-400' : order.status === 'Processing' ? 'text-blue-400' : 'text-red-400'}`}>
                            {order.status}
                          </td>
                          <td className="px-4 py-3 text-zinc-300">{order.items}</td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => handleTrackOrder(order.id)}
                              className="bg-yellow-500 text-black text-sm px-3 py-1 rounded-full hover:bg-yellow-400 transition-colors"
                            >
                              Track Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-zinc-400">You haven't placed any orders yet.</p>
              )}
            </div>
          )}

          {activeTab === 'coupons' && (
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg"> {/* Card for Coupons */}
              <h3 className="text-2xl font-semibold mb-4 text-yellow-300">My Coupons</h3>
              {mockUserData.coupons.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mockUserData.coupons.map((coupon) => (
                    <div key={coupon.id} className={`bg-zinc-700 p-4 rounded-lg shadow flex flex-col justify-between ${coupon.status === 'Expired' ? 'opacity-60 grayscale' : ''}`}>
                      <div>
                        <p className="text-xl font-bold text-yellow-300">{coupon.discount}</p>
                        <p className="text-zinc-300">Code: <span className="font-semibold">{coupon.code}</span></p>
                        <p className="text-zinc-400 text-sm">Expires: {coupon.expires}</p>
                      </div>
                      <div className="mt-2 text-right">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${coupon.status === 'Active' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                          {coupon.status}
                        </span>
                        {coupon.status === 'Active' && (
                          <button
                            onClick={() => {
                                // Using document.execCommand('copy') for clipboard in sandbox environment
                                const el = document.createElement('textarea');
                                el.value = coupon.code;
                                document.body.appendChild(el);
                                el.select();
                                document.execCommand('copy');
                                document.body.removeChild(el);
                                alert(`Copied coupon code: ${coupon.code}`);
                            }}
                            className="ml-2 bg-yellow-500 text-black text-sm px-3 py-1 rounded-full hover:bg-yellow-400 transition-colors"
                          >
                            Copy
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-zinc-400">You don't have any coupons right now.</p>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-zinc-800 p-6 rounded-lg shadow-lg"> {/* Card for Account Settings */}
              <h3 className="text-2xl font-semibold mb-4 text-yellow-300">Account Settings</h3>
              <div className="space-y-4">
                <h4 className="text-xl font-medium text-zinc-200 flex items-center">
                  <Edit2 className="w-5 h-5 mr-2" /> Edit Profile
                </h4>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-zinc-300 text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={editableProfile.name}
                      onChange={handleProfileChange}
                      disabled={!isEditingProfile}
                      className="w-full p-2 rounded-md bg-zinc-700 border border-zinc-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 disabled:opacity-75 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-zinc-300 text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editableProfile.email}
                      onChange={handleProfileChange}
                      disabled={!isEditingProfile}
                      className="w-full p-2 rounded-md bg-zinc-700 border border-zinc-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 disabled:opacity-75 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-zinc-300 text-sm font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={editableProfile.phone}
                      onChange={handleProfileChange}
                      disabled={!isEditingProfile}
                      className="w-full p-2 rounded-md bg-zinc-700 border border-zinc-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 disabled:opacity-75 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-zinc-300 text-sm font-medium mb-1">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      value={editableProfile.address}
                      onChange={handleProfileChange}
                      disabled={!isEditingProfile}
                      rows={3}
                      className="w-full p-2 rounded-md bg-zinc-700 border border-zinc-600 focus:border-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-opacity-50 disabled:opacity-75 disabled:cursor-not-allowed"
                    ></textarea>
                  </div>
                  <div className="flex gap-4 mt-4">
                    {!isEditingProfile ? (
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(true)}
                        className="bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-colors flex items-center"
                      >
                        <Edit2 className="w-4 h-4 mr-2" /> Edit Information
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={handleSaveProfile}
                          className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-500 transition-colors flex-1"
                        >
                          Save Changes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditingProfile(false);
                            // Reset to original data if cancel
                            setEditableProfile({
                              name: mockUserData.name,
                              email: mockUserData.email,
                              phone: mockUserData.phone,
                              address: mockUserData.address,
                            });
                          }}
                          className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-500 transition-colors flex-1"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
