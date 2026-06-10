import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import PageHero from "../components/PageHero";
import heroImage from "../assets/imgbannerN/imagen4.jpg";

function Contacto() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Conversemos sobre territorio, cooperación e impacto"
        text="Escríbenos para presentar una iniciativa, solicitar información institucional, proponer una alianza o activar una ruta de vinculación."
        image={heroImage}
        imageAlt="Paisaje territorial de Antioquia"
      />

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-details">
            <span className="eyebrow">Canales institucionales</span>
            <h2>Estamos listos para escuchar</h2>
            <p>
              Indica en tu mensaje el motivo de contacto, la organización que
              representas y el territorio de interés para orientarte mejor.
            </p>
            <div className="contact-list">
              <a href="mailto:planetayvidaong@gmail.com">
                <FaEnvelope />
                <span>
                  <small>Correo</small>
                  planetayvidaong@gmail.com
                </span>
              </a>
              <a href="tel:+573122567365">
                <FaPhoneAlt />
                <span>
                  <small>Teléfono / WhatsApp</small>
                  (+57) 312 256 7365
                </span>
              </a>
              <div>
                <FaMapMarkerAlt />
                <span>
                  <small>Base institucional</small>
                  Medellín, Antioquia, Colombia
                </span>
              </div>
              <div>
                <FaClock />
                <span>
                  <small>Atención</small>
                  Respuesta según orden de recepción
                </span>
              </div>
            </div>
          </div>

          <div className="contact-panel">
            <span className="eyebrow">Escríbenos</span>
            <h2>Inicia la conversación</h2>
            <p>
              Al continuar se abrirá tu aplicación de correo con la dirección de
              la Fundación y el asunto preparados para que escribas tu mensaje.
            </p>
            <a
              className="button button--primary"
              href="mailto:planetayvidaong@gmail.com?subject=Mensaje%20desde%20el%20sitio%20web&body=Hola%20Fundaci%C3%B3n%20Social%20Integral%20Planeta%20y%20Vida%2C%0A%0AMi%20nombre%20es%3A%20%0AOrganizaci%C3%B3n%20%28si%20aplica%29%3A%20%0AMotivo%20del%20mensaje%3A%20%0A%0AMensaje%3A%20"
            >
              Enviar correo
            </a>
            <p className="contact-panel__note">
              Para PQRS, incluye “PQRS” al inicio del asunto y tus datos de
              contacto en el mensaje.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contacto;
