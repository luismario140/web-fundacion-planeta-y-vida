import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import { projects } from "../data/institutionalData";
import heroImage from "../assets/imgbannerN/imagen1.jpg";

function Proyectos() {
  return (
    <>
      <PageHero
        eyebrow="Proyectos"
        title="Proyectos bandera para movilizar capacidades y cooperación"
        text="Nuestro portafolio conecta protección social, bioeconomía, ambiente, cultura y liderazgo. Cada iniciativa puede ajustarse al contexto, alcance y esquema de alianza."
        image={heroImage}
        imageAlt="Ecosistema de bosque y agua"
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Portafolio institucional"
            title="Seis rutas para generar impacto"
            text="Las siguientes iniciativas presentan líneas de proyecto institucional. Su alcance final se define con comunidades, financiadores y aliados de implementación."
          />
          <div className="projects-grid">
            {projects.map((project, index) => (
              <article className="project-card" key={project.title}>
                <div className="project-card__top">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>{project.line}</small>
                </div>
                <h2>{project.title}</h2>
                <p>{project.text}</p>
                <Link
                  className="text-link"
                  to={`/contacto?motivo=proyecto&proyecto=${encodeURIComponent(
                    project.title,
                  )}`}
                >
                  Conocer más <FaArrowRight />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container callout callout--dark">
          <div>
            <span className="eyebrow eyebrow--light">Cooperación y alianzas</span>
            <h2>Convirtamos una línea de proyecto en una intervención viable</h2>
            <p>
              Estamos preparados para conversar sobre formulación, operación
              territorial, alianzas y esquemas de seguimiento.
            </p>
          </div>
          <Link className="button button--primary" to="/contacto">
            Solicitar conversación
          </Link>
        </div>
      </section>
    </>
  );
}

export default Proyectos;
