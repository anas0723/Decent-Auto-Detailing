
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const services = {
  'mobile-detailing': {
    title: 'Mobile Auto Detailing',
    description: 'Our comprehensive mobile detailing service brings the professional car wash experience to your doorstep.',
    content: `
      <p>Our mobile detailing service is the perfect solution for busy professionals, families, and anyone who values their time. We bring all necessary equipment, products, and expertise directly to your location—whether that's your home, office, or anywhere else that's convenient for you.</p>
      
      <h3>What's Included:</h3>
      <ul>
        <li><strong>Exterior Wash & Dry</strong> - Hand wash using pH-balanced soaps and microfiber washing mitts</li>
        <li><strong>Wheel & Tire Cleaning</strong> - Complete cleaning of wheels, wheel wells, and tire dressing</li>
        <li><strong>Window Cleaning</strong> - Crystal clear windows inside and out</li>
        <li><strong>Interior Vacuum & Dusting</strong> - Complete interior vacuum and dusting of all surfaces</li>
        <li><strong>Dashboard & Console Detailing</strong> - Cleaning and conditioning of all interior surfaces</li>
        <li><strong>Leather Treatment</strong> - Cleaning and conditioning of leather surfaces</li>
      </ul>
      
      <h3>Benefits of Mobile Detailing:</h3>
      <ul>
        <li><strong>Convenience</strong> - No need to drive to a detailing shop or wait while your car is being serviced</li>
        <li><strong>Personalized Service</strong> - One-on-one attention from our detailing professionals</li>
        <li><strong>Premium Products</strong> - We use only high-quality detailing products</li>
        <li><strong>Time Savings</strong> - Keep working or relaxing while we detail your vehicle</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1619252584172-a83a949b6efd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    beforeAfter: [
      {
        before: 'https://images.unsplash.com/photo-1600359738432-965f29a48329?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        after: 'https://images.unsplash.com/photo-1575844611398-2a68400b437c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        caption: 'Interior Transformation'
      },
      {
        before: 'https://images.unsplash.com/photo-1562910643-428720a013e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        after: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        caption: 'Exterior Shine'
      }
    ],
    testimonials: [
      {
        name: 'Michael J.',
        quote: 'I was amazed at how convenient the service was. They showed up at my office, and by lunch break, my car looked brand new!',
        rating: 5
      },
      {
        name: 'Sarah T.',
        quote: 'The attention to detail was incredible. They got stains out that I thought would never come clean.',
        rating: 5
      }
    ]
  },
  'window-tint': {
    title: 'Window Tinting Services',
    description: 'Professional window tinting for improved comfort, privacy, and protection.',
    content: `
      <p>Our professional window tinting service provides multiple benefits beyond just the stylish appearance. We use high-quality films that block harmful UV rays, reduce heat, and increase privacy.</p>
      
      <h3>Benefits of Our Window Tinting:</h3>
      <ul>
        <li><strong>UV Protection</strong> - Blocks up to 99% of harmful UV rays, protecting your skin and interior</li>
        <li><strong>Heat Reduction</strong> - Keeps your car cooler in summer by blocking solar heat</li>
        <li><strong>Glare Reduction</strong> - Improves driving safety by reducing eye strain</li>
        <li><strong>Privacy</strong> - Prevents prying eyes from seeing inside your vehicle</li>
        <li><strong>Interior Protection</strong> - Prevents fading and cracking of your dashboard and upholstery</li>
        <li><strong>Enhanced Appearance</strong> - Gives your vehicle a sleek, sophisticated look</li>
      </ul>
      
      <h3>Our Tinting Process:</h3>
      <ol>
        <li><strong>Consultation</strong> - We discuss your needs and legal tinting limits in your area</li>
        <li><strong>Window Preparation</strong> - We thoroughly clean your windows to ensure perfect application</li>
        <li><strong>Precision Cutting</strong> - Each film is precisely cut to fit your specific window dimensions</li>
        <li><strong>Professional Installation</strong> - Expert application with no bubbles or imperfections</li>
        <li><strong>Curing</strong> - Instructions on care during the initial curing period</li>
      </ol>
    `,
    image: 'https://images.unsplash.com/photo-1562275211-9543b6c8cca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    beforeAfter: [
      {
        before: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        after: 'https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        caption: 'Window Tint Application'
      }
    ],
    testimonials: [
      {
        name: 'Robert K.',
        quote: 'The window tint has made a huge difference in the summer heat. My car stays much cooler and the installation was flawless.',
        rating: 5
      },
      {
        name: 'Emily L.',
        quote: 'Very professional service and the tint looks fantastic. No bubbles or imperfections.',
        rating: 5
      }
    ]
  },
  'ceramic-coating': {
    title: 'Ceramic Coating Protection',
    description: 'Long-lasting protection for your vehicle with advanced ceramic coating technology.',
    content: `
      <p>Ceramic coating is a high-performance liquid polymer that bonds with your vehicle's paint, creating a protective layer that offers superior protection compared to traditional waxes and sealants.</p>
      
      <h3>Benefits of Ceramic Coating:</h3>
      <ul>
        <li><strong>Long-lasting Protection</strong> - Lasts years rather than weeks or months like traditional waxes</li>
        <li><strong>Hydrophobic Properties</strong> - Water beads and rolls off the surface, carrying dirt with it</li>
        <li><strong>Chemical Resistance</strong> - Protection against environmental contaminants</li>
        <li><strong>UV Protection</strong> - Prevents oxidation and fading from the sun</li>
        <li><strong>Enhanced Gloss</strong> - Creates a deeper, more reflective shine</li>
        <li><strong>Easier Cleaning</strong> - Dirt and grime don't bond to the surface as easily</li>
      </ul>
      
      <h3>Our Ceramic Coating Process:</h3>
      <ol>
        <li><strong>Paint Correction</strong> - We remove swirl marks, scratches, and imperfections</li>
        <li><strong>Surface Preparation</strong> - Deep cleaning to remove all contaminants</li>
        <li><strong>Coating Application</strong> - Precise application by certified professionals</li>
        <li><strong>Curing Process</strong> - Controlled environment for optimal bonding</li>
        <li><strong>Final Inspection</strong> - Quality check to ensure perfect application</li>
      </ol>
    `,
    image: 'https://images.unsplash.com/photo-1606577924006-27d39b132ae2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    beforeAfter: [
      {
        before: 'https://images.unsplash.com/photo-1544739313-6fad02c82fc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        after: 'https://images.unsplash.com/photo-1516511932045-9178639c26b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        caption: 'Paint Protection'
      }
    ],
    testimonials: [
      {
        name: 'David R.',
        quote: 'The ceramic coating has been a game-changer. Six months in and my car still looks like it just came from the detailer.',
        rating: 5
      },
      {
        name: 'Jessica M.',
        quote: 'Worth every penny! My car's paint has never looked this good, and it's so much easier to keep clean now.',
        rating: 5
      }
    ]
  }
};

const Service = () => {
  const { serviceId } = useParams<{ serviceId: keyof typeof services }>();
  const service = serviceId && services[serviceId] ? services[serviceId] : null;
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Animation on scroll
    const handleScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementHeight = element.getBoundingClientRect().height;
        
        if (elementTop < window.innerHeight - elementHeight / 2) {
          element.classList.add('visible');
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [serviceId]);
  
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <p>The service you're looking for doesn't exist.</p>
          <Link to="/" className="text-skyblue hover:underline">Return to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="pt-16">
        {/* Hero Banner */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-darkblack/60 to-transparent flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-white text-3xl md:text-5xl font-bold mb-4">{service.title}</h1>
              <p className="text-white text-xl max-w-2xl">{service.description}</p>
            </div>
          </div>
        </div>
        
        {/* Service Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="prose lg:prose-xl fade-in" dangerouslySetInnerHTML={{ __html: service.content }} />
            
            {/* Before & After */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 fade-in">Before & After</h2>
              <div className="space-y-12">
                {service.beforeAfter.map((item, index) => (
                  <div key={index} className="fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
                          <img 
                            src={item.before} 
                            alt={`Before ${item.caption}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="bg-darkblack text-white px-4 py-2">
                            <span>Before</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
                          <img 
                            src={item.after} 
                            alt={`After ${item.caption}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="bg-skyblue text-white px-4 py-2">
                            <span>After</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-gray-600">{item.caption}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Testimonials */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-8 fade-in">What Our Customers Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.testimonials.map((testimonial, index) => (
                  <div 
                    key={index} 
                    className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-skyblue fade-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                    <p className="font-semibold">{testimonial.name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA */}
            <div className="mt-16 bg-gray-50 rounded-2xl p-8 text-center fade-in">
              <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Vehicle?</h2>
              <p className="text-gray-600 mb-6">
                Book your appointment today and experience the Decent Auto Detailing difference.
              </p>
              <Link
                to="/booking"
                className="bg-skyblue text-white px-8 py-3 rounded-full inline-block font-medium hover:bg-blue-500 transition-colors shine-effect"
              >
                Book This Service
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Service;
