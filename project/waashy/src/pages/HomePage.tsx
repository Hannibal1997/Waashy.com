import React, { useState } from 'react';
import { MapPin, Target, Car, Shirt, Building2 } from 'lucide-react';
import BubbleBackground from '../components/BubbleBackground';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [searchLocation, setSearchLocation] = useState('');

  const handleLocationSearch = () => {
    if (searchLocation.trim()) {
      onNavigate('services');
    }
  };

  const handleUseMyLocation = () => {
    onNavigate('services');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLocationSearch();
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-8 sm:py-12 lg:py-20">
        <BubbleBackground bubbleCount={6} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            #1 Plattform för alla företagstjänster
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
            Professionella rengörings- och textiltjänster för ditt företag
          </p>
          
          {/* Search Box */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                Var vill du ha dina tjänster?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Sök efter område, gatunamn, landmärke..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                <button 
                  onClick={handleUseMyLocation}
                  className="bg-cyan-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-cyan-600 transition-colors flex items-center justify-center space-x-2 font-medium text-sm sm:text-base"
                >
                  <Target className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Använd min plats</span>
                </button>
              </div>
              
              {searchLocation.trim() && (
                <button
                  onClick={handleLocationSearch}
                  className="w-full mt-3 bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
                >
                  Sök tjänster i {searchLocation}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-6 sm:py-8 lg:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              Våra tjänster
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Professionella rengörings- och textiltjänster för ditt företag
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Tvätt av fordon */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <Car className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                Tvätt av fordon och transportmedel
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Professionell fordonstvätt för företagsflottor och transportmedel
              </p>
            </div>
            
            {/* Tvätt */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <Shirt className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                Tvätt
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Tvätt av servetter, dukar etc.
              </p>
            </div>
            
            {/* Lokalvård */}
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1">
              <div className="bg-cyan-100 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                Lokalvård
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Städning av kontor och lokaler, Fönsterputs<br />
                Putsning av fönster och glasytor
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Så fungerar Waashy
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              När du har tryckt in adress är det superenkelt att skapa en annons och få hjälp
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Skapa tjänsteförfrågan
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Ta en bild och ange priset du är villig att betala
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Välj utförare
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Välj vem som ska hjälpa dig, på en tid som passar dig
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-cyan-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-xl sm:text-2xl font-bold text-cyan-600">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                Help's on the way!
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Din valda utförare kommer och löser ditt problem
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}