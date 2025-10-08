import { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ServiceProviderPage from './pages/ServiceProviderPage';
import ApplicationPage from './pages/ApplicationPage';
import { LocationProvider } from './contexts/LocationContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

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
        return <ServicesPage />;
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
        />
        {renderPage()}
      </div>
    </LocationProvider>
  );
}

export default App;