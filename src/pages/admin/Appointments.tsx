import { useEffect, useState } from "react";
import api from "../../api/axios";
import logo from "../../assets/images/skv-logo.jpeg";

interface Appointment {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  department: string;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
  status: string;
  createdAt?: string;
}

interface ToastNotification {
  message: string;
  type: "success" | "error";
}

function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Two distinct loading states: one for initial load, one for button actions
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const [toast, setToast] = useState<ToastNotification | null>(null);

  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [departmentFilter, setDepartmentFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");

  const showNotification = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Added parameter to control if we show the initial full-screen loader
  const fetchAppointments = async (isInitialLoad = true) => {
    if (isInitialLoad) setLoading(true);
    try {
      const response = await api.get("/appointments");
      setAppointments(response.data.data);
    } catch (error) {
      console.log("Failed to fetch appointments", error);
      showNotification("FAILED TO LOAD DATA", "error");
    } finally {
      if (isInitialLoad) setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    setIsProcessing(true); // Instantly show processing overlay on click
    try {
      await api.patch(`/appointments/${id}/status`, { status });
      await fetchAppointments(false); // Fetch updated data silently behind the overlay
      showNotification(`STATUS UPDATED TO ${status.toUpperCase()}`, "success");
    } catch (error) {
      console.log(error);
      showNotification("FAILED TO UPDATE STATUS", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteAppointment = async () => {
    if (deleteId === null) return;

    setIsProcessing(true);

    try {
      await api.delete(`/appointments/${deleteId}`);

      await fetchAppointments(false);

      showNotification("APPOINTMENT DELETED SUCCESSFULLY", "success");
    } catch (error) {
      console.log(error);
      showNotification("FAILED TO DELETE APPOINTMENT", "error");
    } finally {
      setDeleteId(null);
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    fetchAppointments(true);
  }, []);

  const uniqueDepartments = Array.from(
    new Set(appointments.map((app) => app.department).filter(Boolean)),
  );

  const filteredAppointments = appointments.filter((appointment) => {
    const searchString = searchTerm.toLowerCase();
    const matchesSearch =
      appointment.fullName.toLowerCase().includes(searchString) ||
      appointment.email.toLowerCase().includes(searchString) ||
      appointment.phone.includes(searchString);

    const matchesStatus =
      statusFilter === "ALL" ||
      appointment.status.toUpperCase() === statusFilter;

    const matchesDepartment =
      departmentFilter === "ALL" || appointment.department === departmentFilter;

    const matchesDate =
      !dateFilter || appointment.appointmentDate === dateFilter;

    return matchesSearch && matchesStatus && matchesDepartment && matchesDate;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("ALL");
    setDepartmentFilter("ALL");
    setDateFilter("");
  };

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
          Synchronizing Data...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans text-slate-900 selection:bg-[#153C33] selection:text-white relative">
      {/* --- PREMIUM ACTION PROCESSING OVERLAY --- */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 w-[400px] shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900">
              Delete Appointment
            </h2>

            <p className="mt-3 text-slate-600">
              Are you sure you want to delete this appointment?
            </p>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setDeleteId(null)}
                className="px-5 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 font-bold"
              >
                Cancel
              </button>

              <button
                onClick={deleteAppointment}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
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
              Processing Request...
            </p>
          </div>
        </div>
      )}

      {/* Premium Toast Notification System */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[9999] px-6 py-4 rounded-xl shadow-[0_20px_50px_rgb(0,0,0,0.15)] border-l-8 transition-all duration-300 transform translate-y-0 opacity-100 ${
            toast.type === "success"
              ? "bg-white border-emerald-500 text-emerald-700"
              : "bg-white border-rose-500 text-rose-700"
          }`}
        >
          <p className="text-xs font-black uppercase tracking-widest">
            {toast.message}
          </p>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between border-b-2 border-slate-200/60 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Appointments
            </h1>
            <p className="text-sm font-bold text-slate-500 mt-1 tracking-wide uppercase">
              Manage Patient Consultations
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="bg-slate-900 text-white px-5 py-2 rounded-full text-xs font-black tracking-widest uppercase shadow-md">
              SHOWING {filteredAppointments.length} OF {appointments.length}
            </div>
          </div>
        </div>

        {/* Control Panel (Filters) */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 p-6 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Search Patient
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="NAME, EMAIL, OR PHONE"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 placeholder-slate-300 focus:outline-none focus:bg-white focus:border-[#153C33] transition-colors cursor-text"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-[#153C33] transition-colors cursor-pointer appearance-none"
              >
                <option value="ALL">ALL STATUSES</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="COMPLETED">COMPLETED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Department
              </label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-[#153C33] transition-colors cursor-pointer appearance-none"
              >
                <option value="ALL">ALL DEPARTMENTS</option>
                {uniqueDepartments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Date
              </label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-[#153C33] transition-colors cursor-pointer uppercase"
              />
            </div>
          </div>

          {(searchTerm !== "" ||
            statusFilter !== "ALL" ||
            departmentFilter !== "ALL" ||
            dateFilter !== "") && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors cursor-pointer"
              >
                CLEAR FILTERS
              </button>
            </div>
          )}
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 overflow-hidden transition-all">
          <div className="overflow-x-auto pb-2">
            <table className="w-full text-left border-collapse min-w-[950px]">
              <thead className="bg-slate-50 border-b-2 border-slate-100">
                <tr>
                  <th className="px-5 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                    Patient
                  </th>
                  <th className="px-5 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                    Contact
                  </th>
                  <th className="px-5 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                    Department
                  </th>
                  <th className="px-5 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                    Schedule
                  </th>
                  <th className="px-5 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-5 py-4 text-[11px] font-extrabold text-slate-400 uppercase tracking-widest text-right whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-16 text-center">
                      <p className="text-sm font-black text-slate-400 tracking-widest uppercase">
                        NO RESULTS FOUND
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="hover:bg-slate-50/80 transition-colors duration-200 group"
                    >
                      <td className="px-5 py-4 w-[250px]">
                        <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">
                          {appointment.fullName}
                        </p>
                        <p className="text-[11px] font-bold text-slate-400 mt-0.5 truncate max-w-[200px]">
                          {appointment.email}
                        </p>
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="text-xs font-bold text-slate-700">
                          {appointment.phone}
                        </p>
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap">
                        <span className="bg-slate-100 text-slate-700 px-2.5 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wider">
                          {appointment.department}
                        </span>
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="text-xs font-bold text-slate-900">
                          {appointment.appointmentDate}
                        </p>
                        <p className="text-[11px] font-bold text-[#153C33] mt-0.5">
                          {appointment.appointmentTime}
                        </p>
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${
                            appointment.status === "Pending"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : appointment.status === "Approved"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : appointment.status === "Completed"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              updateStatus(appointment.id, "Approved")
                            }
                            disabled={appointment.status === "Approved"}
                            className={`inline-flex px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all
    ${
      appointment.status === "Approved"
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
    }`}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              updateStatus(appointment.id, "Completed")
                            }
                            disabled={appointment.status === "Completed"}
                            className={`inline-flex px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all
    ${
      appointment.status === "Completed"
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-slate-900 hover:bg-slate-800 text-white hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
    }`}
                          >
                            Complete
                          </button>
                          <button
                            onClick={() =>
                              updateStatus(appointment.id, "Rejected")
                            }
                            disabled={appointment.status === "Rejected"}
                            className={`inline-flex px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all
    ${
      appointment.status === "Rejected"
        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
        : "bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-700 cursor-pointer"
    }`}
                          >
                            Reject
                          </button>
                          <button
                            onClick={() => setDeleteId(appointment.id)}
                            className="inline-flex px-3 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-md text-[10px] font-black uppercase tracking-widest transition-all hover:shadow-md hover:-translate-y-0.5 cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
