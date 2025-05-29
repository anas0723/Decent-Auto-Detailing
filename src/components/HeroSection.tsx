"use client";

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const createBubble = () => {
      
    };
    
    // Create bubbles at intervals
    const bubbleInterval = setInterval(createBubble, 600);
    
    return () => clearInterval(bubbleInterval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" ref={heroRef}>
      {/* Background layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-skyblue/10 to-white/80"></div>
      </div>
      
      {/* Content layer */}
      <div className="container mx-auto px-4 z-10 text-center space-y-8 w-full">
        <div className="relative w-72 md:w-96 h-72 md:h-96 mx-auto flex items-center justify-center">
          <Image
            src="/lovable-uploads/94633a65-8c03-4ec9-baa6-e32863575a36.png"
            alt="Decent Auto Detailing"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 288px, 384px"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-darkblack">
          Get a Showroom Shine,<br />
          <span className="text-skyblue">Anytime, Anywhere!</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Professional mobile detailing service that comes to you. We bring the top-quality products 
          and skilled expertise right to your doorstep.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/booking" 
            className="bg-skyblue text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-500 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl shine-effect"
          >
            Book Now
          </Link>
          <Link 
            href="/services/mobile-detailing" 
            className="bg-white text-darkblack px-8 py-3 rounded-full text-lg font-medium border-2 border-skyblue hover:bg-skyblue hover:text-white transition-all transform hover:-translate-y-1"
          >
            Our Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
