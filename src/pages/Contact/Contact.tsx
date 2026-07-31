import React from "react";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaCalendarCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  const contactInfo = [
    { icon: FaPhoneAlt, title: "Phone", text: "+91 83003 84823" },
    { icon: FaEnvelope, title: "Email", text: "skvclinicktg@gmail.com" },
    { icon: FaMapMarkerAlt, title: "Address", text: "31/34, Main Bazaar,\nKotagiri - 643217" },
    { icon: FaClock, title: "Working Hours", text: "24 Hours / 7 Days a week" },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Subtle background gradient for depth */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-white to-white"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* ================= HEADER SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center mb-16 lg:mb-24"
        >
          <span className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-secondary ring-1 ring-inset ring-secondary/20">
            Contact Us
          </span>
          
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Get In Touch With SKV Clinic
          </h2>
          
          <p className="mt-6 text-lg leading-8 text-text/90">
            Have questions? Reach out to us anytime or visit our clinic. Our dedicated medical team is ready to assist you.
          </p>
        </motion.div>

        {/* ================= MAIN CONTENT GRID ================= */}
        <div className="grid gap-12 lg:gap-16 lg:grid-cols-12 lg:items-start">
          
          {/* Left: Contact Info Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group flex flex-col sm:flex-row items-start gap-5 rounded-3xl border border-gray-100 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                    <item.icon className="text-xl" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-primary">{item.title}</h3>
                    <p className="whitespace-pre-line text-sm leading-relaxed text-text/80">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Book Appointment CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6"
            >
              <div className="rounded-3xl bg-primary p-8 text-center shadow-lg sm:p-10">
                <h3 className="mb-3 text-2xl font-bold text-white">Need to see a Doctor?</h3>
                <p className="mb-6 text-primary-50 text-white/80">
                  Skip the wait and schedule your visit online.
                </p>
                <Link
                  to="/appointment"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 font-semibold text-white shadow-md transition-all duration-300 hover:bg-white hover:text-primary hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]"
                >
                  <FaCalendarCheck />
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right: Google Map Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 h-full min-h-[400px] lg:min-h-[600px] rounded-3xl overflow-hidden shadow-sm border border-gray-100"
          >
            {/* Embed Google Map - Using Kotagiri location */}
            <iframe
              title="SKV Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15632.74828131362!2d76.862423!3d11.428753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8963283282215%3A0xc3b8a1c97a9f8b41!2sKotagiri%2C%20Tamil%20Nadu%20643217!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "100%" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="bg-gray-100"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;