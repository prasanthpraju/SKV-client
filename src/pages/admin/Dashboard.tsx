import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/images/skv-logo.jpeg";

interface DashboardStats {
  totalDoctors: number;
  totalAppointments: number;
  pendingAppointments: number;
  approvedAppointments: number;
  completedAppointments: number;
  rejectedAppointments: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [now, setNow] = useState<Date>(new Date());

  const fetchDashboard = async (isInitialLoad = true) => {
    if (isInitialLoad) setLoading(true);
    else setIsProcessing(true); // Overlay for manual refresh

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    fetchDashboard(true);
    
    // Live clock timer
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Format time in numbers (e.g., 10:30:45 AM)
  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // Format date in letters (e.g., Friday, July 31, 2026)
  const dateString = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // --- INITIAL FULL-SCREEN LOGO LOADER ---
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-[#F8FAFC]">
        <div className="relative w-28 h-28 flex items-center justify-center mb-8">
          <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#153C33] rounded-full border-t-transparent animate-spin"></div>
          <img 
            src={logo} 
            alt="SKV Clinic" 
            className="w-20 h-20 rounded-full object-cover shadow-sm animate-pulse"
          />
        </div>
        <p className="text-xs font-black tracking-[0.3em] text-[#153C33] uppercase animate-pulse">
          Fetching Metrics...
        </p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-6 md:p-12 min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg border border-slate-100">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">DATA UNAVAILABLE</h2>
          <p className="text-base font-semibold text-slate-500 mb-8">Unable to connect to the metrics server.</p>
          <button
            onClick={() => fetchDashboard(false)}
            className="px-8 py-4 bg-[#153C33] text-white rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#0c241e] transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          >
            Refresh System
          </button>
        </div>
      </div>
    );
  }

  const cards = [
    { title: "Active Doctors", value: stats.totalDoctors, accent: "text-slate-900", bg: "bg-slate-50" },
    { title: "Total Appointments", value: stats.totalAppointments, accent: "text-[#153C33]", bg: "bg-[#153C33]/5" },
    { title: "Pending Requests", value: stats.pendingAppointments, accent: "text-amber-600", bg: "bg-amber-50" },
    { title: "Approved Sessions", value: stats.approvedAppointments, accent: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Completed Visits", value: stats.completedAppointments, accent: "text-blue-600", bg: "bg-blue-50" },
    { title: "Rejected Cases", value: stats.rejectedAppointments, accent: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="p-6 md:p-12 min-h-screen bg-[#F8FAFC] font-sans relative">
      
      {/* --- PREMIUM ACTION PROCESSING OVERLAY --- */}
      {isProcessing && (
        <div className="fixed inset-0 z-[999] bg-slate-900/40 backdrop-blur-md flex flex-col items-center justify-center transition-all duration-300">
          <div className="relative w-24 h-24 flex items-center justify-center mb-6">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
            <img 
              src={logo} 
              alt="Processing" 
              className="w-16 h-16 rounded-full object-cover shadow-2xl animate-pulse"
            />
          </div>
          <div className="bg-slate-900 text-white px-6 py-2 rounded-full shadow-2xl border border-white/10">
            <p className="text-[10px] font-black tracking-[0.3em] uppercase animate-pulse">
              Refreshing Data...
            </p>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto">
        
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b-2 border-slate-200/60 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              System Dashboard
            </h1>
            <p className="text-base font-semibold text-slate-500 mt-2 tracking-wide">
              Real-time analytics and clinic performance.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-4">
            {/* <button
              onClick={() => fetchDashboard(false)}
              className="inline-block px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-black tracking-widest uppercase shadow-sm cursor-pointer transition-colors"
            >
              SYNC DATA
            </button> */}
            <div className="inline-flex items-center px-6 py-3 bg-white border-2 border-slate-200 rounded-full shadow-sm cursor-default">
              <span className="text-sm font-black text-slate-800 tracking-widest mr-3 pr-3 border-r-2 border-slate-200">
                {timeString}
              </span>
              <span className="text-xs font-bold text-slate-500 tracking-widest uppercase">
                {dateString}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between cursor-default relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full ${card.bg} -z-10 transition-transform duration-500 group-hover:scale-110`}></div>
              
              <h2 className="text-xs font-extrabold text-slate-400 tracking-widest uppercase">
                {card.title}
              </h2>
              <p className={`mt-6 text-6xl font-black tracking-tighter ${card.accent}`}>
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;