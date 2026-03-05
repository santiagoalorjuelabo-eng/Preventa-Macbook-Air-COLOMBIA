import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Bell } from 'lucide-react';

interface NavbarProps {
  onPreorderClick: () => void;
  onNotifyClick: () => void;
}

const navLinks = [
  { label: 'Características', href: '#features' },
  { label: 'Colores', href: '#colors' },
  { label: 'Precios', href: '#pricing' },
  { label: 'Pago', href: '#payment' },
];

export default function Navbar({ onPreorderClick, onNotifyClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(255,255,255,0.88)'
            : 'rgba(255,255,255,0.0)',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a href="#" className="flex items-center gap-3 flex-shrink-0 group">
              <div
                className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.15)' }}
              >
                <img
                  src="/images/macgamestore-logo.jpg"
                  alt="MacGameStore"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:block">
                <span
                  className="font-bold text-sm tracking-tight leading-none block"
                  style={{ color: '#1d1d1f' }}
                >
                  Mac Game Store
                </span>
                <span
                  className="text-xs font-medium leading-none mt-0.5 block"
                  style={{ color: '#86868b' }}
                >
                  Colombia
                </span>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-black/5"
                  style={{ color: '#1d1d1f' }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={onNotifyClick}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:bg-black/5"
                style={{ color: '#1d1d1f', borderColor: 'rgba(0,0,0,0.15)' }}
              >
                <Bell className="w-3.5 h-3.5" />
                Notifícame
              </button>
              <button
                onClick={onPreorderClick}
                className="flex items-center gap-1.5 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #2997ff, #34c759)',
                  boxShadow: '0 4px 16px rgba(41,151,255,0.35)',
                }}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                Preventa
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: 'rgba(0,0,0,0.05)' }}
            >
              {menuOpen
                ? <X className="w-5 h-5" style={{ color: '#1d1d1f' }} />
                : <Menu className="w-5 h-5" style={{ color: '#1d1d1f' }} />
              }
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-300"
        style={{
          pointerEvents: menuOpen ? 'all' : 'none',
          opacity: menuOpen ? 1 : 0,
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)' }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Panel */}
        <div
          className="absolute top-0 right-0 bottom-0 w-72 flex flex-col transition-transform duration-300"
          style={{
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(20px)',
            transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
            boxShadow: '-8px 0 40px rgba(0,0,0,0.1)',
          }}
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img src="/images/macgamestore-logo.jpg" alt="MacGameStore" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-sm" style={{ color: '#1d1d1f' }}>Mac Game Store</span>
            </div>
            <button onClick={() => setMenuOpen(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <X className="w-4 h-4" style={{ color: '#1d1d1f' }} />
            </button>
          </div>

          {/* Links */}
          <div className="flex-1 px-4 py-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-4 py-3 rounded-2xl text-base font-medium transition-colors hover:bg-gray-50"
                style={{ color: '#1d1d1f' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile CTAs */}
          <div className="px-4 pb-8 space-y-3">
            <button
              onClick={() => { setMenuOpen(false); onNotifyClick(); }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-semibold border-2 transition-all"
              style={{ color: '#2997ff', borderColor: '#2997ff' }}
            >
              <Bell className="w-4 h-4" />
              Notifícame cuando llegue
            </button>
            <button
              onClick={() => { setMenuOpen(false); onPreorderClick(); }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-sm font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, #2997ff, #34c759)',
                boxShadow: '0 4px 20px rgba(41,151,255,0.3)',
              }}
            >
              <ShoppingCart className="w-4 h-4" />
              Quiero la Preventa
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
