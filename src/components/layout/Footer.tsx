import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
  FaLinkedin,
  FaHeart
} from "react-icons/fa";

interface QuickLink {
  name: string;
  path: string;
}

const QUICK_LINKS: QuickLink[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Doctors", path: "/doctors" },
  { name: "Services", path: "/services" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-primary text-white relative border-t border-primary/20">
      {/* Main Footer Content - Premium Spacious Grid */}
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-20 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        
        {/* Clinic Info */}
        <div className="flex flex-col space-y-4 text-center sm:text-left items-center sm:items-start lg:col-span-4 lg:pr-10">
          <div>
            {/* Original Bold Font */}
            <h2 className="text-2xl font-bold tracking-wide">SKV Clinic</h2>
            <p className="text-sm font-medium text-gray-300 mt-1">
              Care • Compassion • Commitment
            </p>
          </div>
          <p className="text-gray-300 leading-relaxed max-w-sm mt-2">
            Providing trusted and compassionate healthcare with experienced doctors, modern medical facilities, and a dedication to your well-being.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left lg:col-span-2 lg:col-start-6">
          {/* Original Header with Border/Underline */}
          <h3 className="mb-6 text-xl font-semibold relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-1/2 sm:after:left-0 after:-translate-x-1/2 sm:after:translate-x-0 after:h-[2px] after:w-1/2 after:bg-secondary">
            Quick Links
          </h3>
          <ul className="space-y-4">
            {QUICK_LINKS.map((link: QuickLink) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="inline-block text-gray-200 transition-all duration-300 hover:text-secondary hover:translate-x-1 focus:text-secondary focus:outline-none"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center sm:text-left flex flex-col items-center sm:items-start lg:col-span-3">
          <h3 className="mb-6 text-xl font-semibold relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-1/2 sm:after:left-0 after:-translate-x-1/2 sm:after:translate-x-0 after:h-[2px] after:w-1/2 after:bg-secondary">
            Contact
          </h3>
          <div className="space-y-5 text-gray-200 flex flex-col items-center sm:items-start">
            <a 
              href="tel:+918300384823" 
              className="flex items-center gap-4 transition-colors duration-300 hover:text-secondary group"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 group-hover:border-secondary/50 transition-colors">
                <FaPhoneAlt size={12} className="text-secondary group-hover:animate-pulse" />
              </span>
              <span className="tracking-wide">+91 8300 384 823</span>
            </a>

            <a 
              href="mailto:skvclinicktg@gmail.com" 
              className="flex items-center gap-4 transition-colors duration-300 hover:text-secondary group"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 group-hover:border-secondary/50 transition-colors">
                <FaEnvelope size={12} className="text-secondary" />
              </span>
              <span className="tracking-wide">skvclinicktg@gmail.com</span>
            </a>

            <div className="flex items-start gap-4 text-left group">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors mt-1">
                <FaMapMarkerAlt size={12} className="text-secondary" />
              </span>
              <span className="leading-relaxed tracking-wide pt-1">
                31/34 Main Bazaar,<br />
                Kotagiri - 643217
              </span>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="text-center sm:text-left flex flex-col items-center sm:items-start lg:col-span-3 lg:items-end">
          <h3 className="mb-6 text-xl font-semibold relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-1/2 sm:after:left-0 after:-translate-x-1/2 sm:after:translate-x-0 after:h-[2px] after:w-1/2 after:bg-secondary">
            Follow Us
          </h3>
          <div className="flex gap-3 justify-center sm:justify-start">
            <a
              href="https://www.instagram.com/skvclinic?utm_source=qr&stkn=ZnRrcXZmaGJxbG9i"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Instagram"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-transparent text-white transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:text-secondary hover:shadow-[0_0_15px_rgba(184,147,97,0.2)]"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://wa.me/918300384823"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="WhatsApp"
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-transparent text-white transition-all duration-300 hover:-translate-y-1 hover:border-secondary hover:text-secondary hover:shadow-[0_0_15px_rgba(184,147,97,0.2)]"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Elegant Divider */}
      <div className="w-full px-6">
        <div className="mx-auto max-w-[1400px] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      {/* Copyright & Developer Bar */}
      <div className="py-6 px-6 bg-black/10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-6 text-sm text-gray-300 md:flex-row">
          
          {/* Left: Copyright */}
          <p className="text-center md:text-left order-3 md:order-1">
            © {currentYear} SKV Clinic. All Rights Reserved.
          </p>
          
          {/* Center: Developer Credit */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 order-2 text-center">
            <span>Designed & Developed with</span>
            <FaHeart className="text-red-500 animate-pulse mx-1" size={14} />
            <span>by</span>
            <a
              href="https://www.linkedin.com/in/prasanth-j-7a8985304"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 ml-1 text-gray-200 hover:text-secondary hover:underline transition-all duration-300 font-medium tracking-wide"
            >
              <FaLinkedin size={16} />
              <span>Prasanth</span>
            </a>
          </div>
          
          {/* Right: Back to Top Button */}
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-2 hover:text-secondary transition-colors duration-300 focus:outline-none order-1 md:order-3 bg-white/5 md:bg-transparent px-4 py-2 md:p-0 rounded-full md:rounded-none"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/20 md:border-transparent md:bg-white/10 group-hover:bg-secondary/20 group-hover:border-secondary/30 transition-all">
              <FaArrowUp size={12} className="text-secondary" />
            </span>
          </button>

        </div>
      </div>
    </footer>
  );
}

export default Footer;