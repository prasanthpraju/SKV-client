import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "919344527595";
  const defaultMessage = "Hello SKV Clinic, I would like to book an appointment.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[999] sm:bottom-8 sm:right-8 group flex items-center justify-center">
      
      {/* --- Premium Hover Tooltip (Desktop Only) --- */}
      <div className="absolute right-full mr-5 w-max translate-x-4 opacity-0 pointer-events-none transition-all duration-400 ease-out group-hover:opacity-100 group-hover:translate-x-0 hidden sm:block">
        <div className="relative flex items-center gap-2.5 rounded-2xl bg-white px-5 py-3 shadow-lg ring-1 ring-black/5">
          {/* Pulsing "Online" Indicator */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
          </span>
          
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-gray-800 tracking-wide">
              Need assistance?
            </span>
            <span className="text-[11px] font-medium text-gray-500 tracking-wider uppercase">
              Chat with our care team
            </span>
          </div>

          {/* Elegant Tooltip Arrow */}
          <div className="absolute top-1/2 -right-2 -mt-2 h-4 w-4 rotate-45 rounded-sm bg-white border-r border-t border-black/5"></div>
        </div>
      </div>

      {/* --- Ambient Pulse Ring (Behind Button) --- */}
      <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-20 group-hover:animate-ping transition-all duration-500"></div>

      {/* --- Main Action Button --- */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="relative flex h-14 w-14 sm:h-[68px] sm:w-[68px] items-center justify-center rounded-full bg-gradient-to-tr from-[#20ba56] to-[#25D366] text-white shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 active:scale-95"
      >
        <FaWhatsapp className="text-3xl sm:text-[38px] drop-shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
      </a>
      
    </div>
  );
};

export default WhatsAppButton;