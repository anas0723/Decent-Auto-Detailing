"use client";

import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/lovable-uploads/94633a65-8c03-4ec9-baa6-e32863575a36.png" 
              alt="Decent Auto Detailing" 
              width={56}
              height={56}
              className="h-12 md:h-14 w-auto"
            />
          </Link>
          
          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden text-darkblack">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="text-darkblack font-medium hover:text-skyblue transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-skyblue after:transition-all hover:after:w-full focus:outline-none inline-flex items-center">
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuItem>
                  <Link href="/services/mobile-detailing" className="w-full">
                    Mobile Detailing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/services/window-tint" className="w-full">
                    Window Tint
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/services/ceramic-coating" className="w-full">
                    Ceramic Coating
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <NavLink href="/gallery">Gallery</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <Link 
              href="/booking" 
              className="bg-skyblue text-white px-6 py-2 rounded-full hover:bg-blue-500 transition-colors shine-effect"
            >
              Book Now
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <MobileNavLink href="/" onClick={toggleMenu}>Home</MobileNavLink>
              
              {/* Mobile Services Menu */}
              <div className="relative">
                <div 
                  className="flex justify-between items-center text-darkblack font-medium py-2 border-b border-gray-100"
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                >
                  <span>Services</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </div>
                
                {isServicesOpen && (
                  <div className="pl-4 py-2 space-y-2 bg-gray-50">
                    <MobileNavLink href="/services/mobile-detailing" onClick={toggleMenu}>
                      Mobile Detailing
                    </MobileNavLink>
                    <MobileNavLink href="/services/window-tint" onClick={toggleMenu}>
                      Window Tint
                    </MobileNavLink>
                    <MobileNavLink href="/services/ceramic-coating" onClick={toggleMenu}>
                      Ceramic Coating
                    </MobileNavLink>
                  </div>
                )}
              </div>
              
              <MobileNavLink href="/gallery" onClick={toggleMenu}>Gallery</MobileNavLink>
              <MobileNavLink href="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
              <Link 
                href="/booking" 
                onClick={toggleMenu}
                className="bg-skyblue text-white py-2 px-4 rounded-full text-center mt-2"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <Link 
    href={href} 
    className="text-darkblack font-medium hover:text-skyblue transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-skyblue after:transition-all hover:after:w-full"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ 
  href, 
  children, 
  onClick 
}: { 
  href: string, 
  children: React.ReactNode,
  onClick: () => void
}) => (
  <Link 
    href={href} 
    onClick={onClick}
    className="text-darkblack font-medium py-2 border-b border-gray-100 hover:text-skyblue transition-colors"
  >
    {children}
  </Link>
);

export default Navbar;
