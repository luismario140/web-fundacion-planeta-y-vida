import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import "../styles/footer.css";
import logo from "../assets/logo.png";
import useSiteSettings from "../hooks/useSiteSettings";

function Footer() {
  const { assets } = useSiteSettings();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <img src={assets.site_logo || logo} alt="" className="footer__logo" />
          <div>
            <h2>Fundación Social Integral Planeta y Vida</h2>
            <p>
              Transformamos territorios, protegemos la vida y activamos
              oportunidades colectivas.
            </p>
          </div>
        </div>

        <div className="footer__column">
          <h3>Enlaces rápidos</h3>
          <Link to="/nosotros">Quiénes somos</Link>
          <Link to="/que-hacemos">Qué hacemos</Link>
          <Link to="/territorios">Territorios</Link>
          <Link to="/proyectos">Proyectos</Link>
        </div>

        <div className="footer__column">
          <h3>Institucional</h3>
          <Link to="/transparencia">Transparencia</Link>
          <Link to="/vinculate">Vincúlate</Link>
          <Link to="/contacto">PQRS y contacto</Link>
          <Link to="/transparencia">Documentos institucionales</Link>
        </div>

        <div className="footer__column footer__contact">
          <h3>Contacto</h3>
          <p>
            <FaMapMarkerAlt aria-hidden="true" />
            Medellín, Antioquia, Colombia
          </p>
          <a href="mailto:planetayvidaong@gmail.com">
            <FaEnvelope aria-hidden="true" />
            planetayvidaong@gmail.com
          </a>
          <a href="tel:+573122567365">
            <FaPhoneAlt aria-hidden="true" />
            (+57) 312 256 7365
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container">
          <p>
            © 2026 Fundación Social Integral Planeta y Vida. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
