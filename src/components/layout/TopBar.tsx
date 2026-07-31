import { FiPhone, FiMail, FiClock } from "react-icons/fi";
import Container from "../common/Container";
import { clinicInfo } from "../../constants/clinic";

function TopBar() {
  // Deep Emerald Green Background with a subtle bottom border
  return (
    <div className="bg-[#153C33] text-[#F8F6F0] text-[13px] font-medium tracking-wide border-b border-white/10">
      <Container>
        <div className="flex h-10 md:h-12 items-center justify-between">
          
          {/* Left Side: Contact Information */}
          <div className="flex items-center gap-5 md:gap-8">
            {/* Clickable Phone Link */}
            <a
              href={`tel:${clinicInfo.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 hover:text-[#B89361] focus:text-[#B89361] transition-colors duration-300 outline-none group"
              aria-label="Call the clinic"
            >
              <FiPhone className="text-[#B89361] group-hover:scale-110 transition-transform" size={14} />
              <span>{clinicInfo.phone}</span>
            </a>

            {/* Clickable Email Link (Hidden on very small screens) */}
            <a
              href={`mailto:${clinicInfo.email}`}
              className="hidden sm:flex items-center gap-2 hover:text-[#B89361] focus:text-[#B89361] transition-colors duration-300 outline-none group"
              aria-label="Email the clinic"
            >
              <FiMail className="text-[#B89361] group-hover:scale-110 transition-transform" size={14} />
              <span>{clinicInfo.email}</span>
            </a>
          </div>

          {/* Right Side: Working Hours & Extras */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-white/90">
              <FiClock className="text-[#B89361]" size={14} />
              <span>{clinicInfo.workingHours}</span>
            </div>
            
            {/* Optional: Emergency Highlight separated by a subtle line */}
            <div className="hidden lg:flex items-center gap-2 pl-6 border-l border-white/20">
              <span className="text-[#B89361] font-semibold">Emergency:</span>
              <span>24/7 Available</span>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}

export default TopBar;