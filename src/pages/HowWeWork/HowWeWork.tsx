// import React from "react";
import { 
  FaCalendarCheck, 
  FaStethoscope, 
  FaProcedures, 
  FaFileMedical 
} from "react-icons/fa";

const WORK_STEPS = [
  {
    id: 1,
    title: "Book An Appointment",
    icon: <FaCalendarCheck size={40} />,
    description: "Schedule your visit easily.",
  },
  {
    id: 2,
    title: "Conduct Checkup",
    icon: <FaStethoscope size={40} />,
    description: "Thorough consultation & diagnosis.",
  },
  {
    id: 3,
    title: "Perform Treatment",
    icon: <FaProcedures size={40} />,
    description: "Expert medical care & procedures.",
  },
  {
    id: 4,
    title: "Prescription & Care",
    icon: <FaFileMedical size={40} />,
    description: "Guidance, meds, and follow-up.",
  },
];

function HowWeWork() {
  return (
    // You can replace bg-orange-50 with your exact background color preference
    <section className="bg-orange-50 px-6 py-20">
      <div className="mx-auto max-w-7xl">
        
        {/* Top Section: Heading and Description */}
        <div className="mb-20 grid gap-10 md:grid-cols-2 md:items-center">
          
          {/* Left Side: Titles */}
          <div>
            <h4 className="mb-4 text-sm font-semibold tracking-widest text-secondary uppercase">
              How We Work
            </h4>
            <h2 className="text-4xl font-extrabold leading-tight text-primary md:text-5xl">
              A Comprehensive <br />
              Approach to Your <br />
              Health Care.
            </h2>
          </div>

          {/* Right Side: Description */}
          <div>
            <p className="text-lg leading-relaxed text-gray-600">
              At SKV Clinic, we are your trusted one-stop destination for all your healthcare needs. 
              Our streamlined process is designed to provide you with easy access to experienced doctors, 
              modern medical facilities, and compassionate care, ensuring the best outcomes for you and your family.
            </p>
          </div>
        </div>

        {/* Bottom Section: 4-Column Grid for Steps */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {WORK_STEPS.map((step) => (
            <div 
              key={step.id} 
              className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Icon Container */}
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-white text-secondary shadow-sm transition-all duration-300 group-hover:bg-secondary group-hover:text-white group-hover:shadow-md">
                {step.icon}
              </div>
              
              {/* Step Title */}
              <h3 className="text-xl font-bold text-primary">
                {step.title}
              </h3>
              
              {/* Optional: Short Description underneath (can be removed if you want it exactly like the image) */}
              <p className="mt-2 text-sm text-gray-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowWeWork;