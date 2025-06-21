'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();

  const [isLoginMode, setIsLoginMode] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Redirect logged-in users from /login to /profile
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check-session');
        const data = await res.json();
        if (data.loggedIn) {
          router.push('/profile');
        }
      } catch (error) {
        console.error('Session check failed', error);
      }
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoginMode) {
      const loginPromise = fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Login failed');
        return data;
      });

      toast.promise(loginPromise, {
        loading: 'Logging in...',
        success: 'Login successful!',
        error: (err) => err.message,
      }).then(() => {
        router.push('/profile');
      });
    } else {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match.');
        return;
      }

      const signupPromise = fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phoneNumber, email, password }),
      }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Signup failed');
        return data;
      });

      toast.promise(signupPromise, {
        loading: 'Creating account...',
        success: 'Signup successful! Check your email for OTP.',
        error: (err) => err.message,
      }).then(() => {
        setIsLoginMode(true);
        setName('');
        setPhoneNumber('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      });
    }
  };

  const handleGoogleSignIn = () => {
    toast.success('Redirecting to Google sign-in...');
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center rounded-xl overflow-hidden shadow-lg">
        <div className="hidden lg:block p-8 h-full min-h-[500px] flex items-center justify-center rounded-l-xl">
          <img
            src="https://www.radliving.in/cdn/shop/products/rad5062.jpg?v=1663946515"
            alt="Welcome Illustration"
            className="w-full h-auto max-w-sm rounded-lg shadow-md"
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/500x500/3f3f46/facc15?text=Illustration+Error';
            }}
          />
        </div>

        <div className="bg-zinc-900 p-6 sm:p-8 w-full h-full flex flex-col justify-center lg:rounded-r-xl lg:rounded-l-none rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {isLoginMode ? 'Welcome Back!' : 'Create Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginMode && (
              <>
                <div>
                  <label htmlFor="name" className="block text-zinc-300 text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-zinc-300 text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-zinc-300 text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700"
                required
              />
            </div>

            {!isLoginMode && (
              <div>
                <label htmlFor="confirmPassword" className="block text-zinc-300 text-sm font-medium mb-1">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 rounded-md bg-zinc-800 border border-zinc-700"
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
            <span className="mx-4 text-zinc-500">OR</span>
            <div className="flex-grow border-t border-zinc-700"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="bg-zinc-800 text-white px-6 py-3 rounded-full font-bold w-full text-lg hover:bg-zinc-700 transition-colors duration-200 flex items-center justify-center gap-3 shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#4285F4" d="M44.5 24c0-2.3-0.2-4.5-0.6-6.6H24v12.5h11.8c-0.8 4.1-3.3 7.6-7.1 10V39h7.4c4.3-4.1 7.3-9.8 7.3-16z" />
              <path fill="#34A853" d="M24 44.5c6.5 0 12-2.1 16-5.8l-7.4-5.7c-2.1 1.4-4.8 2.2-8.6 2.2-6.6 0-12.1-4.4-14.1-10.4H2.6v7.7C6.7 40.7 14.7 44.5 24 44.5z" />
              <path fill="#FBBC04" d="M9.9 27.5c-0.5-1.5-0.8-3.1-0.8-4.8s0.3-3.3 0.8-4.8V9.9H2.6C1.1 14.2 0 18.9 0 24c0 5.1 1.1 9.8 2.6 14.1L9.9 27.5z" />
              <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.5l6.3-6.3c-3.9-3.7-9-5.9-15.4-5.9-9.3 0-17.3 3.8-23.4 11.2L9.9 18.2C11.9 12.2 17.4 7.8 24 7.8z" />
            </svg>
            Sign in with Google
          </button>

          <p className="text-center text-zinc-400 text-sm mt-6">
            {isLoginMode ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
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
