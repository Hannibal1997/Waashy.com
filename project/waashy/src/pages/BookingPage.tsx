import React, { useState, useEffect } from 'react';
import { ArrowLeft, Info, Plus, ArrowRight, X } from 'lucide-react';
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
  isSubscription?: boolean;
}

interface Addon {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  currentPrice: number;
  image: string;
}



export default function BookingPage({ service, cart, onBack, isSubscription }: BookingPageProps) {
  const { selectedLocation } = useLocation();
  const [step, setStep] = useState(1);
  const [professionals, setProfessionals] = useState(1);
  const [materials, setMaterials] = useState<'no' | 'yes'>('no');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [wantsSubscription, setWantsSubscription] = useState(isSubscription || false);
  
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
    if (wantsSubscription) {
      return recurringDays.length > 0;
    } else {
      return true; // No pricing validation needed for one-time services
    }
  };

  const isCurrentStepValid = () => {
    switch (step) {
      case 1: return isStep1Valid();
      case 2: return isStep2Valid();
      default: return false;
    }
  };

  // Handle step progression - only 2 steps now
  const handleNextStep = () => {
    if (step === 1) {
      // Go directly to step 2 (formerly step 4)
      setStep(2);
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
  const [monthlyVolume, setMonthlyVolume] = useState(100);
  const [pricePerUnit, setPricePerUnit] = useState(25); // Fast pris per kvm, men kan justeras i Steg 4
  
  // Step 4 - Schedule state
  const [startDate, setStartDate] = useState('8 okt');
  const [scheduleTime, setScheduleTime] = useState('15:00-17:00');
  const [recurringDays, setRecurringDays] = useState<string[]>(['Mån', 'Ons', 'Fre']);
  
  // Modal states for date and time pickers
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
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
          {/* Bidding Interface - Only for subscriptions */}
          {wantsSubscription && (
            <div className="mb-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-lg">🧽</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Städ förfrågan</h3>
                </div>
                <p className="text-gray-600 mb-6">Städning av lokaler och ytor</p>
                
                <div className="space-y-6">
                  {/* Monthly Area Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">Månadsyta</label>
                      <div className="bg-blue-100 px-3 py-1 rounded-lg">
                        <span className="text-sm font-bold text-blue-700">{monthlyVolume}</span>
                        <span className="text-xs text-blue-600 ml-1">kvm</span>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="50"
                        max="1000"
                        value={monthlyVolume}
                        onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                      />
                    </div>
                  </div>

                  {/* Price per kvm Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-semibold text-gray-700">Kvmpris</label>
                      <div className="bg-green-100 px-3 py-1 rounded-lg">
                        <span className="text-sm font-bold text-green-700">{pricePerUnit.toFixed(2)}</span>
                        <span className="text-xs text-green-600 ml-1">kr</span>
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="5"
                        max="50"
                        step="0.1"
                        value={pricePerUnit}
                        onChange={(e) => setPricePerUnit(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                      />
                    </div>
                  </div>

                  {/* Summary Boxes */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="text-xs text-green-600 mb-1">Pris per kvm</div>
                      <div className="text-lg font-bold text-green-700">{pricePerUnit.toFixed(2)} kr</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="text-xs text-blue-600 mb-1">Månadskostnad</div>
                      <div className="text-lg font-bold text-gray-900">{(monthlyVolume * pricePerUnit).toLocaleString()} kr</div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Important Information */}
          <div className={`border rounded-lg p-4 mb-4 ${
            wantsSubscription 
              ? 'bg-yellow-50 border-yellow-200' 
              : 'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-start space-x-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                wantsSubscription 
                  ? 'bg-yellow-200' 
                  : 'bg-blue-200'
              }`}>
                <span className={`text-sm font-bold ${
                  wantsSubscription 
                    ? 'text-yellow-700' 
                    : 'text-blue-700'
                }`}>i</span>
              </div>
              <div>
                <h4 className={`font-semibold mb-1 ${
                  wantsSubscription 
                    ? 'text-yellow-800' 
                    : 'text-blue-800'
                }`}>Viktigt att veta</h4>
                <p className={`text-sm ${
                  wantsSubscription 
                    ? 'text-yellow-700' 
                    : 'text-blue-700'
                }`}>
                  {wantsSubscription 
                    ? 'Din förfrågan skickas till vår partner för godkännande. Du får bekräftelse så fort den granskats.'
                    : 'Din förfrågan skickas till vår partner för godkännande.'
                  }
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
        .slider-blue::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .slider-blue::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .slider-green::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .slider-green::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #10b981;
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
                  {isCartMode ? `Tjänst ${currentServiceIndex + 1} av ${totalServices}` : 'Tjänst 1 av 3'}
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  {step === 1 ? currentService.title : step === 2 ? 'Skapa schema' : currentService.title}
                </h1>
              </div>
            </div>

            {renderStepContent()}


          </div>

          {/* Right Panel - Booking & Payment Summary */}
          <div className="space-y-6">
            {/* Scheduling Section - Only in Step 1 */}
            {step === 1 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-lg">📅</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{currentService.title}</h3>
                    <p className="text-sm text-gray-600">Planera din leverans</p>
                  </div>
                </div>

                {/* Start Date Selection */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Välj startdatum (Ansvarig på plats vid uppstart)</h4>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <span className="font-medium text-gray-900">{startDate}</span>
                    <button 
                      onClick={() => setShowDatePicker(true)}
                      className="text-blue-600 text-sm font-medium hover:text-blue-700"
                    >
                      Ändra
                    </button>
                  </div>
                </div>

                {/* Time Selection */}
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">🕐</span>
                    <h4 className="font-semibold text-gray-900">Tid</h4>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <span className="font-medium text-gray-900">{scheduleTime}</span>
                    <button 
                      onClick={() => setShowTimePicker(true)}
                      className="text-blue-600 text-sm font-medium hover:text-blue-700"
                    >
                      Ändra
                    </button>
                  </div>
                </div>

                {/* Recurring Days Selection */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Välj veckodagar för återkommande leverans</h4>
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
                </div>
              </div>
            )}


            {/* Booking Details - Only for other steps */}
            {step !== 1 && (
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
                  {step >= 2 && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Datum:</span>
                        <span className="text-gray-900">{startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tid:</span>
                        <span className="text-gray-900">{scheduleTime}</span>
                      </div>
                      {wantsSubscription && recurringDays.length > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Leverans:</span>
                          <div className="text-right">
                            <span className="text-gray-900">{recurringDays.length} gånger per vecka</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {recurringDays.map((day, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                                >
                                  {day}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
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
                  <div className="flex justify-between">
                    <span className="text-gray-600">Antal städare:</span>
                    <span className="text-gray-900">{professionals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Städmaterial:</span>
                    <span className="text-gray-900">{materials === 'yes' ? 'Ja' : 'Nej'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Summary - Only for One-time Services */}
            {!wantsSubscription && (
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
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span>{totalPrice.toLocaleString()} kr</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Next Button */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {isCartMode && currentServiceIndex < totalServices - 1 ? (
                  <div className="space-y-3">
                    {step < 4 && !(wantsSubscription && step === 2) ? (
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
                    ) : step === 2 && wantsSubscription ? (
                      <button 
                        onClick={() => {
                          if (isCartMode && currentServiceIndex < totalServices - 1) {
                            handleNextService();
                          } else {
                            handleNextStep();
                          }
                        }}
                        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                      >
                        <span className="text-xl">🔥</span>
                        <span>Tick tack – Lägg ditt bud!</span>
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
                  {step < 4 && !(wantsSubscription && step === 2) ? (
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
                  ) : step === 2 && wantsSubscription ? (
                    <button 
                      onClick={() => {
                        if (isCartMode && currentServiceIndex < totalServices - 1) {
                          handleNextService();
                        } else {
                          handleNextStep();
                        }
                      }}
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center space-x-2 hover:from-orange-600 hover:to-red-600 transition-all duration-200"
                    >
                      <span className="text-xl">🔥</span>
                      <span>Tick tack – Lägg ditt bud!</span>
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
                    if (step === 2) {
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
                    : step === 2 
                      ? 'Skicka förfrågan' 
                      : 'Nästa'
                  }
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Välj startdatum</h2>
              <button
                onClick={() => setShowDatePicker(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    onClick={() => {
                      setStartDate(`${day} okt`);
                      setShowDatePicker(false);
                    }}
                    className="p-2 text-center text-sm hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                  >
                    {day}
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Avbryt
                </button>
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Bekräfta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Time Picker Modal */}
      {showTimePicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Välj tid</h2>
              <button
                onClick={() => setShowTimePicker(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  '08:00-10:00',
                  '10:00-12:00',
                  '12:00-14:00',
                  '14:00-16:00',
                  '15:00-17:00',
                  '16:00-18:00',
                  '18:00-20:00',
                  '20:00-22:00'
                ].map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setScheduleTime(time);
                      setShowTimePicker(false);
                    }}
                    className={`p-3 text-center text-sm rounded-lg border-2 transition-colors ${
                      scheduleTime === time
                        ? 'border-blue-500 bg-blue-50 text-blue-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowTimePicker(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Avbryt
                </button>
                <button
                  onClick={() => setShowTimePicker(false)}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Bekräfta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
