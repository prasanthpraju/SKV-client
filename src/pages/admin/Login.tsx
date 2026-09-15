import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaLock, FaExclamationCircle } from "react-icons/fa";

// Import your logo based on the folder structure
import logo from "../../assets/images/skv-logo.jpeg";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://api.skvclinic.com/api/auth/login",
        {
          email,
          password
        }
      );

      const token = response.data.token;

      localStorage.setItem(
        "token",
        token
      );

      navigate("/admin");

    } catch(error: any) {
      setError(
        error.response?.data?.message ||
        "Login failed"
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Background Decor */}
      <motion.div 
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full h-1/2 bg-primary rounded-b-[40px] sm:rounded-b-[100px]"
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-gray-100"
      >
        
        {/* Header with Centered Logo */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, type: "spring", bounce: 0.5 }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/5 mb-4 shadow-sm overflow-hidden border-2 border-primary/10"
          >
            <img 
              src={logo} 
              alt="SKV Clinic Logo" 
              className="h-full w-full object-cover"
            />
          </motion.div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">
            SKV Admin
          </h1>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Secure portal for clinic management
          </p>
        </div>

        {/* Error Message with Animation */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="flex items-center gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100 overflow-hidden"
            >
              <FaExclamationCircle className="shrink-0 text-red-500" />
              <p className="font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-primary ml-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(""); // clear error on typing
                }}
                required
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-300 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-primary ml-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(""); // clear error on typing
                }}
                required
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-300 focus:bg-white focus:border-secondary focus:ring-4 focus:ring-secondary/10"
              />
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`mt-8 w-full flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold tracking-wide text-white shadow-md transition-all duration-300 hover:bg-secondary hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${isSubmitting ? "opacity-90 cursor-wait" : ""}`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : (
              "Sign In to Dashboard"
            )}
          </motion.button>
        </form>

      </motion.div>
    </div>
  );
}

export default Login;