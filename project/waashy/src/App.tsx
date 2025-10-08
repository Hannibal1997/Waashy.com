import { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ServiceProviderPage from './pages/ServiceProviderPage';
import ApplicationPage from './pages/ApplicationPage';
import { LocationProvider } from './contexts/LocationContext';

interface CartItem {
  service: any;
  quantity: number;
  monthlyVolume: number;
  pricePerUnit: number;
  totalMonthlyCost: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage cart={cart} setCart={setCart} showCart={showCart} setShowCart={setShowCart} />;
      case 'contact':
        return <ContactPage />;
      case 'service-provider':
        return <ServiceProviderPage onNavigate={handleNavigate} />;
      case 'application':
        return <ApplicationPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <LocationProvider>
      <div className="min-h-screen">
        <Header 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          cart={cart}
          onShowCart={currentPage === 'services' ? () => setShowCart(true) : undefined}
        />
        {renderPage()}
      </div>
    </LocationProvider>
  );
}

export default App;