
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/94633a65-8c03-4ec9-baa6-e32863575a36.png" 
              alt="Decent Auto Detailing" 
              className="h-12 md:h-14"
            />
          </Link>
          
          {/* Mobile menu button */}
          <button onClick={toggleMenu} className="md:hidden text-darkblack">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/services/mobile-detailing">Mobile Detailing</NavLink>
            <NavLink to="/services/window-tint">Window Tint</NavLink>
            <NavLink to="/services/ceramic-coating">Ceramic Coating</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <Link 
              to="/booking" 
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
              <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
              <MobileNavLink to="/services/mobile-detailing" onClick={toggleMenu}>Mobile Detailing</MobileNavLink>
              <MobileNavLink to="/services/window-tint" onClick={toggleMenu}>Window Tint</MobileNavLink>
              <MobileNavLink to="/services/ceramic-coating" onClick={toggleMenu}>Ceramic Coating</MobileNavLink>
              <MobileNavLink to="/gallery" onClick={toggleMenu}>Gallery</MobileNavLink>
              <MobileNavLink to="/contact" onClick={toggleMenu}>Contact</MobileNavLink>
              <Link 
                to="/booking" 
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

const NavLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <Link 
    to={to} 
    className="text-darkblack font-medium hover:text-skyblue transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-skyblue after:transition-all hover:after:w-full"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ 
  to, 
  children, 
  onClick 
}: { 
  to: string, 
  children: React.ReactNode,
  onClick: () => void
}) => (
  <Link 
    to={to} 
    onClick={onClick}
    className="text-darkblack font-medium py-2 border-b border-gray-100 hover:text-skyblue transition-colors"
  >
    {children}
  </Link>
);

export default Navbar;
