import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    service: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const services = [
    'Tvätt & textilservice',
    'Kontorsstädning & golvvård',
    'Hyra & underhåll av arbetskläder',
    'Mobil fordonstvätt för företagsflottor',
    'Matt- och entrémattservice',
    'Fönsterputs & fasadtvätt',
    'Möbel- och heltäckningsmattvård',
    'Logistik & spårning',
    'Miljö- och kvalitetsrapportering',
    'Annat/Allmän förfrågan'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Kontakta oss
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8">
            Vi hjälper dig gärna med dina frågor om rengörings- och textiltjänster
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Kontaktinformation</h2>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Telefon</h3>
                    <p className="text-sm sm:text-base text-gray-600">08-123 45 67</p>
                    <p className="text-sm text-gray-500">Vardagar 08:00-17:00</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">E-post</h3>
                    <p className="text-sm sm:text-base text-gray-600">info@waashy.se</p>
                    <p className="text-sm text-gray-500">Svar inom 2 timmar</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-lg">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Adress</h3>
                    <p className="text-sm sm:text-base text-gray-600">Storgatan 123<br />111 22 Stockholm</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-2 sm:p-3 rounded-lg">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Öppettider</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Måndag - Fredag: 08:00-17:00<br />
                      Lördag - Söndag: Stängt
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Facts */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Snabba fakta</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  <span className="text-sm sm:text-base text-gray-700">Offert inom 2 timmar</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  <span className="text-sm sm:text-base text-gray-700">Täcker hela Sverige</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  <span className="text-sm sm:text-base text-gray-700">500+ nöjda företagskunder</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  <span className="text-sm sm:text-base text-gray-700">Fullförsäkrade tjänster</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Skicka meddelande</h2>
            
            {isSubmitted ? (
              <div className="text-center py-6 sm:py-8">
                <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Tack för ditt meddelande!</h3>
                <p className="text-sm sm:text-base text-gray-600">Vi återkommer till dig inom 2 timmar.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Namn *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Ditt namn"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-post *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="din@email.se"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Företag
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Ditt företag"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="08-123 45 67"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tjänst av intresse
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="">Välj tjänst</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meddelande *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    placeholder="Beskriv dina behov eller ställ din fråga..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Skicka meddelande</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}