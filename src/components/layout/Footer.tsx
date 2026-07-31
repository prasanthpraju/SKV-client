import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowUp,
  FaLinkedin,
  FaHeart // <-- Added Heart Icon
} from "react-icons/fa";
// import logo from "../../assets/images/logo.png";

// 1. Define the TypeScript interface for your links
interface QuickLink {
  name: string;
  path: string;
}

// 2. Apply the interface to your array
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

  // Function to manually scroll to the top for the "Back to Top" button
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-primary text-white relative">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        
        {/* Clinic Info */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center gap-3">
            {/* <img
              src={logo}
              alt="SKV Clinic Logo"
              className="h-14 w-14 rounded-full bg-white p-1 object-cover"
              loading="lazy"
            /> */}
            <div>
              <h2 className="text-2xl font-bold tracking-wide">SKV Clinic</h2>
              <p className="text-sm font-medium text-gray-300">
                Care • Compassion • Commitment
              </p>
            </div>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Providing trusted and compassionate healthcare with experienced doctors and modern medical facilities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-xl font-semibold relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-1/2 after:bg-secondary">
            Quick Links
          </h3>
          <ul className="space-y-3">
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
        <div>
          <h3 className="mb-5 text-xl font-semibold relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-1/2 after:bg-secondary">
            Contact
          </h3>
          <div className="space-y-4 text-gray-200">
            {/* Clickable Phone Link */}
            <a 
              href="tel:+918300384823" 
              className="flex items-start gap-3 transition-colors duration-300 hover:text-secondary group"
            >
              <FaPhoneAlt className="mt-1 text-secondary group-hover:animate-pulse" />
              <span>+91 8300 384 823</span>
            </a>

            {/* Clickable Email Link */}
            <a 
              href="mailto:skvclinicktg@gmail.com" 
              className="flex items-start gap-3 transition-colors duration-300 hover:text-secondary group"
            >
              <FaEnvelope className="mt-1 text-secondary" />
              <span>skvclinicktg@gmail.com</span>
            </a>

            {/* Address */}
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 text-secondary shrink-0" />
              <span>
                31/34 Main Bazaar,<br />
                Kotagiri - 643217
              </span>
            </div>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="mb-5 text-xl font-semibold relative inline-block after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-1/2 after:bg-secondary">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="rounded-full bg-white p-3 text-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-secondary hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="rounded-full bg-white p-3 text-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-secondary hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://wa.me/918300384823"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="WhatsApp"
              className="rounded-full bg-white p-3 text-primary shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-secondary hover:text-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright, Developer & Back to Top Footer */}
      <div className="border-t border-white/20 bg-black/10 py-6 px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-gray-300 md:flex-row">
          
          {/* Left: Copyright */}
          <p className="text-center md:text-left">
            © {currentYear} SKV Clinic. All Rights Reserved.
          </p>
          
          {/* Center: Developer Credit with Heart */}
          <div className="flex items-center gap-1.5 text-[15px]">
            <span>Designed & Developed with</span>
            <FaHeart className="text-red-500 animate-pulse" size={16} />
            <span>by</span>
            <a
              href="https://www.linkedin.com/in/prasanth-j-7a8985304"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 ml-1 text-secondary hover:text-white hover:underline transition-all duration-300 font-semibold tracking-wide"
            >
              <FaLinkedin size={18} />
              <span>Prasanth</span>
            </a>
          </div>
          
          {/* Right: Back to Top Button */}
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-secondary transition-colors duration-300 focus:outline-none"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <FaArrowUp className="text-secondary" />
          </button>

        </div>
      </div>
    </footer>
  );
}

export default Footer;