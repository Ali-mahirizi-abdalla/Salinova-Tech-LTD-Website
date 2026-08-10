import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const WHATSAPP_NUMBER = '254750168458';
  const MESSAGE = encodeURIComponent('Hello! I found Salinova Tech LTD online and would like to learn more about your services.');

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with us on WhatsApp"
        className="flex items-center justify-center w-14 h-14 bg-green-500 hover:bg-green-400 text-text rounded-full shadow-[0_4px_20px_rgba(34,197,94,0.5)] hover:shadow-[0_4px_30px_rgba(34,197,94,0.8)] transition-all duration-300 hover:scale-110"
        style={{ animation: 'whatsappPulse 2.5s ease-in-out infinite' }}
      >
        <FaWhatsapp size={28} />
      </a>
      <style>{`
        @keyframes whatsappPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(34,197,94,0.5); }
          50% { box-shadow: 0 4px 35px rgba(34,197,94,0.85), 0 0 0 8px rgba(34,197,94,0.15); }
        }
      `}</style>
    </div>
  );
};
