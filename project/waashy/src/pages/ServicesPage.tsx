import React, { useState } from 'react';
import { 
  Shirt, Building2, Shield, Car, Layers, Eye, Sofa, Truck, BarChart3,
  Plus, Minus, X, ShoppingCart, Trash2, ArrowRight
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  examples: string[];
  category: 'cleaning' | 'textile' | 'maintenance' | 'logistics';
}

interface CartItem {
  service: Service;
  quantity: number;
  monthlyVolume: number;
  pricePerUnit: number;
  totalMonthlyCost: number;
}

export default function ServicesPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bidData, setBidData] = useState({
    monthlyVolume: 100,
    pricePerUnit: 50,
    totalMonthlyCost: 5000
  });

  const services: Service[] = [
    {
      id: 'textile-service',
      title: 'Tvätt & textilservice',
      description: 'Hämtning, tvätt, mangling/press och leverans av arbetskläder, lakan, handdukar och dukar.',
      icon: <Shirt className="h-8 w-8" />,
      examples: ['Hotell', 'Restauranger', 'Bagerier', 'Spa', 'Kontor'],
      category: 'textile'
    },
    {
      id: 'office-cleaning',
      title: 'Kontorsstädning & golvvård',
      description: 'Regelbunden städning, golvvård och desinfektion av kontor och kommersiella lokaler.',
      icon: <Building2 className="h-8 w-8" />,
      examples: ['Kontor', 'Kommersiella lokaler', 'Coworking spaces'],
      category: 'cleaning'
    },
    {
      id: 'workwear-rental',
      title: 'Hyra & underhåll av arbetskläder',
      description: 'Uthyrning, storleksbyten, löpande tvätt och reparation av arbets- och skyddskläder.',
      icon: <Shield className="h-8 w-8" />,
      examples: ['Industri', 'Byggföretag', 'Verkstäder', 'Laboratorier'],
      category: 'textile'
    },
    {
      id: 'fleet-washing',
      title: 'Mobil fordonstvätt för företagsflottor',
      description: 'På-plats-tvätt av företagsbilar, skåpbilar och lastbilar för att minska driftstopp.',
      icon: <Car className="h-8 w-8" />,
      examples: ['Transportföretag', 'Leveransföretag', 'Taxi', 'Hyrbilsföretag'],
      category: 'cleaning'
    },
    {
      id: 'mat-service',
      title: 'Matt- och entrémattservice',
      description: 'Utlägg, schemalagd tvätt och rotation av entrémattor, industrimattor och gummimattor.',
      icon: <Layers className="h-8 w-8" />,
      examples: ['Kontor', 'Butiker', 'Restauranger', 'Industrilokaler'],
      category: 'maintenance'
    },
    {
      id: 'window-cleaning',
      title: 'Fönsterputs & fasadtvätt',
      description: 'Professionell putsning av fönster samt högtryckstvätt av fasader.',
      icon: <Eye className="h-8 w-8" />,
      examples: ['Kontorsbyggnader', 'Butiker', 'Restauranger', 'Hotell'],
      category: 'cleaning'
    },
    {
      id: 'furniture-cleaning',
      title: 'Möbel- och heltäckningsmattvård',
      description: 'Djupkemrengöring av soffor, stolar och heltäckningsmattor för kontor och hotell.',
      icon: <Sofa className="h-8 w-8" />,
      examples: ['Kontor', 'Hotell', 'Restauranger', 'Väntrum'],
      category: 'cleaning'
    },
    {
      id: 'logistics',
      title: 'Logistik & spårning',
      description: 'Schemalagd hämtning/leverans med realtidsspårning via app/webb.',
      icon: <Truck className="h-8 w-8" />,
      examples: ['Alla tjänster', 'Realtidsspårning', 'Flexibel schemaläggning'],
      category: 'logistics'
    },
    {
      id: 'reporting',
      title: 'Miljö- och kvalitetsrapportering',
      description: 'Digital uppföljning av tvättcykler, vatten/energiförbrukning och hygienkontroller för ISO 14001.',
      icon: <BarChart3 className="h-8 w-8" />,
      examples: ['ISO 14001', 'Miljörapporter', 'Kvalitetskontroll', 'Hållbarhet'],
      category: 'logistics'
    }
  ];

  const openBidModal = (service: Service) => {
    setSelectedService(service);
    setShowBidModal(true);
    const defaultVolume = getDefaultVolume(service.id);
    const defaultPrice = getDefaultPrice(service.id);
    setBidData({
      monthlyVolume: defaultVolume,
      pricePerUnit: defaultPrice,
      totalMonthlyCost: defaultVolume * defaultPrice
    });
  };

  const getDefaultVolume = (serviceId: string) => {
    const defaults: { [key: string]: number } = {
      'textile-service': 500,
      'office-cleaning': 1000,
      'workwear-rental': 50,
      'fleet-washing': 10,
      'mat-service': 20,
      'window-cleaning': 500,
      'furniture-cleaning': 100,
      'logistics': 50,
      'reporting': 1
    };
    return defaults[serviceId] || 100;
  };

  const getDefaultPrice = (serviceId: string) => {
    const defaults: { [key: string]: number } = {
      'textile-service': 25,
      'office-cleaning': 15,
      'workwear-rental': 150,
      'fleet-washing': 300,
      'mat-service': 200,
      'window-cleaning': 20,
      'furniture-cleaning': 50,
      'logistics': 100,
      'reporting': 500
    };
    return defaults[serviceId] || 50;
  };

  const getVolumeUnit = (serviceId: string) => {
    const units: { [key: string]: string } = {
      'textile-service': 'kg',
      'office-cleaning': 'm²',
      'workwear-rental': 'plagg',
      'fleet-washing': 'fordon',
      'mat-service': 'mattor',
      'window-cleaning': 'm²',
      'furniture-cleaning': 'm²',
      'logistics': 'leveranser',
      'reporting': 'rapporter'
    };
    return units[serviceId] || 'enheter';
  };

  const handleVolumeChange = (value: number) => {
    setBidData(prev => ({
      ...prev,
      monthlyVolume: value,
      totalMonthlyCost: value * prev.pricePerUnit
    }));
  };

  const handlePriceChange = (value: number) => {
    setBidData(prev => ({
      ...prev,
      pricePerUnit: value,
      totalMonthlyCost: prev.monthlyVolume * value
    }));
  };

  const addBidToCart = () => {
    if (!selectedService) return;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.service.id === selectedService.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.service.id === selectedService.id
            ? { 
                ...item, 
                quantity: item.quantity + 1,
                monthlyVolume: bidData.monthlyVolume,
                pricePerUnit: bidData.pricePerUnit,
                totalMonthlyCost: bidData.totalMonthlyCost
              }
            : item
        );
      } else {
        return [...prevCart, { 
          service: selectedService, 
          quantity: 1,
          monthlyVolume: bidData.monthlyVolume,
          pricePerUnit: bidData.pricePerUnit,
          totalMonthlyCost: bidData.totalMonthlyCost
        }];
      }
    });
    
    setShowBidModal(false);
    setSelectedService(null);
  };

  const removeFromCart = (serviceId: string) => {
    setCart(prevCart => prevCart.filter(item => item.service.id !== serviceId));
  };

  const updateQuantity = (serviceId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(serviceId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.service.id === serviceId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header with Cart */}
      {cart.length > 0 && (
        <div className="bg-white shadow-sm border-b sticky top-14 sm:top-16 z-30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Välj tjänster</h1>
                <p className="text-sm sm:text-base text-gray-600 hidden sm:block">Lägg till de tjänster du behöver</p>
              </div>
              <button
                onClick={() => setShowCart(true)}
                className="relative bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Offertvarukorg ({getTotalItems()})</span>
                <span className="sm:hidden">({getTotalItems()})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Leave your to-do list to us!
          </h2>
          <p className="text-base sm:text-lg text-gray-600">
            Välj de tjänster du behöver och få en skräddarsydd offert
          </p>
        </div>
        
        {/* Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-200"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                  <div className="text-cyan-500">
                    {React.cloneElement(service.icon as React.ReactElement, { className: "h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0" })}
                  </div>
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                    {service.title}
                  </h3>
                </div>
                <button
                  onClick={() => openBidModal(service)}
                  className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm font-medium flex-shrink-0"
                >
                  Lägg till
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Offertvarukorg</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-sm sm:text-base text-gray-600">Din offertvarukorg är tom</p>
                  <p className="text-sm text-gray-500 mt-2">Lägg till tjänster för att få en offert</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    {cart.map((item) => (
                      <div key={item.service.id} className="flex items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl gap-3">
                        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                          <div className="text-blue-600">
                            {React.cloneElement(item.service.icon as React.ReactElement, { className: "h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0 mt-0.5 sm:mt-0" })}
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{item.service.title}</h4>
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-none">{item.service.description}</p>
                            <div className="text-xs text-gray-500 mt-1">
                              {item.monthlyVolume} {getVolumeUnit(item.service.id)} × {item.pricePerUnit} kr = {item.totalMonthlyCost.toLocaleString()} kr/mån
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 flex-shrink-0">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <button
                              onClick={() => updateQuantity(item.service.id, item.quantity - 1)}
                              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                              <Minus className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                            </button>
                            <span className="w-6 sm:w-8 text-center font-medium text-sm sm:text-base">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.service.id, item.quantity + 1)}
                              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.service.id)}
                            className="p-1.5 sm:p-2 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={() => setShowCart(false)}
                      className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                    >
                      Välj fler tjänster
                    </button>
                    <button
                      className="flex-1 bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                    >
                      <span>Begär offert</span>
                      <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bid Modal */}
      {showBidModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">Anpassa din tjänst</h3>
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 mt-1 truncate">{selectedService.title}</h2>
                </div>
                <button
                  onClick={() => setShowBidModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{selectedService.description}</p>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-base sm:text-lg font-semibold text-blue-600">Månadsvolym</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl sm:text-2xl font-bold text-blue-600">{bidData.monthlyVolume}</span>
                    <span className="text-sm sm:text-lg text-blue-600">{getVolumeUnit(selectedService.id)}</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="10"
                    max="2000"
                    value={bidData.monthlyVolume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-blue"
                  />
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-base sm:text-lg font-semibold text-green-600">Pris per {getVolumeUnit(selectedService.id)}</label>
                  <div className="bg-green-100 px-2 sm:px-3 py-1 rounded-lg">
                    <span className="text-lg sm:text-xl font-bold text-green-700">{bidData.pricePerUnit}</span>
                    <span className="text-sm text-green-600 ml-1">kr</span>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="5"
                    max="200"
                    value={bidData.pricePerUnit}
                    onChange={(e) => handlePriceChange(Number(e.target.value))}
                    className="w-full h-2 sm:h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">Ditt pris per {getVolumeUnit(selectedService.id)}</div>
                  <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Inkl. alla tjänster</div>
                  <div className="text-xl sm:text-2xl font-bold text-green-600">{bidData.pricePerUnit} kr</div>
                </div>
                <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                  <div className="text-sm text-gray-600 mb-1">Total månadskostnad</div>
                  <div className="text-xs sm:text-sm text-gray-500 mb-1 sm:mb-2">Baserat på din volym</div>
                  <div className="text-lg sm:text-2xl font-bold text-blue-600">{bidData.totalMonthlyCost.toLocaleString()} kr</div>
                </div>
              </div>

              <button
                onClick={addBidToCart}
                className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-base sm:text-lg font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Lägg till i offertvarukorg</span>
              </button>

              <p className="text-center text-xs sm:text-sm text-gray-500">
                Slutlig offert skickas inom 2 timmar efter förfrågan
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}