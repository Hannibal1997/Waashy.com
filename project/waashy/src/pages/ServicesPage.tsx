import React, { useState } from 'react';
import { 
  Home, Sofa, Utensils, Shirt, Wind, Car, Footprints, Scissors, Sparkles, 
  Wrench, Paintbrush, Droplets, Stethoscope, TestTube, Syringe, 
  UserCheck, Shield, Heart, Brain, Plus, Minus, X, ShoppingCart, 
  Trash2, ArrowRight, ArrowLeft, ChevronRight
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

export default function ServicesPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Service | null>(null);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [bidData, setBidData] = useState({
    monthlyVolume: 100,
    pricePerUnit: 50,
    totalMonthlyCost: 5000
  });

  const serviceCategories: ServiceCategory[] = [
    {
      id: 'cleaning',
      title: 'Städ',
      icon: <Home className="h-6 w-6" />,
      showAll: true,
      services: [
        {
          id: 'restaurant-cafe-cleaning',
          title: 'Restaurang & Café',
          description: 'Städning för restauranger och caféer',
          icon: <Utensils className="h-6 w-6" />,
          examples: ['Restauranger', 'Caféer', 'Bagerier', 'Matbutiker'],
          category: 'cleaning',
          subcategory: 'restaurant',
          subcategories: [
            {
              id: 'restaurants',
              title: 'Restauranger',
              description: 'Städning för restauranger',
              icon: <Utensils className="h-6 w-6" />,
              examples: ['Restauranger', 'Matbutiker', 'Kök'],
              category: 'cleaning',
              subcategory: 'restaurants'
            },
            {
              id: 'cafes',
              title: 'Caféer',
              description: 'Städning för caféer',
              icon: <Utensils className="h-6 w-6" />,
              examples: ['Caféer', 'Kaffebar', 'Bagerier'],
              category: 'cleaning',
              subcategory: 'cafes'
            },
            {
              id: 'bakeries',
              title: 'Bagerier',
              description: 'Städning för bagerier',
              icon: <Utensils className="h-6 w-6" />,
              examples: ['Bagerier', 'Konditorier', 'Bakverk'],
              category: 'cleaning',
              subcategory: 'bakeries'
            }
          ]
        },
        {
          id: 'care-clinics-cleaning',
          title: 'Vård & Kliniker',
          description: 'Specialiserad städning för vårdinrättningar',
          icon: <Stethoscope className="h-6 w-6" />,
          examples: ['Sjukhus', 'Kliniker', 'Vårdcentraler', 'Rehab'],
          category: 'cleaning',
          subcategory: 'healthcare',
          subcategories: [
            {
              id: 'hospitals',
              title: 'Sjukhus',
              description: 'Städning för sjukhus',
              icon: <Stethoscope className="h-6 w-6" />,
              examples: ['Sjukhus', 'Akutmottagningar', 'Operationssalar'],
              category: 'cleaning',
              subcategory: 'hospitals'
            },
            {
              id: 'clinics',
              title: 'Kliniker',
              description: 'Städning för kliniker',
              icon: <Stethoscope className="h-6 w-6" />,
              examples: ['Kliniker', 'Specialistkliniker', 'Privatkliniker'],
              category: 'cleaning',
              subcategory: 'clinics'
            },
            {
              id: 'care-centers',
              title: 'Omsorgsboenden',
              description: 'Städning för omsorgsboenden',
              icon: <Stethoscope className="h-6 w-6" />,
              examples: ['Omsorgsboenden', 'Äldreboenden', 'Demensboenden'],
              category: 'cleaning',
              subcategory: 'care-centers'
            }
          ]
        },
        {
          id: 'hotel-hostel-cleaning',
          title: 'Hotell & Vandrarhem',
          description: 'Städning för hotell och vandrarhem',
          icon: <Home className="h-6 w-6" />,
          examples: ['Hotell', 'Vandrarhem', 'B&B', 'Resebostäder'],
          category: 'cleaning',
          subcategory: 'hotel',
          subcategories: [
            {
              id: 'hotels',
              title: 'Hotell',
              description: 'Städning för hotell',
              icon: <Home className="h-6 w-6" />,
              examples: ['Hotell', 'Resort', 'Konferenshotell'],
              category: 'cleaning',
              subcategory: 'hotels'
            },
            {
              id: 'hostels',
              title: 'Vandrarhem',
              description: 'Städning för vandrarhem',
              icon: <Home className="h-6 w-6" />,
              examples: ['Vandrarhem', 'B&B', 'Resebostäder'],
              category: 'cleaning',
              subcategory: 'hostels'
            },
            {
              id: 'business-accommodation',
              title: 'Företagslägenheter',
              description: 'Städning för företagslägenheter',
              icon: <Home className="h-6 w-6" />,
              examples: ['Företagslägenheter', 'Serviced apartments'],
              category: 'cleaning',
              subcategory: 'business-accommodation'
            },
            {
              id: 'conference-facilities',
              title: 'Konferensanläggningar',
              description: 'Städning för konferensanläggningar',
              icon: <Home className="h-6 w-6" />,
              examples: ['Konferensanläggningar', 'Mötesrum', 'Eventlokaler'],
              category: 'cleaning',
              subcategory: 'conference-facilities'
            }
          ]
        },
        {
          id: 'wellness-spa-cleaning',
          title: 'Wellness & Spa',
          description: 'Städning för wellness och spa-anläggningar',
          icon: <Heart className="h-6 w-6" />,
          examples: ['Spa', 'Wellness', 'Gym', 'Träningsanläggningar'],
          category: 'cleaning',
          subcategory: 'wellness',
          subcategories: [
            {
              id: 'spa',
              title: 'Spa',
              description: 'Städning för spa-anläggningar',
              icon: <Heart className="h-6 w-6" />,
              examples: ['Spa', 'Wellnesscenter', 'Beauty center'],
              category: 'cleaning',
              subcategory: 'spa'
            },
            {
              id: 'gym',
              title: 'Gym',
              description: 'Städning för gym',
              icon: <Heart className="h-6 w-6" />,
              examples: ['Gym', 'Fitnesscenter', 'Träningsanläggningar'],
              category: 'cleaning',
              subcategory: 'gym'
            },
            {
              id: 'yoga-studios',
              title: 'Yogastudios',
              description: 'Städning för yogastudios',
              icon: <Heart className="h-6 w-6" />,
              examples: ['Yogastudios', 'Meditationscenter', 'Pilates'],
              category: 'cleaning',
              subcategory: 'yoga-studios'
            }
          ]
        },
        {
          id: 'event-party-cleaning',
          title: 'Event & Fest',
          description: 'Städning för event och festlokaler',
          icon: <Sparkles className="h-6 w-6" />,
          examples: ['Eventlokaler', 'Festlokaler', 'Konferensrum', 'Mötesrum'],
          category: 'cleaning',
          subcategory: 'event',
          subcategories: [
            {
              id: 'event-venues',
              title: 'Eventlokaler',
              description: 'Städning för eventlokaler',
              icon: <Sparkles className="h-6 w-6" />,
              examples: ['Eventlokaler', 'Festlokaler', 'Mötesrum'],
              category: 'cleaning',
              subcategory: 'event-venues'
            },
            {
              id: 'conference-rooms',
              title: 'Konferensrum',
              description: 'Städning för konferensrum',
              icon: <Sparkles className="h-6 w-6" />,
              examples: ['Konferensrum', 'Mötesrum', 'Seminarierum'],
              category: 'cleaning',
              subcategory: 'conference-rooms'
            }
          ]
        },
        {
          id: 'commercial-kitchen-cleaning',
          title: 'Storkök & Matsal',
          description: 'Städning för storkök och matsalar',
          icon: <Utensils className="h-6 w-6" />,
          examples: ['Storkök', 'Matsalar', 'Skolkök', 'Institutionskök'],
          category: 'cleaning',
          subcategory: 'commercial-kitchen',
          subcategories: [
            {
              id: 'school-kitchens',
              title: 'Förskolor',
              description: 'Städning för förskolor',
              icon: <Utensils className="h-6 w-6" />,
              examples: ['Förskolor', 'Barnomsorg', 'Daghem'],
              category: 'cleaning',
              subcategory: 'school-kitchens'
            },
            {
              id: 'elementary-schools',
              title: 'Grundskolor',
              description: 'Städning för grundskolor',
              icon: <Utensils className="h-6 w-6" />,
              examples: ['Grundskolor', 'Skolkök', 'Matsalar'],
              category: 'cleaning',
              subcategory: 'elementary-schools'
            },
            {
              id: 'high-schools',
              title: 'Gymnasieskolor',
              description: 'Städning för gymnasieskolor',
              icon: <Utensils className="h-6 w-6" />,
              examples: ['Gymnasieskolor', 'Gymnasium', 'Yrkesutbildning'],
              category: 'cleaning',
              subcategory: 'high-schools'
            }
          ]
        },
        {
          id: 'crafts-hvac-cleaning',
          title: 'Hantverk & VVS',
          description: 'Städning för hantverks- och VVS-verkstäder',
          icon: <Wrench className="h-6 w-6" />,
          examples: ['Verkstäder', 'VVS-verkstäder', 'Hantverkslokaler', 'Industri'],
          category: 'cleaning',
          subcategory: 'crafts',
          subcategories: [
            {
              id: 'construction-companies',
              title: 'Byggföretag',
              description: 'Städning för byggföretag',
              icon: <Wrench className="h-6 w-6" />,
              examples: ['Byggföretag', 'Byggarbetsplatser', 'Byggkontor'],
              category: 'cleaning',
              subcategory: 'construction-companies'
            },
            {
              id: 'hvac-companies',
              title: 'VVS-företag',
              description: 'Städning för VVS-företag',
              icon: <Wrench className="h-6 w-6" />,
              examples: ['VVS-företag', 'VVS-verkstäder', 'Rörinstallation'],
              category: 'cleaning',
              subcategory: 'hvac-companies'
            },
            {
              id: 'painting-companies',
              title: 'Måleriföretag',
              description: 'Städning för måleriföretag',
              icon: <Wrench className="h-6 w-6" />,
              examples: ['Måleriföretag', 'Målarverkstäder', 'Färgbutiker'],
              category: 'cleaning',
              subcategory: 'painting-companies'
            }
          ]
        },
        {
          id: 'care-assistance-cleaning',
          title: 'Omsorg & Assistans',
          description: 'Städning för omsorg och assistans',
          icon: <UserCheck className="h-6 w-6" />,
          examples: ['Äldreboenden', 'Assistansboenden', 'Omsorgslokaler', 'Vårdhem'],
          category: 'cleaning',
          subcategory: 'care',
          subcategories: [
            {
              id: 'personal-assistance',
              title: 'Personlig assistans',
              description: 'Städning för personlig assistans',
              icon: <UserCheck className="h-6 w-6" />,
              examples: ['Personlig assistans', 'Assistansboenden', 'Hemtjänst'],
              category: 'cleaning',
              subcategory: 'personal-assistance'
            },
            {
              id: 'lss-services',
              title: 'LSS-verksamheter',
              description: 'Städning för LSS-verksamheter',
              icon: <UserCheck className="h-6 w-6" />,
              examples: ['LSS-verksamheter', 'Funktionshinder', 'Bostäder'],
              category: 'cleaning',
              subcategory: 'lss-services'
            },
            {
              id: 'home-care',
              title: 'Hemtjänst',
              description: 'Städning för hemtjänst',
              icon: <UserCheck className="h-6 w-6" />,
              examples: ['Hemtjänst', 'Hemvård', 'Omsorg'],
              category: 'cleaning',
              subcategory: 'home-care'
            },
            {
              id: 'elderly-care',
              title: 'Omsorg',
              description: 'Städning för omsorg',
              icon: <UserCheck className="h-6 w-6" />,
              examples: ['Omsorg', 'Äldreboenden', 'Demensboenden'],
              category: 'cleaning',
              subcategory: 'elderly-care'
            }
          ]
        }
      ]
    },
    {
      id: 'laundry',
      title: 'Tvätt',
      icon: <Shirt className="h-6 w-6" />,
      showAll: true,
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
          id: 'safety-clothing-laundry',
          title: 'Skyddskläder',
          description: 'Tvätt av reflexvästar, skyddsoveraller och skyddsutrustning',
          icon: <Shield className="h-6 w-6" />,
          examples: ['Reflexvästar', 'Skyddsoveraller', 'Skyddsutrustning', 'Säkerhetskläder'],
          category: 'laundry',
          subcategory: 'safety'
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
        }
      ]
    },
    {
      id: 'maintenance-services',
      title: 'Underhåll & Service',
      icon: <Wrench className="h-6 w-6" />,
      services: [
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
          id: 'stairwell-cleaning',
          title: 'Trappstädning',
          description: 'Städning av trappor och trapphus',
          icon: <Home className="h-6 w-6" />,
          examples: ['Trappor', 'Trapphus', 'Lobby', 'Entréer'],
          category: 'maintenance-services',
          subcategory: 'stairs'
        },
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
          id: 'construction-cleaning',
          title: 'Byggstädning',
          description: 'Städning efter byggarbeten och renovering',
          icon: <Wrench className="h-6 w-6" />,
          examples: ['Byggstäd', 'Renovering', 'Nybyggnation', 'Flyttstäd'],
          category: 'maintenance-services',
          subcategory: 'construction'
        },
        {
          id: 'carpet-cleaning',
          title: 'Mattstädning',
          description: 'Djupkemrengöring av mattor och heltäckningsmattor',
          icon: <Sofa className="h-6 w-6" />,
          examples: ['Heltäckningsmattor', 'Entrémattor', 'Industrimattor', 'Gummimattor'],
          category: 'maintenance-services',
          subcategory: 'carpets'
        },
        {
          id: 'upholstery-cleaning',
          title: 'Möbelrengöring',
          description: 'Djupkemrengöring av möbler och textiler',
          icon: <Sofa className="h-6 w-6" />,
          examples: ['Soffor', 'Stolar', 'Kuddar', 'Textilier'],
          category: 'maintenance-services',
          subcategory: 'upholstery'
        },
        {
          id: 'workwear-rental',
          title: 'Arbetskläder & Hyra',
          description: 'Uthyrning och underhåll av arbetskläder',
          icon: <Shirt className="h-6 w-6" />,
          examples: ['Arbetskläder', 'Skyddskläder', 'Tvätt', 'Reparation'],
          category: 'maintenance-services',
          subcategory: 'workwear'
    },
    {
      id: 'mat-service',
          title: 'Mattservice',
          description: 'Utlägg och rotation av entrémattor',
          icon: <Home className="h-6 w-6" />,
          examples: ['Entrémattor', 'Industrimattor', 'Gummimattor', 'Rotation'],
          category: 'maintenance-services',
          subcategory: 'mats'
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
      id: 'logistics-reporting',
      title: 'Logistik & Rapportering',
      icon: <Home className="h-6 w-6" />,
      showAll: true,
      services: [
        {
          id: 'logistics-tracking',
          title: 'Logistik & Spårning',
          description: 'Schemalagd hämtning och leverans med realtidsspårning',
          icon: <Car className="h-6 w-6" />,
          examples: ['Hämtning', 'Leverans', 'Spårning', 'Schemaläggning'],
          category: 'logistics-reporting',
          subcategory: 'logistics'
        },
        {
          id: 'environmental-reporting',
          title: 'Miljörapportering',
          description: 'Digital uppföljning av miljöpåverkan och hållbarhet',
          icon: <Shield className="h-6 w-6" />,
          examples: ['ISO 14001', 'Miljörapporter', 'Hållbarhet', 'Klimatpåverkan'],
          category: 'logistics-reporting',
          subcategory: 'environmental'
        },
        {
          id: 'quality-control',
          title: 'Kvalitetskontroll',
          description: 'Kontinuerlig kvalitetskontroll och rapportering',
          icon: <UserCheck className="h-6 w-6" />,
          examples: ['Kvalitetskontroll', 'Hygienkontroller', 'Certifiering', 'Audit'],
          category: 'logistics-reporting',
          subcategory: 'quality'
        },
        {
          id: 'digital-solutions',
          title: 'Digitala lösningar',
          description: 'App-baserade lösningar för kundkommunikation',
          icon: <Home className="h-6 w-6" />,
          examples: ['Kundapp', 'Webbportal', 'Realtidsspårning', 'Kommunikation'],
          category: 'logistics-reporting',
          subcategory: 'digital'
        },
        {
          id: 'energy-monitoring',
          title: 'Energiövervakning',
          description: 'Övervakning av energiförbrukning och optimering',
          icon: <Wind className="h-6 w-6" />,
          examples: ['Energiförbrukning', 'Vattenförbrukning', 'Optimering', 'Kostnadsbesparing'],
          category: 'logistics-reporting',
          subcategory: 'energy'
        },
        {
          id: 'compliance-reporting',
          title: 'Compliance & Certifiering',
          description: 'Uppföljning av regelverk och certifieringar',
          icon: <Shield className="h-6 w-6" />,
          examples: ['ISO-certifiering', 'Miljöcertifiering', 'Säkerhetsstandarder', 'Compliance'],
          category: 'logistics-reporting',
          subcategory: 'compliance'
        }
      ]
    }
  ];

  const openBidModal = (service: Service) => {
    // Check if service has subcategories
    if (service.subcategories && service.subcategories.length > 0) {
      setSelectedCategory(service);
      setShowSubcategories(true);
    } else {
      setSelectedService(service);
      setShowBooking(true);
    }
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

  const getDefaultVolume = (serviceId: string) => {
    const defaults: { [key: string]: number } = {
      'floor-care': 200,
      'restaurant-cleaning': 200,
      'stairwell-cleaning': 100,
      'office-cleaning': 500,
      'window-cleaning': 50,
      'high-altitude-cleaning': 30,
      'garage-cleaning': 150,
      'warehouse-cleaning': 800,
      'construction-cleaning': 300,
      'retail-cleaning': 300,
      'workwear-laundry': 100,
      'hotel-laundry': 400,
      'restaurant-laundry': 200,
      'healthcare-laundry': 300,
      'industrial-laundry': 200,
      'dry-cleaning': 50,
      'carpet-cleaning': 50,
      'upholstery-cleaning': 30,
      'workwear-rental': 100,
      'mat-service': 20,
      'sanitary-services': 50,
      'logistics-tracking': 100,
      'environmental-reporting': 1,
      'quality-control': 20,
      'digital-solutions': 1,
      'energy-monitoring': 1,
      'compliance-reporting': 1
    };
    return defaults[serviceId] || 100;
  };

  const getDefaultPrice = (serviceId: string) => {
    const defaults: { [key: string]: number } = {
      'floor-care': 8,
      'restaurant-cleaning': 20,
      'stairwell-cleaning': 15,
      'office-cleaning': 15,
      'window-cleaning': 20,
      'high-altitude-cleaning': 50,
      'garage-cleaning': 12,
      'warehouse-cleaning': 14,
      'construction-cleaning': 25,
      'retail-cleaning': 18,
      'workwear-laundry': 30,
      'hotel-laundry': 25,
      'restaurant-laundry': 20,
      'healthcare-laundry': 35,
      'industrial-laundry': 25,
      'dry-cleaning': 80,
      'carpet-cleaning': 15,
      'upholstery-cleaning': 25,
      'workwear-rental': 150,
      'mat-service': 200,
      'sanitary-services': 5,
      'logistics-tracking': 100,
      'environmental-reporting': 500,
      'quality-control': 200,
      'digital-solutions': 1000,
      'energy-monitoring': 300,
      'compliance-reporting': 400
    };
    return defaults[serviceId] || 25;
  };

  const getVolumeUnit = (serviceId: string) => {
    const units: { [key: string]: string } = {
      'floor-care': 'm²',
      'restaurant-cleaning': 'm²',
      'stairwell-cleaning': 'm²',
      'office-cleaning': 'm²',
      'window-cleaning': 'm²',
      'high-altitude-cleaning': 'm²',
      'garage-cleaning': 'm²',
      'warehouse-cleaning': 'm²',
      'construction-cleaning': 'm²',
      'retail-cleaning': 'm²',
      'workwear-laundry': 'kg',
      'hotel-laundry': 'kg',
      'restaurant-laundry': 'kg',
      'healthcare-laundry': 'kg',
      'industrial-laundry': 'kg',
      'dry-cleaning': 'plagg',
      'carpet-cleaning': 'm²',
      'upholstery-cleaning': 'st',
      'workwear-rental': 'plagg',
      'mat-service': 'mattor',
      'sanitary-services': 'enheter',
      'logistics-tracking': 'leveranser',
      'environmental-reporting': 'rapporter',
      'quality-control': 'kontroller',
      'digital-solutions': 'lösningar',
      'energy-monitoring': 'rapporter',
      'compliance-reporting': 'rapporter'
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

  if (showBooking && selectedService) {
    return (
      <BookingPage 
        service={selectedService} 
        onBack={() => setShowBooking(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
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

      {/* Subcategories View */}
      {showSubcategories && selectedCategory && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="mb-6">
            <button
              onClick={goBackToCategories}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Tillbaka till kategorier</span>
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {selectedCategory.title}
            </h2>
            <p className="text-base text-gray-600">
              Välj din specifika verksamhetstyp
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedCategory.subcategories?.map((subcategory) => (
              <div
                key={subcategory.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer p-6"
                onClick={() => selectSubcategory(subcategory)}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-blue-600">
                    {subcategory.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {subcategory.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  {subcategory.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {subcategory.examples.map((example, index) => (
                    <span
                      key={index}
                      className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded"
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
                  {category.showAll && (
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                        <span>See all</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <div className="flex space-x-1">
                        <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                          <ArrowRight className="h-4 w-4 text-gray-600 rotate-180" />
                        </button>
                        <button className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center">
                          <ArrowRight className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Services Horizontal Scroll */}
              <div className="p-4 sm:p-6">
                <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                  {category.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer relative"
                  onClick={() => openBidModal(service)}
                    >
                      {service.isNew && (
                        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                          NEW
                        </div>
                      )}
                      {/* Service Image Placeholder */}
                      <div className="h-40 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-t-lg flex items-center justify-center">
                        <div className="text-blue-600">
                          {React.cloneElement(service.icon as React.ReactElement, { className: "h-12 w-12" })}
                        </div>
                      </div>
                      {/* Service Title */}
                      <div className="p-4">
                        <h4 className="text-base font-semibold text-gray-900 text-center">
                          {service.title}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>
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