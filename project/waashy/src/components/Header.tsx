import React from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Hem' },
    { id: 'about', label: 'Om oss' },
    { id: 'services', label: 'Tjänster' },
    { id: 'service-provider', label: 'Bli tjänsteleverantör' },
    { id: 'contact', label: 'Kontakt' }
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-2 lg:py-3">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="flex items-center">
              <img 
                src="/Waashy.svg" 
                alt="Waashy Logo" 
                className="h-8 w-8 lg:h-10 lg:w-10"
              />
            </div>
            <div>
              <h1 className="text-lg lg:text-xl font-bold text-gray-900">Waashy</h1>
              <p className="text-xs lg:text-sm text-gray-600 hidden sm:block">Din digitala rengöringspartner</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-xs lg:text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}