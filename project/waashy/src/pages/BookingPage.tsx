import React, { useState, useEffect } from 'react';
import { ArrowLeft, Info, Plus, ArrowRight } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';

interface CartItem {
  service: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  quantity: number;
  monthlyVolume: number;
  pricePerUnit: number;
  totalMonthlyCost: number;
}

interface BookingPageProps {
  service?: {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  cart?: CartItem[];
  onBack: () => void;
}

interface Addon {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  currentPrice: number;
  image: string;
}


interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

export default function BookingPage({ service, cart, onBack }: BookingPageProps) {
  const { selectedLocation } = useLocation();
  const [step, setStep] = useState(1);
  const [professionals, setProfessionals] = useState(1);
  const [materials, setMaterials] = useState<'no' | 'yes'>('no');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [wantsSubscription, setWantsSubscription] = useState(false);
  
  // Determine if we're working with a cart or single service
  const isCartMode = cart && cart.length > 0;
  const currentService = isCartMode ? cart[currentServiceIndex]?.service : service;
  const totalServices = isCartMode ? cart.length : 1;
  
  // Validation functions for each step
  const isStep1Valid = () => {
    if (isStairCleaning) {
      return stairHouses > 0 && floorsPerStair > 0;
    }
    return monthlyVolume > 0 && professionals > 0;
  };

  const isStep2Valid = () => {
    // Step 2 (add-ons) is always valid as it's optional
    return true;
  };

  const isStep3Valid = () => {
    if (!wantsSubscription) return true; // Skip validation if no subscription wanted
    return selectedDateSlot && selectedTimeSlot;
  };

  const isStep4Valid = () => {
    if (wantsSubscription) {
      return recurringDays.length > 0 && pricePerUnit > 0;
    } else {
      return pricePerUnit > 0; // Only price required for one-time services
    }
  };

  const isCurrentStepValid = () => {
    switch (step) {
      case 1: return isStep1Valid();
      case 2: return isStep2Valid();
      case 3: return isStep3Valid();
      case 4: return isStep4Valid();
      default: return false;
    }
  };

  // Handle step progression with subscription logic
  const handleNextStep = () => {
    if (step === 2 && !wantsSubscription) {
      // Skip step 3 (subscription) if user doesn't want it
      setStep(4);
    } else {
      setStep(step + 1);
    }
  };

  // Add navigation functions for cart mode
  const handleNextService = () => {
    if (isCartMode && currentServiceIndex < totalServices - 1) {
      setCurrentServiceIndex(currentServiceIndex + 1);
      setStep(1); // Reset to first step for next service
    }
  };


  if (!currentService) {
    return <div>No service selected</div>;
  }

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedDate] = useState('09 Oct 2025');
  const [selectedDateSlot, setSelectedDateSlot] = useState('Thu 9');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('13:30-14:30');
  const [monthlyVolume, setMonthlyVolume] = useState(100);
  const [pricePerUnit, setPricePerUnit] = useState(25); // Fast pris per kvm, men kan justeras i Steg 4
  
  // Step 4 - Schedule state
  const [startDate] = useState('8 okt');
  const [scheduleTime] = useState('15:00-17:00');
  const [recurringDays, setRecurringDays] = useState<string[]>(['Mån', 'Ons', 'Fre']);
  
  // Confirmation state
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Stair cleaning specific state
  const [stairHouses, setStairHouses] = useState(1);
  const [floorsPerStair, setFloorsPerStair] = useState(4);
  const [hasElevator, setHasElevator] = useState(false);
  const [showStairDetails, setShowStairDetails] = useState(false);

  // Get unit and label based on service type
  const getServiceUnit = () => {
    const serviceTitle = currentService.title.toLowerCase();
    if (serviceTitle.includes('trapp')) {
      return { unit: 'trappor', label: 'Trappstädning (BRF)', isStairCleaning: true };
    } else if (serviceTitle.includes('golv') || serviceTitle.includes('städ')) {
      return { unit: 'kvm', label: 'Yta att städa' };
    } else if (serviceTitle.includes('tvätt') || serviceTitle.includes('kläder') || serviceTitle.includes('arbetskläder') || serviceTitle.includes('skyddskläder') || serviceTitle.includes('bordsdukar') || serviceTitle.includes('kökshanddukar') || serviceTitle.includes('förkläden') || serviceTitle.includes('mattor') || serviceTitle.includes('servetter') || serviceTitle.includes('sängkläder') || serviceTitle.includes('vårduniformer')) {
      return { unit: 'anställda', label: 'Antal anställda', isLaundryService: true };
    } else if (serviceTitle.includes('bil')) {
      return { unit: 'bilar', label: 'Antal bilar' };
    } else if (serviceTitle.includes('fönster')) {
      return { unit: 'kvm', label: 'Fönsteryta' };
    } else if (serviceTitle.includes('möbel')) {
      return { unit: 'st', label: 'Antal möbler' };
    } else {
      return { unit: 'kvm', label: 'Yta att städa' };
    }
  };

  const serviceUnit = getServiceUnit();

  // Check if service is laundry-related
  const isLaundryService = () => {
    return serviceUnit.isLaundryService || false;
  };

  // Calculate kg based on number of employees for laundry services
  const calculateLaundryWeight = (employees: number) => {
    // Standard: 2-3 kg per employee per week (arbetskläder)
    const kgPerEmployee = 2.5;
    return Math.round(employees * kgPerEmployee);
  };

  // Get capacity per hour based on service type
  const getServiceCapacity = () => {
    const serviceTitle = currentService.title.toLowerCase();
    if (serviceTitle.includes('trapp')) {
      return 50; // Trappstädning: 50 kvm/timme per städare (BRF standard)
    } else if (serviceTitle.includes('golv')) {
      return 60; // Golvvård: 60 kvm/timme per städare
    } else if (serviceTitle.includes('fönster')) {
      return 40; // Fönsterputs: 40 kvm/timme per städare
    } else if (serviceTitle.includes('möbel')) {
      return 30; // Möbelstädning: 30 kvm/timme per städare
    } else if (serviceTitle.includes('städ')) {
      return 50; // Allmän städning: 50 kvm/timme per städare
    } else {
      return 50; // Standard kapacitet
    }
  };

  // Inefficiency factor based on number of professionals
  const ineffektivitetsFaktor = (n: number) => {
    if (n <= 1) return 1;
    if (n === 2) return 1.1;
    if (n === 3) return 1.2;
    if (n === 4) return 1.3;
    return 1 + (n - 1) * 0.1;
  };

  // Price surcharge factor based on number of professionals
  const prisPåslagFaktor = (n: number) => {
    if (n <= 1) return 1.0;
    if (n === 2) return 1.05;
    if (n === 3) return 1.08;
    if (n >= 4) return 1.10;
    return 1.0;
  };

  // Advanced calculation function
  const beräknaStädJobb = ({ kvm, antalStadare, kapacitetPerTimme, prisPerKvm }: { kvm: number; antalStadare: number; kapacitetPerTimme: number; prisPerKvm: number }) => {
    if (kapacitetPerTimme <= 0 || antalStadare <= 0) return null;

    const ineff = ineffektivitetsFaktor(antalStadare);
    const tid = (kvm / kapacitetPerTimme) / antalStadare * ineff;
    const prisUtanPåslag = kvm * prisPerKvm;
    const pris = prisUtanPåslag * prisPåslagFaktor(antalStadare);

    return {
      tid: +tid.toFixed(1), // timmar
      pris: +pris.toFixed(2), // SEK
      prisUtanPåslag: +prisUtanPåslag.toFixed(2),
    };
  };

  // Stair cleaning calculation function
  const beräknaTrappstädning = ({ antalTrapphus, antalVåningar, antalStadare, harHiss }: { antalTrapphus: number; antalVåningar: number; antalStadare: number; harHiss: boolean }) => {
    if (antalTrapphus <= 0 || antalVåningar <= 0 || antalStadare <= 0) return null;

    // BRF standard: 50 m² per våning
    const standardYtaPerVåning = 50;
    const totalKvm = antalTrapphus * antalVåningar * standardYtaPerVåning;
    
    // Kapacitet: 50 m²/timme per städare
    const kapacitetPerTimme = 50;
    
    // Hiss påverkar tid (lättare att ta sig mellan våningar)
    const hissFaktor = harHiss ? 0.9 : 1.0;
    
    // Beräkna tid: totalKvm / (kapacitetPerTimme * antalStadare) * hissFaktor
    const tid = (totalKvm / (kapacitetPerTimme * antalStadare)) * hissFaktor;
    
    // BRF timpris: 300 kr/timme (standard)
    const timpris = 300;
    const prisUtanPåslag = tid * timpris;
    const pris = prisUtanPåslag * prisPåslagFaktor(antalStadare);

    return {
      tid: +tid.toFixed(1), // timmar
      pris: +pris.toFixed(2), // SEK
      prisUtanPåslag: +prisUtanPåslag.toFixed(2),
      totalKvm: +totalKvm.toFixed(0),
    };
  };

  // Calculate job details using advanced logic
  const kapacitet = getServiceCapacity();
  
  // Use different calculation for different service types
  const isStairCleaning = serviceUnit.isStairCleaning;
  const isLaundry = isLaundryService();
  
  let jobbResultat;
  if (isStairCleaning) {
    jobbResultat = beräknaTrappstädning({
      antalTrapphus: stairHouses,
      antalVåningar: floorsPerStair,
      antalStadare: professionals,
      harHiss: hasElevator,
    });
  } else if (isLaundry) {
    // For laundry services, calculate weight based on employees
    const calculatedWeight = calculateLaundryWeight(monthlyVolume);
    jobbResultat = beräknaStädJobb({
      kvm: calculatedWeight, // Use calculated weight as "kvm" for calculation
      antalStadare: professionals,
      kapacitetPerTimme: kapacitet,
      prisPerKvm: pricePerUnit,
    });
  } else {
    jobbResultat = beräknaStädJobb({
      kvm: monthlyVolume,
      antalStadare: professionals,
      kapacitetPerTimme: kapacitet,
      prisPerKvm: pricePerUnit,
    });
  }

  // Extract values for display
  const rekommenderadeTimmar = jobbResultat?.tid || 0;
  const totalPris = jobbResultat?.pris || 0;
  const prisUtanPåslag = jobbResultat?.prisUtanPåslag || 0;
  const totalKvm = (jobbResultat as any)?.totalKvm || monthlyVolume;
  const calculatedWeight = isLaundry ? calculateLaundryWeight(monthlyVolume) : 0;

  // Auto-update duration when volume or professionals change
  useEffect(() => {
    // Duration is now calculated automatically and displayed
    // No need to set state since it's calculated in real-time
  }, [monthlyVolume, professionals, rekommenderadeTimmar, isLaundryService, stairHouses, floorsPerStair, hasElevator, isStairCleaning]);

  const addons: Addon[] = [
    {
      id: 'furniture-cleaning',
      title: 'Möbelstädning',
      description: 'Djupkemrengöring av möbler och textiler.',
      originalPrice: 50,
      currentPrice: 40,
      image: '/api/placeholder/200/150'
    },
    {
      id: 'carpet-cleaning',
      title: 'Mattstädning',
      description: 'Djupkemrengöring av mattor och heltäckningsmattor.',
      originalPrice: 35,
      currentPrice: 30,
      image: '/api/placeholder/200/150'
    },
    {
      id: 'window-cleaning',
      title: 'Fönsterputs',
      description: 'Professionell fönsterputsning och fasadtvätt.',
      originalPrice: 20,
      currentPrice: 18,
      image: '/api/placeholder/200/150'
    },
    {
      id: 'workwear-rental',
      title: 'Arbetskläder & Hyra',
      description: 'Uthyrning och underhåll av arbetskläder.',
      originalPrice: 150,
      currentPrice: 120,
      image: '/api/placeholder/200/150'
    }
  ];


  const dateSlots = [
    { id: 'wed-8', label: 'Wed 8', isAvailable: true },
    { id: 'thu-9', label: 'Thu 9', isAvailable: true },
    { id: 'fri-10', label: 'Fri 10', isAvailable: true },
    { id: 'sat-11', label: 'Sat 11', isAvailable: true },
    { id: 'sun-12', label: 'Sun 12', isAvailable: false },
    { id: 'mon-13', label: 'Mon 13', isAvailable: true },
    { id: 'tue-14', label: 'Tue 14', isAvailable: true },
    { id: 'wed-15', label: 'Wed 15', isAvailable: true },
    { id: 'thu-16', label: 'Thu 16', isAvailable: true }
  ];

  const timeSlots: TimeSlot[] = [
    { id: '10-13', time: '10:00-13:00', isAvailable: true },
    { id: '12-13', time: '12:30-13:30', isAvailable: true },
    { id: '13-14', time: '13:00-14:00', isAvailable: true },
    { id: '13-14-30', time: '13:30-14:30', isAvailable: true }
  ];

  const basePrice = totalPris; // Use calculated price with surcharge
  const addonPrice = selectedAddons.reduce((total, addonId) => {
    const addon = addons.find(a => a.id === addonId);
    return total + (addon ? addon.currentPrice : 0);
  }, 0);
  const totalPrice = basePrice + addonPrice;

  const toggleAddon = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <>
          {/* Stair Cleaning Specific Fields */}
          {isStairCleaning ? (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Trappstädning (BRF)</h3>
              
              {/* Number of Stair Houses */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-blue-600">Antal trapphus</label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setStairHouses(Math.max(1, stairHouses - 1))}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      <span className="text-gray-600">-</span>
                    </button>
                    <span className="text-lg font-bold text-blue-600 w-8 text-center">{stairHouses}</span>
                    <button
                      onClick={() => setStairHouses(stairHouses + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      <span className="text-gray-600">+</span>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Ex: 1 trapphus × 4 våningar</p>
              </div>

              {/* Floors per Stair */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-blue-600">Antal våningar per trapphus</label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setFloorsPerStair(Math.max(1, floorsPerStair - 1))}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      <span className="text-gray-600">-</span>
                    </button>
                    <span className="text-lg font-bold text-blue-600 w-8 text-center">{floorsPerStair}</span>
                    <button
                      onClick={() => setFloorsPerStair(floorsPerStair + 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                    >
                      <span className="text-gray-600">+</span>
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Standard: 50 m² per våning</p>
              </div>

              {/* Elevator Question */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">Finns hiss?</h3>
                  <Info className="h-4 w-4 text-gray-400" />
                  <span className="text-xs text-gray-500">Påverkar tid/arbete</span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setHasElevator(false)}
                    className={`px-3 py-2 rounded-full border-2 transition-colors text-sm ${
                      !hasElevator
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    Nej
                  </button>
                  <button
                    onClick={() => setHasElevator(true)}
                    className={`px-3 py-2 rounded-full border-2 transition-colors text-sm ${
                      hasElevator
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    Ja
                  </button>
                </div>
              </div>

              {/* Show Details Button */}
              <div className="mb-4">
                <button
                  onClick={() => setShowStairDetails(!showStairDetails)}
                  className="text-blue-600 text-sm font-medium hover:text-blue-700"
                >
                  {showStairDetails ? 'Dölj' : 'Visa'} beräkningsdetaljer
                </button>
              </div>

              {/* Stair Details */}
              {showStairDetails && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <div className="text-sm text-blue-800">
                    <p><strong>Beräkning:</strong> {stairHouses} trapphus × {floorsPerStair} våningar × 50 m²/våning = {totalKvm} m²</p>
                    <p><strong>Kapacitet:</strong> 50 m²/timme per städare</p>
                    <p><strong>Timpris:</strong> 300 kr/timme (BRF standard)</p>
                    <p><strong>Hiss:</strong> {hasElevator ? 'Ja (10% tidsbesparing)' : 'Nej'}</p>
                  </div>
                </div>
              )}
            </div>
          ) : isLaundry ? (
            /* Laundry Service Fields */
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Anpassa din tvätttjänst</h3>
              
              {/* Number of Employees Slider */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-blue-600">{serviceUnit.label}</label>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg font-bold text-blue-600">{monthlyVolume}</span>
                    <span className="text-xs text-blue-600">{serviceUnit.unit}</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="1"
                    max="500"
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Beräknad vikt: ~{calculatedWeight} kg per vecka (2.5 kg per anställd)
                </p>
              </div>

            </div>
          ) : (
            /* Regular Service Fields */
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Anpassa din tjänst</h3>
              
              {/* Volume per Service Slider */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-blue-600">{serviceUnit.label}</label>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg font-bold text-blue-600">{monthlyVolume}</span>
                    <span className="text-xs text-blue-600">{serviceUnit.unit}</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="10"
                    max="2000"
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                  />
                </div>
              </div>

            </div>
          )}

          {/* Professionals Selection - Only for non-laundry services */}
          {!isLaundryService() && (
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-gray-900">Hur många städare behöver du?</h3>
              </div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-blue-600">Antal städare</label>
                <div className="flex items-center space-x-1">
                  <span className="text-lg font-bold text-blue-600">{professionals}</span>
                  <span className="text-xs text-blue-600">städare</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={professionals}
                  onChange={(e) => setProfessionals(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                />
              </div>
            </div>
          )}

          {/* Calculated Time Display - Only for non-laundry services */}
          {!isLaundryService() && (
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-gray-900">Beräknad tid baserat på dina val</h3>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
              
              {/* Calculated time display */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-green-800 font-medium">Automatisk beräkning för {monthlyVolume} {serviceUnit.unit} med {professionals} städare</p>
                    <p className="text-lg font-bold text-green-600">{rekommenderadeTimmar} timmar</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-green-600">Kapacitet:</p>
                    <p className="text-xs font-semibold text-green-700">{kapacitet} {serviceUnit.unit}/timme per städare</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Materials - Different for laundry vs cleaning */}
          {!isLaundryService() && (
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-gray-900">Behöver du städmaterial?</h3>
                <Info className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-500">Professionella produkter</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setMaterials('no')}
                  className={`px-3 py-2 rounded-full border-2 transition-colors text-sm ${
                    materials === 'no'
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  Nej, jag har dem
                </button>
                <button
                  onClick={() => setMaterials('yes')}
                  className={`px-3 py-2 rounded-full border-2 transition-colors text-sm ${
                    materials === 'yes'
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  Ja, tack
                </button>
              </div>
            </div>
          )}

          {/* Special Requirements */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900">Några instruktioner eller särskilda krav?</h3>
              <span className="text-xs text-gray-500">(Valfritt)</span>
            </div>
            <div className="relative">
              <textarea
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                placeholder="Exempel: Nyckel under mattan, strykning, fönsterputs, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
                maxLength={150}
              />
              <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                {specialRequirements.length}/150
              </div>
            </div>
          </div>


        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ytterligare tjänster</h2>
            <p className="text-gray-600 mb-4">Komplettera din städtjänst</p>
            
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
              {addons.map((addon) => (
                <div
                  key={addon.id}
                  className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                >
                  {/* Addon Image Placeholder */}
                  <div className="h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-t-lg flex items-center justify-center">
                    <div className="text-blue-600">
                      <Plus className="h-8 w-8" />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{addon.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{addon.description}</p>
                    <button className="text-blue-600 text-sm font-medium mb-3">Learn more</button>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">AED {addon.currentPrice}</span>
                        <span className="text-sm text-gray-400 line-through">AED {addon.originalPrice}</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleAddon(addon.id)}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                        selectedAddons.includes(addon.id)
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {selectedAddons.includes(addon.id) ? 'Added' : 'Add +'}
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Show more arrow */}
              <div className="flex-shrink-0 w-12 flex items-center justify-center">
                <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                  <ArrowRight className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }

    if (step === 3) {
      return (
        <>
          {/* Subscription Choice */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Välj typ av tjänst</h2>
            <p className="text-gray-600 mb-4">Vill du ha en engångstjänst eller prenumeration?</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => {
                  setWantsSubscription(false);
                  // Automatically proceed to next step after selecting one-time service
                  setTimeout(() => {
                    setStep(4);
                  }, 500);
                }}
                className={`p-4 rounded-lg border-2 transition-colors text-left ${
                  !wantsSubscription
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg">🔧</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Engångstjänst</h3>
                    <p className="text-sm text-gray-500">Enstaka städning eller service</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  setWantsSubscription(true);
                  // Automatically proceed to next step after selecting subscription
                  setTimeout(() => {
                    setStep(4);
                  }, 500);
                }}
                className={`p-4 rounded-lg border-2 transition-colors text-left ${
                  wantsSubscription
                    ? 'border-blue-500 bg-blue-50 text-blue-600'
                    : 'border-gray-300 text-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-lg">📅</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Prenumeration</h3>
                    <p className="text-sm text-gray-500">Regelbunden service - Spara 25%</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Subscription Benefits - Only shown if user wants subscription */}
          {wantsSubscription && (
            <div className="bg-blue-50 rounded-lg p-4 mb-6" data-subscription-benefits>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Prenumerera & Spara</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-blue-700">Få regelbunden städning 3x/vecka - Spara 25%</span>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(4)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  Anpassa Schema
                </button>
              </div>
            </div>
          )}

          {/* When would you like to start? */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">When would you like to start?</h3>
            <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
              {dateSlots.map((date) => (
                <button
                  key={date.id}
                  onClick={() => setSelectedDateSlot(date.label)}
                  disabled={!date.isAvailable}
                  className={`flex-shrink-0 w-16 h-16 rounded-full border-2 flex flex-col items-center justify-center font-semibold transition-colors ${
                    selectedDateSlot === date.label
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : date.isAvailable
                      ? 'border-gray-300 text-gray-600 hover:border-gray-400'
                      : 'border-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span className="text-xs">{date.label.split(' ')[0]}</span>
                  <span className="text-sm">{date.label.split(' ')[1]}</span>
                </button>
              ))}
            </div>
            {!selectedDateSlot && (
              <p className="text-sm text-red-600 mt-2">⚠️ Välj ett startdatum för att fortsätta</p>
            )}
          </div>

          {/* Select a start time for the chosen days */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Select a start time for the chosen days.</h3>
              <button className="text-blue-600 text-sm font-medium">See all</button>
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
              {timeSlots.map((timeSlot) => (
                <button
                  key={timeSlot.id}
                  onClick={() => setSelectedTimeSlot(timeSlot.time)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                    selectedTimeSlot === timeSlot.time
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }`}
                >
                  {timeSlot.time}
                </button>
              ))}
            </div>
            {!selectedTimeSlot && (
              <p className="text-sm text-red-600 mt-2">⚠️ Välj en starttid för att fortsätta</p>
            )}
          </div>
        </>
      );
    }

    if (step === 4) {
      return (
        <>
          {/* Service Type */}
          <div className="mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-lg">📅</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{currentService.title}</h3>
                <p className="text-sm text-gray-600">Planera din leverans</p>
              </div>
            </div>
          </div>

          {/* Start Date Selection */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">Välj startdatum (Ansvarig på plats vid uppstart)</h3>
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <span className="font-medium text-gray-900">{startDate}</span>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                Ändra
              </button>
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">🕐</span>
              <h3 className="font-semibold text-gray-900">Tid</h3>
            </div>
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <span className="font-medium text-gray-900">{scheduleTime}</span>
              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                Ändra
              </button>
            </div>
          </div>

          {/* Recurring Days Selection - Only for subscriptions */}
          {wantsSubscription && (
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Välj veckodagar för återkommande leverans</h3>
              <div className="flex space-x-2">
                {['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map((day) => (
                  <button
                    key={day}
                    onClick={() => {
                      setRecurringDays(prev => 
                        prev.includes(day) 
                          ? prev.filter(d => d !== day)
                          : [...prev, day]
                      );
                    }}
                    className={`px-3 py-2 rounded-lg border-2 transition-colors text-sm font-medium ${
                      recurringDays.includes(day)
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              {recurringDays.length === 0 && (
                <p className="text-sm text-red-600 mt-2">⚠️ Välj minst en veckodag för återkommande leverans</p>
              )}
            </div>
          )}

          {/* Bidding Section */}
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900 mb-3">Anpassa ditt pris</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-yellow-600">💰</span>
                <span className="text-sm font-medium text-yellow-800">Buda på prenumeration</span>
              </div>
              <p className="text-sm text-yellow-700 mb-3">
                Justera priset för din prenumeration. Baspris: {pricePerUnit} kr per {serviceUnit.unit}
              </p>
              
              {/* Price Adjustment Slider */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-yellow-600">Pris per {serviceUnit.unit}</label>
                  <div className="bg-yellow-100 px-2 py-1 rounded-lg">
                    <span className="text-sm font-bold text-yellow-700">{pricePerUnit}</span>
                    <span className="text-xs text-yellow-600 ml-1">kr</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={pricePerUnit}
                    onChange={(e) => setPricePerUnit(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-yellow"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5 kr</span>
                  <span>50 kr</span>
                </div>
              </div>
              
              <div className="text-xs text-yellow-600">
                💡 Tips: Lägre pris = högre chans att få uppdraget
              </div>
            </div>
            {pricePerUnit <= 0 && (
              <p className="text-sm text-red-600 mt-2">⚠️ Justera priset för att fortsätta</p>
            )}
          </div>

          {/* Important Information */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-700 text-sm font-bold">i</span>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">Viktigt att veta</h4>
                <p className="text-sm text-yellow-700">
                  Din förfrågan skickas till vår partner för godkännande. Du får bekräftelse så fort den granskats.
                </p>
              </div>
            </div>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .slider-yellow::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .slider-yellow::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #f59e0b;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Service Configuration */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <button
                onClick={() => {
                  if (step === 1) {
                    onBack(); // Go back to ServicesPage from step 1
                  } else {
                    setStep(step - 1); // Go to previous step
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <div className="text-sm text-gray-500">
                  {isCartMode ? `Tjänst ${currentServiceIndex + 1} av ${totalServices} - Steg ${step} av 4` : `Steg ${step} av 4`}
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  {step === 1 ? currentService.title : step === 2 ? 'Popular Add-ons' : step === 3 ? 'Schedule' : step === 4 ? 'Skapa schema' : currentService.title}
                </h1>
              </div>
            </div>

            {renderStepContent()}

            {/* Validation Messages */}
            {!isCurrentStepValid() && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-red-600 text-xs font-bold">!</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-800">Obligatoriska fält saknas</p>
                    <p className="text-xs text-red-700 mt-1">
                      {step === 1 && !isStep1Valid() ? "Fyll i alla obligatoriska fält ovan för att fortsätta" :
                       step === 2 && !isStep2Valid() ? "Välj tilläggstjänster (valfritt)" :
                       step === 3 && !isStep3Valid() ? "Välj datum och tid för att fortsätta" :
                       step === 4 && !isStep4Valid() ? "Välj återkommande dagar och justera pris för att fortsätta" :
                       ""}
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Right Panel - Booking & Payment Summary */}
          <div className="space-y-6">
            {/* Booking Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Booking Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Address:</span>
                  <span className="text-gray-900">{selectedLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="text-gray-900">{currentService.title}</span>
                </div>
                {isStairCleaning && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Trapphus:</span>
                    <span className="text-gray-900">{stairHouses} trapphus × {floorsPerStair} våningar</span>
                  </div>
                )}
                {isStairCleaning && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total yta:</span>
                    <span className="text-gray-900">{totalKvm} m²</span>
                  </div>
                )}
                {isLaundry && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Beräknad vikt:</span>
                    <span className="text-gray-900">{calculatedWeight} kg per vecka</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Beräknad tid:</span>
                  <span className="text-gray-900">{rekommenderadeTimmar} timmar</span>
                </div>
                {step >= 3 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date & Start Time:</span>
                    <span className="text-gray-900">{selectedDate}, {selectedTimeSlot}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Antal städare:</span>
                  <span className="text-gray-900">{professionals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Städmaterial:</span>
                  <span className="text-gray-900">{materials === 'yes' ? 'Ja' : 'Nej'}</span>
                </div>
                {step >= 2 && selectedAddons.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Add-ons:</span>
                    <span className="text-gray-900">
                      {selectedAddons.map(id => {
                        const addon = addons.find(a => a.id === id);
                        return addon?.title;
                      }).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>
              <div className="space-y-3">
                {isStairCleaning ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timpris (BRF):</span>
                      <span className="text-gray-900">300 kr/timme</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Arbetstid:</span>
                      <span className="text-gray-900">{rekommenderadeTimmar} timmar</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Baspris (utan påslag):</span>
                      <span className="text-gray-900">{prisUtanPåslag.toLocaleString()} kr</span>
                    </div>
                    {professionals > 1 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Påslag ({professionals} städare):</span>
                        <span className="text-gray-900">+{((prisPåslagFaktor(professionals) - 1) * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pris med påslag:</span>
                      <span className="text-gray-900">{basePrice.toLocaleString()} kr</span>
                    </div>
                  </>
                ) : isLaundry ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vikt per vecka:</span>
                      <span className="text-gray-900">{calculatedWeight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pris per kg:</span>
                      <span className="text-gray-900">{pricePerUnit} kr</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Baspris (utan påslag):</span>
                      <span className="text-gray-900">{prisUtanPåslag.toLocaleString()} kr</span>
                    </div>
                    {professionals > 1 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Påslag ({professionals} städare):</span>
                        <span className="text-gray-900">+{((prisPåslagFaktor(professionals) - 1) * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pris med påslag:</span>
                      <span className="text-gray-900">{basePrice.toLocaleString()} kr</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Baspris (utan påslag):</span>
                      <span className="text-gray-900">{prisUtanPåslag.toLocaleString()} kr</span>
                    </div>
                    {professionals > 1 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Påslag ({professionals} städare):</span>
                        <span className="text-gray-900">+{((prisPåslagFaktor(professionals) - 1) * 100).toFixed(0)}%</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pris med påslag:</span>
                      <span className="text-gray-900">{basePrice.toLocaleString()} kr</span>
                    </div>
                  </>
                )}
                {step >= 2 && selectedAddons.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tilläggstjänster:</span>
                    <span className="text-gray-900">{addonPrice.toLocaleString()} kr</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>{totalPrice.toLocaleString()} kr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {isCartMode && currentServiceIndex < totalServices - 1 ? (
                <div className="space-y-3">
                  {step < 4 ? (
                    <button
                      onClick={handleNextStep}
                      disabled={!isCurrentStepValid()}
                      className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${
                        isCurrentStepValid()
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isCurrentStepValid() 
                        ? `Nästa steg för ${currentService.title}` 
                        : 'Fyll i alla fält för att fortsätta'
                      }
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 text-sm font-bold">✓</span>
                          </div>
                          <span className="text-sm font-medium text-green-800">Tjänst konfigurerad!</span>
                        </div>
                        <p className="text-xs text-green-700">
                          Denna tjänst är klar. Gå vidare till nästa tjänst med navigationsknapparna ovan.
                        </p>
                      </div>
                      <button
                        onClick={handleNextService}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                      >
                        Gå vidare till nästa tjänst →
                      </button>
                    </div>
                  )}
                </div>
              ) : isCartMode && currentServiceIndex === totalServices - 1 ? (
                <div className="space-y-3">
                  {step < 4 ? (
                    <button
                      onClick={handleNextStep}
                      disabled={!isCurrentStepValid()}
                      className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${
                        isCurrentStepValid()
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isCurrentStepValid() 
                        ? `Nästa steg för ${currentService.title}` 
                        : 'Fyll i alla fält för att fortsätta'
                      }
                    </button>
                  ) : (
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 text-sm font-bold">🎉</span>
                          </div>
                          <span className="text-sm font-medium text-green-800">Alla tjänster konfigurerade!</span>
                        </div>
                        <p className="text-xs text-green-700">
                          Du har nu konfigurerat alla {totalServices} tjänster. Klicka nedan för att skicka in hela förfrågan.
                        </p>
                      </div>
                      <button
                        onClick={() => setShowConfirmation(true)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                      >
                        Skicka alla tjänster ({totalServices} st) 🚀
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    if (step === 3) {
                      setShowConfirmation(true);
                    } else if (step === 4) {
                      setShowConfirmation(true);
                    } else {
                      handleNextStep();
                    }
                  }}
                  disabled={!isCurrentStepValid()}
                  className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${
                    isCurrentStepValid()
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {!isCurrentStepValid() 
                    ? 'Fyll i alla fält för att fortsätta'
                    : step === 3 
                      ? 'Skicka förfrågan' 
                      : step === 4 
                        ? 'Skicka förfrågan' 
                        : 'Nästa'
                  }
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 text-center">
            {/* Success Icon */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Main Heading */}
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Tack för din förfrågan!
            </h2>

            {/* Body Text */}
            <p className="text-gray-700 mb-4">
              Vi återkommer till dig inom kort med din skräddarsydda offert.
            </p>

            {/* Email Confirmation Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-700">
                  Du får en bekräftelse via e-post inom några minuter
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowConfirmation(false)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Stäng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
