import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Bell, ShoppingCart } from 'lucide-react';

interface HeroProps {
  onPreorderClick: () => void;
  onNotifyClick: () => void;
}

export default function Hero({ onPreorderClick, onNotifyClick }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const ctx = gsap.context(() => {
      // Title animation - character by character
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        gsap.fromTo(chars, 
          { y: 60, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6, 
            stagger: 0.03,
            ease: 'expo.out',
            delay: 0.2
          }
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current.children,
          { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
          { 
            clipPath: 'inset(0 0% 0 0)', 
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'expo.out',
            delay: 0.6
          }
        );
      }

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { scale: 0.7, rotateX: 15, opacity: 0 },
          { 
            scale: 1, 
            rotateX: 0, 
            opacity: 1,
            duration: 1,
            ease: 'back.out(1.2)',
            delay: 0.4
          }
        );
      }

      // CTA buttons animation
      if (ctaRef.current) {
        gsap.fromTo(ctaRef.current.children,
          { y: 40, opacity: 0 },
          { 
            y: 0, 
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            delay: 1
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const titleText = 'MacBook Neo';

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      style={{
        background: 'linear-gradient(135deg, #eef4f8 0%, #f8fafc 50%, #eef4f8 100%)'
      }}
    >
      {/* Animated Background Gradient */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(41, 151, 255, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(41, 151, 255, 0.05) 0%, transparent 50%)'
        }}
      />

      {/* Floating Color Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-32 h-32 rounded-full opacity-20 animate-hero-float"
          style={{ 
            background: 'linear-gradient(135deg, #F5D547, #FFE082)',
            top: '15%',
            left: '10%',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute w-24 h-24 rounded-full opacity-20 animate-hero-float"
          style={{ 
            background: 'linear-gradient(135deg, #F8BBD9, #F48FB1)',
            top: '25%',
            right: '15%',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute w-20 h-20 rounded-full opacity-20 animate-hero-float"
          style={{ 
            background: 'linear-gradient(135deg, #9FA8DA, #7986CB)',
            bottom: '30%',
            left: '15%',
            animationDelay: '4s'
          }}
        />
        <div 
          className="absolute w-28 h-28 rounded-full opacity-15 animate-hero-float"
          style={{ 
            background: 'linear-gradient(135deg, #E0E0E0, #BDBDBD)',
            bottom: '20%',
            right: '10%',
            animationDelay: '1s'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto text-center pt-20">
        {/* MacGameStore Logo Badge */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div
            className="flex items-center gap-2.5 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            }}
          >
            <div className="w-6 h-6 rounded-lg overflow-hidden flex-shrink-0">
              <img src="/images/macgamestore-logo.jpg" alt="MacGameStore" className="w-full h-full object-cover" />
            </div>
            <span className="text-xs font-semibold" style={{ color: '#1d1d1f' }}>Mac Game Store Colombia</span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,59,48,0.1)', color: '#ff3b30' }}
            >
              PREVENTA
            </span>
          </div>
        </div>

        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          style={{ 
            color: '#1d1d1f',
            letterSpacing: '-0.02em'
          }}
        >
          {titleText.split('').map((char, index) => (
            <span 
              key={index} 
              className="char inline-block"
              style={{ opacity: isLoaded ? undefined : 0 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <div ref={subtitleRef} className="mb-10">
          <p 
            className="text-xl sm:text-2xl md:text-3xl font-medium mb-2"
            style={{ color: '#1d1d1f' }}
          >
            La Mac más accesible de Apple
          </p>
          <p 
            className="text-xl sm:text-2xl md:text-3xl font-medium"
            style={{ color: '#86868b' }}
          >
            llega a Colombia
          </p>
        </div>

        {/* Hero Image */}
        <div 
          ref={imageRef}
          className="relative mx-auto mb-12 max-w-3xl"
          style={{ perspective: '1000px', opacity: isLoaded ? undefined : 0 }}
        >
          <div className="animate-hero-float">
            <img 
              src="/images/macbook-neo-colors.jpg" 
              alt="MacBook Neo - Todos los colores"
              className="w-full h-auto rounded-2xl shadow-2xl"
              style={{
                boxShadow: '0 40px 80px rgba(0, 0, 0, 0.15), 0 20px 40px rgba(0, 0, 0, 0.1)'
              }}
            />
            
            {/* Reflection Effect */}
            <div 
              className="absolute -bottom-20 left-0 right-0 h-20 opacity-30"
              style={{
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
                transform: 'scaleY(-1)',
                maskImage: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
                filter: 'blur(2px)'
              }}
            />
          </div>

          {/* Color Labels */}
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            {[
              { name: 'Amarillo Cítrico', color: '#F5D547' },
              { name: 'Rosa Rubor', color: '#F8BBD9' },
              { name: 'Índigo', color: '#9FA8DA' },
              { name: 'Plata', color: '#E0E0E0' }
            ].map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
              >
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium" style={{ color: '#1d1d1f' }}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onNotifyClick}
            className="btn-secondary flex items-center gap-2 text-lg"
          >
            <Bell className="w-5 h-5" />
            Notificarme cuando llegue
          </button>
          <button 
            onClick={onPreorderClick}
            className="btn-apple flex items-center gap-2 text-lg animate-glow-pulse"
          >
            <ShoppingCart className="w-5 h-5" />
            Quiero la preventa
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm" style={{ color: '#86868b' }}>
          <span className="inline-flex items-center gap-1">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Precio estimado: $3M - $4M COP
          </span>
          <span className="mx-2">•</span>
          <span>Stock limitado</span>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #eef4f8, transparent)'
        }}
      />
    </section>
  );
}
