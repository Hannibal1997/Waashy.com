import React, { useState, useEffect } from 'react';
import { ArrowLeft, Info, X } from 'lucide-react';
import { useLocation } from '../contexts/LocationContext';
import DatePickerModal from '../components/DatePickerModal';
import TimePickerModal from '../components/TimePickerModal';


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

interface OneTimeBookingPageProps {
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

interface FurnitureOption {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
}

export default function OneTimeBookingPage({ service, cart, onBack }: OneTimeBookingPageProps) {
  const { selectedLocation, setSelectedLocation } = useLocation();
  const [step, setStep] = useState(1);
  const [professionals, setProfessionals] = useState(1);
  const [materials, setMaterials] = useState<'no' | 'yes'>('yes');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [currentServiceIndex] = useState(0);
  
  // Determine if we're working with a cart or single service
  const isCartMode = cart && cart.length > 0;
  const currentService = isCartMode ? cart[currentServiceIndex]?.service : service;
  const totalServices = isCartMode ? cart.length : 1;
  
  // Validation functions for each step
  const isStep1Valid = () => {
    if (!currentService) return false;
    if (
      currentService.title.toLowerCase().includes('möbel') ||
      currentService.title.toLowerCase().includes('soff') ||
      currentService.title.toLowerCase().includes('upholstery')
    ) {
      const totalQty = Object.values(furnitureQuantities).reduce((sum, n) => sum + (n || 0), 0);
      return totalQty > 0;
    }
    if (isStairCleaning) {
      return stairHouses > 0 && floorsPerStair > 0;
    }
    if (isOfficeCleaning || isLargeKitchen || isConstructionCleaning) {
      return monthlyVolume > 0; // Office cleaning, large kitchen, and construction cleaning automatically calculate professionals
    }
    return monthlyVolume > 0 && professionals > 0;
  };
  
  const isCurrentStepValid = () => {
    switch (step) {
      case 1: return isStep1Valid();
      case 2: 
        if (isOfficeCleaning || isLargeKitchen || isConstructionCleaning) {
          return isCodeVerified; // For office cleaning, large kitchen, and construction cleaning, require code verification
        }
        return true; // No additional validation needed for other one-time services
      case 3: return true; // Confirmation step is always valid
      default: return false;
    }
  };
  
  // Handle step progression - only 2 steps for one-time services
  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else {
      setStep(step + 1);
    }
  };
  
  // Handle email submission for office cleaning
  const handleEmailSubmit = () => {
    if (email && email.includes('@')) {
      setShowCodeInput(true);
      // In a real app, this would send a confirmation code to the email
      console.log('Sending confirmation code to:', email);
    }
  };
  
  // Handle confirmation code verification
  const handleCodeVerification = () => {
    if (confirmationCode && confirmationCode.length >= 4) {
      setIsCodeVerified(true);
      // In a real app, this would verify the code with the backend
      console.log('Verifying code:', confirmationCode);
      // Move to confirmation step after verification
      setTimeout(() => {
        setStep(3);
      }, 1000);
    }
  };
  
  // Add navigation functions for cart mode
  // const handleNextService = () => {
  //   if (isCartMode && currentServiceIndex < totalServices - 1) {
  //     setCurrentServiceIndex(currentServiceIndex + 1);
  //     setStep(1); // Reset to first step for next service
  //   }
  // };
  
  if (!currentService) {
    return <div>No service selected</div>;
  }
  
  const [selectedAddons] = useState<string[]>([]);
  const [monthlyVolume, setMonthlyVolume] = useState(100);
  const [pricePerUnit] = useState(25);
  // Furniture is quantity-driven; no single selected option needed
  const [furnitureQuantities, setFurnitureQuantities] = useState<Record<string, number>>({});
  
  // Schedule state
  const [startDate, setStartDate] = useState('18 okt');
  const [scheduleTime, setScheduleTime] = useState('15:00-17:00');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Modal states for date and time pickers
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  // Confirmation state
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Address editing state
  const [showAddressEdit, setShowAddressEdit] = useState(false);
  const [editedAddress, setEditedAddress] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Login/Registration state
  const [email, setEmail] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  
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
    } else if (serviceTitle.includes('byggstäd')) {
      return { unit: 'kvm', label: 'Yta att städa', isOfficeCleaning: true, isConstructionCleaning: true };
    } else if (serviceTitle.includes('storkök')) {
      return { unit: 'kvm', label: 'Yta att städa', isOfficeCleaning: true, isLargeKitchen: true };
    } else if (serviceTitle.includes('kontor') || serviceTitle.includes('kontorstädning') || serviceTitle.includes('tvätt') || serviceTitle.includes('kläder') || serviceTitle.includes('arbetskläder') || serviceTitle.includes('skyddskläder') || serviceTitle.includes('bordsdukar') || serviceTitle.includes('kökshanddukar') || serviceTitle.includes('förkläden') || serviceTitle.includes('mattor') || serviceTitle.includes('servetter') || serviceTitle.includes('sängkläder') || serviceTitle.includes('vårduniformer') || serviceTitle.includes('golv') || serviceTitle.includes('städ') || serviceTitle.includes('bil') || serviceTitle.includes('fönster') || serviceTitle.includes('möbel') || serviceTitle.includes('soff') || serviceTitle.includes('upholster')) {
      return { unit: 'kvm', label: 'Yta att städa', isOfficeCleaning: true };
    } else {
      return { unit: 'kvm', label: 'Yta att städa', isOfficeCleaning: true };
    }
  };
  
  const serviceUnit = getServiceUnit();
  
  // Check if service is laundry-related (no longer used as separate category)
  const isLaundryService = () => {
    return false; // All services now use office cleaning UI
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
    } else if (serviceTitle.includes('möbel') || serviceTitle.includes('soff') || serviceTitle.includes('upholster')) {
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
  const beräknaStädJobb = ({ kvm, antalStadare, kapacitetPerTimme, prisPerKvm, isOfficeCleaning = false }: { kvm: number; antalStadare: number; kapacitetPerTimme: number; prisPerKvm: number; isOfficeCleaning?: boolean }) => {
    if (kapacitetPerTimme <= 0 || antalStadare <= 0) return null;
    const ineff = ineffektivitetsFaktor(antalStadare);
    let tid = (kvm / kapacitetPerTimme) / antalStadare * ineff;
    
    // For office cleaning: ensure max 8 hours per shift
    if (isOfficeCleaning) {
      const maxHours = 8;
      // Calculate time per cleaner and cap at 8 hours
      const timePerCleaner = (kvm / kapacitetPerTimme) / antalStadare;
      // For office cleaning, show the actual time per cleaner (max 8 hours)
      tid = Math.min(timePerCleaner, maxHours);
    }
    
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
  const isOfficeCleaning = serviceUnit.isOfficeCleaning;
  const isLargeKitchen = (serviceUnit as any).isLargeKitchen;
  const isConstructionCleaning = (serviceUnit as any).isConstructionCleaning;
  const isLaundry = isLaundryService();
  const isCarpet = currentService.title.toLowerCase().includes('mattor');
  const isFurniture = currentService.title.toLowerCase().includes('möbel') || currentService.title.toLowerCase().includes('soff') || currentService.title.toLowerCase().includes('upholster');

  const furnitureOptions: FurnitureOption[] = [
    {
      id: 'sofa-3-seater',
      title: '3 Seater (25% Price Drop)',
      description: 'Refresh your 3-seater sofa with expert cleaning, stains removed & freshness restored!',
      originalPrice: 189,
      discountedPrice: 137,
    },
    {
      id: 'sofa-3-seater-l',
      title: '3 Seater L-Shaped (20% Price Drop)',
      description: 'Breathe new life into your 3-seater L-shaped sofa with deep clean, fresh vibes, no stains!',
      originalPrice: 199,
      discountedPrice: 160,
    },
    {
      id: 'sofa-3-seater-bed',
      title: '3 Seater Sofa Bed',
      description: 'Revive your 3-seater sofa bed as stains vanish, comfort returns & it’s good as new!',
      originalPrice: 269,
      discountedPrice: 229,
    },
    {
      id: 'sofa-3-seater-l-bed',
      title: '3 Seater L-Shaped Sofa Bed',
      description: 'Give your 3-seater L-shaped sofa bed a fresh makeover with stains out & comfort restored!',
      originalPrice: 289,
      discountedPrice: 249,
    },
    {
      id: 'sofa-4-seater',
      title: '4 Seater',
      description: 'Say goodbye to stains & hello to a fresh, comfy 4-seater sofa, the MVP of your lounge!',
      originalPrice: 289,
      discountedPrice: 179,
    },
    {
      id: 'sofa-5-seater',
      title: '5 Seater',
      description: 'Let freshness take over when we transform your 5-seater sofa from oh-boy to oh-wow!',
      originalPrice: 370,
      discountedPrice: 199,
    },
    {
      id: 'sofa-5-seater-l',
      title: '5 Seater L-Shaped',
      description: 'Your well-loved 5-seater L-shaped sofa is ready for its feels-like-brand-new moment!',
      originalPrice: 370,
      discountedPrice: 229,
    },
    {
      id: 'sofa-7-seater',
      title: '7 Seater',
      description: 'Your 7-seater is ready to shine as stains come out, comfort is maxed & vibes set to 100!',
      originalPrice: 420,
      discountedPrice: 249,
    },
    {
      id: 'sofa-single-seat',
      title: 'Single Seat',
      description: 'No need to flip cushions to hide spaghetti stains, our single-seat cleanup has your back!',
      originalPrice: 89,
      discountedPrice: 69,
    },
  ];
  
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
  } else if (isFurniture) {
    const totals = furnitureOptions.reduce(
      (acc, opt) => {
        const qty = furnitureQuantities[opt.id] || 0;
        if (qty > 0) {
          acc.count += qty;
          acc.discounted += qty * opt.discountedPrice;
          acc.original += qty * opt.originalPrice;
        }
        return acc;
      },
      { count: 0, discounted: 0, original: 0 }
    );
    jobbResultat = {
      tid: totals.count > 0 ? 2 : 0,
      pris: totals.discounted,
      prisUtanPåslag: totals.original,
    } as any;
  } else {
    // Use different prices based on service type
    let servicePrice;
    if (currentService.title.toLowerCase().includes('arbetskläder')) {
      servicePrice = 30; // 30 kr per garment for work clothes
    } else if (currentService.title.toLowerCase().includes('mattor')) {
      servicePrice = 169; // 169 kr/kvm for carpets
    } else if (isConstructionCleaning) {
      servicePrice = 50; // 50 kr/kvm for construction cleaning
    } else if (isLargeKitchen) {
      servicePrice = 100; // 100 kr/kvm for large kitchen services
    } else if (isOfficeCleaning) {
      servicePrice = 20; // 20 kr/kvm for office cleaning
    } else {
      servicePrice = pricePerUnit; // Default price
    }
    
    jobbResultat = beräknaStädJobb({
      kvm: monthlyVolume,
      antalStadare: professionals,
      kapacitetPerTimme: kapacitet,
      prisPerKvm: servicePrice,
      isOfficeCleaning: isOfficeCleaning,
    });
  }
  
  // Extract values for display
  const rekommenderadeTimmar = jobbResultat?.tid || 0;
  const totalPris = jobbResultat?.pris || 0;
  const prisUtanPåslag = jobbResultat?.prisUtanPåslag || 0;
  const totalKvm = (jobbResultat as any)?.totalKvm || monthlyVolume;
  const calculatedWeight = isLaundry ? calculateLaundryWeight(monthlyVolume) : 0;
  
  // Auto-update professionals for office cleaning, large kitchen, and construction cleaning based on area and 8-hour max shift
  useEffect(() => {
    if ((isOfficeCleaning || isLargeKitchen || isConstructionCleaning) && !isCarpet && !isFurniture) {
      // Office cleaning, large kitchen, and construction cleaning: max 8 hours per shift
      const capacityPerCleaner = 50; // kvm/hour per cleaner
      const maxHours = 8;
      
      // Calculate minimum cleaners needed to stay within 8 hours
      const cleanersNeeded = Math.ceil(monthlyVolume / (capacityPerCleaner * maxHours));
      
      setProfessionals(cleanersNeeded);
    }
  }, [monthlyVolume, isOfficeCleaning, isLargeKitchen, isConstructionCleaning]);

  // Load Google Maps script for Places API
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        return;
      }

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        setMapLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google Maps loaded successfully');
        setMapLoaded(true);
      };
      script.onerror = () => {
        console.error('Failed to load Google Maps');
        setMapLoaded(false);
      };
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialize Places Autocomplete when modal opens
  useEffect(() => {
    if (showAddressEdit && mapLoaded) {
      const searchInput = document.getElementById('address-search') as HTMLInputElement;
      if (searchInput) {
        try {
          const autocomplete = new google.maps.places.Autocomplete(searchInput, {
            types: ['establishment'], // Only businesses/companies
            componentRestrictions: { country: 'se' }, // Sweden
            fields: ['formatted_address', 'name', 'place_id']
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            console.log('Place selected:', place);
            
            if (place.formatted_address) {
              setEditedAddress(place.formatted_address);
            } else {
              console.log('No address found for:', place.name);
            }
          });
          
          console.log('Places Autocomplete initialized successfully');
        } catch (error) {
          console.error('Error initializing Places Autocomplete:', error);
        }
      }
    }
  }, [showAddressEdit, mapLoaded]);
  
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

  const compactFurnitureTitle = (title: string) => {
    const base = title.split('(')[0].trim();
    return base
      .replace(/Single\s*Seat/i, '1 sits')
      .replace(/Seater/i, 'sits')
      .replace(/L-?Shaped/i, 'L-form')
      .replace(/Sofa\s*Bed/i, 'bäddsoffa')
      .trim();
  };

  const renderPrimaryInput = () => {
    if (currentService.title.toLowerCase().includes('arbetskläder')) {
      return (
        <div className="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-semibold text-gray-900">Antal arbetskläder</label>
            <div className="flex items-center space-x-1 bg-blue-50 px-2 py-0.5 rounded-lg">
              <span className="text-base font-bold text-blue-600">{monthlyVolume}</span>
              <span className="text-xs text-blue-600">plagg</span>
            </div>
          </div>
          <div className="relative mb-1">
            <input
              type="range"
              min="1"
              max="500"
              value={monthlyVolume}
              onChange={(e) => setMonthlyVolume(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
            />
          </div>
          <p className="text-xs text-gray-500">
            Välj antal arbetskläder som ska tvättas. Varje plagg kostar 30 kr.
          </p>
        </div>
      );
    }

    const isLaundryTextiles = !isCarpet && (
      currentService.title.toLowerCase().includes('tvätt') ||
      currentService.title.toLowerCase().includes('kläder') ||
      currentService.title.toLowerCase().includes('skyddskläder') ||
      currentService.title.toLowerCase().includes('bordsdukar') ||
      currentService.title.toLowerCase().includes('kökshanddukar') ||
      currentService.title.toLowerCase().includes('förkläden') ||
      currentService.title.toLowerCase().includes('servetter') ||
      currentService.title.toLowerCase().includes('sängkläder') ||
      currentService.title.toLowerCase().includes('vårduniformer')
    );

    if (isLaundryTextiles) {
      return (
        <div className="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-semibold text-gray-900">Antal textilier</label>
            <div className="flex items-center space-x-1 bg-blue-50 px-2 py-0.5 rounded-lg">
              <span className="text-base font-bold text-blue-600">{monthlyVolume}</span>
              <span className="text-xs text-blue-600">st</span>
            </div>
          </div>
          <div className="relative mb-1">
            <input
              type="range"
              min="1"
              max="1000"
              value={monthlyVolume}
              onChange={(e) => setMonthlyVolume(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
            />
          </div>
          <p className="text-xs text-gray-500">
            Välj antal textilier (t.ex. bordsdukar, kökshanddukar, förkläden, servetter).
          </p>
        </div>
      );
    }

    if (isFurniture) {
      return (
        <div className="space-y-2">
          <div className="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-semibold text-gray-900">Sofftyp</label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
              {furnitureOptions.map((opt) => {
                const qty = furnitureQuantities[opt.id] || 0;
                return (
                  <div
                    key={opt.id}
                    className={`p-2 rounded-lg border ${qty > 0 ? 'border-blue-400 bg-blue-50' : 'border-gray-200'} flex flex-col items-center`}
                  >
                    <div className="font-semibold text-gray-900 text-xs leading-snug text-center">{compactFurnitureTitle(opt.title)}</div>
                    <div className="mt-1 text-xs font-bold text-green-700 text-center">{opt.discountedPrice}</div>
                    <div className="flex items-center space-x-1 mt-1 justify-center">
                      <button
                        onClick={() => setFurnitureQuantities({ ...furnitureQuantities, [opt.id]: Math.max(0, qty - 1) })}
                        className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs"
                        aria-label="Minska antal"
                      >
                        -
                      </button>
                      <span className="min-w-[1.25rem] text-center text-xs font-semibold text-blue-700">{qty}</span>
                      <button
                        onClick={() => setFurnitureQuantities({ ...furnitureQuantities, [opt.id]: qty + 1 })}
                        className="w-6 h-6 rounded bg-blue-600 hover:bg-blue-700 text-white text-xs"
                        aria-label="Öka antal"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <label className="text-sm font-semibold text-gray-900">{isCarpet ? 'Yta (kvm)' : 'Yta att städa (kvm)'}</label>
          <div className="flex items-center space-x-1 bg-blue-50 px-2 py-0.5 rounded-lg">
            <span className="text-base font-bold text-blue-600">{monthlyVolume}</span>
            <span className="text-xs text-blue-600">kvm</span>
          </div>
        </div>
        <div className="relative mb-1">
          <input
            type="range"
            min="10"
            max="2000"
            value={monthlyVolume}
            onChange={(e) => setMonthlyVolume(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
          />
        </div>
        <p className="text-xs text-gray-500">
          Ange den totala städytan (kontor, kök, toaletter, mötesrum etc.) i kvadratmeter.
        </p>
      </div>
    );
  };
  
  // Calculate ironing/pressing cost for laundry services
  const ironingCost = (currentService.title.toLowerCase().includes('tvätt') || currentService.title.toLowerCase().includes('kläder') || currentService.title.toLowerCase().includes('arbetskläder') || currentService.title.toLowerCase().includes('skyddskläder') || currentService.title.toLowerCase().includes('bordsdukar') || currentService.title.toLowerCase().includes('kökshanddukar') || currentService.title.toLowerCase().includes('förkläden') || currentService.title.toLowerCase().includes('servetter') || currentService.title.toLowerCase().includes('sängkläder') || currentService.title.toLowerCase().includes('vårduniformer')) && materials === 'yes' 
    ? monthlyVolume * 5 // 5 kr per item for ironing/pressing
    : 0;
  
  const addonPrice = selectedAddons.reduce((total, addonId) => {
    const addon = addons.find(a => a.id === addonId);
    return total + (addon ? addon.currentPrice : 0);
  }, 0);
  const totalPrice = basePrice + addonPrice + ironingCost;
  
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
                  <label className="text-sm font-semibold text-gray-900">Antal trapphus</label>
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
                  <label className="text-sm font-semibold text-gray-900">Antal våningar per trapphus</label>
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
              {showStairDetails ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <div className="text-sm text-blue-800">
                    <p><strong>Beräkning:</strong> {stairHouses} trapphus × {floorsPerStair} våningar × 50 m²/våning = {totalKvm} m²</p>
                    <p><strong>Kapacitet:</strong> 50 m²/timme per städare</p>
                    <p><strong>Timpris:</strong> 300 kr/timme (BRF standard)</p>
                    <p><strong>Hiss:</strong> {hasElevator ? 'Ja (10% tidsbesparing)' : 'Nej'}</p>
                  </div>
                </div>
              ) : null}
            </div>
          ) : isOfficeCleaning ? (
            /* Office Cleaning Service Fields - Now used for all services except stair cleaning */
            <div className="space-y-3">
              
              {/* Area/Textile Input Field - Switch by service type */}
              {renderPrimaryInput()}
              
              {/* Date and Time Selection */}
              <div className="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {currentService.title.toLowerCase().includes('tvätt') || currentService.title.toLowerCase().includes('kläder') || currentService.title.toLowerCase().includes('arbetskläder') || currentService.title.toLowerCase().includes('skyddskläder') || currentService.title.toLowerCase().includes('bordsdukar') || currentService.title.toLowerCase().includes('kökshanddukar') || currentService.title.toLowerCase().includes('förkläden') || currentService.title.toLowerCase().includes('servetter') || currentService.title.toLowerCase().includes('sängkläder') || currentService.title.toLowerCase().includes('vårduniformer') ? 'Upphämtning av tvätt' : 'Planera din leverans'}
                  </h4>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-2 gap-1.5">
                  {/* Start Date Selection */}
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Datum</label>
                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-1 border border-blue-100">
                      <span className="font-medium text-gray-900 text-xs">{startDate}</span>
                      <button 
                        onClick={() => setShowDatePicker(true)}
                        className="text-blue-600 text-xs font-medium hover:text-blue-700 bg-blue-100 hover:bg-blue-200 px-1 py-0.5 rounded transition-colors"
                      >
                        Ändra
                      </button>
                    </div>
                  </div>
                  
                  {/* Time Selection */}
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1 block">Tid</label>
                    <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-1 border border-green-100">
                      <span className="font-medium text-gray-900 text-xs">{scheduleTime}</span>
                      <button 
                        onClick={() => setShowTimePicker(true)}
                        className="text-green-600 text-xs font-medium hover:text-green-700 bg-green-100 hover:bg-green-200 px-1 py-0.5 rounded transition-colors"
                      >
                        Ändra
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Instructions Field - Different for laundry vs cleaning services */}
              <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">Instruktioner</h4>
                  <span className="text-xs text-gray-500">(Valfritt)</span>
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>
                <div className="relative">
                  <textarea
                    value={specialRequirements}
                    onChange={(e) => setSpecialRequirements(e.target.value)}
                    placeholder={
                      currentService.title.toLowerCase().includes('tvätt') || currentService.title.toLowerCase().includes('kläder') || currentService.title.toLowerCase().includes('arbetskläder') || currentService.title.toLowerCase().includes('skyddskläder') || currentService.title.toLowerCase().includes('bordsdukar') || currentService.title.toLowerCase().includes('kökshanddukar') || currentService.title.toLowerCase().includes('förkläden') || currentService.title.toLowerCase().includes('mattor') || currentService.title.toLowerCase().includes('servetter') || currentService.title.toLowerCase().includes('sängkläder') || currentService.title.toLowerCase().includes('vårduniformer')
                        ? "Ange instruktioner för tvätt, t.ex.: Leveransadress för textilier • Särskilda tvättinstruktioner • Temperaturpreferenser • Sortering av textilier"
                        : "Ange instruktioner, t.ex.: Nyckel finns i receptionen • Fokusera på kök och glasytor • Ta bort fläckar på dörrar • Använd miljömärkta produkter"
                    }
                    className="w-full px-2 py-1 border border-purple-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm bg-gradient-to-r from-purple-50 to-pink-50"
                    rows={2}
                    maxLength={200}
                  />
                </div>
              </div>
              
              {/* Materials Selection - hide for carpets */}
              {isCarpet ? null : (
                (currentService.title.toLowerCase().includes('tvätt') || currentService.title.toLowerCase().includes('kläder') || currentService.title.toLowerCase().includes('arbetskläder') || currentService.title.toLowerCase().includes('skyddskläder') || currentService.title.toLowerCase().includes('bordsdukar') || currentService.title.toLowerCase().includes('kökshanddukar') || currentService.title.toLowerCase().includes('förkläden') || currentService.title.toLowerCase().includes('servetter') || currentService.title.toLowerCase().includes('sängkläder') || currentService.title.toLowerCase().includes('vårduniformer')) ? (
                /* Laundry Services - Ironing/Pressing Options */
                <div className="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-2 mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Välj om du vill att vi manglar eller stryker textilierna efter tvätt</h3>
                      <p className="text-xs text-gray-600">Välj behandling av textilier</p>
                    </div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-1">
                    <button
                      onClick={() => setMaterials('yes')}
                      className={`w-full p-1 rounded-lg border-2 transition-all duration-200 text-left ${
                        materials === 'yes'
                          ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50 text-orange-700 shadow-sm'
                          : 'border-gray-300 text-gray-600 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                    >
                      <div className="font-medium text-sm">Ja, inkludera mangling/strykning (+5 kr/plagg)</div>
                      <div className="text-xs text-gray-500">Textilierna levereras släta och färdiga för användning</div>
                    </button>
                    <button
                      onClick={() => setMaterials('no')}
                      className={`w-full p-1 rounded-lg border-2 transition-all duration-200 text-left ${
                        materials === 'no'
                          ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50 text-orange-700 shadow-sm'
                          : 'border-gray-300 text-gray-600 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                    >
                      <div className="font-medium text-sm">Nej, endast tvätt</div>
                      <div className="text-xs text-gray-500">Vi levererar tvätten rentvättad men omanglad/ostrykt</div>
                    </button>
                  </div>
                </div>
              ) : (
                /* Cleaning Services - Materials Options */
                <div className="bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-2 mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">Städmaterial</h3>
                      <p className="text-xs text-gray-600">Välj städprodukter</p>
                    </div>
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  </div>
                  
                  <div className="space-y-1">
                    <button
                      onClick={() => setMaterials('yes')}
                      className={`w-full p-1 rounded-lg border-2 transition-all duration-200 text-left ${
                        materials === 'yes'
                          ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50 text-orange-700 shadow-sm'
                          : 'border-gray-300 text-gray-600 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                    >
                      <div className="font-medium text-sm">Ja, ta med professionella städprodukter (+X kr)</div>
                      <div className="text-xs text-gray-500">Professionella rengöringsprodukter inkluderade</div>
                    </button>
                    <button
                      onClick={() => setMaterials('no')}
                      className={`w-full p-1 rounded-lg border-2 transition-all duration-200 text-left ${
                        materials === 'no'
                          ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-yellow-50 text-orange-700 shadow-sm'
                          : 'border-gray-300 text-gray-600 hover:border-orange-300 hover:bg-orange-50'
                      }`}
                    >
                      <div className="font-medium text-sm">Nej, vi tillhandahåller själva</div>
                      <div className="text-xs text-gray-500">Du har redan städprodukter på plats</div>
                    </button>
                  </div>
                </div>
              )
              )}
            </div>
          ) : null}
        </>
      );
    }
    
    if (step === 2) {
      // For all services except stair cleaning, show login/registration step
      if (isOfficeCleaning || isLargeKitchen || isConstructionCleaning) {
      return (
        <>
            <div className="text-center py-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Logga in eller skapa konto</h3>
              <p className="text-gray-600">Ange din e-postadress för att bekräfta avtalet</p>
            </div>
            
            {/* Email Input */}
            {!showCodeInput && (
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm mb-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-postadress
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="din@epost.se"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={handleEmailSubmit}
                  disabled={!email || !email.includes('@')}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    email && email.includes('@')
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Skicka bekräftelsekod
                </button>
              </div>
            )}
            
            {/* Confirmation Code Input */}
            {showCodeInput && !isCodeVerified && (
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm mb-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bekräftelsekod
                  </label>
                  <p className="text-sm text-gray-600 mb-3">
                    Vi har skickat en kod till {email}
                  </p>
                  <input
                    type="text"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    placeholder="Ange 6-siffrig kod"
                    maxLength={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg tracking-widest"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowCodeInput(false)}
                    className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Ändra e-post
                  </button>
                  <button
                    onClick={handleCodeVerification}
                    disabled={!confirmationCode || confirmationCode.length < 4}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      confirmationCode && confirmationCode.length >= 4
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Bekräfta kod
                  </button>
                </div>
              </div>
            )}
            
            {/* Success Message */}
            {isCodeVerified && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-700 font-medium">E-post verifierad!</span>
                </div>
                <p className="text-green-600 text-sm mt-1">
                  Du kan nu fortsätta med din bokning
                </p>
              </div>
            )}
          </>
        );
      }
      
      // For stair cleaning - Review message
      if (isStairCleaning) {
        return (
          <>
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Granska din bokning</h3>
              <p className="text-gray-600">Kontrollera dina uppgifter innan du beställer</p>
            </div>
          </>
        );
      }
      
      // For other services - Review message
      return (
        <>
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Granska din bokning</h3>
            <p className="text-gray-600">Kontrollera dina uppgifter innan du beställer</p>
          </div>
        </>
      );
    }
    
    if (step === 3) {
      return (
        <>
          {/* Confirmation Page */}
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bokning bekräftad!</h3>
            <p className="text-gray-600 mb-6">
              Tack för din beställning. Vi återkommer till dig inom kort med mer information.
            </p>
            
            {/* Booking Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h4 className="font-semibold text-gray-900 mb-3">Din bokning:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tjänst:</span>
                  <span className="text-gray-900">{currentService.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Adress:</span>
                  <span className="text-gray-900">{selectedLocation || 'Kommer att hämtas automatiskt'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Datum:</span>
                  <span className="text-gray-900">{startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tid:</span>
                  <span className="text-gray-900">{scheduleTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {currentService.title.toLowerCase().includes('arbetskläder') ? 'Antal plagg:' : 'Yta:'}
                  </span>
                  <span className="text-gray-900">
                    {currentService.title.toLowerCase().includes('arbetskläder') ? `${monthlyVolume} plagg` : `${monthlyVolume} kvm`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Antal städare:</span>
                  <span className="text-gray-900">{professionals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Totalpris:</span>
                  <span className="text-gray-900 font-semibold">{totalPrice.toLocaleString()} kr ex moms</span>
                </div>
              </div>
            </div>
            
            {/* Email Confirmation Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-blue-700 font-medium">Bekräftelse skickad</span>
              </div>
              <p className="text-blue-600 text-sm mt-1">
                Du får en bekräftelse via e-post till {email} inom några minuter
              </p>
            </div>
            
            <button
              onClick={() => setShowConfirmation(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Slutför
            </button>
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
      `}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen">
           {/* Left Panel - Service Configuration */}
           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
             {/* Header */}
             <div className="flex items-center space-x-3 mb-4">
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
                   {isCartMode && totalServices > 1 ? `Tjänst ${currentServiceIndex + 1} av ${totalServices}` : ''}
                 </div>
                 <h1 className="text-xl font-bold text-gray-900">
                   {step === 1 ? currentService.title : 
                    (step === 2 && (isOfficeCleaning || isLargeKitchen || isConstructionCleaning)) ? 'Logga in eller skapa konto' : 
                    (step === 3 && (isOfficeCleaning || isLargeKitchen || isConstructionCleaning)) ? 'Bokning bekräftad' :
                    (step === 2 && isStairCleaning) ? 'Granska din bokning' :
                    'Granska din bokning'}
                 </h1>
               </div>
             </div>
             {renderStepContent()}
           </div>
          
          {/* Right Panel - Booking & Payment Summary */}
          {step !== 3 && (
          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {/* Scheduling Section - Only for stair cleaning in Step 1 */}
            {step === 1 && isStairCleaning && (
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
              </div>
            )}
            
            
            {/* Office Cleaning Summary - For all services except stair cleaning in Step 1 */}
            {step === 1 && (isOfficeCleaning || isLargeKitchen || isConstructionCleaning) && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-200 p-4">
                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 text-base">📋 Sammanfattning / Bekräftelse</h3>
                  <p className="text-xs text-gray-600">Kontrollera dina uppgifter</p>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs text-gray-500">📍 Leveransadress</div>
                      <button
                        onClick={() => {
                          setEditedAddress(selectedLocation || '');
                          setShowAddressEdit(true);
                        }}
                        className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center space-x-1"
                      >
                        <span>📋</span>
                        <span>Redigera</span>
                      </button>
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {selectedLocation || 'Adress kommer att hämtas automatiskt'}
                    </div>
                    {selectedLocation && (
                      <div className="text-xs text-green-600 mt-1">Adress verifierad</div>
                    )}
                  </div>
                  
                  {(currentService.title.toLowerCase().includes('tvätt') || currentService.title.toLowerCase().includes('kläder') || currentService.title.toLowerCase().includes('arbetskläder') || currentService.title.toLowerCase().includes('skyddskläder') || currentService.title.toLowerCase().includes('bordsdukar') || currentService.title.toLowerCase().includes('kökshanddukar') || currentService.title.toLowerCase().includes('förkläden') || currentService.title.toLowerCase().includes('servetter') || currentService.title.toLowerCase().includes('sängkläder') || currentService.title.toLowerCase().includes('vårduniformer')) ? (
                   /* Laundry Services - Pair Antal + Mangling */
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm min-h-[84px] flex flex-col justify-center">
                        <div className="text-xs text-gray-500 mb-1">
                          {currentService.title.toLowerCase().includes('arbetskläder') ? 'Antal plagg' : 'Antal textilier'}
                        </div>
                        <div className="font-bold text-base text-blue-600">
                          {currentService.title.toLowerCase().includes('arbetskläder') ? `${monthlyVolume} plagg` : `${monthlyVolume} st`}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Mangling/Strykning</div>
                        <div className="font-bold text-sm text-orange-600">
                          {materials === 'yes' ? 'Ja, inkluderat' : 'Nej, endast tvätt'}
                        </div>
                      </div>
                    </div>
                  ) : isFurniture ? (
                    /* Furniture summary: selection and coupon */
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Sofftyp</div>
                        <div className="font-bold text-base text-blue-600">
                          {(() => {
                        const selectedTitles = furnitureOptions
                          .filter(o => (furnitureQuantities[o.id] || 0) > 0)
                          .map(o => `${o.title.split('(')[0].trim()} × ${furnitureQuantities[o.id]}`);
                        return selectedTitles.length ? selectedTitles.join(', ') : 'Ej vald';
                          })()}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                    <div className="text-xs text-gray-500 mb-1">Antal</div>
                    <div className="font-bold text-sm text-blue-700">
                      {Object.values(furnitureQuantities).reduce((sum, n) => sum + (n || 0), 0) || '—'}
                    </div>
                      </div>
                    </div>
                  ) : (
                    /* Cleaning Services - Cleaning-specific information */
                    <div className="grid grid-cols-2 gap-2">
                      {/* Left card: Area */}
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                        <div className="text-sm text-gray-600 mb-1">{isCarpet ? 'Yta (kvm)' : 'Yta att städa'}</div>
                        <div className="font-semibold text-lg text-blue-600">{monthlyVolume} kvm</div>
                      </div>
                      {/* Right card: either Price (carpet) or Cleaners (others) */}
                      {isCarpet ? (
                        <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm text-right min-h-[84px] flex flex-col justify-center">
                          <div className="text-sm text-gray-600 mb-1">Pris</div>
                          <div className="font-semibold text-lg text-green-700">169 kr/kvm</div>
                        </div>
                      ) : (
                        <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                          <div className="text-xs text-gray-500 mb-1">Antal städare</div>
                          <div className="font-bold text-base text-green-600">{professionals} städare</div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {isCarpet && (
                    /* Carpets - Pair Upphämtningstid + Leveranstid */
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm hover:bg-blue-50 cursor-pointer min-h-[84px] flex flex-col justify-center"
                        onClick={() => setShowDatePicker(true)}
                        role="button"
                        aria-label="Ändra upphämtningens datum"
                        title="Klicka för att ändra datum"
                      >
                        <div className="text-sm text-gray-600 mb-1">Upphämtningstid</div>
                        <div className="font-extrabold text-xl text-gray-900">{startDate + ' ' + scheduleTime}</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm min-h-[84px] flex flex-col justify-center">
                        <div className="text-sm text-gray-600 mb-1">Leveranstid</div>
                        <div className="font-extrabold text-xl text-purple-600">
                          {(() => {
                            const today = new Date();
                            const currentMonth = today.getMonth();
                            const currentYear = today.getFullYear();
                            const dayMatch = startDate.match(/(\d+)/);
                            const day = dayMatch ? parseInt(dayMatch[1]) : today.getDate();
                            const pickupDate = new Date(currentYear, currentMonth, day);
                            const deliveryDate = new Date(pickupDate.getTime() + 48 * 60 * 60 * 1000);
                            return deliveryDate.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }) + ' ' + scheduleTime;
                          })()}
                        </div>
                      </div>
                    </div>
                  )}

                  {!isCarpet && isFurniture && (
                    /* Furniture - show pickup/delivery similar to laundry */
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm hover:bg-blue-50 cursor-pointer min-h-[84px] flex flex-col justify-center"
                        onClick={() => setShowDatePicker(true)}
                        role="button"
                        aria-label="Ändra upphämtningens datum"
                        title="Klicka för att ändra datum"
                      >
                        <div className="text-xs text-gray-500 mb-1">Upphämtningstid</div>
                        <div className="font-bold text-sm text-gray-900">{startDate + ' ' + scheduleTime}</div>
                      </div>
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm min-h-[84px] flex flex-col justify-center">
                        <div className="text-xs text-gray-500 mb-1">Leveranstid</div>
                        <div className="font-bold text-base text-purple-600">
                          {(() => {
                            const today = new Date();
                            const currentMonth = today.getMonth();
                            const currentYear = today.getFullYear();
                            const dayMatch = startDate.match(/(\d+)/);
                            const day = dayMatch ? parseInt(dayMatch[1]) : today.getDate();
                            const pickupDate = new Date(currentYear, currentMonth, day);
                            const deliveryDate = new Date(pickupDate.getTime() + 48 * 60 * 60 * 1000);
                            return deliveryDate.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }) + ' ' + scheduleTime;
                          })()}
                        </div>
                      </div>
                    </div>
                  )}

                  {!isCarpet && !isFurniture && (
                    (currentService.title.toLowerCase().includes('tvätt') ||
                    currentService.title.toLowerCase().includes('kläder') ||
                    currentService.title.toLowerCase().includes('arbetskläder') ||
                    currentService.title.toLowerCase().includes('skyddskläder') ||
                    currentService.title.toLowerCase().includes('bordsdukar') ||
                    currentService.title.toLowerCase().includes('kökshanddukar') ||
                    currentService.title.toLowerCase().includes('förkläden') ||
                    currentService.title.toLowerCase().includes('servetter') ||
                    currentService.title.toLowerCase().includes('sängkläder') ||
                    currentService.title.toLowerCase().includes('vårduniformer'))
                  ? (
                    /* Other Laundry - Pair Upphämtningstid + Leveranstid */
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm hover:bg-blue-50 cursor-pointer min-h-[84px] flex flex-col justify-center"
                        onClick={() => setShowDatePicker(true)}
                        role="button"
                        aria-label="Ändra upphämtningens datum"
                        title="Klicka för att ändra datum"
                      >
                        <div className="text-xs text-gray-500 mb-1">Upphämtningstid</div>
                        <div className="font-bold text-sm text-gray-900">{startDate + ' ' + scheduleTime}</div>
                      </div>
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm min-h-[84px] flex flex-col justify-center">
                        <div className="text-xs text-gray-500 mb-1">Leveranstid</div>
                        <div className="font-bold text-base text-purple-600">
                          {(() => {
                            const today = new Date();
                            const currentMonth = today.getMonth();
                            const currentYear = today.getFullYear();
                            const dayMatch = startDate.match(/(\d+)/);
                            const day = dayMatch ? parseInt(dayMatch[1]) : today.getDate();
                            const pickupDate = new Date(currentYear, currentMonth, day);
                            const deliveryDate = new Date(pickupDate.getTime() + 48 * 60 * 60 * 1000);
                            return deliveryDate.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }) + ' ' + scheduleTime;
                          })()}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Cleaning Services - Cleaning-specific information */
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Beräknad tid</div>
                        <div className="font-bold text-base text-purple-600">{rekommenderadeTimmar} timmar</div>
                      </div>
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Städmaterial</div>
                        <div className="font-bold text-sm text-orange-600">
                          {materials === 'yes' ? 'Ja, inkluderat' : 'Nej, egen'}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {!(
                    currentService.title.toLowerCase().includes('tvätt') ||
                    currentService.title.toLowerCase().includes('kläder') ||
                    currentService.title.toLowerCase().includes('arbetskläder') ||
                    currentService.title.toLowerCase().includes('skyddskläder') ||
                    currentService.title.toLowerCase().includes('bordsdukar') ||
                    currentService.title.toLowerCase().includes('kökshanddukar') ||
                    currentService.title.toLowerCase().includes('förkläden') ||
                    currentService.title.toLowerCase().includes('mattor') ||
                    currentService.title.toLowerCase().includes('servetter') ||
                    currentService.title.toLowerCase().includes('sängkläder') ||
                    currentService.title.toLowerCase().includes('vårduniformer')
                  ) && !isCarpet && (
                    <div className="grid grid-cols-2 gap-2">
                      <div
                        className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm hover:bg-blue-50 cursor-pointer"
                        onClick={() => setShowDatePicker(true)}
                        role="button"
                        aria-label="Ändra datum"
                        title="Klicka för att ändra datum"
                      >
                        <div className="text-xs text-gray-500 mb-1">Datum</div>
                        <div className="font-bold text-sm text-gray-900">{startDate}</div>
                      </div>
                      <div
                        className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm hover:bg-green-50 cursor-pointer"
                        onClick={() => setShowTimePicker(true)}
                        role="button"
                        aria-label="Ändra tid"
                        title="Klicka för att ändra tid"
                      >
                        <div className="text-xs text-gray-500 mb-1">Tid</div>
                        <div className="font-bold text-sm text-gray-900">{scheduleTime}</div>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="text-green-700 font-semibold text-sm">Totalpris</span>
                      <div className="text-right">
                        <span className="font-bold text-xl text-green-700">{totalPrice.toLocaleString()} kr</span>
                        <div className="text-xs text-green-600">ex moms</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <button
                    onClick={() => {
                      handleNextStep();
                    }}
                    disabled={!isCurrentStepValid()}
                    className={`w-full font-semibold py-3 px-6 rounded-lg transition-colors ${
                      isCurrentStepValid()
                        ? 'bg-gray-900 hover:bg-gray-800 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {!isCurrentStepValid() 
                      ? 'Fyll i alla fält för att fortsätta'
                      : isCodeVerified 
                        ? 'Slutför bokning'
                        : isCarpet
                          ? 'Bekräfta matt-tvätt'
                          : (currentService.title.toLowerCase().includes('tvätt') || currentService.title.toLowerCase().includes('kläder') || currentService.title.toLowerCase().includes('arbetskläder') || currentService.title.toLowerCase().includes('skyddskläder') || currentService.title.toLowerCase().includes('bordsdukar') || currentService.title.toLowerCase().includes('kökshanddukar') || currentService.title.toLowerCase().includes('förkläden') || currentService.title.toLowerCase().includes('servetter') || currentService.title.toLowerCase().includes('sängkläder') || currentService.title.toLowerCase().includes('vårduniformer'))
                            ? 'Bekräfta tvättbeställning'
                            : isConstructionCleaning
                            ? 'Nästa steg för Byggstäd'
                            : isLargeKitchen
                            ? 'Nästa steg för Storkök'
                            : 'Nästa steg för Kontorsstädning'
                    }
                  </button>
                </div>
              </div>
            )}
            
            {/* Office Cleaning Summary - Show in step 2 for all services except stair cleaning */}
            {step === 2 && (isOfficeCleaning || isLargeKitchen || isConstructionCleaning) && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg border border-blue-200 p-4">
                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 text-base">📋 Sammanfattning / Bekräftelse</h3>
                  <p className="text-xs text-gray-600">Kontrollera dina uppgifter</p>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-xs text-gray-500">📍 Leveransadress</div>
                      <button
                        onClick={() => {
                          setEditedAddress(selectedLocation || '');
                          setShowAddressEdit(true);
                        }}
                        className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center space-x-1"
                      >
                        <span>📋</span>
                        <span>Redigera</span>
                      </button>
                    </div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {selectedLocation || 'Adress kommer att hämtas automatiskt'}
                    </div>
                    {selectedLocation && (
                      <div className="text-xs text-green-600 mt-1">Adress verifierad</div>
                    )}
                  </div>
                  
                  {(currentService.title.toLowerCase().includes('tvätt') || currentService.title.toLowerCase().includes('kläder') || currentService.title.toLowerCase().includes('arbetskläder') || currentService.title.toLowerCase().includes('skyddskläder') || currentService.title.toLowerCase().includes('bordsdukar') || currentService.title.toLowerCase().includes('kökshanddukar') || currentService.title.toLowerCase().includes('förkläden') || currentService.title.toLowerCase().includes('servetter') || currentService.title.toLowerCase().includes('sängkläder') || currentService.title.toLowerCase().includes('vårduniformer')) && !isCarpet ? (
                   /* Laundry Services - Laundry-specific information */
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">
                          {currentService.title.toLowerCase().includes('arbetskläder') ? 'Antal plagg' : 'Antal textilier'}
                        </div>
                        <div className="font-bold text-base text-blue-600">
                          {currentService.title.toLowerCase().includes('arbetskläder') ? `${monthlyVolume} plagg` : `${monthlyVolume} st`}
                        </div>
                      </div>
                    </div>
                  ) : isFurniture ? (
                    /* Furniture step 2 summary */
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Sofftyp</div>
                        <div className="font-bold text-base text-blue-600">
                          {(() => {
                        const selectedTitles = furnitureOptions
                          .filter(o => (furnitureQuantities[o.id] || 0) > 0)
                          .map(o => `${o.title.split('(')[0].trim()} × ${furnitureQuantities[o.id]}`);
                        return selectedTitles.length ? selectedTitles.join(', ') : 'Ej vald';
                          })()}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Antal</div>
                        <div className="font-bold text-sm text-blue-700">
                          {Object.values(furnitureQuantities).reduce((sum, n) => sum + (n || 0), 0) || '—'}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Cleaning Services - Cleaning-specific information */
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Yta att städa</div>
                        <div className="font-bold text-base text-blue-600">{monthlyVolume} kvm</div>
                      </div>
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Antal städare</div>
                        <div className="font-bold text-base text-green-600">{professionals} städare</div>
                      </div>
                    </div>
                  )}
                  
                  {isCarpet ? (
                    /* Carpets - Show pickup and expected delivery side by side */
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Upphämtningstid</div>
                        <div className="font-extrabold text-lg text-gray-900">{startDate + ' ' + scheduleTime}</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                        <div className="text-sm text-gray-500 mb-1">Leveranstid</div>
                        <div className="font-extrabold text-lg text-purple-600">
                          {(() => {
                            const today = new Date();
                            const currentMonth = today.getMonth();
                            const currentYear = today.getFullYear();
                            const dayMatch = startDate.match(/(\d+)/);
                            const day = dayMatch ? parseInt(dayMatch[1]) : today.getDate();
                            const pickupDate = new Date(currentYear, currentMonth, day);
                            const deliveryDate = new Date(pickupDate.getTime() + 48 * 60 * 60 * 1000);
                            return deliveryDate.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }) + ' ' + scheduleTime;
                          })()}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Cleaning Services - Cleaning-specific information */
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Beräknad tid</div>
                        <div className="font-bold text-base text-purple-600">{rekommenderadeTimmar} timmar</div>
                      </div>
                      <div className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm">
                        <div className="text-xs text-gray-500 mb-1">Städmaterial</div>
                        <div className="font-bold text-sm text-orange-600">
                          {materials === 'yes' ? 'Ja, inkluderat' : 'Nej, egen'}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div
                      className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm hover:bg-blue-50 cursor-pointer"
                      onClick={() => setShowDatePicker(true)}
                      role="button"
                      aria-label="Ändra datum"
                      title="Klicka för att ändra datum"
                    >
                      <div className="text-xs text-gray-500 mb-1">Datum</div>
                      <div className="font-bold text-sm text-gray-900">{startDate}</div>
                    </div>
                    <div
                      className="bg-white rounded-lg p-2 border border-gray-100 shadow-sm hover:bg-green-50 cursor-pointer"
                      onClick={() => setShowTimePicker(true)}
                      role="button"
                      aria-label="Ändra tid"
                      title="Klicka för att ändra tid"
                    >
                      <div className="text-xs text-gray-500 mb-1">Tid</div>
                      <div className="font-bold text-sm text-gray-900">{scheduleTime}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="text-green-700 font-semibold text-sm">Totalpris</span>
                      <div className="text-right">
                        <span className="font-bold text-xl text-green-700">{totalPrice.toLocaleString()} kr</span>
                        <div className="text-xs text-green-600">ex moms</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Booking Details - Only for stair cleaning in other steps */}
            {step !== 1 && isStairCleaning && (
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
                    <span className="text-gray-600">
                      {currentService.title.toLowerCase().includes('tvätt') || currentService.title.toLowerCase().includes('kläder') || currentService.title.toLowerCase().includes('arbetskläder') || currentService.title.toLowerCase().includes('skyddskläder') || currentService.title.toLowerCase().includes('bordsdukar') || currentService.title.toLowerCase().includes('kökshanddukar') || currentService.title.toLowerCase().includes('förkläden') || currentService.title.toLowerCase().includes('mattor') || currentService.title.toLowerCase().includes('servetter') || currentService.title.toLowerCase().includes('sängkläder') || currentService.title.toLowerCase().includes('vårduniformer') ? 'Mangling/Strykning:' : 'Städmaterial:'}
                    </span>
                    <span className="text-gray-900">
                      {currentService.title.toLowerCase().includes('tvätt') || currentService.title.toLowerCase().includes('kläder') || currentService.title.toLowerCase().includes('arbetskläder') || currentService.title.toLowerCase().includes('skyddskläder') || currentService.title.toLowerCase().includes('bordsdukar') || currentService.title.toLowerCase().includes('kökshanddukar') || currentService.title.toLowerCase().includes('förkläden') || currentService.title.toLowerCase().includes('mattor') || currentService.title.toLowerCase().includes('servetter') || currentService.title.toLowerCase().includes('sängkläder') || currentService.title.toLowerCase().includes('vårduniformer') 
                        ? (materials === 'yes' ? 'Ja' : 'Nej')
                        : (materials === 'yes' ? 'Ja' : 'Nej')
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Payment Summary - Only for stair cleaning */}
            {isStairCleaning && (
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
                  ) : currentService.title.toLowerCase().includes('arbetskläder') ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Antal plagg:</span>
                        <span className="text-gray-900">{monthlyVolume} plagg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pris per plagg:</span>
                        <span className="text-gray-900">30 kr</span>
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
                  ) : currentService.title.toLowerCase().includes('tvätt') || currentService.title.toLowerCase().includes('kläder') || currentService.title.toLowerCase().includes('skyddskläder') || currentService.title.toLowerCase().includes('bordsdukar') || currentService.title.toLowerCase().includes('kökshanddukar') || currentService.title.toLowerCase().includes('förkläden') || currentService.title.toLowerCase().includes('mattor') || currentService.title.toLowerCase().includes('servetter') || currentService.title.toLowerCase().includes('sängkläder') || currentService.title.toLowerCase().includes('vårduniformer') ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Antal textilier:</span>
                        <span className="text-gray-900">{monthlyVolume} st</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pris per textil:</span>
                        <span className="text-gray-900">25 kr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Baspris (utan påslag):</span>
                        <span className="text-gray-900">{prisUtanPåslag.toLocaleString()} kr</span>
                      </div>
                      {materials === 'yes' && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Mangling/Strykning (+5 kr/st):</span>
                          <span className="text-gray-900">+{(monthlyVolume * 5).toLocaleString()} kr</span>
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
            
          </div>
          )}
        </div>
        
        {/* Date Picker Modal */}
        {showDatePicker && (
          <DatePickerModal
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            onSelectDate={(date) => setStartDate(date)}
            onClose={() => setShowDatePicker(false)}
          />
        )}
        
        {/* Time Picker Modal */}
        {showTimePicker && (
          <TimePickerModal
            scheduleTime={scheduleTime}
            onSelectTime={(time) => setScheduleTime(time)}
            onClose={() => setShowTimePicker(false)}
          />
        )}
        
        {/* Address Edit Modal - Simplified Version */}
        {showAddressEdit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Välj leveransadress</h2>
                <button
                  onClick={() => {
                    setShowAddressEdit(false);
                    setEditedAddress('');
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Simple address input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Leveransadress
                  </label>
                  <textarea
                    value={editedAddress}
                    onChange={(e) => setEditedAddress(e.target.value)}
                    placeholder="Ange din leveransadress (t.ex. Storgatan 1, 123 45 Stockholm)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={3}
                  />
                </div>

                {/* Quick address examples */}
                <div>
                  <div className="text-sm text-gray-600 mb-2">Snabbval:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Storgatan 1, Stockholm',
                      'Drottninggatan 1, Stockholm', 
                      'Kungsgatan 1, Stockholm',
                      'Vasagatan 1, Stockholm'
                    ].map((address) => (
                      <button
                        key={address}
                        onClick={() => setEditedAddress(address)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded text-left transition-colors"
                      >
                        {address}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setShowAddressEdit(false);
                      setEditedAddress('');
                    }}
                    className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Avbryt
                  </button>
                  <button
                    onClick={() => {
                      if (editedAddress.trim()) {
                        setSelectedLocation(editedAddress.trim());
                      }
                      setShowAddressEdit(false);
                    }}
                    disabled={!editedAddress.trim()}
                    className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Spara adress
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
                Tack för din beställning!
              </h2>
              {/* Body Text */}
              <p className="text-gray-700 mb-4">
                Vi återkommer till dig inom kort med bekräftelse och mer information.
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
    </div>
  );
}
