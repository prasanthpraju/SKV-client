import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Container from "../common/Container";

import logo from "../../assets/images/skv-logo.jpeg"; 
import { navItems } from "../../constants/navigation";

export interface NavItem {
  label: string;
  path: string;
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`sticky top-0 z-40 bg-[#F8F6F0] transition-all duration-300 ${
          isScrolled ? "shadow-md py-0" : "py-1"
        }`}
      >
        <Container>
          <div className="flex h-20 md:h-24 items-center justify-between gap-4">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src={logo}
                alt="SKV Clinic Logo"
                className="h-14 w-auto md:h-16 lg:h-20 object-contain transition-transform duration-300 hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden xl:flex items-center justify-center gap-8 2xl:gap-10 flex-1">
              {navItems
                /* Filter out the Book Appointment text link on desktop */
                .filter((item) => item.path !== "/book-appointment")
                .map((item: NavItem) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `relative text-[15px] 2xl:text-[16px] font-medium transition-colors duration-300 py-2 whitespace-nowrap ${
                        isActive
                          ? "text-[#153C33]"
                          : "text-[#2D3734] hover:text-[#B89361]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        <span
                          className={`absolute bottom-0 left-0 h-[2px] bg-[#B89361] transition-all duration-300 ${
                            isActive ? "w-full" : "w-0"
                          }`}
                        ></span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Single Book Appointment Button - Desktop Only */}
            <div className="hidden xl:block shrink-0">
              <Link
                to="/book-appointment"
                className="inline-flex items-center justify-center rounded-md bg-[#153C33] px-7 py-2.5 text-[15px] font-medium text-[#F8F6F0] shadow-sm transition-all duration-300 hover:bg-[#B89361] hover:shadow-md hover:-translate-y-0.5 whitespace-nowrap"
              >
                Book Appointment
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className="xl:hidden p-2 text-[#153C33] hover:text-[#B89361] transition-colors outline-none shrink-0 ml-auto"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Menu"
            >
              <FiMenu size={28} />
            </button>
          </div>
        </Container>
      </nav>

      {/* --- Mobile Menu Drawer Background --- */}
      <div
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 xl:hidden ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* --- Mobile Menu Drawer --- */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#F8F6F0] z-50 shadow-2xl transform transition-transform duration-300 ease-in-out xl:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#153C33]/10">
          <span className="text-lg font-bold text-[#153C33]">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-[#153C33] hover:text-[#B89361] transition-colors rounded-full bg-white shadow-sm"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-2">
          {/* Note: In mobile view, we DON'T filter it out, so it appears normally in the list */}
          {navItems.map((item: NavItem) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-[16px] font-medium transition-all ${
                  isActive
                    ? "bg-[#153C33]/10 text-[#153C33] border-l-4 border-[#B89361]"
                    : "text-[#2D3734] hover:bg-white hover:text-[#B89361]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;