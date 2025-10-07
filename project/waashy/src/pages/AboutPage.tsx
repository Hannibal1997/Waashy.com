import React from 'react';
import { Target, Shield, Leaf, Monitor } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Prisvärd och smidig tvätt.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12">
            Waashy – Företagets digitala rengöringspartner
          </p>
          
          {/* Progress Timeline */}
          <div className="flex items-center justify-center space-x-4 sm:space-x-8 md:space-x-16 mb-8 sm:mb-12 lg:mb-16">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded-full mb-1 sm:mb-2"></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">Vision</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-600 max-w-8 sm:max-w-none"></div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded-full mb-1 sm:mb-2"></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">Values</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-600 max-w-8 sm:max-w-none"></div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded-full mb-1 sm:mb-2"></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">Mission</span>
            </div>
            <div className="flex-1 h-0.5 bg-blue-600 max-w-8 sm:max-w-none"></div>
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded-full mb-1 sm:mb-2"></div>
              <span className="text-xs sm:text-sm font-medium text-gray-700">Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">VISION</h2>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-600 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center">
              En plattform som gör det enkelt att beställa och hantera alla typer av rengöringstjänster. Genom digitala lösningar 
              skapar vi kostnadseffektivitet, smidighet och pålitlighet, så att företag kan fokusera på sin kärnverksamhet medan 
              vi tar hand om rengöringen.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Values</h2>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-600 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm text-center">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Target className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Win-win</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Alla parter ska vinna – företag, leverantörer och oss.
              </p>
            </div>
            
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm text-center border-2 border-blue-200">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Kvalitetskontroll</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Högsta kvalitet i alla våra tjänster och leverantörer.
              </p>
            </div>
            
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm text-center">
              <div className="bg-green-100 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Hållbarhet</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Minska vattenanvändning, kemikalier och klimatpåverkan.
              </p>
            </div>
            
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm text-center sm:col-span-2 lg:col-span-1">
              <div className="bg-blue-100 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Monitor className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Digitalisering</h3>
              <p className="text-gray-600 text-xs sm:text-sm">
                Digitalisera och förenkla alla rengöringsprocesser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Mission</h2>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-600 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
            <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center">
              Vi har skapat en plattform där företag enkelt kan beställa alla rengöringstjänster på ett och samma ställe. 
              Vi stöttar små lokala leverantörer, kontrollerar kvaliteten och gör det vi är bra på – digitalisering. Våra 
              leverantörer gör det de är bra på – rengöring. Företagen gör det de är bra på – sin kärnverksamhet.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Team</h2>
            <div className="flex flex-col items-center space-y-2">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-600 rounded-full"></div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm text-center">
            <p className="text-sm sm:text-base lg:text-lg text-gray-700">
              Vårt team består av erfarna entreprenörer och tekniker som brinner för att förenkla företags vardag 
              genom smarta digitala lösningar.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}