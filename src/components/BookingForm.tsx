
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { CalendarIcon } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Link } from 'react-router-dom';

const services = [
  { id: 'basic-wash', name: 'Basic Wash & Vacuum', price: '$49.99' },
  { id: 'full-detail', name: 'Full Interior & Exterior Detail', price: '$149.99' },
  { id: 'window-tint', name: 'Window Tinting', price: '$299.99' },
  { id: 'ceramic-coat', name: 'Ceramic Coating', price: '$599.99' },
  { id: 'paint-correction', name: 'Paint Correction', price: '$399.99' },
];

const vehicleTypes = [
  { id: 'car', name: 'Cars, Trucks, Vans and SUVs', icon: '🚗' },
  { id: 'motorcycle', name: 'Motorcycles, Scooters, ATVs, UTVs, Golf Carts', icon: '🏍️' },
  { id: 'rv', name: 'RVs, Travel Trailers, and Buses', icon: '🚐' },
  { id: 'boat', name: 'Boats and Personal Watercraft', icon: '🚤' },
  { id: 'semi', name: 'Semi Trucks', icon: '🚛' },
];

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

interface VehicleInfo {
  make: string;
  model: string;
  year: string;
  color: string;
}

interface Utilities {
  hasWater: boolean;
  hasElectricity: boolean;
  hasCoveredArea: boolean;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: Date | undefined;
  time: string;
  vehicleType: string;
  vehicle: VehicleInfo;
  address: string;
  notes: string;
  utilities: Utilities;
  issues: string[];
}

const BookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: undefined,
    time: '',
    vehicleType: '',
    vehicle: {
      make: '',
      model: '',
      year: '',
      color: '',
    },
    address: '',
    notes: '',
    utilities: {
      hasWater: false,
      hasElectricity: false,
      hasCoveredArea: false
    },
    issues: []
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'vehicle') {
        setFormData(prev => ({
          ...prev,
          vehicle: {
            ...prev.vehicle,
            [child]: value
          }
        }));
      } else if (parent === 'utilities') {
        setFormData(prev => ({
          ...prev,
          utilities: {
            ...prev.utilities,
            [child]: value === 'on'
          }
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'utilities') {
        setFormData(prev => ({
          ...prev,
          utilities: {
            ...prev.utilities,
            [child]: checked
          }
        }));
      }
    }
  };

  const handleIssueChange = (issue: string) => {
    setFormData(prev => {
      const issues = [...prev.issues];
      if (issues.includes(issue)) {
        return { ...prev, issues: issues.filter(i => i !== issue) };
      } else {
        return { ...prev, issues: [...issues, issue] };
      }
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    setFormData(prev => ({ ...prev, date }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
  };

  const handleVehicleTypeSelect = (type: string) => {
    setFormData(prev => ({ ...prev, vehicleType: type }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setShowConfirmation(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      date: undefined,
      time: '',
      vehicleType: '',
      vehicle: {
        make: '',
        model: '',
        year: '',
        color: '',
      },
      address: '',
      notes: '',
      utilities: {
        hasWater: false,
        hasElectricity: false,
        hasCoveredArea: false
      },
      issues: []
    });
    setCurrentStep(1);
  };

  const getStepClass = (step: number) => {
    if (step < currentStep) return "bg-green-500";
    if (step === currentStep) return "bg-green-500";
    return "bg-gray-300";
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 px-6 pt-6">
          <div className={`flex-1 h-2 ${getStepClass(1)}`}></div>
          <div className={`flex-1 h-2 ${getStepClass(2)}`}></div>
          <div className={`flex-1 h-2 ${getStepClass(3)}`}></div>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">
            Step {currentStep}: {currentStep === 1 ? "Select your services" : currentStep === 2 ? "Date/Time" : "All about you!"}
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {/* Step 1: Services */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-fade-in">
              {/* Vehicle Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicleTypes.map((type) => (
                  <div 
                    key={type.id}
                    onClick={() => handleVehicleTypeSelect(type.id)}
                    className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
                      formData.vehicleType === type.id ? 'border-green-500 shadow-md bg-gray-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-3xl mb-2">{type.icon}</div>
                    <div className="text-center text-sm">{type.name}</div>
                  </div>
                ))}
              </div>

              {formData.vehicleType && (
                <>
                  {/* Vehicle Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label htmlFor="vehicle.year" className="block text-gray-700 mb-1 text-sm">Year</label>
                      <input 
                        type="text" 
                        id="vehicle.year"
                        name="vehicle.year"
                        value={formData.vehicle.year}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="vehicle.make" className="block text-gray-700 mb-1 text-sm">Make</label>
                      <input 
                        type="text" 
                        id="vehicle.make"
                        name="vehicle.make"
                        value={formData.vehicle.make}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="vehicle.model" className="block text-gray-700 mb-1 text-sm">Model</label>
                      <input 
                        type="text" 
                        id="vehicle.model"
                        name="vehicle.model"
                        value={formData.vehicle.model}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="vehicle.color" className="block text-gray-700 mb-1 text-sm">Color</label>
                      <input 
                        type="text" 
                        id="vehicle.color"
                        name="vehicle.color"
                        value={formData.vehicle.color}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="border rounded-lg divide-y">
                    {services.map((service) => (
                      <div 
                        key={service.id}
                        className="p-4 flex items-center justify-between cursor-pointer"
                        onClick={() => setFormData(prev => ({ ...prev, service: service.id }))}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id={service.id}
                            name="service"
                            checked={formData.service === service.id}
                            onChange={() => {}} // Handled by onClick on parent div
                            className="mr-3 h-5 w-5 accent-green-500"
                          />
                          <label htmlFor={service.id} className="cursor-pointer">
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-gray-500">Professional service with top quality products</div>
                          </label>
                        </div>
                        <div className="font-semibold">{service.price}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              <div className="flex justify-between pt-4">
                <div></div>
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded"
                  disabled={!formData.vehicleType || !formData.service}
                >
                  Next Step →
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 2: Date & Time */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-gray-700 mb-2">Select a Date*</label>
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
                        className={cn("p-3")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Select a Time*</label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={cn(
                          "py-2 px-3 text-sm border rounded-md text-center",
                          formData.time === time
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-white text-gray-700 border-gray-300 hover:border-green-500"
                        )}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  onClick={prevStep}
                  variant="outline"
                  className="border-gray-300"
                >
                  ← Previous Step
                </Button>
                <Button 
                  type="button" 
                  onClick={nextStep}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded"
                  disabled={!formData.date || !formData.time}
                >
                  Next Step →
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 3: Personal Info & Location */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1 text-sm">Full Name*</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1 text-sm">Email*</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-1 text-sm">Mobile Phone*</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Mobile phone confirmation is required to book online.</p>
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="block text-gray-700 mb-1">Service Address (where we should meet you)*</label>
                <input 
                  type="text" 
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Enter full address"
                  required
                />
              </div>
              
              {/* Utilities Availability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="font-medium text-sm">Is WATER available at the FRONT of your location?</p>
                  <div className="flex items-center">
                    <input 
                      type="checkbox"
                      id="utilities.hasWater"
                      name="utilities.hasWater"
                      checked={formData.utilities.hasWater}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-4 w-4 accent-green-500"
                    />
                    <label htmlFor="utilities.hasWater">Yes, water is available</label>
                  </div>
                  <p className="text-xs text-green-600">Not required to book your service!</p>
                </div>
              
                <div className="space-y-1">
                  <p className="font-medium text-sm">Is ELECTRICITY available at the FRONT of your location?</p>
                  <div className="flex items-center">
                    <input 
                      type="checkbox"
                      id="utilities.hasElectricity"
                      name="utilities.hasElectricity"
                      checked={formData.utilities.hasElectricity}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-4 w-4 accent-green-500"
                    />
                    <label htmlFor="utilities.hasElectricity">Yes, electricity is available</label>
                  </div>
                  <p className="text-xs text-green-600">Not required to book your service!</p>
                </div>
              
                <div className="space-y-1">
                  <p className="font-medium text-sm">Is a GARAGE or COVERED work area available at your location?</p>
                  <div className="flex items-center">
                    <input 
                      type="checkbox"
                      id="utilities.hasCoveredArea"
                      name="utilities.hasCoveredArea"
                      checked={formData.utilities.hasCoveredArea}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-4 w-4 accent-green-500"
                    />
                    <label htmlFor="utilities.hasCoveredArea">Yes, a covered area is available</label>
                  </div>
                  <p className="text-xs text-green-600">Not required to book your service!</p>
                </div>
              </div>
              
              {/* Vehicle Issues */}
              <div>
                <p className="font-medium text-sm mb-2">Does your vehicle have any of the following issues?</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Excessive hair',
                    'Mold/mildew',
                    'Human or animal waste',
                    'Heavy soilage/stains',
                    'Pet odors',
                    'Tree sap',
                    'Exterior hard water spots',
                    'Overspray (paint, concrete, tar, chemical, etc)'
                  ].map((issue) => (
                    <div key={issue} className="flex items-center">
                      <input 
                        type="checkbox"
                        id={issue}
                        checked={formData.issues.includes(issue)}
                        onChange={() => handleIssueChange(issue)}
                        className="mr-2 h-4 w-4 accent-green-500"
                      />
                      <label htmlFor={issue}>{issue}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-gray-700 mb-1 text-sm">Special Instructions (optional)</label>
                <textarea 
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  placeholder="Any special requests or information we should know"
                />
              </div>
              
              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  onClick={prevStep}
                  variant="outline"
                  className="border-gray-300"
                >
                  ← Previous Step
                </Button>
                <Button 
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded flex items-center"
                  disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.address}
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
      
      {/* Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={closeConfirmation}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Booking Confirmed!</DialogTitle>
            <DialogDescription className="text-center">
              Thank you for booking with Decent Auto Detailing.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-lg">Your appointment details:</p>
              <p className="font-medium">{formData.date ? format(formData.date, "PPP") : ''} at {formData.time}</p>
              <p>Service: {services.find(s => s.id === formData.service)?.name}</p>
              <p>{formData.vehicle.make} {formData.vehicle.model} ({formData.vehicle.year})</p>
            </div>
            <p className="text-center text-gray-600">
              We've sent a confirmation email to <span className="font-medium">{formData.email}</span>.<br/>
              Our team will contact you soon to confirm all details.
            </p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Link to="/">
              <Button className="bg-skyblue hover:bg-blue-500">Return to Home</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingForm;
