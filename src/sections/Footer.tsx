import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, Mail, MapPin, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  onWhatsAppClick: () => void;
}

export default function Footer({ onWhatsAppClick }: FooterProps) {
  const footerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.fromTo(contentRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ background: '#1d1d1f' }}
    >
      <div ref={contentRef} className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #2997ff, #34c759)' }}
              >
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">MacBook Neo</h3>
                <p className="text-gray-400 text-sm">Colombia</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              La Mac más accesible de Apple, pronto en tus manos. 
              Sé de los primeros en experimentar el poder del chip A18 Pro.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <button
                onClick={onWhatsAppClick}
                className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                </div>
                <span className="text-sm">312 3118389</span>
              </button>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-500" />
                </div>
                <span className="text-sm">info@macbookneo.co</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-purple-500" />
                </div>
                <span className="text-sm">Colombia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces rápidos</h4>
            <div className="space-y-3">
              <button
                onClick={onWhatsAppClick}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Preordenar ahora
              </button>
              <a 
                href="#features"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Características
              </a>
              <a 
                href="#pricing"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Precios
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-800 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © 2026 MacBook Neo Colombia. Apple y MacBook son marcas registradas de Apple Inc.
            Este sitio no está afiliado oficialmente con Apple Inc.
          </p>
          
          <div className="flex items-center gap-4">
            <button
              onClick={onWhatsAppClick}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              style={{ 
                background: '#25d366',
                color: 'white'
              }}
            >
              <MessageCircle className="w-4 h-4" />
              Escríbenos
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
