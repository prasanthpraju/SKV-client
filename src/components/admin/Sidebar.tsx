import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-primary text-white p-6">
      <h1 className="text-2xl font-bold mb-10">
        SKV Clinic
      </h1>

      <nav className="flex flex-col gap-4">
        <NavLink to="/admin">
          Dashboard
        </NavLink>

        <NavLink to="/admin/doctors">
          Doctors
        </NavLink>

        <NavLink to="/admin/appointments">
          Appointments
        </NavLink>

        <NavLink to="/admin/gallery">
          Gallery
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;