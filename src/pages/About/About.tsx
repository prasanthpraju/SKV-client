import React from 'react';
import { motion } from 'framer-motion';
import aboutImage from  "../../assets/images/about.jpeg"
import { 
  FiActivity, 
  FiHeart, 
  FiClock, 
  FiCheckCircle, 
  FiUserPlus,
  FiHome,
  FiTarget,
  FiEye,
} from 'react-icons/fi';

const About = () => {
  // Generate Schema.org JSON-LD for Search Engines
  const generateStructuredData = () => {
    return {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": "SKV Clinic",
      "description": "Located in the heart of Kotagiri, SKV Clinic provides quality healthcare with modern diagnostic facilities, expert consultations, and a patient-first approach.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kotagiri",
        "addressRegion": "Tamil Nadu"
      }
    };
  };

  return (
    <>
        <title>About Us | SKV Clinic</title>
        <meta 
          name="description" 
          content="Learn more about SKV Clinic in Kotagiri. We provide quality healthcare, modern diagnostics, and patient-first medical services designed around your family." 
        />
        <script type="application/ld+json">
          {JSON.stringify(generateStructuredData())}
        </script>

      <section className="relative overflow-hidden bg-white py-24 sm:py-32">
        {/* Subtle background gradient for depth */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-white to-white"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 space-y-24 lg:space-y-32">
          
          {/* ================= SECTION 1: Premium Editorial Layout ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left: Image & Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="group relative rounded-3xl overflow-hidden shadow-sm aspect-[4/5] w-full bg-gray-100">
                <img 
                  src={aboutImage} 
                  alt="SKV Clinic Facility" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col justify-center mt-12 lg:mt-0"
            >
              <span className="inline-flex items-center w-fit rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-secondary ring-1 ring-inset ring-secondary/20 mb-6">
                About SKV Clinic
              </span>
              
              <h2 className="text-3xl font-bold mb-6 text-primary sm:text-4xl tracking-tight">
                Healthcare designed around your family.
              </h2>
              
              <p className="text-lg leading-8 text-text/90 mb-10">
                Located in the heart of Kotagiri, SKV Clinic provides quality healthcare with modern diagnostic facilities, expert consultations, and a patient-first approach.
              </p>

              {/* Editorial Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                <div>
                  <h4 className="text-lg font-bold mb-2 flex items-center gap-2 text-primary">
                    <FiActivity className="text-secondary" /> Advanced Diagnostics
                  </h4>
                  <p className="text-text/80 text-sm">Modern laboratory & ECG facilities.</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 flex items-center gap-2 text-primary">
                    <FiUserPlus className="text-secondary" /> Expert Consultation
                  </h4>
                  <p className="text-text/80 text-sm">General & Orthopaedic care.</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 flex items-center gap-2 text-primary">
                    <FiHeart className="text-secondary" /> Patient First
                  </h4>
                  <p className="text-text/80 text-sm">Compassionate and personalized treatment.</p>
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 flex items-center gap-2 text-primary">
                    <FiHome className="text-secondary" /> Comfortable Care
                  </h4>
                  <p className="text-text/80 text-sm">Clean and welcoming environment.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= SECTION 2: Why Choose Us Cards ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FiUserPlus, title: "Expert Doctors", desc: "Experienced medical professionals dedicated to your health." },
              { icon: FiHeart, title: "Patient First", desc: "Every treatment plan is designed around your unique needs." },
              { icon: FiActivity, title: "Modern Lab", desc: "Advanced diagnostic and laboratory facilities." },
              { icon: FiClock, title: "24/7 Support", desc: "Emergency medical assistance whenever you need us." },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-primary/20 transition-all duration-500"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl mb-6">
                  <item.icon />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-base leading-relaxed text-text/80">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* ================= SECTION 3: Mission & Vision ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-primary text-white rounded-3xl p-10 lg:p-14 shadow-lg hover:-translate-y-2 transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] group-hover:bg-secondary/30 transition-colors duration-700" />
              <FiTarget className="text-secondary text-4xl mb-6 relative z-10" />
              <h3 className="text-3xl font-bold mb-4 relative z-10">Our Mission</h3>
              <p className="text-white/90 text-lg leading-relaxed relative z-10">
                To provide trusted, compassionate, and affordable healthcare that improves the well-being of every patient we serve.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-background border border-gray-200 rounded-3xl p-10 lg:p-14 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
            >
              <FiEye className="text-secondary text-4xl mb-6" />
              <h3 className="text-3xl font-bold mb-4 text-primary">Our Vision</h3>
              <p className="text-text/90 text-lg leading-relaxed">
                To become one of the most trusted healthcare providers in the Nilgiris through quality treatment, innovation, and patient satisfaction.
              </p>
            </motion.div>
          </div>

          {/* ================= SECTION 4: Facilities Grid ================= */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-2xl mx-auto mb-16"
            >
              <span className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-secondary ring-1 ring-inset ring-secondary/20 mb-6">
                Comprehensive Care
              </span>
              <h2 className="text-3xl font-bold text-primary sm:text-4xl">
                Our Facilities
              </h2>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {[
                "General Consultation", 
                "Orthopaedic Care", 
                "ECG Facility", 
                "Advanced Lab", 
                "Blood Test", 
                "Health Screening", 
                "Master Checkup", 
                "Pharmacy"
              ].map((facility, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-background border border-gray-100 rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
                >
                  <FiCheckCircle className="text-secondary text-xl flex-shrink-0" />
                  <span className="font-semibold text-primary">{facility}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ================= SECTION 5: Bottom Feature Cards ================= */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-12 border-t border-gray-200">
            <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center text-center p-6 bg-background rounded-3xl shadow-sm border border-gray-100">
              <span className="text-secondary font-black text-3xl mb-2">24/7</span>
              <span className="text-sm font-bold text-primary">Emergency Care</span>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center text-center p-6 bg-background rounded-3xl shadow-sm border border-gray-100">
              <FiActivity className="text-secondary text-3xl mb-2" />
              <span className="text-sm font-bold text-primary">Advanced Diagnostics</span>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center text-center p-6 bg-background rounded-3xl shadow-sm border border-gray-100">
              <FiUserPlus className="text-secondary text-3xl mb-2" />
              <span className="text-sm font-bold text-primary">Expert Consultation</span>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="flex flex-col items-center text-center p-6 bg-background rounded-3xl shadow-sm border border-gray-100">
              <FiHeart className="text-secondary text-3xl mb-2" />
              <span className="text-sm font-bold text-primary">Patient Focused Care</span>
            </motion.div>
          </div>

        </div>
      </section>
    </>
  );
};

export default About;