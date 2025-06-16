'use client';

import React, { useState } from 'react';

/**
 * LoginPage Component
 * Provides a user authentication interface with toggleable Login and Sign-up forms.
 * Includes a "Sign in with Google" button and matches the existing theme.
 * Now includes a responsive illustration visible on larger screens.
 */
export default function LoginPage() {
  // State to toggle between login and sign-up modes
  const [isLoginMode, setIsLoginMode] = useState(true);
  // State for form input values
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // State for displaying messages to the user (e.g., success/error)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | '', text: string }>({ type: '', text: '' });

  /**
   * Handles the form submission for both login and sign-up.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage({ type: '', text: '' }); // Clear previous messages

    if (isLoginMode) {
      // Login logic (simulated)
      console.log('Logging in with:', { email, password });
      setTimeout(() => {
        if (email === 'test@example.com' && password === 'password') {
          setMessage({ type: 'success', text: 'Login Successful!' });
          // In a real app, you would redirect or set user context (e.g., store token)
        } else {
          setMessage({ type: 'error', text: 'Invalid email or password.' });
        }
      }, 1000);
    } else {
      // Sign-up logic (simulated)
      if (password !== confirmPassword) {
        setMessage({ type: 'error', text: 'Passwords do not match.' });
        return;
      }
      console.log('Signing up with:', { name, phoneNumber, email, password });
      setTimeout(() => {
        setMessage({ type: 'success', text: 'Sign-up Successful! You can now log in.' });
        setIsLoginMode(true); // Switch to login mode after successful sign-up
        // Clear all form fields after successful sign-up
        setName('');
        setPhoneNumber('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }, 1000);
    }
  };

  /**
   * Handles the Google sign-in button click.
   */
  const handleGoogleSignIn = () => {
    console.log('Signing in with Google...');
    setMessage({ type: 'success', text: 'Redirecting to Google for sign-in...' });
    // In a real app, you would initiate a Firebase Google Auth popup/redirect here
    // Example: signInWithPopup(auth, googleProvider);
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="max-w-6xl w-full h-auto mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-xl overflow-hidden shadow-lg">
        {/* Left Section: Illustration (Hidden on mobile, visible on large screens) */}
        <div className="hidden  lg:block p-8 h-full min-h-[500px] flex items-center justify-center rounded-l-xl">
          {/* Using a placeholder image for illustration */}
          <img
            src="https://www.radliving.in/cdn/shop/products/rad5062.jpg?v=1663946515" // Dark background, yellow text
            alt="Welcome Illustration"
            className="w-full h-auto max-w-sm rounded-lg  shadow-md"
            onError={(e) => {
              // Fallback for image loading error
              e.currentTarget.src = "https://placehold.co/500x500/3f3f46/facc15?text=Illustration+Error";
            }}
          />
        </div>

        {/* Right Section: Login/Sign-up Form */}
        <div className="bg-zinc-900 p-6 sm:p-8 w-full h-full flex flex-col justify-center lg:rounded-r-xl lg:rounded-l-none rounded-xl"> {/* Added flex-col and justify-center for vertical alignment */}
          <h2 className="text-3xl font-bold mb-6 text-center">
            {isLoginMode ? 'Welcome Back!' : 'Create Account'}
          </h2>

          {/* Message Display Area */}
          {message.text && (
            <div className={`p-3 rounded-md text-center mb-4 ${
              message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode && (
              <>
                {/* Name Field (Sign Up Only) */}
                <div>
                  <label htmlFor="name" className="block text-zinc-300 text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="John Doe"
                    required
                  />
                </div>
                {/* Phone Number Field (Sign Up Only) */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-zinc-300 text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    placeholder="123-456-7890"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-zinc-300 text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-zinc-300 text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                placeholder="********"
                required
              />
            </div>

            {!isLoginMode && (
              <div>
                <label htmlFor="confirmPassword" className="block text-zinc-300 text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="********"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="mt-4 bg-yellow-400 text-black px-6 py-3 rounded-full font-bold w-full text-lg hover:bg-yellow-300 transition-colors duration-200 shadow-lg"
            >
              {isLoginMode ? 'Log In' : 'Sign Up'}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-zinc-700"></div>
            <span className="flex-shrink mx-4 text-zinc-500">OR</span>
            <div className="flex-grow border-t border-zinc-700"></div>
          </div>

          {/* Google Auth Button */}
          <button
            onClick={handleGoogleSignIn}
            className="bg-zinc-800 text-white px-6 py-3 rounded-full font-bold w-full text-lg hover:bg-zinc-700 transition-colors duration-200 flex items-center justify-center gap-3 shadow-lg"
          >
            {/* Google Icon SVG */}
            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M44.5 24c0-2.3-0.2-4.5-0.6-6.6H24v12.5h11.8c-0.8 4.1-3.3 7.6-7.1 10V39h7.4c4.3-4.1 7.3-9.8 7.3-16z" fill="#4285F4"/>
              <path d="M24 44.5c6.5 0 12-2.1 16-5.8l-7.4-5.7c-2.1 1.4-4.8 2.2-8.6 2.2-6.6 0-12.1-4.4-14.1-10.4H2.6v7.7C6.7 40.7 14.7 44.5 24 44.5z" fill="#34A853"/>
              <path d="M9.9 27.5c-0.5-1.5-0.8-3.1-0.8-4.8s0.3-3.3 0.8-4.8V9.9H2.6C1.1 14.2 0 18.9 0 24c0 5.1 1.1 9.8 2.6 14.1L9.9 27.5z" fill="#FBBC04"/>
              <path d="M24 9.5c3.5 0 6.6 1.2 9.1 3.5l6.3-6.3c-3.9-3.7-9-5.9-15.4-5.9-9.3 0-17.3 3.8-23.4 11.2L9.9 18.2C11.9 12.2 17.4 7.8 24 7.8z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </button>

          <p className="text-center text-zinc-400 text-sm mt-6">
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setMessage({ type: '', text: '' }); // Clear messages on toggle
                // Clear all form fields when toggling mode
                setName('');
                setPhoneNumber('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
              }}
              className="text-yellow-400 hover:underline font-semibold"
            >
              {isLoginMode ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
