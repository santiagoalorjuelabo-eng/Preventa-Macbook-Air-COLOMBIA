import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, MessageCircle, Smartphone, CreditCard, Wallet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PaymentMethodsProps {
  onWhatsAppClick: () => void;
}

const paymentMethods = [
  {
    id: 'nequi',
    name: 'Nequi',
    description: 'Pago fácil desde tu celular',
    icon: Smartphone,
    color: '#7B1FA2',
    bgGradient: 'from-purple-600 to-purple-500'
  },
  {
    id: 'daviplata',
    name: 'Daviplata',
    description: 'Transferencia inmediata',
    icon: Wallet,
    color: '#E53935',
    bgGradient: 'from-red-600 to-red-500'
  },
  {
    id: 'breb',
    name: 'Bre-B',
    description: 'Billetera móvil',
    icon: Wallet,
    color: '#1976D2',
    bgGradient: 'from-blue-600 to-blue-500'
  },
  {
    id: 'credito',
    name: 'Tarjeta de Crédito',
    description: 'Mastercard',
    icon: CreditCard,
    color: '#1d1d1f',
    bgGradient: 'from-gray-800 to-gray-700'
  },
  {
    id: 'debito',
    name: 'Tarjeta de Débito',
    description: 'Mastercard',
    icon: CreditCard,
    color: '#1d1d1f',
    bgGradient: 'from-gray-700 to-gray-600'
  }
];

export default function PaymentMethods({ onWhatsAppClick }: PaymentMethodsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'back.out(1.2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
              },
              delay: index * 0.1
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: '#f8fafc' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 className="section-title text-center mb-4">
          Elige tu{' '}
          <span 
            className="bg-clip-text text-transparent"
            style={{ 
              backgroundImage: 'linear-gradient(135deg, #2997ff, #af52de)'
            }}
          >
            método de pago
          </span>
        </h2>
        <p 
          className="text-center text-lg mb-12"
          style={{ color: '#86868b' }}
        >
          Para apartar tu unidad con{' '}
          <span className="font-semibold" style={{ color: '#1d1d1f' }}>
            $1.000.000 COP
          </span>
        </p>

        {/* Payment Methods Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {paymentMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                ref={el => { cardsRef.current[index] = el; }}
                onClick={() => setSelectedMethod(method.id)}
                className={`payment-card ${selectedMethod === method.id ? 'selected' : ''}`}
              >
                {/* Selection Indicator */}
                <div 
                  className={`absolute top-3 right-3 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    selectedMethod === method.id 
                      ? 'border-[#2997ff] bg-[#2997ff]' 
                      : 'border-gray-300'
                  }`}
                >
                  {selectedMethod === method.id && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>

                {/* Icon */}
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${method.bgGradient}`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h4 
                  className="font-semibold text-sm mb-1"
                  style={{ color: '#1d1d1f' }}
                >
                  {method.name}
                </h4>
                <p 
                  className="text-xs"
                  style={{ color: '#86868b' }}
                >
                  {method.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* WhatsApp CTA Banner */}
        <div 
          className="glass-card p-8 text-center animate-fade-in-up"
          style={{ 
            background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.1), rgba(37, 211, 102, 0.05))',
            border: '1px solid rgba(37, 211, 102, 0.2)'
          }}
        >
          <div className="flex flex-col items-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mb-4 animate-whatsapp-pulse"
              style={{ background: '#25d366' }}
            >
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            
            <h3 
              className="text-2xl font-bold mb-2"
              style={{ color: '#1d1d1f' }}
            >
              Completa tu apartado por WhatsApp
            </h3>
            
            <p 
              className="text-lg mb-2"
              style={{ color: '#86868b' }}
            >
              Escríbenos para finalizar tu reserva
            </p>
            
            <p 
              className="text-3xl font-bold mb-6"
              style={{ color: '#25d366' }}
            >
              312 3118389
            </p>
            
            <button 
              onClick={onWhatsAppClick}
              className="btn-whatsapp text-lg"
            >
              <MessageCircle className="w-6 h-6" />
              Abrir WhatsApp
            </button>
            
            <p 
              className="text-sm mt-4"
              style={{ color: '#86868b' }}
            >
              Te responderemos en menos de 30 minutos
            </p>
          </div>
        </div>

        {/* Security Note */}
        <div 
          className="mt-8 text-center p-4 rounded-2xl"
          style={{ background: 'rgba(52, 199, 89, 0.05)' }}
        >
          <p className="text-sm" style={{ color: '#1d1d1f' }}>
            <span className="font-semibold">🔒 Pago seguro:</span> Tu apartado se confirma únicamente después de dialogar por WhatsApp. 
            No procesamos pagos en esta página.
          </p>
        </div>
      </div>
    </section>
  );
}
