'use client';

import { useState, useEffect } from 'react';

// Define a type for a cart item for better type safety
interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number; // This will be the price per unit in the cart
  quantity: number;
}

/**
 * CartPage Component
 * Displays a simulated shopping cart with items, quantities, and a total.
 * Allows users to increase/decrease quantity or remove items.
 */
export default function CartPage() {
  // Simulate cart items. In a real application, these would come from global state or a database.
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Candle 1',
      image: 'https://www.radliving.in/cdn/shop/products/rad5062.jpg?v=1663946515',
      price: 399,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Candle 3',
      image: 'https://www.radliving.in/cdn/shop/products/rad5062.jpg?v=1663946515',
      price: 459,
      quantity: 1,
    },
    {
      id: 3,
      name: 'Candle 5',
      image: 'https://www.radliving.in/cdn/shop/products/rad5062.jpg?v=1663946515',
      price: 519,
      quantity: 3,
    },
  ]);

  // Calculate the total price of all items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  /**
   * Handles increasing the quantity of a specific cart item.
   * @param {number} id - The ID of the item to update.
   */
  const increaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  /**
   * Handles decreasing the quantity of a specific cart item.
   * If quantity becomes 0, the item is removed from the cart.
   * @param {number} id - The ID of the item to update.
   */
  const decreaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      ).filter(item => item.quantity > 0) // Remove if quantity goes to 0
    );
  };

  /**
   * Handles removing a specific item from the cart.
   * @param {number} id - The ID of the item to remove.
   */
  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-8 px-2 sm:py-12 sm:px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg text-center mx-2 sm:mx-0">
            <p className="text-lg sm:text-xl text-zinc-400">Your cart is empty!</p>
            <p className="mt-3 sm:mt-4 text-zinc-500 text-sm sm:text-base">Add some lovely candles from the product page.</p>
          </div>
        ) : (
          <div className="bg-zinc-900 p-4 sm:p-6 rounded-xl shadow-lg mx-2 sm:mx-0">
            {/* Cart Items List */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-zinc-800 py-3 sm:py-4 last:border-b-0 flex-nowrap gap-2 sm:gap-4 overflow-x-auto" // Changed to flex-nowrap and added overflow-x-auto
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0"> {/* Added flex-shrink-0 */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-shrink-0"> {/* Added flex-shrink-0 to prevent wrapping of text */}
                    <h3 className="text-base sm:text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-none">{item.name}</h3> {/* Added text truncation for very small screens */}
                    <p className="text-xs sm:text-sm text-zinc-400 whitespace-nowrap">₹{item.price.toFixed(2)} / item</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-0 ml-auto flex-shrink-0"> {/* Added flex-shrink-0 */}
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-zinc-800 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-md hover:bg-zinc-700 transition-colors duration-200 text-sm flex-shrink-0"
                  >
                    -
                  </button>
                  <span className="text-base sm:text-lg font-medium w-5 sm:w-6 text-center flex-shrink-0">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-zinc-800 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-md hover:bg-zinc-700 transition-colors duration-200 text-sm flex-shrink-0"
                  >
                    +
                  </button>
                </div>

                <div className="text-right flex-shrink-0 mt-3 sm:mt-0"> {/* Added flex-shrink-0 */}
                  <p className="text-lg sm:text-xl font-semibold text-yellow-400 whitespace-nowrap">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-400 text-xs sm:text-sm mt-1 whitespace-nowrap"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Cart Total Summary */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-800 flex justify-between items-center">
              <span className="text-xl sm:text-2xl font-bold">Total:</span>
              <span className="text-2xl sm:text-3xl font-bold text-yellow-400">₹{calculateTotal().toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button className="mt-6 sm:mt-8 bg-yellow-400 text-black px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-bold w-full text-base sm:text-lg hover:bg-yellow-300 transition-colors duration-200 shadow-lg">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
