import { Outlet } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";
function MainLayout() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Outlet />
      <Footer/>
       <WhatsAppButton />
    </>
  );
}

export default MainLayout;