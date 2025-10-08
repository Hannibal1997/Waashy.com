import React, { useState } from 'react';
import BubbleBackground from '../components/BubbleBackground';
import Footer from '../components/Footer';
import { ArrowLeft, CheckCircle, Mail, Phone, Building, User, MapPin, Calendar, Settings } from 'lucide-react';

interface ApplicationPageProps {
  onNavigate?: (page: string) => void;
}

// Dry Cleaning Form Component
const DryCleaningForm = ({ formData, handleInputChange, handleNestedInputChange, handleDayToggle, handleSubmit, isLoading }: any) => {
  const days = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2" />
          Grundläggande information
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Välj ditt land *
            </label>
            <select 
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Välj land</option>
              <option value="sverige">Sverige</option>
              <option value="norge">Norge</option>
              <option value="danmark">Danmark</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Namnge din stad *
            </label>
            <input 
              type="text" 
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Stockholm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Registrerat företagsnamn (butiksnamn) *
            </label>
            <input 
              type="text" 
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Exempel: Kemtvätt AB"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Postnummer (butikslokation) *
            </label>
            <input 
              type="text" 
              name="postcode"
              value={formData.postcode}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="123 45"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Kontaktnamn *
            </label>
            <input 
              type="text" 
              name="contactName"
              value={formData.contactName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ditt namn"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              E-postadress *
            </label>
            <input 
              type="email" 
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="din@email.com"
            />
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mobilnummer (med landskod) *
            </label>
            <input 
              type="tel" 
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="+46 70 123 45 67"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Settings className="w-5 h-5 mr-2" />
          Verksamhetsprofil
        </h4>
        
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Välj vad som matchar din profil *
          </label>
          <div className="space-y-2">
            {[
              'ALLT I HUSET - Tvätt, strykning och kemtvätt görs alla av oss',
              'OUTSOURCE KEMTVÄTT - Tvätt och torkning hanteras i huset',
              'OUTSOURCE ALLT - Vi är bara en butik som outsourcar all bearbetning'
            ].map((option, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="radio"
                  name="profile"
                  value={option}
                  checked={formData.profile === option}
                  onChange={handleInputChange}
                  className="mr-3"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Öppettider
        </h4>
        
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Vilka dagar i veckan är ni öppna *
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleDayToggle(day)}
                className={`px-3 py-2 rounded-lg border-2 transition-colors text-sm font-medium ${
                  formData.openDays.includes(day)
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

      <div className="bg-white rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Maskinantal
        </h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { key: 'washers', label: 'Tvättmaskiner' },
            { key: 'dryers', label: 'Torktumlare' },
            { key: 'dryCleaningMachine', label: 'Kemtvättsmaskin' },
            { key: 'pressers', label: 'Pressar' }
          ].map((machine) => (
            <div key={machine.key}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {machine.label}
              </label>
              <select 
                value={formData.machinery[machine.key]}
                onChange={(e) => handleNestedInputChange('machinery', machine.key, e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Välj antal</option>
                <option value="0">0</option>
                <option value="1-2">1-2</option>
                <option value="3-5">3-5</option>
                <option value="5+">5+</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Omsättningstid (TAT)
        </h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { key: 'washAndFold', label: 'Tvätt och vikning' },
            { key: 'dryCleaning', label: 'Kemtvätt' },
            { key: 'washAndIron', label: 'Tvätt och strykning' },
            { key: 'pressing', label: 'Pressning/Strykning' }
          ].map((service) => (
            <div key={service.key}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {service.label}
              </label>
              <select 
                value={formData.turnaroundTime[service.key]}
                onChange={(e) => handleNestedInputChange('turnaroundTime', service.key, e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Välj tid</option>
                <option value="NA">Ej tillämpligt</option>
                <option value="24">24 timmar</option>
                <option value="48">48 timmar</option>
                <option value="48+">Mer än 48 timmar</option>
              </select>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <button 
          type="submit"
          disabled={isLoading}
          className="bg-[#1565c0] text-white font-bold rounded-full px-8 py-4 text-lg transition hover:bg-[#0d47a1] shadow-sm tracking-widest hover:scale-105 transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Skickar ansökan...' : 'Ansök som kemtvättspartner'}
        </button>
        <p className="text-sm text-gray-600 mt-3">Vi återkommer till dig inom 24 timmar</p>
      </div>
    </form>
  );
};

// General Form Component
const GeneralForm = ({ formData, handleInputChange, handleSubmit, isLoading, selectedService }: any) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Building className="w-4 h-4 inline mr-2" />
            Företagsnamn *
          </label>
          <input 
            type="text" 
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ange ditt företagsnamn"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Mail className="w-4 h-4 inline mr-2" />
            E-postadress *
          </label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="din@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <Phone className="w-4 h-4 inline mr-2" />
            Telefonnummer *
          </label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="070-123 45 67"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-2" />
            Tjänsttyp
          </label>
          <input 
            type="text" 
            value={selectedService === 'stadning' ? 'Städning' : selectedService === 'biltvatt' ? 'Biltvätt' : 'Övrigt'}
            disabled
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Berätta om din verksamhet och erfarenhet *
        </label>
        <textarea 
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Berätta om din verksamhet, erfarenhet, utrustning och varför du vill bli en del av vårt nätverk..."
        />
      </div>
      
      <div className="text-center">
        <button 
          type="submit"
          disabled={isLoading}
          className="bg-[#1565c0] text-white font-bold rounded-full px-8 py-4 text-lg transition hover:bg-[#0d47a1] shadow-sm tracking-widest hover:scale-105 transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Skickar ansökan...' : 'Ansök som rengöringspartner'}
        </button>
        <p className="text-sm text-gray-600 mt-3">Vi återkommer till dig inom 24 timmar</p>
      </div>
    </form>
  );
};

const ApplicationPage = ({ onNavigate }: ApplicationPageProps) => {
  const [step, setStep] = useState(1); // 1: Välj tjänsttyp, 2: Fyll i formulär
  const [selectedService, setSelectedService] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    serviceType: '',
    description: '',
    // Dry cleaning specific fields
    country: '',
    city: '',
    businessName: '',
    postcode: '',
    contactName: '',
    emailAddress: '',
    mobileNumber: '',
    profile: '',
    otherProfile: '',
    openDays: [] as string[],
    machinery: {
      washers: '',
      dryers: '',
      dryCleaningMachine: '',
      pressers: ''
    },
    turnaroundTime: {
      washAndFold: '',
      dryCleaning: '',
      washAndIron: '',
      pressing: ''
    }
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedInputChange = (section: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev] as any,
        [field]: value
      }
    }));
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      openDays: prev.openDays.includes(day) 
        ? prev.openDays.filter(d => d !== day)
        : [...prev.openDays, day]
    }));
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setFormData(prev => ({
      ...prev,
      serviceType: service
    }));
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulera API-anrop
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#eaf6ff] font-sans flex flex-col">
        {/* Success Section */}
        <section className="text-center py-20 sm:py-24 relative bg-[#e3f2fd] p-0 m-0 overflow-visible min-h-screen flex items-center justify-center">
          <BubbleBackground bubbleCount={20} />
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-neutral-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Tack för din ansökan!
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Vi har mottagit din ansökan och kommer att kontakta dig inom 24 timmar för nästa steg.
            </p>

            {/* Confirmation Details */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8 shadow-lg max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Vad händer nu?</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-3 h-3 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Bekräftelse via e-post</h3>
                    <p className="text-sm text-gray-600">Du får en bekräftelse via e-post inom några minuter</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Kontakt från oss</h3>
                    <p className="text-sm text-gray-600">Vi kontaktar dig inom 24 timmar för en kort intervju</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Building className="w-3 h-3 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Nästa steg</h3>
                    <p className="text-sm text-gray-600">Efter godkännande kan du börja ta emot beställningar direkt</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => onNavigate?.('home')}
                className="bg-[#1565c0] text-white font-bold rounded-full px-8 py-4 text-lg transition hover:bg-[#0d47a1] shadow-sm tracking-widest hover:scale-105 transform duration-200"
              >
                Tillbaka till startsidan
              </button>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="bg-gray-600 text-white font-bold rounded-full px-8 py-4 text-lg transition hover:bg-gray-700 shadow-sm tracking-widest hover:scale-105 transform duration-200"
              >
                Skicka en ny ansökan
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaf6ff] font-sans flex flex-col">
      {/* Hero Section */}
      <section className="text-center py-10 sm:py-14 relative bg-[#e3f2fd] p-0 m-0 overflow-visible">
        <BubbleBackground bubbleCount={20} />
        <div className="max-w-6xl lg:max-w-7xl mx-auto px-2 relative z-10">
          <div className="flex items-center justify-start mb-6">
            <button
              onClick={() => onNavigate?.('service-provider')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 leading-tight text-neutral-900 fade-in-up tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', letterSpacing: '-0.01em', fontSize: 'clamp(1.8rem, 4vw, 3.25rem)' }}>
            {step === 1 ? 'Välj din tjänsttyp' : 'Ansök som Rengöringspartner'}
          </h1>
          <h2 className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            {step === 1 ? 'Vad erbjuder din verksamhet?' : 'utan dolda kostnader eller anmälningsavgift'}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {step === 1 ? 'Välj den tjänsttyp som bäst beskriver din verksamhet' : 'Börja din resa som rengöringspartner idag - det tar bara några minuter!'}
          </p>
        </div>
      </section>

      {/* Step 1: Service Selection */}
      {step === 1 && (
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Kemtvätt & Tvättservice',
                  description: 'Erbjuder kemtvätt, tvätt och strykning',
                  icon: '🧺',
                  service: 'kemtvatt'
                },
                {
                  title: 'Städning',
                  description: 'Kontorsstädning, hemstädning, fönsterputs',
                  icon: '🧽',
                  service: 'stadning'
                },
                {
                  title: 'Biltvätt',
                  description: 'Biltvätt och bilrengöring',
                  icon: '🚗',
                  service: 'biltvatt'
                }
              ].map((service, index) => (
                <button
                  key={index}
                  onClick={() => handleServiceSelect(service.service)}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 transform text-left"
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Step 2: Application Form */}
      {step === 2 && (
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Redo att gå med i vårt nätverk?</h3>
                <button
                  onClick={() => setStep(1)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  ← Ändra tjänsttyp
                </button>
              </div>
              
              {selectedService === 'kemtvatt' ? (
                <DryCleaningForm 
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleNestedInputChange={handleNestedInputChange}
                  handleDayToggle={handleDayToggle}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                />
              ) : (
                <GeneralForm 
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                  selectedService={selectedService}
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ApplicationPage;
