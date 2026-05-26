'use client';

import React from 'react';
import { X, Star, Mail, MessageCircle, ExternalLink, Check } from 'lucide-react';

interface AuthorCardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthorCard({ isOpen, onClose }: AuthorCardProps) {
  const [isClosing, setIsClosing] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleEmailClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const email = "valmyrtavares@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar o email", err);
    }
    // Tenta abrir o cliente de email também
    window.location.href = `mailto:${email}`;
  };

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
          {/* Bio */}
          <div className="mb-4 p-3.5 rounded-xl bg-purple-500/5 border border-purple-500/10">
            <p className="text-[12.5px] text-purple-300/90 leading-[1.7]">
              Idealizador e desenvolvedor do AstroClock. Unindo tecnologia de ponta e tradição astrológica para oferecer 
              ferramentas de precisão astronômica acessíveis a todos os interessados na linguagem dos astros.
            </p>
          </div>

          {/* Contact links */}
          <div className="flex items-center gap-2 mb-4">
            <a
              href="mailto:valmyrtavares@gmail.com"
              onClick={handleEmailClick}
              className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-xl transition-all duration-200 group ${
                copied 
                  ? 'bg-emerald-500/10 border-emerald-500/20' 
                  : 'bg-purple-500/5 hover:bg-purple-500/10 border-purple-500/10 hover:border-purple-500/20 border'
              }`}
            >
              {copied ? (
                <Check size={14} className="text-emerald-400" />
              ) : (
                <Mail size={14} className="text-purple-400 group-hover:text-purple-300" />
              )}
              <span className={`text-[11px] font-medium transition-colors ${
                copied ? 'text-emerald-300' : 'text-purple-300 group-hover:text-purple-200'
              }`}>
                {copied ? 'Copiado!' : 'Email'}
              </span>
            </a>

            <a
              href="https://wa.me/5511970741310"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-xl bg-purple-500/5 hover:bg-emerald-500/10 border border-purple-500/10 hover:border-emerald-500/20 transition-all duration-200 group"
            >
              <MessageCircle size={14} className="text-emerald-400 group-hover:text-emerald-300" />
              <span className="text-[11px] text-purple-300 group-hover:text-emerald-200 transition-colors font-medium">
                WhatsApp
              </span>
            </a>
          </div>

          {/* Software Development Services */}
          <div className="p-4 rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-purple-500/5 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
            
            <h4 className="text-[13px] font-bold text-amber-300 mb-2 flex items-center gap-1.5 uppercase tracking-wide">
              <Star size={14} className="text-amber-400" />
              Serviços e Orçamentos
            </h4>
            
            <p className="text-[11.5px] text-amber-100/80 leading-[1.6] mb-4">
              Desenvolvemos sites, aplicativos, landing pages, controle de estoque, ERPs, e todo tipo de solução que você precisa e não sabe para quem pedir. Entre em contato e vamos conversar!
            </p>
            
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/5511970741310?text=Olá! Gostaria de falar sobre um projeto de desenvolvimento."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 hover:border-amber-400/50 text-amber-200 shadow-lg shadow-amber-500/10"
              >
                <MessageCircle size={14} />
                <span>Solicitar Orçamento</span>
              </a>
              
              <a
                href="https://valmyrtavares.github.io/cv-portifolio/#/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all duration-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-400/40 text-purple-200"
              >
                <ExternalLink size={13} />
                <span>Acessar Meu Portfólio</span>
              </a>
            </div>
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
