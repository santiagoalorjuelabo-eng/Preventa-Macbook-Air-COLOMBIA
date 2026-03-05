import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, MessageCircle, Bell, ShoppingCart, User, Phone, Mail, ChevronRight, CheckCircle2 } from 'lucide-react';

interface WhatsAppPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onWhatsAppClick: (message: string) => void;
  type: 'notify' | 'preorder' | 'promo';
}

const WHATSAPP_NUMBER = '573123118389';

export default function WhatsAppPopup({ isOpen, onClose, type }: WhatsAppPopupProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [activeType, setActiveType] = useState<'notify' | 'preorder'>(
    type === 'preorder' ? 'preorder' : 'notify'
  );
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [color, setColor] = useState('');
  const [model, setModel] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      setActiveType(type === 'preorder' ? 'preorder' : 'notify');
      setSubmitted(false);
      setErrors({});
    }
  }, [isOpen, type]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(modalRef.current,
        { y: 80, scale: 0.93, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.2)', delay: 0.05 }
      );
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(modalRef.current, { y: 40, scale: 0.95, opacity: 0, duration: 0.25, ease: 'power2.in' });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.25, delay: 0.1, onComplete: onClose });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = 'Tu nombre es requerido';
    if (!phone.trim()) e.phone = 'Tu WhatsApp es requerido';
    else if (!/^\d{7,15}$/.test(phone.replace(/\s/g, ''))) e.phone = 'Número inválido';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Correo inválido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const isPreorder = activeType === 'preorder';
    let msg = '';
    if (!isPreorder) {
      msg = `🔔 *Notificación MacBook Neo - Mac Game Store*\n\n👤 Nombre: ${name}\n📱 WhatsApp: ${phone}${email ? `\n📧 Correo: ${email}` : ''}${color ? `\n🎨 Color: ${color}` : ''}\n\nHola! Quiero recibir notificación con promoción especial cuando la MacBook Neo llegue a Colombia.`;
    } else {
      msg = `🔥 *PREVENTA MacBook Neo - Mac Game Store*\n\n👤 Nombre: ${name}\n📱 WhatsApp: ${phone}${email ? `\n📧 Correo: ${email}` : ''}${model ? `\n💻 Modelo: ${model}` : ''}${color ? `\n🎨 Color: ${color}` : ''}\n\nQuiero apartar mi MacBook Neo con $1.000.000 COP de separación.`;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
  };

  if (!isOpen) return null;

  const isPreorder = activeType === 'preorder';

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-md"
        style={{
          background: 'white',
          borderRadius: '28px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.18)',
          maxHeight: '92vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:bg-gray-100"
          style={{ color: '#86868b' }}
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center text-center px-8 py-12">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
              style={{ background: isPreorder ? 'rgba(52,199,89,0.1)' : 'rgba(41,151,255,0.1)' }}
            >
              <CheckCircle2 className="w-10 h-10" style={{ color: isPreorder ? '#34c759' : '#2997ff' }} />
            </div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: '#1d1d1f' }}>
              {isPreorder ? '¡Cupo reservado! 🎉' : '¡Listo! Te avisamos 🔔'}
            </h3>
            <p className="text-base mb-6" style={{ color: '#86868b', lineHeight: 1.6 }}>
              {isPreorder
                ? 'Te abrimos WhatsApp para coordinar el pago de $1.000.000 COP de separación.'
                : 'Te contactaremos con tu promoción exclusiva cuando llegue a Colombia.'}
            </p>
            <p className="text-sm font-semibold" style={{ color: '#25d366' }}>312 311 8389</p>
            <button onClick={handleClose} className="mt-6 px-8 py-3 rounded-full text-sm font-semibold text-white" style={{ background: '#1d1d1f' }}>
              Cerrar
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-6 pt-7 pb-5" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                  <img src="/images/macgamestore-logo.jpg" alt="MacGameStore" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{ color: '#86868b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Mac Game Store</p>
                  <p className="text-xs" style={{ color: '#86868b' }}>Colombia · Stock Limitado</p>
                </div>
              </div>
              {/* Toggle */}
              <div className="flex rounded-2xl p-1 gap-1" style={{ background: 'rgba(0,0,0,0.04)' }}>
                <button
                  onClick={() => setActiveType('notify')}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={{
                    background: !isPreorder ? 'white' : 'transparent',
                    color: !isPreorder ? '#2997ff' : '#86868b',
                    boxShadow: !isPreorder ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  }}
                >
                  <Bell className="w-4 h-4 flex-shrink-0" />
                  <span>Notifícame cuando llegue</span>
                </button>
                <button
                  onClick={() => setActiveType('preorder')}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={{
                    background: isPreorder ? 'white' : 'transparent',
                    color: isPreorder ? '#34c759' : '#86868b',
                    boxShadow: isPreorder ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                  }}
                >
                  <ShoppingCart className="w-4 h-4 flex-shrink-0" />
                  <span>Preventa · Stock Limitado</span>
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              {/* Banner */}
              <div
                className="rounded-2xl px-4 py-3 mb-5 flex items-start gap-3"
                style={{
                  background: isPreorder ? 'rgba(52,199,89,0.06)' : 'rgba(41,151,255,0.06)',
                  border: `1px solid ${isPreorder ? 'rgba(52,199,89,0.2)' : 'rgba(41,151,255,0.2)'}`,
                }}
              >
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: isPreorder ? 'rgba(52,199,89,0.15)' : 'rgba(41,151,255,0.15)' }}>
                  {isPreorder
                    ? <ShoppingCart className="w-4 h-4" style={{ color: '#34c759' }} />
                    : <Bell className="w-4 h-4" style={{ color: '#2997ff' }} />}
                </div>
                <div>
                  <p className="text-sm font-semibold mb-0.5" style={{ color: '#1d1d1f' }}>
                    {isPreorder ? 'Aparta con $1.000.000 COP' : 'Promoción especial · Gratis'}
                  </p>
                  <p className="text-xs" style={{ color: '#86868b', lineHeight: 1.5 }}>
                    {isPreorder
                      ? 'Te contactamos por WhatsApp para coordinar tu pago de separación.'
                      : 'Te avisamos con una promoción exclusiva cuando llegue a Colombia.'}
                  </p>
                </div>
              </div>

              {/* Fields */}
              <div className="space-y-3">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#1d1d1f', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Nombre completo *</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#86868b' }} />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: Juan Gómez"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none"
                      style={{ background: 'rgba(0,0,0,0.03)', border: `1.5px solid ${errors.name ? '#ff3b30' : 'rgba(0,0,0,0.08)'}`, color: '#1d1d1f' }} />
                  </div>
                  {errors.name && <p className="text-xs mt-1" style={{ color: '#ff3b30' }}>{errors.name}</p>}
                </div>
                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#1d1d1f', letterSpacing: '0.06em', textTransform: 'uppercase' }}>WhatsApp / Teléfono *</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#86868b' }} />
                    <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Ej: 300 123 4567"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none"
                      style={{ background: 'rgba(0,0,0,0.03)', border: `1.5px solid ${errors.phone ? '#ff3b30' : 'rgba(0,0,0,0.08)'}`, color: '#1d1d1f' }} />
                  </div>
                  {errors.phone && <p className="text-xs mt-1" style={{ color: '#ff3b30' }}>{errors.phone}</p>}
                </div>
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: '#1d1d1f', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Correo electrónico <span style={{ color: '#86868b', fontWeight: 400, textTransform: 'none' }}>(opcional)</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#86868b' }} />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none"
                      style={{ background: 'rgba(0,0,0,0.03)', border: `1.5px solid ${errors.email ? '#ff3b30' : 'rgba(0,0,0,0.08)'}`, color: '#1d1d1f' }} />
                  </div>
                  {errors.email && <p className="text-xs mt-1" style={{ color: '#ff3b30' }}>{errors.email}</p>}
                </div>
                {/* Color */}
                <div>
                  <label className="block text-xs font-semibold mb-2" style={{ color: '#1d1d1f', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Color preferido</label>
                  <div className="flex gap-2 flex-wrap">
                    {[
                      { name: 'Silver', bg: '#E0E0E0', border: '#bdbdbd' },
                      { name: 'Blush', bg: '#F8BBD9', border: '#f48fb1' },
                      { name: 'Citrus', bg: '#F5D547', border: '#e8b820' },
                      { name: 'Indigo', bg: '#9FA8DA', border: '#7986cb' },
                    ].map((c) => (
                      <button key={c.name} onClick={() => setColor(color === c.name ? '' : c.name)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                        style={{
                          background: color === c.name ? c.bg : 'rgba(0,0,0,0.03)',
                          border: `1.5px solid ${color === c.name ? c.border : 'rgba(0,0,0,0.08)'}`,
                          color: '#1d1d1f',
                          transform: color === c.name ? 'scale(1.04)' : 'scale(1)',
                        }}>
                        <span className="w-3 h-3 rounded-full" style={{ background: c.bg, border: `1px solid ${c.border}`, display: 'inline-block' }} />
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Model (preorder only) */}
                {isPreorder && (
                  <div>
                    <label className="block text-xs font-semibold mb-2" style={{ color: '#1d1d1f', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Modelo</label>
                    <div className="flex gap-2">
                      {['Neo 256 GB · ~$3M', 'Neo 512 GB · ~$4M'].map((m, i) => {
                        const val = i === 0 ? 'MacBook Neo 256GB' : 'MacBook Neo 512GB';
                        return (
                          <button key={m} onClick={() => setModel(model === val ? '' : val)}
                            className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all text-center"
                            style={{
                              background: model === val ? 'rgba(52,199,89,0.08)' : 'rgba(0,0,0,0.03)',
                              border: `1.5px solid ${model === val ? '#34c759' : 'rgba(0,0,0,0.08)'}`,
                              color: model === val ? '#34c759' : '#1d1d1f',
                            }}>
                            {m}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="w-full mt-5 py-4 rounded-2xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: isPreorder
                    ? 'linear-gradient(135deg, #25d366, #128C7E)'
                    : 'linear-gradient(135deg, #2997ff, #0071e3)',
                  boxShadow: isPreorder
                    ? '0 6px 24px rgba(37,211,102,0.35)'
                    : '0 6px 24px rgba(41,151,255,0.35)',
                }}
              >
                <MessageCircle className="w-5 h-5" />
                {isPreorder ? 'Apartar por WhatsApp · $1.000.000' : 'Recibir notificación · Gratis'}
                <ChevronRight className="w-5 h-5" />
              </button>

              <p className="text-center text-xs mt-3" style={{ color: '#86868b' }}>
                Te respondemos en menos de 30 min · 312 311 8389
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
