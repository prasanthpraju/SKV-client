import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

// 1. Define the type for the FAQ data objects
interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

// 2. Apply the type to your data array
const FAQ_DATA: FaqItem[] = [
  {
    id: 1,
    question: "What services do you offer?",
    answer: "We provide a wide range of medical services, including general check-ups, specialized consultations, diagnostic tests, vaccinations, and health screenings tailored to your needs at SKV Clinic."
  },
  {
    id: 2,
    question: "Are you accepting new patients?",
    answer: "Yes, we are always open to new patients. Feel free to contact us to schedule an appointment or for any inquiries you may have regarding our services."
  },
  {
    id: 3,
    question: "How to book an appointment?",
    answer: "You can book an appointment easily by calling us at +91 8300 384 823, sending us a message on WhatsApp, or visiting our clinic in Kotagiri."
  },
  {
    id: 4,
    question: "What should I bring for my first appointment?",
    answer: "Please bring a valid ID, any previous medical records, a list of current medications you are taking, and your insurance information if applicable."
  },
  {
    id: 5,
    question: "What are your working hours?",
    answer: "Our clinic is open from Monday to Saturday, 9:00 AM to 8:00 PM. We are closed on Sundays."
  },
  {
    id: 6,
    question: "What should I do in case of an emergency?",
    answer: "In case of a severe medical emergency outside our working hours, please proceed to the nearest hospital emergency room immediately."
  },
  {
    id: 7,
    question: "Do you accept insurance plans?",
    answer: "We accept a variety of major insurance plans. Please contact our reception desk with your provider details to confirm coverage before your visit."
  },
  {
    id: 8,
    question: "Do you offer telemedicine consultations?",
    answer: "Yes, we offer virtual consultations for certain non-emergency medical conditions. Please contact us via WhatsApp to arrange a secure telemedicine appointment."
  }
];

// 3. Define the component type
const FAQ: React.FC = () => {
  // 4. Type the state as an array of numbers
  const [openFAQs, setOpenFAQs] = useState<number[]>([1, 2]);

  // 5. Type the parameter 'id' as a number
  const toggleFAQ = (id: number): void => {
    setOpenFAQs((prev) =>
      prev.includes(id)
        ? prev.filter((faqId) => faqId !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="bg-orange-50 px-6 py-20 text-center">
      <div className="mx-auto max-w-5xl">
        
        {/* Header Section */}
        <div className="mb-16">
          <h2 className="mb-6 text-4xl font-extrabold text-primary md:text-5xl">
            FAQs.
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-500">
            We have compiled a list of commonly asked questions related to various medical topics to 
            provide you with quick and reliable information. Our goal is to address your queries.
          </p>
        </div>

        {/* FAQs Grid - 2 Columns */}
        <div className="grid gap-x-12 gap-y-2 text-left md:grid-cols-2">
          {FAQ_DATA.map((faq) => {
            const isOpen = openFAQs.includes(faq.id);

            return (
              <div 
                key={faq.id} 
                className="flex items-start gap-4 py-4"
              >
                {/* Toggle Icon */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="mt-1 shrink-0 text-primary transition-transform duration-300 focus:outline-none"
                  aria-expanded={isOpen}
                  aria-label={isOpen ? "Collapse question" : "Expand question"}
                >
                  {isOpen ? <FaMinus size={20} /> : <FaPlus size={20} />}
                </button>

                {/* Content */}
                <div>
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="text-left text-xl font-bold text-primary focus:outline-none"
                  >
                    {faq.question}
                  </button>
                  
                  {/* Smooth dropdown animation container */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-gray-500 leading-relaxed text-base pr-4">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;