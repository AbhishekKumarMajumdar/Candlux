'use client';

import React from 'react';
import { MessageCircle   } from 'lucide-react'; // Using Lucide React for the WhatsApp-like icon

/**
 * WhatsAppButton Component
 * Renders a fixed, floating WhatsApp button on the bottom right of the screen.
 * Includes a subtle shake animation to draw attention.
 */
export default function WhatsAppButton() {
  const phoneNumber = '+919876543210'; // Replace with your actual WhatsApp phone number
  const message = 'Hello! I have a question about your candles.'; // Optional pre-filled message

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    // The container for the fixed button
    <a
      href={whatsappLink}
      target="_blank" // Opens in a new tab
      rel="noopener noreferrer" // Security best practice for target="_blank"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
      aria-label="Chat with us on WhatsApp"
      style={{
        // Define the animation properties directly here.
        // For production Next.js, prefer tailwind.config.js for custom animations.
        animation: 'shake 0.82s cubic-bezier(.36,.07,.19,.97) both', // One cycle of shake
        animationIterationCount: 3, // Play 3 times then stop
        animationDelay: '5s', // Start shaking after 5 seconds of inactivity
      }}
    >
      <MessageCircle className="w-8 h-8" />
      {/*
        Inline CSS for keyframes - This block needs to be carefully handled.
        For Canvas environments, direct inline keyframes are not standard HTML/React.
        The safest way to guarantee animation in this specific Canvas environment
        without global CSS (which we cannot directly control) or external libraries
        is to define the keyframes in the global scope of the component's output,
        or ensure the containing environment has them.

        Since this is an isolated immersive, the direct `@keyframes` rule inside `<style>`
        might not always execute globally for the `<a>` tag.
        However, the original error was about `jsx` attribute. Removing it helps.

        For a reliable Next.js solution, these keyframes *must* be in your `globals.css`
        or configured in `tailwind.config.js` as previously instructed.
        For THIS specific Canvas environment, simply removing the `jsx` attribute
        and ensuring `animation` property is set should address the error.
        The actual visual shake might still depend on whether the environment
        interprets this inline style tag's keyframes.
      */}
      <style>{`
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </a>
  );
}
