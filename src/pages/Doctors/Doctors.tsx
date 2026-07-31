import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  FaLinkedinIn,
  FaTwitter,
  FaEnvelope,
  FaCheckCircle,
  FaCrown,
  FaQuoteLeft,
} from "react-icons/fa";

// Interface updated to include optional CEO fields
interface Doctor {
  id: number;
  fullName: string;
  specialization: string;
  qualification?: string;
  experience?: number;
  imageUrl?: string;
  role?: string;
  quote?: string;
}

// Animation configurations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  },
};

function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [ceoData, setCeoData] = useState<Doctor | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/doctors");
        const allDoctors: Doctor[] = response.data.data;

        // Robust, Case-Insensitive CEO Extraction
        const ceo = allDoctors.find(
          (doctor) => (doctor.role || "").trim().toUpperCase() === "CEO"
        ) || null;
        
        // Filter out the CEO from the regular doctors list
        const regularDoctors = allDoctors.filter((doctor) => doctor.id !== ceo?.id);

        setCeoData(ceo);
        setDoctors(regularDoctors);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Safe JSON-LD generation
  const generateStructuredData = () => {
    const employeeData = doctors.map((doctor) => ({
      "@type": "Physician",
      name: doctor.fullName,
      medicalSpecialty: doctor.specialization,
      description: doctor.qualification,
      image: doctor.imageUrl
        ? `http://localhost:5000/uploads/doctors/${doctor.imageUrl}`
        : undefined,
    }));

    if (ceoData) {
      employeeData.unshift({
        "@type": "Physician",
        name: ceoData.fullName,
        // jobTitle: ceoData.role || "CEO",
        image: ceoData.imageUrl
          ? `http://localhost:5000/uploads/doctors/${ceoData.imageUrl}`
          : undefined,
        medicalSpecialty: ceoData.specialization,
        description: ceoData.qualification,
      });
    }

    return {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      name: "Our Medical Clinic",
      employee: employeeData,
    };
  };

  // Premium Skeleton Loader
  if (isLoading) {
    return (
      <section className="min-h-screen bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <div className="mx-auto h-6 w-40 rounded-full bg-slate-200 animate-pulse mb-6"></div>
            <div className="mx-auto h-16 w-full rounded-xl bg-slate-200 animate-pulse mb-6"></div>
            <div className="mx-auto h-4 w-3/4 rounded bg-slate-200 animate-pulse"></div>
          </div>
          <div className="h-[500px] w-full rounded-[2.5rem] bg-white shadow-sm border border-slate-100 animate-pulse mb-20"></div>
        </div>
      </section>
    );
  }

  return (
    <>
      <title>Meet Our Medical Experts | Your Clinic Name</title>
      <meta name="description" content="Meet our dedicated medical professionals providing world-class healthcare with a compassionate, patient-first approach." />
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>

      <section className="relative overflow-hidden bg-slate-50 py-24 sm:py-32 min-h-screen font-sans">
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent blur-3xl pointer-events-none -z-10"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          
          {/* ================= HERO SECTION ================= */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center mb-20"
          >
            <span className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-black uppercase tracking-[0.2em] text-primary shadow-md border border-primary/10">
              The Medical Team
            </span>
            <h2 className="mt-8 text-5xl font-black tracking-tighter text-slate-900 sm:text-6xl lg:text-7xl">
              Meet Our <span className="text-primary">Experts.</span>
            </h2>
            <p className="mt-6 text-xl leading-relaxed text-slate-600 font-medium">
              World-class healthcare driven by compassion. Experience patient-first treatment from our industry-leading specialists.
            </p>
          </motion.div>

          {/* ================= CEO SECTION (EDITORIAL STYLE) ================= */}
          {ceoData && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 relative group"
            >
              <div className="grid lg:grid-cols-12 items-stretch">
                
                {/* CEO Image - Left Side */}
                <div className="relative h-[400px] sm:h-[500px] lg:h-auto w-full lg:col-span-5 bg-slate-100 overflow-hidden">
                  <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10 group-hover:bg-transparent transition-colors duration-700"></div>
                  <img
                    src={
                      ceoData.imageUrl
                        ? `http://localhost:5000/uploads/doctors/${ceoData.imageUrl}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(ceoData.fullName)}&background=0D2A24&color=fff&size=512`
                    }
                    alt={ceoData.fullName}
                    className="absolute inset-0 h-full w-full object-cover object-top filter contrast-125 group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(ceoData.fullName)}&background=0D2A24&color=fff&size=512`;
                    }}
                  />
                </div>

                {/* CEO Content - Right Side */}
                <div className="relative p-8 sm:p-14 lg:col-span-7 lg:p-20 flex flex-col justify-center bg-white z-20">
                  <FaQuoteLeft className="absolute top-10 right-10 text-9xl text-slate-50 opacity-50 -z-10" />
                  
                  <div className="inline-flex items-center gap-3 mb-6">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-600">
                      <FaCrown size={14} />
                    </span>
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
                      {ceoData.role || "Chief Medical Officer"}
                    </p>
                  </div>
                  
                  <h3 className="mb-6 text-4xl font-black text-slate-900 sm:text-5xl lg:text-6xl tracking-tighter">
                    {ceoData.fullName}
                  </h3>

                  <blockquote className="mb-10">
                    <p className="text-2xl sm:text-3xl font-bold leading-snug text-primary tracking-tight">
                      "{ceoData.quote || "Our vision has always been to bring world-class healthcare to the heart of our community."}"
                    </p>
                  </blockquote>

                  {/* Static Credentials Array */}
                  <div className="mb-12 grid gap-5 sm:grid-cols-2">
                    {[
                      "MD in Internal Medicine",
                      "20+ Years of Medical Excellence",
                      "Ex-Director, Metro Health",
                      "Advanced Trauma Support",
                    ].map((credential, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <FaCheckCircle className="shrink-0 text-primary mt-1 text-lg" />
                        <span className="text-base font-bold text-slate-700">
                          {credential}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4 mt-auto border-t border-slate-100 pt-8">
                    <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition-all hover:bg-primary hover:text-white hover:-translate-y-1">
                      <FaLinkedinIn size={18} />
                    </a>
                    <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-slate-600 transition-all hover:bg-primary hover:text-white hover:-translate-y-1">
                      <FaTwitter size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= DOCTORS GRID ================= */}
          {doctors.length > 0 && (
            <div className="mt-32">
              <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between border-b-2 border-slate-200 pb-6">
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
                  Our Specialists
                </h3>
                <p className="text-slate-500 font-bold uppercase tracking-widest mt-4 md:mt-0">
                  {doctors.length} Experts Available
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {doctors.map((doctor) => (
                  <motion.div
                    key={doctor.id}
                    // variants={itemVariants}
                    className="group relative rounded-3xl bg-white p-4 shadow-lg shadow-slate-200/40 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-primary/20 border border-slate-100"
                  >
                    {/* Doctor Image */}
                    <div className="relative mb-6 aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100">
                      <img
                        src={
                          doctor.imageUrl
                            ? `http://localhost:5000/uploads/doctors/${doctor.imageUrl}`
                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.fullName)}&background=F1F5F9&color=64748B&size=512`
                        }
                        alt={`${doctor.fullName} - ${doctor.specialization}`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.fullName)}&background=F1F5F9&color=64748B&size=512`;
                        }}
                      />
                      
                      {/* Dark Gradient Overlay for Hover Info */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                      {/* Social Links Overlay */}
                      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0">
                        <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl transition-all hover:bg-primary hover:text-white hover:scale-110">
                          <FaLinkedinIn size={16} />
                        </a>
                        <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl transition-all hover:bg-primary hover:text-white hover:scale-110">
                          <FaEnvelope size={16} />
                        </a>
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="text-center px-4 pb-4">
                      <h3 className="mb-2 text-2xl font-black text-slate-900 tracking-tight transition-colors group-hover:text-primary">
                        {doctor.fullName}
                      </h3>
                      <p className="mb-4 inline-block rounded-lg bg-slate-100 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-slate-600">
                        {doctor.specialization}
                      </p>
                      <p className="text-sm font-bold leading-relaxed text-slate-500 line-clamp-2">
                        {doctor.qualification}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Doctors;