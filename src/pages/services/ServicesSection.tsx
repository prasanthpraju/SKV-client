import { motion } from "framer-motion";
import {
  FaStethoscope,
  FaHeart,
  FaSyringe,
  FaBaby,
  FaFlask,
  FaAmbulance,
} from "react-icons/fa";

const services = [
  {
    icon: <FaStethoscope />,
    title: "General Medicine",
    description: "Comprehensive healthcare for all age groups.",
  },
  {
    icon: <FaHeart />,
    title: "Heart Care",
    description: "Expert diagnosis and treatment for heart health.",
  },
  {
    icon: <FaSyringe />,
    title: "Vaccination",
    description: "Safe and timely immunization services.",
  },
  {
    icon: <FaBaby />,
    title: "Child Care",
    description: "Complete pediatric healthcare for children.",
  },
  {
    icon: <FaFlask />,
    title: "Laboratory",
    description: "Accurate diagnostic and laboratory testing.",
  },
  {
    icon: <FaAmbulance />,
    title: "Emergency Care",
    description: "24/7 emergency medical support.",
  },
];

// Animation configurations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay between each card appearing
    },
  },
};

// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: "easeOut" },
//   },
// };

function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Subtle background gradient for depth */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-white to-white"></div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Animated Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-secondary ring-1 ring-inset ring-secondary/20">
            Our Services
          </span>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Healthcare Services We Provide
          </h2>

          <p className="mt-6 text-lg leading-8 text-text/90">
            We provide high-quality medical care with experienced doctors, modern
            equipment, and a patient-first approach.
          </p>
        </motion.div>

        {/* Animated Grid Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mt-16 grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              // variants={cardVariants}
              className="group relative rounded-3xl border border-gray-100 bg-background p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/20 hover:shadow-xl"
            >
              {/* Icon Container with Hover Fill Effect */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-3xl text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                {service.icon}
              </div>

              <h3 className="mb-3 text-xl font-semibold text-primary">
                {service.title}
              </h3>

              <p className="leading-7 text-text/80">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

export default ServicesSection;