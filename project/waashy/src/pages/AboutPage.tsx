import React, { useState, useEffect } from 'react';
import { Target, Shield, Leaf, Monitor, Users } from 'lucide-react';
import BubbleBackground from '../components/BubbleBackground';
import Footer from '../components/Footer';

interface TeamMember {
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin?: string;
}

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState('hero');

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'vision', 'values', 'mission', 'team'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const team: TeamMember[] = [
    {
      name: "Tarek Bassam",
      role: "Grundare & VD",
      description: "Grundaren bakom Waashy med visionen att digitalisera rengöringshantering för företag.",
      image: "/team/tarek_bw.jpg",
      linkedin: "https://www.linkedin.com/in/tarek-bassam/"
    },
    {
      name: "Ahmad Ardal",
      role: "IT-Konsult",
      description: "Skapar och underhåller de tekniska lösningarna som gör Waashy-plattformen möjlig.",
      image: "/team/ahmad_bw.jpg",
      linkedin: "https://www.linkedin.com/in/ahmadardal/"
    }
  ];

  return (
    <div className="min-h-screen bg-[#eaf6ff] font-sans">
      {/* Vertical Progress Indicator - Only show when past hero section */}
      {activeSection !== 'hero' && (
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
          <div className="flex flex-col items-center space-y-8">
            {/* Vertical Line */}
            <div className="w-0.5 h-96 bg-gradient-to-b from-[#1565c0] via-[#42a5f5] to-[#1565c0] relative">
              {/* Progress Line */}
              <div 
                className="absolute top-0 w-full bg-gradient-to-b from-[#42a5f5] to-[#1565c0] transition-all duration-500"
                style={{
                  height: activeSection === 'vision' ? '0%' :
                          activeSection === 'values' ? '33%' :
                          activeSection === 'mission' ? '66%' :
                          activeSection === 'team' ? '100%' : '0%'
                }}
              ></div>
            </div>
            
            {/* Navigation Dots */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col space-y-8">
              <a href="#vision" className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === 'vision' ? 'bg-[#1565c0] border-[#1565c0]' : 'bg-white border-[#1565c0] hover:bg-[#1565c0]'
              }`}></a>
              <a href="#values" className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === 'values' ? 'bg-[#1565c0] border-[#1565c0]' : 'bg-white border-[#1565c0] hover:bg-[#1565c0]'
              }`}></a>
              <a href="#mission" className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === 'mission' ? 'bg-[#1565c0] border-[#1565c0]' : 'bg-white border-[#1565c0] hover:bg-[#1565c0]'
              }`}></a>
              <a href="#team" className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                activeSection === 'team' ? 'bg-[#1565c0] border-[#1565c0]' : 'bg-white border-[#1565c0] hover:bg-[#1565c0]'
              }`}></a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 bg-[#EAF6FB] overflow-hidden">
        <BubbleBackground bubbleCount={15} />
        
        <div className="relative z-10 max-w-[1100px] mx-auto text-center">
          {/* Hero Title */}
          <h1 className="font-normal text-[#2F4654] mb-4 sm:mb-6 max-w-[60ch] mx-auto" style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '-0.01em', fontSize: 'clamp(28px, 5vw, 64px)', lineHeight: '1.15' }}>
            Prisvärt och smidigt.
          </h1>

          {/* Hero Subtitle (Waashy tagline) */}
          <p className="font-semibold text-[#60717B] mb-10 sm:mb-14" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.01em', fontSize: 'clamp(14px, 1.4vw, 20px)' }}>
            Waashy – Företagets digitala rengöringspartner
          </p>

          {/* Navigation */}
          <div className="mt-10 pt-5 max-w-5xl mx-auto">
            <div className="relative">
              {/* Horizontal Line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-[#1565c0] to-[#42a5f5] transform -translate-y-1/2"></div>
              
              {/* Navigation Points */}
              <div className="relative flex justify-between items-center">
                <a href="#vision" className="group flex flex-col items-center">
                  <div className="w-4 h-4 bg-white border-2 border-[#1565c0] rounded-full group-hover:bg-gradient-to-r from-[#1565c0] to-[#42a5f5] transition-all duration-300 shadow-lg"></div>
                  <span className="mt-3 text-lg font-semibold text-slate-700 group-hover:text-gray-900 transition-colors text-center">
                    Vision
                  </span>
                </a>
                
                <a href="#values" className="group flex flex-col items-center">
                  <div className="w-4 h-4 bg-white border-2 border-[#1565c0] rounded-full group-hover:bg-gradient-to-r from-[#1565c0] to-[#42a5f5] transition-all duration-300 shadow-lg"></div>
                  <span className="mt-3 text-lg font-semibold text-slate-700 group-hover:text-gray-900 transition-colors text-center">
                    Values
                  </span>
                </a>
                
                <a href="#mission" className="group flex flex-col items-center">
                  <div className="w-4 h-4 bg-white border-2 border-[#1565c0] rounded-full group-hover:bg-gradient-to-r from-[#1565c0] to-[#42a5f5] transition-all duration-300 shadow-lg"></div>
                  <span className="mt-3 text-lg font-semibold text-slate-700 group-hover:text-gray-900 transition-colors text-center">
                    Mission
                  </span>
                </a>
                
                <a href="#team" className="group flex flex-col items-center">
                  <div className="w-4 h-4 bg-white border-2 border-[#1565c0] rounded-full group-hover:bg-gradient-to-r from-[#1565c0] to-[#42a5f5] transition-all duration-300 shadow-lg"></div>
                  <span className="mt-3 text-lg font-semibold text-slate-700 group-hover:text-gray-900 transition-colors text-center">
                    Team
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SVG-våg: Hero till Vision */}
      <div className="overflow-hidden leading-none" aria-hidden="true" style={{marginTop: '-2px', filter: 'drop-shadow(0 6px 18px rgba(21,101,192,0.10))'}}>
        <svg viewBox="0 0 1440 40" width="100%" height="40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-hero-vision" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e3f2fd" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path d="M0,32 C400,0 800,60 1440,20 V40 H0 Z" fill="url(#wave-hero-vision)" />
        </svg>
      </div>

      {/* Vision Section */}
      <section id="vision" className="py-8 sm:py-16 px-4 sm:px-6 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              VISION
            </h2>
          </div>
          
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              En plattform som gör det enkelt att beställa och hantera alla typer av rengöringstjänster. Genom digitala lösningar skapar vi kostnadseffektivitet, smidighet och pålitlighet, så att företag kan fokusera på sin kärnverksamhet medan vi tar hand om rengöringen.
            </p>
          </div>
        </div>
      </section>

      {/* SVG-våg: Vision till Values */}
      <div className="overflow-hidden leading-none" aria-hidden="true" style={{marginTop: '-2px', filter: 'drop-shadow(0 6px 18px rgba(21,101,192,0.10))'}}>
        <svg viewBox="0 0 1440 40" width="100%" height="40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-vision-values" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
          </defs>
          <path d="M0,32 C400,0 800,60 1440,20 V40 H0 Z" fill="url(#wave-vision-values)" />
        </svg>
      </div>

      {/* Values Section */}
      <section id="values" className="py-8 sm:py-16 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 sm:w-64 sm:h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 sm:w-80 sm:h-80 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              Values
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="group">
              <div className="relative h-full">
                <div className="bg-white rounded-xl p-3 sm:p-6 h-full border border-gray-200 hover:border-blue-300 transition-all duration-300 group-hover:shadow-lg min-h-[120px] sm:min-h-[180px] flex flex-col justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4 group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-green-500 to-green-600">
                      <div className="text-white text-sm sm:text-base">
                        <Target className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">Win-win</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-tight sm:leading-relaxed">Alla parter ska vinna – företag, leverantörer och oss.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="relative h-full">
                <div className="bg-white rounded-xl p-3 sm:p-6 h-full border border-gray-200 hover:border-blue-300 transition-all duration-300 group-hover:shadow-lg min-h-[120px] sm:min-h-[180px] flex flex-col justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4 group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-blue-500 to-blue-600">
                      <div className="text-white text-sm sm:text-base">
                        <Shield className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">Kvalitetskontroll</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-tight sm:leading-relaxed">Högsta kvalitet i alla våra tjänster och leverantörer.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="relative h-full">
                <div className="bg-white rounded-xl p-3 sm:p-6 h-full border border-gray-200 hover:border-blue-300 transition-all duration-300 group-hover:shadow-lg min-h-[120px] sm:min-h-[180px] flex flex-col justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4 group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-emerald-500 to-emerald-600">
                      <div className="text-white text-sm sm:text-base">
                        <Leaf className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">Hållbarhet</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-tight sm:leading-relaxed">Minska vattenanvändning, kemikalier och klimatpåverkan.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group">
              <div className="relative h-full">
                <div className="bg-white rounded-xl p-3 sm:p-6 h-full border border-gray-200 hover:border-blue-300 transition-all duration-300 group-hover:shadow-lg min-h-[120px] sm:min-h-[180px] flex flex-col justify-center">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-4 group-hover:scale-105 transition-transform duration-300 bg-gradient-to-br from-indigo-500 to-indigo-600">
                      <div className="text-white text-sm sm:text-base">
                        <Monitor className="w-8 h-8" />
                      </div>
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-slate-900 mb-2 sm:mb-3">Digitalisering</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-tight sm:leading-relaxed">Digitalisera och förenkla alla rengöringsprocesser.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SVG-våg: Values till Mission */}
      <div className="overflow-hidden leading-none" aria-hidden="true" style={{marginTop: '-2px', filter: 'drop-shadow(0 6px 18px rgba(21,101,192,0.10))'}}>
        <svg viewBox="0 0 1440 40" width="100%" height="40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-values-mission" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
          </defs>
          <path d="M0,32 C400,0 800,60 1440,20 V40 H0 Z" fill="url(#wave-values-mission)" />
        </svg>
      </div>

      {/* Mission Section */}
      <section id="mission" className="py-8 sm:py-16 px-4 sm:px-6 bg-white relative overflow-hidden">
        <BubbleBackground bubbleCount={10} />
        
        <div className="max-w-5xl mx-auto text-center relative">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 sm:mb-8 leading-tight">
            Mission
          </h2>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-8 shadow-lg border border-white/50 max-w-3xl mx-auto">
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Vi har skapat en plattform där företag enkelt kan beställa alla rengöringstjänster på ett och samma ställe. Vi stöttar små lokala leverantörer, kontrollerar kvaliteten och gör det vi är bra på – digitalisering. Våra leverantörer gör det de är bra på – rengöring. Företagen gör det de är bra på – sin kärnverksamhet.
            </p>
          </div>
        </div>
      </section>

      {/* SVG-våg: Mission till Team */}
      <div className="overflow-hidden leading-none" aria-hidden="true" style={{marginTop: '-2px', filter: 'drop-shadow(0 6px 18px rgba(21,101,192,0.10))'}}>
        <svg viewBox="0 0 1440 40" width="100%" height="40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wave-mission-team" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e3f2fd" />
            </linearGradient>
          </defs>
          <path d="M0,32 C400,0 800,60 1440,20 V40 H0 Z" fill="url(#wave-mission-team)" />
        </svg>
      </div>

      {/* Team Section */}
      <section id="team" className="py-16 px-4 bg-[#e3f2fd] text-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Team
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-24 h-24 rounded-full mx-auto mb-3 overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-full bg-gradient-to-br from-[#1565c0] to-[#42a5f5] flex items-center justify-center" style={{display: 'none'}}>
                      <Users className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-bold mb-1 text-gray-900">{member.name}</h3>
                  <p className="text-[#1565c0] mb-2 font-semibold text-xs">{member.role}</p>
                  <p className="text-xs text-gray-600 leading-tight mb-2">{member.description}</p>
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-6 h-6 bg-white border border-gray-300 text-black rounded-full hover:bg-gray-50 transition-colors duration-200"
                      title="LinkedIn"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;