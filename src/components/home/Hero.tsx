import React, { useState } from "react";
import { 
  FiPhoneCall, 
  FiActivity, 
  FiMapPin, 
  FiClock, 
  FiHeart,
  FiFileText,
  FiShield
} from "react-icons/fi";

// Importing your actual doctor image based on your VS Code folder structure
import doctorImg from "../../assets/images/about.jpeg";

// Define the interface for the facilities array
interface Facility {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const facilities: Facility[] = [
  { id: "consultation", name: "General & Ortho", icon: <FiShield className="text-2xl mb-3 text-[#B89361]" /> },
  { id: "lab", name: "Advanced Lab", icon: <FiFileText className="text-2xl mb-3 text-[#B89361]" /> },
  { id: "ecg", name: "ECG Facility", icon: <FiActivity className="text-2xl mb-3 text-[#B89361]" /> },
  { id: "master", name: "Master Checkup", icon: <FiHeart className="text-2xl mb-3 text-[#B89361]" /> }
];

const Hero: React.FC = () => {
  // Strongly type the state as a string
  const [activeFacility, setActiveFacility] = useState<string>(facilities[0].id);

  return (
    // Reduced padding-top to bring it closer to the navbar
    <section className="relative min-h-[85vh] bg-[#F8F6F0] flex flex-col justify-start pt-6 pb-16 px-4 sm:px-6 lg:px-8 z-0">
      
      {/* Ambient Background Glows */}
      <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#153C33]/5 blur-[100px] animate-[pulse_8s_ease-in-out_infinite]" />
      </div>

      <div className="container mx-auto max-w-[1400px]">
        {/* Continuous 24/7 Marquee Bar - Reduced bottom margin */}
        <div className="w-full bg-[#153C33] rounded-2xl overflow-hidden mb-5 flex items-center h-12 shadow-sm border border-[#153C33]/20">
          <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite] items-center text-[#B89361] font-bold text-sm tracking-widest uppercase">
            <span className="mx-8 flex items-center gap-2"><FiClock /> 24 HOURS / 7 DAYS SERVICE</span> • 
            <span className="mx-8 flex items-center gap-2"><FiActivity /> IN-HOUSE PHARMACY</span> • 
            <span className="mx-8 flex items-center gap-2"><FiHeart /> MASTER HEALTH CHECKUP</span> • 
            <span className="mx-8 flex items-center gap-2"><FiClock /> 24 HOURS / 7 DAYS SERVICE</span> • 
            <span className="mx-8 flex items-center gap-2"><FiActivity /> IN-HOUSE PHARMACY</span> • 
            <span className="mx-8 flex items-center gap-2"><FiHeart /> MASTER HEALTH CHECKUP</span> •
          </div>
        </div>

        {/* Tighter Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(180px,auto)] gap-5">
          
          {/* --- BENTO 1: Main Hero Typography (Spans 7 cols) --- */}
          <div className="md:col-span-12 lg:col-span-7 row-span-2 bg-white/70 backdrop-blur-md border border-white rounded-[2rem] p-8 md:p-12 shadow-sm flex flex-col justify-center relative overflow-hidden group">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F8F6F0] rounded-full border border-[#153C33]/10 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#153C33] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#153C33]"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#153C33]">
                  Now Open in Kotagiri
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-black text-[#153C33] tracking-tighter leading-[1.05]">
                SKV Clinic. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B89361] to-[#8C6D41]">
                  Your Health, Our Priority.
                </span>
              </h1>
              
              <p className="mt-6 text-lg font-medium text-[#153C33]/70 max-w-lg leading-relaxed">
                Comprehensive care for your entire family. Equipped with advanced ECG, fully-featured diagnostic labs, and dedicated specialists.
              </p>

            </div>
          </div>

          {/* --- BENTO 2: Your Doctor Image with Floating Badge (Spans 5 cols) --- */}
          <div className="md:col-span-12 lg:col-span-5 row-span-2 rounded-[2rem] relative overflow-hidden shadow-md min-h-[350px] bg-[#153C33] group">
            <img 
              src={doctorImg} 
              alt="SKV Clinic Doctor"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[3s] group-hover:scale-105"
            />
            
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#153C33]/90 via-[#153C33]/40 to-transparent" />
          </div>

          {/* --- BENTO 3: Modern Care - Solid Background (Spans 4 cols) --- */}
          <div className="md:col-span-12 lg:col-span-4 bg-[#153C33] rounded-[2rem] p-8 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[220px]">
            <div className="bg-white/10 backdrop-blur-md w-fit px-3 py-1.5 rounded-lg mb-4 border border-white/10 flex items-center gap-2">
              <FiMapPin className="text-[#B89361]" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">Main Bazzar, Kotagiri</span>
            </div>
            
            <div className="mt-auto">
              <h3 className="text-3xl font-black leading-tight text-white mb-2">Modern Care,<br/><span className="text-[#B89361]">Rooted in Trust.</span></h3>
              <p className="text-white/70 text-sm font-medium">PIN - 643217</p>
            </div>
          </div>

          {/* --- BENTO 4: Clean Facility Icons (Spans 5 cols) --- */}
          <div className="md:col-span-12 lg:col-span-5 bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm flex flex-col justify-center">
             <div className="flex justify-between items-center mb-6 px-2">
              <h4 className="font-bold text-[#153C33]">Core Facilities</h4>
              <span className="text-xs font-bold text-[#153C33]/50 uppercase tracking-widest">In-House</span>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {facilities.map((facility) => (
                <button
                  key={facility.id}
                  onClick={() => setActiveFacility(facility.id)}
                  className={`flex flex-col items-center justify-center text-center p-3 rounded-2xl transition-all duration-300 ${
                    activeFacility === facility.id
                      ? "bg-[#F8F6F0] shadow-inner scale-95 border border-[#153C33]/10"
                      : "bg-white hover:bg-[#F8F6F0]/50"
                  }`}
                >
                  {facility.icon}
                  <span className={`text-[11px] font-bold mt-1 ${activeFacility === facility.id ? "text-[#153C33]" : "text-[#153C33]/60"}`}>
                    {facility.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* --- BENTO 5: Contact / Help Desk (Spans 3 cols) --- */}
          <div className="md:col-span-12 lg:col-span-3 bg-gradient-to-br from-[#B89361] to-[#8C6D41] rounded-[2rem] p-6 shadow-md flex flex-col justify-between text-white relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 opacity-10 transform group-hover:-rotate-12 transition-transform duration-500">
              <FiPhoneCall className="text-8xl" />
            </div>
            
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-1 text-white">Need Assistance?</h3>
              <p className="text-white/80 text-xs">Reach out to our help desk</p>
            </div>
            
            <div className="relative z-10 mt-6 space-y-2">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                <span className="text-xs font-medium text-white/80">Primary</span>
                <span className="font-black text-sm tracking-wide">93445 27595</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 flex items-center justify-between">
                <span className="text-xs font-medium text-white/80">Secondary</span>
                <span className="font-black text-sm tracking-wide">83003 84823</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
};

export default Hero;