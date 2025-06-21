// components/HeroCarousel.tsx
"use client"; // This directive marks the component as a Client Component

import React, { useState, useEffect, useRef, TouchEvent } from 'react';

// Define the interface for a single slide's data
interface Slide {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string; // Optional link for the slide's call to action
    buttonText: string; // Text for the call to action button
}

// Define the props for the HeroCarousel component
interface HeroCarouselProps {
    slides?: Slide[]; // Optional array of slides, falls back to default if not provided
    autoPlayInterval?: number; // Optional interval for auto-play in milliseconds
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({
    slides: propSlides, // Rename prop to avoid conflict with local variable
    autoPlayInterval = 5000, // Default auto-play interval to 5 seconds
}) => {
    // Default slides if no slides are provided via props
    const defaultSlides: Slide[] = [
        {
            id: 1,
            title: 'Explore Virtual Worlds',
            description: 'Immerse yourself in breathtaking augmented and virtual reality experiences.',
            imageUrl: 'https://cdn.shopify.com/s/files/1/0070/7032/articles/how_20to_20make_20candles_dbda933c-ca25-4131-bec6-cf3075c17631.png?v=1746372774&originalWidth=1848&originalHeight=782&width=1800',
            linkUrl: '#projects',
            buttonText: 'View Projects',
        },
        {
            id: 2,
            title: 'Build Innovative Apps',
            description: 'Crafting cutting-edge mobile and web applications with modern technologies.',
            imageUrl: 'https://i.pinimg.com/736x/60/88/31/60883159a30bf76f526147879efc936d.jpg',
            linkUrl: '#services',
            buttonText: 'Our Services',
        },
        {
            id: 3,
            title: 'Secure Blockchain Solutions',
            description: 'Developing decentralized applications and secure blockchain integrations.',
            imageUrl: 'https://i.pinimg.com/736x/1a/8a/b3/1a8ab347896bd8131f8fb3f14d3f623a.jpg',
            linkUrl: '#contact',
            buttonText: 'Get in Touch',
        },
    ];

    // Use propSlides if provided, otherwise use defaultSlides
    const slides = propSlides && propSlides.length > 0 ? propSlides : defaultSlides;

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const touchStartX = useRef<number | null>(null); // To store the starting X position of touch

    // Function to reset the auto-play timer
    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    // Effect for auto-playing the carousel
    useEffect(() => {
        resetTimeout(); // Clear any existing timeout
        timeoutRef.current = setTimeout(
            () =>
                setCurrentSlideIndex((prevIndex) =>
                    prevIndex === slides.length - 1 ? 0 : prevIndex + 1
                ),
            autoPlayInterval
        );

        // Cleanup function: clear timeout when component unmounts or dependencies change
        return () => resetTimeout();
    }, [currentSlideIndex, slides.length, autoPlayInterval]);

    // Navigate to the previous slide
    const goToPrevSlide = () => {
        resetTimeout();
        setCurrentSlideIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    // Navigate to the next slide
    const goToNextSlide = () => {
        resetTimeout();
        setCurrentSlideIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Navigate to a specific slide using the indicator dots
    const goToSlide = (index: number) => {
        resetTimeout();
        setCurrentSlideIndex(index);
    };

    // --- Touch Event Handlers for Swiping ---
    const handleTouchStart = (e: TouchEvent) => {
        // Store the initial touch X coordinate
        touchStartX.current = e.touches[0].clientX;
        resetTimeout(); // Pause auto-play during manual swipe
    };

    const handleTouchMove = (e: TouchEvent) => {
        // Prevent default vertical scrolling behavior when swiping horizontally
        // This makes horizontal swiping smoother, but might interfere with vertical page scroll if not handled carefully.
        // For a hero section that's full height, this is generally okay.
        e.preventDefault();
    };

    const handleTouchEnd = (e: TouchEvent) => {
        if (touchStartX.current === null) return; // Exit if touch start wasn't recorded

        const touchEndX = e.changedTouches[0].clientX;
        const swipeDistance = touchStartX.current - touchEndX; // Positive if swiped left, negative if swiped right
        const minSwipeDistance = 50; // Minimum distance for a recognized swipe

        if (swipeDistance > minSwipeDistance) {
            goToNextSlide(); // Swiped left
        } else if (swipeDistance < -minSwipeDistance) {
            goToPrevSlide(); // Swiped right
        }

        touchStartX.current = null; // Reset touch start position
    };

    return (
        // Adjusted height: h-[65vh] for mobile (default), md:h-screen for larger screens
        <div
            className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-gray-950 text-gray-100"
            onTouchStart={handleTouchStart} // Add touch start listener
            onTouchMove={handleTouchMove}   // Add touch move listener
            onTouchEnd={handleTouchEnd}     // Add touch end listener
        >
            {/* Carousel Slides */}
            <div className="relative w-full h-full">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out
                            ${index === currentSlideIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                        {/* Background Image - Reduced brightness to 50% for better text visibility */}
                        <img
                            src={slide.imageUrl}
                            alt={slide.title}
                            className="w-full h-full object-cover brightness-50"
                            onError={(e) => {
                                // Fallback for image loading error
                                e.currentTarget.src = `https://placehold.co/1200x600/31363F/EEEEEE?text=Image+Load+Error`;
                            }}
                        />
                        {/* Overlay Content */}
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent flex flex-col justify-center items-center text-center p-4 md:p-8">
                            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
                                {slide.title}
                            </h2>
                            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8 drop-shadow-md">
                                {slide.description}
                            </p>
                            <a
                                href={slide.linkUrl}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                {slide.buttonText}
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons removed as per request */}
            {/*
            <button
                onClick={goToPrevSlide}
                className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 bg-gray-800/60 hover:bg-gray-700/80 text-white p-3 rounded-full shadow-lg transition-colors duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Previous slide"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 bg-gray-800/60 hover:bg-gray-700/80 text-white p-3 rounded-full shadow-lg transition-colors duration-300 z-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Next slide"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
            */}

            {/* Indicator Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-300
                            ${index === currentSlideIndex ? 'bg-blue-600' : 'bg-gray-500 hover:bg-gray-400'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
