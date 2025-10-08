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
  Clock 
} from 'lucide-react';

const ServiceProviderPage = () => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-[#eaf6ff] font-sans flex flex-col">
      {/* Hero Section */}
      <section className="text-center py-10 sm:py-14 relative bg-[#e3f2fd] p-0 m-0 overflow-visible min-h-screen flex items-center justify-center">
        <BubbleBackground bubbleCount={20} />
        <div className="max-w-6xl lg:max-w-7xl mx-auto px-2 relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 sm:mb-8 leading-tight text-neutral-900 fade-in-up tracking-tight whitespace-normal sm:whitespace-nowrap" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '800', letterSpacing: '-0.01em', fontSize: 'clamp(1.8rem, 4vw, 3.25rem)' }}>
            #CareerAtWaashy
          </h1>
          <h2 className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
            Tjäna pengar på ditt sätt genom att ansluta dig till Sverige's super-app för alla rengöringstjänster!
          </h2>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto" style={{ fontFamily: 'Playfair Display, serif' }}>
            Bli en Waashy Buddy - Vi stöttar små lokala leverantörer
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 mt-8 mb-2 relative z-10">
            <button className="bg-[#1565c0] text-white font-bold rounded-full px-10 py-5 text-lg sm:text-xl transition hover:bg-[#0d47a1] shadow-sm tracking-widest hover:scale-105 transform duration-200">
              Bli Buddy
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

      {/* Vad är Waashy Section */}
      <section id="what-is" className="py-8 sm:py-12 bg-white scroll-mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-4 text-neutral-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              😄 Vad?
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-[#1565c0] mx-auto rounded-full"></div>
          </div>
          <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              En plattform som gör det enkelt att beställa och hantera alla typer av rengöringstjänster. Genom digitala lösningar skapar vi kostnadseffektivitet, smidighet och pålitlighet, så att företag kan fokusera på sin kärnverksamhet medan vi tar hand om rengöringen.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6">
            {[
              {
                icon: "🏢",
                title: 'Stöd för lokala leverantörer',
                desc: 'Vi stöttar små lokala leverantörer och hjälper er att växa genom vår digitala plattform.',
                longDesc: 'Vi tror på att stödja lokala företag och hjälper er att nå nya kunder genom vår plattform. Ni gör det ni är bra på - rengöring.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: "⭐",
                title: 'Kvalitetskontroll',
                desc: 'Vi kontrollerar kvaliteten och säkerställer att våra leverantörer uppfyller höga standarder.',
                longDesc: 'Genom vår kvalitetskontroll säkerställer vi att alla leverantörer uppfyller våra höga standarder och levererar utmärkta rengöringstjänster.',
                color: 'from-green-500 to-green-600'
              },
              {
                icon: "💻",
                title: 'Digitalisering',
                desc: 'Vi gör det vi är bra på - digitalisering. Ni gör det ni är bra på - rengöring.',
                longDesc: 'Vår plattform hanterar all digitalisering, beställningar och kommunikation så att ni kan fokusera på det ni gör bäst - rengöring.',
                color: 'from-purple-500 to-purple-600'
              }
            ].map((feature, i) => (
              <div key={i} className="group">
                <div 
                  className={`bg-gradient-to-br ${feature.color} border border-gray-200 rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 transform text-white min-h-[140px] sm:min-h-[160px] flex flex-col justify-center`}
                  onClick={() => setExpandedCard(expandedCard === `feature-${i}` ? null : `feature-${i}`)}
                  onMouseLeave={() => setExpandedCard(null)}
                >
                  {/* Default content */}
                  <div className={expandedCard === `feature-${i}` ? 'hidden' : 'block'}>
                    <div className="text-center mb-3">
                      <div className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-gray-100 transition-colors duration-300 mb-2">{feature.title}</h3>
                    </div>
                    <p className="text-white text-xs sm:text-sm group-hover:text-gray-100 transition-colors duration-300 text-center leading-relaxed">{feature.desc}</p>
                  </div>
                  
                  {/* Expanded content on click */}
                  <div className={expandedCard === `feature-${i}` ? 'block' : 'hidden'}>
                    <div className="text-center mb-3">
                      <div className="text-3xl sm:text-4xl mb-2">
                        {feature.icon}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2">{feature.title}</h3>
                    </div>
                    <p className="text-white text-xs sm:text-sm leading-relaxed text-center">{feature.longDesc}</p>
                  </div>
                </div>
              </div>
            ))}
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

      {/* Hur fungerar det Section */}
      <section id="how-it-works" className="py-8 sm:py-12 relative bg-[#e3f2fd]">
        <BubbleBackground bubbleCount={15} />
        <div className="max-w-6xl mx-auto text-center relative z-10 px-4 sm:px-6">
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-black text-center" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.03em', fontWeight: '700' }}>
            📲 Hur?
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#1565c0] mx-auto rounded-full mb-6 sm:mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
            {[
              {
                icon: <div className="w-8 h-8 text-blue-900 flex items-center justify-center text-2xl">1</div>,
                title: 'Ansök som leverantör',
                desc: 'Fyll i ansökningsformuläret och visa oss dina färdigheter inom rengöring.'
              },
              {
                icon: <div className="w-8 h-8 text-blue-900 flex items-center justify-center text-2xl">2</div>,
                title: 'Intervju',
                desc: 'Vi granskar er verksamhet och säkerställer att ni uppfyller våra höga standarder.'
              },
              {
                icon: <div className="w-8 h-8 text-blue-900 flex items-center justify-center text-2xl">3</div>,
                title: 'Bli godkänd',
                desc: 'När ni godkänns får ni tillgång till vår plattform och kan börja ta emot beställningar.'
              },
              {
                icon: <div className="w-8 h-8 text-blue-900 flex items-center justify-center text-2xl">4</div>,
                title: 'Väx med oss',
                desc: 'Börja få nya kunder och bygg långsiktiga partnerskap – enkelt, smidigt och lönsamt!'
              }
            ].map((step, i) => {
              const stepColors = [
                'from-blue-500 to-blue-600',
                'from-green-500 to-green-600', 
                'from-purple-500 to-purple-600',
                'from-orange-500 to-orange-600'
              ];
              const stepColor = stepColors[i % stepColors.length];
              
              return (
                <div key={i} className="group">
                  <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-3 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 transform text-center min-h-[100px] sm:min-h-[160px] flex flex-col justify-center">
                    <div className="flex justify-center mb-2">
                      <div className={`w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gradient-to-br ${stepColor} text-white text-sm sm:text-2xl group-hover:scale-110 transition-transform duration-300`}>
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-gray-800 group-hover:text-primary-700 transition-colors duration-300 mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm group-hover:text-gray-700 transition-colors duration-300 leading-tight">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Exempel på uppdrag Section */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-4 text-neutral-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Exempel på uppdrag
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-[#1565c0] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6">
            {[
              {
                icon: "🧺",
                title: 'Tvättservice',
                price: '28 800 kr',
                desc: '800 kg tvätt × 36 kr/kg = 28 800 kr/månad'
              },
              {
                icon: "🏢",
                title: 'Kontorsstädning',
                price: '12 000 kr',
                desc: '500 kvm × 24 kr/kvm = 12 000 kr/månad'
              },
              {
                icon: "🚗",
                title: 'Biltvätt',
                price: '10 000 kr',
                desc: '20 bilar × 500 kr/bil = 10 000 kr/månad'
              },
              {
                icon: "🏥",
                title: 'Vårdstädning',
                price: '18 000 kr',
                desc: '300 kvm × 60 kr/kvm = 18 000 kr/månad'
              }
            ].map((job, i) => (
              <div key={i} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1 transform">
                <div className="text-center">
                  <div className="text-4xl mb-3">{job.icon}</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{job.title}</h3>
                  <div className="text-2xl font-bold text-[#1565c0] mb-2">{job.price}</div>
                  <p className="text-gray-600 text-sm">{job.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-8 sm:py-12 relative bg-[#e3f2fd]">
        <BubbleBackground bubbleCount={10} />
        <div className="max-w-6xl mx-auto text-center relative z-10 px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-black" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.03em', fontWeight: '700' }}>
            Redo att bli en del av vårt nätverk?
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8 sm:mb-12 max-w-4xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Vi stöttar små lokala leverantörer och hjälper er att växa. Ni gör det ni är bra på – rengöring. Vi gör det vi är bra på – digitalisering.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">
            <button className="bg-[#1565c0] text-white font-bold rounded-full px-10 py-5 text-lg sm:text-xl transition hover:bg-[#0d47a1] shadow-sm tracking-widest hover:scale-105 transform duration-200">
              Ja det gör jag!
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
