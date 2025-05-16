
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon, Clock } from 'lucide-react';

const services = [
  { id: 'basic-wash', name: 'Basic Wash & Vacuum', price: '$49.99' },
  { id: 'full-detail', name: 'Full Interior & Exterior Detail', price: '$149.99' },
  { id: 'window-tint', name: 'Window Tinting', price: '$299.99' },
  { id: 'ceramic-coat', name: 'Ceramic Coating', price: '$599.99' },
  { id: 'paint-correction', name: 'Paint Correction', price: '$399.99' },
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: undefined as Date | undefined,
    time: '',
    vehicle: {
      make: '',
      model: '',
      year: '',
      color: '',
    },
    address: '',
    notes: '',
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Booking Successful!",
        description: "We'll confirm your appointment shortly.",
      });
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: undefined,
        time: '',
        vehicle: {
          make: '',
          model: '',
          year: '',
          color: '',
        },
        address: '',
        notes: '',
      });
      
      setCurrentStep(1);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
      <form onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2">Full Name*</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skyblue"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2">Email*</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skyblue"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number*</label>
                <input 
                  type="tel" 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skyblue"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-gray-700 mb-2">Service*</label>
                <select 
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skyblue"
                  required
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.price}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button 
                type="button" 
                onClick={nextStep}
                className="bg-skyblue hover:bg-blue-500 text-white shine-effect"
                disabled={!formData.name || !formData.email || !formData.phone || !formData.service}
              >
                Next Step
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 2: Schedule */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">Schedule Your Appointment</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Date*</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={handleDateSelect}
                      disabled={(date) => {
                        // Disable past dates and Sundays
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today || date.getDay() === 0;
                      }}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Time*</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      className={cn(
                        "py-2 px-3 text-sm border rounded-md text-center",
                        formData.time === time
                          ? "bg-skyblue text-white border-skyblue"
                          : "bg-white text-gray-700 border-gray-300 hover:border-skyblue"
                      )}
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button 
                type="button" 
                onClick={prevStep}
                variant="outline"
              >
                Previous Step
              </Button>
              <Button 
                type="button" 
                onClick={nextStep}
                className="bg-skyblue hover:bg-blue-500 text-white shine-effect"
                disabled={!formData.date || !formData.time}
              >
                Next Step
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 3: Vehicle Details */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">Vehicle Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="vehicle.make" className="block text-gray-700 mb-2">Make*</label>
                <input 
                  type="text" 
                  id="vehicle.make"
                  name="vehicle.make"
                  value={formData.vehicle.make}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skyblue"
                  placeholder="Toyota, Honda, BMW, etc."
                  required
                />
              </div>
              
              <div>
                <label htmlFor="vehicle.model" className="block text-gray-700 mb-2">Model*</label>
                <input 
                  type="text" 
                  id="vehicle.model"
                  name="vehicle.model"
                  value={formData.vehicle.model}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skyblue"
                  placeholder="Camry, Civic, 3 Series, etc."
                  required
                />
              </div>
              
              <div>
                <label htmlFor="vehicle.year" className="block text-gray-700 mb-2">Year*</label>
                <input 
                  type="text" 
                  id="vehicle.year"
                  name="vehicle.year"
                  value={formData.vehicle.year}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skyblue"
                  placeholder="2020, 2021, etc."
                  required
                />
              </div>
              
              <div>
                <label htmlFor="vehicle.color" className="block text-gray-700 mb-2">Color</label>
                <input 
                  type="text" 
                  id="vehicle.color"
                  name="vehicle.color"
                  value={formData.vehicle.color}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skyblue"
                  placeholder="Black, White, Silver, etc."
                />
              </div>
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button 
                type="button" 
                onClick={prevStep}
                variant="outline"
              >
                Previous Step
              </Button>
              <Button 
                type="button" 
                onClick={nextStep}
                className="bg-skyblue hover:bg-blue-500 text-white shine-effect"
                disabled={!formData.vehicle.make || !formData.vehicle.model || !formData.vehicle.year}
              >
                Next Step
              </Button>
            </div>
          </div>
        )}
        
        {/* Step 4: Location & Notes */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-2xl font-bold mb-6">Location & Additional Information</h3>
            
            <div>
              <label htmlFor="address" className="block text-gray-700 mb-2">Service Address (for mobile detailing)*</label>
              <input 
                type="text" 
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skyblue"
                placeholder="Enter full address"
                required
              />
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-gray-700 mb-2">Special Instructions (optional)</label>
              <textarea 
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-skyblue"
                placeholder="Any special requests or information we should know"
              />
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button 
                type="button" 
                onClick={prevStep}
                variant="outline"
              >
                Previous Step
              </Button>
              <Button 
                type="submit"
                className="bg-skyblue hover:bg-blue-500 text-white shine-effect flex items-center"
                disabled={isSubmitting || !formData.address}
              >
                {isSubmitting && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isSubmitting ? 'Processing...' : 'Complete Booking'}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
