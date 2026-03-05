import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Info, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PricingProps {
  onOptionSelect: (option: 'notify' | 'preorder') => void;
}

export default function Pricing({ onOptionSelect }: PricingProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);
  const [selectedOption, setSelectedOption] = useState<'notify' | 'preorder' | null>(null);
  const [priceAnimated, setPriceAnimated] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Price counter animation
      ScrollTrigger.create({
        trigger: priceRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to({}, {
            duration: 1.2,
            ease: 'expo.out',
            onUpdate: function() {
              const progress = this.progress();
              setPriceAnimated(Math.floor(progress * 3000000));
            }
          });
        },
        once: true
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleOptionSelect = (option: 'notify' | 'preorder') => {
    setSelectedOption(option);
    onOptionSelect(option);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: '#eef4f8' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="section-title text-center mb-16">
          Precio en{' '}
          <span 
            className="bg-clip-text text-transparent"
            style={{ 
              backgroundImage: 'linear-gradient(135deg, #2997ff, #34c759)'
            }}
          >
            Colombia
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Price Display */}
          <div className="glass-card p-8 lg:p-12 flex flex-col justify-center">
            <span 
              className="text-lg font-medium mb-2"
              style={{ color: '#86868b' }}
            >
              Desde
            </span>
            
            <div ref={priceRef} className="mb-4">
              <span className="price-display">
                ${priceAnimated.toLocaleString('es-CO')}
              </span>
            </div>
            
            <span 
              className="text-2xl font-semibold mb-6"
              style={{ color: '#1d1d1f' }}
            >
              COP
            </span>
            
            <p 
              className="text-base mb-6"
              style={{ color: '#86868b' }}
            >
              Precio estimado hasta $4.000.000 COP según configuración
            </p>
            
            <div className="stock-badge">
              <Zap className="w-4 h-4" />
              <span>Stock limitado para preventa</span>
            </div>

            {/* Price Info */}
            <div 
              className="mt-8 p-4 rounded-2xl"
              style={{ background: 'rgba(41, 151, 255, 0.05)' }}
            >
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#2997ff' }} />
                <p className="text-sm" style={{ color: '#1d1d1f' }}>
                  Precio referencial en pesos colombianos. El precio final puede variar según impuestos y configuración seleccionada.
                </p>
              </div>
            </div>
          </div>

          {/* Preorder Options */}
          <div className="glass-card p-8 lg:p-12">
            <h3 
              className="text-2xl font-bold mb-6"
              style={{ color: '#1d1d1f' }}
            >
              ¿Cómo quieres reservar?
            </h3>
            
            <div className="space-y-4">
              {/* Notify Option */}
              <div
                onClick={() => handleOptionSelect('notify')}
                className={`radio-option ${selectedOption === 'notify' ? 'selected' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      selectedOption === 'notify' 
                        ? 'border-[#2997ff] bg-[#2997ff]' 
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedOption === 'notify' && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 
                      className="font-semibold mb-1"
                      style={{ color: '#1d1d1f' }}
                    >
                      Notificarme cuando llegue
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ color: '#86868b' }}
                    >
                      Recibe una notificación con promoción especial cuando la MacBook Neo llegue a Colombia
                    </p>
                  </div>
                </div>
              </div>

              {/* Preorder Option */}
              <div
                onClick={() => handleOptionSelect('preorder')}
                className={`radio-option ${selectedOption === 'preorder' ? 'selected' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      selectedOption === 'preorder' 
                        ? 'border-[#2997ff] bg-[#2997ff]' 
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedOption === 'preorder' && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 
                        className="font-semibold"
                        style={{ color: '#1d1d1f' }}
                      >
                        Quiero ser parte de la preventa
                      </h4>
                      <span 
                        className="text-xs font-bold px-2 py-1 rounded-full"
                        style={{ 
                          background: 'rgba(255, 59, 48, 0.1)',
                          color: '#ff3b30'
                        }}
                      >
                        STOCK LIMITADO
                      </span>
                    </div>
                    <p 
                      className="text-sm"
                      style={{ color: '#86868b' }}
                    >
                      Asegura tu unidad con $1.000.000 COP y sé de los primeros en recibirla
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Option Info */}
            {selectedOption && (
              <div 
                className="mt-6 p-4 rounded-2xl animate-fade-in-up"
                style={{ background: 'rgba(52, 199, 89, 0.05)' }}
              >
                <p className="text-sm" style={{ color: '#1d1d1f' }}>
                  {selectedOption === 'notify' 
                    ? 'Te notificaremos por WhatsApp cuando la MacBook Neo llegue a Colombia con promociones especiales.'
                    : 'Continúa para seleccionar tu método de pago y apartar tu unidad con $1.000.000 COP.'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
