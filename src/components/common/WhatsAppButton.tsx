import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "919344527595";
  const defaultMessage = "Hello SKV Clinic, I would like to book an appointment.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 sm:bottom-8 sm:right-8 group flex items-center">
      
      {/* --- Hover Tooltip (Desktop Only) --- */}
      <span className="absolute right-full mr-4 w-max rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-lg ring-1 ring-black/5 opacity-0 transition-all duration-300 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none hidden sm:block">
        Chat with us
        {/* Tooltip Arrow */}
        <span className="absolute top-1/2 -right-1.5 -mt-1.5 h-3 w-3 rotate-45 bg-white border-r border-t border-black/5"></span>
      </span>

      {/* --- Main Button --- */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        // Pure solid WhatsApp green with a very soft, premium shadow
        className="relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_0_rgba(37,211,102,0.39)] transition-all duration-300 hover:bg-[#20ba56] hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(37,211,102,0.23)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/40 active:scale-95"
      >
        <FaWhatsapp className="text-3xl sm:text-[34px] transition-transform duration-300 group-hover:scale-110" />
      </a>
      
    </div>
  );
};

export default WhatsAppButton;