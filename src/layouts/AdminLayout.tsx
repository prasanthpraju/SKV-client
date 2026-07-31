import { Outlet, NavLink, useNavigate } from "react-router-dom";


function AdminLayout() {

  const navigate = useNavigate();


  const logout = () => {

    localStorage.removeItem("token");

    navigate("/admin/login");

  };


  return (
    <div className="min-h-screen flex bg-gray-100">


      {/* Sidebar */}

      <aside className="w-64 bg-[#153C33] text-white p-5">

        <h2 className="text-2xl font-bold mb-8">
          SKV Admin
        </h2>


        <nav className="space-y-3">


          <NavLink
            to="/admin"
            className={({isActive}) =>
              isActive
              ? "block bg-white text-[#153C33] p-3 rounded"
              : "block p-3 hover:bg-white/10 rounded"
            }
          >
            Dashboard
          </NavLink>



          <NavLink
            to="/admin/doctors"
            className={({isActive}) =>
              isActive
              ? "block bg-white text-[#153C33] p-3 rounded"
              : "block p-3 hover:bg-white/10 rounded"
            }
          >
            Doctors
          </NavLink>



          <NavLink
            to="/admin/appointments"
            className={({isActive}) =>
              isActive
              ? "block bg-white text-[#153C33] p-3 rounded"
              : "block p-3 hover:bg-white/10 rounded"
            }
          >
            Appointments
          </NavLink>



          <NavLink
            to="/admin/gallery"
            className={({isActive}) =>
              isActive
              ? "block bg-white text-[#153C33] p-3 rounded"
              : "block p-3 hover:bg-white/10 rounded"
            }
          >
            Gallery
          </NavLink>



        </nav>


        <button
          onClick={logout}
          className="mt-10 w-full bg-[#B89361] p-3 rounded"
        >
          Logout
        </button>


      </aside>



      {/* Main Content */}

      <section className="flex-1 p-6">


        <Outlet />


      </section>


    </div>
  );
}


export default AdminLayout;