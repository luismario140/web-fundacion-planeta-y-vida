import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/navbar.css";
import logo from "../assets/logo.png";
import useSiteSettings from "../hooks/useSiteSettings";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/nosotros", label: "Quiénes somos" },
  { to: "/que-hacemos", label: "Qué hacemos" },
  { to: "/territorios", label: "Territorios" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/transparencia", label: "Transparencia" },
  { to: "/contacto", label: "Contacto" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { assets } = useSiteSettings();

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link className="navbar__brand" to="/" onClick={closeMenu}>
          <img
            src={assets.site_logo || logo}
            alt="Fundación Social Integral Planeta y Vida"
            className="navbar__logo"
          />
          <span className="navbar__brand-copy">
            <strong>Planeta y Vida</strong>
            <small>Fundación Social Integral</small>
          </span>
        </Link>

        <button
          className="navbar__toggle"
          type="button"
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav
          id="main-navigation"
          className={`navbar__menu ${isOpen ? "navbar__menu--open" : ""}`}
          aria-label="Navegación principal"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={closeMenu}
              className={({ isActive }) =>
                isActive ? "navbar__link navbar__link--active" : "navbar__link"
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/vinculate"
            onClick={closeMenu}
            className={`navbar__cta ${
              pathname === "/vinculate" ? "navbar__cta--active" : ""
            }`}
          >
            Vincúlate
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
