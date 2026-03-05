import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, X } from 'lucide-react';

import Hero from './sections/Hero';
import Features from './sections/Features';
import Colors from './sections/Colors';
import Pricing from './sections/Pricing';
import PaymentMethods from './sections/PaymentMethods';
import Footer from './sections/Footer';
import WhatsAppPopup from './components/WhatsAppPopup';
import Navbar from './components/Navbar';

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = '573123118389';
const WHATSAPP_MESSAGE = 'Hola! Estoy interesado en la MacBook Neo. Me gustaría recibir más información sobre la preventa.';
const WHATSAPP_MESSAGE_PREORDER = 'Hola! Quiero apartar mi MacBook Neo en preventa. He seleccionado el método de pago y estoy listo para realizar el apartado de $1.000.000 COP.';

function App() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState<'notify' | 'preorder' | 'promo'>('notify');
  const [showPromoWidget, setShowPromoWidget] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'notify' | 'preorder' | null>(null);

  // Show promo widget after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPromoWidget(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Handle scroll animations cleanup
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const openWhatsApp = useCallback((message: string = WHATSAPP_MESSAGE) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  }, []);

  const handleNotifyClick = useCallback(() => {
    setPopupType('notify');
    setPopupOpen(true);
    setSelectedOption('notify');
  }, []);

  const handlePreorderClick = useCallback(() => {
    setPopupType('preorder');
    setPopupOpen(true);
    setSelectedOption('preorder');
  }, []);

  const handlePromoClick = useCallback(() => {
    setPopupType('promo');
    setPopupOpen(true);
  }, []);

  const handleWhatsAppClick = useCallback(() => {
    const message = selectedOption === 'preorder' 
      ? WHATSAPP_MESSAGE_PREORDER 
      : WHATSAPP_MESSAGE;
    openWhatsApp(message);
  }, [selectedOption, openWhatsApp]);

  const handleOptionSelect = useCallback((option: 'notify' | 'preorder') => {
    setSelectedOption(option);
    if (option === 'notify') {
      setPopupType('notify');
    } else {
      setPopupType('preorder');
    }
    setPopupOpen(true);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: '#eef4f8' }}>
      {/* Navbar */}
      <Navbar
        onPreorderClick={handlePreorderClick}
        onNotifyClick={handleNotifyClick}
      />

      {/* Hero Section */}
      <Hero 
        onPreorderClick={handlePreorderClick}
        onNotifyClick={handleNotifyClick}
      />

      {/* Features Section */}
      <section id="features">
        <Features />
      </section>

      {/* Colors Section */}
      <section id="colors">
        <Colors />
      </section>

      {/* Pricing Section */}
      <section id="pricing">
        <Pricing onOptionSelect={handleOptionSelect} />
      </section>

      {/* Payment Methods Section */}
      <section id="payment">
        <PaymentMethods onWhatsAppClick={handleWhatsAppClick} />
      </section>

      {/* Footer */}
      <Footer onWhatsAppClick={handleWhatsAppClick} />

      {/* WhatsApp Popup */}
      <WhatsAppPopup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        onWhatsAppClick={handleWhatsAppClick}
        type={popupType}
      />

      {/* Floating Promo Widget */}
      {showPromoWidget && (
        <div 
          className="fixed bottom-6 right-6 z-40 animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          <div 
            className="glass-card p-4 max-w-xs relative"
            style={{ 
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(37, 211, 102, 0.2)'
            }}
          >
            <button
              onClick={() => setShowPromoWidget(false)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            
            <div className="flex items-start gap-3">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 animate-whatsapp-pulse"
                style={{ background: '#25d366' }}
              >
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: '#1d1d1f' }}>
                  ¿Tienes preguntas?
                </p>
                <p className="text-xs mb-3" style={{ color: '#86868b' }}>
                  Escríbenos por WhatsApp y recibe asesoría personalizada
                </p>
                <button
                  onClick={handlePromoClick}
                  className="text-sm font-medium flex items-center gap-1 transition-colors hover:opacity-80"
                  style={{ color: '#25d366' }}
                >
                  <MessageCircle className="w-4 h-4" />
                  Chatear ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed WhatsApp Button */}
      <button
        onClick={handlePromoClick}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        style={{ 
          background: '#25d366',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)'
        }}
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </button>
    </div>
  );
}

export default App;
