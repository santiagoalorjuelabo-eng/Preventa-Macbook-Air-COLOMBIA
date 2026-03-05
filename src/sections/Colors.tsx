import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const colors = [
  {
    name: 'Amarillo Cítrico',
    description: 'Energía y creatividad para tu día a día',
    bgColor: '#FFFEF0',
    accentColor: '#F5D547',
    image: '/images/macbook-neo-citrus.jpg'
  },
  {
    name: 'Rosa Rubor',
    description: 'Suave y sofisticado, para los románticos',
    bgColor: '#FFF5F8',
    accentColor: '#F8BBD9',
    image: '/images/macbook-neo-colors.jpg'
  },
  {
    name: 'Índigo',
    description: 'Profundo y misterioso, para los creativos',
    bgColor: '#F0F4FF',
    accentColor: '#9FA8DA',
    image: '/images/macbook-neo-keyboard.jpg'
  },
  {
    name: 'Plata',
    description: 'Clásico y elegante, atemporal',
    bgColor: '#F8F9FA',
    accentColor: '#C0C0C0',
    image: '/images/macbook-neo-hero.jpg'
  }
];

export default function Colors() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextColor = () => {
    setActiveIndex((prev) => (prev + 1) % colors.length);
  };

  const prevColor = () => {
    setActiveIndex((prev) => (prev - 1 + colors.length) % colors.length);
  };

  const activeColor = colors[activeIndex];

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-700"
      style={{ background: activeColor.bgColor }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2 
          ref={titleRef}
          className="section-title text-center mb-6"
        >
          Elige tu{' '}
          <span 
            className="bg-clip-text text-transparent"
            style={{ 
              backgroundImage: `linear-gradient(135deg, ${activeColor.accentColor}, #2997ff)`
            }}
          >
            estilo
          </span>
        </h2>
        <p 
          className="text-center text-lg mb-16 max-w-2xl mx-auto"
          style={{ color: '#86868b' }}
        >
          Cuatro colores increíbles para que encuentres el que mejor se adapte a tu personalidad
        </p>

        {/* Color Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevColor}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
            style={{ transform: 'translateY(-50%) translateX(-50%)' }}
          >
            <ChevronLeft className="w-6 h-6" style={{ color: '#1d1d1f' }} />
          </button>
          <button
            onClick={nextColor}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
            style={{ transform: 'translateY(-50%) translateX(50%)' }}
          >
            <ChevronRight className="w-6 h-6" style={{ color: '#1d1d1f' }} />
          </button>

          {/* Main Display */}
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500"
              style={{ 
                transform: `translateX(-${activeIndex * 100}%)`,
                transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            >
              {colors.map((color, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="glass-card overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="relative aspect-video lg:aspect-auto">
                        <img 
                          src={color.image}
                          alt={`MacBook Neo ${color.name}`}
                          className="w-full h-full object-cover"
                        />
                        <div 
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(to right, transparent, ${color.bgColor})`
                          }}
                        />
                      </div>
                      
                      {/* Content */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div 
                          className="w-16 h-16 rounded-2xl mb-6"
                          style={{ backgroundColor: color.accentColor }}
                        />
                        <h3 
                          className="text-3xl lg:text-4xl font-bold mb-4"
                          style={{ color: '#1d1d1f' }}
                        >
                          {color.name}
                        </h3>
                        <p 
                          className="text-lg mb-8"
                          style={{ color: '#86868b' }}
                        >
                          {color.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <span 
                            className="text-sm font-medium px-4 py-2 rounded-full"
                            style={{ 
                              backgroundColor: `${color.accentColor}20`,
                              color: color.accentColor
                            }}
                          >
                            Disponible en preventa
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {colors.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === activeIndex ? activeColor.accentColor : '#D1D5DB',
                  transform: index === activeIndex ? 'scale(1.3)' : 'scale(1)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Color Quick Select */}
        <div className="flex justify-center gap-4 mt-12 flex-wrap">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'shadow-lg scale-105' 
                  : 'hover:scale-105'
              }`}
              style={{
                backgroundColor: index === activeIndex ? 'white' : 'rgba(255,255,255,0.5)',
                border: index === activeIndex ? `2px solid ${color.accentColor}` : '2px solid transparent'
              }}
            >
              <div 
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: color.accentColor }}
              />
              <span 
                className="font-medium"
                style={{ color: '#1d1d1f' }}
              >
                {color.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
