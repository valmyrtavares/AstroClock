'use client';

import React from 'react';
import { X, Star, Mail, MessageCircle, ExternalLink } from 'lucide-react';

interface AuthorCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthorCard({ isOpen, onClose }: AuthorCardProps) {
  const [isClosing, setIsClosing] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleClose = React.useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 220);
  }, [onClose]);

  // Close on Escape key
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, handleClose]);

  // Close on click outside
  React.useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };
    // Delay to avoid immediate close from the same click that opened it
    const timer = setTimeout(() => {
      window.addEventListener('mousedown', handleClick);
    }, 100);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, handleClose]);

  if (!isOpen && !isClosing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm ${isClosing ? 'overlay-exit' : 'overlay-enter'}`}
        onClick={handleClose}
      />

      {/* Card */}
      <div
        ref={cardRef}
        className={`relative z-10 w-[90vw] max-w-sm rounded-2xl overflow-hidden ${isClosing ? 'overlay-exit' : 'card-enter'}`}
        style={{
          background: 'rgba(10, 6, 22, 0.92)',
          backdropFilter: 'blur(24px) saturate(140%)',
          border: '1px solid rgba(251, 191, 36, 0.15)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(251, 191, 36, 0.05), inset 0 1px 0 rgba(251, 191, 36, 0.1)',
        }}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-gradient-to-r from-amber-500/60 via-purple-500/40 to-pink-500/60" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-purple-100 transition-all duration-200 border border-purple-500/10 hover:border-purple-500/30"
          aria-label="Fechar"
        >
          <X size={14} />
        </button>

        {/* Content */}
        <div className="px-6 pt-6 pb-5">
          {/* Author avatar area */}
          <div className="flex items-center space-x-4 mb-5">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold font-outfit shadow-lg"
              style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(139, 92, 246, 0.2))',
                border: '1px solid rgba(251, 191, 36, 0.2)',
                boxShadow: '0 0 20px rgba(251, 191, 36, 0.1)',
                color: '#fbbf24',
              }}
            >
              VT
            </div>
            <div>
              <h3 className="text-lg font-bold font-outfit tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200">
                Valmyr Tavares
              </h3>
              <p className="text-[11px] text-purple-400 font-medium tracking-wide">
                Astrólogo • Desenvolvedor
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-5 p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/10">
            <p className="text-[12.5px] text-purple-300/90 leading-[1.7]">
              Idealizador e desenvolvedor do AstroClock. Unindo tecnologia de ponta e tradição astrológica para oferecer 
              ferramentas de precisão astronômica acessíveis a todos os interessados na linguagem dos astros.
            </p>
          </div>

          {/* Contact links */}
          <div className="space-y-2">
            <a
              href="mailto:contato@valmyrtavares.com"
              className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl bg-purple-500/5 hover:bg-purple-500/10 border border-purple-500/10 hover:border-purple-500/20 transition-all duration-200 group"
            >
              <Mail size={15} className="text-purple-400 group-hover:text-purple-300" />
              <span className="text-xs text-purple-300 group-hover:text-purple-200 transition-colors font-medium">
                contato@valmyrtavares.com
              </span>
            </a>

            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 px-3.5 py-2.5 rounded-xl bg-purple-500/5 hover:bg-emerald-500/10 border border-purple-500/10 hover:border-emerald-500/20 transition-all duration-200 group"
            >
              <MessageCircle size={15} className="text-emerald-400 group-hover:text-emerald-300" />
              <span className="text-xs text-purple-300 group-hover:text-emerald-200 transition-colors font-medium">
                WhatsApp
              </span>
            </a>

            <a
              href="#"
              className="flex items-center justify-center space-x-2 mt-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all duration-300 group"
              style={{
                background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(139, 92, 246, 0.15))',
                border: '1px solid rgba(251, 191, 36, 0.2)',
              }}
            >
              <Star size={13} className="text-amber-400 group-hover:text-amber-300" />
              <span className="text-amber-200 group-hover:text-amber-100 transition-colors">
                Consultas & Serviços
              </span>
              <ExternalLink size={11} className="text-amber-400/60" />
            </a>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="px-6 py-3 border-t border-purple-500/10">
          <p className="text-[9px] text-purple-500 text-center tracking-wider uppercase">
            ✦ Astrologia • Tecnologia • Precisão ✦
          </p>
        </div>
      </div>
    </div>
  );
}
