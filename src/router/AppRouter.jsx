import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import ScrollToTop from "../components/ScrollToTop";
import HelpChat from "../components/HelpChat";

import Inicio from "../pages/Inicio";
import Nosotros from "../pages/Nosotros";
import Proyectos from "../pages/Proyectos";
import Servicios from "../pages/Servicios";
import Contacto from "../pages/Contacto";
import Territorios from "../pages/Territorios";
import Transparencia from "../pages/Transparencia";
import Vinculate from "../pages/Vinculate";

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/que-hacemos" element={<Servicios />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/territorios" element={<Territorios />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/transparencia" element={<Transparencia />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/vinculate" element={<Vinculate />} />
        </Routes>
      </main>

      <HelpChat />
      <Footer />
    </BrowserRouter>
  );
}

export default AppRouter;
