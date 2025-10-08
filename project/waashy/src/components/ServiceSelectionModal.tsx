import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';

interface ServiceCard {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface ServiceType {
  id: string;
  title: string;
  description: string;
}

interface ServiceSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onServiceSelected: (service: any) => void;
  selectedServiceCard?: ServiceCard;
}

export default function ServiceSelectionModal({ isOpen, onClose, onServiceSelected, selectedServiceCard }: ServiceSelectionModalProps) {
  const [selectedService, setSelectedService] = useState<ServiceCard | null>(null);

  // Update selectedService when selectedServiceCard prop changes
  React.useEffect(() => {
    if (selectedServiceCard) {
      setSelectedService(selectedServiceCard);
    }
  }, [selectedServiceCard]);

  // Reset modal when it opens
  React.useEffect(() => {
    if (isOpen && selectedServiceCard) {
      setSelectedService(selectedServiceCard);
    }
  }, [isOpen, selectedServiceCard]);

  // Removed serviceCards - now passed as prop from parent

  const getServiceTypes = (serviceId: string): ServiceType[] => {
    const serviceTypes: { [key: string]: ServiceType[] } = {
      'cleaning': [
        { id: 'office-cleaning', title: 'Kontorsstädning', description: 'Städning av kontorslokaler och arbetsplatser' },
        { id: 'moving-cleaning', title: 'Flyttstädning', description: 'Städning efter flytt och renovering' },
        { id: 'stair-cleaning', title: 'Trapphusstädning', description: 'Städning av trappor och trapphus' },
        { id: 'floor-care', title: 'Golvvård', description: 'Professionell golvvård och underhåll' },
        { id: 'window-cleaning', title: 'Fönsterputs', description: 'Fönsterputsning och glasrengöring' },
        { id: 'commercial-kitchen', title: 'Storkök', description: 'Specialiserad städning av storkök och matsalar' },
        { id: 'other-cleaning', title: 'Annan städning', description: 'Anpassad städning efter dina behov' }
      ],
      'laundry': [
        { id: 'workwear-laundry', title: 'Arbetskläder', description: 'Tvätt av overaller och arbetskläder' },
        { id: 'tablecloths', title: 'Bordsdukar', description: 'Tvätt av restaurangdukar och eventdukar' },
        { id: 'kitchen-textiles', title: 'Kökshanddukar', description: 'Tvätt av kökstextilier och handdukar' },
        { id: 'aprons', title: 'Förkläden', description: 'Tvätt av förkläden och skyddskläder' },
        { id: 'mats', title: 'Mattor', description: 'Tvätt av entré- och träningsmattor' },
        { id: 'bedding', title: 'Sängkläder', description: 'Tvätt av lakan och sängkläder' }
      ],
      'vehicle-care': [
        { id: 'car-wash', title: 'Biltvätt', description: 'Exteriör- och interiörrengöring av bilar' },
        { id: 'fleet-wash', title: 'Flottvätt', description: 'Tvätt av hela fordonsflottor' },
        { id: 'truck-wash', title: 'Lastbilstvätt', description: 'Specialiserad tvätt av lastbilar och tunga fordon' },
        { id: 'bus-wash', title: 'Bustvätt', description: 'Tvätt av bussar och kollektivtrafik' },
        { id: 'construction-vehicles', title: 'Anläggningsmaskiner', description: 'Tvätt av grävskopor och anläggningsmaskiner' }
      ],
      'window-cleaning': [
        { id: 'residential-windows', title: 'Bostadsfönster', description: 'Fönsterputsning i bostäder' },
        { id: 'commercial-windows', title: 'Kontorsfönster', description: 'Fönsterputsning i kontor och butiker' },
        { id: 'facade-cleaning', title: 'Fasadtvätt', description: 'Rengöring av fasader och byggnader' },
        { id: 'high-rise-windows', title: 'Höghusfönster', description: 'Fönsterputsning på höga byggnader' },
        { id: 'shop-windows', title: 'Skyltfönster', description: 'Fönsterputsning av butiksfönster' },
        { id: 'roof-cleaning', title: 'Taktvätt', description: 'Rengöring och tvätt av tak' },
        { id: 'graffiti-removal', title: 'Klottersanering', description: 'Borttagning av klotter och graffiti' }
      ],
      'mat-service': [
        { id: 'entrance-mats', title: 'Entrémattor', description: 'Utlägg och rotation av entrémattor' },
        { id: 'industrial-mats', title: 'Industrimattor', description: 'Mattor för industri och verkstäder' },
        { id: 'rubber-mats', title: 'Gummimattor', description: 'Gummimattor för säkerhet och komfort' },
        { id: 'custom-mats', title: 'Anpassade mattor', description: 'Skräddarsydda mattlösningar' }
      ],
      'workwear-rental': [
        { id: 'work-clothes', title: 'Arbetskläder', description: 'Uthyrning av overaller och arbetskläder' },
        { id: 'safety-clothing', title: 'Skyddskläder', description: 'Reflexvästar och skyddsutrustning' },
        { id: 'uniforms', title: 'Uniformer', description: 'Företagsuniformer och klädsel' },
        { id: 'maintenance', title: 'Underhåll', description: 'Tvätt och reparation av arbetskläder' }
      ],
      'other': [
        { id: 'custom-service', title: 'Anpassad tjänst', description: 'Skräddarsydd tjänst efter dina behov' },
        { id: 'consultation', title: 'Konsultation', description: 'Rådgivning och planering' },
        { id: 'special-request', title: 'Särskild förfrågan', description: 'Unika lösningar för specifika behov' }
      ]
    };

    return serviceTypes[serviceId] || [];
  };

  // Removed handleServiceSelect - service is now passed as prop

  const handleServiceTypeSelect = (serviceType: ServiceType) => {
    // Automatically proceed to booking after selecting service type
    const serviceForBooking = {
      id: `${selectedService?.id}-${serviceType.id}`,
      title: `${selectedService?.title} - ${serviceType.title}`,
      description: serviceType.description || '',
      icon: selectedService?.icon,
      category: selectedService?.id,
      subcategory: serviceType.id
    };
    
    onServiceSelected(serviceForBooking);
    onClose();
  };

  const handleBack = () => {
    // Go back to main page
    onClose();
  };

  // Removed handleContinue - no longer needed since we auto-proceed

  const resetModal = () => {
    setSelectedService(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Välj typ av tjänst
              </h2>
              <p className="text-sm text-gray-600">
                Steg 1 av 1
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {selectedService && (
            <div>
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="text-blue-600">
                    {selectedService.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedService.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {selectedService.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getServiceTypes(selectedService.id).map((serviceType) => (
                  <div
                    key={serviceType.id}
                    onClick={() => handleServiceTypeSelect(serviceType)}
                    className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 cursor-pointer group"
                  >
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors mb-2">
                      {serviceType.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {serviceType.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleBack}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Tillbaka
          </button>
          
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
          </div>

          <div className="text-sm text-gray-500">
            Välj en tjänst för att fortsätta
          </div>
        </div>
      </div>
    </div>
  );
}
