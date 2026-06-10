import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
} from "react-icons/fa";
import PageHero from "../components/PageHero";

function Contacto() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Conversemos sobre territorio, cooperación e impacto"
        text="Escríbenos para presentar una iniciativa, solicitar información institucional, proponer una alianza o activar una ruta de vinculación."
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
              El canal disponible actualmente es el correo institucional. Al
              abrirlo podrás completar el asunto y adjuntar documentos.
            </p>
            <a
              className="button button--primary"
              href="mailto:planetayvidaong@gmail.com?subject=Contacto%20desde%20el%20sitio%20web"
            >
              Abrir correo institucional
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
