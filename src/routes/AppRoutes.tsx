import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Doctors from "../pages/Doctors/Doctors";
import Departments from "../pages/Departments/Departments";
import Services from "../pages/services/ServicesSection";
import Gallery from "../pages/Gallery/Gallery";
import Blogs from "../pages/Blogs/Blogs";
import Reviews from "../pages/Reviews/Reviews";
import BookAppointment from "../pages/BookAppointment/BookAppointment";
import NotFound from "../pages/NotFound/NotFound";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import AdminDoctors from "../pages/admin/Doctors";
import Appointments from "../pages/admin/Appointments";
import AdminGallery from "../pages/admin/Gallery";

import ProtectedRoute from "../components/admin/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC WEBSITE ================= */}

      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/doctors" element={<Doctors />} />

        <Route path="/departments" element={<Departments />} />

        <Route path="/services" element={<Services />} />

        <Route path="/gallery" element={<Gallery />} />

        <Route path="/blogs" element={<Blogs />} />

        <Route path="/reviews" element={<Reviews />} />

        <Route path="/book-appointment" element={<BookAppointment />} />
      </Route>

      {/* ================= ADMIN LOGIN ================= */}

      <Route path="/admin/login" element={<Login />} />

      {/* ================= ADMIN PANEL ================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="doctors" element={<AdminDoctors />} />

        <Route path="appointments" element={<Appointments />} />

        <Route path="gallery" element={<AdminGallery />} />
      </Route>

      {/* ================= 404 PAGE ================= */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
