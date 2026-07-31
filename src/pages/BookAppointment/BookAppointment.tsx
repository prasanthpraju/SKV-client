import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStethoscope, FaRegClock, FaPhoneAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import api from "../../api/axios";

// Interface for form state
interface AppointmentForm {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  department: string;
  message: string;
}

const BookAppointment: React.FC = () => {
  const [formData, setFormData] = useState<AppointmentForm>({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    department: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<AppointmentForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [notification, setNotification] = useState<{ show: boolean; type: "success" | "error"; message: string }>({
    show: false,
    type: "success",
    message: "",
  });

  // Auto-hide notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ show: true, type, message });
  };

  // IMPROVED VALIDATION LOGIC
  const validateForm = () => {
    const newErrors: Partial<AppointmentForm> = {};
    
    // Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.length > 50) {
      newErrors.fullName = "Name must be less than 50 characters";
    }

    // Phone validation (Accepts 10 to 15 digits, optional '+' at the start)
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone.trim().replace(/[\s-]/g, ''))) {
      newErrors.phone = "Enter a valid 10-15 digit phone number";
    }

    // Email validation (Optional, but validated if provided)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email.trim() && !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.department) newErrors.department = "Please select a department";
    if (!formData.date) newErrors.date = "Preferred date is required";
    if (!formData.time) newErrors.time = "Preferred time is required";
    
    // Message/Notes validation
    if (formData.message && formData.message.length > 500) {
      newErrors.message = "Notes must be less than 500 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    if (errors[name as keyof AppointmentForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification("error", "Please fix the errors in the form.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post("/appointments", {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        department: formData.department,
        appointmentDate: formData.date,
        appointmentTime: formData.time,
        notes: formData.message,
      });

      console.log(response.data);
      
      setSubmitSuccess(true);
      showNotification("success", "Appointment booked successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        department: "",
        message: "",
      });

      setTimeout(() => setSubmitSuccess(false), 3000);

    } catch (error) {
      console.error(error);
      showNotification("error", "Failed to book appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Toast Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-4 left-0 right-0 z-50 mx-auto flex w-[90%] max-w-sm items-center gap-3 rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 sm:top-8"
          >
            {notification.type === "success" ? (
              <FaCheckCircle className="text-2xl text-green-500" />
            ) : (
              <FaExclamationCircle className="text-2xl text-red-500" />
            )}
            <div className="flex-1">
              <h4 className={`text-sm font-bold ${notification.type === "success" ? "text-green-700" : "text-red-700"}`}>
                {notification.type === "success" ? "Success" : "Error"}
              </h4>
              <p className="text-xs text-gray-600">{notification.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-white to-white"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          
          {/* LEFT SIDE: INFO & BENEFITS (Unchanged) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold uppercase tracking-wider text-secondary ring-1 ring-inset ring-secondary/20">
              Online Booking
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary sm:text-5xl lg:text-4xl xl:text-5xl">
              Schedule Your Visit Easily
            </h2>
            <p className="mt-6 text-lg leading-8 text-text/80">
              Skip the waiting room. Book your consultation online and get priority access to our experienced medical team. We ensure personalized care tailored to your needs.
            </p>

            <div className="mt-10 space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FaStethoscope className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Expert Consultation</h3>
                  <p className="mt-1 text-sm text-text/70">Connect with highly qualified doctors across various specialties.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FaRegClock className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Zero Waiting Time</h3>
                  <p className="mt-1 text-sm text-text/70">Pre-book your slot to ensure immediate attention upon arrival.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FaPhoneAlt className="text-xl" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary">Need Urgent Help?</h3>
                  <p className="mt-1 text-sm text-text/70">For medical emergencies, please call us directly at <strong>+91 83003 84823</strong>.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex items-center gap-6 border-t border-gray-100 pt-8">
              <div>
                <p className="text-3xl font-bold text-primary">10k+</p>
                <p className="text-xs font-medium uppercase tracking-wide text-text/60">Happy Patients</p>
              </div>
              <div className="h-10 w-px bg-gray-200"></div>
              <div>
                <p className="text-3xl font-bold text-primary">24/7</p>
                <p className="text-xs font-medium uppercase tracking-wide text-text/60">Emergency Care</p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: BOOKING FORM */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form 
              onSubmit={handleSubmit}
              className="relative space-y-6 rounded-3xl border border-gray-100 bg-white p-8 sm:p-10 shadow-2xl shadow-primary/5"
            >
              <div className="mb-8 border-b border-gray-100 pb-6">
                <h3 className="text-2xl font-bold text-primary">Appointment Form</h3>
                <p className="mt-1 text-sm text-text/60">Please provide your details below.</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-primary">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    maxLength={50}
                    placeholder="Enter your full name"
                    className={`w-full rounded-2xl border bg-gray-50/50 hover:bg-gray-50 px-5 py-4 text-sm text-text placeholder-text/40 outline-none transition-all duration-300 focus:bg-white focus:ring-4 ${errors.fullName ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-secondary focus:ring-secondary/10'}`}
                  />
                  {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-primary">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    maxLength={15}
                    placeholder="Enter your phone number"
                    className={`w-full rounded-2xl border bg-gray-50/50 hover:bg-gray-50 px-5 py-4 text-sm text-text placeholder-text/40 outline-none transition-all duration-300 focus:bg-white focus:ring-4 ${errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-secondary focus:ring-secondary/10'}`}
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-primary">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={100}
                    placeholder="Enter your email address"
                    className={`w-full rounded-2xl border bg-gray-50/50 hover:bg-gray-50 px-5 py-4 text-sm text-text placeholder-text/40 outline-none transition-all duration-300 focus:bg-white focus:ring-4 ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-secondary focus:ring-secondary/10'}`}
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-primary">Department / Service *</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className={`w-full cursor-pointer appearance-none rounded-2xl border bg-gray-50/50 hover:bg-gray-50 px-5 py-4 text-sm text-text outline-none transition-all duration-300 focus:bg-white focus:ring-4 ${errors.department ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-secondary focus:ring-secondary/10'}`}
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="General Checkup">General Checkup</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-primary">Preferred Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full cursor-pointer rounded-2xl border bg-gray-50/50 hover:bg-gray-50 px-5 py-4 text-sm text-text outline-none transition-all duration-300 focus:bg-white focus:ring-4 ${errors.date ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-secondary focus:ring-secondary/10'}`}
                  />
                  {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-primary">Preferred Time *</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full cursor-pointer rounded-2xl border bg-gray-50/50 hover:bg-gray-50 px-5 py-4 text-sm text-text outline-none transition-all duration-300 focus:bg-white focus:ring-4 ${errors.time ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-secondary focus:ring-secondary/10'}`}
                  />
                  {errors.time && <p className="text-xs text-red-500">{errors.time}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-primary">Additional Notes</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={500}
                  rows={3}
                  placeholder="Briefly describe your symptoms or reason for visit..."
                  className={`w-full resize-none rounded-2xl border bg-gray-50/50 hover:bg-gray-50 px-5 py-4 text-sm text-text placeholder-text/40 outline-none transition-all duration-300 focus:bg-white focus:ring-4 ${errors.message ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-secondary focus:ring-secondary/10'}`}
                />
                {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || submitSuccess}
                whileTap={{ scale: isSubmitting || submitSuccess ? 1 : 0.98 }}
                className={`mt-6 flex w-full items-center justify-center rounded-full px-8 py-4 font-semibold tracking-wide text-white shadow-md transition-all duration-300 ${
                  submitSuccess 
                    ? "bg-green-500 shadow-green-500/20" 
                    : "bg-primary hover:bg-secondary hover:shadow-lg hover:-translate-y-0.5"
                } ${isSubmitting ? "opacity-90 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : submitSuccess ? (
                  <span className="flex items-center gap-2">
                    <FaCheckCircle className="text-xl" />
                    Booking Confirmed!
                  </span>
                ) : (
                  "Confirm Appointment"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;