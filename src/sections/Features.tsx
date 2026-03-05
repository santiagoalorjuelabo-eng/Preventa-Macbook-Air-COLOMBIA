import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Monitor, Palette, Battery } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Cpu,
    title: 'Chip A18 Pro',
    description: 'El mismo cerebro del iPhone 16 Pro. Hasta 50% más rápido que una PC con Intel. Neural Engine de 16 núcleos para Apple Intelligence.',
    color: '#2997ff',
    gradient: 'from-blue-500 to-cyan-400'
  },
  {
    icon: Monitor,
    title: 'Pantalla Liquid Retina',
    description: '13 pulgadas con 500 nits de brillo, 3.6 millones de píxeles y mil millones de colores. Una experiencia visual increíble.',
    color: '#34c759',
    gradient: 'from-green-500 to-emerald-400'
  },
  {
    icon: Palette,
    title: '4 colores increíbles',
    description: 'Amarillo cítrico, Rosa rubor, Índigo y Plata. Expresa tu personalidad con el color que más te represente.',
    color: '#ff9500',
    gradient: 'from-orange-500 to-yellow-400'
  },
  {
    icon: Battery,
    title: 'Hasta 16 horas',
    description: 'Batería para todo el día de trabajo o estudio. Hasta 11 horas de navegación web inalámbrica. Sin ventilador, completamente silenciosa.',
    color: '#af52de',
    gradient: 'from-purple-500 to-pink-400'
  }
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { y: 40, opacity: 0 },
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

      // Cards animation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          const direction = index % 2 === 0 ? -100 : 100;
          gsap.fromTo(card,
            { x: direction, opacity: 0, rotateY: index % 2 === 0 ? 15 : -15 },
            {
              x: 0,
              opacity: 1,
              rotateY: 0,
              duration: 0.7,
              ease: 'back.out(1.2)',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
              },
              delay: index * 0.15
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
        <h2 
          ref={titleRef}
          className="section-title text-center mb-16"
        >
          Características que{' '}
          <span 
            className="bg-clip-text text-transparent"
            style={{ 
              backgroundImage: 'linear-gradient(135deg, #2997ff, #34c759)'
            }}
          >
            cambian todo
          </span>
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                ref={el => { cardsRef.current[index] = el; }}
                className="feature-card group"
                style={{ 
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Icon */}
                <div 
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                  style={{ 
                    background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`
                  }}
                >
                  <Icon 
                    className="w-8 h-8"
                    style={{ color: feature.color }}
                  />
                </div>

                {/* Content */}
                <h3 
                  className="text-2xl font-bold mb-3"
                  style={{ color: '#1d1d1f' }}
                >
                  {feature.title}
                </h3>
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: '#86868b' }}
                >
                  {feature.description}
                </p>

                {/* Decorative Line */}
                <div 
                  className="mt-6 h-1 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{ 
                    width: '40%',
                    background: `linear-gradient(90deg, ${feature.color}, transparent)`
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Additional Info Banner */}
        <div 
          className="mt-12 p-8 rounded-3xl text-center"
          style={{ 
            background: 'linear-gradient(135deg, rgba(41, 151, 255, 0.05), rgba(52, 199, 89, 0.05))',
            border: '1px solid rgba(41, 151, 255, 0.1)'
          }}
        >
          <p className="text-lg" style={{ color: '#1d1d1f' }}>
            <span className="font-semibold">macOS Tahoe</span> incluido con{' '}
            <span className="font-semibold" style={{ color: '#2997ff' }}>Apple Intelligence</span>
            {' '}para ayudarte a redactar, expresarte y hacer tus tareas sin esfuerzo.
          </p>
        </div>
      </div>
    </section>
  );
}
