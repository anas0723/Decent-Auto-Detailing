
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const createBubble = () => {
      if (heroRef.current) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Random position, size and animation duration
        const size = Math.random() * 60 + 10;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 8 + 4;
        
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDuration = `${animationDuration}s`;
        bubble.style.animationDelay = `${Math.random() * 2}s`;
        
        heroRef.current.appendChild(bubble);
        
        // Remove bubble after animation completes
        setTimeout(() => {
          if (bubble.parentNode === heroRef.current) {
            heroRef.current.removeChild(bubble);
          }
        }, animationDuration * 1000);
      }
    };
    
    // Create bubbles at intervals
    const bubbleInterval = setInterval(createBubble, 600);
    
    return () => clearInterval(bubbleInterval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center bubble-animation overflow-hidden" ref={heroRef}>
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-skyblue/10 to-white/80"></div>
      </div>
      
      <div className="container mx-auto px-4 z-10 pt-20">
        <div className="flex flex-col items-center justify-center text-center">
          <img 
            src="/lovable-uploads/94633a65-8c03-4ec9-baa6-e32863575a36.png" 
            alt="Decent Auto Detailing" 
            className="w-72 md:w-96 mb-8 animate-float"
          />
          
          <h1 className="text-4xl md:text-6xl font-bold text-darkblack mb-6">
            Get a Showroom Shine,<br />
            <span className="text-skyblue">Anytime, Anywhere!</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mb-10">
            Professional mobile detailing service that comes to you. We bring the top-quality products 
            and skilled expertise right to your doorstep.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/booking" 
              className="bg-skyblue text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-blue-500 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl shine-effect"
            >
              Book Now
            </Link>
            <Link 
              to="/services/mobile-detailing" 
              className="bg-white text-darkblack px-8 py-3 rounded-full text-lg font-medium border-2 border-skyblue hover:bg-skyblue hover:text-white transition-all transform hover:-translate-y-1"
            >
              Our Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
