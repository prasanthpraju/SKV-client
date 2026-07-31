import { useEffect, useState } from "react";
import api from "../../api/axios";
import logo from "../../assets/images/skv-logo.jpeg";

interface Doctor {
  id: number;
  fullName: string;
  specialization: string;
  qualification: string;
  experience: number;
  imageUrl: string;
  role?: string;
}

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [editId, setEditId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    specialization: "",
    qualification: "",
    experience: "",
    role: "", 
  });

  const fetchDoctors = async (isInitialLoad = true) => {
    if (isInitialLoad) setLoading(true);
    try {
      const response = await api.get("/doctors");
      setDoctors(response.data.data);
    } catch (error) {
      console.error("Failed to fetch doctors", error);
    } finally {
      if (isInitialLoad) setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(true);
  }, []);

  const handleCreateDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true); // Show action overlay immediately
    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("specialization", formData.specialization);
      data.append("qualification", formData.qualification);
      data.append("experience", formData.experience);
      data.append("role", formData.role);
      if (image) data.append("image", image);

      await api.post("/doctors", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      resetForm();
      await fetchDoctors(false);
    } catch (error) {
      alert("Failed to add doctor.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setEditId(doctor.id);
    setFormData({
      fullName: doctor.fullName,
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      experience: doctor.experience.toString(),
      role: doctor.role || "",
    });
    setImage(null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true); // Show action overlay immediately
    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("specialization", formData.specialization);
      data.append("qualification", formData.qualification);
      data.append("experience", formData.experience);
      data.append("role", formData.role);
      if (image) data.append("image", image);

      await api.put(`/doctors/${editId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      resetForm();
      await fetchDoctors(false);
    } catch (error) {
      alert("Failed to update doctor.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteDoctor = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to completely remove this profile?");
    if (!confirmDelete) return;
    
    setIsProcessing(true); // Show action overlay immediately
    try {
      await api.delete(`/doctors/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      await fetchDoctors(false);
    } catch (error) {
      alert("Failed to delete doctor.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setEditId(null);
    setShowForm(false);
    setFormData({ fullName: "", specialization: "", qualification: "", experience: "", role: "" });
    setImage(null);
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
          Loading Directory...
        </p>
      </div>
    );
  }

  const ceoDoctor = doctors.find((d) => (d.role || "").trim().toUpperCase() === "CEO");
  const regularDoctors = doctors.filter((d) => d.id !== ceoDoctor?.id);

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
              Executing Request...
            </p>
          </div>
        </div>
      )}

      <div className="max-w-[1400px] mx-auto">
        
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between border-b-2 border-slate-200/60 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Medical Staff
            </h1>
            <p className="text-base font-semibold text-slate-500 mt-2 tracking-wide">
              Directory of professionals and administrators.
            </p>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(!showForm); }}
            className={`mt-4 md:mt-0 px-8 py-3.5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
              showForm ? "bg-slate-200 text-slate-800 hover:bg-slate-300" : "bg-[#153C33] text-white hover:bg-[#0c241e]"
            }`}
          >
            {showForm ? "Close Panel" : "Add Personnel"}
          </button>
        </div>

        {showForm && (
          <div className="mb-12 bg-white rounded-[2rem] shadow-[0_20px_50px_rgb(0,0,0,0.06)] border border-slate-100 overflow-hidden">
            <div className="px-10 py-6 border-b-2 border-slate-50 bg-slate-900">
              <h2 className="text-xl font-extrabold text-white tracking-wide">
                {editId ? "EDIT PROFESSIONAL PROFILE" : "NEW PROFESSIONAL PROFILE"}
              </h2>
            </div>

            <form onSubmit={editId ? handleUpdateDoctor : handleCreateDoctor} className="p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                
                <div className="space-y-3">
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input
                    type="text" required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-5 py-4 text-base font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-[#153C33] transition-colors cursor-text"
                    placeholder="Dr. John Doe"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Specialization</label>
                  <input
                    type="text" required
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-5 py-4 text-base font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-[#153C33] transition-colors cursor-text"
                    placeholder="E.g. Cardiology"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Qualifications</label>
                  <input
                    type="text" required
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-5 py-4 text-base font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-[#153C33] transition-colors cursor-text"
                    placeholder="MBBS, MD"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Experience (Yrs)</label>
                    <input
                      type="number" required min="0"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-5 py-4 text-base font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-[#153C33] transition-colors cursor-text"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Role (Optional)</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-5 py-4 text-base font-bold text-slate-900 focus:outline-none focus:bg-white focus:border-[#153C33] transition-colors cursor-text"
                      placeholder="E.g. CEO"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-3">
                  <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-widest">Professional Portrait</label>
                  <div className="relative w-full border-4 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-[#153C33]/50 transition-all cursor-pointer group">
                    <input
                      type="file" accept="image/*"
                      onChange={(e) => setImage(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="flex flex-col items-center justify-center py-12">
                      <span className="text-lg font-extrabold text-slate-700 group-hover:text-[#153C33]">
                        {image ? image.name : "DRAG & DROP OR CLICK TO UPLOAD"}
                      </span>
                      <span className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">High-Res JPEG/PNG Only</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-end pt-8 border-t-2 border-slate-100">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-4 rounded-xl text-sm font-extrabold uppercase tracking-widest text-slate-600 bg-white border-2 border-slate-200 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isProcessing} // Disable if already processing
                  className={`px-10 py-4 rounded-xl text-sm font-extrabold uppercase tracking-widest text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer bg-[#153C33] hover:bg-[#0c241e]`}
                >
                  {editId ? "UPDATE RECORD" : "SAVE RECORD"}
                </button>
              </div>
            </form>
          </div>
        )}

        {ceoDoctor && (
          <div className="mb-12 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] shadow-2xl p-10 flex flex-col md:flex-row items-center justify-between border border-slate-700 relative overflow-hidden group">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white/10 bg-slate-800 shadow-2xl flex-shrink-0">
                <img
                  src={`http://localhost:5000/uploads/doctors/${ceoDoctor.imageUrl}`}
                  alt={ceoDoctor.fullName}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(ceoDoctor.fullName)}&background=1E293B&color=F8FAFC`;
                  }}
                />
              </div>
              <div className="text-center md:text-left">
                <div className="inline-block px-4 py-1.5 bg-amber-500 text-slate-900 text-xs font-black uppercase tracking-widest rounded-full mb-4">
                  Chief Executive Officer
                </div>
                <h2 className="text-4xl font-black text-white tracking-tight mb-2">
                  {ceoDoctor.fullName}
                </h2>
                <p className="text-lg font-bold text-slate-400">
                  {ceoDoctor.qualification} <span className="mx-2 text-slate-600">|</span> {ceoDoctor.specialization}
                </p>
              </div>
            </div>
            
            <div className="mt-8 md:mt-0 relative z-10">
              <button
                onClick={() => handleEditDoctor(ceoDoctor)}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-sm font-extrabold uppercase tracking-widest backdrop-blur-sm transition-all hover:-translate-y-1 cursor-pointer"
              >
                Manage Executive
              </button>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-8 tracking-tight">Medical Personnel</h3>
          
          {regularDoctors.length === 0 ? (
            <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center">
              <p className="text-2xl font-extrabold text-slate-400 uppercase tracking-widest">No Personnel Listed</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularDoctors.map((doctor) => (
                <div key={doctor.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-300 p-8 group flex flex-col items-center text-center cursor-pointer relative overflow-hidden">
                  
                  <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-slate-50 bg-slate-100 shadow-inner mb-6 group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={`http://localhost:5000/uploads/doctors/${doctor.imageUrl}`}
                      alt={doctor.fullName}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.fullName)}&background=F1F5F9&color=334155`;
                      }}
                    />
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{doctor.fullName}</h3>
                  <p className="text-sm font-bold text-slate-400 mt-1">{doctor.qualification}</p>
                  
                  <div className="mt-6 mb-8 w-full border-t border-slate-100 pt-6">
                    <div className="flex justify-between items-center w-full px-4">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">Specialty</span>
                      <span className="text-sm font-bold text-slate-800">{doctor.specialization}</span>
                    </div>
                    <div className="flex justify-between items-center w-full px-4 mt-3">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-400">Experience</span>
                      <span className="text-sm font-bold text-slate-800">{doctor.experience} YRS</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 w-full mt-auto">
                    <button
                      onClick={() => handleEditDoctor(doctor)}
                      className="flex-1 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteDoctor(doctor.id)}
                      className="flex-1 py-3.5 bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Doctors;