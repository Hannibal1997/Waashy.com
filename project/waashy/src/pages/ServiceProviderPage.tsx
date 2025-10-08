import React, { useState } from 'react';
import BubbleBackground from '../components/BubbleBackground';
import Footer from '../components/Footer';
import { 
  ShoppingCart, 
  CheckCircle, 
  Smile, 
  Package, 
  Building2, 
  Zap, 
  Gift, 
  Star, 
  Shield, 
  Truck, 
  Clock,
  ArrowRight,
  ChevronDown
} from 'lucide-react';

interface ServiceProviderPageProps {
  onNavigate?: (page: string) => void;
}

const ServiceProviderPage = ({ onNavigate }: ServiceProviderPageProps) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showFaq, setShowFaq] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#eaf6ff] font-sans flex flex-col">
      {/* Hero Section */}
      <section className="text-center py-10 sm:py-14 relative bg-[#e3f2fd] p-0 m-0 overflow-visible min-h-screen flex items-center justify-center">
        <BubbleBackground bubbleCount={20} />
        <div className="max-w-6xl lg:max-w-7xl mx-auto px-2 relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 leading-tight text-neutral-900 fade-in-up tracking-tight whitespace-normal sm:whitespace-nowrap" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', letterSpacing: '-0.01em', fontSize: 'clamp(1.8rem, 4vw, 3.25rem)' }}>
            Bli en Rengöringspartner
          </h1>
          <h2 className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Bli en del av Sveriges största nätverk för tvätt- och kemtvättstjänster. Vi hanterar teknologin, du fokuserar på kvalitet.
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 mt-8 mb-2 relative z-10">
            <button 
              onClick={() => onNavigate?.('application')}
              className="bg-[#1565c0] text-white font-bold rounded-full px-10 py-5 text-lg sm:text-xl transition hover:bg-[#0d47a1] shadow-sm tracking-widest hover:scale-105 transform duration-200"
            >
              Ansök som rengöringspartner
            </button>
          </div>
        </div>
      </section>

      {/* SVG-våg: Hero till Lösningar */}
      <div className="overflow-hidden leading-none" aria-hidden="true" style={{marginTop: '-2px', filter: 'drop-shadow(0 6px 18px rgba(21,101,192,0.10))'}}>
        <svg viewBox="0 0 1440 40" width="100%" height="40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-hero-solutions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e3f2fd" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path d="M0,32 C400,0 800,60 1440,20 V40 H0 Z" fill="url(#wave-hero-solutions)" />
        </svg>
      </div>

      {/* Tidslinje Process */}
      <section id="process" className="py-8 sm:py-12 bg-white scroll-mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-4 text-neutral-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Så här fungerar det
            </h2>
            <p className="text-lg text-gray-600 mb-6">Från ansökan till första beställningen på bara några dagar</p>
            <div className="w-20 sm:w-24 h-1 bg-[#1565c0] mx-auto rounded-full"></div>
          </div>
          
          {/* Tidslinje */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tidslinje för processen</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">1</div>
                <h4 className="font-semibold text-gray-800 mb-2">Ansökan</h4>
                <p className="text-sm text-gray-600">5-10 min</p>
                <p className="text-xs text-gray-500 mt-1">Fyll i formuläret</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">2</div>
                <h4 className="font-semibold text-gray-800 mb-2">Granskning</h4>
                <p className="text-sm text-gray-600">1-3 dagar</p>
                <p className="text-xs text-gray-500 mt-1">Intervju & kontroll</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">3</div>
                <h4 className="font-semibold text-gray-800 mb-2">Onboarding</h4>
                <p className="text-sm text-gray-600">1-2 timmar</p>
                <p className="text-xs text-gray-500 mt-1">Utbildning & setup</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold">4</div>
                <h4 className="font-semibold text-gray-800 mb-2">Redo!</h4>
                <p className="text-sm text-gray-600">Direkt</p>
                <p className="text-xs text-gray-500 mt-1">Börja ta beställningar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SVG-våg: Lösningar till Recensioner */}
      <div className="overflow-hidden leading-none" aria-hidden="true" style={{marginTop: '-2px', filter: 'drop-shadow(0 6px 18px rgba(21,101,192,0.10))'}}>
        <svg viewBox="0 0 1440 40" width="100%" height="40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-solutions-partners" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e3f2fd" />
            </linearGradient>
          </defs>
          <path d="M0,32 C400,0 800,60 1440,20 V40 H0 Z" fill="url(#wave-solutions-partners)" />
        </svg>
      </div>

      {/* Våra rengöringspartners Section */}
      <section id="partners" className="py-8 sm:py-12 relative bg-[#e3f2fd]">
        <BubbleBackground bubbleCount={15} />
        <div className="max-w-6xl mx-auto text-center relative z-10 px-4 sm:px-6">
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-black text-center" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.03em', fontWeight: '700' }}>
            Våra rengöringspartners
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#1565c0] mx-auto rounded-full mb-6 sm:mb-8"></div>
          
          {/* Testimonial */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 mb-8 max-w-4xl mx-auto shadow-lg">
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <blockquote className="text-lg sm:text-xl text-gray-700 italic mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                "Sedan vi började arbeta med Waashy har teamet aldrig visat brist på uppskattning för våra ansträngningar. De går alltid längre för att ge omfattande feedback som verkligen hjälpt oss förbättra oss. Det har varit en njutning att arbeta med Waashy. För att beskriva teamet skulle jag använda dessa ord 'stöttande, förstående, professionellt...' 10/10"
              </blockquote>
              <p className="text-sm text-gray-600">Vår lokala rengöringspartner i Stockholm</p>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
            {[
              {
                icon: <CheckCircle className="w-8 h-8 text-green-600" />,
                title: 'Inga dolda kostnader',
                desc: 'Det finns ingen anmälningsavgift, inga dolda kostnader'
              },
              {
                icon: <Shield className="w-8 h-8 text-blue-600" />,
                title: 'Supportteam',
                desc: 'Vi har ett dedikerat Facility support-team som hjälper när det behövs'
              },
              {
                icon: <Star className="w-8 h-8 text-yellow-600" />,
                title: 'Gör det du är bra på',
                desc: 'Som vår Kemtvättspartner behöver du bara göra det du är bra på - leverera toppkvalitet'
              },
              {
                icon: <Truck className="w-8 h-8 text-purple-600" />,
                title: 'Vi tar hand om resten',
                desc: 'Vi tar hand om all kundservice, leveranser, marknadsföring, teknikutveckling, försäljning och mycket mer'
              }
            ].map((benefit, i) => (
              <div key={i} className="group">
                <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 transform text-center min-h-[120px] sm:min-h-[160px] flex flex-col justify-center">
                  <div className="flex justify-center mb-3">
                    {benefit.icon}
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-gray-800 group-hover:text-primary-700 transition-colors duration-300 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm group-hover:text-gray-700 transition-colors duration-300 leading-tight">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ansökningssektion */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-4 text-neutral-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Ansök som Rengöringspartner utan dolda kostnader eller anmälningsavgift
            </h2>
            <p className="text-lg text-gray-600 mb-6">Börja din resa som rengöringspartner idag - det tar bara några minuter!</p>
            <div className="w-20 sm:w-24 h-1 bg-[#1565c0] mx-auto rounded-full"></div>
          </div>
          
          {/* Ansökningsformulär */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 sm:p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Redo att gå med i vårt nätverk?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Företagsnamn" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input 
                  type="email" 
                  placeholder="E-postadress" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <input 
                  type="tel" 
                  placeholder="Telefonnummer" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Tjänsttyp</option>
                  <option>Kemtvätt</option>
                  <option>Tvättservice</option>
                  <option>Båda</option>
                </select>
              </div>
              <textarea 
                placeholder="Berätta om din verksamhet och erfarenhet..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4"
              />
              <div className="text-center mt-6">
                <button className="bg-[#1565c0] text-white font-bold rounded-full px-8 py-4 text-lg transition hover:bg-[#0d47a1] shadow-sm tracking-widest hover:scale-105 transform duration-200">
                  Ansök som rengöringspartner
                </button>
                <p className="text-sm text-gray-600 mt-3">Vi återkommer till dig inom 24 timmar</p>
              </div>
            </div>
            
            {/* Vad händer efter ansökan */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 mt-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Vad händer efter att du ansökt?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📧</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Bekräftelse</h4>
                  <p className="text-sm text-gray-600">Du får en bekräftelse via e-post inom några minuter</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📞</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Kontakt</h4>
                  <p className="text-sm text-gray-600">Vi kontaktar dig inom 24 timmar för en kort intervju</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Start</h4>
                  <p className="text-sm text-gray-600">Efter godkännande kan du börja ta emot beställningar direkt</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ-sektion */}
      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-4 text-neutral-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Har du frågor?
            </h2>
            <p className="text-lg text-gray-600">Se nedan eller kontakta oss via partners@waashy.com</p>
            <div className="w-20 sm:w-24 h-1 bg-[#1565c0] mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <button 
                onClick={() => setShowFaq(!showFaq)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-xl font-semibold text-gray-800">Vilka krav finns för att bli partner?</h3>
                <ChevronDown className={`w-6 h-6 text-gray-500 transition-transform ${showFaq ? 'rotate-180' : ''}`} />
              </button>
              {showFaq && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="pt-4">
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Öppet 7 dagar i veckan
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Minst 3 tvättmaskiner/torktumlare
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Minst 1 kemtvättsmaskin
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Tillräckligt utrymme för bearbetning/lagring
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        Tekniskt kunnig: dator & internetmöjligheter
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Slutlig CTA-sektion */}
      <section className="py-8 sm:py-12 relative bg-[#e3f2fd]">
        <BubbleBackground bubbleCount={10} />
        <div className="max-w-6xl mx-auto text-center relative z-10 px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-black" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.03em', fontWeight: '700' }}>
            Redo att bli en rengöringspartner?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Gå med i vårt nätverk av rengöringspartners och väx din verksamhet med Waashy. Vi hanterar teknologin, du fokuserar på kvalitetsrengöring.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">
            <button 
              onClick={() => onNavigate?.('application')}
              className="bg-[#1565c0] text-white font-bold rounded-full px-10 py-5 text-lg sm:text-xl transition hover:bg-[#0d47a1] shadow-sm tracking-widest hover:scale-105 transform duration-200"
            >
              Ansök som rengöringspartner
            </button>
          </div>
        </div>
      </section>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ServiceProviderPage;
