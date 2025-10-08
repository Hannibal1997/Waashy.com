import React, { useState } from 'react';
import { 
  Home, Sofa, Utensils, Shirt, Wind, Car, 
  Wrench, Droplets, Stethoscope, 
  Shield, X, ShoppingCart, 
  Trash2, ArrowRight, ArrowLeft
} from 'lucide-react';
import BookingPage from './BookingPage';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  examples: string[];
  category: string;
  subcategory?: string;
  isNew?: boolean;
  subcategories?: Service[];
}

interface ServiceCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  services: Service[];
  showAll?: boolean;
}

interface CartItem {
  service: Service;
  quantity: number;
  monthlyVolume: number;
  pricePerUnit: number;
  totalMonthlyCost: number;
}

interface ServicesPageProps {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  showCart: boolean;
  setShowCart: (show: boolean) => void;
}

export default function ServicesPage({ cart, setCart, showCart, setShowCart }: ServicesPageProps) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Service | null>(null);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const serviceCategories: ServiceCategory[] = [
    {
      id: 'cleaning',
      title: 'Lokalvård',
      icon: <Home className="h-6 w-6" />,
      services: [
        {
          id: 'office-cleaning',
          title: 'Kontorsstädning',
          description: 'Städning av kontorslokaler och arbetsplatser',
          icon: <Home className="h-6 w-6" />,
          examples: ['Kontor', 'Arbetsplatser', 'Mötesrum'],
          category: 'cleaning',
          subcategory: 'office'
        },
        {
          id: 'moving-cleaning',
          title: 'Flyttstädning',
          description: 'Städning efter flytt och renovering',
          icon: <Home className="h-6 w-6" />,
          examples: ['Flyttstäd', 'Renovering', 'Efter bygg'],
          category: 'cleaning',
          subcategory: 'moving'
        },
        {
          id: 'commercial-kitchen',
          title: 'Storkök',
          description: 'Specialiserad städning av storkök och matsalar',
          icon: <Home className="h-6 w-6" />,
          examples: ['Storkök', 'Matsalar', 'Restauranger'],
          category: 'cleaning',
          subcategory: 'kitchen'
        },
        {
          id: 'construction-cleaning',
          title: 'Byggstädning',
          description: 'Städning efter byggarbeten och renovering',
          icon: <Wrench className="h-6 w-6" />,
          examples: ['Byggstäd', 'Renovering', 'Nybyggnation', 'Flyttstäd'],
          category: 'cleaning',
          subcategory: 'construction'
        },
        {
          id: 'upholstery-cleaning',
          title: 'Möbelrengöring',
          description: 'Djupkemrengöring av möbler och textiler',
          icon: <Sofa className="h-6 w-6" />,
          examples: ['Soffor', 'Stolar', 'Kuddar', 'Textilier'],
          category: 'cleaning',
          subcategory: 'upholstery'
        },
      ]
    },
    {
      id: 'laundry',
      title: 'Tvätt',
      icon: <Shirt className="h-6 w-6" />,
      services: [
        {
          id: 'workwear-laundry',
          title: 'Arbetskläder',
          description: 'Tvätt av overaller, byxor och arbetskläder',
          icon: <Shirt className="h-6 w-6" />,
          examples: ['Overaller', 'Byxor', 'Arbetskläder', 'Uniformer'],
          category: 'laundry',
          subcategory: 'workwear'
        },
        {
          id: 'tablecloths-laundry',
          title: 'Bordsdukar',
          description: 'Professionell tvätt av dukar för restauranger och event',
          icon: <Utensils className="h-6 w-6" />,
          examples: ['Restaurangdukar', 'Eventdukar', 'Bordsdukar', 'Festdukar'],
          category: 'laundry',
          subcategory: 'tablecloths'
        },
        {
          id: 'kitchen-towels-laundry',
          title: 'Kökshanddukar',
          description: 'Livsmedelssäker tvätt av handdukar och kökstextilier',
          icon: <Utensils className="h-6 w-6" />,
          examples: ['Kökshanddukar', 'Kökstextilier', 'Kökslinne', 'Handdukar'],
          category: 'laundry',
          subcategory: 'kitchen-towels'
        },
        {
          id: 'aprons-laundry',
          title: 'Förkläden',
          description: 'Skonsam och hygienisk tvätt av förkläden',
          icon: <Shirt className="h-6 w-6" />,
          examples: ['Förkläden', 'Köksförkläden', 'Arbetsförkläden', 'Skyddskläder'],
          category: 'laundry',
          subcategory: 'aprons'
        },
        {
          id: 'mats-laundry',
          title: 'Mattor',
          description: 'Tvätt av entré-, yoga- och träningsmattor',
          icon: <Home className="h-6 w-6" />,
          examples: ['Entrémattor', 'Yogamattor', 'Träningsmattor', 'Gummimattor'],
          category: 'laundry',
          subcategory: 'mats'
        },
        {
          id: 'napkins-laundry',
          title: 'Servetter',
          description: 'Tvätt av servetter för restaurang, hotell och event',
          icon: <Utensils className="h-6 w-6" />,
          examples: ['Restaurangservetter', 'Hotellservetter', 'Eventservetter', 'Servetter'],
          category: 'laundry',
          subcategory: 'napkins'
        },
        {
          id: 'bedding-laundry',
          title: 'Sängkläder',
          description: 'Skonsam linnetvätt av sängkläder',
          icon: <Home className="h-6 w-6" />,
          examples: ['Lakan', 'Örngott', 'Sängkläder', 'Linnetvätt'],
          category: 'laundry',
          subcategory: 'bedding'
        },
        {
          id: 'medical-uniforms-laundry',
          title: 'Vårduniformer',
          description: 'Hygienisk tvätt av vårduniformer och skrubbar',
          icon: <Stethoscope className="h-6 w-6" />,
          examples: ['Vårduniformer', 'Skrubbar', 'Sjukhuskläder', 'Vårdkläder'],
          category: 'laundry',
          subcategory: 'medical'
        },
      ]
    },
    {
      id: 'maintenance-services',
      title: 'Fastighetsservice',
      icon: <Wrench className="h-6 w-6" />,
      services: [
        {
          id: 'window-cleaning',
          title: 'Fönsterputs',
          description: 'Professionell fönsterputsning och fasadtvätt',
          icon: <Wind className="h-6 w-6" />,
          examples: ['Fönster', 'Fasader', 'Glasdörrar', 'Skyltfönster'],
          category: 'maintenance-services',
          subcategory: 'windows'
        },
        {
          id: 'roof-cleaning',
          title: 'Taktvätt',
          description: 'Rengöring och tvätt av tak',
          icon: <Wind className="h-6 w-6" />,
          examples: ['Tak', 'Takrännor', 'Takfönster', 'Takrengöring'],
          category: 'maintenance-services',
          subcategory: 'roof'
        },
        {
          id: 'graffiti-removal',
          title: 'Klottersanering',
          description: 'Borttagning av klotter och graffiti',
          icon: <Wrench className="h-6 w-6" />,
          examples: ['Klotter', 'Graffiti', 'Vandalism', 'Taggar'],
          category: 'maintenance-services',
          subcategory: 'graffiti'
        },
        {
          id: 'stairwell-cleaning',
          title: 'Trappstädning',
          description: 'Städning av trappor och trapphus',
          icon: <Home className="h-6 w-6" />,
          examples: ['Trappor', 'Trapphus', 'Lobby', 'Entréer'],
          category: 'maintenance-services',
          subcategory: 'stairs'
        },
        {
          id: 'floor-care',
          title: 'Golvvård',
          description: 'Professionell golvvård och underhåll',
          icon: <Home className="h-6 w-6" />,
          examples: ['Parkett', 'Laminat', 'Linoleum', 'Kakel'],
          category: 'maintenance-services',
          subcategory: 'flooring'
        },
        {
          id: 'high-altitude-cleaning',
          title: 'Höghöjdsstädning',
          description: 'Städning på höga byggnader och svårtillgängliga platser',
          icon: <Home className="h-6 w-6" />,
          examples: ['Höga byggnader', 'Fasader', 'Tak', 'Svårtillgängliga platser'],
          category: 'maintenance-services',
          subcategory: 'high-altitude'
        },
        {
          id: 'garage-cleaning',
          title: 'Garagestädning',
          description: 'Städning av garage och parkeringsanläggningar',
          icon: <Car className="h-6 w-6" />,
          examples: ['Garage', 'Parkeringsgarage', 'Bilverkstäder', 'Lager'],
          category: 'maintenance-services',
          subcategory: 'garage'
        },
        {
          id: 'warehouse-cleaning',
          title: 'Lagerstäd',
          description: 'Städning av lager och distributionsanläggningar',
          icon: <Home className="h-6 w-6" />,
          examples: ['Lager', 'Distributionscenter', 'Leveranscentraler', 'Magasin'],
          category: 'maintenance-services',
          subcategory: 'warehouse'
        },
        {
          id: 'sanitary-services',
          title: 'Sanitära tjänster',
          description: 'Sanitära produkter och service',
          icon: <Droplets className="h-6 w-6" />,
          examples: ['Toalettpapper', 'Handtvål', 'Dispensers', 'Sanitära produkter'],
          category: 'maintenance-services',
          subcategory: 'sanitary'
        }
      ]
    },
    {
      id: 'business-services',
      title: 'Företagsservice',
      icon: <Home className="h-6 w-6" />,
      showAll: true,
      services: [
        {
          id: 'paper-products',
          title: 'Pappersprodukter',
          description: 'Toalettpapper, torkpapper och pappershanddukar',
          icon: <Home className="h-6 w-6" />,
          examples: ['Toapapper', 'Torkpapper', 'Pappershanddukar', 'Köksrulle', 'Hushållspapper', 'Engångstrasa', 'Systempapper', 'Dispenser pappersprodukter', 'Pappersprodukter övrigt'],
          category: 'business-services',
          subcategory: 'paper-products'
        },
        {
          id: 'bags-waste-products',
          title: 'Påsar & avfallsprodukter',
          description: 'Sopsäckar, avfallspåsar och sanitetspåsar',
          icon: <Home className="h-6 w-6" />,
          examples: ['Sopsäckar', 'Avfallspåsar', 'Sanitetspåsar', 'Tube säckar', 'Soptunnor & Säckvagnar', 'Papperskorgspåse'],
          category: 'business-services',
          subcategory: 'bags-waste'
        },
        {
          id: 'consumables',
          title: 'Förbrukningsmaterial',
          description: 'Servetter, handskar, dukar och förbrukningsmaterial',
          icon: <Home className="h-6 w-6" />,
          examples: ['Servetter/Dispenser', 'Handskar', 'Dukar', 'Film/Folie/Vacumpåse', 'Ljus/Lampolja', 'Kvittorullar', 'Fryspåsar', 'Servetter tryckta', 'Förbrukningsmaterial övrigt'],
          category: 'business-services',
          subcategory: 'consumables'
        },
        {
          id: 'dishwashing-products',
          title: 'Diskprodukter',
          description: 'Disk- och torkmedel, handdisk och avkalkningsmedel',
          icon: <Utensils className="h-6 w-6" />,
          examples: ['Disk & torkmedel', 'Handdisk', 'Blötläggning', 'Avkalkningsmedel', 'Maskindisk Hushåll', 'Granuler', 'Diskvårdskemikalier dosering/reservdelar', 'Diskprodukter Övrigt'],
          category: 'business-services',
          subcategory: 'dishwashing'
        },
        {
          id: 'cleaning-hygiene',
          title: 'Rengöring och hygien',
          description: 'Grovrent, allrent, fettlösare och sanitetsrent',
          icon: <Shield className="h-6 w-6" />,
          examples: ['Grovrent', 'Allrent och såpa', 'Fettlösare och Ugnsrent', 'Sanitetsrent', 'Fönsterputs', 'Divermite & SmartDose', 'Antibakteriellt & Desinfektion', 'Doftförbättrare och dispenser', 'Golvvård och mattrengöring', 'Interiörvård', 'Rational-produkter', 'Rengöring & hygien övrigt'],
          category: 'business-services',
          subcategory: 'cleaning-hygiene'
        },
        {
          id: 'soap-products',
          title: 'Tvål',
          description: 'Dusch, schampo, handcreme och handdesinfektion',
          icon: <Droplets className="h-6 w-6" />,
          examples: ['Dusch&Schampo', 'Handcreme', 'Handdesinfektion', 'Dispenser Tvål & Handdesinfektion', 'Första hjälpen/plåster'],
          category: 'business-services',
          subcategory: 'soap'
        },
        {
          id: 'cleaning-materials',
          title: 'Städ och rengöringsmaterial',
          description: 'Moppar, rakor, borstar och städhjälpmedel',
          icon: <Wrench className="h-6 w-6" />,
          examples: ['Moppar & Minisvabb', 'Rakor & Borstar', 'Redskapshållare', 'Skaft & Stativ', 'Sopset & städhjälpmedel', 'Sprayflskor & Doseringstillbehör', 'Städdukar & Dammvippor', 'Städmaskiner & Tillbehör', 'Städvagnar & Tillbehör', 'Svampduk & Svampar', 'Städ & Rengöringsmaterial Övrigt', 'Skumspruta', 'Lågtrycksaggregat & Tillbehör'],
          category: 'business-services',
          subcategory: 'cleaning-materials'
        },
        {
          id: 'textile-care-products',
          title: 'Textilvårdsprodukter',
          description: 'Tvättmedel och tvättprodukter för automatdoserade system',
          icon: <Shirt className="h-6 w-6" />,
          examples: ['Tvättmedel', 'Tvättprodukter automatdoserade', 'Tvättprodukter hushållsmaskiner', 'Tvättmedeldosering', 'Tvättmedeldosering tillbehör/reservdelar', 'Tvättmaskin', 'Textilvårdsprodukter övrigt'],
          category: 'business-services',
          subcategory: 'textile-care'
        },
        {
          id: 'packaging-forms',
          title: 'Förpackningar & Formar',
          description: 'Bagasse, microformar, aluformar och plastformar',
          icon: <Home className="h-6 w-6" />,
          examples: ['Bagasse', 'Microformar och lock', 'Aluformar och lock', 'Plastformar och lock', 'Hämtboxar', 'Matlåda Papper', 'Sås / Dressing Bägare', 'Microform Förslutning', 'Pizza / Kebab kartong', 'Sallad / Sushi Lådor'],
          category: 'business-services',
          subcategory: 'packaging-forms'
        },
        {
          id: 'glass-cups-mugs',
          title: 'Glas, Bägare & Muggar',
          description: 'Kaffemuggar, kaffebägare och plastglas',
          icon: <Utensils className="h-6 w-6" />,
          examples: ['Kaffemuggar och lock', 'Kaffebägare', 'Plastglas', 'Tillbehör Take Away'],
          category: 'business-services',
          subcategory: 'glass-cups'
        },
        {
          id: 'cutlery-straws',
          title: 'Bestick Plast/Trä',
          description: 'Bestick, sugrör och tillbehör',
          icon: <Utensils className="h-6 w-6" />,
          examples: ['Bestick Plast/Trä', 'Sugrör'],
          category: 'business-services',
          subcategory: 'cutlery'
        },
        {
          id: 'bags-carrying',
          title: 'Påsar & Kassar',
          description: 'Papperskassar, plastkassar och påsar',
          icon: <Home className="h-6 w-6" />,
          examples: ['Papperskasse', 'Plastkasse', 'Påsar'],
          category: 'business-services',
          subcategory: 'bags-carrying'
        },
        {
          id: 'catering',
          title: 'Catering',
          description: 'Cateringprodukter och tillbehör',
          icon: <Utensils className="h-6 w-6" />,
          examples: ['Catering'],
          category: 'business-services',
          subcategory: 'catering'
        },
        {
          id: 'workwear-rental',
          title: 'Arbetskläder & Hyra',
          description: 'Uthyrning och underhåll av arbetskläder',
          icon: <Shirt className="h-6 w-6" />,
          examples: ['Arbetskläder', 'Skyddskläder', 'Tvätt', 'Reparation'],
          category: 'business-services',
          subcategory: 'workwear'
        }
      ]
    }
  ];

  const addToCart = (service: Service) => {
    const existingItem = cart.find(item => item.service.id === service.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.service.id === service.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { 
        service: service, 
        quantity: 1,
        monthlyVolume: 100, // Default values for booking process
        pricePerUnit: 25,   // Will be calculated based on user choices
        totalMonthlyCost: 0 // Will be calculated in booking process
      }]);
    }
  };

  const removeFromCart = (serviceId: string) => {
    setCart(cart.filter(item => item.service.id !== serviceId));
  };



  const selectSubcategory = (subcategory: Service) => {
    setSelectedService(subcategory);
    setShowSubcategories(false);
    setShowBooking(true);
  };

  const goBackToCategories = () => {
    setShowSubcategories(false);
    setSelectedCategory(null);
  };


  if (showBooking && selectedService) {
    return <BookingPage service={selectedService} onBack={() => setShowBooking(false)} />;
  }

  if (showBooking && cart.length > 0) {
    return <BookingPage cart={cart} onBack={() => setShowBooking(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Subcategories View */}
      {showSubcategories && selectedCategory && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="mb-6">
            <button
              onClick={goBackToCategories}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to {selectedCategory.title}</span>
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {selectedCategory.title}
            </h2>
            <p className="text-gray-600">
              {selectedCategory.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedCategory.subcategories?.map((subcategory) => (
              <div
                key={subcategory.id}
                onClick={() => selectSubcategory(subcategory)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer p-6"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-blue-600">
                    {subcategory.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {subcategory.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  {subcategory.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {subcategory.examples.map((example, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* Main Content */}
      {!showSubcategories && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Leave your to-do list to us!
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Välj de tjänster du behöver och få en skräddarsydd offert
            </p>
          </div>
        
        {/* Service Categories */}
        <div className="space-y-8">
          {serviceCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-4 sm:px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-blue-600">
                      {category.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      <span>{expandedCategory === category.id ? 'Visa mindre' : 'Se alla'}</span>
                      <ArrowRight className={`h-4 w-4 transition-transform ${expandedCategory === category.id ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Services Display */}
              <div className="p-4 sm:p-6">
                {expandedCategory === category.id ? (
                  /* Expanded Grid View */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {category.services.map((service) => (
                      <div
                        key={service.id}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 relative"
                      >
                        {service.isNew && (
                          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                            NEW
                          </div>
                        )}
                        {/* Service Icon */}
                        <div className="h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-t-lg flex items-center justify-center">
                          <div className="text-blue-600">
                            <div className="h-8 w-8 flex items-center justify-center">
                              {service.icon}
                            </div>
                          </div>
                        </div>
                        {/* Service Content */}
                        <div className="p-3">
                          <h4 className="text-sm font-semibold text-gray-900 text-center mb-2">
                            {service.title}
                          </h4>
                          <button
                            onClick={() => addToCart(service)}
                            className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            Lägg till
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Horizontal Scroll View */
                  <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                    {category.services.map((service) => (
                      <div
                        key={service.id}
                        className="flex-shrink-0 w-48 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 relative"
                      >
                        {service.isNew && (
                          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                            NEW
                          </div>
                        )}
                        {/* Service Icon */}
                        <div className="h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-t-lg flex items-center justify-center">
                          <div className="text-blue-600">
                            <div className="h-8 w-8 flex items-center justify-center">
                              {service.icon}
                            </div>
                          </div>
                        </div>
                        {/* Service Content */}
                        <div className="p-3">
                          <h4 className="text-sm font-semibold text-gray-900 text-center mb-2">
                            {service.title}
                          </h4>
                          <button
                            onClick={() => addToCart(service)}
                            className="w-full bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            Lägg till
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        </main>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Shopping Cart
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 sm:p-6">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">📋</span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{item.service.title}</h3>
                          <p className="text-sm text-gray-500">{item.service.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(item.service.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Ta bort tjänst"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-4 sm:p-6">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Tjänster i kundvagnen:</span>
                    <span className="text-sm text-gray-500">{cart.length} tjänster</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Priser beräknas baserat på dina val i bokningsprocessen
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setShowCart(false);
                    setShowBooking(true);
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Fortsätt till bokning ({cart.length} tjänster)
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
