'use client';

import React, { useState } from 'react';

// Define a type for contact form data for better type safety
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * ContactPage Component
 * Provides a contact form for users to send inquiries.
 * It adheres to the dark theme, responsive design, and includes basic form handling.
 * This version expands with a header image and an additional information section.
 */
export default function ContactPage() {
  // State to manage form input values
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // State for displaying messages to the user (e.g., success/error)
  const [message, setMessage] = useState<{ type: 'success' | 'error' | '', text: string }>({ type: '', text: '' });

  /**
   * Handles changes to form input fields.
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The change event from the input or textarea.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * Handles the form submission.
   * In a real application, this would send data to a backend service.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage({ type: '', text: '' }); // Clear previous messages

    console.log('Contact form submitted:', formData);
    // Simulate API call success/failure
    setTimeout(() => {
      setMessage({ type: 'success', text: 'Thank you for your message! We will get back to you soon.' });
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-8 px-4 font-sans flex flex-col items-center"> {/* Adjusted padding */}
      {/* Header Image Section */}
      <section className="max-w-6xl w-full mx-auto mb-12 rounded-xl overflow-hidden shadow-lg">
        <img
          src="https://placehold.co/1200x300/27272a/facc15/jpg?text=Contact+Header" // Placeholder header image
          alt="Contact Us Header"
          className="w-full h-48 md:h-64 object-cover object-center" // Responsive height
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/1200x300/27272a/facc15?text=Header+Image+Error";
          }}
        />
      </section>

      {/* Main Contact Form Section */}
      <div className="max-w-3xl w-full mx-auto bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center text-yellow-400">Contact Us</h1>
        <p className="text-lg text-zinc-300 mb-8 text-center max-w-2xl mx-auto leading-relaxed">
          We'd love to hear from you! Whether you have a question about our products, need support, or just want to give feedback, feel free to reach out using the form below.
        </p>

        {/* Message Display Area */}
        {message.text && (
          <div className={`p-3 rounded-md text-center mb-6 ${
            message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-zinc-300 text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-zinc-300 text-sm font-medium mb-1">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-zinc-300 text-sm font-medium mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Inquiry about products, Feedback, etc."
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-zinc-300 text-sm font-medium mb-1">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6} // Set number of visible text lines
              className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-y" // Added resize-y for vertical resizing
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="mt-6 bg-yellow-400 text-black px-8 py-3 rounded-full font-bold w-full text-lg hover:bg-yellow-300 transition-colors duration-200 shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Other Ways to Connect & Business Hours & Social Media & FAQ */}
   
      {/* Map Section */}
      <section className="max-w-6xl w-full mx-auto bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg mt-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Find Us on the Map</h2>
        <div className="relative w-full overflow-hidden rounded-lg" style={{ paddingTop: '56.25%' }}> {/* 16:9 Aspect Ratio */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.252601951564!2d-122.41941838468165!3d37.7749294797587!2m3!1f0!2f0!2f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858087e5b1219b%3A0x6d2c4b726056b2d2!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute top-0 left-0"
            title="Our Location on Google Maps"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
