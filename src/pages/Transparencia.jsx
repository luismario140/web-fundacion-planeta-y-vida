import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaCertificate,
  FaLandmark,
  FaShieldAlt,
  FaComments,
  FaUserShield,
  FaEnvelope,
} from "react-icons/fa";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import heroImage from "../assets/imgbannerN/imagen2.jpg";

const documents = [
  {
    icon: FaFileAlt,
    title: "Existencia y representación legal",
    status: "Solicitar documento",
  },
  {
    icon: FaCertificate,
    title: "Reconocimiento institucional",
    status: "Documento próximamente disponible",
  },
  {
    icon: FaLandmark,
    title: "Certificación del Ministerio del Interior",
    status: "Solicitar documento",
  },
  {
    icon: FaShieldAlt,
    title: "Políticas institucionales",
    status: "Documento próximamente disponible",
  },
  {
    icon: FaComments,
    title: "PQRS y canal de solicitudes",
    status: "Ir al canal de contacto",
    link: "/contacto?motivo=pqrs",
  },
  {
    icon: FaUserShield,
    title: "Tratamiento de datos personales",
    status: "Documento próximamente disponible",
    id: "datos",
  },
  {
    icon: FaEnvelope,
    title: "Contacto institucional",
    status: "Escribir a la Fundación",
    link: "mailto:planetayvidaong@gmail.com",
  },
];

function Transparencia() {
  return (
    <>
      <PageHero
        eyebrow="Transparencia"
        title="Confianza que se construye con información clara"
        text="Este espacio reúne la documentación institucional, las políticas y los canales de atención de la Fundación. Los archivos se publicarán aquí a medida que estén disponibles."
        image={heroImage}
        imageAlt="Río y bosque que representan el compromiso con el territorio"
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Información institucional"
            title="Documentos y canales"
            text="No publicamos enlaces vacíos. Cuando un documento aún no está alojado en el sitio, puedes solicitarlo directamente al equipo."
          />
          <div className="document-grid">
            {documents.map(({ icon: Icon, title, status, link, id }) => (
              <article className="document-card" key={title} id={id}>
                <span className="icon-box">
                  <Icon aria-hidden="true" />
                </span>
                <h2>{title}</h2>
                {link?.startsWith("mailto:") ? (
                  <a className="text-link" href={link}>{status}</a>
                ) : link ? (
                  <Link className="text-link" to={link}>{status}</Link>
                ) : (
                  <span className="document-card__status">{status}</span>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container transparency-note">
          <span className="eyebrow">Compromiso institucional</span>
          <h2>Una sección preparada para crecer</h2>
          <p>
            La siguiente fase documental deberá incorporar archivos vigentes,
            fechas de actualización, responsables de publicación y versiones
            accesibles de cada política o certificado.
          </p>
        </div>
      </section>
    </>
  );
}

export default Transparencia;
